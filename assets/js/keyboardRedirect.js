// Get all elements with the class 'redirectInput'
var inputElements = document.querySelectorAll('.redirectInput');

// Add a click event listener to each element with the class 'redirectInput'
inputElements.forEach(function(element) {
    element.addEventListener('click', function() {
        // Navigate to the desired destination
        window.location.href = '././keyboard.html';
    });
});








var inputField = document.getElementById('inputField');

    inputField.addEventListener('input', function() {
        // Log the input value to the console in real-time as you type
        console.log('Input value:', inputField.value);

        // Store the input value in localStorage
        localStorage.setItem('userInput', inputField.value);


        
        
    });

    //var userInput = JSON.parse(localStorage.getItem('userInput'));

    //userInputBoxt.textContent = userInput;
    //console.log(userInput)
        

















document.addEventListener('DOMContentLoaded', function() {


    //var userInputBox = document.getElementById('username');
    var userInput = JSON.parse(localStorage.getItem('userInput'));

    //userInputBoxt.textContent = userInput;
    console.log(userInput)
        
    
});
    


