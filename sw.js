// Service worker installation event
self.addEventListener('install', e => {
  console.log('The service worker has been installed');
});

// Service worker activation event
self.addEventListener('activate', e => {
  console.log('The service worker has been activated');
});

// Service worker fetch event
self.addEventListener('fetch', e => {
  // console.log('Fetch event: ', e);
});
