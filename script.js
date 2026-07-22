let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(ms){

    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10);

    return (
        String(hours).padStart(2,'0') + ":" +
        String(minutes).padStart(2,'0') + ":" +
        String(seconds).padStart(2,'0') + "." +
        String(milliseconds).padStart(2,'0')
    );
}

function updateDisplay(){
    display.textContent = formatTime(elapsedTime);
}

document.getElementById("start").onclick = function(){

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(function(){

        elapsedTime = Date.now() - startTime;

        updateDisplay();

    },10);

};

document.getElementById("pause").onclick = function(){

    clearInterval(timerInterval);

};

document.getElementById("reset").onclick = function(){

    clearInterval(timerInterval);

    elapsedTime = 0;

    updateDisplay();

    laps.innerHTML = "";

};

document.getElementById("lap").onclick = function(){

    if(elapsedTime===0) return;

    const li = document.createElement("li");

    li.textContent = formatTime(elapsedTime);

    laps.appendChild(li);

};

updateDisplay();