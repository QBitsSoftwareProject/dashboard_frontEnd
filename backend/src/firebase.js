// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdUtRinIxQv107yAnybX7TOG-dW73ZWyM",
  authDomain: "cloudstorage-1d374.firebaseapp.com",
  projectId: "cloudstorage-1d374",
  storageBucket: "cloudstorage-1d374.appspot.com",
  messagingSenderId: "857957350745",
  appId: "1:857957350745:web:8bc59611c8512c0034e048",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
