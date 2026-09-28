/* ============================================================
   YUCUT PWA - SERVICE WORKER
   Offline support + Cache management
   ============================================================ */

const CACHE_VERSION = 'yucut-v1.0.0';
const CACHE_NAME = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

// Files to cache on install
const PRECACHE_URLS = [
    './',
    './index.html',
    './img-index.html',
    './video-index.html',
    './style.css',
    './img-style.css',
    './video-style.css',
    './theme.css',
    './script.js',
    './img-script.js',
    './video-script.js',
    './theme.js',
    './pwa-install.js',
    './manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    // ✅ Icons add karo
    './icons/icon-72.png',
    './icons/icon-96.png',
    './icons/icon-128.png',
    './icons/icon-144.png',
    './icons/icon-152.png',
    './icons/icon-192.png',
    './icons/icon-384.png',
    './icons/icon-512.png',
    './icons/icon-192-maskable.png',
    './icons/icon-512-maskable.png'
];
// ================= INSTALL =================
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Pre-caching files');
                return cache.addAll(PRECACHE_URLS.map(url => new Request(url, { cache: 'reload' })));
            })
            .then(() => self.skipWaiting())
            .catch(err => console.warn('⚠️ Pre-cache failed:', err))
    );
});

// ================= ACTIVATE =================
self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker activating...');

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name.startsWith('yucut-') && name !== CACHE_NAME && name !== RUNTIME_CACHE)
                        .map(name => {
                            console.log('🗑️ Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// ================= FETCH =================
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip chrome extensions
    if (url.protocol === 'chrome-extension:') return;

    // Navigation requests → Network first, fallback to cache
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const copy = response.clone();
                    caches.open(RUNTIME_CACHE).then(cache => cache.put(request, copy));
                    return response;
                })
                .catch(() => caches.match(request).then(cached => cached || caches.match('./index.html')))
        );
        return;
    }

    // API calls → Network only
    if (url.pathname.includes('/api/')) {
        return;
    }

    // Everything else → Cache first, fallback to network
    event.respondWith(
        caches.match(request).then(cached => {
            if (cached) return cached;

            return fetch(request).then(response => {
                // Cache successful responses
                if (response && response.status === 200 && response.type === 'basic') {
                    const copy = response.clone();
                    caches.open(RUNTIME_CACHE).then(cache => cache.put(request, copy));
                }
                return response;
            }).catch(() => {
                // Offline fallback for images
                if (request.destination === 'image') {
                    return new Response(
                        '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#2a2a2a"/><text x="50" y="55" text-anchor="middle" fill="#666" font-size="12">Offline</text></svg>',
                        { headers: { 'Content-Type': 'image/svg+xml' } }
                    );
                }
            });
        })
    );
});

// ================= MESSAGE =================
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.keys().then(names => {
            names.forEach(name => caches.delete(name));
        });
    }
});

// ================= PUSH (optional) =================
self.addEventListener('push', (event) => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body || 'New update from Yucut',
        icon: 'icons/icon-192.png',
        badge: 'icons/icon-96.png',
        vibrate: [100, 50, 100],
        data: { url: data.url || './' }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Yucut', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url || './')
    );
});

console.log('✅ Yucut Service Worker loaded');