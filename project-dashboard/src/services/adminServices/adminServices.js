import axios from "axios";
import { BACKEND_URI } from "../../config/env";

const URL = BACKEND_URI + "/resources";

//get author details
export const getAuthors = async () => {
    try {
        const response = await axios.get(URL + '/author/');
        return response;
    } catch (err) {
        console.log("error author list fetch , error:" + err.message);
    }
}

// register new author
export const registerAuthor = async (newAuthor) => {
    try {
        await axios.post(URL + '/author/', newAuthor);
    } catch (err) {
        console.log("error registering author , error:" + err.message);
    }
}

// uploading custom created article
export const createNewArticle = async (newArticle) => {
    try {
        await axios.post(URL + '/article/', newArticle);
    } catch (err) {
        console.log("error creating new article , error:" + err.message);
    }
}

// uploading video resource
export const createVideoResource = async (newVideo) => {
    try {
        await axios.post(URL + '/video/', newVideo);
    } catch (err) {
        console.log("error creating new video , error:" + err.message);
    }
}

// uploading video resource
export const createAudioResource = async (newAudio) => {
    try {
        await axios.post(URL + '/audio/', newAudio);
    } catch (err) {
        console.log("error creating new audio , error:" + err.message);
    }
}

export const getAllGoals = async () => {
    try {
        const response = await axios.get(BACKEND_URI + '/goal/get-all');
        return response;
    } catch (err) {
        console.log("error fetching goals , error:" + err.message);
    }
}

// create new goal
export const createGoal = async (newGoal) => {
    try {
        console.log(newGoal);
        await axios.post(BACKEND_URI + '/goal/create', newGoal);
    } catch (err) {
        console.log("error creating new goal , error:" + err.message);
    }
}


export const deleteGoal = async (id) => {
    try {
        await axios.delete(BACKEND_URI + '/goal/delete/' + id);
    } catch (err) {
        console.log("error deleting new goal , error:" + err.message);
    }
}

export const editGoal = async (id, editedGoal) => {
    try {
        await axios.put(BACKEND_URI + '/goal/update/' + id, editedGoal);
    } catch (err) {
        console.log("error editing goal, error:" + err.message);
    }
}

// create new task
export const createTask = async (newTask) => {
    try {
        console.log("Processing task:" + newTask);
        await axios.post(BACKEND_URI + '/task/create', newTask);
    } catch (err) {
        console.log("error creating new task , error:" + err.message);
    }
}

export const getAllTasks = async () => {
    try {
        const response = await axios.get(BACKEND_URI + '/task/get-all');
        return response;
    } catch (err) {
        console.log("error fetching tasks , error:" + err.message);
    }
}

export const editTask = async (id, editedTask) => {
    try {
        await axios.put(BACKEND_URI + '/task/update/' + id, editedTask);
    } catch (err) {
        console.log("error editing task, error:" + err.message);
    }
}

export const deleteTask = async (id) => {
    try {
        await axios.delete(BACKEND_URI + '/task/delete/' + id);
    } catch (err) {
        console.log("error deleting task, error:" + err.message);
    }
}

export const getAllArticles = async () => {
    try {
        const response = await axios.get(URL + '/article/');
        return response;
    } catch (err) {
        console.log("error fetching articles, error:" + err.message);
    }
}

export const getAuthorInfo = async (authorId) => {
    try {
        const response = await axios.get(URL + '/author/get-authorInfo/' + authorId);
        return response;
    } catch (err) {
        console.log("error fetching author details, error:" + err.message);
    }
}

export const articleDelete = async (articleId) => {
    try {
        await axios.delete(URL + '/article/' + articleId);
    } catch (err) {
        console.log("error deleting article, error:" + err.message);
    }
}

export const getAllVideos = async () => {
    try {
        const response = await axios.get(URL + '/video/');
        return response;
    } catch (err) {
        console.log("error fetching videos, error:" + err.message);
    }
}

export const deleteVideo = async (videoId) => {
    try {
        await axios.delete(URL + '/video/' + videoId);
    } catch (err) {
        console.log("error deleting video, error:" + err.message);
    }
}

export const getAllAudios = async () => {
    try {
        const response = await axios.get(URL + '/audio/getAudios/');
        return response;
    } catch (err) {
        console.log("error fetching audios, error:" + err.message);
    }
}

export const deleteAudio = async (audioId) => {
    try {
        await axios.delete(URL + '/audio/' + audioId);
    } catch (err) {
        console.log("error deleting audio, error:" + err.message);
    }
}

export const getAllDoctors = async () => {
    try {
        const response = await axios.get(BACKEND_URI + '/doctor/');
        return response;
    } catch (err) {
        console.log("error fetching doctors, error:" + err.message);
    }
}

export const editDoctor = async (doctorId, regStatus) => {
    try {
        await axios.put(BACKEND_URI + '/doctor/updateRegStatus/' + doctorId, regStatus);
    } catch (err) {
        console.log("error editing doctor status, error:" + err.message);
    }
}

export const editDoctorAccess = async (doctorId, access) => {
    try {
        console.log(access);
        await axios.put(BACKEND_URI + '/doctor/updateAccessStatus/' + doctorId, access);
    } catch (err) {
        console.log("error editing doctor access level, error:" + err.message);
    }
}

export const editUserAccess = async (userId, access) => {
    try {
        await axios.put(BACKEND_URI + '/user/edit-user-access/' + userId, access);
    } catch (err) {
        console.log("error editing user access level, error:" + err.message);
    }
}

export const getDoctorAppointmentCount = async (doctorId) => {
    try {
        const response = await axios.get(BACKEND_URI + '/appointments/doctor-appointments/' + doctorId);
        return response;
    } catch (err) {
        console.log("error fetching doctor appointments, error:" + err.message);
    }
}

export const geCompletedtDoctorAppointmentCount = async (doctorId) => {
    try {
        const response = await axios.get(BACKEND_URI + '/appointments/doctor-completed-appointments/' + doctorId);
        return response;
    } catch (err) {
        console.log("error fetching doctor appointments, error:" + err.message);
    }
}

export const getReports = async () => {
    try {
        const response = await axios.get(BACKEND_URI + '/report/view-report/');
        return response;
    } catch (err) {
        console.log("error fetching user reports, error:" + err.message);
    }
}

export const getPost = async (postId) => {
    try {
        const response = await axios.get(BACKEND_URI + '/posts/view-a-post/' + postId);
        return response;
    } catch (err) {
        console.log("error fetching report information, error:" + err.message);
    }
}

export const getUser = async (userId) => {
    try {
        const response = await axios.get(BACKEND_URI + '/user/one-user-by-id/' + userId);
        return response;
    } catch (err) {
        console.log("error fetching user information, error:" + err.message);
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get(BACKEND_URI + '/user/');
        return response;
    } catch (err) {
        console.log("error fetching users, error:" + err.message);
    }
}

export const getAllMarks = async () => {
    try {
        const response = await axios.get('http://localhost:3000/mark/get-all-marks');
        return response;
    } catch (err) {
        console.log("error fetching report information, error:" + err.message);
    }
}

export const getUsersByMonth = async (monthId) => {
    try {
        const response = await axios.get(BACKEND_URI + '/user/get-users-by-month/?month=' + monthId);
        return response;
    } catch (err) {
        console.log("error fetching users by month, error:" + err.message);
    }
}

