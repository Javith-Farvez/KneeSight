import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import { ToastProvider } from '@/hooks/useToast';
import { AuthProvider } from '@/hooks/useAuth';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute, PublicOnlyRoute } from '@/components/auth/ProtectedRoute';

// Lazy-loaded routes for code splitting & fast initial paint
const LandingPage = lazy(() => import('@/pages/Landing/LandingPage').then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('@/pages/Auth/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('@/pages/Auth/SignupPage').then(m => ({ default: m.SignupPage })));
const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage').then(m => ({ default: m.DashboardPage })));
const ImagingPage = lazy(() => import('@/pages/Imaging/ImagingPage').then(m => ({ default: m.ImagingPage })));
const NewImagingAnalysisPage = lazy(() => import('@/pages/Imaging/NewImagingAnalysisPage').then(m => ({ default: m.NewImagingAnalysisPage })));
const MeniscusAnalysisPage = lazy(() => import('@/pages/Meniscus/MeniscusAnalysisPage').then(m => ({ default: m.MeniscusAnalysisPage })));
const ImplantPlanningPage = lazy(() => import('@/pages/ImplantPlanning/ImplantPlanningPage').then(m => ({ default: m.ImplantPlanningPage })));
const PatientsPage = lazy(() => import('@/pages/Patients/PatientsPage').then(m => ({ default: m.PatientsPage })));
const PatientDetailPage = lazy(() => import('@/pages/Patients/PatientDetailPage').then(m => ({ default: m.PatientDetailPage })));
const AnalyticsPage = lazy(() => import('@/pages/Analytics/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const ReportsPage = lazy(() => import('@/pages/Reports/ReportsPage').then(m => ({ default: m.ReportsPage })));
const SettingsPage = lazy(() => import('@/pages/Settings/SettingsPage').then(m => ({ default: m.SettingsPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const DesignSystemPage = lazy(() => import('@/pages/DesignSystem/DesignSystemPage').then(m => ({ default: m.DesignSystemPage })));

function RouteLoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] h-full w-full py-16 space-y-3">
      <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-mono text-ds-4 font-semibold">Loading clinical workspace…</span>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <BrowserRouter>
              <Suspense fallback={<RouteLoadingFallback />}>
                <Routes>
                  {/* Landing page */}
                  <Route path="/" element={<LandingPage />} />

                  {/* Public Authentication routes (redirects to /dashboard if logged in) */}
                  <Route
                    path="/login"
                    element={
                      <PublicOnlyRoute>
                        <LoginPage />
                      </PublicOnlyRoute>
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      <PublicOnlyRoute>
                        <SignupPage />
                      </PublicOnlyRoute>
                    }
                  />

                  {/* Protected Clinical App Shell routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/imaging" element={<ImagingPage />} />
                      <Route path="/imaging/new" element={<NewImagingAnalysisPage />} />
                      <Route path="/imaging/:id" element={<ImagingPage />} />
                      <Route path="/meniscus" element={<MeniscusAnalysisPage />} />
                      <Route path="/implant-planning" element={<ImplantPlanningPage />} />
                      <Route path="/patients" element={<PatientsPage />} />
                      <Route path="/patients/:id" element={<PatientDetailPage />} />
                      <Route path="/analytics" element={<AnalyticsPage />} />
                      <Route path="/reports" element={<ReportsPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/design-system" element={<DesignSystemPage />} />
                    </Route>
                  </Route>

                  {/* Fallbacks */}
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
