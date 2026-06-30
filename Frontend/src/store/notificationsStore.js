import { create } from 'zustand';

/**
 * Zustand Store for Global Notification Toast Management.
 * Replaces Context API for non-persistent UI alerts.
 */
export const useNotificationsStore = create((set) => ({
    notifications: [],
    
    // Add toast to the queue and auto-clear after duration
    addNotification: (message, type = 'success', duration = 4000) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
            notifications: [...state.notifications, { id, message, type }]
        }));

        setTimeout(() => {
            set((state) => ({
                notifications: state.notifications.filter((n) => n.id !== id)
            }));
        }, duration);
    },
    
    // Manually dismiss toast
    removeNotification: (id) => {
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id)
        }));
    }
}));
