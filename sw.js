// This service worker deliberately does NOT do any offline caching — the app
// always needs a live network connection anyway (Google Sheets/Drive backend),
// so caching old versions of the page would risk showing stale data or a
// stale Client ID/config. It exists purely to satisfy Chrome on Android's
// "installable web app" criteria, which (unlike iOS Safari) requires a
// registered service worker with a fetch handler before it will treat
// "Add to Home Screen" as installing a real standalone app instead of just a
// browser-shortcut icon.

self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// A pass-through fetch handler — required for Chrome's installability check,
// but does nothing beyond letting the request go to the network normally.
self.addEventListener('fetch', function (event) {
  event.respondWith(fetch(event.request));
});
