import { DeviceInput } from "../types";

const addDevice = async (device: DeviceInput) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/devices", {
    body: JSON.stringify(device),
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    },
  });
};

const updateDevice = async (deviceId: number, device: DeviceInput) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/devices/" + deviceId, {
    body: JSON.stringify(device),
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    },
  });
};

const getDevicesById = async (deviceId: number) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/devices/" + deviceId, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    },
  });
};

const deletedeviceById = async (deviceId: number) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + `/devices/${deviceId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    },
  });
};

const getAllDevices = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/devices", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    },
  });
};

const changeDeviceStatus = async (
  deviceId: number,
  deviceInput: DeviceInput
) => {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/devices/${deviceId}/status`,
    {
      body: JSON.stringify(deviceInput),
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    }
  );
};

const DeviceService = {
  getAllDevices,
  addDevice,
  updateDevice,
  deletedeviceById,
  getDevicesById,
  changeDeviceStatus,
};

export default DeviceService;
