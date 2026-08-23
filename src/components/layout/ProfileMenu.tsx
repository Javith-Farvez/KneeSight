import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  UserCheck,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { DEMO_USERS } from '@/data/mockUsers';

interface ProfileMenuProps {
  compact?: boolean;
}

export function ProfileMenu({ compact = false }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, switchUser } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

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

  if (!user) return null;

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <div className="relative" ref={menuRef}>
      {compact ? (
        <button
          id="header-profile-menu-btn"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-btn bg-ds-surface-2 hover:bg-ds-surface border border-ds transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40"
          aria-label="User profile menu"
        >
          <div className="w-8 h-8 rounded-full bg-teal-600 dark:bg-teal-700 text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-sm">
            {user.initials}
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-ds-caption font-semibold text-ds-1 leading-tight truncate max-w-[120px]">
              {user.name}
            </span>
            <span className="text-[10px] text-teal-600 dark:text-teal-400 leading-tight truncate max-w-[120px]">
              {user.role}
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-ds-4 hidden md:block" />
        </button>
      ) : (
        <button
          id="sidebar-profile-menu-btn"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between p-2 rounded-card bg-ds-surface-2 hover:bg-ds-surface border border-ds transition-all text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-teal-600 dark:bg-teal-700 text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-sm">
              {user.initials}
            </div>
            <div className="min-w-0">
              <p className="text-ds-small font-semibold text-ds-1 truncate leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {user.name}
              </p>
              <p className="text-[11px] text-ds-4 truncate leading-tight mt-0.5">
                {user.role}
              </p>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-ds-4 shrink-0 ml-1 group-hover:text-ds-2" />
        </button>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${
            compact ? 'right-0 top-full mt-2' : 'bottom-full left-0 mb-2'
          } w-72 rounded-panel bg-ds-surface border border-ds shadow-ds-e3 z-[200] overflow-hidden animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* User info card */}
          <div className="p-3.5 border-b border-ds bg-ds-surface-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-mono text-sm font-bold shrink-0">
                {user.initials}
              </div>
              <div className="min-w-0">
                <p className="text-ds-small font-semibold text-ds-1 truncate">{user.name}</p>
                <p className="text-ds-caption text-ds-3 truncate">{user.email}</p>
                <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  {user.organization}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Switch Demo User */}
          <div className="p-2 border-b border-ds">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ds-4 px-2 py-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Switch Demo Account
            </p>
            {DEMO_USERS.map((demo) => (
              <button
                key={demo.id}
                onClick={() => {
                  switchUser(demo.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded-btn text-xs text-left transition-colors ${
                  user.id === demo.id
                    ? 'bg-teal-500/10 text-teal-700 dark:text-teal-300 font-semibold'
                    : 'text-ds-3 hover:bg-ds-surface-2 hover:text-ds-1'
                }`}
              >
                <div className="truncate">
                  <span className="block truncate">{demo.name}</span>
                  <span className="text-[10px] text-ds-4 block truncate">{demo.role}</span>
                </div>
                {user.id === demo.id && <UserCheck className="w-3.5 h-3.5 text-teal-500 shrink-0" />}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="p-1">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/settings');
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-btn text-ds-small text-ds-2 hover:text-ds-1 hover:bg-ds-surface-2 transition-colors"
            >
              <Settings className="w-4 h-4 text-ds-4" />
              Settings & Preferences
            </button>

            <button
              id="profile-logout-btn"
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-btn text-ds-small text-coral-600 dark:text-coral-400 hover:bg-coral-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Prototype note */}
          <div className="px-3 py-1.5 bg-ds-surface-2 border-t border-ds text-[10px] text-ds-4 text-center">
            Session: Prototype Local Storage
          </div>
        </div>
      )}
    </div>
  );
}
