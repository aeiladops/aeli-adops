'use client';

import RevealAnimation from '@/src/components/animation/reveal-animation';
import { ButtonPrimary } from '@/src/components/shared/ui/button';
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
  Phone,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* ─── SVG Icons ─────────────────────────────────────────────────── */
const ChevronLeft = ({ className = 'size-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);
const User = ({ className = 'size-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);


/* ─── Data ──────────────────────────────────────────────────────── */
const SERVICES = [
  'Yield Optimization',
  'Google Ad Manager Management',
  'Ad Operations Support',
  'Programmatic Advertising Solutions',
  'Publisher Technical Support',
  'Website Monetization & Optimization',
  'Publisher Health Check',
  'Free Publisher Audit',
  'Other',
];

const AD_PLATFORM_OPTIONS = [
  { value: 'Google Ad Manager', label: 'Google Ad Manager' },
  { value: 'Google AdSense', label: 'Google AdSense' },
  { value: 'Google Ad Manager + AdSense', label: 'Google Ad Manager + AdSense' },
  { value: 'Other', label: 'Other' },
  { value: 'Not Sure', label: 'Not Sure' },
];

const PAGEVIEW_OPTIONS = [
  { value: 'Less than 100K', label: 'Less than 100K' },
  { value: '100K – 500K', label: '100K – 500K' },
  { value: '500K – 1 Million', label: '500K – 1 Million' },
  { value: '1M – 5 Million', label: '1M – 5 Million' },
  { value: '5M – 10 Million', label: '5M – 10 Million' },
  { value: 'More than 10 Million', label: 'More than 10 Million' },
];

const WEBSITE_CATEGORIES = [
  'News', 'Business & Finance', 'Sports', 'Entertainment',
  'Technology', 'Education', 'Lifestyle', 'Gaming', 'Other',
];

const CONTACT_METHODS = [
  { value: 'Email', icon: <Mail className="size-4" /> },
  { value: 'Phone', icon: <Phone className="size-4" /> },
  { value: 'WhatsApp', icon: <span className="text-sm">💬</span> },
  { value: 'Google Meet', icon: <span className="text-sm">📹</span> },
];

const AUDIT_AREAS = [
  { id: 'revenue', label: 'Revenue Performance', icon: BarChart3 },
  { id: 'fill', label: 'Fill Rate Analysis', icon: Activity },
  { id: 'viewability', label: 'Viewability Review', icon: ShieldCheckIcon },
  { id: 'placement', label: 'Ad Placement Review', icon: Layers },
  { id: 'technical', label: 'Technical Review', icon: Globe },
];

const STEPS = [
  { num: 1, label: 'About Your Website' },
  { num: 2, label: 'Your Requirements' },
  { num: 3, label: 'Contact Details' },
];

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir < 0 ? 40 : -40 }),
};

/* ─── Component ─────────────────────────────────────────────────── */
export default function PublisherAuditForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  const [formData, setFormData] = useState({
    /* Step 1 */
    services: [] as string[],
    adPlatform: '',
    monthlyPageViews: '',
    websiteCategory: '',
    /* Step 2 */
    requirements: '',
    /* Step 3 */
    name: '',
    email: '',
    phone: '',
    websiteUrl: '',
    contactMethod: 'Email',
    agreedToContact: false,
    /* Anti-spam */
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [globalError, setGlobalError] = useState('');

  /* ── Helpers ──────────────────────────────────────────────────── */
  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
    if (errors.services) setErrors((prev) => ({ ...prev, services: '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /* ── Step Validation ──────────────────────────────────────────── */
  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (s === 1) {
      if (formData.services.length === 0) newErrors.services = 'Please select at least one service';
      if (!formData.adPlatform) newErrors.adPlatform = 'Please select your ad platform';
      if (!formData.monthlyPageViews) newErrors.monthlyPageViews = 'Please select monthly page views';
      if (!formData.websiteCategory) newErrors.websiteCategory = 'Please select a website category';
    }
    if (s === 2) {
      if (!formData.requirements.trim()) newErrors.requirements = 'Please describe your requirements';
    }
    if (s === 3) {
      if (!formData.name.trim()) newErrors.name = 'Full Name is required';
      if (!formData.email.trim()) newErrors.email = 'Business Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = 'Please enter a valid email';
      if (!formData.phone.trim()) newErrors.phone = 'Phone / WhatsApp is required';
      if (!formData.websiteUrl.trim()) newErrors.websiteUrl = 'Website URL is required';
      if (!formData.agreedToContact) newErrors.agreedToContact = 'You must agree to be contacted';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
    setErrors({});
  };

  /* ── Submit ───────────────────────────────────────────────────── */
  const [submittedLeadId, setSubmittedLeadId] = useState('');
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError('');
    if (!validateStep(3)) return;
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        company: 'Individual Publisher',
        website: formData.websiteUrl,
        websiteUrl: formData.websiteUrl,
        email: formData.email,
        phone: formData.phone,
        category: formData.websiteCategory,
        monthlyPageviews: formData.monthlyPageViews,
        monthlyPageViews: formData.monthlyPageViews,
        audienceGeography: 'Global',
        monetisationSetup: [formData.adPlatform],
        adPlatform: formData.adPlatform,
        areasToImprove: formData.services.length > 0 ? formData.services : ['Free Publisher Audit'],
        additionalInfo: `Requirements: ${formData.requirements}. Contact via: ${formData.contactMethod}.`,
        honeypot: formData.honeypot,
      };

      const response = await fetch('/api/publisher-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        if (resData.leadId) setSubmittedLeadId(resData.leadId);
        if (resData.whatsappUrl) {
          setWhatsappRedirectUrl(resData.whatsappUrl);
          window.open(resData.whatsappUrl, '_blank');
        }
        setSubmitSuccess(true);
      } else {
        const errStr = resData.error || (resData.errors ? Object.values(resData.errors).join(', ') : 'Failed to submit form.');
        setGlobalError(errStr);
      }
    } catch {
      setGlobalError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitSuccess(false);
    setWhatsappRedirectUrl('');
    setStep(1);
    setDirection(1);
    setFormData({
      services: [], adPlatform: '', monthlyPageViews: '', websiteCategory: '',
      requirements: '', name: '', email: '', phone: '', websiteUrl: '',
      contactMethod: 'Email', agreedToContact: false, honeypot: '',
    });
    setErrors({});
  };

  /* ── Style tokens (match original design exactly) ─────────────── */
  const inputBase = 'w-full rounded-xl border bg-white px-4 py-3.5 text-secondary placeholder:text-secondary/40 transition-all duration-200 focus:outline-none font-inter-tight text-sm';
  const inputNormal = `${inputBase} border-secondary/20 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10`;
  const inputError = `${inputBase} border-red-500 focus:ring-4 focus:ring-red-500/10`;

  /* ── Right panel: completion progress ─────────────────────────── */
  const filledFieldsCount = [
    formData.services.length > 0,
    !!formData.adPlatform,
    !!formData.monthlyPageViews,
    !!formData.requirements.trim(),
    !!formData.name.trim(),
  ].filter(Boolean).length;

  /* ──────────────────────────────────────────────────────────────── */
  return (
    <div id="audit-request-form" className="w-full">
      {submitSuccess ? (
        /* ─── SUCCESS ─── */
        <RevealAnimation delay={0.1} instant>
          <div className="mx-auto max-w-xl text-center space-y-8 py-8 md:py-12">
            <div className="relative mx-auto flex size-24 items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-8 ring-primary-50/60">
              <div className="absolute inset-0 rounded-full bg-primary-500/10 animate-ping opacity-75" />
              <CheckCircle2 className="size-12 stroke-[2.2] relative z-10 text-primary-600" />
            </div>
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-800">
                <Sparkles className="size-3.5" /> Request Submitted & Logged in CRM
              </span>
              <h3 className="text-heading-3 font-bold text-secondary">Thank You!</h3>
              <p className="text-tagline-1 text-secondary/70 leading-relaxed max-w-md mx-auto">
                Your audit details have been sent directly to our CRM portal and WhatsApp (+91 7095185429).
              </p>
            </div>
            <div className="rounded-2xl border border-primary-100 bg-primary-50/40 p-5 text-left space-y-2 text-xs text-secondary/70">
              <div className="font-bold text-secondary flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary-600" /> Request Logged (CRM)
                </span>
                {submittedLeadId && (
                  <span className="font-mono bg-primary-100 text-primary-800 px-2 py-0.5 rounded text-[11px] font-bold">
                    Ref ID: {submittedLeadId}
                  </span>
                )}
              </div>
              <p>Services: <span className="font-semibold text-secondary">{formData.services.slice(0, 3).join(', ')}{formData.services.length > 3 ? ` +${formData.services.length - 3} more` : ''}</span></p>
              <p>Contact Email: <span className="font-semibold text-secondary">{formData.email}</span></p>
              <p>Website: <span className="font-mono text-secondary">{formData.websiteUrl}</span></p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              {whatsappRedirectUrl && (
                <a
                  href={whatsappRedirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  <span>💬 Continue on WhatsApp (+91 7095185429)</span>
                </a>
              )}
              <ButtonPrimary onClick={resetForm} className="w-full sm:w-auto px-6 py-3.5">
                Submit Another Request →
              </ButtonPrimary>
            </div>
          </div>
        </RevealAnimation>
      ) : (
        /* ─── FORM ─── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Multi-step Form */}
          <div className="lg:col-span-7 space-y-6">

            {/* Step progress header */}
            <div className="border-b border-secondary/10 pb-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-heading-4 font-bold text-secondary">
                    {step === 1 && 'About Your Website'}
                    {step === 2 && 'Your Requirements'}
                    {step === 3 && 'Contact Details'}
                  </h3>
                  <p className="text-xs text-secondary/60 mt-0.5">Step {step} of 3</p>
                </div>
                <div className="flex items-center gap-2">
                  {STEPS.map((s) => (
                    <div key={s.num} className="flex items-center gap-1.5">
                      <div className={`flex size-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${step > s.num ? 'bg-primary-600 text-white' : step === s.num ? 'bg-secondary text-white ring-4 ring-secondary/20' : 'bg-secondary/10 text-secondary/40'}`}>
                        {step > s.num ? <CheckCircle2 className="size-4" /> : s.num}
                      </div>
                      {s.num < 3 && <div className={`h-0.5 w-6 rounded-full transition-all duration-500 ${step > s.num ? 'bg-primary-600' : 'bg-secondary/15'}`} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full rounded-full bg-secondary/8 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </div>
            </div>

            {/* Honeypot */}
            <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} className="hidden" tabIndex={-1} />

            {globalError && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle className="size-5 shrink-0 text-red-500 mt-0.5" />
                <div>{globalError}</div>
              </div>
            )}

            {/* Animated step panels */}
            <div className="relative overflow-hidden min-h-[420px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {/* ──────────────── STEP 1 ──────────────── */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-6"
                  >
                    {/* Service Selection */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-secondary block mb-0.5">
                          Services You&apos;re Interested In <span className="text-primary-600">*</span>
                        </label>
                        <p className="text-[11px] text-secondary/50">Select one or more options</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {SERVICES.map((svc) => {
                          const selected = formData.services.includes(svc);
                          return (
                            <button
                              key={svc}
                              type="button"
                              onClick={() => toggleService(svc)}
                              className={`text-left px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 flex items-center gap-2.5 cursor-pointer ${selected ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm' : 'border-secondary/20 bg-white text-secondary/70 hover:border-secondary/40 hover:text-secondary'}`}
                            >
                              <span className={`flex size-4 shrink-0 items-center justify-center rounded border transition-colors ${selected ? 'border-primary-500 bg-primary-500' : 'border-secondary/25 bg-white'}`}>
                                {selected && <CheckCircle2 className="size-3 text-white" />}
                              </span>
                              {svc}
                            </button>
                          );
                        })}
                      </div>
                      {errors.services && <p className="text-xs font-semibold text-red-500">{errors.services}</p>}
                    </div>

                    <div className="h-px bg-secondary/8" />

                    {/* Ad Platform */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary block">
                        Current Ad Platform <span className="text-primary-600">*</span>
                      </label>
                      <p className="text-[11px] text-secondary/50">Select your current monetization platform</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {AD_PLATFORM_OPTIONS.map((opt) => {
                          const selected = formData.adPlatform === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => { setFormData((p) => ({ ...p, adPlatform: opt.value })); if (errors.adPlatform) setErrors((e) => ({ ...e, adPlatform: '' })); }}
                              className={`text-left px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 flex items-center gap-2.5 cursor-pointer ${selected ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm' : 'border-secondary/20 bg-white text-secondary/70 hover:border-secondary/40 hover:text-secondary'}`}
                            >
                              <span className={`flex size-4 shrink-0 rounded-full border-2 transition-colors ${selected ? 'border-primary-500 bg-primary-500' : 'border-secondary/30'}`}>
                                {selected && <span className="m-auto size-1.5 rounded-full bg-white block" />}
                              </span>
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                      {errors.adPlatform && <p className="text-xs font-semibold text-red-500">{errors.adPlatform}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Monthly Page Views */}
                      <fieldset className="space-y-1.5">
                        <label htmlFor="monthlyPageViews" className="text-xs font-bold text-secondary block">
                          Monthly Page Views <span className="text-primary-600">*</span>
                        </label>
                        <p className="text-[11px] text-secondary/50">Help us understand your traffic</p>
                        <select id="monthlyPageViews" name="monthlyPageViews" value={formData.monthlyPageViews} onChange={handleChange} className={errors.monthlyPageViews ? inputError : inputNormal}>
                          <option value="">Select Page Views</option>
                          {PAGEVIEW_OPTIONS.map((pv) => <option key={pv.value} value={pv.value}>{pv.label}</option>)}
                        </select>
                        {errors.monthlyPageViews && <p className="text-xs font-semibold text-red-500">{errors.monthlyPageViews}</p>}
                      </fieldset>

                      {/* Website Category */}
                      <fieldset className="space-y-1.5">
                        <label htmlFor="websiteCategory" className="text-xs font-bold text-secondary block">
                          Website Category <span className="text-primary-600">*</span>
                        </label>
                        <p className="text-[11px] text-secondary/50">Select your primary content category</p>
                        <select id="websiteCategory" name="websiteCategory" value={formData.websiteCategory} onChange={handleChange} className={errors.websiteCategory ? inputError : inputNormal}>
                          <option value="">Select Category</option>
                          {WEBSITE_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        {errors.websiteCategory && <p className="text-xs font-semibold text-red-500">{errors.websiteCategory}</p>}
                      </fieldset>
                    </div>
                  </motion.div>
                )}

                {/* ──────────────── STEP 2 ──────────────── */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-5"
                  >
                    <div className="rounded-2xl border border-secondary/10 bg-secondary/[0.02] p-5 space-y-2">
                      <p className="text-xs font-bold text-secondary">How can we help?</p>
                      <p className="text-[11px] text-secondary/60 leading-relaxed">
                        Describe your current setup, the challenges you&apos;re facing, or what you&apos;d like to achieve. The more details you provide, the better we can understand your needs.
                      </p>
                    </div>

                    <fieldset className="space-y-1.5">
                      <label htmlFor="requirements" className="text-xs font-bold text-secondary block">
                        Describe your monetization goals or challenges <span className="text-primary-600">*</span>
                      </label>
                      <textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        rows={7}
                        placeholder="e.g. We're looking to improve ad revenue, optimize our Google Ad Manager setup, troubleshoot delivery issues, or explore better monetization opportunities."
                        className={`${errors.requirements ? inputError : inputNormal} resize-y min-h-[180px]`}
                      />
                      {errors.requirements && <p className="text-xs font-semibold text-red-500">{errors.requirements}</p>}
                    </fieldset>

                    <div className="rounded-xl border border-primary-100 bg-primary-50/60 p-4 text-xs text-secondary/70 leading-relaxed">
                      <p className="font-bold text-secondary mb-1">💡 Example</p>
                      <p className="italic text-secondary/60">
                        &ldquo;We&apos;re looking to improve ad revenue, optimize our Google Ad Manager setup, troubleshoot delivery issues, or explore better monetization opportunities.&rdquo;
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ──────────────── STEP 3 ──────────────── */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-5"
                  >
                    <p className="text-xs text-secondary/60">Provide your contact details so our team can follow up with you.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <fieldset className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-bold text-secondary block">
                          Full Name <span className="text-primary-600">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-secondary/40 pointer-events-none" />
                          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Rahul Sharma" className={`${errors.name ? inputError : inputNormal} pl-10`} />
                        </div>
                        {errors.name && <p className="text-xs font-semibold text-red-500">{errors.name}</p>}
                      </fieldset>

                      {/* Business Email */}
                      <fieldset className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-bold text-secondary block">
                          Business Email <span className="text-primary-600">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-secondary/40 pointer-events-none" />
                          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="rahul@company.com" className={`${errors.email ? inputError : inputNormal} pl-10`} />
                        </div>
                        {errors.email && <p className="text-xs font-semibold text-red-500">{errors.email}</p>}
                      </fieldset>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Phone */}
                      <fieldset className="space-y-1.5">
                        <label htmlFor="phone" className="text-xs font-bold text-secondary block">
                          Phone / WhatsApp <span className="text-primary-600">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-secondary/40 pointer-events-none" />
                          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={`${errors.phone ? inputError : inputNormal} pl-10`} />
                        </div>
                        {errors.phone && <p className="text-xs font-semibold text-red-500">{errors.phone}</p>}
                      </fieldset>

                      {/* Website URL */}
                      <fieldset className="space-y-1.5">
                        <label htmlFor="websiteUrl" className="text-xs font-bold text-secondary block">
                          Website URL <span className="text-primary-600">*</span>
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-secondary/40 pointer-events-none" />
                          <input type="url" id="websiteUrl" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} placeholder="https://www.yourwebsite.com" className={`${errors.websiteUrl ? inputError : inputNormal} pl-10`} />
                        </div>
                        {errors.websiteUrl && <p className="text-xs font-semibold text-red-500">{errors.websiteUrl}</p>}
                      </fieldset>
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary block">Preferred Contact Method</label>
                      <p className="text-[11px] text-secondary/50">How would you like us to contact you?</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {CONTACT_METHODS.map((m) => {
                          const selected = formData.contactMethod === m.value;
                          return (
                            <button
                              key={m.value}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, contactMethod: m.value }))}
                              className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${selected ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm' : 'border-secondary/20 bg-white text-secondary/70 hover:border-secondary/40'}`}
                            >
                              {m.icon}
                              {m.value}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Agreement */}
                    <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${errors.agreedToContact ? 'border-red-200 bg-red-50' : 'border-secondary/15 bg-secondary/[0.02] hover:border-secondary/30'}`}>
                      <div className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${formData.agreedToContact ? 'border-primary-600 bg-primary-600' : 'border-secondary/30 bg-white'}`}>
                        {formData.agreedToContact && <CheckCircle2 className="size-3.5 text-white" />}
                      </div>
                      <input type="checkbox" name="agreedToContact" checked={formData.agreedToContact} onChange={handleChange} className="sr-only" />
                      <span className="text-xs text-secondary/75 leading-relaxed">
                        I agree to be contacted by <span className="font-semibold text-secondary">Aeli AdOps</span> regarding my inquiry.
                      </span>
                    </label>
                    {errors.agreedToContact && <p className="text-xs font-semibold text-red-500 -mt-2">{errors.agreedToContact}</p>}

                    {/* Final CTA info */}
                    <div className="rounded-2xl border border-secondary/10 bg-secondary/[0.02] p-5 space-y-1.5">
                      <p className="text-xs font-bold text-secondary">Ready to Get Started?</p>
                      <p className="text-[11px] text-secondary/60 leading-relaxed">
                        Our team will review your request and reach out with the next steps. Whether you need technical support, monetization guidance, or a complete Ad Operations partner, we&apos;re here to help you succeed.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className={`flex items-center gap-3 pt-2 ${step > 1 ? 'justify-between' : 'justify-end'}`}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-2 rounded-xl border border-secondary/20 bg-white px-5 py-3 text-sm font-semibold text-secondary transition-all hover:border-secondary/40 hover:bg-secondary/5"
                >
                  <ChevronLeft className="size-4" /> Back
                </button>
              )}

              {step < 3 ? (
                <ButtonPrimary
                  type="button"
                  onClick={goNext}
                  className="px-7 py-3.5 font-bold flex items-center gap-2"
                >
                  Continue <ArrowRight className="size-4" />
                </ButtonPrimary>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex justify-end">
                  <ButtonPrimary
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-7 py-3.5 font-bold flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="size-5 animate-spin" /> Submitting...</>
                    ) : (
                      <>Request Service <ArrowRight className="size-5" /></>
                    )}
                  </ButtonPrimary>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT: Audit Summary Panel (unchanged design) */}
          <div className="lg:col-span-5 rounded-2xl border border-secondary/10 bg-secondary/[0.02] p-6 space-y-6">
            <div className="border-b border-secondary/10 pb-3 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">Audit Summary Preview</span>
                <h4 className="text-sm font-bold text-secondary">Your Free Audit Scope</h4>
              </div>
              <div className="text-[11px] font-bold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full border border-primary-200">
                5 Pillars Covered
              </div>
            </div>

            <div className="space-y-3">
              {AUDIT_AREAS.map((area, idx) => {
                const IconComp = area.icon;
                const isActivated = filledFieldsCount > idx;
                return (
                  <div
                    key={area.id}
                    className={`flex items-center justify-between rounded-xl border p-3.5 transition-all duration-300 ${isActivated ? 'border-primary-400 bg-primary-50/80 shadow-xs' : 'border-secondary/10 bg-white text-secondary/60'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex size-8 items-center justify-center rounded-lg ${isActivated ? 'bg-primary-600 text-white' : 'bg-secondary/10 text-secondary/40'}`}>
                        <IconComp className="size-4" />
                      </div>
                      <span className={`text-xs font-bold ${isActivated ? 'text-primary-950' : 'text-secondary/70'}`}>
                        {area.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isActivated ? (
                        <CheckCircle2 className="size-4 text-primary-600" />
                      ) : (
                        <span className="text-[10px] font-mono text-secondary/40">Pending</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected services summary */}
            {formData.services.length > 0 && (
              <div className="rounded-xl border border-primary-100 bg-primary-50/40 p-4 space-y-2">
                <p className="text-[10px] font-bold text-primary-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5" /> Selected Services
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {formData.services.map((s) => (
                    <span key={s} className="text-[10px] font-semibold bg-primary-100 text-primary-800 border border-primary-200 px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-xl border border-primary-100 bg-white p-4 text-xs text-secondary/70 leading-relaxed space-y-1">
              <span className="font-bold text-secondary block">⚡ What happens next?</span>
              <p>Our engineering team will conduct a manual review of your monetization setup and deliver your diagnostic report via email.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
