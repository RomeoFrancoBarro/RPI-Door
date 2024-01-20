
// Your web app's Firebase configuration
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








let user = {}; // Only one object

const addUser = () => {
    user = {
        
        name: document.getElementById('username').value,
        year: document.getElementById('useryr').value,
        dept: document.getElementById('userdept').value,
        prof: document.getElementById('userprof').value,
        addinfo: document.getElementById('useraddinfo').value
    };

   
    // Add user data to Firebase Firestore
  db.collection("users").add(user)
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });

    let userObj_deserialized = JSON.parse(localStorage.getItem("User"));
    console.log(userObj_deserialized);

    let profObj_deserialized = JSON.parse(localStorage.getItem("Prof"));
    console.log(userObj_deserialized);


    
    console.log("pumasok sa log");
        
    
        var intervalId = setInterval(function () {
            console.log("pumasok sa refresh");
            
            clearInterval(intervalId); 
            window.location.href = 'index2.html';
            
        }, 15000); 
    
}

// Function to check if all values in the user object are filled
function areAllValuesFilled(user) {
    for (const key in user) {
        if (user.hasOwnProperty(key) && user[key].trim() === '') {
            return false;
        }
    }
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    let clickCount = 0;

    document.getElementById('usersubmitbtn').addEventListener('click', function() {
        

        clickCount++;

        if (clickCount === 2) {
            // Get user values when the button is clicked
            const user = {
                name: document.getElementById('username').value,
                year: document.getElementById('useryr').value,
                dept: document.getElementById('userdept').value,
                prof: document.getElementById('userprof').value,
                
            };

            // Check if all values are filled
            if (areAllValuesFilled(user)) {
                addUser();
                // Set the flag in localStorage to indicate that the page has been refreshed
                localStorage.setItem("isRefreshed", "false");
                clickCount = 0;
            } else {
                
                clickCount = 1; // Reset clickCount to 1 to allow the user to try again
            }
        }
    });
});





//Get input sa prof form
let prof = {}; // Only one object

function getSelectedRadioButton() {
    var radios = document.getElementsByName("action");
    var selectedRadioButton;
  
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        selectedRadioButton = radios[i];
        break;
      }
    }
  
     
    var selectedRadio = selectedRadioButton; // Return the selected radio button
    if (selectedRadio) {
    console.log("Selected radio value: " + selectedRadio.id);
    return selectedRadio.id;

    console.log("Selected radio id: " + selectedRadio.id);
    
  } else {
    console.log("No radio button selected");
  }
  }
  




const addProf = () => {
    prof = {
        //id: Date.now(),
        action: getSelectedRadioButton(),
        comment: document.getElementById('profcomment').value,
    };

    emergency = {
        
        value: true,
        reason: document.getElementById('profcomment').value,
    };

    // Saving to localStorage
    localStorage.setItem('Prof', JSON.stringify(prof));
    console.log(localStorage)

    let profObj_deserialized = JSON.parse(localStorage.getItem("Prof"));
    console.log(profObj_deserialized);

    //CLOSE HTML DAPAT TO
    if (profObj_deserialized !== null) {

        
        localStorage.setItem("isRefreshed2", "false");
        
        var intervalId = setInterval(function () {
            
            
            clearInterval(intervalId); 
            localStorage.removeItem("User");
            location.reload(); 
            
            
            
        }, 4000); 


        
    








    
    
    } else if (profObj_deserialized == null){
        location.reload();
    }



    var selectedRadioButtonId = getSelectedRadioButton();
  
    if (selectedRadioButtonId === "meeting") {
      // Redirect to a specific webpage for meetings
      window.location.href = 'emergency.html';
      localStorage.setItem('emergency', JSON.stringify(emergency));
      

    } else {
      // Handle the case where a different radio button is selected or none is selected
      console.log("Redirect not required. Continue with other actions...");
    }

    
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('profsubmitbtn').addEventListener('click', addProf);
});



function showModal() {
    // Show the modal on button click
    $('#myModal').modal('show');

    // Set a timeout to hide the modal after 3000 milliseconds (3 seconds)
    setTimeout(function () {
        $('#myModal').modal('hide');
    }, 3000);
}







document.addEventListener('DOMContentLoaded', function () {
   

    let userObj_deserialized = JSON.parse(localStorage.getItem("User"));

    let refreshFlag = localStorage.getItem("RefreshFlag");
    //console.log(userObj_deserialized);

    if (userObj_deserialized) {
        document.getElementById("userprofcont").textContent = "Ma'am\/Sir " + userObj_deserialized.prof;
        document.getElementById("usernamecont").textContent = userObj_deserialized.name;
        document.getElementById("useryrcont").textContent = userObj_deserialized.year + " Year";
        document.getElementById("userdeptcont").textContent = userObj_deserialized.dept;
        document.getElementById("useraddinfocont").textContent = userObj_deserialized.addinfo;

        // Remove margin for specific elements
        const elementsWithMargin = ["userprofcont", "useryrcont", "userdeptcont" ];
        elementsWithMargin.forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element) {
                element.style.marginBottom = "0";
            }
        });


        const element1 = document.getElementById("usernamecont");
        element1.style.marginBottom = "80px"
    }
});




document.addEventListener('DOMContentLoaded', function () {
   

    let profObj_deserialized = JSON.parse(localStorage.getItem("Prof"));
   

    if (profObj_deserialized) {

        document.getElementById("profactioncont").textContent = displayActions(profObj_deserialized.action);
        document.getElementById("profcommentcont").textContent = profObj_deserialized.comment;

        var divToHide = document.getElementById('buffering');
        divToHide.style.display = 'none';

       
    }

});

function displayActions(act){
    var displayact;

    if (act == "enter") {
        displayact = "You can Enter.";
        return displayact
    } else if (act == "wait"){
        displayact = "Please Wait.";
        return displayact
    } else if (act == "decline"){
        displayact = "You cannot Enter.";
        return displayact
    }
}






const clearObj = () => {
    location.reload();
    localStorage.removeItem("User");
    localStorage.removeItem("Prof");
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const finishButton = document.getElementById('userfinishbtn');
    
    // Check if the "Prof" object is not equal to null
    const profObj = JSON.parse(localStorage.getItem("Prof"));
    
    if (profObj !== null) {
        // Add click event listener
        finishButton.addEventListener('click', clearObj);

        // Automatically activate after a few seconds if not clicked
        const autoActivationTime = 15000; // 8000 milliseconds = 8 seconds
        setTimeout(() => {
            finishButton.click(); // Simulate a click on the finish button
        }, autoActivationTime);
    }
});











