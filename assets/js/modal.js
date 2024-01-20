function showModal() {
    // Show the modal on button click
    $('#myModal').modal('show');

    // Set a timeout to hide the modal after 3000 milliseconds (3 seconds)
    setTimeout(function () {
        $('#myModal').modal('hide');
    }, 3000);
}


function showModal2(radio) {

    var selectedRadioButtonId = getSelectedRadioButton();
		
	if (selectedRadioButtonId !== "meeting") {

        // Show the modal on button click
        $('#myModal2').modal('show');

        // Set a timeout to hide the modal after 3000 milliseconds (3 seconds)
        setTimeout(function () {
            $('#myModal2').modal('hide');

            location.reload();

         }, 3000);
    } else {
		// Handle the case where a different radio button is selected or none is selected
		console.log("Redirect not required. Continue with other actions...");

	}

    



}


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

