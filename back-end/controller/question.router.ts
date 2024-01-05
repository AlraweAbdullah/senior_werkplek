import express, { Request, Response } from 'express';
import questionsService from '../service/questions.service';
import { DeviceTypeInput, QuestionInput } from '../types/types';
import { cpSync } from 'fs';

const questionRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         questionStr:
 *           type: string
 *         parentQuestion:
 *           $ref: '#/components/schemas/Question'
 *         issue:
 *           $ref: '#/components/schemas/Issue'
 *         deviceType:
 *           $ref: '#/components/schemas/DeviceType'
 *
 *     QuestionInput:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: ID of the question
 *         questionStr:
 *           type: string
 *           description: Question string
 *         parentQuestionId:
 *           type: number
 *           format: int64
 *           description: ID of parent question
 *         issueId:
 *           type: number
 *           format: int64
 *           description: ID of issue
 *         deviceTypeId:
 *           type: number
 *           format: int64
 *           description: ID of deviceType
 */

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get all questions
 *     responses:
 *       '200':
 *         description: All questions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 */

questionRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await questionsService.getAllQuestions();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionInput'
 *     responses:
 *       '200':
 *         description: The question was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       '400':
 *         description: Error
 */

questionRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newQuestion = <QuestionInput>req.body;
        const result = await questionsService.createQuestion(newQuestion);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /questions:
 *   put:
 *     summary: Update a question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionInput'
 *     responses:
 *       '200':
 *         description: The question was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       '404':
 *         description: Question not found
 */

questionRouter.put('/', async (req: Request, res: Response) => {
    try {
        const inputQuestion = <QuestionInput>req.body;
        const result = await questionsService.updateQuestion(inputQuestion);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Delete a question by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the question
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Returns the deleted question, if not, then an error is returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 */

questionRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const result = await questionsService.deleteQuestionById(parseInt(req.params.id as string));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /questions/{id}/add:
 *   post:
 *     summary: Create a new sub-question for a parent-question
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the parent-question
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionInput'
 *     responses:
 *       '200':
 *         description: The sub-question was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       '400':
 *         description: Error
 */

questionRouter.post('/:id/add', async (req: Request, res: Response) => {
    try {
        const inputQuestion = <QuestionInput>req.body;
        const result = await questionsService.createSubQuestionForParentId(
            parseInt(req.params.id as string),
            inputQuestion
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /questions/primary/{deviceTypeId}:
 *   get:
 *     summary: Primary question of a deviceType
 *     responses:
 *       200:
 *         description: Returns Primary querstions if not, then an error is returned
 *         content:
 *           application/json:
 *             type: array
 *             schema:
 *                $ref: '#/components/schemas/Question'
 *     parameters:
 *       - name: deviceTypeId
 *         in: path
 *         description: Id of the deviceType
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
questionRouter.get('/primary/:deviceTypeId', async (req: Request, res: Response) => {
    try {
        const result = await questionsService.getPrimaryQuestionForDeviceType(parseInt(req.params.deviceTypeId as string))
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
})

/**
 * @swagger
 * /questions/subQuestions/{id}:
 *   get:
 *     summary: subQuestion of a question id
 *     responses:
 *       200:
 *         description: Returns subQuerstions if not, then an error is returned
 *         content:
 *           application/json:
 *             type: array
 *             schema:
 *                $ref: '#/components/schemas/Question'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of the question
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
questionRouter.get('/subQuestions/:id', async (req: Request, res: Response) => {
    try {
        const result = await questionsService.getSubQuestionsByParentId(parseInt(req.params.id as string))
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
})


/**
 * @swagger
 * /questions/deviceType/{deviceTypeId}:
 *   get:
 *     summary: Get all questions of a deviceType
 *     responses:
 *       200:
 *         description: Returns querstions if not, then an error is returned
 *         content:
 *           application/json:
 *             type: array
 *             schema:
 *                $ref: '#/components/schemas/Question'
 *     parameters:
 *       - name: deviceTypeId
 *         in: path
 *         description: Id of the deviceType
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
questionRouter.get('/deviceType/:deviceTypeId', async (req: Request, res: Response) => {
    try {
        const result = await questionsService.getQuestionsByDeviceType(parseInt(req.params.deviceTypeId as string))
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
})

export { questionRouter }; 
