const staticCacheName = 'site-static';
const staticAssets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/cook.svg',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://kit.fontawesome.com/63d74ff3d7.js'
];

// Service worker installation event
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(staticAssets);
    })
  );
});

// Service worker activation event
self.addEventListener('activate', e => {
  console.log('The service worker has been activated');
});

// Service worker fetch event
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      return cacheRes || fetch(e.request);
    })
  );
});