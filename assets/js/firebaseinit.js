import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyAIzS7oGCbEzBoIm9zwiCR0mqPkRfvl5Do",
    authDomain: "rpi-door.firebaseapp.com",
    databaseURL: "https://rpi-door-default-rtdb.firebaseio.com",
    projectId: "rpi-door",
    storageBucket: "rpi-door.appspot.com",
    messagingSenderId: "54773318570",
    appId: "1:54773318570:web:2d8ecb96854ba5543721d3"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    


// Export functions that depend on Firebase
export { app, db };