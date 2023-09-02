if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => {
            console.log('Service worker has been registered');
        }).catch(() => {
            console.error('Something went wrong when attempting to register service worker');
        });
}

setTimeout(() => {
    Notification.requestPermission().then((res) => {
        console.log(res);
       switch(res) {
           case 'granted':
               const r = new Notification("asfasfas", {
                   body: "Я люблю, ненавижу"
               });
               console.log(r);
               break;
       }
    }).catch((e) => {
        console.error(e);
    });
}, 1000);
