import React from 'react';
import { useNotificationsStore } from '../../store/notificationsStore';

/**
 * Global Notifications Toast Overlay.
 * Renders active alerts from the Zustand store with sliding animations.
 */
const NotificationToast = () => {
    const { notifications, removeNotification } = useNotificationsStore();

    if (notifications.length === 0) return null;

    return (
        <div 
            className="fixed bottom-8 right-8 flex flex-col gap-3 z-50 max-w-sm w-full"
            role="alert"
            aria-live="assertive"
        >
            {notifications.map((n) => (
                <div 
                    key={n.id} 
                    className={`flex items-center justify-between p-4 rounded-xl shadow-xl border bg-slate-900/95 backdrop-blur-md transition-all duration-300 ${
                        n.type === 'success' 
                            ? 'border-emerald-500/30 text-emerald-400' 
                            : n.type === 'error' 
                            ? 'border-rose-500/30 text-rose-400' 
                            : 'border-amber-500/30 text-amber-400'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-lg" aria-hidden="true">
                            {n.type === 'success' && '✓'}
                            {n.type === 'error' && '✗'}
                            {n.type === 'warning' && '⚠'}
                        </span>
                        <span className="text-sm font-medium text-slate-100">{n.message}</span>
                    </div>
                    <button 
                        onClick={() => removeNotification(n.id)}
                        className="text-slate-400 hover:text-white transition-colors cursor-pointer text-lg pl-4 focus:outline-none"
                        aria-label="Dismiss alert"
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
};

export default NotificationToast;
