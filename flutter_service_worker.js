'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "logo.png": "639b56a22e988dce81d486a3ad21ff71",
"index.html": "456d1ce7168dc54331e9a1a56f8b9c81",
"/": "456d1ce7168dc54331e9a1a56f8b9c81",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"manifest.json": "71eaefda8481c33a2d0333150fda126a",
"main.dart.js": "6682e49f1d08981baee0a9557c288022",
"assets/LICENSE": "b55baa269c3a8cb7cfa3eef77741f6fa",
"assets/AssetManifest.json": "9a5d36df0c3106452d9f4fb8224e8d53",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "5a37ae808cf9f652198acde612b5328d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "2bca5ec802e40d3f4b60343e346cedde",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "2aa350bd2aeab88b601a593f793734c0",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/assets/Rajendra.jpg": "f87f810c3ab5349b22ae4381f72e1ffc",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/FontManifest.json": "18eda8e36dfa64f14878d07846d6e17f",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1"
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
