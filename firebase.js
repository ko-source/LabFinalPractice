// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjcOcr0bQeeyQpVj7dI2LqhHHdVuTsVIc",
  authDomain: "labfinalprcts.firebaseapp.com",
  projectId: "labfinalprcts",
  storageBucket: "labfinalprcts.appspot.com",
  messagingSenderId: "354907809531",
  appId: "1:354907809531:web:76e133c05670704e2cf25e",
  databaseURL: "https://labfinalprcts-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;