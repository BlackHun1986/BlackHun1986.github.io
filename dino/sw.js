const CACHE = "dino-explore-v2";
const ASSETS = [
  "./", "./index.html", "./styles.css", "./app.js", "./data.js", "./art.js", "./scenes.js", "./manifest.json",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png",
  "./fonts/Jua.woff", "./fonts/GothicA1-Regular.woff", "./fonts/GothicA1-Bold.woff",
  "./assets/dinos/coelophysis.webp",
  "./assets/dinos/plateosaurus.webp",
  "./assets/dinos/eoraptor.webp",
  "./assets/dinos/herrerasaurus.webp",
  "./assets/dinos/riojasaurus.webp",
  "./assets/dinos/eodromaeus.webp",
  "./assets/dinos/thecodontosaurus.webp",
  "./assets/dinos/saturnalia.webp",
  "./assets/dinos/staurikosaurus.webp",
  "./assets/dinos/eudimorphodon.webp",
  "./assets/dinos/brachiosaurus.webp",
  "./assets/dinos/stegosaurus.webp",
  "./assets/dinos/allosaurus.webp",
  "./assets/dinos/diplodocus.webp",
  "./assets/dinos/dilophosaurus.webp",
  "./assets/dinos/archaeopteryx.webp",
  "./assets/dinos/compsognathus.webp",
  "./assets/dinos/ceratosaurus.webp",
  "./assets/dinos/kentrosaurus.webp",
  "./assets/dinos/rhamphorhynchus.webp",
  "./assets/dinos/tyrannosaurus.webp",
  "./assets/dinos/triceratops.webp",
  "./assets/dinos/velociraptor.webp",
  "./assets/dinos/spinosaurus.webp",
  "./assets/dinos/ankylosaurus.webp",
  "./assets/dinos/pachycephalosaurus.webp",
  "./assets/dinos/iguanodon.webp",
  "./assets/dinos/parasaurolophus.webp",
  "./assets/dinos/pteranodon.webp",
  "./assets/dinos/koreaceratops.webp"
];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k.startsWith("dino-")).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const net = fetch(event.request).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(event.request, copy)); }
        return res;
      }).catch(() => cached || caches.match("./index.html"));
      return cached || net;
    })
  );
});
