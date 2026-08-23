import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { ClinicalDisclaimerBanner } from './ClinicalDisclaimerBanner';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useDisclosure } from '@/hooks/useDisclosure';

export function AppLayout() {
  const mobileNav = useDisclosure(false);
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-ds-bg">
      {/* Skip to Main Content Link for Screen Readers & Keyboard Nav */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Clinical Safety Banner */}
      <ClinicalDisclaimerBanner />

      {/* Main layout container: Desktop Sidebar (240px) + Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <Sidebar />

        {/* Main column */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          {/* Top Header (72px) */}
          <Navbar onMobileMenuOpen={mobileNav.open} />

          {/* Main content with subtle page transition */}
          <main
            id="main-content"
            className="flex-1 overflow-y-auto bg-ds-bg bg-medical-grid"
          >
            <ErrorBoundary>
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="h-full"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </ErrorBoundary>
          </main>
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileNav isOpen={mobileNav.isOpen} onClose={mobileNav.close} />
    </div>
  );
}
