import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import {
  Activity, Menu, X, Sun, Moon, ChevronRight, ArrowRight,
  ScanLine, Brain, Ruler, ClipboardCheck, Wrench, BarChart3,
  Upload, Layers, CheckCircle2, AlertTriangle, Shield, Users,
  TrendingUp, Zap, FileText, ExternalLink, ChevronDown,
  Database, Cpu, Lock, Award
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import heroKneeImg from '../../assets/hero-knee.jpg';
import aiAnalysisImg from '../../assets/ai-analysis-panel.jpg';

/* ── Utilities ── */
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

/* ── Animation variants ── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
  }),
};
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

/* ── Section wrapper with scroll-triggered animation ── */
function Section({
  id, children, className,
}: {
  id?: string; children: React.ReactNode; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={reduced ? false : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeIn}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ── Label above sections ── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill border border-teal-500/30 bg-teal-500/8 text-teal-500 text-ds-label uppercase tracking-widest font-semibold mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
      {children}
    </div>
  );
}

/* ── Floating measurement card (hero) ── */
function MeasCard({
  label, value, delay, className,
}: { label: string; value: string; delay: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn(
        'absolute px-3 py-2 rounded-card text-white',
        'bg-navy-800/80 border border-teal-500/25 backdrop-blur-sm shadow-e2',
        className
      )}
    >
      <p className="text-[9px] font-semibold uppercase tracking-widest text-teal-400 mb-0.5">{label}</p>
      <p className="font-mono text-sm font-semibold text-white leading-none">{value}</p>
    </motion.div>
  );
}

/* ── Stat counter card ── */
function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: typeof Activity }) {
  return (
    <div className="text-center p-6">
      <div className="w-10 h-10 rounded-input bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-3">
        <Icon className="w-5 h-5 text-teal-500" />
      </div>
      <p className="font-display text-ds-h3 text-white mb-1">{value}</p>
      <p className="text-ds-small text-navy-300">{label}</p>
    </div>
  );
}

/* ── Problem card ── */
function ProblemCard({
  number, title, description,
}: { number: string; title: string; description: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="flex gap-5"
    >
      <div className="shrink-0 w-10 h-10 rounded-card border border-coral-500/30 bg-coral-500/8 flex items-center justify-center">
        <span className="font-mono text-ds-small font-bold text-coral-400">{number}</span>
      </div>
      <div>
        <h3 className="text-ds-h6 font-semibold text-ds-1 mb-2">{title}</h3>
        <p className="text-ds-small text-ds-3 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

/* ── Workflow step ── */
function WorkflowStep({
  step, label, description, icon: Icon, isLast = false,
}: {
  step: string; label: string; description: string;
  icon: typeof Upload; isLast?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex flex-col items-center text-center relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-12 h-12 rounded-card bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-3 z-10 relative"
      >
        <Icon className="w-5 h-5 text-teal-500" />
      </motion.div>
      <p className="font-mono text-ds-caption text-teal-500 font-semibold mb-1">{step}</p>
      <p className="text-ds-small font-semibold text-ds-1 mb-1.5">{label}</p>
      <p className="text-ds-caption text-ds-3 max-w-[120px]">{description}</p>
      {!isLast && (
        <div className="hidden md:block absolute top-6 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px border-t border-dashed border-teal-500/25" />
      )}
    </div>
  );
}

/* ── Implant planning step ── */
function ImplantStep({ label, detail, index }: { label: string; detail: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="flex items-start gap-4"
    >
      <div className="w-7 h-7 rounded-btn bg-teal-500 flex items-center justify-center text-white text-ds-caption font-bold shrink-0">
        {index + 1}
      </div>
      <div>
        <p className="text-ds-small font-semibold text-ds-1">{label}</p>
        <p className="text-ds-caption text-ds-3 mt-0.5">{detail}</p>
      </div>
    </motion.div>
  );
}

/* ── Tech architecture pill ── */
function TechPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-pill border border-ds bg-ds-surface text-ds-small text-ds-2 font-mono">
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════ */
const navLinks = [
  { label: 'Platform',         href: '#how-it-works' },
  { label: 'AI Analysis',      href: '#ai-analysis' },
  { label: 'Implant Planning', href: '#implant-planning' },
  { label: 'Research',         href: '#analytics' },
  { label: 'About',            href: '#technology' },
];

function LandingNavbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 h-[72px] flex items-center',
          'transition-all duration-[240ms] ease-[cubic-bezier(.2,.8,.2,1)]',
          scrolled
            ? 'bg-navy-900/95 backdrop-blur-md border-b border-white/8 shadow-e2'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-input bg-teal-500 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-display text-[1.1rem] text-white leading-none">KneeSight</span>
              <span className="font-display text-[1.1rem] text-teal-400 leading-none">AI</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-1.5 rounded-btn text-ds-small font-medium text-navy-200 hover:text-white hover:bg-white/8 transition-all duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              id="landing-theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-btn flex items-center justify-center text-navy-300 hover:text-white hover:bg-white/8 transition-all duration-[180ms]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              to="/login"
              id="landing-signin-btn"
              className="hidden sm:inline-flex h-8 px-3.5 rounded-btn items-center text-ds-small font-medium text-navy-200 hover:text-white border border-white/12 hover:border-white/25 transition-all duration-[180ms]"
            >
              Sign In
            </Link>

            <Link
              to="/dashboard"
              id="landing-getstarted-btn"
              className="hidden sm:inline-flex h-8 px-3.5 rounded-btn items-center gap-1.5 text-ds-small font-medium bg-teal-500 text-white hover:bg-teal-400 transition-all duration-[180ms] shadow-e1"
            >
              Get Started
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile hamburger */}
            <button
              id="landing-menu-btn"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="lg:hidden w-9 h-9 rounded-btn flex items-center justify-center text-navy-200 hover:text-white hover:bg-white/8 transition-all duration-[180ms]"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-navy-950/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed right-0 top-0 bottom-0 z-50 w-64 bg-navy-900 border-l border-white/8 flex flex-col shadow-e3 lg:hidden"
            >
              <div className="flex items-center justify-between px-5 h-[72px] border-b border-white/8 shrink-0">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-display text-[1rem] text-white">KneeSight</span>
                  <span className="font-display text-[1rem] text-teal-400">AI</span>
                </div>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="w-8 h-8 rounded-btn flex items-center justify-center text-navy-300 hover:text-white hover:bg-white/8">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-3 py-2.5 rounded-btn text-ds-small font-medium text-navy-200 hover:text-white hover:bg-white/8 transition-all duration-[180ms]"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
              <div className="px-4 py-4 border-t border-white/8 space-y-2">
                <Link to="/login" className="flex w-full h-9 items-center justify-center rounded-btn border border-white/15 text-ds-small font-medium text-navy-200 hover:text-white">Sign In</Link>
                <Link to="/dashboard" className="flex w-full h-9 items-center justify-center rounded-btn bg-teal-500 text-white text-ds-small font-medium hover:bg-teal-400">Get Started</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════
   MAIN LANDING PAGE
═══════════════════════════════════════════ */
export function LandingPage() {
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen bg-surface-dark text-white overflow-x-hidden">
      <LandingNavbar />

      {/* ── 1. HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center pt-[72px] overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0B132B 0%, #090F20 60%, #060D1C 100%)' }}
      >
        {/* Technical grid */}
        <div className="absolute inset-0 bg-medical-grid opacity-60 pointer-events-none" aria-hidden="true" />

        {/* Ambient teal glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(46,196,182,0.06) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: copy */}
          <div className="flex-1 text-center lg:text-left">
            {/* Disclaimer pill */}
            <motion.div
              custom={0} variants={fadeUp} initial={reduced ? false : 'hidden'} animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-pill border border-teal-500/30 bg-teal-500/8 text-ds-caption text-teal-400 font-semibold"
            >
              <Shield className="w-3.5 h-3.5" />
              Clinical Decision Support Prototype · Not FDA cleared
            </motion.div>

            <motion.h1
              custom={1} variants={fadeUp} initial={reduced ? false : 'hidden'} animate="visible"
              className="font-display text-ds-h1 text-white leading-[1.08] mb-5"
              style={{ letterSpacing: '-0.02em' }}
            >
              AI-Powered Precision
              <br />
              <span className="text-teal-400">for Every Knee.</span>
            </motion.h1>

            <motion.p
              custom={2} variants={fadeUp} initial={reduced ? false : 'hidden'} animate="visible"
              className="text-ds-body text-navy-200 max-w-md mb-8 leading-relaxed"
            >
              Transform knee medical imaging into structured anatomical measurements,
              AI-assisted analysis and patient-specific implant planning.
            </motion.p>

            <motion.div
              custom={3} variants={fadeUp} initial={reduced ? false : 'hidden'} animate="visible"
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link
                to="/dashboard"
                id="hero-cta-platform"
                className="inline-flex h-11 px-6 rounded-btn items-center gap-2 bg-teal-500 text-white font-medium text-[0.9375rem] hover:bg-teal-400 transition-all duration-[180ms] shadow-e1 hover:shadow-teal-glow"
              >
                Explore Platform
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                id="hero-cta-imaging"
                onClick={() => document.getElementById('ai-analysis')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex h-11 px-6 rounded-btn items-center gap-2 border border-white/15 text-white font-medium text-[0.9375rem] hover:bg-white/8 hover:border-white/25 transition-all duration-[180ms]"
              >
                Analyze Imaging
              </button>
            </motion.div>

            {/* Credibility stat row */}
            <motion.div
              custom={4} variants={fadeUp} initial={reduced ? false : 'hidden'} animate="visible"
              className="flex items-center gap-6 mt-10 justify-center lg:justify-start"
            >
              {[
                { val: '94.6%', lbl: 'Avg Confidence' },
                { val: '2.8s',  lbl: 'Analysis Time' },
                { val: '1,420', lbl: 'Scans Analyzed' },
              ].map(({ val, lbl }) => (
                <div key={lbl} className="text-center">
                  <p className="font-display text-ds-h5 text-teal-400">{val}</p>
                  <p className="text-ds-caption text-navy-400">{lbl}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: hero image + floating cards */}
          <motion.div
            custom={2} variants={fadeUp} initial={reduced ? false : 'hidden'} animate="visible"
            className="flex-1 relative w-full max-w-[540px] aspect-video lg:aspect-auto lg:h-[460px]"
          >
            {/* Border glow */}
            <div
              className="absolute -inset-px rounded-panel pointer-events-none z-10"
              style={{ boxShadow: '0 0 0 1px rgba(46,196,182,0.15), 0 0 40px rgba(46,196,182,0.08)' }}
              aria-hidden="true"
            />
            <img
              src={heroKneeImg}
              alt="AI-assisted knee joint analysis visualization showing anatomical measurements"
              className="w-full h-full object-cover rounded-panel"
              loading="eager"
            />

            {/* Floating measurement cards */}
            <MeasCard label="Medial Joint Space" value="4.82 mm" delay={1.0} className="top-4 left-4" />
            <MeasCard label="Femoral Width" value="73.1 mm" delay={1.2} className="top-4 right-4" />
            <MeasCard label="Tibial Slope" value="9.4°" delay={1.4} className="bottom-12 right-4" />
            <MeasCard label="Implant Match" value="Size 5 — 94%" delay={1.6} className="bottom-4 left-4" />

            {/* AI status pill */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.5 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-navy-800/90 border border-teal-500/25 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-ds-caption text-teal-400 font-semibold font-mono">AI Analysis Active</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-ds-caption text-navy-500">Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-navy-500 animate-bounce" />
        </motion.div>
      </section>

      {/* ── 2. CLINICAL PROBLEM ── */}
      <Section id="problem" className="py-24 px-6 bg-surface-light dark:bg-surface-dark-2">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>Clinical Challenge</SectionLabel>
            <h2 className="font-display text-ds-h2 text-ds-1 mb-4">
              The Problem with Current Practice
            </h2>
            <p className="text-ds-body text-ds-3 max-w-xl mx-auto">
              Orthopedic assessment today relies heavily on qualitative judgment. KneeSight AI
              introduces quantitative precision to every clinical decision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                n: '01',
                icon: AlertTriangle,
                color: 'coral',
                title: 'Qualitative Assessment',
                desc: 'KL grading is performed visually, introducing inter-observer variability of up to 30% in literature. Subtle grade 2→3 transitions are routinely missed without quantitative joint space measurement.',
              },
              {
                n: '02',
                icon: Ruler,
                color: 'coral',
                title: 'Limited Quantitative Reference',
                desc: 'Anatomical measurements — tibial slope, mechanical axis deviation, condylar offset — require manual calculation from radiographs, increasing time-per-case and potential for measurement error.',
              },
              {
                n: '03',
                icon: Wrench,
                color: 'coral',
                title: 'Implant Sizing Complexity',
                desc: 'Selecting the right implant size requires correlating multiple anatomical reference points. Current templating tools lack AI-assisted ranking, leaving sizing decisions entirely to manual estimation.',
              },
            ].map((p) => (
              <div
                key={p.n}
                className="rounded-card border border-ds bg-ds-surface p-6 hover:border-coral-500/30 hover:shadow-e2 transition-all duration-[180ms]"
              >
                <div className="w-9 h-9 rounded-input bg-coral-500/8 border border-coral-500/20 flex items-center justify-center mb-4">
                  <p.icon className="w-4 h-4 text-coral-500" />
                </div>
                <p className="font-mono text-ds-caption text-coral-500 font-semibold mb-2">Problem {p.n}</p>
                <h3 className="text-ds-h6 font-semibold text-ds-1 mb-2">{p.title}</h3>
                <p className="text-ds-small text-ds-3 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 3. HOW IT WORKS ── */}
      <Section id="how-it-works" className="py-24 px-6 bg-ds-bg">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Workflow</SectionLabel>
            <h2 className="font-display text-ds-h2 text-ds-1 mb-4">How the Platform Works</h2>
            <p className="text-ds-body text-ds-3 max-w-lg mx-auto">
              Five structured stages transform raw medical imaging into actionable surgical intelligence.
            </p>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-4">
            {[
              { step: 'Step 01', label: 'Upload Imaging', description: 'DICOM, X-ray or MRI series', icon: Upload },
              { step: 'Step 02', label: 'AI Segmentation', description: 'Bone, cartilage, meniscus', icon: Brain },
              { step: 'Step 03', label: 'Measurements', description: 'Anatomical landmark extraction', icon: Ruler },
              { step: 'Step 04', label: 'Clinical Review', description: 'Surgeon verification overlay', icon: ClipboardCheck },
              { step: 'Step 05', label: 'Implant Planning', description: 'AI ranked sizing suggestions', icon: Wrench, isLast: true },
            ].map((s, i) => (
              <WorkflowStep key={s.step} {...s} isLast={i === 4} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── 4. AI ANALYSIS ── */}
      <Section id="ai-analysis" className="py-24 px-6 bg-navy-950">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>AI Analysis</SectionLabel>
              <h2 className="font-display text-ds-h2 text-white mb-4">
                From Raw Imaging to Structured Intelligence
              </h2>
              <p className="text-ds-body text-navy-200 mb-6 leading-relaxed">
                KneeSight AI processes knee radiographs and MRI series through a multi-stage
                deep learning pipeline, extracting quantitative measurements that augment — not replace — clinical judgment.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Kellgren-Lawrence grading with calibrated confidence',
                  'Medial/lateral joint space width measurement',
                  'Cartilage thickness mapping from sagittal MRI',
                  'Mechanical axis and alignment angle extraction',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                    <p className="text-ds-small text-navy-200">{item}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-card border border-teal-500/20 bg-teal-500/5 p-4">
                  <p className="font-display text-ds-h4 text-teal-400">94.6%</p>
                  <p className="text-ds-caption text-navy-400 mt-0.5">Average AI Confidence</p>
                </div>
                <div className="rounded-card border border-white/10 bg-white/3 p-4">
                  <p className="font-display text-ds-h4 text-white">2.8s</p>
                  <p className="text-ds-caption text-navy-400 mt-0.5">Mean Analysis Latency</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute -inset-px rounded-panel pointer-events-none z-10"
                style={{ boxShadow: '0 0 0 1px rgba(46,196,182,0.15)' }}
                aria-hidden="true"
              />
              <img
                src={aiAnalysisImg}
                alt="KneeSight AI analysis interface showing MRI segmentation and measurement extraction"
                className="w-full rounded-panel object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 right-3 rounded-card bg-navy-900/90 border border-teal-500/20 backdrop-blur-sm px-4 py-2.5">
                <p className="font-mono text-ds-caption text-teal-400 leading-relaxed truncate">
                  KL Grade: 3 — Moderate OA&nbsp;·&nbsp;Confidence: 94.2%&nbsp;·&nbsp;Medial JSW: 1.8mm
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 5. MENISCUS / OA ASSESSMENT ── */}
      <Section id="meniscus-oa" className="py-24 px-6 bg-ds-bg">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>Assessment</SectionLabel>
            <h2 className="font-display text-ds-h2 text-ds-1 mb-4">Meniscus & Osteoarthritis Assessment</h2>
            <p className="text-ds-body text-ds-3 max-w-lg mx-auto">
              Structured grading and classification across both compartments, with reference to validated clinical scales.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: Layers,
                title: 'Medial Meniscus Analysis',
                items: ['Tear detection & ISAKOS classification', 'Meniscal extrusion measurement', 'Root tear proximity scoring', 'Comparison to contralateral compartment'],
                variant: 'teal',
              },
              {
                icon: ScanLine,
                title: 'Osteoarthritis Grading',
                items: ['Kellgren-Lawrence Grades 0–4', 'Calibrated inter-rater AI model', 'Joint space width (medial + lateral)', 'Osteophyte presence and zone mapping'],
                variant: 'teal',
              },
              {
                icon: Ruler,
                title: 'Cartilage Mapping',
                items: ['MRI T2-sequence cartilage thickness', 'Femoral articular surface coverage', 'Tibial cartilage degeneration zones', 'Focal defect size and depth estimation'],
                variant: 'navy',
              },
              {
                icon: BarChart3,
                title: 'Longitudinal Tracking',
                items: ['Side-by-side scan comparison', 'JSW progression over time', 'KL grade transition alerts', 'Conservative management outcome tracking'],
                variant: 'navy',
              },
            ].map((card) => (
              <div
                key={card.title}
                className={cn(
                  'rounded-card border p-6 hover:shadow-e2 transition-all duration-[180ms]',
                  card.variant === 'teal'
                    ? 'bg-teal-500/4 border-teal-500/20 hover:border-teal-500/40'
                    : 'bg-ds-surface border-ds hover:border-navy-500/40'
                )}
              >
                <div className={cn(
                  'w-9 h-9 rounded-input flex items-center justify-center mb-4',
                  card.variant === 'teal'
                    ? 'bg-teal-500/10 border border-teal-500/20'
                    : 'bg-navy-100 dark:bg-navy-800/40 border border-ds'
                )}>
                  <card.icon className={cn('w-4 h-4', card.variant === 'teal' ? 'text-teal-500' : 'text-navy-500 dark:text-navy-400')} />
                </div>
                <h3 className="text-ds-h6 font-semibold text-ds-1 mb-3">{card.title}</h3>
                <ul className="space-y-1.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-ds-small text-ds-3">
                      <span className="w-1 h-1 rounded-full bg-teal-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 6. ANATOMICAL MEASUREMENTS ── */}
      <Section id="measurements" className="py-24 px-6 bg-navy-950">
        <div className="max-w-5xl mx-auto text-center">
          <SectionLabel>Measurements</SectionLabel>
          <h2 className="font-display text-ds-h2 text-white mb-4">Anatomical Measurement Extraction</h2>
          <p className="text-ds-body text-navy-200 max-w-lg mx-auto mb-14">
            Every measurement referenced against peer-validated normal ranges, with out-of-range indicators for immediate clinical attention.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Medial JSW',        value: '1.8 mm',  ref: '4.0–5.5 mm', status: 'low'    },
              { label: 'Lateral JSW',       value: '3.2 mm',  ref: '4.5–6.0 mm', status: 'low'    },
              { label: 'Femoral Width',     value: '73.1 mm', ref: '65–80 mm',   status: 'normal' },
              { label: 'Tibial Width',      value: '71.7 mm', ref: '62–78 mm',   status: 'normal' },
              { label: 'Posterior Slope',   value: '9.4°',    ref: '7–10°',      status: 'normal' },
              { label: 'MAD',               value: '−7.8 mm', ref: '±3 mm',      status: 'low'    },
              { label: 'TFA',               value: '2.1°',    ref: '0–5°',       status: 'normal' },
              { label: 'Insall-Salvati',    value: '0.98',    ref: '0.8–1.2',    status: 'normal' },
            ].map(({ label, value, ref: refRange, status }) => (
              <div
                key={label}
                className={cn(
                  'rounded-card border p-4 text-left',
                  status === 'low'
                    ? 'bg-coral-500/5 border-coral-500/25'
                    : 'bg-teal-500/5 border-teal-500/15'
                )}
              >
                <p className="text-ds-caption text-navy-400 mb-1">{label}</p>
                <p className={cn('font-mono font-semibold text-lg leading-none mb-1.5', status === 'low' ? 'text-coral-400' : 'text-teal-400')}>
                  {value}
                </p>
                <p className="text-ds-caption font-mono text-navy-500">Ref: {refRange}</p>
                {status === 'low' && (
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-coral-400 mt-1.5">↓ Below Normal</p>
                )}
              </div>
            ))}
          </div>
          <p className="text-ds-caption text-navy-500 mt-6 font-mono">
            ⚠ All values are AI-generated estimates · Verify with calibrated radiographic measurements
          </p>
        </div>
      </Section>

      {/* ── 7. IMPLANT PLANNING ── */}
      <Section id="implant-planning" className="py-24 px-6 bg-ds-bg">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel>Implant Planning</SectionLabel>
              <h2 className="font-display text-ds-h2 text-ds-1 mb-4">
                Patient-Specific Implant Suggestions
              </h2>
              <p className="text-ds-body text-ds-3 mb-8 leading-relaxed">
                AI correlates anatomical measurements against validated implant databases to surface
                ranked sizing suggestions for surgeon review — never a replacement for clinical judgment.
              </p>
              <div className="space-y-5">
                {[
                  { label: 'Patient Anatomy Analysis',   detail: 'Femoral, tibial, and patellar geometry extracted from imaging' },
                  { label: 'Multi-point Measurement',    detail: 'A-P, M-L dimensions and rotation alignment correlated' },
                  { label: 'Ranked Implant Suggestions', detail: 'AI-scored size matches with confidence and anatomical fit percentage' },
                  { label: 'Clinical Review & Sign-off', detail: 'Surgeon verification workflow before export to surgical plan' },
                ].map((step, i) => (
                  <ImplantStep key={step.label} {...step} index={i} />
                ))}
              </div>
            </div>

            {/* Implant suggestion UI mockup */}
            <div className="rounded-panel border border-ds bg-ds-surface shadow-ds-e2 overflow-hidden">
              <div className="px-5 py-4 border-b border-ds flex items-center justify-between bg-ds-surface-2">
                <div>
                  <p className="text-ds-small font-semibold text-ds-1">Implant Sizing Suggestions</p>
                  <p className="text-ds-caption text-ds-4 font-mono">PT-10492 · Eleanor Vance · Right TKA</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-pill bg-teal-50 dark:bg-teal-950/25 border border-teal-200 dark:border-teal-700/40 text-ds-caption text-teal-600 dark:text-teal-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  AI Suggested
                </span>
              </div>
              <div className="divide-y divide-ds">
                {[
                  { size: 'Size 5',  match: '96.2%', femAP: '58mm', tibML: '71mm', recommended: true  },
                  { size: 'Size 4',  match: '88.4%', femAP: '54mm', tibML: '68mm', recommended: false },
                  { size: 'Size 5+', match: '81.1%', femAP: '61mm', tibML: '74mm', recommended: false },
                ].map((row) => (
                  <div
                    key={row.size}
                    className={cn(
                      'px-5 py-3.5 flex items-center justify-between gap-4',
                      row.recommended && 'bg-teal-500/4'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {row.recommended && <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />}
                      {!row.recommended && <div className="w-4 h-4 rounded-full border border-ds shrink-0" />}
                      <div>
                        <p className={cn('text-ds-small font-semibold', row.recommended ? 'text-teal-600 dark:text-teal-400' : 'text-ds-2')}>
                          {row.size} {row.recommended && '— Best Match'}
                        </p>
                        <p className="text-ds-caption font-mono text-ds-4">
                          Fem A-P: {row.femAP} · Tib M-L: {row.tibML}
                        </p>
                      </div>
                    </div>
                    <span className={cn('font-mono text-ds-small font-semibold', row.recommended ? 'text-teal-500' : 'text-ds-3')}>
                      {row.match}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 bg-amber-50 dark:bg-amber-950/15 border-t border-amber-200 dark:border-amber-800/30">
                <p className="text-ds-caption text-amber-700 dark:text-amber-400 font-medium">
                  ⚠ AI Suggested · For Clinical Review Only · Surgeon sign-off required before surgical use
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 8. ANALYTICS ── */}
      <Section id="analytics" className="py-24 px-6 bg-navy-950">
        <div className="max-w-5xl mx-auto text-center">
          <SectionLabel>Research</SectionLabel>
          <h2 className="font-display text-ds-h2 text-white mb-4">Research-Grade Analytics</h2>
          <p className="text-ds-body text-navy-200 max-w-lg mx-auto mb-14">
            Population-level cohort insights for orthopedic research, quality improvement, and epidemiological analysis.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-white/8 rounded-panel overflow-hidden">
            {[
              { value: '1,420', label: 'Scans Analyzed',      icon: ScanLine   },
              { value: '4',     label: 'Synthetic Patients',   icon: Users      },
              { value: '94.6%', label: 'Avg AI Confidence',    icon: Brain      },
              { value: '2.8s',  label: 'Avg Analysis Time',    icon: Zap        },
            ].map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── 9. CLINICAL REVIEW WORKFLOW ── */}
      <Section id="clinical-workflow" className="py-24 px-6 bg-ds-bg">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>Clinical Workflow</SectionLabel>
            <h2 className="font-display text-ds-h2 text-ds-1 mb-4">Built for Clinical Review</h2>
            <p className="text-ds-body text-ds-3 max-w-lg mx-auto">
              Every AI output requires active clinician verification. KneeSight AI is a decision support
              tool — the surgeon remains the responsible authority at every step.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: Brain,
                step: '01',
                title: 'AI Generates Assessment',
                desc: 'Deep learning model processes imaging and generates structured anatomical measurements with confidence intervals.',
              },
              {
                icon: ClipboardCheck,
                step: '02',
                title: 'Clinician Reviews Overlay',
                desc: 'Surgeon reviews AI segmentation, verifies measurement markers, and accepts or modifies the AI output before it enters the record.',
              },
              {
                icon: CheckCircle2,
                step: '03',
                title: 'Approval & Handoff',
                desc: 'Clinician-signed assessments are exported to structured reports for operative planning, referral, or research documentation.',
              },
            ].map((card) => (
              <div key={card.title} className="rounded-card border border-ds bg-ds-surface p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-input bg-navy-800 dark:bg-navy-700 flex items-center justify-center">
                    <card.icon className="w-4 h-4 text-teal-400" />
                  </div>
                  <span className="font-mono text-ds-caption text-ds-4 font-semibold">Step {card.step}</span>
                </div>
                <h3 className="text-ds-h6 font-semibold text-ds-1 mb-2">{card.title}</h3>
                <p className="text-ds-small text-ds-3 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 10. TECHNOLOGY ARCHITECTURE ── */}
      <Section id="technology" className="py-24 px-6 bg-ds-surface border-t border-ds">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>Technology</SectionLabel>
            <h2 className="font-display text-ds-h2 text-ds-1 mb-4">Architecture Overview</h2>
            <p className="text-ds-body text-ds-3 max-w-lg mx-auto">
              Built on a modular, clinically-informed AI architecture designed for
              auditability, reproducibility, and clinical integration.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              { icon: Cpu,      title: 'AI Model Stack',      desc: 'EfficientNet-based segmentation backbone, trained on paired X-ray and MRI datasets with KL grading ground truth from 3 radiologists.', pills: ['PyTorch', 'EfficientNet', 'nnU-Net', 'MONAI'] },
              { icon: Database, title: 'Imaging Pipeline',    desc: 'DICOM-compatible ingestion pipeline with GDCM parsing, CLAHE preprocessing, and modality-specific windowing for X-ray and MRI series.', pills: ['DICOM', 'GDCM', 'pydicom', 'SimpleITK'] },
              { icon: Lock,     title: 'Clinical Safety',     desc: 'AI outputs are labelled as AI-Assisted, For Clinical Review, or Decision Support Only. No output enters patient records without explicit clinician sign-off.', pills: ['Audit Log', 'Role-Based Access', 'Clinician Sign-off'] },
              { icon: Award,    title: 'Research Compliance', desc: 'Prototype designed for IRB-approved research use. All demo data is synthetic. Not a cleared medical device per FDA 21 CFR Part 892 or EU MDR 2017/745.', pills: ['IRB Research', 'Synthetic Data', 'Non-diagnostic'] },
            ].map((card) => (
              <div key={card.title} className="rounded-card border border-ds p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-input bg-ds-surface-2 border border-ds flex items-center justify-center">
                    <card.icon className="w-4 h-4 text-teal-500" />
                  </div>
                  <h3 className="text-ds-h6 font-semibold text-ds-1">{card.title}</h3>
                </div>
                <p className="text-ds-small text-ds-3 mb-4 leading-relaxed">{card.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {card.pills.map((p) => <TechPill key={p} label={p} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 11. CTA ── */}
      <Section id="cta" className="py-24 px-6 bg-navy-950">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div
              className="rounded-panel border border-teal-500/20 p-12"
              style={{ background: 'linear-gradient(135deg, rgba(11,19,43,0.8) 0%, rgba(46,196,182,0.04) 100%)' }}
            >
              <p className="font-mono text-ds-caption text-teal-500 uppercase tracking-widest font-semibold mb-5">
                Prototype Access
              </p>
              <h2 className="font-display text-ds-h2 text-white mb-4">
                Turn medical images into<br />measurable insight.
              </h2>
              <p className="text-ds-body text-navy-200 max-w-md mx-auto mb-8">
                Explore the full clinical dashboard with realistic synthetic patient data,
                AI assessments, and implant planning tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/dashboard"
                  id="cta-open-dashboard"
                  className="inline-flex h-11 px-8 rounded-btn items-center gap-2 bg-teal-500 text-white font-medium text-[0.9375rem] hover:bg-teal-400 transition-all duration-[180ms] hover:shadow-teal-glow"
                >
                  Open Clinical Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/design-system"
                  id="cta-design-system"
                  className="inline-flex h-11 px-6 rounded-btn items-center gap-2 border border-white/15 text-white font-medium text-[0.9375rem] hover:bg-white/8 transition-all duration-[180ms]"
                >
                  Design System
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── 12. FOOTER ── */}
      <footer className="bg-navy-950 border-t border-white/8 py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-input bg-teal-500 flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-display text-[1rem] text-white">KneeSight</span>
                  <span className="font-display text-[1rem] text-teal-400">AI</span>
                </div>
              </div>
              <p className="text-ds-small text-navy-400 leading-relaxed max-w-xs">
                AI-assisted clinical decision support for knee medical imaging analysis and orthopedic planning.
              </p>
              <p className="text-ds-caption text-navy-600 mt-3 font-mono">
                Research prototype · Not a medical device
              </p>
            </div>
            {/* Links */}
            {[
              {
                heading: 'Platform',
                links: ['Dashboard', 'Imaging Analysis', 'Meniscus Assessment', 'Implant Planning', 'Analytics'],
              },
              {
                heading: 'Research',
                links: ['Publications', 'Dataset', 'AI Model Cards', 'Clinical Validation'],
              },
              {
                heading: 'Legal',
                links: ['Disclaimer', 'Privacy Policy', 'Terms of Use', 'GDPR', 'IRB Protocol'],
              },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <p className="text-ds-label uppercase tracking-wider text-navy-400 font-semibold mb-4">{heading}</p>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <span className="text-ds-small text-navy-500 hover:text-navy-200 transition-colors duration-[120ms] cursor-pointer">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-ds-caption text-navy-600">
              © 2026 KneeSight AI · Prototype v1.0.0 · Clinical Research Evaluation Only
            </p>
            <p className="text-ds-caption text-navy-600 max-w-sm text-right">
              ⚠ Not an FDA-cleared or CE-marked medical device. All patient data is synthetic.
              AI outputs are for demonstration purposes only and must not be used for clinical diagnosis.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
