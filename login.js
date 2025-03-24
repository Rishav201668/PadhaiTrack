var firebaseConfig = {
    apiKey: "AIzaSyB_mdm1jwbAKwm4bQILZjcBJMQAa4gG7mE",
    authDomain: "padhaitrack.firebaseapp.com",
    projectId: "padhaitrack",
    storageBucket: "padhaitrack.firebasestorage.app",
    messagingSenderId: "655970824630",
    appId: "1:655970824630:web:dffcafdf887225cd3d1117",
    measurementId: "G-60QJ8BT69W"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var auth = firebase.auth();
  var db = firebase.firestore();
 
  // Get form elements
  var loginForm = document.getElementById('loginForm');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');

  // Handle form submission
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload on form submission

    var email = emailInput.value;
    var password = passwordInput.value;

    // Sign in the user using Firebase Authentication
    auth.signInWithEmailAndPassword(email, password)
      .then(function(userCredential) {
        var user = userCredential.user;
        console.log("User logged in successfully");
        // Redirect to the user's dashboard or another page after successful login
        window.location.href = "dashboard.html"; // Update this to your desired page
      })
      .catch((error) => {
        let errorMessage = error.message;

        // Customizing error messages
        if (error.code === "auth/invalid-email") {
            errorMessage = "❌ Invalid email format!";
        } else if (error.code === "auth/user-not-found") {
            errorMessage = "❌ No account found with this email!";
        } else if (error.code === "auth/wrong-password") {
            errorMessage = "❌ Incorrect password!";
        } else if (error.code === "auth/too-many-requests") {
            errorMessage = "⚠️ Too many failed attempts! Try again later.";
        }

        loginStatus.innerHTML = errorMessage;
        console.error("Login error:", errorMessage);
    });
  });