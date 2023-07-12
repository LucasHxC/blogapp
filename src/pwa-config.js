workbox.routing.registerRoute(
    new RegExp('^https://api.example.com/'),
    new workbox.strategies.NetworkFirst()
  );
  