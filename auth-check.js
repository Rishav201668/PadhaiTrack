// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase Config (replace with your Firebase project config)
const firebaseConfig = {
    apiKey: "AIzaSyB_mdm1jwbAKwm4bQILZjcBJMQAa4gG7mE",
      authDomain: "padhaitrack.firebaseapp.com",
      projectId: "padhaitrack",
      storageBucket: "padhaitrack.firebasestorage.app",
      messagingSenderId: "655970824630",
      appId: "1:655970824630:web:dffcafdf887225cd3d1117",
      measurementId: "G-60QJ8BT69W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to check if the user is logged in
function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // User is not logged in, redirect to login page
            window.location.href = "login.html";
        } else {
            // User is logged in, you can optionally fetch user data or perform other actions
            console.log("User is logged in:", user.email);
        }
    });
}

// Run the checkAuth function when the script is loaded
checkAuth();