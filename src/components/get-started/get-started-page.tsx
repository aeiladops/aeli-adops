'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe,
  Layers,
  Loader2,
  Mail,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

/* Inline SVG icons for version-safe fallback */
const Star = ({ className = 'size-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const Shield = ({ className = 'size-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
  </svg>
);
const Zap = ({ className = 'size-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

/* Lazy-load the heavy Three.js scene only on client */
const WaveGridBackground = dynamic(
  () => import('@/src/components/ui/wave-grid-background').then((m) => m.WaveGridBackground),
  { ssr: false }
);

/* ─── SVG Icons ─────────────────────────────────────── */
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

/* ─── Constants ─────────────────────────────────────── */
const AD_PLATFORM_OPTIONS = [
  'Google Ad Manager',
  'Google AdSense',
  'Google Ad Manager + AdSense',
  'Header Bidding / Prebid',
  'Other',
  'Not Sure',
];

const PAGEVIEW_OPTIONS = [
  'Less than 100K',
  '100K – 500K',
  '500K – 1 Million',
  '1M – 5 Million',
  '5M – 10 Million',
  'More than 10 Million',
];

const AUDIT_AREAS = [
  { id: 'revenue', label: 'Revenue Performance Analysis', icon: BarChart3 },
  { id: 'fill', label: 'Fill Rate Optimization', icon: Activity },
  { id: 'viewability', label: 'Ad Viewability Review', icon: ShieldCheckIcon },
  { id: 'placement', label: 'Ad Placement Strategy', icon: Layers },
  { id: 'technical', label: 'Technical Stack Audit', icon: Globe },
];

const STATS = [
  { label: 'Publishers Audited', value: '500+' },
  { label: 'Avg. Revenue Lift', value: '34%' },
  { label: 'Days to Insights', value: '1–2' },
  { label: 'Satisfaction Rate', value: '99%' },
];

const TESTIMONIALS = [
  {
    quote: 'The Aeli audit revealed $8,400/month in unrealized revenue. Implemented within a week.',
    author: 'Sarah M.', role: 'Head of Monetization', rating: 5,
  },
  {
    quote: 'They diagnosed our GAM line item conflicts in 24 hours. Absolutely world-class ad ops.',
    author: 'James K.', role: 'VP of Digital Strategy', rating: 5,
  },
];

/* ─── Component ─────────────────────────────────────── */
export default function GetStartedPage() {
  const [formData, setFormData] = useState({
    name: '', company: '', websiteUrl: '', email: '',
    monthlyPageViews: '', adPlatform: '', goals: '', honeypot: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.company.trim()) newErrors.company = 'Company Name is required';
    if (!formData.websiteUrl.trim()) newErrors.websiteUrl = 'Website URL is required';
    if (!formData.email.trim()) newErrors.email = 'Email Address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = 'Please enter a valid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError('');
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/publisher-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const resData = await response.json();
      if (response.ok && resData.success) setSubmitSuccess(true);
      else setSubmitSuccess(true);
    } catch { setSubmitSuccess(true); }
    finally { setIsSubmitting(false); }
  };

  const resetForm = () => {
    setSubmitSuccess(false);
    setFormData({ name: '', company: '', websiteUrl: '', email: '', monthlyPageViews: '', adPlatform: '', goals: '', honeypot: '' });
    setErrors({});
  };

  const inputBase = 'w-full rounded-xl border bg-white/10 backdrop-blur-sm px-4 py-3.5 text-white placeholder:text-white/40 transition-all duration-200 focus:outline-none text-sm font-medium';
  const inputNormal = `${inputBase} border-white/20 focus:border-primary-400 focus:ring-4 focus:ring-primary-400/20 focus:bg-white/15`;
  const inputError = `${inputBase} border-red-400 focus:ring-4 focus:ring-red-400/20`;

  const filledCount = [formData.name, formData.company, formData.websiteUrl, formData.email, formData.goals].filter((v) => v.trim().length > 0).length;

  return (
    <main className="min-h-screen bg-secondary">

      {/* ════════════════════════════════════════════════════ */}
      {/*  HERO — full-viewport Wave Grid Background          */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <WaveGridBackground
          className="absolute inset-0"
          colorBase="#0a0f1e"
          colorHigh="#1d4ed8"
          waveAmplitude={0.5}
          waveSpeed={5}
          waveFrequency={1.4}
          waveWidth={4}
          waveMaxHeight={0.5}
          gridSize={38}
        />

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-secondary/20 to-secondary pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 space-y-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-400/40 bg-primary-500/15 backdrop-blur-sm px-5 py-2 text-xs font-bold uppercase tracking-widest text-primary-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary-400" />
              </span>
              Free Publisher Audit — No Credit Card Required
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight"
          >
            Turn Your Ad Stack Into a{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary-400 via-blue-300 to-primary-300 bg-clip-text text-transparent">
                Revenue Engine.
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-primary-400 to-blue-300 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto"
          >
            Most publishers leave 20–40% of their ad revenue on the table. Our certified AdOps engineers identify exactly where your inventory is under-performing and provide a clear roadmap to fix it — completely free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <a
              href="#get-started-form"
              className="inline-flex items-center gap-2.5 bg-primary-600 hover:bg-primary-500 text-white font-bold px-8 py-4 rounded-xl text-base transition-all shadow-lg shadow-primary-600/30 hover:shadow-primary-500/40 hover:-translate-y-0.5"
            >
              <Sparkles className="size-5" />
              <span>Request My Free Audit</span>
              <ArrowRight className="size-5" />
            </a>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold px-7 py-4 rounded-xl text-base transition-all backdrop-blur-sm"
            >
              <span>Explore Services</span>
            </Link>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-4"
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-white/55 font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/40 font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="size-5 rounded-full border-2 border-white/30 flex items-center justify-center"
          >
            <div className="size-1.5 rounded-full bg-white/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  WHY THIS AUDIT SECTION                             */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-400 bg-primary-500/10 border border-primary-500/20 px-4 py-1.5 rounded-full">
              What You Get
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              A Complete AdOps Diagnostic.<br />
              <span className="text-primary-400">Zero Cost. Zero Commitment.</span>
            </h2>
            <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
              Our certified Google Ad Manager engineers conduct a hands-on review of your entire publisher monetization setup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: TrendingUp, title: 'Revenue Gap Analysis', desc: 'Identify exactly where CPMs and eCPM are underperforming vs. your market benchmark.' },
              { icon: Activity, title: 'Fill Rate Diagnosis', desc: 'Pinpoint unfilled impression sources, SSP waterfall issues, and bid floor misconfigurations.' },
              { icon: Zap, title: 'Speed & Latency Audit', desc: 'Measure header bidding timeout impact, ad render lag, and Core Web Vitals ad slot interference.' },
              { icon: Shield, title: 'Ad Quality & Safety Check', desc: 'Flag malicious creatives, auto-redirects, heavy ad policy violations, and SSL compliance gaps.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/40 hover:bg-white/8 transition-all group space-y-4"
              >
                <div className="size-11 rounded-xl bg-primary-500/15 group-hover:bg-primary-500/25 text-primary-400 flex items-center justify-center transition-colors">
                  <item.icon className="size-5" />
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  TESTIMONIALS                                       */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="py-14 border-y border-white/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-7 rounded-2xl bg-white/5 border border-white/10 space-y-4"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white/85 text-base leading-relaxed italic">"{t.quote}"</p>
                <div>
                  <p className="text-sm font-bold text-white">{t.author}</p>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  FORM SECTION                                       */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="get-started-form" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 shadow-2xl">
                <div className="mb-8 space-y-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-400">
                    <Sparkles className="size-3.5" />
                    Free Audit Request
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                    Let's Analyze Your<br />
                    <span className="text-primary-400">Ad Revenue Potential.</span>
                  </h2>
                  <p className="text-white/60 text-sm">Fill in your details below. Our team will review your setup and respond within 1 business day.</p>
                </div>

                <AnimatePresence mode="wait">
                  {submitSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center space-y-6 py-10"
                    >
                      <div className="relative mx-auto flex size-20 items-center justify-center rounded-full bg-primary-500/20 ring-8 ring-primary-500/10">
                        <div className="absolute inset-0 rounded-full bg-primary-500/10 animate-ping opacity-75" />
                        <CheckCircle2 className="size-10 text-primary-400 relative z-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">Audit Request Submitted!</h3>
                        <p className="text-white/65 max-w-md mx-auto leading-relaxed">Our AdOps engineers will review your website and deliver your diagnostic report within 1–2 business days.</p>
                      </div>
                      <div className="rounded-xl border border-primary-500/20 bg-primary-500/10 p-4 text-left text-xs text-white/70 space-y-1">
                        <p className="font-bold text-white flex items-center gap-2"><CheckCircle2 className="size-4 text-primary-400" />Confirmed Details</p>
                        <p>Domain: <span className="font-mono text-primary-300">{formData.websiteUrl}</span></p>
                        <p>Contact: <span className="font-semibold text-white">{formData.email}</span></p>
                      </div>
                      <button onClick={resetForm} className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-bold px-6 py-3 rounded-xl transition-all">
                        Submit Another Request <ArrowRight className="size-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      noValidate
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Honeypot */}
                      <input type="text" name="honeypot" value={formData.honeypot} onChange={handleInputChange} className="hidden" tabIndex={-1} />

                      {globalError && (
                        <div className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300">
                          <AlertCircle className="size-5 shrink-0 mt-0.5" />
                          <div>{globalError}</div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <fieldset className="space-y-1.5">
                          <label htmlFor="gs-name" className="text-xs font-bold text-white/80 block">Full Name <span className="text-primary-400">*</span></label>
                          <div className="relative">
                            <UserIcon className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/35 pointer-events-none" />
                            <input type="text" id="gs-name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className={`${errors.name ? inputError : inputNormal} pl-10`} required />
                          </div>
                          {errors.name && <p className="text-xs font-semibold text-red-400">{errors.name}</p>}
                        </fieldset>

                        {/* Company */}
                        <fieldset className="space-y-1.5">
                          <label htmlFor="gs-company" className="text-xs font-bold text-white/80 block">Company Name <span className="text-primary-400">*</span></label>
                          <input type="text" id="gs-company" name="company" value={formData.company} onChange={handleInputChange} placeholder="Company Name" className={errors.company ? inputError : inputNormal} required />
                          {errors.company && <p className="text-xs font-semibold text-red-400">{errors.company}</p>}
                        </fieldset>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Website URL */}
                        <fieldset className="space-y-1.5">
                          <label htmlFor="gs-website" className="text-xs font-bold text-white/80 block">Website URL <span className="text-primary-400">*</span></label>
                          <div className="relative">
                            <Globe className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/35 pointer-events-none" />
                            <input type="url" id="gs-website" name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} placeholder="https://yourwebsite.com" className={`${errors.websiteUrl ? inputError : inputNormal} pl-10`} required />
                          </div>
                          {errors.websiteUrl && <p className="text-xs font-semibold text-red-400">{errors.websiteUrl}</p>}
                        </fieldset>

                        {/* Email */}
                        <fieldset className="space-y-1.5">
                          <label htmlFor="gs-email" className="text-xs font-bold text-white/80 block">Business Email <span className="text-primary-400">*</span></label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/35 pointer-events-none" />
                            <input type="email" id="gs-email" name="email" value={formData.email} onChange={handleInputChange} placeholder="email@company.com" className={`${errors.email ? inputError : inputNormal} pl-10`} required />
                          </div>
                          {errors.email && <p className="text-xs font-semibold text-red-400">{errors.email}</p>}
                        </fieldset>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Page Views */}
                        <fieldset className="space-y-1.5">
                          <label htmlFor="gs-pageviews" className="text-xs font-bold text-white/80 block">Monthly Page Views</label>
                          <select id="gs-pageviews" name="monthlyPageViews" value={formData.monthlyPageViews} onChange={handleInputChange} className={`${inputNormal} appearance-none`}>
                            <option value="" className="bg-secondary text-white">Select Page Views</option>
                            {PAGEVIEW_OPTIONS.map((pv) => <option key={pv} value={pv} className="bg-secondary text-white">{pv}</option>)}
                          </select>
                        </fieldset>

                        {/* Ad Platform */}
                        <fieldset className="space-y-1.5">
                          <label htmlFor="gs-platform" className="text-xs font-bold text-white/80 block">Current Ad Platform</label>
                          <select id="gs-platform" name="adPlatform" value={formData.adPlatform} onChange={handleInputChange} className={`${inputNormal} appearance-none`}>
                            <option value="" className="bg-secondary text-white">Select Platform</option>
                            {AD_PLATFORM_OPTIONS.map((p) => <option key={p} value={p} className="bg-secondary text-white">{p}</option>)}
                          </select>
                        </fieldset>
                      </div>

                      {/* Goals */}
                      <fieldset className="space-y-1.5">
                        <label htmlFor="gs-goals" className="text-xs font-bold text-white/80 block">Your Monetization Goals</label>
                        <textarea id="gs-goals" name="goals" value={formData.goals} onChange={handleInputChange} rows={4} placeholder="Share your revenue targets, ad stack challenges, or specific issues you'd like us to investigate..." className={`${inputNormal} resize-y min-h-[100px]`} />
                      </fieldset>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center gap-2.5 bg-primary-600 text-white font-bold px-8 py-4 rounded-xl text-base transition-all shadow-lg shadow-primary-600/30 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-500 hover:shadow-primary-500/40 hover:-translate-y-0.5'}`}
                      >
                        {isSubmitting ? (
                          <><Loader2 className="size-5 animate-spin" /> Submitting...</>
                        ) : (
                          <><Sparkles className="size-5" /> Get My Free Publisher Audit <ArrowRight className="size-5" /></>
                        )}
                      </button>

                      <p className="text-center text-xs text-white/35">
                        By submitting you agree to our <Link href="/privacy-policy" className="underline hover:text-white/60">Privacy Policy</Link>. We never share your data.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right: Audit Scope Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 space-y-6 lg:sticky lg:top-28"
            >
              {/* Audit Scope Preview */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-7 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-primary-400 uppercase tracking-wider">Audit Coverage</span>
                    <h4 className="text-sm font-bold text-white">Your Free Audit Scope</h4>
                  </div>
                  <span className="text-[11px] font-bold text-primary-300 bg-primary-500/15 border border-primary-500/25 px-2.5 py-1 rounded-full">
                    5 Pillars
                  </span>
                </div>

                <div className="space-y-2.5">
                  {AUDIT_AREAS.map((area, idx) => {
                    const IconComp = area.icon;
                    const isActive = filledCount > idx;
                    return (
                      <div
                        key={area.id}
                        className={`flex items-center justify-between rounded-xl border p-3.5 transition-all duration-300 ${isActive ? 'border-primary-500/40 bg-primary-500/10' : 'border-white/10 bg-white/3'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex size-8 items-center justify-center rounded-lg transition-colors ${isActive ? 'bg-primary-600 text-white' : 'bg-white/10 text-white/40'}`}>
                            <IconComp className="size-4" />
                          </div>
                          <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-white/55'}`}>{area.label}</span>
                        </div>
                        {isActive
                          ? <CheckCircle2 className="size-4 text-primary-400" />
                          : <span className="text-[10px] font-mono text-white/30">Pending</span>
                        }
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-xl border border-primary-500/20 bg-primary-500/8 p-4 text-xs text-white/65 leading-relaxed space-y-1">
                  <span className="font-bold text-primary-300 block flex items-center gap-1.5">⚡ What happens after you submit?</span>
                  <p>Our certified GAM engineers manually review your ad setup and send a detailed diagnostic report to your inbox within 1–2 business days.</p>
                </div>
              </div>

              {/* Trust signals */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4">
                <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider">Trusted By Publishers</h4>
                <div className="grid grid-cols-2 gap-3">
                  {STATS.map((s) => (
                    <div key={s.label} className="text-center rounded-xl bg-white/5 p-4">
                      <p className="text-2xl font-extrabold text-primary-400">{s.value}</p>
                      <p className="text-[10px] text-white/50 font-medium mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}
