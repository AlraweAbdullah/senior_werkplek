import issueDb from "../domain/data-access/issue.db";
import { Issue } from "../domain/model/issue";
import { IssueInput } from "../types/types";
import { IssuePrisma } from "../util/db.server";

const getAllIsues = async (): Promise<IssuePrisma[]> => issueDb.getAllIsues();

const getIssueById = async (id: number): Promise<Issue> => {
    const issue = await issueDb.getIssueById(id);
    if(!issue){throw new Error(`issue with id ${id} does not exist`)}
    return issue
}

const deleteIssueById = async (id: number): Promise<IssuePrisma> => {
    await getIssueById(id);
    return await issueDb.deleteIssueById(id);
}

const createIssue = async (issue: IssueInput): Promise<IssuePrisma> => {
    Issue.validate(issue)
    return await issueDb.createIssue(issue)
}

const updateIssue = async (issue: IssueInput): Promise<Issue> => {
    await getIssueById(issue.id)
    Issue.validate(issue)
    return await issueDb.updateIssue(issue)
}

export default {
    getAllIsues,
    getIssueById,
    deleteIssueById,
    createIssue,
    updateIssue
}