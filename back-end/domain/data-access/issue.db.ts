import { IssueInput } from "../../types/types";
import { database, IssuePrisma, Prisma } from "../../util/db.server";
import { Issue } from "../model/issue";

const getAllIsues = async (): Promise<IssuePrisma[]> => {
  return await database.issue.findMany({});
};

const getIssueById = async (id: number): Promise<Issue> => {
  try {
    const issue = await database.issue.findUnique({
      where: {
        id: id,
      },
    });
    if (issue) {
      return Issue.from(issue);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const createIssue = async ({
  description,
  answer,
}: IssueInput): Promise<IssuePrisma> => {
  try {
    return await database.issue.create({
      data: {
        description,
        answer,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(`Issue met description {${description}} bestaat al`);
      }
    }
    throw new Error(error.message);
  }
};

const deleteIssueById = async (id: number): Promise<IssuePrisma> => {
  const deleteIssue = await database.issue.delete({
    where: {
      id: id,
    },
  });
  return deleteIssue;
};

const updateIssue = async ({
  id,
  description,
  answer,
}: IssueInput): Promise<Issue> => {
  try {
    return await database.issue.update({
      where: {
        id: id,
      },
      data: {
        description,
        answer,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getAllIsues,
  getIssueById,
  createIssue,
  deleteIssueById,
  updateIssue,
};
