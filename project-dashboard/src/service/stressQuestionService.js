
import axiosInstance from "../api/axios";

export const getStressLevelQuestions = async () => {
  try {

    const token = localStorage.getItem("authToken");

    const response = await axiosInstance.get(`/question/get-all-questions`, { headers: { authtoken: token } });
    return response.data;

  } catch (err) {
    console.log(err);
  }
};

export const deleteQuestionById = async (id) => {
  try {

    const token = localStorage.getItem("authToken");
    const response = await axiosInstance.delete(`/question/delete-question-by-id/${id}`, { headers: { authtoken: token } });
    return response.data;

  } catch (err) {
    console.log(err);
  }
};