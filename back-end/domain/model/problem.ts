import { Issue } from './issue';
import { Problem as ProblemPrisma} from '@prisma/client';
import { Issue as IssuePrisma } from '@prisma/client';
import { User as UserPrisma } from '@prisma/client';
import { User } from './user';
import { Device as DevicePrisma } from '@prisma/client';

export class Problem {
    readonly id: number;
    readonly issue: Issue;
    readonly status: string;
    readonly user?: User;

    constructor(problem: { id: number; issue: Issue, status: string, user?: User }) {
        this.id = problem.id;
        this.issue = problem.issue;
        this.status = problem.status;
        this.user = problem.user;
    }

    static validate(problem: { status?: string}) {
        const status = ["open", "gesloten"];
        if (status && !status.includes(problem.status)) {
            throw new Error("Ongeldige status.");
        }
     }

    static from({ id, issue, status, user }: ProblemPrisma & { issue: IssuePrisma, user?: UserPrisma & {devices : DevicePrisma[]}}) {
        return new Problem({
            id,
            issue: Issue.from(issue),
            status,
            user: user != null ?User.from(user): null
        });
    }
}
