import { DeviceTypeInput } from "../types";

const getAllDeviceTypes = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/deviceTypes", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    },
  });
};

const addDeviceType = async (deviceType: DeviceTypeInput) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/deviceTypes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    },
    body: JSON.stringify(deviceType),
  });
};

const getDeviceTypeByDeviceId = async (deviceId: number) => {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/devices/" + deviceId + "/deviceType",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    }
  );
};

const deleteDeviceTypeById = async (deviceTypeId: number) => {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/deviceTypes/${deviceTypeId}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    }
  );
};

const getDeviceTypeById = async (deviceTypeId: number) => {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/deviceTypes/" + deviceTypeId,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    }
  );
};

const updateDeviceType = async (deviceType: DeviceTypeInput) => {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/deviceTypes/" + deviceType.id,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
      body: JSON.stringify(deviceType),
    }
  );
};

const DeviceTypeService = {
  updateDeviceType,
  getAllDeviceTypes,
  getDeviceTypeByDeviceId,
  deleteDeviceTypeById,
  getDeviceTypeById,
  addDeviceType,
};

export default DeviceTypeService;
