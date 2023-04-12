'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"index.html": "95e21ed02e337e7ebcb495fec18e767d",
"/": "95e21ed02e337e7ebcb495fec18e767d",
"resume.pdf": "fe02c76c6ec6b7288ced2815bda1acfc",
"main.dart.js": "6b75dd63248b6435159714eaeeb9fcad",
"manifest.json": "90c454c29b48f08bc06627d125f70466",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"app.js": "7fd588a9d7feef5e6f4a5d54431f6904",
"logo.png": "639b56a22e988dce81d486a3ad21ff71",
"version.json": "980547175e325fe622a3362b84d55b6a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "0a94bab8e306520dc6ae14c2573972ad",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "9cda082bd7cc5642096b56fa8db15b45",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "b00363533ebe0bfdb95f3694d7647f6d",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/NOTICES": "78182bcb21ba2f479a2b1c2487979260",
"assets/AssetManifest.json": "98b270cea67be4883290398734892b44",
"assets/assets/rnn.png": "245382b1f52a8142cfbc1801f317392b",
"assets/assets/projects/random-pick.png": "8b0e9610d4d74f3b8046df9cce0743c4",
"assets/assets/projects/carousel-portfolio.png": "345dc1978337fd4bc6da9dd01af37da6",
"assets/assets/projects/digital-lcd-number.png": "b4729a9530f5fc290f29c229efa31efa",
"assets/assets/projects/extinction-species.png": "39e9759465d012b91608e3636c086d6e",
"assets/assets/projects/sai-chits.png": "9080a8e4ea72d5a7cb92fae17d73e4fa",
"assets/assets/projects/codeforces-app.jpeg": "d2c69fd0096122a7b66966d369b8b24e",
"assets/assets/projects/harry-potter.jpg": "edd79c24c8ec72290c0af10a063f1a2e",
"assets/assets/projects/timer-game.png": "1ee3aa017cf2d14d8de761c792ba13fc",
"assets/assets/projects/distributed-group-chat.png": "fe9003dc60baa700e40e037d507f6e34",
"assets/assets/projects/arrow-pad.png": "a25a593ca74015d573f328f1a5f28a60",
"assets/assets/projects/prides.png": "6267c85d40d1c38a0749a79ad8a5a237",
"assets/assets/projects/sai-voice.png": "0a12ed7f7de2047ddacb8ca5a0f23baa",
"assets/assets/projects/website.png": "847358c9205673dfab798a29f1639a6a",
"assets/assets/projects/quiz.jpg": "18c0dc637732a3071b91048f01ad2661",
"assets/assets/rive/s-logo-rotation.riv": "53b3fb36172e74d44f2524bf9d02f876",
"assets/assets/rive/whale-loading.riv": "a7fabc78e33aa5bcb543f139d7648309",
"assets/assets/rive/neon-bike.riv": "9caccf190ca474a71f5c3ed03e12f323",
"assets/assets/rive/water-home.riv": "e7aeb9484553b5c1aa439cc98aea903a",
"assets/assets/logo.png": "639b56a22e988dce81d486a3ad21ff71",
"assets/assets/rajendra.jpeg": "718a4f992a1ea0738b7372ae21eebae6"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
