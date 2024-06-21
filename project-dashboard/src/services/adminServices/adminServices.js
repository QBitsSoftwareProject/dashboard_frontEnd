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

export const createGoal = async (newGoal) => {
    try {
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
    } catch (error) {

    }
}