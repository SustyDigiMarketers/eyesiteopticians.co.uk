import React, { useEffect } from 'react';
import { XIcon } from './icons';

export interface NotificationType {
    message: string;
    type: 'success' | 'error' | 'warning';
}

interface NotificationProps {
    notification: NotificationType;
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ notification, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [notification, onClose]);

    const getBgColor = (type: NotificationType['type']) => {
        switch (type) {
            case 'success': return 'bg-green-600';
            case 'error': return 'bg-red-600';
            case 'warning': return 'bg-yellow-500';
            default: return 'bg-blue-600';
        }
    };

    return (
        <div className={`fixed bottom-4 right-4 z-[60] px-6 py-4 rounded-lg shadow-xl text-white flex items-center space-x-4 transition-all duration-300 transform translate-y-0 animate-slide-up ${getBgColor(notification.type)}`}>
            <span className="font-medium">{notification.message}</span>
            <button 
                onClick={onClose} 
                className="bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors focus:outline-none"
            >
                <XIcon className="w-4 h-4" />
            </button>
            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up {
                    animation: slideUp 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Notification;