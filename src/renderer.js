console.log('WebApp Bar started');

// Update clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    document.getElementById('clock').textContent = timeString;
}

// Set up app icons
document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const appName = this.getAttribute('title');
        alert('Opening ' + appName);
        // In real app: window.open(url, '_blank')
    });
});

// Update clock every second
setInterval(updateClock, 1000);
updateClock();

console.log('App initialized successfully');
