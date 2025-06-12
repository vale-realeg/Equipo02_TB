const CACHE_NAME = "juego-ritmico-stardust-knights";

self.addEventListener('install', event => {
    event.waitUntil((async() => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll([
            './',
            './index.html',
            './game.html',
            './game2.html',
            './game3.html',
            './js/menu.js',
            './js/game.js',
            './js/beats.js',
            './js/beats2.js',
            './js/beats3.js',
            './css/style.css'
        ]);
    })()
    )
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
            (new Promise(
                (resolve, reject) => {
                fetch(event.request).then(resolve).catch(reject);
                }
            )
        ).catch( () => {} )
    )
});