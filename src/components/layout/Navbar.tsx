import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Moon, Sun, Search, Menu, ChevronRight } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { IconButton } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NotificationsMenu } from './NotificationsMenu';
import { ProfileMenu } from './ProfileMenu';

interface NavbarProps {
  onMobileMenuOpen: () => void;
}

interface RouteMeta {
  title: string;
  section: string;
  page: string;
}

const routeMetadata: Record<string, RouteMeta> = {
  '/dashboard': {
    title: 'Clinical Overview',
    section: 'Clinical Workflows',
    page: 'Overview',
  },
  '/imaging': {
    title: 'Radiographic Image Analysis',
    section: 'Diagnostics',
    page: 'Image Analysis',
  },
  '/meniscus': {
    title: 'Meniscus & OA MRI Assessment',
    section: 'Diagnostics',
    page: 'Meniscus & OA',
  },
  '/implant-planning': {
    title: 'Pre-operative Implant Planning',
    section: 'Surgical Planning',
    page: 'Implant Planning',
  },
  '/patients': {
    title: 'Patient Directory',
    section: 'Cohort Management',
    page: 'Patients',
  },
  '/analytics': {
    title: 'Cohort Analytics & Performance',
    section: 'Insights',
    page: 'Analytics',
  },
  '/reports': {
    title: 'Clinical Decision Reports',
    section: 'Documentation',
    page: 'Reports',
  },
  '/settings': {
    title: 'Settings & Preferences',
    section: 'System',
    page: 'Settings',
  },
  '/design-system': {
    title: 'Design System Showcase',
    section: 'Developer',
    page: 'Components',
  },
};

export function Navbar({ onMobileMenuOpen }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const meta =
    routeMetadata[location.pathname] || {
      title: 'Clinical Decision Support',
      section: 'KneeSight AI',
      page: 'Workspace',
    };

  return (
    <>
      <header
        className={cn(
          'h-[72px] flex items-center justify-between px-4 sm:px-6 shrink-0',
          'border-b border-ds bg-ds-surface select-none z-20'
        )}
      >
        {/* Left: Breadcrumb & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <IconButton
            id="mobile-menu-btn"
            icon={<Menu className="w-5 h-5" />}
            label="Open navigation menu"
            onClick={onMobileMenuOpen}
            variant="ghost"
            size="sm"
            className="lg:hidden shrink-0"
          />

          <div className="flex flex-col min-w-0">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ds-4 leading-none mb-1">
              <Link to="/dashboard" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                KneeSight
              </Link>
              <ChevronRight className="w-3 h-3 text-ds-4 shrink-0" />
              <span className="text-ds-4 hidden sm:inline">{meta.section}</span>
              <ChevronRight className="w-3 h-3 text-ds-4 hidden sm:inline shrink-0" />
              <span className="text-teal-600 dark:text-teal-400 font-medium truncate">{meta.page}</span>
            </nav>

            {/* Page Title */}
            <h1 className="text-ds-body font-semibold text-ds-1 truncate leading-tight tracking-tight">
              {meta.title}
            </h1>
          </div>
        </div>

        {/* Right: Global search, Theme toggle, Notification button, Profile menu */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Global Search Button */}
          <button
            id="navbar-search-btn"
            onClick={() => setSearchOpen(true)}
            className={cn(
              'flex items-center gap-2.5 px-3 h-9 rounded-input',
              'text-ds-small text-ds-4 bg-ds-surface-2 border border-ds',
              'hover:border-teal-500/50 hover:text-ds-2 transition-all duration-[180ms]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40'
            )}
            aria-label="Search records and tools"
          >
            <Search className="w-4 h-4 text-ds-4" />
            <span className="hidden sm:inline text-ds-3">Search records, scans…</span>
            <kbd className="hidden md:inline-flex items-center text-[10px] px-1.5 py-0.5 rounded bg-ds-surface border border-ds font-mono font-semibold text-ds-3">
              ⌘K
            </kbd>
          </button>

          {/* Theme toggle */}
          <IconButton
            id="theme-toggle-btn"
            icon={
              theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-ds-3" />
              )
            }
            label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
            variant="ghost"
            size="sm"
          />

          {/* Notifications button with popover */}
          <NotificationsMenu />

          {/* User Profile Menu */}
          <div className="pl-1 border-l border-ds">
            <ProfileMenu compact={true} />
          </div>
        </div>
      </header>

      {/* Global Command/Search Palette */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
