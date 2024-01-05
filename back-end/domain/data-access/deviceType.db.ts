import { database, DeviceTypePrisma, Prisma } from "../../util/db.server";
import { DeviceTypeInput } from "../../types/types";

const getAllDeviceTypes = async (): Promise<DeviceTypePrisma[]> => {
  return await database.deviceType.findMany({});
};

const getDeviceTypeById = async (id: number): Promise<DeviceTypePrisma> => {
  const deviceType = await database.deviceType.findUnique({
    where: { id: id },
  });

  if (!deviceType) {
    throw new Error(`Device type met id ${id} is niet gevonden`);
  }

  return deviceType;
};

const createDeviceType = async ({
  name,
}: DeviceTypeInput): Promise<DeviceTypePrisma> => {
  try {
    return await database.deviceType.create({
      data: {
        name,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(`Device type met naam {${name}} bestaat al`);
      }
    }
    throw new Error(error.message);
  }
};

const deleteDeviceTypeById = async (id: number): Promise<DeviceTypePrisma> => {
  const deleteDeviceType = await database.deviceType.delete({
    where: {
      id: id,
    },
  });
  return deleteDeviceType;
};

const updateDeviceType = async ({
  id,
  name,
}: DeviceTypeInput): Promise<DeviceTypePrisma> => {
  try {
    return await database.deviceType.update({
      where: {
        id: id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(`Device type met naam {${name}} bestaat al`);
      }
    }
    throw new Error(error.message);
  }
};

const getDeviceTypeByDeviceId = async (
  deviceId: number
): Promise<DeviceTypePrisma> => {
  const device = await database.device.findUnique({
    where: { id: deviceId },
    include: {
      deviceType: true,
    },
  });

  if (!device) {
    throw new Error(`Device met id ${deviceId} is niet gevonden`);
  }

  return device.deviceType;
};

export default {
  getDeviceTypeByDeviceId,
  getAllDeviceTypes,
  getDeviceTypeById,
  createDeviceType,
  updateDeviceType,
  deleteDeviceTypeById,
};
