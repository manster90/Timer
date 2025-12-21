let alarmTimeoutId = null;

// Dengar mesej dari aplikasi utama
self.addEventListener('message', event => {
    const { type, duration } = event.data;

    if (type === 'START_TIMER') {
        // Hantar notifikasi segera untuk maklumkan timer telah dimulakan (opsional)
        self.registration.showNotification('Timer Telah Dimulakan', {
            body: 'Notifikasi akan dipaparkan apabila masa tamat.',
            icon: 'data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text y=\'.9em\' font-size=\'90\'>⏰</text></svg>',
            tag: 'timer-notification'
        });

        // Tetapkan penggera
        alarmTimeoutId = setTimeout(() => {
            self.registration.showNotification('Masa Tamat!', {
                body: 'Timer yang anda tetapkan telah tamat.',
                icon: 'data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text y=\'.9em\' font-size=\'90\'>⏰</text></svg>',
                tag: 'timer-notification',
                requireInteraction: true // Notifikasi tidak akan hilang sendiri
            });
        }, duration);
    }

    if (type === 'STOP_TIMER') {
        clearTimeout(alarmTimeoutId);
        // Hapuskan notifikasi sedia ada
        self.registration.getNotifications().then(notifications => {
            notifications.forEach(notification => notification.close());
        });
    }
});
