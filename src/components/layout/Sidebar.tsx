import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ScanLine,
  Layers,
  Wrench,
  Users,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_NAME } from '@/lib/constants';
import { ProfileMenu } from './ProfileMenu';
import { HelpModal } from './HelpModal';

interface NavItemConfig {
  name: string;
  href: string;
  icon: React.ElementType;
}

const mainNavItems: NavItemConfig[] = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Image Analysis', href: '/imaging', icon: ScanLine },
  { name: 'Meniscus & OA', href: '/meniscus', icon: Layers },
  { name: 'Implant Planning', href: '/implant-planning', icon: Wrench },
  { name: 'Patients', href: '/patients', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileText },
];

export function Sidebar() {
  const location = useLocation();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <aside
        className={cn(
          'hidden lg:flex flex-col h-full shrink-0 w-[240px]',
          'bg-ds-surface border-r border-ds z-30 select-none'
        )}
      >
        {/* Logo (Header height matches 72px for alignment) */}
        <div className="h-[72px] flex items-center px-5 border-b border-ds shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-input bg-teal-500 flex items-center justify-center shadow-sm shadow-teal-500/20">
              <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-[1.15rem] font-bold text-ds-1 tracking-tight leading-none">
                  KneeSight
                </span>
                <span className="font-display text-[1.15rem] font-bold text-teal-500 leading-none">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-ds-4 font-mono uppercase tracking-wider mt-0.5">
                Clinical Decision Support
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav
          className="flex-1 px-3 py-4 space-y-1 overflow-y-auto"
          aria-label="Main navigation"
        >
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
                id={`sidebar-nav-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className={cn(
                  'relative flex items-center gap-3 rounded-btn px-3 py-2.5 text-ds-small transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40',
                  isActive
                    ? 'text-teal-900 dark:text-teal-100 font-semibold'
                    : 'text-ds-3 font-medium hover:text-ds-1'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute inset-0 bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/30 rounded-btn shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <Icon
                  className={cn(
                    'w-4 h-4 shrink-0 transition-colors z-10',
                    isActive ? 'text-teal-600 dark:text-teal-400' : 'text-ds-4'
                  )}
                />
                <span className="truncate z-10">{item.name}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500 z-10" />
                )}
              </NavLink>
            );
          })}

          {/* Divider */}
          <div className="pt-3 pb-1">
            <div className="h-px bg-ds w-full" />
          </div>

          <div className="px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-widest text-ds-4">
            System & Support
          </div>

          {/* Settings */}
          {(() => {
            const isSettingsActive =
              location.pathname === '/settings' ||
              location.pathname.startsWith('/settings/');
            return (
              <NavLink
                to="/settings"
                id="sidebar-nav-settings"
                className={cn(
                  'relative flex items-center gap-3 rounded-btn px-3 py-2 text-ds-small transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40',
                  isSettingsActive
                    ? 'text-teal-900 dark:text-teal-100 font-semibold'
                    : 'text-ds-3 font-medium hover:text-ds-1'
                )}
              >
                {isSettingsActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute inset-0 bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/30 rounded-btn shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <Settings
                  className={cn(
                    'w-4 h-4 shrink-0 transition-colors z-10',
                    isSettingsActive ? 'text-teal-600 dark:text-teal-400' : 'text-ds-4'
                  )}
                />
                <span className="truncate z-10">Settings</span>
                {isSettingsActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500 z-10" />
                )}
              </NavLink>
            );
          })()}

          {/* Help */}
          <button
            id="sidebar-nav-help"
            onClick={() => setHelpOpen(true)}
            className={cn(
              'w-full flex items-center gap-3 rounded-btn px-3 py-2 text-ds-small transition-all duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)] text-left',
              'text-ds-3 font-medium hover:bg-ds-surface-2 hover:text-ds-1',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40'
            )}
          >
            <HelpCircle className="w-4 h-4 shrink-0 text-ds-4" />
            <span className="truncate">Help & Guides</span>
          </button>
        </nav>

        {/* Bottom User Profile */}
        <div className="p-3 border-t border-ds bg-ds-surface shrink-0">
          <ProfileMenu compact={false} />
        </div>
      </aside>

      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
