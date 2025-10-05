// lib/register-push-handlers.ts
export async function registerPushHandlers() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.ready;

            // The service worker is already registered by next-pwa
            // We just need to ensure push notifications are set up
            console.log('Service Worker is ready for push notifications');

            return registration;
        } catch (error) {
            console.error('Error registering push handlers:', error);
        }
    }
}