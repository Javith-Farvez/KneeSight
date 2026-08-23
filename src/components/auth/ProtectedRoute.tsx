import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function ProtectedRoute({ children }: { children?: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ds-bg">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
          <p className="text-ds-small text-ds-3 font-medium">Verifying clinical credentials…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export function PublicOnlyRoute({ children }: { children?: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const destination = (location.state as any)?.from?.pathname || '/dashboard';
    return <Navigate to={destination} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
