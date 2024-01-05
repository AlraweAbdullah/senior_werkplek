export interface User {
  id?: number;
  name?: string;
  lastName?: string;
  email: string;
  password: string;
  role?: string;
  devices?: Device[];
}

export interface DeviceInput {
  name?: string;
  purchaseDate?: Date;
  deviceTypeId?: number;
  userId?: number;
  status?: string;
}
export interface Question{
  id: number;
  questionStr: string;
  parentQuestion?: Question;
  issue? : Issue;
  deviceType: DeviceType;
}

export interface Device {
  id?: number;
  name: string;
  purchaseDate: Date;
  deviceType: DeviceType;
  status: string;
}

export interface Device2 {
  useremail: string;
  id?: number;
  name: string;
  purchaseDate: Date;
  deviceType: string;
}
export interface DeviceType {
  id?: number;
  name: string;
}

export interface DeviceTypeInput {
  id?: number;
  name: string;
}

export interface Problem {
  id?: number;
  issue: Issue;
  deviceId: number;
  status: string;
}

export interface Issue {
  id?: number;
  description: string;
  answer?: string;
}

export interface StatusMessage {
  type: string;
  message: string;
}
