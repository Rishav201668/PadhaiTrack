// Define global variables for counters
let sessionCount = 0;
let totalFocusTime = 0; // in seconds
let totalBreakTime = 0; // in seconds

const sessionCountElement = document.getElementById('session-count');
const totalFocusTimeElement = document.getElementById('total-focus-time');
const averageFocusTimeElement = document.getElementById('average-focus-time');
const totalBreakTimeElement = document.getElementById('total-break-time');

// Function to update the time counters on the screen
function updateCounters() {
    // Update the session count
    sessionCountElement.innerText = sessionCount;

    // Update total focus time
    const focusMinutes = Math.floor(totalFocusTime / 60);
    const focusSeconds = totalFocusTime % 60;
    totalFocusTimeElement.innerText = `${focusMinutes}m ${focusSeconds}s`;

    // Update average focus time
    let averageFocusTime = sessionCount > 0 ? totalFocusTime / sessionCount : 0;
    const averageMinutes = Math.floor(averageFocusTime / 60);
    const averageSeconds = averageFocusTime % 60;
    averageFocusTimeElement.innerText = `${averageMinutes}m ${averageSeconds}s`;

    // Update total break time
    const breakMinutes = Math.floor(totalBreakTime / 60);
    const breakSeconds = totalBreakTime % 60;
    totalBreakTimeElement.innerText = `${breakMinutes}m ${breakSeconds}s`;
}

// Function to add focus time
function addFocusTime(minutes, seconds) {
    totalFocusTime += minutes * 60 + seconds;
    sessionCount++;
    updateCounters();
}

// Function to add break time
function addBreakTime(minutes, seconds) {
    totalBreakTime += minutes * 60 + seconds;
    updateCounters();
}

// Function to reset all counters
function resetCounters() {
    sessionCount = 0;
    totalFocusTime = 0;
    totalBreakTime = 0;
    updateCounters();
}
