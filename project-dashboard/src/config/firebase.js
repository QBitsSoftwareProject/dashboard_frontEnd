// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB87nBLjNWBvMdqF3Pa3IBTM2eDw4mM3Vs",
    authDomain: "educationalcontent-448b0.firebaseapp.com",
    projectId: "educationalcontent-448b0",
    storageBucket: "educationalcontent-448b0.appspot.com",
    messagingSenderId: "450441468940",
    appId: "1:450441468940:web:c52bcdb9bc668c54e5e229",
    measurementId: "G-YVG0LWQ6WD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
