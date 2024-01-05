import { PrismaClient, Prisma } from "@prisma/client";

const database = new PrismaClient();

type ProblemPrisma = Prisma.ProblemGetPayload<{
  include: { issue: true; device: false };
}>;

type DeviceTypePrisma = Prisma.DeviceTypeGetPayload<{}>;

type DevicePrisma = Prisma.DeviceGetPayload<{
  include: {
    deviceType: true;
    problems: { include: { issue: true } };
    user: false;
  };
}>;

type UserPrisma = Prisma.UserGetPayload<{
  include: { devices: true };
}>;

type IssuePrisma = Prisma.IssueGetPayload<{}>;

export {
  database,
  ProblemPrisma,
  DeviceTypePrisma,
  IssuePrisma,
  Prisma,
  DevicePrisma,
  UserPrisma,
};
