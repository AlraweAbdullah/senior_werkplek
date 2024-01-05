import { DeviceType as DeviceTypePrisma } from ".prisma/client";

export class DeviceType {
  readonly id: number;
  readonly name: string;

  constructor(deviceType: { id?: number; name: string }) {
    this.id = deviceType.id;
    this.name = deviceType.name;
  }

  equals(other: DeviceType) {
    if (this.name === other.name) return true;
    else false;
  }

  static validate(deviceType: { name: string }) {
    if (deviceType.name === "") {
      throw new Error("Naam mag niet leeg zijn.");
    }
  }

  static from({ id, name }: DeviceTypePrisma) {
    return new DeviceType({
      id: id,
      name: name,
    });
  }
}
