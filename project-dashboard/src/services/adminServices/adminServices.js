import axios from "axios";
import { BACKEND_URI } from "../../config/env";

const URL = BACKEND_URI + "/resources";

// admin login
export const adminLogin = async (adminDetails) => {
    try {
        const response = await axios.post(BACKEND_URI + '/admin/login', adminDetails);
        // Save the authentication token in local storage
        localStorage.setItem('authToken', response.data.authtoken);
        return response.data;
    } catch (err) {
        console.log("error logging in, error:" + err.message);
    }
}
// admin login


//get author details
export const getAuthors = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(URL + '/author/', { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error author list fetch , error:" + err.message);
    }
}

// register new author
export const registerAuthor = async (newAuthor) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.post(URL + '/author/', newAuthor, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error registering author , error:" + err.message);
    }
}

// uploading custom created article
export const createNewArticle = async (newArticle) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.post(URL + '/article/', newArticle, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error creating new article , error:" + err.message);
    }
}

// uploading video resource
export const createVideoResource = async (newVideo) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.post(URL + '/video/', newVideo, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error creating new video , error:" + err.message);
    }
}

// uploading video resource
export const createAudioResource = async (newAudio) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.post(URL + '/audio/', newAudio, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error creating new audio , error:" + err.message);
    }
}

export const getAllGoals = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(BACKEND_URI + '/goal/get-all', { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching goals , error:" + err.message);
    }
}

// create new goal
export const createGoal = async (newGoal) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.post(BACKEND_URI + '/goal/create', newGoal, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error creating new goal , error:" + err.message);
    }
}


export const deleteGoal = async (id) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.delete(BACKEND_URI + '/goal/delete/' + id, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error deleting new goal , error:" + err.message);
    }
}

export const editGoal = async (id, editedGoal) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.put(BACKEND_URI + '/goal/update/' + id, editedGoal, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error editing goal, error:" + err.message);
    }
}

// create new task
export const createTask = async (newTask) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.post(BACKEND_URI + '/task/create', newTask, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error creating new task , error:" + err.message);
    }
}

export const getAllTasks = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(BACKEND_URI + '/task/get-all', { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching tasks , error:" + err.message);
    }
}

export const editTask = async (id, editedTask) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.put(BACKEND_URI + '/task/update/' + id, editedTask, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error editing task, error:" + err.message);
    }
}

export const deleteTask = async (id) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.delete(BACKEND_URI + '/task/delete/' + id, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error deleting task, error:" + err.message);
    }
}

export const getAllArticles = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(URL + '/article/', { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching articles, error:" + err.message);
    }
}

export const getAuthorInfo = async (authorId) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(URL + '/author/get-authorInfo/' + authorId, { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching author details, error:" + err.message);
    }
}

export const articleDelete = async (articleId) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.delete(URL + '/article/' + articleId, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error deleting article, error:" + err.message);
    }
}

export const getAllVideos = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(URL + '/video/', { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching videos, error:" + err.message);
    }
}

export const deleteVideo = async (videoId) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.delete(URL + '/video/' + videoId, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error deleting video, error:" + err.message);
    }
}

export const getAllAudios = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(URL + '/audio/getAudios/', { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching audios, error:" + err.message);
    }
}

export const deleteAudio = async (audioId) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.delete(URL + '/audio/' + audioId, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error deleting audio, error:" + err.message);
    }
}

export const getAllDoctors = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(BACKEND_URI + '/doctor/', { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching doctors, error:" + err.message);
    }
}

export const editDoctor = async (doctorId, regStatus) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.put(BACKEND_URI + '/doctor/updateRegStatus/' + doctorId, regStatus, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error editing doctor status, error:" + err.message);
    }
}

export const editDoctorAccess = async (doctorId, access) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.put(BACKEND_URI + '/doctor/updateAccessStatus/' + doctorId, access, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error editing doctor access level, error:" + err.message);
    }
}

export const editUserAccess = async (userId, access) => {
    try {
        const token = localStorage.getItem("authToken");
        await axios.put(BACKEND_URI + '/user/edit-user-access/' + userId, access, { headers: { authtoken: token } });
    } catch (err) {
        console.log("error editing user access level, error:" + err.message);
    }
}

export const getDoctorAppointmentCount = async (doctorId) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(BACKEND_URI + '/appointments/doctor-appointments/' + doctorId, { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching doctor appointments, error:" + err.message);
    }
}

export const geCompletedtDoctorAppointmentCount = async (doctorId) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(BACKEND_URI + '/appointments/doctor-completed-appointments/' + doctorId, { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching doctor appointments, error:" + err.message);
    }
}

export const getReports = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(BACKEND_URI + '/report/view-report/', { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching user reports, error:" + err.message);
    }
}

export const getPost = async (postId) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(BACKEND_URI + '/posts/view-a-post/' + postId, { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching report information, error:" + err.message);
    }
}

export const getUser = async (userId) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(BACKEND_URI + '/user/one-user-by-id/' + userId, { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching user information, error:" + err.message);
    }
}

export const getAllUsers = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(BACKEND_URI + '/user/', { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching users, error:" + err.message);
    }
}

export const getAllMarks = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get('http://localhost:3000/mark/get-all-marks', { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching report information, error:" + err.message);
    }
}

export const getUsersByMonth = async (monthId) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(BACKEND_URI + '/user/get-users-by-month/?month=' + monthId, { headers: { authtoken: token } });
        return response;
    } catch (err) {
        console.log("error fetching users by month, error:" + err.message);
    }
}

export const editVideo = async (videoId, newVideoDetails) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.put(URL + '/video/edit-video/' + videoId, newVideoDetails, { headers: { authtoken: token } });
        return (response.data);
    } catch (err) {
        console.log("error editing video details, error:" + err.message);
    }
}

export const editAudio = async (audioId, newAudioDetails) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.put(URL + '/audio/edit-audio/' + audioId, newAudioDetails, { headers: { authtoken: token } });
        return (response.data);
    } catch (err) {
        console.log("error editing audio details, error:" + err.message);
    }
}

export const getUserFeedbacks = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(BACKEND_URI + '/Feedback/getAll-feedback/', { headers: { authtoken: token } });
        return (response.data);
    } catch (err) {
        console.log("error fetching user feedbacks, error:" + err.message);
    }
}
