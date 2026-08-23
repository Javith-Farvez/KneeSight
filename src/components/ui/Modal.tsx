import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from './Button';

/* ─────────────────────────────────────────────
   Modal — KneeSight DS
   220ms ease-ds transition
───────────────────────────────────────────── */

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOverlayClick?: boolean;
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit:   { opacity: 0, transition: { duration: 0.16 } },
};

const panelVariants = {
  hidden:  { opacity: 0, scale: 0.97, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.22, ease: [0.2, 0.8, 0.2, 1] } },
  exit:    { opacity: 0, scale: 0.97, y: 4, transition: { duration: 0.16, ease: [0.2, 0.8, 0.2, 1] } },
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
  closeOnOverlayClick = true,
}: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden" animate="visible" exit="exit"
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-[2px]"
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden" animate="visible" exit="exit"
            className={cn(
              'relative w-full rounded-panel bg-ds-surface border border-ds shadow-ds-e3 overflow-hidden',
              sizeMap[size]
            )}
          >
            {/* Header */}
            {(title || description) && (
              <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-ds">
                <div className="min-w-0">
                  {title && (
                    <h2 id="modal-title" className="text-ds-h6 font-semibold text-ds-1">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-ds-small text-ds-3 mt-1">{description}</p>
                  )}
                </div>
                <IconButton
                  id="modal-close-btn"
                  icon={<X className="w-4 h-4" />}
                  label="Close modal"
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  className="shrink-0 -mr-1 -mt-1"
                />
              </div>
            )}

            {/* Body */}
            <div className="px-6 py-5 overflow-y-auto max-h-[65vh]">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-ds bg-ds-surface-2">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   Drawer — KneeSight DS
   240ms panel transition
───────────────────────────────────────────── */

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  side?: 'left' | 'right';
  width?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const drawerVariants = {
  left: {
    hidden:  { x: '-100%' },
    visible: { x: 0, transition: { duration: 0.24, ease: [0.2, 0.8, 0.2, 1] } },
    exit:    { x: '-100%', transition: { duration: 0.20, ease: [0.2, 0.8, 0.2, 1] } },
  },
  right: {
    hidden:  { x: '100%' },
    visible: { x: 0, transition: { duration: 0.24, ease: [0.2, 0.8, 0.2, 1] } },
    exit:    { x: '100%', transition: { duration: 0.20, ease: [0.2, 0.8, 0.2, 1] } },
  },
};

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  side = 'right',
  width = 'w-80',
  children,
  footer,
}: DrawerProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex" role="dialog" aria-modal="true">
          <motion.div
            variants={overlayVariants}
            initial="hidden" animate="visible" exit="exit"
            className="absolute inset-0 bg-navy-950/50 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            variants={drawerVariants[side]}
            initial="hidden" animate="visible" exit="exit"
            className={cn(
              'absolute top-0 bottom-0 bg-ds-surface border-ds shadow-ds-e3 flex flex-col',
              side === 'left' ? 'left-0 border-r' : 'right-0 border-l',
              width
            )}
          >
            {(title || description) && (
              <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-ds shrink-0">
                <div className="min-w-0">
                  {title && <h2 className="text-ds-h6 font-semibold text-ds-1">{title}</h2>}
                  {description && <p className="text-ds-caption text-ds-3 mt-0.5">{description}</p>}
                </div>
                <IconButton
                  icon={<X className="w-4 h-4" />}
                  label="Close"
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                />
              </div>
            )}
            <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
            {footer && (
              <div className="px-5 py-4 border-t border-ds bg-ds-surface-2 shrink-0">{footer}</div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
