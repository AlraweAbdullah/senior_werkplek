import { DeviceType, User } from "@prisma/client";
import { DeviceInput } from "../../types/types";
import {
  DevicePrisma,
  Prisma,
  ProblemPrisma,
  database,
} from "../../util/db.server";
import { Device } from "../model/device";
import { Problem } from "../model/problem";
const devices = [];
const createDevice = async (deviceInput: DeviceInput): Promise<Device> => {
  try {
    const devicePrisma = await database.device.create({
      data: {
        name: deviceInput.name,
        purchaseDate: deviceInput.purchaseDate
          ? new Date(deviceInput.purchaseDate)
          : null,
        status: deviceInput.status,
        user: { connect: { id: deviceInput.userId } },
        deviceType: {
          connect: { id: deviceInput.deviceTypeId },
        },
        problems: {
          create: [], // Empty array to represent no initial problems
        },
      },
      include: {
        deviceType: true,
      },
    });
    return Device.from(devicePrisma);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const deviceType = await database.deviceType.findUnique({
          where: { id: deviceInput.deviceTypeId },
        });
        throw new Error(
          `U hebt al een toestel met naam {${deviceInput.name}}, en type  {${deviceType.name}}`
        );
      }
    }
    throw new Error(error.message);
  }
};

const deleteDeviceById = async (id: number): Promise<Device> => {
  try {
    const devicePrisma = await database.device.delete({
      where: {
        id: id,
      },
      include: {
        deviceType: true,
      },
    });

    return Device.from(devicePrisma);
  } catch (error) {}
};

const getDeviceByName = ({ name }): Device | Device[] => {
  return devices.filter((device) => device.name === name);
};

const getAllDevices = async (): Promise<Device[]> => {
  try {
    const devicesPrisma: DevicePrisma[] = await database.device.findMany({
      include: {
        problems: { include: { issue: true } },
        deviceType: true,
        user: true,
      },
    });
    return devicesPrisma.map((devicePrisma) => Device.from(devicePrisma));
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDeviceById = async (id: number): Promise<Device> => {
  try {
    const devicePrisma = await database.device.findUnique({
      where: { id: id },
      include: {
        deviceType: true,
      },
    });

    return devicePrisma ? Device.from(devicePrisma) : null;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateDevice = async (deviceInput: DeviceInput): Promise<Device> => {
  try {
    const devicePrisma = await database.device.update({
      where: {
        id: deviceInput.id,
      },
      data: {
        name: deviceInput.name,
        purchaseDate: deviceInput.purchaseDate
          ? new Date(deviceInput.purchaseDate)
          : null,
        status: deviceInput.status,
        deviceType: {
          connect: { id: deviceInput.deviceTypeId },
        },
      },
      include: {
        deviceType: true,
      },
    });

    return Device.from(devicePrisma);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const deviceType = await database.deviceType.findUnique({
          where: { id: deviceInput.deviceTypeId },
        });
        throw new Error(
          `U hebt al een toestel met naam {${deviceInput.name}}, en type  {${deviceType.name}}`
        );
      }
    }
    throw new Error(error.message);
  }
};

const changeDeviceStatus = async (deviceInput: DeviceInput) => {
  try {
    const devicePrisma = await database.device.update({
      where: {
        id: deviceInput.id,
      },
      data: {
        status: deviceInput.status,
      },
      include: {
        deviceType: true,
      },
    });
    return Device.from(devicePrisma);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserDevices = async (id: number): Promise<Device[]> => {
  try {
    const devicesPrisma: DevicePrisma[] = await database.device.findMany({
      where: { user_id: id },
      include: {
        problems: { include: { issue: true } },
        deviceType: true,
        user: true,
      },
    });
    return devicesPrisma.map((devicePrisma) => Device.from(devicePrisma));
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createDevice,
  getDeviceByName,
  getAllDevices,
  getDeviceById,
  deleteDeviceById,
  updateDevice,
  getUserDevices,
  changeDeviceStatus,
};
