// sw.js v3 - cache bump to avoid stale files
const CACHE_NAME = 'sopa-frutas-v3';
const ASSETS = ['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./sw.js'];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)))
  );
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
