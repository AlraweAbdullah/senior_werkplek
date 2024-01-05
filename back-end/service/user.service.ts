import userDb from "../domain/data-access/user.db";
import { User } from "../domain/model/user";
import { UserInput } from "../types/types";
import emailSender from "../util/emailSender";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import deviceService from "./device.service";
import { Device } from "../domain/model/device";

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => {
  const user = await userDb.getUserById(id);
  if (!user) throw new Error(`User met id ${id} is niet gevonden.`);
  return user;
};

const deleteUserById = async (id: number): Promise<User> => {
  //Check if user exist with help of get getUserById below
  await getUserById(id);
  return await userDb.deleteUserById(id);
};

const jwtSecret = process.env.JWT_SECRET;
const genrateJwtToken = (email: string): string => {
  const options = {
    expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`,
    issuer: "BookHub",
  };
  try {
    return jwt.sign({ email }, jwtSecret, options);
  } catch (error) {
    console.log(error);
    throw new Error("Error genrating JWT token");
  }
};
const createUser = async (user: UserInput): Promise<User> => {
  User.validate(user);
  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;
  const createdUser = await userDb.createUser(user);
  emailSender.sendMail(createdUser.email, createdUser.name)
  return createdUser
};
const authenticate = async ({
  password,
  email,
}: UserInput): Promise<string> => {
  const user = await getUserByEmail({ email });
  if (!user) {
    throw new Error("Gebruiker niet gevonden");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Fout passwoord");
  }

  return genrateJwtToken(email);
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User> => {
  if (!email) {
    throw new Error("E-mail is leeg.");
  }
  const user = await userDb.getUserByEmail(email);

  return user;
};
const updateUser = async (user: UserInput): Promise<User> => {
  User.validate(user);
  //Check if user exist with help of get getUserById below
  await getUserById(user.id);
  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;
  return await userDb.updateUser(user);
};

const getUserDevices = async (id: number): Promise<Device[]> => {
  await getUserById(id);
  return await deviceService.getUserDevices(id);
};

const getUserByDeviceId = async (id: number): Promise<User> => {
  const user = await userDb.getUserByDeviceId(id);
  if (!user) {
    throw new Error(`Device met id ${id} is niet gevonden`);
  }
  return user;
};

const sendPdfViaMail = async (pdf: Uint8Array, id: number) => {
  const user = await userDb.getUserById(id)
  emailSender.sendPdf(pdf, user.email, user.name)
}

export default {
  getUserByDeviceId,
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
  createUser,
  updateUser,
  authenticate,
  getUserDevices,
  sendPdfViaMail
};
