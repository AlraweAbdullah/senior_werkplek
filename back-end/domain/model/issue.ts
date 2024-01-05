import { Issue as IssuePrisma } from '.prisma/client';

export class Issue {
    readonly id?: number;
    readonly description: string;
    readonly answer: string;

    constructor(issue: { id?: number; description: string; answer: string }) {
        this.id = issue.id;
        this.description = issue.description;
        this.answer = issue.answer;
    }

    static validate(issue: { description: string }) {
        if (issue.description === '') {
            throw new Error('Beschrijving mag niet leeg zijn.');
        }
    }

    static from({ id, description, answer }: IssuePrisma) {
        return new Issue({
            id: id,
            description: description,
            answer: answer,
        });
    }
}
