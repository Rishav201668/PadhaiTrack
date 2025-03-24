// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Your web app's Firebase configuration
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
const auth = getAuth(app);  // Initialize Firebase Authentication

// Handle Signup
document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User signed up:", userCredential.user);
            alert("Signup successful! Redirecting to dashboard...");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        })
        .catch((error) => {
            document.getElementById("signup-error").textContent = error.message;
        });
});

// Handle Login
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Sign in user with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User logged in:", userCredential.user);
            alert("Login successful! Redirecting to dashboard...");
            
            // Redirect to dashboard after a short delay
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000); // 1 second delay for user to see the message
        })
        .catch((error) => {
            document.getElementById("login-error").textContent = error.message;
        });
});

// Check if the user is already logged in (redirect to dashboard if they are)
onAuthStateChanged(auth, (user) => {
    if (user) {
        // If user is logged in, redirect to dashboard
        window.location.href = "dashboard.html";
    }
});
