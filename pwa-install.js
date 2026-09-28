/* ============================================================
   YUCUT PWA - DYNAMIC INSTALL BUTTON
   Auto-detects device • Shows floating button • Smart logic
   ============================================================ */

(function() {
    'use strict';

    // ================= CONFIG =================
    const CONFIG = {
        DISMISS_KEY: 'yucut_install_dismissed',
        DISMISS_DURATION: 1000 * 60 * 60 * 24 * 3, // 3 days
        SCROLL_THRESHOLD: 150,
        SHOW_DELAY: 3000,
        HIDE_ON_INSTALLED: true
    };

    // ================= STATE =================
    let deferredPrompt = null;
    let installBtn = null;
    let isInstalled = false;
    let isDismissed = false;
    let scrollTriggered = false;
    let showTimer = null;

    // ================= DETECT INSTALLED =================
    function checkInstalled() {
        // Standalone mode check
        if (window.matchMedia('(display-mode: standalone)').matches) return true;
        if (window.navigator.standalone === true) return true;
        if (document.referrer.includes('android-app://')) return true;
        return false;
    }

    // ================= DETECT PLATFORM =================
    function detectPlatform() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;

        if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'ios';
        if (/android/i.test(ua)) return 'android';
        if (/windows|mac|linux/i.test(ua) && !/mobile/i.test(ua)) return 'desktop';
        return 'unknown';
    }

    // ================= DISMISS CHECK =================
    function checkDismissed() {
        const dismissedAt = localStorage.getItem(CONFIG.DISMISS_KEY);
        if (!dismissedAt) return false;

        const elapsed = Date.now() - parseInt(dismissedAt, 10);
        return elapsed < CONFIG.DISMISS_DURATION;
    }

    function dismissInstall() {
        localStorage.setItem(CONFIG.DISMISS_KEY, Date.now().toString());
        hideButton(true);
    }

    // ================= CREATE BUTTON =================
    function createInstallButton() {
        if (installBtn) return;

        installBtn = document.createElement('button');
        installBtn.id = 'pwa-install-btn';
        installBtn.className = 'pwa-install-btn';
        installBtn.setAttribute('aria-label', 'Install Yucut App');

        installBtn.innerHTML = `
            <span class="pwa-install-icon">
                <i class="fa-solid fa-download"></i>
            </span>
            <span class="pwa-install-text">
                <strong>Install Yucut</strong>
                <small>Add to home screen</small>
            </span>
            <button class="pwa-install-close" aria-label="Dismiss">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

        // Main click → install
        installBtn.addEventListener('click', handleInstallClick);

        // Close button → dismiss
        const closeBtn = installBtn.querySelector('.pwa-install-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dismissInstall();
        });

        document.body.appendChild(installBtn);

        // Inject styles once
        injectStyles();
    }

    // ================= HANDLE INSTALL =================
    async function handleInstallClick() {
        const platform = detectPlatform();

        // Android/Desktop → native prompt
        if (deferredPrompt) {
            try {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;

                if (outcome === 'accepted') {
                    console.log('✅ User accepted install');
                    isInstalled = true;
                    hideButton();
                    showToast('🎉 Yucut installed successfully!');
                } else {
                    console.log('❌ User dismissed install');
                }

                deferredPrompt = null;
            } catch (err) {
                console.error('Install error:', err);
                showInstructions(platform);
            }
            return;
        }

        // iOS or fallback → show instructions
        showInstructions(platform);
    }

    // ================= SHOW INSTRUCTIONS =================
    function showInstructions(platform) {
        const modal = document.createElement('div');
        modal.className = 'pwa-modal-backdrop';
        modal.innerHTML = `
            <div class="pwa-modal">
                <button class="pwa-modal-close">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="pwa-modal-icon">
                    <i class="fa-solid fa-mobile-screen-button"></i>
                </div>

                <h3>Install Yucut</h3>
                <p>Add Yucut to your home screen for the best experience</p>

                ${platform === 'ios' ? `
                    <div class="pwa-steps">
                        <div class="pwa-step">
                            <div class="pwa-step-num">1</div>
                            <div class="pwa-step-text">
                                Tap <strong>Share</strong> button
                                <i class="fa-solid fa-arrow-up-from-bracket" style="color: #007aff;"></i>
                            </div>
                        </div>
                        <div class="pwa-step">
                            <div class="pwa-step-num">2</div>
                            <div class="pwa-step-text">
                                Scroll & tap <strong>"Add to Home Screen"</strong>
                                <i class="fa-solid fa-plus-square" style="color: #007aff;"></i>
                            </div>
                        </div>
                        <div class="pwa-step">
                            <div class="pwa-step-num">3</div>
                            <div class="pwa-step-text">
                                Tap <strong>"Add"</strong> in the top right
                            </div>
                        </div>
                    </div>
                ` : platform === 'android' ? `
                    <div class="pwa-steps">
                        <div class="pwa-step">
                            <div class="pwa-step-num">1</div>
                            <div class="pwa-step-text">
                                Tap <strong>⋮</strong> menu in browser
                            </div>
                        </div>
                        <div class="pwa-step">
                            <div class="pwa-step-num">2</div>
                            <div class="pwa-step-text">
                                Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>
                            </div>
                        </div>
                        <div class="pwa-step">
                            <div class="pwa-step-num">3</div>
                            <div class="pwa-step-text">
                                Tap <strong>"Install"</strong> to confirm
                            </div>
                        </div>
                    </div>
                ` : `
                    <div class="pwa-steps">
                        <div class="pwa-step">
                            <div class="pwa-step-num">1</div>
                            <div class="pwa-step-text">
                                Click the <strong>install icon</strong>
                                <i class="fa-solid fa-download" style="color: #00d2d3;"></i>
                                in address bar
                            </div>
                        </div>
                        <div class="pwa-step">
                            <div class="pwa-step-num">2</div>
                            <div class="pwa-step-text">
                                Or open menu → <strong>"Install Yucut"</strong>
                            </div>
                        </div>
                    </div>
                `}

                <button class="pwa-modal-btn" id="pwa-modal-ok">
                    Got it
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate in
        requestAnimationFrame(() => modal.classList.add('show'));

        // Close handlers
        const close = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        };

        modal.querySelector('.pwa-modal-close').addEventListener('click', close);
        modal.querySelector('#pwa-modal-ok').addEventListener('click', close);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });
    }

    // ================= SHOW/HIDE BUTTON =================
    function showButton() {
        if (!installBtn) createInstallButton();
        if (isInstalled || isDismissed) return;

        installBtn.classList.add('show');
        console.log('📱 Install button shown');
    }

    function hideButton(permanent = false) {
        if (installBtn) {
            installBtn.classList.remove('show');
        }
        if (permanent) {
            isDismissed = true;
            console.log('📱 Install button hidden (dismissed)');
        }
    }

    // ================= TOAST =================
    function showToast(msg) {
        let toast = document.getElementById('pwa-toast');
        if (toast) toast.remove();

        toast = document.createElement('div');
        toast.id = 'pwa-toast';
        toast.className = 'pwa-toast';
        toast.textContent = msg;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    // ================= INJECT STYLES =================
    function injectStyles() {
        if (document.getElementById('pwa-install-styles')) return;

        const style = document.createElement('style');
        style.id = 'pwa-install-styles';
        style.textContent = `
            /* ===== INSTALL BUTTON (FLOATING BOTTOM) ===== */
            .pwa-install-btn {
                position: fixed;
                bottom: 24px;
                left: 50%;
                transform: translateX(-50%) translateY(120px);
                background: linear-gradient(135deg, #00d2d3, #00b5b6);
                color: white;
                border: none;
                border-radius: 16px;
                padding: 12px 18px;
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
                box-shadow: 0 10px 30px rgba(0, 210, 211, 0.45),
                            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
                z-index: 9998;
                transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                opacity: 0;
                pointer-events: none;
                font-family: inherit;
                max-width: calc(100% - 32px);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }

            .pwa-install-btn.show {
                opacity: 1;
                pointer-events: auto;
                transform: translateX(-50%) translateY(0);
                animation: pwaFloat 3s ease-in-out infinite;
            }

            @keyframes pwaFloat {
                0%, 100% { transform: translateX(-50%) translateY(0); }
                50%      { transform: translateX(-50%) translateY(-4px); }
            }

            .pwa-install-btn:hover {
                box-shadow: 0 14px 40px rgba(0, 210, 211, 0.6),
                            0 0 0 1px rgba(255, 255, 255, 0.15) inset;
                transform: translateX(-50%) translateY(-4px) scale(1.02);
            }

            .pwa-install-btn:active {
                transform: translateX(-50%) translateY(-2px) scale(0.98);
            }

            .pwa-install-icon {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                flex-shrink: 0;
                animation: pwaIconPulse 2s ease-in-out infinite;
            }

            @keyframes pwaIconPulse {
                0%, 100% { transform: scale(1); }
                50%      { transform: scale(1.1); }
            }

            .pwa-install-text {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                line-height: 1.2;
                text-align: left;
            }

            .pwa-install-text strong {
                font-size: 14px;
                font-weight: 700;
                margin-bottom: 2px;
            }

            .pwa-install-text small {
                font-size: 10px;
                opacity: 0.85;
                font-weight: 500;
            }

            .pwa-install-close {
                width: 26px;
                height: 26px;
                border-radius: 50%;
                border: none;
                background: rgba(255, 255, 255, 0.15);
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                transition: all 0.2s;
                flex-shrink: 0;
                margin-left: 4px;
            }

            .pwa-install-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: rotate(90deg);
            }

            /* ===== MODAL ===== */
            .pwa-modal-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(6px);
                -webkit-backdrop-filter: blur(6px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                opacity: 0;
                transition: opacity 0.3s;
            }

            .pwa-modal-backdrop.show {
                opacity: 1;
            }

            .pwa-modal {
                background: var(--bg-panel, #fff);
                color: var(--text-dark, #1a1a1a);
                border-radius: 20px;
                padding: 32px 24px 24px;
                max-width: 400px;
                width: 100%;
                position: relative;
                box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
                transform: scale(0.9) translateY(20px);
                transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                font-family: inherit;
                max-height: 90vh;
                overflow-y: auto;
            }

            .pwa-modal-backdrop.show .pwa-modal {
                transform: scale(1) translateY(0);
            }

            .pwa-modal-close {
                position: absolute;
                top: 12px;
                right: 12px;
                width: 34px;
                height: 34px;
                border-radius: 50%;
                border: none;
                background: var(--bg-hover, #f0f0f0);
                color: var(--text-light, #666);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                transition: 0.2s;
            }

            .pwa-modal-close:hover {
                background: var(--danger, #ff3b30);
                color: white;
                transform: rotate(90deg);
            }

            .pwa-modal-icon {
                width: 68px;
                height: 68px;
                background: linear-gradient(135deg, #00d2d3, #00b5b6);
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 16px;
                color: white;
                font-size: 28px;
                box-shadow: 0 8px 24px rgba(0, 210, 211, 0.4);
                animation: pwaIconFloat 2s ease-in-out infinite;
            }

            @keyframes pwaIconFloat {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50%      { transform: translateY(-6px) rotate(3deg); }
            }

            .pwa-modal h3 {
                font-size: 22px;
                font-weight: 800;
                text-align: center;
                margin-bottom: 8px;
                color: var(--text-dark, #1a1a1a);
                letter-spacing: -0.3px;
            }

            .pwa-modal > p {
                text-align: center;
                font-size: 13px;
                color: var(--text-light, #666);
                margin-bottom: 22px;
                line-height: 1.4;
            }

            .pwa-steps {
                display: flex;
                flex-direction: column;
                gap: 12px;
                margin-bottom: 22px;
            }

            .pwa-step {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 14px;
                background: var(--bg-card, #fafafa);
                border-radius: 12px;
                border: 1px solid var(--border, #e5e5e5);
            }

            .pwa-step-num {
                width: 28px;
                height: 28px;
                background: linear-gradient(135deg, #00d2d3, #00b5b6);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                font-weight: 800;
                flex-shrink: 0;
            }

            .pwa-step-text {
                font-size: 13px;
                color: var(--text-dark, #1a1a1a);
                line-height: 1.35;
                display: flex;
                align-items: center;
                gap: 6px;
                flex-wrap: wrap;
            }

            .pwa-step-text strong {
                color: var(--primary, #00d2d3);
                font-weight: 700;
            }

            .pwa-modal-btn {
                width: 100%;
                padding: 14px;
                background: linear-gradient(135deg, #00d2d3, #00b5b6);
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 15px;
                font-weight: 700;
                cursor: pointer;
                transition: 0.2s;
                font-family: inherit;
                box-shadow: 0 4px 16px rgba(0, 210, 211, 0.35);
            }

            .pwa-modal-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(0, 210, 211, 0.5);
            }

            .pwa-modal-btn:active {
                transform: translateY(0);
            }

            /* ===== TOAST ===== */
            .pwa-toast {
                position: fixed;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%) translateY(20px);
                background: linear-gradient(135deg, #00d2d3, #00b5b6);
                color: white;
                padding: 12px 22px;
                border-radius: 12px;
                font-size: 13px;
                font-weight: 600;
                box-shadow: 0 8px 30px rgba(0, 210, 211, 0.4);
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 10001;
                pointer-events: none;
                font-family: inherit;
                max-width: 90%;
                text-align: center;
            }

            .pwa-toast.show {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }

            /* ===== MOBILE ===== */
            @media (max-width: 768px) {
                .pwa-install-btn {
                    bottom: 90px; /* above bottom nav */
                    padding: 10px 14px;
                    border-radius: 14px;
                    gap: 10px;
                }

                .pwa-install-btn.show {
                    animation: pwaFloat 3s ease-in-out infinite;
                }

                .pwa-install-icon {
                    width: 34px;
                    height: 34px;
                    font-size: 14px;
                    border-radius: 10px;
                }

                .pwa-install-text strong {
                    font-size: 12px;
                }

                .pwa-install-text small {
                    font-size: 9px;
                }

                .pwa-install-close {
                    width: 22px;
                    height: 22px;
                    font-size: 10px;
                }

                .pwa-modal {
                    padding: 26px 18px 20px;
                    border-radius: 18px;
                }

                .pwa-modal-icon {
                    width: 58px;
                    height: 58px;
                    font-size: 24px;
                    border-radius: 16px;
                }

                .pwa-modal h3 {
                    font-size: 19px;
                }

                .pwa-modal > p {
                    font-size: 12px;
                    margin-bottom: 18px;
                }

                .pwa-step {
                    padding: 10px 12px;
                    gap: 10px;
                }

                .pwa-step-num {
                    width: 24px;
                    height: 24px;
                    font-size: 11px;
                }

                .pwa-step-text {
                    font-size: 12px;
                }

                .pwa-modal-btn {
                    padding: 12px;
                    font-size: 14px;
                }

                .pwa-toast {
                    bottom: 160px;
                    font-size: 12px;
                    padding: 10px 18px;
                }
            }

            @media (max-width: 480px) {
                .pwa-install-btn {
                    left: 16px;
                    right: 16px;
                    transform: translateY(120px);
                    max-width: none;
                    justify-content: space-between;
                }

                .pwa-install-btn.show {
                    transform: translateY(0);
                    animation: pwaFloatMobile 3s ease-in-out infinite;
                }

                .pwa-install-btn:hover {
                    transform: translateY(-4px) scale(1.01);
                }

                @keyframes pwaFloatMobile {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-4px); }
                }
            }

            /* ===== REDUCED MOTION ===== */
            @media (prefers-reduced-motion: reduce) {
                .pwa-install-btn,
                .pwa-install-icon,
                .pwa-modal,
                .pwa-modal-icon {
                    animation: none !important;
                    transition: opacity 0.2s !important;
                }
            }
        `;

        document.head.appendChild(style);
    }

    // ================= SCROLL DETECTION =================
    function setupScrollTrigger() {
        const checkScroll = () => {
            if (scrollTriggered || isDismissed || isInstalled) return;

            const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

            // Trigger on scroll OR if page is short
            const pageHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            const isShortPage = pageHeight <= viewportHeight + 100;

            if (scrollY > CONFIG.SCROLL_THRESHOLD || isShortPage) {
                scrollTriggered = true;
                // Small delay before showing for smoothness
                showTimer = setTimeout(showButton, 400);
            }
        };

        window.addEventListener('scroll', checkScroll, { passive: true });

        // Initial check
        setTimeout(checkScroll, 500);
    }

    // ================= INSTALL EVENT (Android/Desktop) =================
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        console.log('📱 beforeinstallprompt captured');

        // Show button immediately if page already scrolled
        if (scrollTriggered && !isDismissed && !isInstalled) {
            showButton();
        }
    });

    // ================= APP INSTALLED EVENT =================
    window.addEventListener('appinstalled', (e) => {
        console.log('✅ PWA installed');
        isInstalled = true;
        deferredPrompt = null;
        hideButton();

        // Clear dismiss state
        localStorage.removeItem(CONFIG.DISMISS_KEY);

        showToast('🎉 Yucut installed! Launching...');

        setTimeout(() => {
            window.location.href = './index.html';
        }, 1500);
    });

    // ================= MEDIA QUERY (Standalone detect) =================
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', (e) => {
            if (e.matches) {
                isInstalled = true;
                hideButton();
            }
        });
    }

    // ================= INIT =================
    function init() {
        isInstalled = checkInstalled();
        isDismissed = checkDismissed();

        console.log('📱 PWA Install Manager initialized');
        console.log('   Platform:', detectPlatform());
        console.log('   Installed:', isInstalled);
        console.log('   Dismissed:', isDismissed);

        // Already installed → don't show anything
        if (isInstalled) {
            console.log('ℹ️ App already installed');
            return;
        }

        // Pre-create button (hidden)
        createInstallButton();

        // Setup scroll trigger
        setupScrollTrigger();

        // Fallback: show after N seconds even without scroll (iOS)
        setTimeout(() => {
            if (!scrollTriggered && !isDismissed && !isInstalled) {
                const platform = detectPlatform();
                // iOS mein beforeinstallprompt nahi aata, to manually show karo
                if (platform === 'ios' || !deferredPrompt) {
                    showButton();
                }
            }
        }, CONFIG.SHOW_DELAY + 2000);
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ================= PUBLIC API =================
    window.YucutPWA = {
        show: showButton,
        hide: hideButton,
        dismiss: dismissInstall,
        reset: () => {
            localStorage.removeItem(CONFIG.DISMISS_KEY);
            isDismissed = false;
            scrollTriggered = false;
            console.log('🔄 Install state reset');
        },
        isInstalled: () => isInstalled,
        platform: detectPlatform
    };

})();