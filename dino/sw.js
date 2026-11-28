const CACHE = "dino-explore-v3";
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
  "./assets/dinos/koreaceratops.webp",
  "./assets/bg/triassic.webp",
  "./assets/bg/jurassic.webp",
  "./assets/bg/cretaceous.webp"
];

function isShell(request, url) {
  if (request.mode === "navigate") return true;
  const dest = request.destination;
  if (dest === "document" || dest === "script" || dest === "style") return true;
  const p = url.pathname;
  return /\.(html|js|css)$/.test(p) || /\/dino\/?$/.test(p);
}

self.addEventListener("install", (event) => {
  // 미리 담기는 이미지가 많아도 새 버전 적용을 기다리지 않게, 바로 활성화합니다.
  event.waitUntil(self.skipWaiting());
  caches.open(CACHE).then((cache) => Promise.all(ASSETS.map(async (u) => {
    try {
      const res = await fetch(new URL(u, self.registration.scope), { cache: "no-store" });
      if (res.ok) await cache.put(u, res);
    } catch (e) { }
  }))).catch(() => { });
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const old = keys.filter((k) => k !== CACHE && k.startsWith("dino-"));
    await Promise.all(old.map((k) => caches.delete(k)));
    await self.clients.claim();
    // 예전 캐시에서 들어온 탭은 구 버전이 그대로 보일 수 있어, 한 번 다시 열어 새 파일을 받게 해요.
    if (old.length && !self.__upgradedNav) {
      self.__upgradedNav = true;
      const clients = await self.clients.matchAll({ type: "window" });
      await Promise.all(clients.map((c) => c.navigate(c.url)));
    }
  })());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (isShell(event.request, url)) {
    event.respondWith((async () => {
      try {
        const res = await fetch(event.request, { cache: "no-store" });
        if (res.ok) {
          const copy = res.clone();
          const cache = await caches.open(CACHE);
          await cache.put(event.request, copy);
        }
        return res;
      } catch (e) {
        return (await caches.match(event.request)) || (await caches.match("./index.html"));
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) {
      event.waitUntil(
        fetch(event.request).then((res) => {
          if (res.ok) return caches.open(CACHE).then((c) => c.put(event.request, res));
        }).catch(() => { })
      );
      return cached;
    }
    try {
      const res = await fetch(event.request);
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(event.request, copy));
      }
      return res;
    } catch (e) {
      return cached;
    }
  })());
});
