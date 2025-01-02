// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-hqm4DsRx2AxHHqAemg11jD6D1r24bDI",
    authDomain: "cloud-storage-next-8e2cc.firebaseapp.com",
    projectId: "cloud-storage-next-8e2cc",
    storageBucket: "cloud-storage-next-8e2cc.appspot.com",
    messagingSenderId: "846080175051",
    appId: "1:846080175051:web:f40a35d250602506bba44e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firebase storage
export const storage = getStorage(app);