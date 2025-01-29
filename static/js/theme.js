// theme.js
// Function to update the slider position
function updateToggleSlider(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.checked = theme === 'dark';
}

let currentThemeToggleListener = null;

function initializeThemeToggle() {
    // Remove previous listener if exists
    if (currentThemeToggleListener) {
        document.getElementById('theme-toggle')
            .removeEventListener('click', currentThemeToggleListener);
    }

    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', storedTheme);
    updateToggleSlider(storedTheme);

    // Store reference to new listener
    currentThemeToggleListener = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleSlider(newTheme);
    };

    themeToggle.addEventListener('click', currentThemeToggleListener);
}

// Use htmx:afterSettle instead of afterSwap
document.addEventListener('DOMContentLoaded', initializeThemeToggle);
document.body.addEventListener('htmx:afterSettle', initializeThemeToggle);