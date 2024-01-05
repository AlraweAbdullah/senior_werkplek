import { DeviceType } from '../model/deviceType';
import { Question } from '../model/question';
import { database } from '../../util/db.server';
import { QuestionInput } from '../../types/types';

const getSubQuestionsByParentId = async (id: number): Promise<Question[]> => {
    try {
        const questionsPrisma = await database.question.findMany({
            where: {
                parentQuestionId: id,
            },
        });
        const question = await Promise.all(
            questionsPrisma.map(async (questionPrisma) => await getQuestionById(questionPrisma.id))
        );
        return question;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getPrimaryQuestionsByDeviceType = async (deviceTypeId: number): Promise<Question[]> => {
    try {
        const questionsPrisma = await database.question.findMany({
            where: {
                deviceTypeId: deviceTypeId,
               // parentQuestionId: null,
            },include: {
                parentQuestion: true
            }
        });
        return await Promise.all(
            questionsPrisma.map(async (questionPrisma) => await getQuestionById(questionPrisma.id))
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

const getQuestionById = async (id: number): Promise<Question> => {
    try {
        const questionPrisma = await database.question.findUnique({
            where: {
                id: id,
            },
            include: { parentQuestion: true, issue: true, deviceType: true },
        });
        if (questionPrisma) {
            return Question.from(questionPrisma);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllQuestions = async (): Promise<Question[]> => {
    try {
        const questionsPrisma = await database.question.findMany({
            include: {
                deviceType: true, parentQuestion: true, issue: true
            }
        });
        return questionsPrisma.map((questionPrisma) => Question.from(questionPrisma));
    } catch (error) {
        throw new Error(error.message);
    }
};

const getQuestionsByDeviceType = async (deviceTypeId: number): Promise<Question[]> => {
    try {
        const questionsPrisma = await database.question.findMany({
            where: {
                deviceTypeId,
            },
            include: {
                deviceType: true, parentQuestion: true, issue: true
            }
        });
        return questionsPrisma.map((questionPrisma) => Question.from(questionPrisma));
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

const createQuestion = async ({
    questionStr,
    parentQuestionId,
    issueId,
    deviceTypeId,
}: QuestionInput): Promise<Question> => {
    const questionPrisma = await database.question.create({
        data: {
            questionStr: questionStr,
            parentQuestionId: parentQuestionId,
            issueId: issueId,
            deviceTypeId: deviceTypeId,
        },
        include: {
            deviceType: true, parentQuestion: true, issue: true
        }
    });
    return Question.from(questionPrisma);
};

const updateQuestion = async ({
    id,
    questionStr,
    parentQuestionId,
    issueId,
    deviceTypeId,
}: QuestionInput): Promise<Question> => {
    try {
        const questionPrisma = await database.question.update({
            where: {
                id: id,
            },
            data: {
                questionStr: questionStr,
                parentQuestionId: parentQuestionId,
                issueId: issueId,
                deviceTypeId: deviceTypeId,
            },
            include: {
                deviceType: true, parentQuestion: true, issue: true
            }
        });
        return Question.from(questionPrisma);
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteQuestionById = async (id: number): Promise<Question> => {
    try {
        const questionPrisma = await database.question.delete({
            where: {
                id: id,
            },
            include: {
                deviceType: true, parentQuestion: true, issue: true
            }
        });
        return Question.from(questionPrisma);
    } catch (error) {
        throw new Error(error.message);
    }
};

const createSubQuestionForParentId = async (
    id: number,
    { questionStr, issueId, deviceTypeId }: QuestionInput
): Promise<Question> => {
    try {
        if (!getQuestionById(id)) throw new Error(`parentQuestion with id ${id}, does not exist`);
        const newQuestion = await database.question.create({
            data: {
                questionStr: questionStr,
                issueId: issueId,
                deviceTypeId: deviceTypeId,
                parentQuestionId: id,
            },
        });
        return Question.from(newQuestion);
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    getAllQuestions,
    getQuestionById,
    getQuestionsByDeviceType,
    createQuestion,
    updateQuestion,
    deleteQuestionById,
    getSubQuestionsByParentId,
    createSubQuestionForParentId,
    getPrimaryQuestionsByDeviceType,
};
