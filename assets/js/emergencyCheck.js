function checkStorage() {
    
    // Retrieve the existing value of "emergency" from localStorage
    const emergencyObj_deserialized = JSON.parse(localStorage.getItem("emergency"));


    if (emergencyObj_deserialized == null) {
        setTimeout(checkStorage, 3000);
        

    } else {

        console.log("Activated")
        // If the item is present and its value is true, redirect to another website
        
        window.location.href = "emergency2.html";
        
    }
    
}




// Call the function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", checkStorage);

