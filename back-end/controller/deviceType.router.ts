import express, { Request, Response } from "express";
import deviceTypeService from "../service/deviceType.service";
import { DeviceTypeInput } from "../types/types";
const deviceTypeRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     DeviceType:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string

 *
 *     DeviceTypeInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *
 *     DeviceTypeUpdateInput:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string

 */

/**
 * @swagger
 * /deviceTypes:
 *   get:
 *     summary: Get a list of device types
 *     responses:
 *       '200':
 *         description: List of all device types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DeviceType'
 *       '400':
 *         description: Error
 */

deviceTypeRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await deviceTypeService.getAllDeviceTypes();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /deviceTypes:
 *   post:
 *     summary: Add a device type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeviceTypeInput'
 *     responses:
 *       200:
 *         description: The new device type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeviceType'
 *       404:
 *         description: Error
 */
deviceTypeRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newDevice = <DeviceTypeInput>req.body;
    const result = await deviceTypeService.createDeviceType(newDevice);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /deviceTypes:
 *   put:
 *     summary: Update a device type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeviceTypeUpdateInput'
 *     responses:
 *       '200':
 *         description: Device type that was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeviceType'
 *       '400':
 *         description: Error
 */

deviceTypeRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedDeviceType = <DeviceTypeInput>req.body;
    console.log("Device Type ID:", updatedDeviceType.id);
    const result = await deviceTypeService.updateDeviceType(updatedDeviceType);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /deviceTypes/{id}:
 *   delete:
 *     summary: Delete a device type by id
 *     responses:
 *       '200':
 *         description: Returns the deleted device type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeviceType'
 *       '400':
 *         description: Error
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of the device type
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */

deviceTypeRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id as string);
    const result = await deviceTypeService.deleteDeviceTypeById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /deviceTypes/{id}:
 *   get:
 *     summary: Get a devicetype by ID
 *     responses:
 *       200:
 *         description: Returns the device type, if not, then an error is returned
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/DeviceType'
 *     parameters:
 *        - name: id
 *          in: path
 *          description: ID of the device type
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 */

deviceTypeRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id as string);
    const result = await deviceTypeService.getDeviceTypeById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

export { deviceTypeRouter };
