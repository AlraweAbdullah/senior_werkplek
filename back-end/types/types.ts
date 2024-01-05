import { Issue } from "@prisma/client";

export interface UserInput {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
}

export interface DeviceInput {
  id?: number;
  userId?: number;
  name?: string;
  deviceTypeId?: number;
  purchaseDate?: Date;
  status?: string;
}

export interface DeviceTypeInput {
  id?: number;
  name: string;
}

export interface IssueInput {
  id?: number;
  description: string;
  answer: string;
}
export interface QuestionInput {
  id?: number;
  questionStr: string;
  parentQuestionId?: number;
  issueId?: number;
  deviceTypeId: number;
}

export interface ProblemInput {
  id?: number;
  deviceId: number;
  issue: IssueInput;
  status?: string;
  userId?: number;
}
