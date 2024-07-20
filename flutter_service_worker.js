'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "786a2e279dc99e9a1e908b6049b44a42",
"version.json": "2a9a5a290e809e44c71abed4ded49770",
"splash/img/light-2x.png": "26e4b490d87a3922711384e60ca103bb",
"splash/img/branding-4x.png": "c4d9b01169ec6a6ca1baeabc4d983f2c",
"splash/img/dark-4x.png": "74a17202e5acd70e29a1d9b2128e9561",
"splash/img/branding-dark-1x.png": "aad0685565d6e767b89dd2b0e642d6d9",
"splash/img/light-3x.png": "219c8076ddae425d944272677e1960c8",
"splash/img/dark-3x.png": "219c8076ddae425d944272677e1960c8",
"splash/img/light-4x.png": "74a17202e5acd70e29a1d9b2128e9561",
"splash/img/branding-2x.png": "82a406454e28f0892a006119071beca2",
"splash/img/branding-3x.png": "3f6f46a283dc03e26ed2310d87228a26",
"splash/img/dark-2x.png": "26e4b490d87a3922711384e60ca103bb",
"splash/img/dark-1x.png": "c7c16a837bc2b8a9ead8f44b2463a4ab",
"splash/img/branding-dark-4x.png": "c4d9b01169ec6a6ca1baeabc4d983f2c",
"splash/img/branding-1x.png": "aad0685565d6e767b89dd2b0e642d6d9",
"splash/img/branding-dark-2x.png": "82a406454e28f0892a006119071beca2",
"splash/img/light-1x.png": "c7c16a837bc2b8a9ead8f44b2463a4ab",
"splash/img/branding-dark-3x.png": "3f6f46a283dc03e26ed2310d87228a26",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "3e8699dd65a865ff991ec5b47a93643d",
"index.html": "fb2e48262a5c49ab43b6b0bb29701ad8",
"/": "fb2e48262a5c49ab43b6b0bb29701ad8",
"main.dart.js": "7394ae42c4dd69c03af47bceb29b3481",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"favicon.png": "f7439092c78a22fb4a78eb416661c5a4",
"icons/Icon-192.png": "2d6440e060e696e0a967b760c3cca1e8",
"icons/Icon-maskable-192.png": "2d6440e060e696e0a967b760c3cca1e8",
"icons/Icon-maskable-512.png": "c7d1318d33181b95d44559114507a850",
"icons/Icon-512.png": "c7d1318d33181b95d44559114507a850",
"manifest.json": "0b4083bf84d069856fc2f6bfa8c16967",
"assets/AssetManifest.json": "dd281ef40287322a64a542613c0b8b54",
"assets/NOTICES": "252312d6179324724744c694e09b1e55",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "4c38cf5fb2488d3fed6e6d9f12e7b2e4",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "ca8d6d9ed2fc1e8932ff7ef7ffcff244",
"assets/fonts/MaterialIcons-Regular.otf": "b73eb7c05b69d1b4c2abfe85e936a2f4",
"assets/assets/mas.svg": "d2efc712579b7a471fff7a0287d2de33",
"assets/assets/mast.svg": "46ce76f367efee816a0ef6a427842418",
"assets/assets/11.png": "650be27da8d97c638d254e6cb9b1a93e",
"assets/assets/logosvg.svg": "d4e6ba6ab9d54c6eb8fc0c8d1cfcce52",
"assets/assets/2.png": "7163f951bdce8d5a8e38b3fdcbc1d5e7",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
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
