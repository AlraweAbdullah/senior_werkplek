import { Problem } from "../types";

const getDeviceProblems = async (deviceId: number) => {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/devices/${deviceId}/problems `,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    }
  );
};

const getProblemById = async (problemId: number) => {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/problems/${problemId} `,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    }
  );
};

const addProblem = async (problem: Problem) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/problems", {
    body: JSON.stringify(problem),
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    },
  });
};

const updateProblem = async (id: number) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + `/problems/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    },
  });
};

const ProblemService = {
  getDeviceProblems,
  addProblem,
  getProblemById,
  updateProblem,
};

export default ProblemService;
