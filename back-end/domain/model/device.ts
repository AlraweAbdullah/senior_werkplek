import { Device as DevicePrisma } from "@prisma/client";
import { DeviceType as DeviceTypePrisma } from "@prisma/client";

export class Device {
  readonly id?: number;
  readonly name: string;
  readonly deviceType: string;
  readonly purchaseDate?: Date;
  readonly status: string;

  constructor(device: {
    id?: number;
    name: string;
    deviceType: string;
    purchaseDate?: Date;
    status: string;
  }) {
    this.name = device.name;
    this.id = device.id;
    this.deviceType = device.deviceType;
    this.purchaseDate = device.purchaseDate;
    this.status = device.status;
  }

  static validate(device: { purchaseDate: Date }) {
    if (device.purchaseDate < new Date()) {
      throw new Error("Aankoopdatum moet in het verleden zijn.");
    }
  }

  static from({
    id,
    name,
    deviceType,
    purchaseDate,
    status,
  }: DevicePrisma & { deviceType: DeviceTypePrisma; status: string }) {
    return new Device({
      id,
      name,
      deviceType: deviceType != null ? deviceType.name : null,
      purchaseDate,
      status,
    });
  }
}
