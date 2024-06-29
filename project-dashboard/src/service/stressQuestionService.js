
import axiosInstance from "../api/axios";

export const getStressLevelQuestions = async () => {
    try {

    const response = await axiosInstance.get(`/question/get-all-questions`);
      console.log(response.data)
      return response.data;

    } catch (err) {
      console.log(err);
    } 
  };

  export const deleteQuestionById = async (id) => {
    try {
        const response = await axiosInstance.delete(`/question/delete-question-by-id/${id}`);
      return response.data;

    } catch (err) {
      console.log(err);
    }
  };