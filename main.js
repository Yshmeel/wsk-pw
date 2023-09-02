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
       switch(res) {
           case 'granted':
               const r = new Notification("asfasfas", {
                   body: "Я люблю, ненавижу"
               });
               break;
       }
    }).catch((e) => {
        console.error(e);
    });
}, 1000);

document.addEventListener('DOMContentLoaded', () => {
    const productsList = document.querySelector('.products-list');

    (async function() {
        await fetch("https://dummyjson.com/products").then((r) => r.json()).then((res) => {
            res.products.forEach((p) => {
                const product = document.createElement('div');
                product.innerHTML = p.title;
                productsList.appendChild(product);
            });
        });
    }());
});