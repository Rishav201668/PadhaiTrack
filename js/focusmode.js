document.addEventListener('DOMContentLoaded', function () {
    let timer;
    let isPaused = false;
    let isBreak = false;
    let focusMinutes = localStorage.getItem("focusTime") || 25;
    let breakMinutes = localStorage.getItem("breakTime") || 5;
    let timeInSeconds = focusMinutes * 60;

    const timerRing = document.getElementById('timer-ring');
    const timerDisplay = document.getElementById('timer-display');
    const modeIndicator = document.getElementById('mode-indicator');
    const startResumeButton = document.getElementById('start-resume-btn');
    const breakButton = document.getElementById('break-btn');
    const resetButton = document.getElementById('reset-btn');
    const pauseButton = document.getElementById('pause-btn');

    function updateTimerDisplay() {
        let minutesDisplay = Math.floor(timeInSeconds / 60);
        let secondsDisplay = timeInSeconds % 60;
        timerDisplay.innerHTML = `${minutesDisplay < 10 ? '0' : ''}${minutesDisplay}:${secondsDisplay < 10 ? '0' : ''}${secondsDisplay}`;
    }

    function updateTimerRing() {
        const canvas = timerRing;
        const ctx = canvas.getContext('2d');
        const totalTime = isBreak ? (breakMinutes * 60) : (focusMinutes * 60);
        const progress = timeInSeconds / totalTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(100, 100, 90, 0, 2 * Math.PI);
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(100, 100, 90, -0.5 * Math.PI, (-0.5 + 2 * progress) * Math.PI, false);
        ctx.strokeStyle = isBreak ? "#e74c3c" : "#3498db";
        ctx.lineWidth = 10;
        ctx.stroke();
    }

    function resetTimer() {
        clearInterval(timer);
        isPaused = false;
        isBreak = false;
        focusMinutes = localStorage.getItem("focusTime") || 25;
        breakMinutes = localStorage.getItem("breakTime") || 5;
        timeInSeconds = focusMinutes * 60;
        updateTimerDisplay();
        updateTimerRing();
        startResumeButton.innerText = "Start";
        startResumeButton.disabled = false;
        pauseButton.disabled = true;
        breakButton.disabled = false;
    }

    function handleBreak() {
        if (isBreak) {
            resetTimer();
            modeIndicator.innerText = 'Focus';
            isBreak = false;
            startTimer();
        } else {
            resetTimer();
            modeIndicator.innerText = 'Break';
            isBreak = true;
            timeInSeconds = breakMinutes * 60;
            startTimer();
        }
        resetButton.disabled = isBreak;
    }

    function startTimer() {
        if (!isPaused) {
            timeInSeconds = isBreak ? breakMinutes * 60 : focusMinutes * 60;
        }
        isPaused = false;

        timer = setInterval(function () {
            if (timeInSeconds > 0) {
                timeInSeconds--;
                updateTimerDisplay();
                updateTimerRing();
            } else {
                clearInterval(timer);
                handleBreak();
            }
        }, 1000);

        startResumeButton.innerText = "Resume";
        startResumeButton.disabled = true;
        pauseButton.disabled = false;
    }

    function pauseTimer() {
        clearInterval(timer);
        isPaused = true;
        startResumeButton.innerText = "Resume";
        startResumeButton.disabled = false;
        pauseButton.disabled = true;
    }

    startResumeButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    breakButton.addEventListener('click', handleBreak);

    updateTimerDisplay();
    updateTimerRing();
});
