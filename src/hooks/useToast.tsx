import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────
   Toast — KneeSight DS
   4 types: success | warning | error | info
───────────────────────────────────────────── */

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (opts: { title: string; description?: string; type?: ToastType; duration?: number }) => void;
  success: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  error:   (title: string, description?: string) => void;
  info:    (title: string, description?: string) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const toastConfig: Record<ToastType, {
  icon: React.FC<{ className?: string }>;
  wrapper: string;
  iconClass: string;
}> = {
  success: {
    icon: CheckCircle2,
    wrapper: 'bg-navy-800 border-emerald-500/30 text-white dark:bg-navy-900',
    iconClass: 'text-emerald-400',
  },
  warning: {
    icon: AlertTriangle,
    wrapper: 'bg-navy-800 border-amber-500/30 text-white dark:bg-navy-900',
    iconClass: 'text-amber-400',
  },
  error: {
    icon: XCircle,
    wrapper: 'bg-navy-800 border-coral-500/30 text-white dark:bg-navy-900',
    iconClass: 'text-coral-400',
  },
  info: {
    icon: Info,
    wrapper: 'bg-navy-800 border-teal-500/30 text-white dark:bg-navy-900',
    iconClass: 'text-teal-400',
  },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, type = 'info', duration = 4500 }: {
      title: string; description?: string; type?: ToastType; duration?: number;
    }) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      setToasts((prev) => [...prev.slice(-4), { id, title, description, type, duration }]);
      if (duration > 0) setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  const success = useCallback((t: string, d?: string) => toast({ title: t, description: d, type: 'success' }), [toast]);
  const warning = useCallback((t: string, d?: string) => toast({ title: t, description: d, type: 'warning' }), [toast]);
  const error   = useCallback((t: string, d?: string) => toast({ title: t, description: d, type: 'error'   }), [toast]);
  const info    = useCallback((t: string, d?: string) => toast({ title: t, description: d, type: 'info'    }), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, warning, error, info, dismiss }}>
      {children}

      {/* Toast Container */}
      <div
        aria-live="polite"
        aria-label="Notifications"
        className="fixed bottom-5 right-5 z-[400] flex flex-col gap-2 w-full max-w-[340px] pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const config = toastConfig[t.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={t.id}
                role="alert"
                aria-atomic="true"
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: [0.2, 0.8, 0.2, 1] } }}
                exit={{ opacity: 0, y: 4, scale: 0.96, transition: { duration: 0.16, ease: [0.2, 0.8, 0.2, 1] } }}
                className={cn(
                  'pointer-events-auto flex items-start gap-3',
                  'rounded-card border px-4 py-3.5 shadow-ds-e3',
                  config.wrapper
                )}
              >
                <Icon className={cn('w-4 h-4 mt-0.5 shrink-0', config.iconClass)} aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-ds-small font-semibold leading-snug">{t.title}</p>
                  {t.description && (
                    <p className="text-ds-caption mt-0.5 opacity-70 leading-relaxed">{t.description}</p>
                  )}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="shrink-0 text-white/50 hover:text-white/80 transition-colors p-0.5 rounded"
                  aria-label="Dismiss notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
