// popup
window.addEventListener('load', function(){
    setTimeout(
        function open(event){
            document.querySelector(".pop").style.display = "block";
        },
        1000
    )
    });


    document.querySelector('#close').addEventListener('click', function(){
        document.querySelector(".pop").style.display = "none";
    });

    document.querySelector('#close2').addEventListener('click', function(){
        document.querySelector(".pop").style.display = "none";
    });


// play audio
const audio =  document.getElementById("audio");
const button = document.getElementById("close2");
const button2 = document.getElementById("close");

button.addEventListener('click', (e) => {
    audio.play()
    

})
button2.addEventListener('click', (e) => {
    audio.play()
    
})




// Automatically activate after a few seconds if not clicked
const autoActivationTime = 3000; // 8000 milliseconds = 8 seconds
setTimeout(() => {
    button.click(); // Simulate a click on the finish button
    button2.click(); // Simulate a click on the finish button
}, autoActivationTime);