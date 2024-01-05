import deviceTypeDb from "../domain/data-access/deviceType.db";
import issueDb from "../domain/data-access/issue.db";
import questionsDb from "../domain/data-access/questions.db";
import { DeviceType } from "../domain/model/deviceType";
import { Question } from "../domain/model/question";
import { DeviceTypeInput, QuestionInput } from "../types/types";
import deviceTypeService from "./deviceType.service";

const getQuestionsByDeviceType = async (deviceTypeId: number): Promise<Question[]> => {
    await deviceTypeService.getDeviceTypeById(deviceTypeId)
    const questions = questionsDb.getQuestionsByDeviceType(deviceTypeId);
    if (!questions) throw new Error(`questions for device type ${deviceTypeId}`)
    return questions;
}

const getQuestionsById = async (id: number): Promise<Question> => {
    const question = await questionsDb.getQuestionById(id);
    if (!question) throw new Error(`question with id ${id} does not exist`);
    return question;
}

const getAllQuestions = async (): Promise<Question[]> => {
  const questions = questionsDb.getAllQuestions();
  if (!questions) throw new Error(`Geen vragen beschikbaar`);
  return questions;
};

const updateQuestion = async (question: QuestionInput): Promise<Question> => {
    if (question.parentQuestionId) {
        await questionsDb.getQuestionById(question.parentQuestionId)
    }
    if (question.issueId) { await issueDb.getIssueById(question.issueId) }
    await deviceTypeDb.getDeviceTypeById(question.deviceTypeId)

    Question.validate(question)
    const updateQquestion = questionsDb.updateQuestion(question);
    if (!updateQquestion) throw new Error(`question with id ${question.id} couldn't get updated`)
    return updateQquestion
}

const deleteQuestionById = async (id: number): Promise<Question> => {
    await getQuestionsById(id)
    const deletedQuestion = questionsDb.deleteQuestionById(id);
    if (!deletedQuestion) throw new Error(`couldn't delete question with id ${id}`)
    return deletedQuestion
}

const createQuestion = async (question: QuestionInput): Promise<Question> => {
    if (question.parentQuestionId) {
        await questionsDb.getQuestionById(question.parentQuestionId)
    }
    if (question.issueId) { await issueDb.getIssueById(question.issueId) }
    await deviceTypeDb.getDeviceTypeById(question.deviceTypeId)

    Question.validate(question)

  const createdQuestion = questionsDb.createQuestion(question);
  if (!createdQuestion) throw new Error(`Vraag kon niet gecreëerd worden`);
  return createdQuestion;
};

const getSubQuestionsByParentId = async (id: number): Promise<Question[]> => {
    await getQuestionsById(id)
    const subQuestions = await questionsDb.getSubQuestionsByParentId(id);
    if (subQuestions.length === 0) { throw new Error(`question doesn't have subQuestions`) }
    return subQuestions
}

const getPrimaryQuestionForDeviceType = async (deviceTypeId: number): Promise<Question[]> => {
    await deviceTypeService.getDeviceTypeById(deviceTypeId)
    const questions = questionsDb.getPrimaryQuestionsByDeviceType(deviceTypeId);
    if (!questions) throw new Error(`questions for device type ${deviceTypeId}`)
    return questions;
}

const createSubQuestionForParentId = async (id: number, question: QuestionInput): Promise<Question> => {
    Question.validate(question)
    const NewSubquestion = questionsDb.createSubQuestionForParentId(id, question);
    if (!NewSubquestion) throw new Error(`Couldn't create question for parent id ${id}`)
    return NewSubquestion
}

export default { getPrimaryQuestionForDeviceType, getQuestionsByDeviceType, getQuestionsById, getAllQuestions, updateQuestion, deleteQuestionById, createQuestion, getSubQuestionsByParentId, createSubQuestionForParentId }
