/* ============================================================
   YUCUT - DASHBOARD SCRIPT (FIXED)
   Auth + Drafts + Navigation + Hero Cards + Header Icons
   ============================================================ */

// ================= AUTH ELEMENTS =================
const authIcon = document.getElementById('auth-icon');
const authModal = document.getElementById('auth-modal');
const closeAuth = document.getElementById('close-auth');

const loginSection = document.getElementById('login-section');
const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginError = document.getElementById('login-error');

const signupSection = document.getElementById('signup-section');
const signupForm = document.getElementById('signup-form');
const signupName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupError = document.getElementById('signup-error');
const signupSuccess = document.getElementById('signup-success');

const goToSignup = document.getElementById('go-to-signup');
const goToLogin = document.getElementById('go-to-login');

// ================= OPEN / CLOSE MODAL =================
if (authIcon) {
    authIcon.addEventListener('click', () => {
        const loggedIn = localStorage.getItem('loggedInUser');

        if (loggedIn) {
            if (confirm("Do you want to logout?")) {
                localStorage.removeItem('loggedInUser');
                authIcon.innerHTML = '<i class="fa-regular fa-user"></i>';
                authIcon.classList.remove('logged-in');
                authIcon.title = '';
                alert("Logged out successfully!");
            }
        } else {
            authModal.classList.add('active');
            loginSection.style.display = 'block';
            signupSection.style.display = 'none';
        }
    });
}

if (closeAuth) {
    closeAuth.addEventListener('click', () => {
        authModal.classList.remove('active');
    });
}

if (authModal) {
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
        }
    });
}

// ================= SWITCH FORMS =================
if (goToSignup) {
    goToSignup.addEventListener('click', () => {
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
        loginError.textContent = '';
        loginForm.reset();
    });
}

if (goToLogin) {
    goToLogin.addEventListener('click', () => {
        signupSection.style.display = 'none';
        loginSection.style.display = 'block';
        signupError.textContent = '';
        signupSuccess.textContent = '';
        signupForm.reset();
    });
}

// ================= SIGN UP LOGIC =================
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = signupName.value.trim();
        const email = signupEmail.value.trim();
        const password = signupPassword.value.trim();

        signupError.textContent = '';
        signupSuccess.textContent = '';

        if (name.length < 2) {
            signupError.textContent = "❌ Name must be at least 2 characters.";
            return;
        }
        if (password.length < 4) {
            signupError.textContent = "❌ Password must be at least 4 characters.";
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('yucutUsers')) || [];
        const userExists = existingUsers.find(user => user.email === email);

        if (userExists) {
            signupError.textContent = "❌ Email already registered. Please login.";
            return;
        }

        const newUser = { name, email, password };
        existingUsers.push(newUser);
        localStorage.setItem('yucutUsers', JSON.stringify(existingUsers));

        signupSuccess.textContent = "✅ Account created! You can login now.";

        setTimeout(() => {
            signupSection.style.display = 'none';
            loginSection.style.display = 'block';
            signupForm.reset();
            signupSuccess.textContent = '';
            loginEmail.value = email;
            loginPassword.focus();
        }, 1500);
    });
}

// ================= LOGIN LOGIC =================
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        loginError.textContent = '';

        const existingUsers = JSON.parse(localStorage.getItem('yucutUsers')) || [];
        const matchedUser = existingUsers.find(
            user => user.email === email && user.password === password
        );

        if (matchedUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));

            authIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
            authIcon.classList.add('logged-in');
            authIcon.title = matchedUser.name;

            authModal.classList.remove('active');
            loginForm.reset();

            alert(`Welcome ${matchedUser.name}! You are logged in.`);
        } else {
            loginError.textContent = "❌ Invalid email or password!";
            loginForm.style.animation = "none";
            setTimeout(() => {
                loginForm.style.animation = "shake 0.3s";
            }, 10);
        }
    });
}

// ================= CHECK LOGIN ON LOAD =================
window.addEventListener('DOMContentLoaded', () => {
    const loggedIn = localStorage.getItem('loggedInUser');
    if (loggedIn) {
        const user = JSON.parse(loggedIn);
        authIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
        authIcon.classList.add('logged-in');
        authIcon.title = user.name;
    }
});

// ================= TAB SWITCHING =================
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
    });
});

/* ============================================================
   HERO CARD ACTIONS
   ============================================================ */
const createVideoCard = document.getElementById('create-video-card');
const createImageCard = document.getElementById('create-image-card');
const autocutCard     = document.getElementById('autocut-card');
const scriptVideoCard = document.getElementById('script-video-card');
const shareFilesCard  = document.getElementById('share-files-card');
const createNewBtn    = document.getElementById('create-new-btn');

if (createVideoCard) {
    createVideoCard.addEventListener('click', () => {
        window.location.href = 'video-index.html';
    });
}

if (createImageCard) {
    createImageCard.addEventListener('click', () => {
        window.location.href = 'img-index.html';
    });
}

if (autocutCard) {
    autocutCard.addEventListener('click', () => {
        alert('⚡ AutoCut is coming soon!\n\nAutomatically edit your videos with AI.');
    });
}

if (scriptVideoCard) {
    scriptVideoCard.addEventListener('click', () => {
        alert('🤖 Script to Video is coming soon!\n\nTurn your text into videos automatically.');
    });
}

if (shareFilesCard) {
    shareFilesCard.addEventListener('click', () => {
        alert('📤 Share files feature coming soon!');
    });
}

if (createNewBtn) {
    createNewBtn.addEventListener('click', () => {
        window.location.href = 'img-index.html';
    });
}

/* ============================================================
   HEADER ICON ACTIONS
   ============================================================ */
const giftIcon    = document.getElementById('gift-icon');
const desktopIcon = document.getElementById('desktop-icon');
const bellIcon    = document.getElementById('bell-icon');
const helpIcon    = document.getElementById('help-icon');

if (giftIcon) {
    giftIcon.addEventListener('click', () => {
        alert('🎁 Rewards & Gifts\n\nComing soon!');
    });
}

if (desktopIcon) {
    desktopIcon.addEventListener('click', () => {
        alert('💻 Desktop App\n\nDownload the Yucut desktop app for a better experience!');
    });
}

if (bellIcon) {
    bellIcon.addEventListener('click', () => {
        alert('🔔 No new notifications');
    });
}

if (helpIcon) {
    helpIcon.addEventListener('click', () => {
        alert('❓ Help & Support\n\nVisit our help center or contact support.');
    });
}

/* ============================================================
   SIDEBAR NAV ITEMS
   ============================================================ */
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        const page = item.dataset.page;

        switch (page) {
            case 'start':
                break;

            case 'recent':
                alert('📂 Recent drafts will appear here once you save a project.');
                break;

            case 'share':
                alert('📤 Share history will appear here.');
                break;

            case 'templates':
                alert('📱 Templates gallery coming soon!');
                break;

            case 'magic':
                alert('✨ Magic Tools (Beta)\n\nAI-powered editing features are on the way!');
                break;
        }
    });
});

/* ============================================================
   ADVANCED RECENT DRAFTS SYSTEM
   Auto-refresh • Search • Sort • Filter • Grid/List • Bulk Delete
   ============================================================ */

const draftsGrid = document.getElementById('drafts-grid');
const draftsEmpty = document.getElementById('drafts-empty');
const viewAllDrafts = document.getElementById('view-all-drafts');

// ================= STATE =================
let allDrafts = [];
let filteredDrafts = [];
let draftSearchQuery = '';
let draftSortBy = 'recent'; // recent | oldest | name | size
let draftFilter = 'all';    // all | image | video | today | week
let draftViewMode = 'grid'; // grid | list
let selectedDrafts = new Set();
let draftsExpanded = false;
let refreshInterval = null;

// ================= LOAD DRAFTS =================
function loadRecentDrafts(silent = false) {
    if (!draftsGrid) return;

    const raw = JSON.parse(localStorage.getItem('yucutDrafts')) || [];

    // Detect changes (silent refresh ke liye)
    const prevCount = allDrafts.length;
    const prevIds = allDrafts.map(d => d.id).join(',');

    allDrafts = raw;
    const newIds = allDrafts.map(d => d.id).join(',');

    // Agar koi change nahi hua aur silent mode hai to skip
    if (silent && prevCount === allDrafts.length && prevIds === newIds) {
        return;
    }

    applyDraftFilters();

    if (!silent && allDrafts.length > 0) {
        console.log(`📂 Loaded ${allDrafts.length} drafts`);
    }
}

// ================= FILTERS & SORT =================
function applyDraftFilters() {
    let result = [...allDrafts];

    // Filter by type
    if (draftFilter === 'image') {
        result = result.filter(d =>
            d.elements && d.elements.some(e => e.kind === 'image')
        );
    } else if (draftFilter === 'video') {
        result = result.filter(d =>
            d.elements && d.elements.some(e => e.kind === 'video')
        );
    } else if (draftFilter === 'today') {
        const todayStart = new Date().setHours(0, 0, 0, 0);
        result = result.filter(d => d.timestamp >= todayStart);
    } else if (draftFilter === 'week') {
        const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        result = result.filter(d => d.timestamp >= weekAgo);
    }

    // Search
    if (draftSearchQuery.trim()) {
        const q = draftSearchQuery.toLowerCase().trim();
        result = result.filter(d => {
            const name = getDraftName(d).toLowerCase();
            const items = (d.elementCount || 0).toString();
            return name.includes(q) || items.includes(q);
        });
    }

    // Sort
    switch (draftSortBy) {
        case 'recent':
            result.sort((a, b) => b.timestamp - a.timestamp);
            break;
        case 'oldest':
            result.sort((a, b) => a.timestamp - b.timestamp);
            break;
        case 'name':
            result.sort((a, b) => getDraftName(a).localeCompare(getDraftName(b)));
            break;
        case 'size':
            result.sort((a, b) => (b.elementCount || 0) - (a.elementCount || 0));
            break;
    }

    filteredDrafts = result;
    renderDrafts();
    updateDraftsCount();
}

// ================= RENDER =================
function renderDrafts() {
    if (!draftsGrid) return;

    // Clear previous cards
    Array.from(draftsGrid.children).forEach(child => {
        if (child.id !== 'drafts-empty') child.remove();
    });

    // Empty state
    if (allDrafts.length === 0) {
        if (draftsEmpty) {
            draftsEmpty.style.display = 'block';
            draftsEmpty.innerHTML = `
                <i class="fa-regular fa-folder-open"></i>
                <p>No drafts yet</p>
                <small>Create a new image to get started</small>
            `;
        }
        return;
    }

    // No results from filter/search
    if (filteredDrafts.length === 0) {
        if (draftsEmpty) {
            draftsEmpty.style.display = 'block';
            draftsEmpty.innerHTML = `
                <i class="fa-solid fa-magnifying-glass"></i>
                <p>No matching drafts</p>
                <small>Try changing your search or filters</small>
            `;
        }
        return;
    }

    if (draftsEmpty) draftsEmpty.style.display = 'none';

    // Limit display (5 by default, all if expanded)
    const toShow = draftsExpanded ? filteredDrafts : filteredDrafts.slice(0, 5);

    toShow.forEach((draft, idx) => {
        const card = createDraftCard(draft, idx);
        draftsGrid.appendChild(card);
    });

    // View all button state
    updateViewAllButton();
}

// ================= CREATE DRAFT CARD =================
function createDraftCard(draft, index = 0) {
    const card = document.createElement('div');
    card.className = 'draft-card';
    card.dataset.draftId = draft.id;
    card.style.animationDelay = (index * 40) + 'ms';

    if (selectedDrafts.has(draft.id)) {
        card.classList.add('selected');
    }

    const timeAgo = getTimeAgo(draft.timestamp);
    const draftName = getDraftName(draft);
    const thumbHTML = draft.thumbnail
        ? `<img src="${draft.thumbnail}" alt="Draft" loading="lazy">`
        : `<div class="draft-placeholder"><i class="fa-regular fa-image"></i></div>`;

    card.innerHTML = `
        <div class="draft-thumb">
            ${thumbHTML}
            <span class="draft-badge">DRAFT</span>
            <div class="draft-select-check">
                <i class="fa-solid fa-check"></i>
            </div>
        </div>
        <button class="draft-delete" title="Delete draft">
            <i class="fa-solid fa-trash"></i>
        </button>
        <div class="draft-info">
            <div class="draft-name">
                <i class="fa-solid fa-file-image"></i>
                <span class="draft-name-text">${draftName}</span>
            </div>
            <div class="draft-meta">
                <span class="draft-time">${timeAgo}</span>
                <span class="draft-items">${draft.elementCount || 0} items</span>
            </div>
        </div>
    `;

    // Click → open draft (unless in selection mode)
    card.addEventListener('click', (e) => {
        if (e.target.closest('.draft-delete') ||
            e.target.closest('.draft-select-check')) return;

        if (selectedDrafts.size > 0) {
            toggleDraftSelection(draft.id, card);
            return;
        }

        openDraft(draft.id);
    });

    // Delete button
    const deleteBtn = card.querySelector('.draft-delete');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Delete "${draftName}"?`)) {
            deleteDraft(draft.id);
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => loadRecentDrafts(), 200);
        }
    });

    // Checkbox for selection
    const check = card.querySelector('.draft-select-check');
    check.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDraftSelection(draft.id, card);
    });

    return card;
}

// ================= SELECTION =================
function toggleDraftSelection(draftId, cardEl) {
    if (selectedDrafts.has(draftId)) {
        selectedDrafts.delete(draftId);
        cardEl.classList.remove('selected');
    } else {
        selectedDrafts.add(draftId);
        cardEl.classList.add('selected');
    }
    updateBulkBar();
}

function clearSelection() {
    selectedDrafts.clear();
    document.querySelectorAll('.draft-card.selected').forEach(c => {
        c.classList.remove('selected');
    });
    updateBulkBar();
}

function updateBulkBar() {
    let bar = document.getElementById('draft-bulk-bar');

    if (selectedDrafts.size === 0) {
        if (bar) bar.remove();
        return;
    }

    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'draft-bulk-bar';
        bar.className = 'draft-bulk-bar';
        document.body.appendChild(bar);
    }

    bar.innerHTML = `
        <span class="bulk-count">${selectedDrafts.size} selected</span>
        <button class="bulk-btn" id="bulk-delete-btn">
            <i class="fa-solid fa-trash"></i> Delete
        </button>
        <button class="bulk-btn secondary" id="bulk-cancel-btn">
            Cancel
        </button>
    `;

    document.getElementById('bulk-delete-btn').onclick = () => {
        if (confirm(`Delete ${selectedDrafts.size} draft(s)?`)) {
            bulkDeleteDrafts();
        }
    };

    document.getElementById('bulk-cancel-btn').onclick = clearSelection;
}

function bulkDeleteDrafts() {
    let drafts = JSON.parse(localStorage.getItem('yucutDrafts')) || [];
    drafts = drafts.filter(d => !selectedDrafts.has(d.id));
    localStorage.setItem('yucutDrafts', JSON.stringify(drafts));
    selectedDrafts.clear();
    updateBulkBar();
    loadRecentDrafts();
    showDraftToast(`🗑️ Deleted ${selectedDrafts.size || 'selected'} draft(s)`);
}

// ================= OPEN DRAFT =================
function openDraft(draftId) {
    localStorage.setItem('openDraftId', draftId);
    window.location.href = 'img-index.html';
}

// ================= DELETE =================
function deleteDraft(draftId) {
    let drafts = JSON.parse(localStorage.getItem('yucutDrafts')) || [];
    drafts = drafts.filter(d => d.id !== draftId);
    localStorage.setItem('yucutDrafts', JSON.stringify(drafts));
    selectedDrafts.delete(draftId);
    updateBulkBar();
}

// ================= VIEW ALL BUTTON =================
function updateViewAllButton() {
    const btn = document.getElementById('view-all-drafts');
    if (!btn) return;

    if (filteredDrafts.length <= 5) {
        btn.style.display = 'none';
        return;
    }

    btn.style.display = 'inline-flex';
    if (draftsExpanded) {
        btn.innerHTML = 'Show less <i class="fa-solid fa-chevron-up"></i>';
        btn.style.pointerEvents = 'auto';
    } else {
        btn.innerHTML = `View all (${filteredDrafts.length}) <i class="fa-solid fa-chevron-right"></i>`;
        btn.style.pointerEvents = 'auto';
    }
}

if (viewAllDrafts) {
    viewAllDrafts.addEventListener('click', (e) => {
        e.preventDefault();
        draftsExpanded = !draftsExpanded;
        renderDrafts();

        if (!draftsExpanded && draftsGrid) {
            draftsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// ================= COUNT =================
function updateDraftsCount() {
    const countEl = document.getElementById('drafts-count');
    if (countEl) {
        countEl.textContent = allDrafts.length;
    }

    // Search bar ka count bhi
    const searchCountEl = document.getElementById('drafts-search-count');
    if (searchCountEl) {
        if (draftSearchQuery || draftFilter !== 'all') {
            searchCountEl.textContent = `${filteredDrafts.length} of ${allDrafts.length}`;
            searchCountEl.style.display = 'inline';
        } else {
            searchCountEl.style.display = 'none';
        }
    }
}

// ================= TOAST =================
function showDraftToast(msg) {
    let toast = document.getElementById('draft-toast');
    if (toast) toast.remove();

    toast = document.createElement('div');
    toast.id = 'draft-toast';
    toast.className = 'draft-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2200);
}

// ================= NAME & TIME HELPERS =================
function getDraftName(draft) {
    if (!draft.elements || draft.elements.length === 0) return 'Empty Draft';

    const hasText  = draft.elements.some(e => e.kind === 'text');
    const hasImage = draft.elements.some(e => e.kind === 'image');
    const hasShape = draft.elements.some(e => e.kind === 'shape');

    const parts = [];
    if (hasImage) parts.push('Image');
    if (hasText)  parts.push('Text');
    if (hasShape) parts.push('Shape');

    if (parts.length === 0) return 'Untitled';
    return parts.join(' + ');
}

function getTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours   = Math.floor(minutes / 60);
    const days    = Math.floor(hours / 24);

    if (seconds < 30) return 'Just now';
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24)   return `${hours}h ago`;
    if (days === 1)   return 'Yesterday';
    if (days < 7)     return `${days}d ago`;
    if (days < 30)    return `${Math.floor(days / 7)}w ago`;
    return new Date(timestamp).toLocaleDateString();
}

// ================= SEARCH & TOOLBAR INJECTION =================
function injectDraftsToolbar() {
    const section = draftsGrid ? draftsGrid.closest('.section-container') : null;
    if (!section) return;

    // Agar already inject ho chuka hai to skip
    if (section.querySelector('.drafts-toolbar')) return;

    const header = section.querySelector('.section-header');
    if (!header) return;

    // Update heading with count
    const h2 = header.querySelector('h2');
    if (h2 && !h2.querySelector('.drafts-count-badge')) {
        h2.innerHTML = `Recent drafts <span class="drafts-count-badge" id="drafts-count">0</span>`;
    }

    // Inject toolbar after header
    const toolbar = document.createElement('div');
    toolbar.className = 'drafts-toolbar';
    toolbar.innerHTML = `
        <div class="drafts-search-wrap">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="drafts-search" placeholder="Search drafts..." autocomplete="off">
            <span class="drafts-search-count" id="drafts-search-count"></span>
            <button class="drafts-search-clear" id="drafts-search-clear" style="display:none;">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <div class="drafts-controls">
            <select id="drafts-sort" class="drafts-select" title="Sort">
                <option value="recent">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="name">Name (A-Z)</option>
                <option value="size">Most items</option>
            </select>

            <div class="drafts-filter-tabs">
                <button class="drafts-filter-btn active" data-filter="all">All</button>
                <button class="drafts-filter-btn" data-filter="today">Today</button>
                <button class="drafts-filter-btn" data-filter="week">Week</button>
                <button class="drafts-filter-btn" data-filter="image">Images</button>
            </div>

            <button class="drafts-view-btn" id="drafts-view-toggle" title="Toggle view">
                <i class="fa-solid fa-list"></i>
            </button>
        </div>
    `;

    header.parentNode.insertBefore(toolbar, header.nextSibling);

    // ===== SEARCH =====
    const searchInput = document.getElementById('drafts-search');
    const searchClear = document.getElementById('drafts-search-clear');

    searchInput.addEventListener('input', (e) => {
        draftSearchQuery = e.target.value;
        searchClear.style.display = draftSearchQuery ? 'flex' : 'none';
        applyDraftFilters();
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        draftSearchQuery = '';
        searchClear.style.display = 'none';
        applyDraftFilters();
        searchInput.focus();
    });

    // ===== SORT =====
    document.getElementById('drafts-sort').addEventListener('change', (e) => {
        draftSortBy = e.target.value;
        applyDraftFilters();
    });

    // ===== FILTER TABS =====
    document.querySelectorAll('.drafts-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.drafts-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            draftFilter = btn.dataset.filter;
            applyDraftFilters();
        });
    });

    // ===== VIEW TOGGLE =====
    const viewBtn = document.getElementById('drafts-view-toggle');
    viewBtn.addEventListener('click', () => {
        draftViewMode = draftViewMode === 'grid' ? 'list' : 'grid';
        draftsGrid.classList.toggle('list-view', draftViewMode === 'list');
        viewBtn.innerHTML = draftViewMode === 'grid'
            ? '<i class="fa-solid fa-list"></i>'
            : '<i class="fa-solid fa-grip"></i>';
    });
}

// ================= AUTO REFRESH (Live updates) =================
function startDraftsAutoRefresh() {
    if (refreshInterval) clearInterval(refreshInterval);

    // Har 5 second check karo (silent mode)
    refreshInterval = setInterval(() => {
        loadRecentDrafts(true);
    }, 5000);
}

// Storage event (cross-tab sync)
window.addEventListener('storage', (e) => {
    if (e.key === 'yucutDrafts') {
        loadRecentDrafts();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + F → focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        const search = document.getElementById('drafts-search');
        if (search) {
            e.preventDefault();
            search.focus();
            search.select();
        }
    }

    // Escape → clear selection / search
    if (e.key === 'Escape') {
        if (selectedDrafts.size > 0) {
            clearSelection();
        } else {
            const search = document.getElementById('drafts-search');
            if (search && document.activeElement === search) {
                search.blur();
            }
        }
    }
});

// ================= INIT =================
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        injectDraftsToolbar();
        loadRecentDrafts();
        startDraftsAutoRefresh();
    }, 200);
});

document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        loadRecentDrafts(true);
    }
});

console.log('✅ Advanced Drafts System loaded');