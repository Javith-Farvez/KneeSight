import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ScanLine,
  X,
  Info,
  CheckCheck,
  Filter,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface ClinicalNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'warning' | 'info' | 'success' | 'urgent';
  read: boolean;
  link: string;
  caseId?: string;
}

export const INITIAL_NOTIFICATIONS: ClinicalNotification[] = [
  {
    id: 'notif-1',
    title: 'KL Grade 4 Detected',
    description: 'Patient Arthur Pendelton (KS-0243) shows severe joint space loss on right knee AP view.',
    time: '5m ago',
    type: 'warning',
    read: false,
    link: '/patients/KS-0243',
    caseId: 'KS-0243',
  },
  {
    id: 'notif-2',
    title: 'Analysis completed',
    description: 'Automated deep segmentation finished for Eleanor Vance (KS-0241). Meniscus 4.76mm average.',
    time: '12m ago',
    type: 'success',
    read: false,
    link: '/meniscus',
    caseId: 'KS-0241',
  },
  {
    id: 'notif-3',
    title: 'Image quality requires review',
    description: 'Lateral projection radiograph SNR is borderline (0.78). Attending specialist audit recommended.',
    time: '28m ago',
    type: 'warning',
    read: false,
    link: '/imaging',
    caseId: 'KS-0245',
  },
  {
    id: 'notif-4',
    title: 'Implant database updated',
    description: 'Persona PS Size 3–7 sizing matrices synchronized with manufacturer geometry registry.',
    time: '1h ago',
    type: 'info',
    read: true,
    link: '/implant-planning',
  },
  {
    id: 'notif-5',
    title: 'Report ready for download',
    description: 'Pre-operative templating clinical handoff document generated for Eleanor Vance.',
    time: '2h ago',
    type: 'success',
    read: true,
    link: '/reports?id=KS-0241',
    caseId: 'KS-0241',
  },
];

export function NotificationsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<ClinicalNotification[]>(INITIAL_NOTIFICATIONS);
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'warning' | 'success' | 'info'>('all');
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const filteredNotifs = notifications.filter((n) => {
    if (filterType === 'unread') return !n.read;
    if (filterType === 'warning') return n.type === 'warning' || n.type === 'urgent';
    if (filterType === 'success') return n.type === 'success';
    if (filterType === 'info') return n.type === 'info';
    return true;
  });

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger button */}
      <button
        id="notifications-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-btn text-ds-3 hover:text-ds-1 hover:bg-ds-surface-2 focus:outline-none transition-colors"
        aria-label="Clinical Notifications"
        title="Clinical Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-coral-500 text-[10px] font-bold text-white shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-panel bg-ds-surface border border-ds shadow-ds-e3 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="p-3.5 border-b border-ds bg-ds-surface-2/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display text-ds-small font-bold text-ds-1">
                Notification Center
              </span>
              {unreadCount > 0 && (
                <Badge variant="coral" size="sm">
                  {unreadCount} Unread
                </Badge>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="px-3 py-2 border-b border-ds bg-ds-surface-2/30 flex items-center gap-1 text-[11px] overflow-x-auto">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: `Unread (${unreadCount})` },
              { key: 'warning', label: 'Warnings' },
              { key: 'success', label: 'Success' },
              { key: 'info', label: 'Info' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterType(f.key as any)}
                className={`px-2 py-0.5 rounded font-medium whitespace-nowrap transition-colors ${
                  filterType === f.key
                    ? 'bg-teal-500 text-white font-bold'
                    : 'text-ds-4 hover:text-ds-2'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-ds">
            {filteredNotifs.length === 0 ? (
              <div className="py-8 text-center text-ds-4 text-xs">
                No notifications in this category.
              </div>
            ) : (
              filteredNotifs.map((n) => {
                const isWarning = n.type === 'warning' || n.type === 'urgent';
                const isSuccess = n.type === 'success';

                return (
                  <div
                    key={n.id}
                    onClick={() => {
                      markAsRead(n.id);
                      navigate(n.link);
                      setIsOpen(false);
                    }}
                    className={`p-3.5 flex items-start gap-3 hover:bg-ds-surface-2 transition-colors cursor-pointer text-xs ${
                      !n.read ? 'bg-teal-500/5' : ''
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isWarning
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : isSuccess
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                      }`}
                    >
                      {isWarning ? (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      ) : isSuccess ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Info className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`font-semibold truncate ${!n.read ? 'text-ds-1 font-bold' : 'text-ds-2'}`}>
                          {n.title}
                        </span>
                        <span className="text-[10px] text-ds-4 font-mono shrink-0">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-ds-3 text-[11px] line-clamp-2 leading-relaxed">
                        {n.description}
                      </p>
                    </div>

                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 border-t border-ds bg-ds-surface-2/40 text-center">
            <button
              onClick={() => {
                navigate('/settings');
                setIsOpen(false);
              }}
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
            >
              Configure Notification Preferences →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
