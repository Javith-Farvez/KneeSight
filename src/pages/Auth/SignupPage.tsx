import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  User as UserIcon,
  Briefcase,
  Building,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/auth';

const ROLE_OPTIONS: UserRole[] = [
  'Orthopedic Surgeon',
  'Musculoskeletal Radiologist',
  'Clinical Researcher',
  'Resident / Fellow',
  'Clinical Specialist',
];

export function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    role: 'Orthopedic Surgeon' as UserRole,
    organization: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Full name with title is required (e.g. Dr. Alex Mercer)';
    }

    if (!formData.organization.trim()) {
      errors.organization = 'Hospital or medical institute name is required';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Valid institutional email address is required';
    }

    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      errors.terms = 'Please accept the prototype clinical evaluation disclaimer';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validate()) {
      return;
    }

    const result = await signup(formData);
    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setErrorMessage(result.error || 'Failed to create registration.');
    }
  };

  return (
    <div className="min-h-screen bg-ds-bg flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background medical grid & subtle ambient glow */}
      <div className="fixed inset-0 bg-medical-grid pointer-events-none" aria-hidden="true" />
      <div
        className="fixed top-0 right-1/4 w-[500px] h-[300px] rounded-full opacity-25 dark:opacity-10 bg-teal-500 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg">
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
            Clinical Decision Support System Registration
          </p>
        </div>

        {/* Card Panel */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          className="bg-ds-surface rounded-panel border border-ds shadow-ds-e3 p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-ds">
            <div>
              <h1 className="font-display text-ds-h4 text-ds-1 font-bold">Create Clinician Account</h1>
              <p className="text-ds-caption text-ds-4 mt-0.5">Prototype Access Registration</p>
            </div>
            <Badge variant="teal" size="sm">Prototype Sandbox</Badge>
          </div>

          {/* Global error */}
          {errorMessage && (
            <div className="mb-4 flex items-start gap-2.5 p-3 rounded-card bg-coral-500/10 border border-coral-500/20 text-coral-700 dark:text-coral-300 text-ds-small animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name & Title */}
            <Input
              id="signup-name"
              label="Full Name & Clinical Title"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (validationErrors.name) setValidationErrors({ ...validationErrors, name: '' });
              }}
              placeholder="e.g. Dr. Alex Mercer, MD"
              leftIcon={<UserIcon className="w-4 h-4 text-ds-4" />}
              errorText={validationErrors.name}
              required
            />

            {/* Professional Role & Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="signup-role"
                  className="text-ds-label font-medium text-ds-2 select-none"
                >
                  Professional Role
                </label>
                <div className="relative">
                  <select
                    id="signup-role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="w-full h-9 rounded-input px-3 bg-ds-surface border border-ds text-ds-1 text-ds-small focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all cursor-pointer"
                  >
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Input
                id="signup-organization"
                label="Hospital / Organization"
                value={formData.organization}
                onChange={(e) => {
                  setFormData({ ...formData, organization: e.target.value });
                  if (validationErrors.organization) setValidationErrors({ ...validationErrors, organization: '' });
                }}
                placeholder="e.g. Stanford Orthopedics"
                leftIcon={<Building className="w-4 h-4 text-ds-4" />}
                errorText={validationErrors.organization}
                required
              />
            </div>

            {/* Email */}
            <Input
              id="signup-email"
              label="Institutional Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (validationErrors.email) setValidationErrors({ ...validationErrors, email: '' });
              }}
              placeholder="alex.mercer@hospital.org"
              leftIcon={<Mail className="w-4 h-4 text-ds-4" />}
              errorText={validationErrors.email}
              required
              autoComplete="email"
            />

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                id="signup-password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (validationErrors.password) setValidationErrors({ ...validationErrors, password: '' });
                }}
                placeholder="Min 6 characters"
                leftIcon={<Lock className="w-4 h-4 text-ds-4" />}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="p-1 text-ds-4 hover:text-ds-1 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                errorText={validationErrors.password}
                required
              />

              <Input
                id="signup-confirm-password"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  if (validationErrors.confirmPassword) setValidationErrors({ ...validationErrors, confirmPassword: '' });
                }}
                placeholder="Re-enter password"
                leftIcon={<Lock className="w-4 h-4 text-ds-4" />}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="p-1 text-ds-4 hover:text-ds-1 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                errorText={validationErrors.confirmPassword}
                required
              />
            </div>

            {/* Prototype Terms Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none text-ds-caption text-ds-2">
                <input
                  id="signup-terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="rounded border-ds text-teal-600 focus:ring-teal-500 h-4 w-4 bg-ds-surface mt-0.5"
                />
                <span>
                  I understand this is an <strong className="text-ds-1">investigational prototype</strong> for demonstration and research evaluation with synthetic data.
                </span>
              </label>
              {validationErrors.terms && (
                <p className="text-xs text-coral-600 dark:text-coral-400 mt-1 pl-6">
                  {validationErrors.terms}
                </p>
              )}
            </div>

            {/* Submit button */}
            <Button
              id="signup-submit-btn"
              type="submit"
              variant="accent"
              size="lg"
              fullWidth
              loading={isLoading}
              className="mt-3 font-semibold shadow-sm"
            >
              {isLoading ? 'Creating Clinical Profile…' : 'Complete Registration & Open Dashboard'}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-5 pt-4 border-t border-ds text-center">
            <p className="text-ds-small text-ds-3">
              Already registered or using demo access?{' '}
              <Link
                to="/login"
                id="link-to-login"
                className="font-semibold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-0.5"
              >
                Sign In <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Prototype Auth Disclaimer */}
        <div className="mt-4 flex items-start gap-2.5 px-3 py-2 rounded-card bg-ds-surface-2 border border-ds text-[11px] text-ds-4">
          <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <p>
            <strong>Local Mock Auth:</strong> Account registration persists locally in your browser storage for this evaluation session.
          </p>
        </div>
      </div>
    </div>
  );
}
