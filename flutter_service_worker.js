'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/fonts/MaterialIcons-Regular.otf": "8636bac46b97ab4eb3beba192dd51613",
"assets/AssetManifest.bin.json": "aa82524c0839436fb548d23521f3e0b9",
"assets/AssetManifest.bin": "4789b5d117146681effb700fa1c25d57",
"assets/AssetManifest.json": "34368b9f8c7a91fffdc8db93abf09796",
"assets/assets/fonts/Noto_Color_Emoji/NotoColorEmoji-Regular.ttf": "05b8319e9ca8c424f92581503927e872",
"assets/assets/rajendra.jpeg": "718a4f992a1ea0738b7372ae21eebae6",
"assets/assets/projects/timer-game.png": "1ee3aa017cf2d14d8de761c792ba13fc",
"assets/assets/projects/carousel-portfolio.png": "345dc1978337fd4bc6da9dd01af37da6",
"assets/assets/projects/sai-voice.png": "0a12ed7f7de2047ddacb8ca5a0f23baa",
"assets/assets/projects/curious-explorer.png": "82ad83370d19bfb577c23690a142808e",
"assets/assets/projects/distributed-group-chat.png": "fe9003dc60baa700e40e037d507f6e34",
"assets/assets/projects/website.png": "847358c9205673dfab798a29f1639a6a",
"assets/assets/projects/random-pick.png": "8b0e9610d4d74f3b8046df9cce0743c4",
"assets/assets/projects/arrow-pad.png": "a25a593ca74015d573f328f1a5f28a60",
"assets/assets/projects/sai-chits.png": "9080a8e4ea72d5a7cb92fae17d73e4fa",
"assets/assets/projects/quiz.jpg": "18c0dc637732a3071b91048f01ad2661",
"assets/assets/projects/digital-lcd-number.png": "b4729a9530f5fc290f29c229efa31efa",
"assets/assets/projects/prides.png": "6267c85d40d1c38a0749a79ad8a5a237",
"assets/assets/projects/harry-potter.jpg": "edd79c24c8ec72290c0af10a063f1a2e",
"assets/assets/projects/extinction-species.png": "39e9759465d012b91608e3636c086d6e",
"assets/assets/projects/codeforces-app.jpeg": "d2c69fd0096122a7b66966d369b8b24e",
"assets/assets/rnn.png": "245382b1f52a8142cfbc1801f317392b",
"assets/assets/logo.png": "639b56a22e988dce81d486a3ad21ff71",
"assets/assets/rive/whale-loading.riv": "a7fabc78e33aa5bcb543f139d7648309",
"assets/assets/rive/neon-bike.riv": "9caccf190ca474a71f5c3ed03e12f323",
"assets/assets/rive/water-home.riv": "e7aeb9484553b5c1aa439cc98aea903a",
"assets/assets/rive/s-logo-rotation.riv": "53b3fb36172e74d44f2524bf9d02f876",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "02fd976d73c09e3879218a9848b94e5b",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "3ca5dc7621921b901d513cc1ce23788c",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "09e5979e4cbb68e6abaf4784b6153c17",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "a2eb084b706ab40c90610942d98886ec",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/FontManifest.json": "db0c863d62172b9b0f1e7cb983b7dcdf",
"assets/NOTICES": "0281fcd521e3f6c69abff983486e61cb",
"app.js": "7fd588a9d7feef5e6f4a5d54431f6904",
"main.dart.js": "1b0c039ecc4e871d7ab61ae079d48563",
"manifest.json": "90c454c29b48f08bc06627d125f70466",
"version.json": "980547175e325fe622a3362b84d55b6a",
"canvaskit/skwasm.js.symbols": "9fe690d47b904d72c7d020bd303adf16",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/skwasm.wasm": "1c93738510f202d9ff44d36a4760126b",
"canvaskit/canvaskit.wasm": "a37f2b0af4995714de856e21e882325c",
"canvaskit/canvaskit.js.symbols": "27361387bc24144b46a745f1afe92b50",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.wasm": "c054c2c892172308ca5a0bd1d7a7754b",
"canvaskit/chromium/canvaskit.js.symbols": "f7c5e5502d577306fb6d530b1864ff86",
"resume.pdf": "d952f1be649101b032187d0c845a937e",
"flutter_bootstrap.js": "b21c13c961099deed12193e7d6ef7def",
"logo.png": "639b56a22e988dce81d486a3ad21ff71",
"index.html": "e43d658dfc7a61afca84cf85b2c62e66",
"/": "e43d658dfc7a61afca84cf85b2c62e66",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
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
