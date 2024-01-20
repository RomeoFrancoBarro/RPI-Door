"use strict";

var user = {}; // Only one object

var addUser = function addUser() {
  user = {
    name: document.getElementById('username').value,
    year: document.getElementById('useryr').value,
    dept: document.getElementById('userdept').value,
    prof: document.getElementById('userprof').value,
    addinfo: document.getElementById('useraddinfo').value
  };
  localStorage.setItem('User', JSON.stringify(user));
  console.log(localStorage);
  var userObj_deserialized = JSON.parse(localStorage.getItem("User"));
  console.log(userObj_deserialized);

  if (userObj_deserialized.name && userObj_deserialized.prof && userObj_deserialized.year && userObj_deserialized.dept) {
    var intervalId = setInterval(function () {
      clearInterval(intervalId);
      window.location.href = 'index2.html';
    }, 10000);
  }
}; // Function to check if all values in the user object are filled


function areAllValuesFilled(user) {
  for (var key in user) {
    if (user.hasOwnProperty(key) && user[key].trim() === '') {
      return false;
    }
  }

  return true;
}

document.addEventListener('DOMContentLoaded', function () {
  var clickCount = 0;
  document.getElementById('usersubmitbtn').addEventListener('click', function () {
    clickCount++;

    if (clickCount === 2) {
      // Get user values when the button is clicked
      var _user = {
        name: document.getElementById('username').value,
        year: document.getElementById('useryr').value,
        dept: document.getElementById('userdept').value,
        prof: document.getElementById('userprof').value
      }; // Check if all values are filled

      if (areAllValuesFilled(_user)) {
        addUser(); // Set the flag in localStorage to indicate that the page has been refreshed

        localStorage.setItem("isRefreshed", "false");
        clickCount = 0;
      } else {
        clickCount = 1; // Reset clickCount to 1 to allow the user to try again
      }
    }
  });
}); //Get input sa prof form

var prof = {}; // Only one object

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

var addProf = function addProf() {
  prof = {
    //id: Date.now(),
    action: getSelectedRadioButton(),
    comment: document.getElementById('profcomment').value
  };
  emergency = {
    value: true,
    reason: document.getElementById('profcomment').value
  }; // Saving to localStorage

  localStorage.setItem('Prof', JSON.stringify(prof));
  console.log(localStorage);
  var profObj_deserialized = JSON.parse(localStorage.getItem("Prof"));
  console.log(profObj_deserialized); //CLOSE HTML DAPAT TO

  if (profObj_deserialized !== null) {
    localStorage.setItem("isRefreshed2", "false");
    var intervalId = setInterval(function () {
      clearInterval(intervalId);
      localStorage.removeItem("Prof");
      location.reload();
    }, 2000);
  } else if (profObj_deserialized == null) {
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
};

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('profsubmitbtn').addEventListener('click', addProf);
});
document.addEventListener('DOMContentLoaded', function () {
  var userObj_deserialized = JSON.parse(localStorage.getItem("User"));
  var refreshFlag = localStorage.getItem("RefreshFlag"); //console.log(userObj_deserialized);

  if (userObj_deserialized) {
    document.getElementById("userprofcont").textContent = "Ma'am\/Sir " + userObj_deserialized.prof;
    document.getElementById("usernamecont").textContent = userObj_deserialized.name;
    document.getElementById("useryrcont").textContent = userObj_deserialized.year + " Year";
    document.getElementById("userdeptcont").textContent = userObj_deserialized.dept;
    document.getElementById("useraddinfocont").textContent = userObj_deserialized.addinfo;
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var profObj_deserialized = JSON.parse(localStorage.getItem("Prof"));

  if (profObj_deserialized) {
    document.getElementById("profactioncont").textContent = displayActions(profObj_deserialized.action);
    document.getElementById("profcommentcont").textContent = profObj_deserialized.comment;
    var divToHide = document.getElementById('buffering');
    divToHide.style.display = 'none';
  }
});

function displayActions(act) {
  var displayact;

  if (act == "enter") {
    displayact = "You can Enter.";
    return displayact;
  } else if (act == "wait") {
    displayact = "Please Wait.";
    return displayact;
  } else if (act == "decline") {
    displayact = "You cannot Enter.";
    return displayact;
  }
}

var clearObj = function clearObj() {
  location.reload();
  localStorage.removeItem("User");
  localStorage.removeItem("Prof");
  window.location.href = 'index.html';
};

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('userfinishbtn').addEventListener('click', clearObj);
});