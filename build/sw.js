importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
);

if (workbox) {
  console.log(`Workbox is loaded!`);

  workbox.precaching.precacheAndRoute([{"revision":"ce32e52f89d3b9267b7d03d7315274df","url":"css/style.css"},{"revision":"789cef5e9849ddd506ade5b27839b119","url":"index.html"},{"revision":"66a72dbc806889969201bfe3b4a400f2","url":"images/service.jpeg"},{"revision":"a6794ac9c576899e8db722090a97f926","url":"images/icons/icon-128x123.png"},{"revision":"49bf55b16e0076146473bc36f12351e7","url":"images/icons/icon-128x128.png"},{"revision":"ab1cca545621c67ad815460d821e6a45","url":"images/icons/icon-144x138.png"},{"revision":"b4b742191a4436166136ace686bd07ea","url":"images/icons/icon-144x144.png"},{"revision":"839b747f892f2bfc041b86d2bd25e784","url":"images/icons/icon-152x146.png"},{"revision":"16b3f0299ae65f92c8f261118d8fe474","url":"images/icons/icon-152x152.png"},{"revision":"97aa2eb87903f825f52cd0978857ef2b","url":"images/icons/icon-192x185.png"},{"revision":"923b3440368ee144d9f6b530bd304896","url":"images/icons/icon-192x192.png"},{"revision":"2c38be8b26b97ad881d587a80a58f3ac","url":"images/icons/icon-256x247.png"},{"revision":"e8cadf3a8fd977b84b6005aab525d37c","url":"images/icons/icon-256x256.png"},{"revision":"039fe7f3404142a953c273531e229755","url":"images/icons/icon-32x32.png"},{"revision":"1ae0e65c69fef186e97326e816e9b398","url":"images/icons/icon-512x494.png"},{"revision":"b5bd5e93bb616279f3877b81187644c5","url":"images/icons/icon-512x512.png"},{"revision":"b4645490170051c8e01084f4d4e61b5c","url":"manifest.json"},{"revision":"9f042b6755ee72dc877386fd746084d1","url":"html/offline.html"}]);

  workbox.routing.registerRoute(
    /.(?:png|gif|jpg|jpeg)/,
    workbox.strategies.cacheFirst({
      cacheName: "images-cache",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  );

  const articleHandler = workbox.strategies.networkFirst({
    cacheName: "articles-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50
      })
    ]
  });

  workbox.routing.registerRoute(/.html/, args => {
    return articleHandler.handle(args).then(response => {
      if (!response) {
        return caches.match("html/offline.html");
      }
      return response;
    });
  });
} else {
  console.log(`Workbox didn't load!`);
}
