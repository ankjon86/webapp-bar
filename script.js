class WebAppBar {
    constructor() {
        this.apps = JSON.parse(localStorage.getItem('webApps')) || [
            {
                name: 'Gmail',
                url: 'https://mail.google.com',
                icon: 'fas fa-envelope'
            },
            {
                name: 'Calendar',
                url: 'https://calendar.google.com',
                icon: 'fas fa-calendar'
            },
            {
                name: 'GitHub',
                url: 'https://github.com',
                icon: 'fab fa-github'
            },
            {
                name: 'ChatGPT',
                url: 'https://chat.openai.com',
                icon: 'fas fa-robot'
            }
        ];
        
        this.init();
    }

    init() {
        this.renderApps();
        this.updateClock();
        this.setupEventListeners();
        setInterval(() => this.updateClock(), 60000);
    }

    renderApps() {
        const appIcons = document.getElementById('appIcons');
        appIcons.innerHTML = '';
        
        this.apps.forEach((app, index) => {
            const appEl = document.createElement('div');
            appEl.className = 'app-icon';
            appEl.dataset.index = index;
            
            if (app.icon.startsWith('http')) {
                appEl.innerHTML = `
                    <img src="${app.icon}" alt="${app.name}">
                    <span class="app-name">${app.name}</span>
                `;
            } else {
                appEl.innerHTML = `
                    <i class="${app.icon}"></i>
                    <span class="app-name">${app.name}</span>
                `;
            }
            
            appEl.addEventListener('click', (e) => {
                e.preventDefault();
                this.launchApp(app.url);
            });
            
            appIcons.appendChild(appEl);
        });
        
        this.renderSettingsList();
    }

    launchApp(url) {
        window.open(url, '_blank');
    }

    updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        const dateString = now.toLocaleDateString([], {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        document.getElementById('clock').textContent = `${dateString} • ${timeString}`;
    }

    setupEventListeners() {
        // Settings modal
        const settingsBtn = document.getElementById('settingsBtn');
        const settingsModal = document.getElementById('settingsModal');
        const closeModal = document.getElementById('closeModal');

        settingsBtn.addEventListener('click', () => {
            settingsModal.style.display = 'block';
        });

        closeModal.addEventListener('click', () => {
            settingsModal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                settingsModal.style.display = 'none';
            }
        });

        // Add app functionality
        const addAppBtn = document.getElementById('addAppBtn');
        addAppBtn.addEventListener('click', () => this.addApp());
    }

    addApp() {
        const name = document.getElementById('appName').value;
        const url = document.getElementById('appUrl').value;
        const icon = document.getElementById('appIcon').value;

        if (name && url) {
            this.apps.push({
                name,
                url: url.startsWith('http') ? url : `https://${url}`,
                icon: icon || 'fas fa-globe'
            });
            
            this.saveApps();
            this.renderApps();
            
            // Clear inputs
            document.getElementById('appName').value = '';
            document.getElementById('appUrl').value = '';
            document.getElementById('appIcon').value = '';
        }
    }

    removeApp(index) {
        this.apps.splice(index, 1);
        this.saveApps();
        this.renderApps();
    }

    renderSettingsList() {
        const appList = document.getElementById('appList');
        appList.innerHTML = '';
        
        this.apps.forEach((app, index) => {
            const appItem = document.createElement('div');
            appItem.className = 'app-item';
            appItem.innerHTML = `
                <div>
                    <strong>${app.name}</strong><br>
                    <small>${app.url}</small>
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            
            appList.appendChild(appItem);
        });
        
        // Add remove event listeners
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.removeApp(index);
            });
        });
    }

    saveApps() {
        localStorage.setItem('webApps', JSON.stringify(this.apps));
    }
}

// Initialize the app bar
document.addEventListener('DOMContentLoaded', () => {
    new WebAppBar();
});
