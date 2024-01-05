import { th } from "date-fns/locale";
import { Device } from "./device";
import { User as UserPrisma } from "@prisma/client";
import { Device as DevicePrisma } from "@prisma/client";
import { DeviceType as DeviceTypePrisma } from "@prisma/client";
export class User {
  readonly id?: number;
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly devices?: Device[];

  constructor(user: {
    id?: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    devices: Device[];
  }) {
    this.id = user.id;
    this.name = user.name;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.devices = user.devices;
  }

  static validate(user: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }) {
    if (user.name === "") {
      throw new Error("Voornaam mag niet leeg zijn.");
    }
    if (user.lastName === "") {
      throw new Error("Achternaam mag niet leeg zijn.");
    }
    if (!new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$").test(user.email)) {
      throw new Error("Ongeldig e-mailadres.");
    }

    if (!new RegExp(".{8,}").test(user.password)) {
      throw new Error("Wachtwoord moet minstens 8 tekens lang zijn.");
    }
    const roles = ["admin", "user", "technicians"];
    if (!roles.includes(user.role)) {
      throw new Error("Ongeldige rol.");
    }
  }

  static from({
    id,
    name,
    lastName,
    email,
    password,
    role,
    devices,
  }: UserPrisma & { devices: DevicePrisma[] }) {
    return new User({
      id,
      name,
      lastName,
      email,
      password,
      role,
      devices: devices.map((devicePrisma: DevicePrisma & {deviceType: DeviceTypePrisma}) => Device.from(devicePrisma)),
    });
  }
}
