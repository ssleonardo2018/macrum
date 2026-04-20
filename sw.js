const CACHE_NAME = 'macrum-v9';

const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './app.js',
  './js/login.js',
  './js/apiUsuarios.js',
  './js/apiDados.js',
  './manifest.json',
  './assets/img/192.png',
  './assets/img/512.png'
];

// INSTALAR
self.addEventListener('install', event => {
  console.log('SW instalado');

  self.skipWaiting(); // força ativação imediata

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ATIVAR
self.addEventListener('activate', event => {
  console.log('SW ativado');

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim(); // assume controle imediato
});

// FETCH (offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match('./index.html');
      })
  );
});


// Evento push — recebe e exibe a notificação
self.addEventListener('push', event => {
  const dados = event.data?.json() ?? {
    title: 'Nova Notificação',
    body: 'Você tem uma mensagem!',
    icon: '/assets/img/icon-192x192.png'
  };

  event.waitUntil(
    self.registration.showNotification(dados.title, {
      body: dados.body,
      icon: dados.icon,
      badge: '/assets/img/icon-72x72.png'
    })
  );
});

// Evento notificationclick — trata o clique
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
