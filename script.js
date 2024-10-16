const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');

const hrElement = document.getElementById('hr');
const minElement = document.getElementById('min');
const secElement = document.getElementById('sec');
const countElement = document.getElementById('count');
const lapsList = document.getElementById('laps-list');

let hour = 0;
let minute = 0;
let second = 0;
let count = 0;

let timer = false;
let interval;

let laps = [];
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer(){
    if(!timer){
        timer = true;
        interval= setInterval(stopWatch, 10);
    }
}
function stopTimer()
{
    if(timer)
    {
        timer = false;
        clearInterval(interval);
    }
}
function resetTimer() {
    stopTimer();
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    hrElement.innerText = "00";
    minElement.innerText = "00";
    secElement.innerText = "00";
    countElement.innerText = "00";
    laps = [];
    lapsList.innerHTML = "";
}
function recordLap() {
    if (timer) {
        const lapTime = `${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)}.${formatTime(count)}`;
        laps.push(lapTime);
        displayLaps();
    }
}
function displayLaps() {
    lapsList.innerHTML = "";
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="lap-number">Lap ${index + 1}</span><span class="lap-time">${lap}</span>`;
        lapsList.appendChild(li);
    });
}
function stopWatch() {
    if (timer) {
        count++;

        if (count === 100) {
            second++;
            count = 0;
        }

        if (second === 60) {
            minute++;
            second = 0;
        }

        if (minute === 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        // Update the UI
        hrElement.innerText = formatTime(hour);
        minElement.innerText = formatTime(minute);
        secElement.innerText = formatTime(second);
        countElement.innerText = formatTime(count);
    }
}
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}