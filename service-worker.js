self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("mostraki-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/logo.png",
        "/fundo-mobile.png",
        "/fundo-desktop.png",
        "/banner-mobile.webm",
        "/banner-desktop.webm",
        "/manifest.json",
        "/icon-192.png",
        "/icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});