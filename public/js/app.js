if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(reg => console.log(reg))
    .catch(err => console.error(err));
}
