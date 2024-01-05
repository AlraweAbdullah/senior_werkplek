import express, { Request, Response } from "express";
import userService from "../service/user.service";
import { UserInput } from "../types/types";
import problemService from "../service/problem.service";
import { PDFDocument, rgb } from 'pdf-lib';
import path from "path";
import fs from 'fs';
const userRouter = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *                  name:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  role:
 *                      type: string
 *                  devices:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Device'
 *
 *          UserUpdateInput:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *                      description: ID of the user
 *                  name:
 *                      type: string
 *                      description: Name of the user
 *                  lastName:
 *                      type: string
 *                      description: The last name of the user
 *                  email:
 *                      type: string
 *                      description: The email address of the user
 *                  password:
 *                      type: string
 *                  role:
 *                      type: string
 *                      description: The role of the user regarding permissions (regular user, admin, ...)
 *          UserInput:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Name of the user
 *                  lastName:
 *                      type: string
 *                      description: The last name of the user
 *                  email:
 *                      type: string
 *                      description: The email address of the user
 *                  password:
 *                      type: string
 *                  role:
 *                      type: string
 *                      description: The role of the user regarding permissions (regular user, admin, ...)
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: The new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Error
 */

userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newUser = <UserInput>req.body;
    const result = await userService.createUser(newUser);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: All users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     responses:
 *       200:
 *         description: Returns the  user, if not, then an error is returned
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *     parameters:
 *        - name: id
 *          in: path
 *          description: ID of the user
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 */

userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id as string);
    const result = await userService.getUserById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     responses:
 *       200:
 *         description: Returns the deleted user, if not, then an error is returned
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *     parameters:
 *        - name: id
 *          in: path
 *          description: ID of the user
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 */

userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id as string);
    const result = await userService.deleteUserById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Error
 */

userRouter.put("/", async (req: Request, res: Response) => {
  try {
    const updatedUser = <UserInput>req.body;
    const result = await userService.updateUser(updatedUser);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: The new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Error
 */

userRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const userInput = <UserInput>req.body;
    const token = await userService.authenticate(userInput);
    const user = await userService.getUserByEmail({ email: userInput.email });
    res
      .status(200)
      .json({ message: "Authintication succesful", token, user: user });
  } catch (error) {
    res
      .status(401)
      .json({ status: "Unauthorized", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /users/{id}/devices:
 *   get:
 *     summary: Get user devices
 *     responses:
 *       200:
 *         description: Returns user devices if not, then an error is returned
 *         content:
 *           application/json:
 *             type: array
 *             schema:
 *                $ref: '#/components/schemas/Device'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of the user
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */

userRouter.get("/:id/devices", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id as string);
    const result = await userService.getUserDevices(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /devices/{deviceId}:
 *   get:
 *     summary: Get a user by Device ID
 *     responses:
 *       200:
 *         description: Returns the user if found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error response if the user is not found or an error occurs
 *         content:
 *           application/json:
 *             example:
 *               status: "error"
 *               errorMessage: "Error message details"
 *     parameters:
 *       - name: deviceId
 *         in: path
 *         description: ID of the device
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */

userRouter.get("/:id/user", async (req: Request, res: Response) => {
  try {
    const deviceId: number = parseInt(req.params.id as string);
    const result = await userService.getUserByDeviceId(deviceId);
    console.log("Received deviceId:", deviceId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "error", errorMessage: error.message });
  }
});

/**
 * @swagger
 * /users/{userId}/problems/{problemId}/pdf:
 *   get:
 *     summary: Send PDF
 *     responses:
 *       200:
 *         description: Returns user devices if not, then an error is returned
 *         content:
 *           application/json:
 *             type: array
 *             schema:
 *                $ref: '#/components/schemas/Device'
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Id of the user
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: problemId
 *         in: path
 *         description: Id of the problem
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
userRouter.get("/:userId/problems/:problemId/pdf", async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.userId as string);
    const problemId: number = parseInt(req.params.problemId as string);
    const user = await userService.getUserById(userId);
    const problem = await problemService.getProblemById(problemId);

    
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a page to the document
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();


    const logoImagePath = path.join(__dirname, '../util/img/logo.png');
    const logoImageBytes = fs.readFileSync(logoImagePath);
    const logoImage = await pdfDoc.embedPng(logoImageBytes);

    // Set font size for text
    const fontSize = 10;
    const fontSizeTitle = 16;

    // Draw the logo in the top left corner with fixed padding
    page.drawImage(logoImage, { x: width - 550, y: height - 150, width: 100, height: 100 });

    // Draw the company name and email beside the logo with fixed padding
    page.drawText(user.lastName + ' ' + user.name, { x: width - 150, y: height - 170, size: fontSize });
    page.drawText(user.email, { x: width - 150, y: height - 190, size: fontSize });

    page.drawText('MaakbaarLeuven', { x: width - 540, y: height - 170, size: fontSize });
    page.drawText('leuvenmaakbaar', { x: width - 540, y: height - 190, size: fontSize });
    page.drawText('Paul van Ostaijenlaan 24, 3001 Leuven', { x: width - 540, y: height - 210, size: fontSize });

    // Draw the horizontal line with fixed padding
    page.drawLine({
      start: { x: 20, y: height - 220 },
      end: { x: width - 20, y: height - 220 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    const sanitizedDescription = problem.issue.description?.replace(/\u200B/g, '') || '';
    const sanitizedAnswer = problem.issue.answer?.replace(/\u200B/g, '') || '';
    page.drawText('Probleem', { x: width - 540, y: height - 240, size: fontSizeTitle });
    page.drawText(sanitizedDescription, { x: width - 540, y: height - 260, size: fontSize, lineHeight: 12 });
    page.drawText('Oplossing', { x: width - 540, y: height - 280, size: fontSizeTitle });
    page.drawText(sanitizedAnswer, { x: width - 540, y: height - 300, size: fontSize, lineHeight: 12 });
    page.drawText('Stappenplan', { x: width - 540, y: height - 320, size: fontSizeTitle });
    page.drawText('1: Als de stofzuiger nog ingestoken is, trek hem uit het stopcontact\n2: Vijs de onderkant los en vijs dan de motor los en haal die eruit\n3: Als je een andere motor hebt gekocht, steek deze erin en vijs vast. Vijs de onderkant terug vast\n4: Test nu grondig of alles werkt zonder dat de stofzuiger rookt of raar ruikt. Als dit niet het geval is, trek hem uit,\n leg hem op een plaats met het minste brandgevaar en ga dan over naar de volgende stap\n5: Als het heftig rookt of in brand gaat, bel dan 112. Anders, neem contact op met professionals\n om het door hen te laten maken als dit mogelijk is', { x: width - 540, y: height - 340, size: fontSize, lineHeight: 12 });
    page.drawText('Reparatieplaatsen', { x: width - 540, y: height - 430, size: fontSizeTitle });
    page.drawText('Repair Café Heverlee: Naamsesteenweg 355, 3001 Leuven - Annuntiaten WZC\nRepair Café Hal 5: Diestsesteenweg 104 - 3010 Kessel-Lo\nRepair café @ Repair Hub: Stapelhuisstraat 15, 3000 Leuven\nTextiel repair café: Tiensevest 60 lokaal 301, 3000 Leuven', { x: width - 540, y: height - 450, size: fontSize, lineHeight: 12 });
    page.drawText('CO2-impact', { x: width - 540, y: height - 510, size: fontSizeTitle });
    page.drawText('Als je een nieuw apparaat koopt, gooi je het oude weg. Dit heeft een CO2-impact aan het einde van de levensduur.\nDaarnaast moet er een nieuw apparaat worden geproduceerd, wat een CO2-productie-impact heeft.\nMaar het repareren van je kapotte apparaat heeft ook een CO2-reparatie-impact. Reserveonderdelen moeten,\nbijvoorbeeld worden weggegooid en geproduceerd. Ten slotte zal het apparaat in beide gevallen,\n(reparatie - nieuw kopen) ook dagelijks worden gebruikt, wat een gebruiksimpact genereert.\nHet resultaat dat hieronder wordt berekend en weergegeven, houdt rekening met al deze parameters,\nover een periode van 3, wat de verwachte levensduur van het apparaat is als het zou worden gerepareerd.', { x: width - 540, y: height - 530, size: fontSize, lineHeight: 12 });

    // Load the image from the public directory
    const imagePath = path.join(__dirname, '../util/img/image.png');
    const ImageBytes = fs.readFileSync(imagePath);
    const Image = await pdfDoc.embedPng(ImageBytes);

    // Draw the image under the last text
    page.drawImage(Image, { x: width - 440, y: height - 860, width: 250, height: 250 });

    const pdfBytes = await pdfDoc.save();

    // Set the response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');

    // Send the PDF buffer as the response
    res.send(pdfBytes);

    // Assuming sendPdfViaMail is available in the scope
    await userService.sendPdfViaMail(pdfBytes, userId);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ status: 'error', errorMessage: 'Internal Server Error' });
  }
});
export { userRouter };
