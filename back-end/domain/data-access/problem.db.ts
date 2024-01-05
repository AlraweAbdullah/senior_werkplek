import { ProblemInput } from '../../types/types';
import { Prisma, database } from '../../util/db.server';
import { Problem } from '../model/problem';

const getAllProblems = async (): Promise<Problem[]> => {
    try {
        const problemsPrisma = await database.problem.findMany({
            include: { issue: true, device: false, user: {include: {devices: {include: {user:false, deviceType: true}}}} },
        });
        return problemsPrisma.map((problemPrisma) => Problem.from(problemPrisma));
    } catch (error) {
        throw new Error(error.message)
    }
};

const getProblemById = async (id: number): Promise<Problem> => {
    try {
        const problemPrisma = await database.problem.findUnique({
            where: { id: id },
            include: { issue: true, device: false, user: {include: {devices: {include: {user:false, deviceType: true}}}} },
        });
        if (problemPrisma) {
            return Problem.from(problemPrisma);
        }
    } catch (error) {
        throw new Error(error.message)
    }
};

const deleteProblemById = async (id: number): Promise<Problem> => {
    try {
        const deletedProblemPrisma = await database.problem.delete({
            where: { id: id },
            include: { issue: true, device: false, user: {include: {devices: {include: {user:false, deviceType: true}}}} },
        });
        return Problem.from(deletedProblemPrisma);
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateProblem = async (problemInput: ProblemInput): Promise<Problem> => {
    try {
        const problemPrisma = await database.problem.update({
            where: {
                id: problemInput.id,
            },
            data: {
                issue: {
                    update: {
                        description: problemInput.issue.description,
                        answer: problemInput.issue.answer,
                    },
                },
                user: {connect: {id: problemInput.userId}},
                status: problemInput.status
            },
            include: { issue: true, device: false, user: {include: {devices: {include: {user:false, deviceType: true}}}}},
        });

        return Problem.from(problemPrisma);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(`Problem type met id {${problemInput.id}} bestaat al`);
            }
        }
        throw new Error(error.message);
    }
};

const getProblemsByDeviceId = async (deviceId: number): Promise<Problem[]> => {
    try {
        const problemsPrisma = await database.problem.findMany({
            where: { device_id: deviceId },
            include: {
                issue: true,
                device: false,
                user: {include: {devices: {include: {user:false, deviceType: true}}}}
            },
        });

        // Sort problems based on whether the related issue's answer is null
        const sortedProblems = problemsPrisma.sort((a, b) => {
            const answerA = a.issue?.answer;
            const answerB = b.issue?.answer;

            if (answerA === null && answerB !== null) {
                return -1; // Move problems with null answer to the beginning
            } else if (answerA !== null && answerB === null) {
                return 1;  // Move problems with null answer to the end
            } else {
                return 0;  // Maintain the current order
            }
        });

        return sortedProblems.map((problemPrisma) => Problem.from(problemPrisma));
    } catch (error) {
        throw new Error(error.message);
    }
};


const createProblem = async (problemInput: ProblemInput): Promise<Problem> => {
    try {
        const problemPrisma = await database.problem.create({
            data: {
                status: problemInput.status,
                issue: {
                    connect: {
                        id: problemInput.issue.id,
                    },
                },
                device: {
                    connect: {
                        id: problemInput.deviceId,
                    },
                },
                user: problemInput.userId ? { connect: { id: problemInput.userId } } : undefined,
            },
            include: {
                user: {include: {devices: {include: {user: false, deviceType: true}}}},
                issue: true,
                device: false
            }
        });

        if (problemPrisma && problemInput.issue.answer) {
            await database.issue.update({
                where: { id: problemInput.issue.id },
                data: {
                    description: problemInput.issue.description
                },
            });
        }

        return problemPrisma ? Problem.from(problemPrisma) : null;
    } catch (error) {
        throw new Error(error.message);
    }
};





export default {
    createProblem,
    getAllProblems,
    getProblemById,
    deleteProblemById,
    updateProblem,
    getProblemsByDeviceId,
};
