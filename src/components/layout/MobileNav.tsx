import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Activity,
  LayoutDashboard,
  ScanLine,
  Layers,
  Wrench,
  Users,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { HelpModal } from './HelpModal';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainNavItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Image Analysis', href: '/imaging', icon: ScanLine },
  { name: 'Meniscus & OA', href: '/meniscus', icon: Layers },
  { name: 'Implant Planning', href: '/implant-planning', icon: Wrench },
  { name: 'Patients', href: '/patients', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileText },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [helpOpen, setHelpOpen] = useState(false);

  const handleLogout = () => {
    onClose();
    logout();
    navigate('/login');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex lg:hidden" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative w-72 max-w-[80vw] h-full bg-ds-surface border-r border-ds shadow-ds-e3 flex flex-col z-10"
            >
              {/* Header */}
              <div className="h-[72px] flex items-center justify-between px-5 border-b border-ds shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-input bg-teal-500 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-display text-[1.1rem] font-bold text-ds-1">KneeSight</span>
                    <span className="font-display text-[1.1rem] font-bold text-teal-500">AI</span>
                  </div>
                </div>

                <button
                  id="mobile-nav-close-btn"
                  onClick={onClose}
                  className="p-1.5 rounded-btn text-ds-3 hover:text-ds-1 hover:bg-ds-surface-2 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation List */}
              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Mobile navigation">
                <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-ds-4">
                  Clinical Modules
                </div>

                {mainNavItems.map((item) => {
                  const isActive =
                    location.pathname === item.href ||
                    location.pathname.startsWith(item.href + '/');
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      onClick={onClose}
                      id={`mobile-nav-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className={cn(
                        'flex items-center gap-3 rounded-btn px-3 py-2.5 text-ds-small transition-colors',
                        isActive
                          ? 'bg-teal-500/10 dark:bg-teal-500/15 text-teal-950 dark:text-teal-100 font-semibold'
                          : 'text-ds-3 font-medium hover:bg-ds-surface-2 hover:text-ds-1'
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-4 h-4 shrink-0',
                          isActive ? 'text-teal-600 dark:text-teal-400' : 'text-ds-4'
                        )}
                      />
                      <span className="truncate">{item.name}</span>
                    </NavLink>
                  );
                })}

                <div className="pt-3 pb-1">
                  <div className="h-px bg-ds w-full" />
                </div>

                <div className="px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-widest text-ds-4">
                  System & Support
                </div>

                {/* Settings */}
                <NavLink
                  to="/settings"
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-btn px-3 py-2 text-ds-small transition-colors',
                    location.pathname === '/settings'
                      ? 'bg-teal-500/10 dark:bg-teal-500/15 text-teal-950 dark:text-teal-100 font-semibold'
                      : 'text-ds-3 font-medium hover:bg-ds-surface-2 hover:text-ds-1'
                  )}
                >
                  <Settings className="w-4 h-4 text-ds-4" />
                  <span>Settings</span>
                </NavLink>

                {/* Help */}
                <button
                  onClick={() => {
                    onClose();
                    setHelpOpen(true);
                  }}
                  className="w-full flex items-center gap-3 rounded-btn px-3 py-2 text-ds-small text-ds-3 font-medium hover:bg-ds-surface-2 hover:text-ds-1 text-left transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-ds-4" />
                  <span>Help & Documentation</span>
                </button>
              </nav>

              {/* Bottom user profile & sign out */}
              {user && (
                <div className="p-3 border-t border-ds bg-ds-surface-2">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
                        {user.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-ds-small font-semibold text-ds-1 truncate">{user.name}</p>
                        <p className="text-[10px] text-ds-4 truncate">{user.role}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-btn text-ds-small text-coral-600 dark:text-coral-400 bg-coral-500/10 hover:bg-coral-500/20 font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
