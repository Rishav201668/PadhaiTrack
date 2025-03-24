window.onload = function () {
    const settingsButton = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeBtn = document.querySelector('.close-btn');
    const saveButton = document.getElementById('save-settings');

    const focusTimeInput = document.getElementById('focus-time');
    const breakTimeInput = document.getElementById('break-time');

    if (!settingsModal) {
        console.error("Settings modal not found in the document.");
        return;
    }

    // Load saved settings from localStorage
    focusTimeInput.value = localStorage.getItem("focusTime") || 25;
    breakTimeInput.value = localStorage.getItem("breakTime") || 5;

    // Open Settings Modal
    settingsButton.addEventListener('click', function () {
        settingsModal.style.display = 'flex';
    });

    // Close Settings Modal
    closeBtn.addEventListener('click', function () {
        settingsModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    // Save settings and update timers
    saveButton.addEventListener('click', function () {
        localStorage.setItem("focusTime", focusTimeInput.value);
        localStorage.setItem("breakTime", breakTimeInput.value);
        
        console.log('Settings saved:', {
            focusTime: focusTimeInput.value,
            breakTime: breakTimeInput.value
        });

        settingsModal.style.display = 'none';
    });
    // Add this function to reload the page after clicking the Save button
document.getElementById('save-settings').addEventListener('click', function() {
    location.reload();  // This will reload the page
});

};
