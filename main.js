if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => {
            console.log('Service worker has been registered');
        }).catch(() => {
            console.error('Something went wrong when attempting to register service worker');
        });
}

if(Notification.permission === "default") {
    setTimeout(() => {
        Notification.requestPermission().then(() => {
           new Notification("asfasfas");
        }).catch((e) => {
            console.error(e);
        });
    }, 1000);
}
