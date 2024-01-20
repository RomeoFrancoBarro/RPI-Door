




function playRefreshSound() {
    let userObj_deserialized = JSON.parse(localStorage.getItem("User"));

    // Check if the specific item is present in localStorage
    if (userObj_deserialized == null) {
        // If the item is not present, check again after a delay (e.g., 1000 milliseconds or 1 second)
        setTimeout(checkLocalStorage, 1000);
    } else {
        console.log("pumasok")

        var audio = document.getElementById("refreshAudio");
        audio.play();

    }
}

// Call the function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", playRefreshSound);