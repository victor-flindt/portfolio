document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', storedTheme);
    updateToggleEmoji(storedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleEmoji(newTheme);
    });

    // Update emoji based on theme
    function updateToggleEmoji(theme) {
        themeToggle.textContent = theme === 'dark' ? '🌞' : '🌙';
    }
});

document.body.addEventListener('htmx:afterSwap', () => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', storedTheme);
    updateToggleEmoji(storedTheme);
});

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light');