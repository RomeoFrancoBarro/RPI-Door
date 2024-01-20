

function checkLocalStorage() {
    let userObj_deserialized = JSON.parse(localStorage.getItem("User"));

    // Check if the specific item is present in localStorage
    if (userObj_deserialized == null) {
        // If the item is not present, check again after a delay (e.g., 1000 milliseconds or 1 second)
        setTimeout(checkLocalStorage, 2000);
    } else {
        console.log("pumasok")
        // If the item is present and the page hasn't been refreshed, refresh the page
        if (localStorage.getItem("isRefreshed") !== "true") {
            location.reload();

            // Set the flag in localStorage to indicate that the page has been refreshed
            localStorage.setItem("isRefreshed", "true");

            
        }
    }
}

// Call the function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", checkLocalStorage);