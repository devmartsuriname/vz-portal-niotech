import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '@/integrations/supabase/hooks/useNotifications';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notification: any) => {
    if (!notification.is_read) {
      markAsRead.mutate(notification.id);
    }
    setIsOpen(false);
  };

  const handleMarkAllRead = () => {
    markAllAsRead.mutate();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'bx bx-check-circle text-success';
      case 'warning':
        return 'bx bx-error text-warning';
      case 'error':
        return 'bx bx-x-circle text-danger';
      default:
        return 'bx bx-info-circle text-info';
    }
  };

  return (
    <div className="topbar-item">
      <div className="dropdown" ref={dropdownRef}>
        <button
          className="topbar-button position-relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <i className="bx bx-bell fs-24"></i>
          {unreadCount > 0 && (
            <span className="position-absolute topbar-badge badge rounded-pill bg-danger">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated notification-dropdown show">
            <div className="dropdown-header d-flex justify-content-between align-items-center">
              <h6 className="mb-0">
                Notificaties
                {unreadCount > 0 && (
                  <span className="badge bg-primary ms-2">{unreadCount} nieuw</span>
                )}
              </h6>
              {unreadCount > 0 && (
                <button
                  className="btn btn-link btn-sm text-decoration-none p-0"
                  onClick={handleMarkAllRead}
                >
                  Alles markeren als gelezen
                </button>
              )}
            </div>

            <div className="dropdown-divider"></div>

            <div className="notification-list">
              {notifications && notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Link
                    key={notification.id}
                    to={notification.link || '#'}
                    className={`dropdown-item py-3 ${!notification.is_read ? 'bg-light' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <i className={`${getNotificationIcon(notification.type)} fs-4`}></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 fw-semibold">
                          {notification.title}
                          {!notification.is_read && (
                            <span className="badge bg-primary ms-2" style={{ fontSize: '0.65rem' }}>
                              Nieuw
                            </span>
                          )}
                        </h6>
                        <p className="mb-1 text-muted small">{notification.message}</p>
                        <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>
                          {new Date(notification.created_at).toLocaleString('nl-NL', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-4 text-muted">
                  <i className="bx bx-bell-off fs-2 d-block mb-2"></i>
                  <p className="mb-0">Geen notificaties</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
