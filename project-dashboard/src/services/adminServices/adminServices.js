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