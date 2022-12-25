const CACHE = "JS"
const staticAssets = [
    './',
    "./index.html",
    './style.css',
    "./dest/",
    './dest/app.js',
    './dest/camera.js',
    './dest/entity.js',
    './dest/indexBuffer.js',
    './dest/scene.js',
    './dest/transform.js',
    './dest/vertexBuffer.js',
    './dest/math/',
    './dest/math/mat4.js',
    './dest/math/vec3.js',
    './dest/renderer/',
    './dest/renderer/index.js',
    './dest/renderer/indexBuffer.js',
    './dest/renderer/mesh.js',
    './dest/renderer/shader.js',
    './dest/renderer/vertexArray.js',
    './dest/renderer/vertexBuffer.js',

    './images/',
    './images/favicon.co',
];
// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(staticAssets)).catch(console.log));
});

self.addEventListener("fetch", fetchCB);

function save(req, resp) {
    return caches.open(CACHE)
        .then(cache => {
            cache.put(req, resp.clone());
            return resp;
        })
        .catch(console.log)
}

function fetchCB(e) { //fetch first
    let req = e.request
    e.respondWith(
        fetch(req).then(r2 => save(req, r2))
            .catch(() => { return caches.match(req).then(r1 => r1) })
    )
}
