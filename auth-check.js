// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase Config (replace with your Firebase project config)
const firebaseConfig = {
    apiKey: "AIzaSyCwPZD1aJ7YoKsrN9o9nAGwd8G-zFpunt0",
    authDomain: "vidyatrack2.firebaseapp.com",
    projectId: "vidyatrack2",
    storageBucket: "vidyatrack2.appspot.com",
    messagingSenderId: "88994221129",
    appId: "1:88994221129:web:606388968b7de0218c4398",
    measurementId: "G-RTX0GY7D69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to check if the user is logged in
function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // User is not logged in, redirect to login page
            window.location.href = "../index.html";
        } else {
            // User is logged in, you can optionally fetch user data or perform other actions
            console.log("User is logged in:", user.email);
        }
    });
}

// Run the checkAuth function when the script is loaded
checkAuth();