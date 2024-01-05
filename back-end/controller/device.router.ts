import express, { Request, Response } from "express";
import deviceService from "../service/device.service";
import { DeviceInput, IssueInput } from "../types/types";
import deviceTypeService from "../service/deviceType.service";
import userService from "../service/user.service";
const deviceRouter = express.Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      Device:
 *       type: object
 *       properties:
 *          id:
 *             type: number
 *             format: int64
 *          name:
 *             type: string
 *          deviceType:
 *             type: string
 *          purchaseDate:
 *            type: string
 *            format: date


 *
 *      DeviceInput:
 *          type: object
 *          properties:
 *             userId:
 *               type: number
 *               format: int64
 *               description: ID of the user
 *             name:
 *               type: string
 *               description: Name of the device
 *             deviceTypeId:
 *               type: number
 *               format: int64
 *               description: Device type id
 *             purchaseDate:
 *               type: string
 *               format: date
 *               description: Purchase date of the device(optional)
 *               nullable: true
 *
 
 */

/**
 * @swagger
 * /devices:
 *      post:
 *         summary: Create a new device
 *         requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/DeviceInput'
 *         responses:
 *           200:
 *              description: The device was successfully created
 *              content:
 *                 application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Device'
 *           400:
 *              description: Error
 */

deviceRouter.post("/", async (req: Request, res: Response) => {
  try {
    const deviceInput: DeviceInput = req.body;
    const device = await deviceService.createDevice(deviceInput);

    res.send(device);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Get all devices
 *     responses:
 *       200:
 *         description: All devices
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 */

deviceRouter.get("/", async (req: Request, res: Response) => {
  try {
    const devices = await deviceService.getAllDevices();
    res.send(devices);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /devices/{id}:
 *   get:
 *     summary: Get a device by ID
 *     responses:
 *       200:
 *         description: Returns the  device, if not, then an error is returned
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Device'
 *     parameters:
 *        - name: id
 *          in: path
 *          description: ID of the user
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 */

deviceRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id as string);
    const result = await deviceService.getDeviceById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});
/**
 * @swagger
 * /devices/{id}:
 *   delete:
 *     summary: Delete a device by ID
 *     responses:
 *       200:
 *         description: Returns the deleted device, if not, then an error is returned
 *         content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Device'
 *     parameters:
 *        -  name: id
 *           in: path
 *           description: ID of the device
 *           required: true
 *           schema:
 *              type: integer
 *              format: int64
 */

deviceRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await deviceService.deleteDeviceById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /devices/{id}:
 *    put:
 *     summary: Update a device
 *     parameters:
 *        -  name: id
 *           in: path
 *           description: ID of the device
 *           required: true
 *           schema:
 *              type: integer
 *              format: int64
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeviceInput'
 *     responses:
 *        200:
 *           description: The updtated device
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Device'
 *        404:
 *           description: Device not found
 */

deviceRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const deviceInput: DeviceInput = req.body;
    const deviceId: number = parseInt(req.params.id);
    deviceInput.id = deviceId;
    const result = await deviceService.updateDevice(deviceInput);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /devices/{id}/problems:
 *   get:
 *     summary: Get all problems of a device.
 *     description: Retrieves all problems associated with a specific device.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique identifier of the device.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Successful response with an array of problems for the specified device.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Problem'
 *       404:
 *         description: Device not found or no problems associated with the device.
 */
deviceRouter.get("/:id/problems", async (req: Request, res: Response) => {
  try {
    const deviceId: number = parseInt(req.params.id);
    const result = await deviceService.getDeviceProblems(deviceId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /device/{id}:
 *   get:
 *     summary: Get a device type by Device ID
 *     responses:
 *       200:
 *         description: Returns the device type if found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeviceType'
 *       400:
 *         description: Error response if the device type is not found or an error occurs
 *         content:
 *           application/json:
 *             example:
 *               status: "error"
 *               errorMessage: "Error message details"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the device
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */

deviceRouter.get("/:id/deviceType", async (req: Request, res: Response) => {
  try {
    const deviceId: number = parseInt(req.params.id as string);

    const result = await deviceTypeService.getDeviceTypeByDeviceId(deviceId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

deviceRouter.put("/:id/status", async (req: Request, res: Response) => {
  try {
    const deviceInput: DeviceInput = req.body;
    const deviceId: number = parseInt(req.params.id as string);
    deviceInput.id = deviceId;
    const result = await deviceService.changeDeviceStatus(deviceInput);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

export { deviceRouter };
