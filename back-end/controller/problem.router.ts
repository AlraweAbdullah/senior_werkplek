/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateIssueInput:
 *       type: object
 *       properties:
 *         answer: 
 *           type: string      
 *     Problem:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         issue:
 *           $ref: '#/components/schemas/Issue'
 *         status:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *     ProblemInput:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Id of the problem
 *         issue:
 *           $ref: '#/components/schemas/Issue'
 *         deviceId:
 *           type: number
 *           format: int64
 *         status:
 *           type: string
 *         userId:
 *           type: number
 *           format: int64
 */

import express, { Request, Response } from 'express';
import problemService from '../service/problem.service';
import type { ProblemInput } from '../types/types';

export const problemRouter = express.Router();

/**
 * @swagger
 * /problems:
 *   post:
 *     summary: Create a new problem.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProblemInput'
 *     responses:
 *       200:
 *         description: Problem created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Problem'
 *       404:
 *         description: Error
 */

problemRouter.post('/', async (req: Request, res: Response) => {
    const newProblem = <ProblemInput>req.body;
    try {
        const problem = await problemService.createProblem(newProblem);
        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /problems:
 *   get:
 *     summary: Get a list of all problems.
 *     description: Retrieves a list of all problems from the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of all problems is shown.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Problem'
 *       404:
 *         description: Error
 */

problemRouter.get('/', async (req: Request, res: Response) => {
    try {
        const problems = await problemService.getAllProblems();
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /problems/{id}:
 *   get:
 *     summary: Retrieve a problem by ID.
 *     description: Retrieves a problem from the database by its unique identifier.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique identifier of the problem to retrieve.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful response with the problem.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Problem'
 *       404:
 *         description: Problem not found
 */

problemRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const problem = await problemService.getProblemById(id);
        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /problems/{id}:
 *   delete:
 *     summary: Delete a problem by ID
 *     responses:
 *       200:
 *         description: Returns the deleted problem, if not, then an error is returned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Problem'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the problem.
 *         required: true
 *         type: integer
 *         format: int64
 */

problemRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const deletedProblem = await problemService.deleteProblemById(id);
        res.status(200).json(deletedProblem);
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /problems:
 *   put:
 *     summary: Update a problem.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProblemInput'
 *     responses:
 *       200:
 *         description: The updated problem.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Problem'
 *       404:
 *         description: Error
 */

problemRouter.put('/', async (req: Request, res: Response) => {
    try {
        const updatedProblem = <ProblemInput>req.body;
        const problem = await problemService.updateProblem(updatedProblem);
        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /problems/{id}/answer:
 *   put:
 *     summary: change awnser to issue of problem.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateIssueInput'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the problem.
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: The updated problem with updated issue.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Problem'
 *       404:
 *         description: Error
 */
problemRouter.put('/:id/answer', async (req: Request, res: Response) => {
    try {
        const answer = <{ answer: string }>req.body
        const updatedProblem = await problemService.changeAnswer(parseInt(req.params.id as string), answer.answer)
        res.status(200).json(updatedProblem)
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
})

export default { problemRouter };
