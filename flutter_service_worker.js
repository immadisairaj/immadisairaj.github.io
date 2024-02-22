'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"app.js": "7fd588a9d7feef5e6f4a5d54431f6904",
"version.json": "980547175e325fe622a3362b84d55b6a",
"radiosai/images/bhajanStream.png": "363b7f043f6b9b52d423bd889cdf2ac2",
"radiosai/images/prasanthiStream.png": "2298a77a7f428fcbddccae26371de85f",
"radiosai/images/teluguStream.png": "ed2cc4487e9eaed7f55d4bd9fb6599a8",
"radiosai/images/discourseStream.png": "fcaaa1cab2e98103d2fcdfcc2993d475",
"logo.png": "639b56a22e988dce81d486a3ad21ff71",
"resume.pdf": "dc54f94915148e35ed17d65e9ce0c795",
"manifest.json": "90c454c29b48f08bc06627d125f70466",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"index.html": "0994fd84eee58c28469e87477c1ecbef",
"/": "0994fd84eee58c28469e87477c1ecbef",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"main.dart.js": "0199bb5e8f745d76322f3caa32d7ffb9",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "5cce528907d9cd81d3c30672988f8c63",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "f3307f62ddff94d2cd8b103daf8d1b0f",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "edb06e69f55272d1bffb61d3dfbc0868",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "04f83c01dded195a11d21c2edf643455",
"assets/AssetManifest.bin": "4789b5d117146681effb700fa1c25d57",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.json": "34368b9f8c7a91fffdc8db93abf09796",
"assets/FontManifest.json": "db0c863d62172b9b0f1e7cb983b7dcdf",
"assets/fonts/MaterialIcons-Regular.otf": "d4e412b6e9393410056b2dcd6381b580",
"assets/AssetManifest.bin.json": "aa82524c0839436fb548d23521f3e0b9",
"assets/NOTICES": "19c788c6c5d942d8165f99df4e688073",
"assets/assets/rive/s-logo-rotation.riv": "53b3fb36172e74d44f2524bf9d02f876",
"assets/assets/rive/neon-bike.riv": "9caccf190ca474a71f5c3ed03e12f323",
"assets/assets/rive/whale-loading.riv": "a7fabc78e33aa5bcb543f139d7648309",
"assets/assets/rive/water-home.riv": "e7aeb9484553b5c1aa439cc98aea903a",
"assets/assets/logo.png": "639b56a22e988dce81d486a3ad21ff71",
"assets/assets/rnn.png": "245382b1f52a8142cfbc1801f317392b",
"assets/assets/rajendra.jpeg": "718a4f992a1ea0738b7372ae21eebae6",
"assets/assets/projects/digital-lcd-number.png": "b4729a9530f5fc290f29c229efa31efa",
"assets/assets/projects/arrow-pad.png": "a25a593ca74015d573f328f1a5f28a60",
"assets/assets/projects/codeforces-app.jpeg": "d2c69fd0096122a7b66966d369b8b24e",
"assets/assets/projects/extinction-species.png": "39e9759465d012b91608e3636c086d6e",
"assets/assets/projects/prides.png": "6267c85d40d1c38a0749a79ad8a5a237",
"assets/assets/projects/distributed-group-chat.png": "fe9003dc60baa700e40e037d507f6e34",
"assets/assets/projects/website.png": "847358c9205673dfab798a29f1639a6a",
"assets/assets/projects/random-pick.png": "8b0e9610d4d74f3b8046df9cce0743c4",
"assets/assets/projects/sai-chits.png": "9080a8e4ea72d5a7cb92fae17d73e4fa",
"assets/assets/projects/curious-explorer.png": "82ad83370d19bfb577c23690a142808e",
"assets/assets/projects/sai-voice.png": "0a12ed7f7de2047ddacb8ca5a0f23baa",
"assets/assets/projects/carousel-portfolio.png": "345dc1978337fd4bc6da9dd01af37da6",
"assets/assets/projects/harry-potter.jpg": "edd79c24c8ec72290c0af10a063f1a2e",
"assets/assets/projects/timer-game.png": "1ee3aa017cf2d14d8de761c792ba13fc",
"assets/assets/projects/quiz.jpg": "18c0dc637732a3071b91048f01ad2661",
"assets/assets/fonts/Noto_Color_Emoji/NotoColorEmoji-Regular.ttf": "05b8319e9ca8c424f92581503927e872"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
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
