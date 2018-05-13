self.addEventListener('install', function (event) {
  // Perform install steps  https://developers.google.com/web/fundamentals/primers/service-workers/#prerequisites
}); var CACHE_NAME = 'rest_rev';
var urlsToCache = [
  '/',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate',  event => {
  const url = new URL(event.request.url);

if (url.pathname.startsWith('/restaurant.html')) {
      event.respondWith(
          caches.match('restaurant.html')
          .then(response => response || fetch(event.request))
      );
      return;
}
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
     return cache.match(event.request).then(response => {
      return response || fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        cache.put(event.request, responseClone);
        })
      })
    }
 );
});
