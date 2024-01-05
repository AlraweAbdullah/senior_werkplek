import deviceDb from '../domain/data-access/device.db';
import problemDB from '../domain/data-access/problem.db';
import { Problem } from '../domain/model/problem';
import { IssueInput, ProblemInput } from '../types/types';
import deviceService from './device.service';
import issueService from './issue.service';

const createProblem = async (problem: ProblemInput): Promise<Problem> => {
    await deviceService.getDeviceById(problem.deviceId);
    //checking if it's a custom problem or from the questionair
    if (!problem.issue.id) {
        const issue = await issueService.createIssue(problem.issue)
        problem.issue = issue
    }
    if(!problem.status){
        problem.status = "open"
    }
    await issueService.getIssueById(problem.issue.id);

     

    return await problemDB.createProblem(problem);

};


const getProblemById = async (id: number): Promise<Problem> => {
    const problem = await problemDB.getProblemById(id)
    if (!problem) { throw new Error(`problem with id ${id} does not exist`) }
    return problem
};

const getAllProblems = async (): Promise<Problem[]> => problemDB.getAllProblems();

const deleteProblemById = async (problemId: number): Promise<Problem> => {
    await getProblemById(problemId);
    return await problemDB.deleteProblemById(problemId);
};

const updateProblem = async (problemInput: ProblemInput): Promise<Problem> => {
    Problem.validate(problemInput);

    await getProblemById(problemInput.id);
    await deviceDb.getDeviceById(problemInput.deviceId);

    return await problemDB.updateProblem(problemInput);
};

const getDeviceProblems = async (deviceId: number): Promise<Problem[]> => {
    return problemDB.getProblemsByDeviceId(deviceId);
};

const changeAnswer = async (id: number, answer: string): Promise<Problem> => {
    const problem = await getProblemById(id)
    await issueService.getIssueById(problem.issue.id)
    const issue: IssueInput = { id: problem.issue.id, description: problem.issue.description, answer: answer }
    await issueService.updateIssue(issue)
    const updatedproblem = await getProblemById(id)
    return updatedproblem
}

export default {
    getAllProblems,
    getProblemById,
    createProblem,
    deleteProblemById,
    updateProblem,
    getDeviceProblems,
    changeAnswer
};
