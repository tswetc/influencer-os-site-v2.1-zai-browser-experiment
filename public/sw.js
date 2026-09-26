// Influencer OS service worker — Fix Pack 21.
// Scope: the static shell only. It never intercepts /api/* or non-GET
// requests, so license activation and re-checks (POST /api/license) always
// hit the network — an offline cache can never answer a license check.

const CACHE = "ios-v1.23";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Cache-first static assets: hashed Next chunks, showcase images, icons.
// Videos are intentionally excluded (range requests + cache quota).
const STATIC =
  /^\/(_next\/static\/|showcase\/(img|poster|thumb)\/|gallery\/|icon|apple-icon|og\.png|manifest\.webmanifest)/;

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;
  if (url.pathname.endsWith(".mp4")) return;

  if (req.mode === "navigate") {
    // Network-first pages: fresh when online, the cached shell offline.
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() =>
          caches
            .match(req)
            .then((hit) => hit || caches.match("/app"))
            .then((hit) => hit || Response.error()),
        ),
    );
    return;
  }

  if (STATIC.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok && res.status === 200) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
            }
            return res;
          }),
      ),
    );
  }
});
