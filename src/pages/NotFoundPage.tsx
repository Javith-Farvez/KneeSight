import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-ds-bg flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <div className="w-14 h-14 rounded-panel bg-teal-500 flex items-center justify-center mx-auto mb-6 shadow-teal-glow">
          <Activity className="w-7 h-7 text-white" strokeWidth={2.5} />
        </div>
        <p className="font-display text-ds-h2 text-teal-500 mb-2">404</p>
        <h1 className="font-display text-ds-h4 text-ds-1 mb-2">Page Not Found</h1>
        <p className="text-ds-small text-ds-3 mb-6">The clinical resource you requested could not be located.</p>
        <Link to="/dashboard">
          <Button id="404-back-btn" variant="accent" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
