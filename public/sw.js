// basic service worker stub for PWA caching
self.addEventListener('install', event => {
  self.skipWaiting()
})
self.addEventListener('activate', event => {
  self.clients.claim()
})
self.addEventListener('fetch', event => {
  // network-first, fallback to cache placeholder
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)))
})
