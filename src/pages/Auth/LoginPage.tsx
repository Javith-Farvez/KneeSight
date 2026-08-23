import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import { DEMO_USERS } from '@/data/mockUsers';
import { ForgotPasswordModal } from './ForgotPasswordModal';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginDemo, isLoading } = useAuth();

  const [email, setEmail] = useState('sarah.jenkins@kneesight.demo');
  const [password, setPassword] = useState('demo-kneesight-2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const destination = (location.state as any)?.from?.pathname || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both institutional email and password.');
      return;
    }

    const result = await login(email, password, rememberMe);
    if (result.success) {
      navigate(destination, { replace: true });
    } else {
      setErrorMessage(result.error || 'Authentication failed.');
    }
  };

  const handleQuickDemoLogin = async (userIndex: number) => {
    setErrorMessage('');
    await loginDemo(userIndex);
    navigate(destination, { replace: true });
  };

  return (
    <div className="min-h-screen bg-ds-bg flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background medical grid & subtle ambient glow */}
      <div className="fixed inset-0 bg-medical-grid pointer-events-none" aria-hidden="true" />
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full opacity-25 dark:opacity-10 bg-teal-500 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 mb-2 group transition-transform hover:scale-[1.02]"
          >
            <div className="w-10 h-10 rounded-input bg-teal-500 flex items-center justify-center shadow-md shadow-teal-500/20">
              <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex items-baseline gap-1 text-left">
              <span className="font-display text-2xl font-bold text-ds-1">KneeSight</span>
              <span className="font-display text-2xl font-bold text-teal-500">AI</span>
            </div>
          </Link>
          <p className="text-ds-small text-ds-3 font-medium">
            Musculoskeletal Diagnostic & Surgical Decision Support
          </p>
        </div>

        {/* Card Panel */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          className="bg-ds-surface rounded-panel border border-ds shadow-ds-e3 p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-ds">
            <div>
              <h1 className="font-display text-ds-h4 text-ds-1 font-bold">Sign In</h1>
              <p className="text-ds-caption text-ds-4 mt-0.5">Clinical Workspace Authentication</p>
            </div>
            <Badge variant="teal" size="sm">Prototype Evaluation</Badge>
          </div>

          {/* Error alert */}
          {errorMessage && (
            <div className="mb-5 flex items-start gap-2.5 p-3 rounded-card bg-coral-500/10 border border-coral-500/20 text-coral-700 dark:text-coral-300 text-ds-small animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              id="login-email"
              label="Institutional Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="surgeon@hospital.org"
              leftIcon={<Mail className="w-4 h-4 text-ds-4" />}
              required
              autoComplete="email"
            />

            <div>
              <Input
                id="login-password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                leftIcon={<Lock className="w-4 h-4 text-ds-4" />}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="p-1 text-ds-4 hover:text-ds-1 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                required
                autoComplete="current-password"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-ds-caption pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-ds-2">
                <input
                  id="login-remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-ds text-teal-600 focus:ring-teal-500 h-4 w-4 bg-ds-surface"
                />
                <span>Remember this workstation</span>
              </label>

              <button
                type="button"
                id="login-forgot-password-btn"
                onClick={() => setForgotPasswordOpen(true)}
                className="text-teal-600 dark:text-teal-400 hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <Button
              id="login-submit-btn"
              type="submit"
              variant="accent"
              size="lg"
              fullWidth
              loading={isLoading}
              className="mt-2 font-semibold shadow-sm"
            >
              {isLoading ? 'Verifying Credentials…' : 'Sign In to Workspace'}
            </Button>
          </form>

          {/* 1-Click Demo Accounts Selector */}
          <div className="mt-6 pt-5 border-t border-ds">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ds-4 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                1-Click Quick Demo Sign In
              </span>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-mono">No password required</span>
            </div>

            <div className="space-y-1.5">
              {DEMO_USERS.map((demo, idx) => (
                <button
                  key={demo.id}
                  type="button"
                  id={`demo-user-btn-${idx}`}
                  onClick={() => handleQuickDemoLogin(idx)}
                  disabled={isLoading}
                  className="w-full flex items-center justify-between p-2.5 rounded-btn bg-ds-surface-2 hover:bg-teal-500/10 border border-ds hover:border-teal-500/40 text-left transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-teal-600/20 text-teal-700 dark:text-teal-300 flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                      {demo.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-ds-caption font-semibold text-ds-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 truncate">
                        {demo.name}
                      </p>
                      <p className="text-[10px] text-ds-4 truncate">{demo.role} · {demo.organization}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-ds-4 group-hover:text-teal-500 shrink-0 ml-1 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Signup Link */}
          <div className="mt-5 pt-4 border-t border-ds text-center">
            <p className="text-ds-small text-ds-3">
              Need a new clinical research account?{' '}
              <Link
                to="/signup"
                id="link-to-signup"
                className="font-semibold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-0.5"
              >
                Create Account <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Prototype Auth Disclaimer */}
        <div className="mt-4 flex items-start gap-2.5 px-3 py-2 rounded-card bg-ds-surface-2 border border-ds text-[11px] text-ds-4">
          <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <p>
            <strong>Evaluation Prototype:</strong> This interface uses local mock authentication for prototype demonstration. All patient records and AI findings are synthetic.
          </p>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        initialEmail={email}
      />
    </div>
  );
}
