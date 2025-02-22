self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    if (event.action === "open") {
        clients.openWindow(event.notification.data.url);
    } else if (event.notification.data && event.notification.data.url) {
        clients.openWindow(event.notification.data.url);
    }
});
