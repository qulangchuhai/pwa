export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      console.log('3333333', registrations)
      const unregisterPromises = registrations.map((registration) => {
        return registration.unregister().then(() => {
          console.log('Service Worker unregistered:', registration);
        });
      });
      const version = Date.now();
      let scope
      let swRoute
        swRoute = `https://test1-call.surfin.sg/sw.js?version=${version}`
        scope = '/'
      Promise.all(unregisterPromises).then(() => {
        navigator.serviceWorker.register(swRoute , { scope: scope })
          .then((registration) => {
            console.log('55555555', registration)
            registration.update();

            if (registration.waiting) {
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              newWorker?.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                  console.log('New Service Worker installed.');
                  if (navigator.serviceWorker.controller) {
                    console.log('New Service Worker is now controlling the page.');
                  } else {
                    console.log('Waiting for the new Service Worker to control the page.');
                  }
                }
              });
            });
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      });
    });
  } else {
    console.log('Service Worker is not supported in this browser.');
  }
}