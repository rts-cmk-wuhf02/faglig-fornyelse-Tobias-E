importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
);

if (workbox) {
  console.log(`Workbox is loaded!`);

  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

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
