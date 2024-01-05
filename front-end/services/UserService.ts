import { User } from "../types";

const login = async (user: User) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
    body: JSON.stringify(user),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};

const signup = async (user: User) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
    body: JSON.stringify(user),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};

const getUsersDevices = async (id: number) => {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/users/" + id + "/devices",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    }
  );
};

const getUserByDeviceId = async (id: number) => {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/users/" + id + "/user",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    }
  );
};

const getUser = async (id: number) => {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/users/" + id ,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    }
  );
};



const sendPDF = async (userId: number, problemId: number) => {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/users/" + userId + "/problems/" + problemId 
    + "/pdf",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    }
  );
};


const getAllUsers = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    },
  });
};

const UserService = {
  getAllUsers,
  getUserByDeviceId,
  login,
  signup,
  getUsersDevices,
  getUser,
  sendPDF
};

export default UserService;
