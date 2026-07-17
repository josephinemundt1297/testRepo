// Der Cache ist unser kleiner Offline-Rucksack mit den wichtigsten App-Dateien.
const cacheName = "playDate-v3";
const appShell = ["/", "/manifest.webmanifest", "/playDateIcon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => cache.addAll(appShell))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== cacheName).map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

const canCache = (request) => {
  const url = new URL(request.url);
  const isWebsiteRequest = url.protocol === "http:" || url.protocol === "https:";

  // Erweiterungen und fremde Domains gehören niemals in unseren App-Cache.
  return request.method === "GET" && isWebsiteRequest && url.origin === self.location.origin;
};

self.addEventListener("fetch", (event) => {
  if (!canCache(event.request)) return;

  event.respondWith(
    (async () => {
      try {
        const response = await fetch(event.request);

        if (response.ok && response.type === "basic") {
          try {
            const cache = await caches.open(cacheName);
            await cache.put(event.request, response.clone());
          } catch {
            // Ein Cache-Fehler darf die geladene Website nicht kaputtmachen.
          }
        }

        return response;
      } catch {
        const cachedResponse = await caches.match(event.request);
        const appFallback = await caches.match("/");
        return cachedResponse || appFallback || Response.error();
      }
    })(),
  );
});
