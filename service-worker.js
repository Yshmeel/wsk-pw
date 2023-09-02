const VERSION = '1.0';
const CACHE_NAME = `es-${VERSION}`;

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.delete(CACHE_NAME)
    );
});

self.addEventListener('install', function(event) {
    console.log('[Service worker] Successfully installed');
});

self.addEventListener('fetch', (event) => {
    console.log(event);
    console.log(fromNetwork(event, 5000).catch(() => fromCache(event)));
    event.respondWith(fromNetwork(event, 5000).catch(() => fromCache(event)));
    event.waitUntil(update(event));
});

// service workers utils: fetching and caching

/**
 * @param evt
 * @param timeout
 * @returns {Promise<Response>}
 */
const fromNetwork = (evt, timeout) => {
    return new Promise(async (resolve, reject) => {
        const timeoutID = setTimeout(reject, timeout);
        fetch(evt.request.url).then((response) => {
            clearTimeout(timeoutID);
            resolve(response);
        }).catch(reject);
    });
};

const fromCache = (evt) => {
    return caches.open(CACHE_NAME).then(cache => {
        return cache.match(evt.request).then((m) => m);
    });
};

const update = (evt) => {
    console.log("update", evt)
    return caches.open(CACHE_NAME).then((cache) => {
        // ignore chrome-extension
        if(evt.request.url.startsWith('chrome-extension')) {
            return;
        }

        return fetch(evt.request.url).then((a) => cache.put(evt.request, a));
    });
};

