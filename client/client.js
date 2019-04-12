const publicVapidKey = 'BJZCQ4eUDBQxlvgsXvos7HRMp7j-SDqPgJ53IosUyEceihFFfmEEFcN4bWaWv8ybMOlRi4eM65SR0GYBNpoy4vk';

// Check for service worker
if('servericeWorker' in navigator){
    send().catch(err => console.error(err));
}

// Register SW, Register Push, Send Push
async function send(){
    // Register Service Worker
    console.log('Registering service worker...');
    const register = await navigator.serviceWorker.register('/worker.js',{
        scope: '/'
    });
    console.log('Service Worker Registered...');

    // Register Push
    console.log('Register Push...');
    const notification = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUintArray(publicVapidKey)
    });
    console.log('Push Registered...');

    // Send Push Notification
    console.log('Sending Push...')
    await fetch('/notification', {
        method: 'POST',
        body: JSON.stringify(notification),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push Sent...');
}
