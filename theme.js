/* ============================================================
   YUCUT - ADVANCED THEME MANAGER v2
   Full page dynamic theme switching
   ============================================================ */

const THEMES = [
    { 
        id: 'light',      
        name: 'Light',      
        icon: 'fa-sun',
        description: 'Clean & bright'
    },
    { 
        id: 'dark',       
        name: 'Dark',       
        icon: 'fa-moon',
        description: 'Easy on eyes'
    },
    { 
        id: 'light-blue', 
        name: 'Light Blue', 
        icon: 'fa-droplet',
        description: 'Cool & calm'
    },
    { 
        id: 'dark-gray',  
        name: 'Dark Gray',  
        icon: 'fa-circle-half-stroke',
        description: 'Soft dark'
    }
];

const THEME_KEY = 'yucutTheme';
const THEME_TRANSITION_DURATION = 300;

// ================= GET SAVED THEME =================
function getSavedTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved && THEMES.find(t => t.id === saved)) {
        return saved;
    }
    return 'light';
}

// ================= APPLY THEME =================
function applyTheme(themeId, animate = true) {
    // Add transition class
    if (animate) {
        document.documentElement.classList.add('theme-transitioning');
    }
    
    // Apply theme attribute
    document.documentElement.setAttribute('data-theme', themeId);
    
    // Save to localStorage
    localStorage.setItem(THEME_KEY, themeId);
    
    // Update UI
    updateThemeIcon(themeId);
    updateActiveOption(themeId);
    
    // Update meta theme-color for mobile browsers
    updateMetaThemeColor(themeId);
    
    // Remove transition class after animation
    if (animate) {
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, THEME_TRANSITION_DURATION);
    }
    
    // Dispatch event for other scripts
    window.dispatchEvent(new CustomEvent('themeChanged', { 
        detail: { theme: themeId } 
    }));
    
    console.log(`🎨 Theme applied: ${themeId}`);
}

// ================= UPDATE META THEME COLOR =================
function updateMetaThemeColor(themeId) {
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    
    if (!metaTheme) {
        metaTheme = document.createElement('meta');
        metaTheme.name = 'theme-color';
        document.head.appendChild(metaTheme);
    }
    
    const colors = {
        'light': '#ffffff',
        'dark': '#1a1a1a',
        'light-blue': '#f0f8fc',
        'dark-gray': '#252525'
    };
    
    metaTheme.content = colors[themeId] || '#ffffff';
}

// ================= UPDATE ICON =================
function updateThemeIcon(themeId) {
    const icon = document.querySelector('#theme-btn i');
    if (!icon) return;
    
    const theme = THEMES.find(t => t.id === themeId);
    if (theme) {
        icon.className = `fa-solid ${theme.icon}`;
        
        // Add animation
        icon.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            icon.style.transform = '';
        }, 300);
    }
}

// ================= UPDATE ACTIVE OPTION =================
function updateActiveOption(themeId) {
    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.theme === themeId);
    });
}

// ================= CREATE DROPDOWN =================
function createThemeDropdown() {
    const switcher = document.querySelector('.theme-switcher');
    if (!switcher) return;
    
    // Remove existing dropdown
    const existing = switcher.querySelector('.theme-dropdown');
    if (existing) existing.remove();

    const dropdown = document.createElement('div');
    dropdown.className = 'theme-dropdown';
    dropdown.id = 'theme-dropdown';
    
    // Add header
    const header = document.createElement('div');
    header.className = 'theme-dropdown-header';
    header.textContent = 'Choose Theme';
    dropdown.appendChild(header);

    // Add options
    THEMES.forEach(theme => {
        const opt = document.createElement('div');
        opt.className = 'theme-option';
        opt.dataset.theme = theme.id;
        opt.innerHTML = `
            <div class="theme-swatch ${theme.id}"></div>
            <div style="flex: 1;">
                <div style="font-weight: 600;">${theme.name}</div>
                <div style="font-size: 10px; color: var(--text-muted); font-weight: 400;">${theme.description}</div>
            </div>
        `;
        
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            applyTheme(theme.id);
            dropdown.classList.remove('open');
        });
        
        dropdown.appendChild(opt);
    });

    switcher.appendChild(dropdown);
    updateActiveOption(getSavedTheme());
}

// ================= TOGGLE DROPDOWN =================
function setupThemeButton() {
    const btn = document.getElementById('theme-btn');
    const dropdown = document.getElementById('theme-dropdown');
    
    if (!btn || !dropdown) return;

    // Remove existing listeners by cloning
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        // Close other dropdowns if any
        document.querySelectorAll('.theme-dropdown.open').forEach(d => {
            if (d !== dropdown) d.classList.remove('open');
        });
        
        dropdown.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-switcher')) {
            dropdown.classList.remove('open');
        }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.remove('open');
        }
    });
}

// ================= ADD KEYBOARD SHORTCUT =================
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Shift + T = Toggle theme
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            
            const currentTheme = getSavedTheme();
            const currentIndex = THEMES.findIndex(t => t.id === currentTheme);
            const nextIndex = (currentIndex + 1) % THEMES.length;
            
            applyTheme(THEMES[nextIndex].id);
        }
    });
}

// ================= INIT =================
function initTheme() {
    // Apply saved theme immediately
    const saved = getSavedTheme();
    document.documentElement.setAttribute('data-theme', saved);

    // Setup after DOM ready
    const setup = () => {
        createThemeDropdown();
        setupThemeButton();
        updateThemeIcon(saved);
        updateMetaThemeColor(saved);
        setupKeyboardShortcuts();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }
}

// Apply theme immediately to prevent flash (before any paint)
(function() {
    const saved = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', saved);
})();

// Initialize full system
initTheme();

// ================= GLOBAL API =================
window.YucutTheme = {
    get: getSavedTheme,
    set: applyTheme,
    toggle: () => {
        const current = getSavedTheme();
        const idx = THEMES.findIndex(t => t.id === current);
        const next = THEMES[(idx + 1) % THEMES.length];
        applyTheme(next.id);
    },
    list: () => THEMES.map(t => t.id)
};

console.log('✅ Advanced Theme System v2 loaded');
console.log('💡 Tip: Press Ctrl+Shift+T to cycle themes');