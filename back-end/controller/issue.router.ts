import express, { Request, Response } from "express";
import { IssueInput } from "../types/types";
import issueService from "../service/issue.service";
const issueRouter = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Issue:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *                  decription:
 *                      type: string
 *                  answer:
 *                      type: string

 *
 *          IssueInput:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *                      description: ID of the user
 *                  description:
 *                      type: string
 *                      description: description of the issue
 *                  answer:
 *                      type: string
 *                      description: answer of the issue

 *          IssueUpdateInput:
 *              type: object
 *              properties:
 *                  description:
 *                      type: string
 *                      description: description of the issue
 *                  answer:
 *                      type: string
 *                      description: answer of the issue
 * 
 */

/**
 * @swagger
 * /issues:
 *   post:
 *     summary: Add an issue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IssueInput'
 *     responses:
 *       200:
 *         description: The new issue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       404:
 *         description: Error
 */

issueRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newIssue = <IssueInput>req.body;
    const result = await issueService.createIssue(newIssue);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 *
 * /issues:
 *  update:
 *     summary: Update an issue
 *     requestBody:
 *        required: true
 *        content:
 *         application/json:
 *          schema:
 *           $ref: '#/components/schemas/IssueUpdateInput'
 *     responses:
 *        200:
 *         description: The updated issue
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Issue'
 *        404:
 *         description: Error
 */

issueRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const newIssue = <IssueInput>req.body;
    const result = await issueService.updateIssue(newIssue);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

export { issueRouter };
