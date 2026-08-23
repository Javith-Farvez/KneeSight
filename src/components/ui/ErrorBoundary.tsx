import React, { Component, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[KneeSight ErrorBoundary]:', error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Something went wrong
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-sm">
            An unexpected error occurred. Please refresh the page or contact support if the issue persists.
          </p>
          {this.state.error && (
            <code className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 px-3 py-1.5 rounded-lg mb-6 max-w-sm break-all">
              {this.state.error.message}
            </code>
          )}
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="flex items-center gap-2 px-4 py-2 bg-medteal-600 hover:bg-medteal-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
