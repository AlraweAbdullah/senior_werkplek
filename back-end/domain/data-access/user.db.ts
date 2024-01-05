import { UserInput } from "../../types/types";
import { database, Prisma } from "../../util/db.server";
import { User } from "../model/user";
import { User as UserPrisma } from "@prisma/client";

const createUser = async ({ name, lastName, email, password, role }: UserInput): Promise<User> => {
  try {
    return await database.user.create({
      data: {
        name,
        lastName,
        email,
        role,
        password,
      },
    }); //return User.from(userPrisma);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error(`Gebruiker met email ${email} bestaal al`);
      }
    }
    throw new Error(error.message);
  }
};

const getAllUsers = async (): Promise<UserPrisma[]> => {
  return await database.user.findMany({
    include: {
      devices: {
        include: {
          deviceType: true,
          problems: {
            include: {
              issue: true,
            },
          },
        },
      },
    },
  });
};

const getUserByEmail = async (email: string): Promise<User> => {
  const user = await database.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new Error(`Gebruiker met e-mail ${email} is niet gevonden`);
  }

  return user;
};
const getUserById = async (id: number): Promise<User> => {
  const user = await database.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    throw new Error(`Gebruiker met id ${id} is niet gevonden`);
  }
  return user;
};

const deleteUserById = async (id: number): Promise<User> => {
  const deletedUser = await database.user.delete({
    where: {
      id: id,
    },
  });
  return deletedUser;
};

const updateUser = async ({
  id,
  name,
  lastName,
  email,
  password,
  role,
}: UserInput): Promise<User> => {
  try {
    return await database.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        lastName,
        email,
        role,
        password,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error(`Gebruiker met email ${email} bestaal al`);
      }
    }
    throw new Error(error.message);
  }
};

const getUserByDeviceId = async (deviceId: number): Promise<User> => {
  try {
    const device = await database.device.findUnique({
      where: { id: deviceId },
      include: {
        user: {
          include: {
            devices: {
              include: {
                deviceType: true,
                problems: {
                  include: {
                    issue: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!device || !device.user) {
      throw new Error(`No user found for device id ${deviceId}`);
    }
    console.log("Returned user object:", device.user);

    return User.from(device.user);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getUserByDeviceId,
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  getUserByEmail,
};
