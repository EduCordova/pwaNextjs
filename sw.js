const CACHE_NAME = "simple-cache-v1";
const urlsToCache = [
    "/",
    "/about",
    "https://fonts.googleapis.com/css?family=Roboto:300,400,500",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    'https://rest-mbcode.herokuapp.com/api/mypost'
];

self.addEventListener('install', e => {
    console.log('Evento: SW Instalado')
    e.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Archivos en cache')
          return cache.addAll(urlsToCache)
          .then( () => self.skipWaiting() )
          //skipWaiting forza al SW a activarse
        })
        .catch(err => console.log('Falló registro de cache', err) )
    )
  })


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
    const response = caches.match(event.request)
        .then(match => match || fetch(event.request));
    event.respondWith(response);

});

// self.addEventListener('fetch', e => {
//     console.log('Evento: SW Recuperando')
  
//     e.respondWith(
//       //Miramos si la petición coincide con algún elemento del cache
//       caches.match(e.request)
//       .then(res => {
//           console.log('Recuperando cache')
//           if ( res ) {
//             //Si coincide lo retornamos del cache
//             return res
//           }
//           //Sino, lo solicitamos a la red
//           return fetch(e.request)
//         })
//       )
//   })