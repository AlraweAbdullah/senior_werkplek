import { de } from "date-fns/locale";
import deviceTypeDB from "../domain/data-access/deviceType.db";
import { DeviceTypeInput } from "../types/types";
import { DeviceTypePrisma } from "../util/db.server";
import { DeviceType } from "../domain/model/deviceType";

const getAllDeviceTypes = async (): Promise<DeviceTypePrisma[]> =>
  deviceTypeDB.getAllDeviceTypes();

const getDeviceTypeById = async (id: number): Promise<DeviceTypePrisma> => {
  return await deviceTypeDB.getDeviceTypeById(id);
};

const deleteDeviceTypeById = async (id: number): Promise<DeviceTypePrisma> => {
  //Check if devicetype exist with help of get getDeviceTypeById below
  await getDeviceTypeById(id);
  return await deviceTypeDB.deleteDeviceTypeById(id);
};

const createDeviceType = async (
  deviceType: DeviceTypeInput
): Promise<DeviceTypePrisma> => {
  DeviceType.validate(deviceType);
  return await deviceTypeDB.createDeviceType(deviceType);
};

const updateDeviceType = async (
  deviceType: DeviceTypeInput
): Promise<DeviceTypePrisma> => {
  DeviceType.validate(deviceType);
  //Check if devicetype exist with help of get getDeviceTypeById below
  await getDeviceTypeById(deviceType.id);
  return await deviceTypeDB.updateDeviceType(deviceType);
};

const getDeviceTypeByDeviceId = async (
  id: number
): Promise<DeviceTypePrisma> => {
  const deviceType = await deviceTypeDB.getDeviceTypeByDeviceId(id);
  if (!deviceType) {
    throw new Error(`Device met id ${id} is niet gevonden`);
  }
  return deviceType;
};

export default {
  getDeviceTypeByDeviceId,
  getAllDeviceTypes,
  getDeviceTypeById,
  deleteDeviceTypeById,
  createDeviceType,
  updateDeviceType,
};
