const getPrimaryQuestionForDeviceType = async (deviceTypeId: number) => {
    
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/questions/primary/'+ deviceTypeId, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
        },
    });
};
const getSubQuestionsByParentId = async (parentId: number) => {
    
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/questions/subQuestions/'+ parentId, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
        },
    });
};
const addQuestionsToDevice = async (questions: number[], deviceId: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/problems", {
        body: JSON.stringify(problem),
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
        },
      });
}
const QuestionService = {
    getPrimaryQuestionForDeviceType,
    getSubQuestionsByParentId
};

export default QuestionService;
