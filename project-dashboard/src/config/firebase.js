// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDeB-PL8yDJBLsvPRU_s63yIR7UHj3liQs",
  authDomain: "uploadingfile-9e556.firebaseapp.com",
  projectId: "uploadingfile-9e556",
  storageBucket: "uploadingfile-9e556.appspot.com",
  messagingSenderId: "379738067826",
  appId: "1:379738067826:web:e36a88ead36a787d69c3eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
