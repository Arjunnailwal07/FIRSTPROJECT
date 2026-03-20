let timeLeft = 1500; 
let timerId = null;
let isSoundOn = false;

// Audio Object (Yahan aap apni file ka path ya online link de sakte hain)
const rainSound = new Audio('https://www.soundjay.com/nature/sounds/rain-07.mp3');
rainSound.loop = true; // Taaki sound lagatar chalti rahe

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const soundBtn = document.getElementById('sound-toggle');

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerId !== null) return;
    
    // Agar sound on hai toh play karein
    if (isSoundOn) rainSound.play();

    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerId);
            rainSound.pause();
            alert("Focus session complete!");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    rainSound.pause(); // Pause par sound bhi ruk jayegi
}

function resetTimer() {
    pauseTimer();
    timeLeft = 1500;
    updateDisplay();
}

// Sound Toggle Logic
soundBtn.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    if (isSoundOn) {
        soundBtn.innerText = "🔊 Sound: On";
        // Agar timer chal raha hai toh turant sound start karein
        if (timerId !== null) rainSound.play();
    } else {
        soundBtn.innerText = "🔇 Sound: Off";
        rainSound.pause();
    }
});

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);