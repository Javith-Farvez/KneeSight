import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutDashboard,
  ScanLine,
  Layers,
  Wrench,
  Users,
  BarChart3,
  FileText,
  Settings,
  ArrowRight,
  User as UserIcon,
  X
} from 'lucide-react';
import { MOCK_PATIENTS } from '@/data/mockPatients';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Patient' | 'Tool';
  icon: React.ElementType;
  url: string;
}

const STATIC_SEARCH_ITEMS: SearchItem[] = [
  { id: 'nav-1', title: 'Overview Dashboard', subtitle: 'View clinical queue, statistics, and pending reviews', category: 'Navigation', icon: LayoutDashboard, url: '/dashboard' },
  { id: 'nav-2', title: 'Image Analysis (X-Ray)', subtitle: 'Kellgren-Lawrence grading, joint space measurement', category: 'Navigation', icon: ScanLine, url: '/imaging' },
  { id: 'nav-3', title: 'Meniscus & OA Assessment', subtitle: 'MRI multi-slice tear grading and cartilage loss', category: 'Navigation', icon: Layers, url: '/meniscus' },
  { id: 'nav-4', title: 'Implant Planning', subtitle: 'Pre-operative resection planning & sizing templates', category: 'Navigation', icon: Wrench, url: '/implant-planning' },
  { id: 'nav-5', title: 'Patient Directory', subtitle: 'Search and inspect cohort records', category: 'Navigation', icon: Users, url: '/patients' },
  { id: 'nav-6', title: 'Analytics & Cohort Insights', subtitle: 'Severity breakdown and longitudinal progression', category: 'Navigation', icon: BarChart3, url: '/analytics' },
  { id: 'nav-7', title: 'Clinical Reports', subtitle: 'Generate automated radiological summaries', category: 'Navigation', icon: FileText, url: '/reports' },
  { id: 'nav-8', title: 'Settings', subtitle: 'Preferences, theme, and profile configuration', category: 'Navigation', icon: Settings, url: '/settings' },
];

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const patientItems: SearchItem[] = useMemo(() => {
    return MOCK_PATIENTS.map((p) => ({
      id: `pat-${p.id}`,
      title: `${p.firstName} ${p.lastName} (${p.mrn})`,
      subtitle: `${p.age}y ${p.gender} · KL Grade ${p.klAssessment?.grade ?? 'N/A'} · ${p.affectedKnee} Knee`,
      category: 'Patient',
      icon: UserIcon,
      url: `/patients?id=${p.id}`,
    }));
  }, []);

  const allItems = useMemo(() => [...STATIC_SEARCH_ITEMS, ...patientItems], [patientItems]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return STATIC_SEARCH_ITEMS;
    const lower = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.subtitle.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower)
    );
  }, [allItems, query]);

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredItems[selectedIndex].url);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-start justify-center pt-20 px-4" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-full max-w-xl bg-ds-surface rounded-panel border border-ds shadow-ds-e3 overflow-hidden z-10"
          >
            {/* Search header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-ds bg-ds-surface-2">
              <Search className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search scans, patient records, clinical tools…"
                className="flex-1 bg-transparent text-ds-body text-ds-1 placeholder:text-ds-4 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded text-ds-4 hover:text-ds-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex text-[11px] px-1.5 py-0.5 rounded bg-ds-surface border border-ds font-mono text-ds-3">
                ESC
              </kbd>
            </div>

            {/* Results list */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-ds-small text-ds-4">
                  No matching patients, scans, or views found for "{query}".
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.url)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-btn text-left transition-colors duration-150 ${
                        isSelected
                          ? 'bg-teal-500/10 text-teal-700 dark:text-teal-300'
                          : 'text-ds-2 hover:bg-ds-surface-2'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-btn flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-teal-500 text-white'
                              : 'bg-ds-surface-2 text-ds-3 border border-ds'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-ds-small font-medium text-ds-1 truncate">{item.title}</p>
                          <p className="text-ds-caption text-ds-4 truncate">{item.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-ds-surface-2 text-ds-4 border border-ds">
                          {item.category}
                        </span>
                        {isSelected && <ArrowRight className="w-4 h-4 text-teal-500" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Search footer */}
            <div className="px-4 py-2 border-t border-ds bg-ds-surface-2 flex items-center justify-between text-ds-caption text-ds-4">
              <div className="flex items-center gap-3">
                <span>Navigate: <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd></span>
                <span>Select: <kbd className="font-mono">↵</kbd></span>
              </div>
              <span>KneeSight Decision Support</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
