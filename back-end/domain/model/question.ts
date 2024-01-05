import { DeviceType } from "./deviceType";
import { Issue } from "./issue";
import { Question as QuestionPrisma } from "@prisma/client";
import { Issue as IssuePrisma } from "@prisma/client";
import { DeviceType as DeviceTypePrisma } from "@prisma/client";
import { DeviceTypeInput } from "../../types/types";

export class Question {
    readonly id: number;
    readonly questionStr: string;
    readonly parentQuestion?: Question;
    readonly issue: Issue;
    readonly deviceType: DeviceType;

    constructor(question: {
        id: number;
        questionStr: string;
        parentQuestion: Question;
        issue?: Issue;
        deviceType: DeviceType;
    }) {
        this.id = question.id;
        this.questionStr = question.questionStr;
        this.parentQuestion = question.parentQuestion;
        this.issue = question.issue;
        this.deviceType = question.deviceType;
    }

    static validate(question: { questionStr: string; }) {
        if (question.questionStr === "") {
            throw new Error("Vraag mag niet leeg zijn.")
        }
    }

    static from({
        id,
        questionStr,
        parentQuestion,
        issue,
        deviceType
    }: QuestionPrisma & { parentQuestion?: QuestionPrisma } & { issue?: IssuePrisma } & { deviceType?: DeviceTypePrisma }) {
        return new Question({
            id,
            questionStr,
            parentQuestion: parentQuestion != null ? Question.from(parentQuestion):null,
            issue: issue != null ?Issue.from(issue): null,
            deviceType: deviceType!= null ?DeviceType.from(deviceType): null
        })

    }
}
