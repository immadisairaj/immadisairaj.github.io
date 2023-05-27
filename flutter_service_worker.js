'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"assets/assets/rajendra.jpeg": "718a4f992a1ea0738b7372ae21eebae6",
"assets/assets/logo.png": "639b56a22e988dce81d486a3ad21ff71",
"assets/assets/rive/whale-loading.riv": "a7fabc78e33aa5bcb543f139d7648309",
"assets/assets/rive/s-logo-rotation.riv": "53b3fb36172e74d44f2524bf9d02f876",
"assets/assets/rive/water-home.riv": "e7aeb9484553b5c1aa439cc98aea903a",
"assets/assets/rive/neon-bike.riv": "9caccf190ca474a71f5c3ed03e12f323",
"assets/assets/rnn.png": "245382b1f52a8142cfbc1801f317392b",
"assets/assets/fonts/Noto_Color_Emoji/NotoColorEmoji-Regular.ttf": "05b8319e9ca8c424f92581503927e872",
"assets/assets/projects/digital-lcd-number.png": "b4729a9530f5fc290f29c229efa31efa",
"assets/assets/projects/extinction-species.png": "39e9759465d012b91608e3636c086d6e",
"assets/assets/projects/arrow-pad.png": "a25a593ca74015d573f328f1a5f28a60",
"assets/assets/projects/sai-chits.png": "9080a8e4ea72d5a7cb92fae17d73e4fa",
"assets/assets/projects/distributed-group-chat.png": "fe9003dc60baa700e40e037d507f6e34",
"assets/assets/projects/harry-potter.jpg": "edd79c24c8ec72290c0af10a063f1a2e",
"assets/assets/projects/prides.png": "6267c85d40d1c38a0749a79ad8a5a237",
"assets/assets/projects/website.png": "847358c9205673dfab798a29f1639a6a",
"assets/assets/projects/timer-game.png": "1ee3aa017cf2d14d8de761c792ba13fc",
"assets/assets/projects/carousel-portfolio.png": "345dc1978337fd4bc6da9dd01af37da6",
"assets/assets/projects/quiz.jpg": "18c0dc637732a3071b91048f01ad2661",
"assets/assets/projects/sai-voice.png": "0a12ed7f7de2047ddacb8ca5a0f23baa",
"assets/assets/projects/codeforces-app.jpeg": "d2c69fd0096122a7b66966d369b8b24e",
"assets/assets/projects/random-pick.png": "8b0e9610d4d74f3b8046df9cce0743c4",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/fonts/MaterialIcons-Regular.otf": "b893aef01a8d142ae66b7a4a8e64c940",
"assets/NOTICES": "9ced4df8f239275221fa52fb53f2225c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "f0fd7c0e8d84cb94662fa2b5f51c7e12",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "01bb14ae3f14c73ee03eed84f480ded9",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "0db203e8632f03baae0184700f3bda48",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "efc6c90b58d765987f922c95c2031dd2",
"assets/FontManifest.json": "db0c863d62172b9b0f1e7cb983b7dcdf",
"assets/AssetManifest.json": "6764033fa878e5478780583743bda104",
"assets/AssetManifest.smcbin": "5a77a50055871ef8d6bf02b311a9278e",
"index.html": "a67b9bd4c621ad555c0000754ec132b9",
"/": "a67b9bd4c621ad555c0000754ec132b9",
"logo.png": "639b56a22e988dce81d486a3ad21ff71",
"app.js": "7fd588a9d7feef5e6f4a5d54431f6904",
"version.json": "980547175e325fe622a3362b84d55b6a",
"resume.pdf": "fe02c76c6ec6b7288ced2815bda1acfc",
"main.dart.js": "fcb30df463dbb7bf501b34ada9d0d669",
"manifest.json": "90c454c29b48f08bc06627d125f70466"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
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
        // Claim client to enable caching on first launch
        self.clients.claim();
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
      // Claim client to enable caching on first launch
      self.clients.claim();
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
