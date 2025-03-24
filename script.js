// Get the mode toggle checkbox and check if dark mode is enabled
const modeToggle = document.getElementById('mode-toggle');

// Check if the user has a saved preference for dark mode in localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode'); // Apply dark mode class
    modeToggle.checked = true; // Set the toggle button to checked
}

// Toggle between dark and light mode on checkbox change
modeToggle.addEventListener('change', () => {
    if (modeToggle.checked) {
        document.body.classList.add('dark-mode'); // Add dark mode class
        localStorage.setItem('darkMode', 'enabled'); // Save the preference in localStorage
    } else {
        document.body.classList.remove('dark-mode'); // Remove dark mode class
        localStorage.setItem('darkMode', 'disabled'); // Save the preference in localStorage
    }
});
