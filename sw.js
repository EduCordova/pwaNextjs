const CACHE_NAME = "simple-cache-v1";
const urlsToCache = [
    "/",
    "/about",
  

];

self.addEventListener("install", event => {
    const preLoaded = caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    event.waitUntil(preLoaded);
    console.log("PWA INTALADA")
});


self.addEventListener("activate",e =>{
    console.log('Evento:SW Activado')
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cacheName =>{
                    if(cacheWhitelist.indexOf(cacheName)===-1){
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        .then(()=>{
            console.log('El cache esta limpio y actualizado')
            return self.clients.claim()
        })
        
    )
})


self.addEventListener("fetch", event => {
    console.log('[ServiceWorker] Fetch', event.request.url)
    const response = caches.match(event.request)
        .then(match => match || fetch(event.request));
    event.respondWith(response);

});