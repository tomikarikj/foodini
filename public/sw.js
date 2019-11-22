const staticCacheName = 'foodini-static-v1';
const dynamicCacheName = 'foodini-dynamic-v1';
const staticAssets = [
  '/',
  '/index.html',
  '/pages/fallback.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/cook.svg',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://kit.fontawesome.com/63d74ff3d7.js'
];

// Cache size limit
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

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
  // Delete all of the old cached assets
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Service worker fetch event
self.addEventListener('fetch', e => {
  if (e.request.url.indexOf('firestore.googleapis.com') === -1) {
    e.respondWith(
      caches
        .match(e.request)
        .then(cacheRes => {
          return (
            cacheRes ||
            fetch(e.request).then(fetchRes => {
              return caches.open(dynamicCacheName).then(cache => {
                cache.put(e.request.url, fetchRes.clone());
                limitCacheSize(dynamicCacheName, 15);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => {
          if (e.request.url.includes('.html')) {
            return caches.match('/pages/fallback.html');
          }
        })
    );
  }
});
