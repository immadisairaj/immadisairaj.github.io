'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "logo.png": "639b56a22e988dce81d486a3ad21ff71",
"index.html": "5fa22daa400069bf7e57db72996e9bcb",
"/": "5fa22daa400069bf7e57db72996e9bcb",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"manifest.json": "82febe992bcd1934898d1506251f5b31",
"main.dart.js": "91f98e453bfcad684b8a77212f5048bf",
"assets/LICENSE": "056d84d11c4e0cc6df8f86ada302b420",
"assets/AssetManifest.json": "1c0ee925a5fd722fbed06f56d6d41289",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "5a37ae808cf9f652198acde612b5328d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "2bca5ec802e40d3f4b60343e346cedde",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "2aa350bd2aeab88b601a593f793734c0",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/assets/Rajendra.jpg": "f87f810c3ab5349b22ae4381f72e1ffc",
"assets/assets/Rajendra_CV.pdf": "81ceb7e9ef77f9726d116fb803f66fcc",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/FontManifest.json": "18eda8e36dfa64f14878d07846d6e17f",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"app.js": "565c5b1042e0f9e4821efe97cc97edeb"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
