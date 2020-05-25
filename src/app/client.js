const publicVapidKey = 'BAWZEHAAfI9610zX2CuxXgcO9ZvtBxzdKlAJDcE19rEJ1WjRk1o2NV7DDdp-MLlq1Ueh4dZOBv3gLHeo3-LDOKc';

if('serviceWorker' in navigator){
    send().catch(err => console.error(err));
}

async function send(){
    console.log('Registering Service Worker');

    const register = await navigator.serviceWorker.register('/worker.js',{
        scope:'/'
    })
    console.log('Service Worker Registered');

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)

    });
    

    await fetch('/subscribe',{
        method:'POST',
        body:JSON.stringify(subscription),
        headers:{
            'content-type':'application/json'
        }
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

