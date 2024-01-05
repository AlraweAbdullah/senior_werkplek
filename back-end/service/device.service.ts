import { User } from "@prisma/client";
import deviceDb from "../domain/data-access/device.db";
import deviceTypeDb from "../domain/data-access/deviceType.db";
import userDb from "../domain/data-access/user.db";
import { Device } from "../domain/model/device";
import { Problem } from "../domain/model/problem";
import { DeviceInput, IssueInput } from "../types/types";
import problemService from "./problem.service";
import { de } from "date-fns/locale";

const getAllDevices = async (): Promise<Device[]> => deviceDb.getAllDevices();

const getDeviceById = async (id: number): Promise<Device> => {
  const device = await deviceDb.getDeviceById(id);
  if (!device) throw new Error(`Toestel met Id ${id} is niet gevonden.`);
  return device;
};

const deleteDeviceById = async (id: number): Promise<Device> => {
  await getDeviceById(id);
  return deviceDb.deleteDeviceById(id);
};

const createDevice = async (deviceInput: DeviceInput): Promise<Device> => {
  await userDb.getUserById(deviceInput.userId);
  await deviceTypeDb.getDeviceTypeById(deviceInput.deviceTypeId);

  return deviceDb.createDevice(deviceInput);
};

const updateDevice = async (deviceInput: DeviceInput): Promise<Device> => {
  await getDeviceById(deviceInput.id);
  return deviceDb.updateDevice(deviceInput);
};

const getUserDevices = async (id: number): Promise<Device[]> => {
  return deviceDb.getUserDevices(id);
};

const getDeviceProblems = async (deviceId: number): Promise<Problem[]> => {
  return await problemService.getDeviceProblems(deviceId);
};

const changeDeviceStatus = async (
  deviceInput: DeviceInput
): Promise<Device> => {
  return deviceDb.changeDeviceStatus(deviceInput);
};

export default {
  getAllDevices,
  getDeviceById,
  deleteDeviceById,
  createDevice,
  updateDevice,
  getUserDevices,
  getDeviceProblems,
  changeDeviceStatus,
};
