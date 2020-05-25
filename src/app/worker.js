console.log("service Worker Loaded...");

self.addEventListener('push',e => {
    const data = e.data.json();
    console.log("Push Received...");

    self.registration.showNotification(data.title,{
        body:'Notification send to Users'
    })
})