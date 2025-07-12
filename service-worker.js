const CACHE_NAME = "mostreaki-cache-v3"; // Atualize o número sempre que mudar os arquivos

const FILES_TO_CACHE = [
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
];

// Instala e armazena os arquivos no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // força a ativação imediata
});

// Remove caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // força o controle de todos os clients abertos
});

// Busca: tenta cache, se não tiver, pega da rede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
