// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyITAZ6jjIMnUDU3g0jQ16FyAS8nSNASw",
  authDomain: "todo-f6bcf.firebaseapp.com",
  projectId: "todo-f6bcf",
  storageBucket: "todo-f6bcf.firebasestorage.app",
  messagingSenderId: "146860268804",
  appId: "1:146860268804:web:6f5f2fc238f266b4b74451"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig