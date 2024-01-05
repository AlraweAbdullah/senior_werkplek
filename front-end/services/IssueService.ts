const updateIssueWithAnswer = async (
  issueId: number,
  newAnswer: string,
  description: string
) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + `/issues/${issueId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    },
    body: JSON.stringify({
      id: issueId,
      description: description,
      answer: newAnswer,
    }),
  });
};

const getIssueById = async (issueId: number) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + `/issues/${issueId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    },
  });
};

const IssueService = {
  getIssueById,
  updateIssueWithAnswer,
};

export default IssueService;
