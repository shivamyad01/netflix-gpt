// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo7WW6RtSNPo5aOtQE15S1q7_V4pzWSDI",
  authDomain: "netflixgpt-1b829.firebaseapp.com",
  projectId: "netflixgpt-1b829",
  storageBucket: "netflixgpt-1b829.appspot.com",
  messagingSenderId: "582255070974",
  appId: "1:582255070974:web:6f2df92a99c0c375545faf",
  measurementId: "G-X7VRPPYCET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();