function goBack() {
    // Remove the entire "emergency" object from localStorage
    localStorage.removeItem("emergency");

    // Redirect to 'receiver.html'
    window.location.href = 'receiver.html';
}

document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('emergencybtn').addEventListener('click', goBack);
});






document.addEventListener('DOMContentLoaded', function () {
   

    let emergencyObj_deserialized = JSON.parse(localStorage.getItem("emergency"));

    

    

    if (emergencyObj_deserialized) {
        document.getElementById("reasoncont").textContent = emergencyObj_deserialized.reason;
    }
});
