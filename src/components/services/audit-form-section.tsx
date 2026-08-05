'use client';

import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { ButtonPrimary } from '@/src/components/shared/ui/button';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe,
  Headphones,
  Layers,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  Video,
  Wrench,
} from 'lucide-react';
import { forwardRef, useState } from 'react';

/* ─────────── Data Arrays ─────────── */

const SERVICE_OPTIONS = [
  { id: 'Yield Optimization', label: 'Yield Optimization', icon: TrendingUp },
  { id: 'Google Ad Manager Management', label: 'Google Ad Manager Management', icon: Layers },
  { id: 'Ad Operations Support', label: 'Ad Operations Support', icon: Headphones },
  { id: 'Programmatic Advertising Solutions', label: 'Programmatic Advertising Solutions', icon: Globe },
  { id: 'Publisher Technical Support', label: 'Publisher Technical Support', icon: Wrench },
  { id: 'Website Monetization & Optimization', label: 'Website Monetization & Optimization', icon: BarChart3 },
  { id: 'Publisher Health Check', label: 'Publisher Health Check', icon: Activity },
  { id: 'Free Publisher Audit', label: 'Free Publisher Audit', icon: Search },
  { id: 'Other', label: 'Other', icon: Sparkles },
];

const AD_PLATFORM_OPTIONS = [
  { id: 'Google Ad Manager', label: 'Google Ad Manager', icon: Layers },
  { id: 'Google AdSense', label: 'Google AdSense', icon: BarChart3 },
  { id: 'Google Ad Manager + AdSense', label: 'Google Ad Manager + AdSense', icon: TrendingUp },
  { id: 'Other', label: 'Other', icon: Sparkles },
  { id: 'Not Sure', label: 'Not Sure', icon: Activity },
];

const PAGEVIEW_OPTIONS = [
  { id: 'Less than 100K', label: 'Less than 100K', scale: 1 },
  { id: '100K – 500K', label: '100K – 500K', scale: 2 },
  { id: '500K – 1 Million', label: '500K – 1 Million', scale: 3 },
  { id: '1M – 5 Million', label: '1M – 5 Million', scale: 4 },
  { id: '5M – 10 Million', label: '5M – 10 Million', scale: 5 },
  { id: 'More than 10 Million', label: 'More than 10 Million', scale: 6 },
];

const CATEGORY_OPTIONS = [
  { id: 'News', label: 'News', icon: Globe },
  { id: 'Business & Finance', label: 'Business & Finance', icon: TrendingUp },
  { id: 'Sports', label: 'Sports', icon: Activity },
  { id: 'Entertainment', label: 'Entertainment', icon: Video },
  { id: 'Technology', label: 'Technology', icon: Wrench },
  { id: 'Education', label: 'Education', icon: Search },
  { id: 'Lifestyle', label: 'Lifestyle', icon: Sparkles },
  { id: 'Gaming', label: 'Gaming', icon: Layers },
  { id: 'Other', label: 'Other', icon: BarChart3 },
];

const CONTACT_METHOD_OPTIONS = [
  { id: 'Email', label: 'Email', icon: Mail },
  { id: 'Phone', label: 'Phone', icon: Phone },
  { id: 'WhatsApp', label: 'WhatsApp', icon: MessageSquare },
  { id: 'Google Meet', label: 'Google Meet', icon: Video },
];

/* ─────────── Component Props ─────────── */

export type AuditFormSectionProps = {
  selectedServices: string[];
  onToggleService: (service: string) => void;
};

export const AuditFormSection = forwardRef<HTMLDivElement, AuditFormSectionProps>(
  function AuditFormSection({ selectedServices, onToggleService }, ref) {
    const [formData, setFormData] = useState({
      adPlatform: '',
      monthlyPageViews: '',
      websiteCategory: '',
      requirements: '',
      name: '',
      email: '',
      phone: '',
      websiteUrl: '',
      preferredContact: 'Email',
      agreeToContact: false,
      honeypot: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [globalError, setGlobalError] = useState('');

    const handleSelectOption = (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    };

    const validate = () => {
      const newErrors: Record<string, string> = {};
      if (selectedServices.length === 0) {
        newErrors.services = 'Please select at least one service above';
      }
      if (!formData.adPlatform) {
        newErrors.adPlatform = 'Please select your current monetization platform';
      }
      if (!formData.monthlyPageViews) {
        newErrors.monthlyPageViews = 'Please select your monthly page views';
      }
      if (!formData.websiteCategory) {
        newErrors.websiteCategory = 'Please select a website category';
      }
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Business email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.websiteUrl.trim()) {
        newErrors.websiteUrl = 'Website URL is required';
      }
      if (!formData.agreeToContact) {
        newErrors.agreeToContact = 'I agree to be contacted by Aeli AdOps regarding my inquiry.';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setGlobalError('');

      if (!validate()) {
        const firstErrorEl = document.querySelector('[data-has-error="true"]');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      setIsSubmitting(true);

      try {
        const payload = {
          services: selectedServices,
          ...formData,
        };

        const response = await fetch('/api/service-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const resData = await response.json();

        if (response.ok && resData.success) {
          setSubmitSuccess(true);
        } else {
          setGlobalError(resData.error || 'Failed to submit request. Please try again.');
        }
      } catch {
        setGlobalError('Network error occurred. Please check your internet connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    const resetForm = () => {
      setSubmitSuccess(false);
      setFormData({
        adPlatform: '',
        monthlyPageViews: '',
        websiteCategory: '',
        requirements: '',
        name: '',
        email: '',
        phone: '',
        websiteUrl: '',
        preferredContact: 'Email',
        agreeToContact: false,
        honeypot: '',
      });
      setErrors({});
    };

    const inputBase =
      'w-full rounded-xl border bg-white px-4 py-3.5 text-secondary placeholder:text-secondary/40 transition-all duration-200 focus:outline-none font-inter-tight text-sm';
    const inputNormal = `${inputBase} border-secondary/20 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10`;
    const inputError = `${inputBase} border-red-500 focus:ring-4 focus:ring-red-500/10`;

    return (
      <section ref={ref} id="audit-form-section" className="pt-20 md:pt-25 lg:pt-36 pb-20">
        <div className="main-container">
          <div className="relative overflow-hidden rounded-3xl border border-secondary/10 bg-white shadow-xl">
            {/* Top decorative gradient bar */}
            <div className="h-2 w-full bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400" />

            <div className="p-6 md:p-12 lg:p-16">
              {submitSuccess ? (
                /* ─── SUCCESS EXPERIENCE ─── */
                <RevealAnimation delay={0.1} instant>
                  <div className="mx-auto max-w-2xl text-center space-y-8 py-8 md:py-14">
                    {/* Animated Checkmark Badge */}
                    <div className="relative mx-auto flex size-24 items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-8 ring-primary-50/60 transition-all duration-500">
                      <div className="absolute inset-0 rounded-full bg-primary-500/10 animate-ping opacity-75" />
                      <CheckCircle2 className="size-12 stroke-[2.2] relative z-10 text-primary-600" />
                    </div>

                    <div className="space-y-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-800">
                        <Sparkles className="size-3.5" /> Service Request Received
                      </span>
                      <h2 className="text-heading-3 md:text-heading-2 font-bold text-secondary">
                        Thank You!
                      </h2>
                      <h3 className="text-lg md:text-xl font-semibold text-primary-700">
                        Your request has been submitted successfully.
                      </h3>
                      <p className="text-tagline-1 text-secondary/70 leading-relaxed max-w-xl mx-auto">
                        Our team will review your information and get back to you within 1–2 business
                        days. We look forward to helping you optimize your website&apos;s advertising
                        performance and achieve sustainable revenue growth.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-primary-100 bg-primary-50/40 p-6 text-left space-y-3 max-w-lg mx-auto shadow-xs">
                      <div className="flex items-center gap-2 text-sm font-bold text-secondary">
                        <CheckCircle2 className="size-4 text-primary-600 stroke-[2.5]" /> Request Details Confirmed
                      </div>
                      <p className="text-xs text-secondary/70 leading-relaxed">
                        Preferred Contact Method:{' '}
                        <strong className="text-primary-800 font-semibold">{formData.preferredContact}</strong>
                        {formData.websiteUrl && (
                          <>
                            <br />
                            Target Domain: <span className="font-mono text-secondary/80">{formData.websiteUrl}</span>
                          </>
                        )}
                      </p>
                    </div>

                    <div className="pt-4 flex justify-center">
                      <ButtonPrimary onClick={resetForm} className="px-8 py-3.5">
                        Submit Another Request →
                      </ButtonPrimary>
                    </div>
                  </div>
                </RevealAnimation>
              ) : (
                /* ─── AUDIT FORM & SERVICE REQUEST JOURNEY ─── */
                <div className="space-y-12 md:space-y-14">
                  {/* Form Header */}
                  <div className="space-y-3 text-center md:text-left">
                    <TextReveal delay={0.1}>
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700">
                        <Sparkles className="size-3.5" /> Request a Service Audit
                      </span>
                    </TextReveal>
                    <TextReveal delay={0.2}>
                      <h2 className="text-heading-4 sm:text-heading-3 md:text-heading-2 font-bold text-secondary">
                        Let&apos;s Grow Your Publisher Revenue Together
                      </h2>
                    </TextReveal>
                    <TextReveal delay={0.3}>
                      <p className="text-tagline-1 text-secondary/60 max-w-3xl leading-relaxed">
                        Tell us a little about your website and the services you&apos;re looking for. Our team will review your request and get in touch with you to discuss the best solution for your publishing business.
                      </p>
                    </TextReveal>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-12 md:space-y-14" noValidate>
                    {/* Honeypot */}
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleInputChange}
                      className="hidden"
                      tabIndex={-1}
                    />

                    {globalError && (
                      <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <AlertCircle className="size-5 shrink-0 text-red-500 mt-0.5" />
                        <div>{globalError}</div>
                      </div>
                    )}

                    {/* ════════ INITIAL AUDIT SELECTOR: Services Interested In ════════ */}
                    <RevealAnimation delay={0.1} direction="up" offset={20}>
                      <div
                        className="space-y-6 rounded-2xl border border-secondary/10 bg-white p-6 md:p-8 shadow-xs"
                        data-has-error={!!errors.services}
                      >
                        <div className="border-b border-secondary/10 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <span className="text-xs font-bold tracking-wider text-primary-600 uppercase">
                              Service Selection
                            </span>
                            <h3 className="text-heading-5 font-bold text-secondary">
                              Services You&apos;re Interested In
                            </h3>
                          </div>
                          <p className="text-xs font-medium text-secondary/50">
                            Select one or more options
                          </p>
                        </div>

                        {errors.services && (
                          <p className="text-xs font-semibold text-red-500 flex items-center gap-1">
                            <AlertCircle className="size-3.5" /> {errors.services}
                          </p>
                        )}

                        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                          {SERVICE_OPTIONS.map((opt) => {
                            const IconComp = opt.icon;
                            const isSelected = selectedServices.includes(opt.id);
                            return (
                              <button
                                type="button"
                                key={opt.id}
                                onClick={() => onToggleService(opt.id)}
                                className={`group relative flex items-center gap-3.5 rounded-xl border p-4 text-left transition-all duration-300 cursor-pointer ${
                                  isSelected
                                    ? 'border-primary-500 bg-primary-50/80 ring-2 ring-primary-500/20 shadow-xs'
                                    : 'border-secondary/15 bg-white hover:border-primary-300 hover:bg-primary-50/20 hover:-translate-y-0.5'
                                }`}
                              >
                                <div
                                  className={`flex size-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
                                    isSelected
                                      ? 'border-primary-600 bg-primary-600 text-white'
                                      : 'border-secondary/30 group-hover:border-primary-400'
                                  }`}
                                >
                                  {isSelected && <CheckCircle2 className="size-3.5" />}
                                </div>
                                <IconComp
                                  className={`size-4.5 shrink-0 transition-colors ${
                                    isSelected ? 'text-primary-600' : 'text-secondary/50 group-hover:text-primary-500'
                                  }`}
                                />
                                <span
                                  className={`text-sm font-medium leading-snug ${
                                    isSelected ? 'text-primary-950 font-semibold' : 'text-secondary/80'
                                  }`}
                                >
                                  {opt.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </RevealAnimation>

                    {/* ════════ INTERACTIVE SERVICE REQUEST JOURNEY FLOW ════════ */}
                    <div className="relative space-y-12">
                      {/* Flow Connector Line (Desktop) */}
                      <div className="hidden lg:block absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary-200 via-primary-100 to-transparent -z-10" />

                      {/* ════════ SECTION 1: ABOUT YOUR WEBSITE ════════ */}
                      <RevealAnimation delay={0.15} direction="up" offset={25}>
                        <div className="rounded-2xl border border-secondary/10 bg-white p-6 md:p-8 space-y-8 shadow-xs">
                          {/* Section Badge & Title */}
                          <div className="border-b border-secondary/10 pb-4 flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
                                <span className="flex size-2 rounded-full bg-primary-600" />
                                Step 1 of 3
                              </div>
                              <h3 className="text-heading-5 font-bold text-secondary">
                                About Your Website
                              </h3>
                            </div>
                          </div>

                          {/* 1. Current Ad Platform */}
                          <div className="space-y-4" data-has-error={!!errors.adPlatform}>
                            <div>
                              <h4 className="text-base font-semibold text-secondary flex items-center gap-1.5">
                                Current Ad Platform <span className="text-primary-600">*</span>
                              </h4>
                              <p className="text-xs text-secondary/60 mt-0.5">
                                Select your current monetization platform.
                              </p>
                            </div>
                            {errors.adPlatform && (
                              <p className="text-xs font-semibold text-red-500 flex items-center gap-1">
                                <AlertCircle className="size-3.5" /> {errors.adPlatform}
                              </p>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                              {AD_PLATFORM_OPTIONS.map((plat) => {
                                const IconComp = plat.icon;
                                const isSelected = formData.adPlatform === plat.id;
                                return (
                                  <button
                                    type="button"
                                    key={plat.id}
                                    onClick={() => handleSelectOption('adPlatform', plat.id)}
                                    className={`group relative flex items-center justify-between rounded-xl border p-4 text-left transition-all duration-300 cursor-pointer ${
                                      isSelected
                                        ? 'border-primary-600 bg-primary-50/80 ring-2 ring-primary-500/20 shadow-xs'
                                        : 'border-secondary/15 bg-white hover:border-primary-300 hover:bg-primary-50/20 hover:-translate-y-0.5'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                          isSelected
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-secondary/5 text-secondary/60 group-hover:bg-primary-100 group-hover:text-primary-600'
                                        }`}
                                      >
                                        <IconComp className="size-4.5" />
                                      </div>
                                      <span
                                        className={`text-sm font-medium ${
                                          isSelected ? 'text-primary-950 font-bold' : 'text-secondary/80'
                                        }`}
                                      >
                                        {plat.label}
                                      </span>
                                    </div>
                                    <div
                                      className={`flex size-4.5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                                        isSelected
                                          ? 'border-primary-600 bg-primary-600 text-white'
                                          : 'border-secondary/30 group-hover:border-primary-400'
                                      }`}
                                    >
                                      {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* 2. Monthly Page Views */}
                          <div className="space-y-4" data-has-error={!!errors.monthlyPageViews}>
                            <div>
                              <h4 className="text-base font-semibold text-secondary flex items-center gap-1.5">
                                Monthly Page Views <span className="text-primary-600">*</span>
                              </h4>
                              <p className="text-xs text-secondary/60 mt-0.5">
                                Help us understand your website&apos;s traffic.
                              </p>
                            </div>
                            {errors.monthlyPageViews && (
                              <p className="text-xs font-semibold text-red-500 flex items-center gap-1">
                                <AlertCircle className="size-3.5" /> {errors.monthlyPageViews}
                              </p>
                            )}

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                              {PAGEVIEW_OPTIONS.map((pv) => {
                                const isSelected = formData.monthlyPageViews === pv.id;
                                return (
                                  <button
                                    type="button"
                                    key={pv.id}
                                    onClick={() => handleSelectOption('monthlyPageViews', pv.id)}
                                    className={`group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-300 cursor-pointer min-h-[90px] ${
                                      isSelected
                                        ? 'border-primary-600 bg-primary-50/80 ring-2 ring-primary-500/20 shadow-xs'
                                        : 'border-secondary/15 bg-white hover:border-primary-300 hover:bg-primary-50/20 hover:-translate-y-0.5'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span
                                        className={`text-xs font-bold ${
                                          isSelected ? 'text-primary-950' : 'text-secondary/80'
                                        }`}
                                      >
                                        {pv.label}
                                      </span>
                                      {isSelected && (
                                        <CheckCircle2 className="size-3.5 text-primary-600" />
                                      )}
                                    </div>

                                    {/* Visual Scale Indicator Bar */}
                                    <div className="mt-3 flex items-center gap-1">
                                      {[1, 2, 3, 4, 5, 6].map((barIndex) => (
                                        <div
                                          key={barIndex}
                                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                            barIndex <= pv.scale
                                              ? isSelected
                                                ? 'bg-primary-600'
                                                : 'bg-primary-300 group-hover:bg-primary-400'
                                              : 'bg-secondary/10'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* 3. Website Category */}
                          <div className="space-y-4" data-has-error={!!errors.websiteCategory}>
                            <div>
                              <h4 className="text-base font-semibold text-secondary flex items-center gap-1.5">
                                Website Category <span className="text-primary-600">*</span>
                              </h4>
                              <p className="text-xs text-secondary/60 mt-0.5">
                                Select your primary content category.
                              </p>
                            </div>
                            {errors.websiteCategory && (
                              <p className="text-xs font-semibold text-red-500 flex items-center gap-1">
                                <AlertCircle className="size-3.5" /> {errors.websiteCategory}
                              </p>
                            )}

                            <div className="flex flex-wrap gap-2.5">
                              {CATEGORY_OPTIONS.map((cat) => {
                                const IconComp = cat.icon;
                                const isSelected = formData.websiteCategory === cat.id;
                                return (
                                  <button
                                    type="button"
                                    key={cat.id}
                                    onClick={() => handleSelectOption('websiteCategory', cat.id)}
                                    className={`group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                                      isSelected
                                        ? 'border-primary-600 bg-primary-50 text-primary-950 ring-2 ring-primary-500/20 font-semibold shadow-xs'
                                        : 'border-secondary/15 bg-white text-secondary/80 hover:border-primary-300 hover:bg-primary-50/20 hover:-translate-y-0.5'
                                    }`}
                                  >
                                    <IconComp
                                      className={`size-4 transition-colors ${
                                        isSelected ? 'text-primary-600' : 'text-secondary/50 group-hover:text-primary-500'
                                      }`}
                                    />
                                    <span>{cat.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </RevealAnimation>

                      {/* ════════ SECTION 2: TELL US ABOUT YOUR REQUIREMENTS ════════ */}
                      <RevealAnimation delay={0.2} direction="up" offset={25}>
                        <div className="rounded-2xl border border-secondary/10 bg-white p-6 md:p-8 space-y-6 shadow-xs">
                          {/* Section Header */}
                          <div className="border-b border-secondary/10 pb-4 space-y-1">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
                              <span className="flex size-2 rounded-full bg-primary-600" />
                              Step 2 of 3
                            </div>
                            <h3 className="text-heading-5 font-bold text-secondary">
                              Tell Us About Your Requirements
                            </h3>
                            <p className="text-sm font-semibold text-primary-700 mt-1">
                              How can we help?
                            </p>
                          </div>

                          <fieldset className="space-y-3">
                            <label
                              htmlFor="requirements"
                              className="text-sm font-medium text-secondary/80 block leading-relaxed"
                            >
                              Describe your current setup, the challenges you&apos;re facing, or what
                              you&apos;d like to achieve. The more details you provide, the better we
                              can understand your needs.
                            </label>

                            <div className="relative">
                              <textarea
                                id="requirements"
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleInputChange}
                                rows={5}
                                placeholder="Describe your monetization goals or challenges..."
                                className={`${inputNormal} resize-y min-h-[140px]`}
                              />
                            </div>

                            {/* Example Prompt Box */}
                            <div className="rounded-xl border border-primary-100 bg-primary-50/40 p-4 text-xs text-secondary/70 leading-relaxed space-y-1">
                              <span className="font-semibold text-primary-800 block">
                                Example:
                              </span>
                              <p className="italic">
                                We&apos;re looking to improve ad revenue, optimize our Google Ad Manager setup, troubleshoot delivery issues, or explore better monetization opportunities.
                              </p>
                            </div>
                          </fieldset>
                        </div>
                      </RevealAnimation>

                      {/* ════════ SECTION 3: CONTACT US & PREFERRED METHOD ════════ */}
                      <RevealAnimation delay={0.25} direction="up" offset={25}>
                        <div className="rounded-2xl border border-secondary/10 bg-white p-6 md:p-8 space-y-8 shadow-xs">
                          {/* Section Header */}
                          <div className="border-b border-secondary/10 pb-4 space-y-1">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
                              <span className="flex size-2 rounded-full bg-primary-600" />
                              Step 3 of 3
                            </div>
                            <h3 className="text-heading-5 font-bold text-secondary">
                              Contact us!
                            </h3>
                            <p className="text-xs text-secondary/60">
                              Provide your contact details so our team can follow up with you.
                            </p>
                          </div>

                          {/* Contact Form Fields Grid */}
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <fieldset className="space-y-2" data-has-error={!!errors.name}>
                              <label
                                htmlFor="name"
                                className="text-sm font-semibold text-secondary block"
                              >
                                Full Name <span className="text-primary-600">*</span>
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="e.g. Rahul Sharma"
                                className={errors.name ? inputError : inputNormal}
                                required
                              />
                              {errors.name && (
                                <p className="text-xs font-semibold text-red-500 flex items-center gap-1">
                                  <AlertCircle className="size-3.5" /> {errors.name}
                                </p>
                              )}
                            </fieldset>

                            <fieldset className="space-y-2" data-has-error={!!errors.email}>
                              <label
                                htmlFor="email"
                                className="text-sm font-semibold text-secondary block"
                              >
                                Business Email <span className="text-primary-600">*</span>
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-secondary/40 pointer-events-none" />
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="rahul@company.com"
                                  className={`${errors.email ? inputError : inputNormal} pl-10`}
                                  required
                                />
                              </div>
                              {errors.email && (
                                <p className="text-xs font-semibold text-red-500 flex items-center gap-1">
                                  <AlertCircle className="size-3.5" /> {errors.email}
                                </p>
                              )}
                            </fieldset>

                            <fieldset className="space-y-2">
                              <label
                                htmlFor="phone"
                                className="text-sm font-semibold text-secondary block"
                              >
                                Phone / WhatsApp{' '}
                                <span className="font-normal text-secondary/40">(Optional)</span>
                              </label>
                              <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-secondary/40 pointer-events-none" />
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder="+91 98765 43210"
                                  className={`${inputNormal} pl-10`}
                                />
                              </div>
                            </fieldset>

                            <fieldset className="space-y-2" data-has-error={!!errors.websiteUrl}>
                              <label
                                htmlFor="websiteUrl"
                                className="text-sm font-semibold text-secondary block"
                              >
                                Website URL <span className="text-primary-600">*</span>
                              </label>
                              <div className="relative">
                                <Globe className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-secondary/40 pointer-events-none" />
                                <input
                                  type="url"
                                  id="websiteUrl"
                                  name="websiteUrl"
                                  value={formData.websiteUrl}
                                  onChange={handleInputChange}
                                  placeholder="https://www.yourwebsite.com"
                                  className={`${errors.websiteUrl ? inputError : inputNormal} pl-10`}
                                  required
                                />
                              </div>
                              {errors.websiteUrl && (
                                <p className="text-xs font-semibold text-red-500 flex items-center gap-1">
                                  <AlertCircle className="size-3.5" /> {errors.websiteUrl}
                                </p>
                              )}
                            </fieldset>
                          </div>

                          {/* Preferred Contact Method */}
                          <fieldset className="space-y-3 pt-2">
                            <legend className="text-sm font-semibold text-secondary block">
                              Preferred Contact Method
                            </legend>
                            <p className="text-xs text-secondary/60">
                              How would you like us to contact you?
                            </p>
                            <div
                              role="radiogroup"
                              aria-label="Preferred Contact Method"
                              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                            >
                              {CONTACT_METHOD_OPTIONS.map((method) => {
                                const IconComponent = method.icon;
                                const isSelected = formData.preferredContact === method.id;
                                return (
                                  <label
                                    key={method.id}
                                    className={`group flex cursor-pointer items-center justify-between rounded-xl border p-3.5 text-sm font-medium transition-all duration-200 ${
                                      isSelected
                                        ? 'border-primary-600 bg-primary-50/80 text-primary-950 ring-2 ring-primary-500/20 font-semibold shadow-xs'
                                        : 'border-secondary/15 bg-white text-secondary/80 hover:border-primary-300 hover:bg-primary-50/20 hover:-translate-y-0.5'
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="preferredContact"
                                      value={method.id}
                                      checked={isSelected}
                                      onChange={() => handleSelectOption('preferredContact', method.id)}
                                      className="sr-only"
                                    />
                                    <div className="flex items-center gap-2.5">
                                      <IconComponent
                                        className={`size-4 shrink-0 transition-colors ${
                                          isSelected ? 'text-primary-600' : 'text-secondary/50 group-hover:text-primary-500'
                                        }`}
                                      />
                                      <span>{method.label}</span>
                                    </div>
                                    <div
                                      className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                                        isSelected
                                          ? 'border-primary-600 bg-primary-600 text-white'
                                          : 'border-secondary/30 group-hover:border-primary-400'
                                      }`}
                                    >
                                      {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                          </fieldset>

                          {/* Consent Checkbox */}
                          <fieldset className="space-y-2 pt-2" data-has-error={!!errors.agreeToContact}>
                            <label className="flex cursor-pointer items-start gap-3 group">
                              <input
                                type="checkbox"
                                name="agreeToContact"
                                checked={formData.agreeToContact}
                                onChange={handleCheckboxChange}
                                className="sr-only"
                                required
                              />
                              <div
                                className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border-2 transition-all duration-200 ${
                                  formData.agreeToContact
                                    ? 'border-primary-600 bg-primary-600 text-white shadow-xs'
                                    : 'border-secondary/30 group-hover:border-primary-400 bg-white'
                                }`}
                              >
                                {formData.agreeToContact && <CheckCircle2 className="size-3.5" />}
                              </div>
                              <span className="text-sm text-secondary/80 leading-relaxed font-medium">
                                I agree to be contacted by Aeli AdOps regarding my inquiry.
                              </span>
                            </label>
                            {errors.agreeToContact && (
                              <p className="ml-8 text-xs font-semibold text-red-500 flex items-center gap-1">
                                <AlertCircle className="size-3.5" /> {errors.agreeToContact}
                              </p>
                            )}
                          </fieldset>
                        </div>
                      </RevealAnimation>

                      {/* ════════ SECTION 6: FINAL CTA AREA ════════ */}
                      <RevealAnimation delay={0.3} direction="up" offset={25}>
                        <div className="relative overflow-hidden rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 via-white to-primary-50/60 p-6 md:p-10 shadow-md">
                          {/* Background Decorative AdTech Grid Motif */}
                          <div className="absolute right-0 top-0 -bottom-10 w-1/3 opacity-[0.04] pointer-events-none hidden sm:block">
                            <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                              <path d="M0 40H200M0 80H200M0 120H200M0 160H200" stroke="currentColor" strokeWidth="2" />
                              <path d="M40 0V200M80 0V200M120 0V200M160 0V200" stroke="currentColor" strokeWidth="2" />
                            </svg>
                          </div>

                          <div className="relative z-10 space-y-6">
                            <div className="space-y-2">
                              <h4 className="text-heading-4 font-bold text-secondary flex items-center gap-2">
                                Ready to Get Started?
                              </h4>
                              <p className="text-tagline-1 text-secondary/75 max-w-2xl leading-relaxed">
                                Our team will review your request and reach out with the next steps. Whether
                                you need technical support, monetization guidance, or a complete Ad
                                Operations partner, we&apos;re here to help you succeed.
                              </p>
                            </div>

                            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-primary-100/80">
                              <ButtonPrimary
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full sm:w-auto min-w-[220px] justify-center px-8 py-4 text-base font-bold shadow-md transition-all hover:shadow-lg ${
                                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'
                                }`}
                              >
                                {isSubmitting ? (
                                  <span className="flex items-center gap-2">
                                    <Loader2 className="size-5 animate-spin text-white" />
                                    Submitting...
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-2">
                                    Request Service <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                                  </span>
                                )}
                              </ButtonPrimary>

                              <div className="flex items-center gap-2 text-xs font-semibold text-secondary/60">
                                <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
                                Response time: 1–2 business days
                              </div>
                            </div>
                          </div>
                        </div>
                      </RevealAnimation>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

AuditFormSection.displayName = 'AuditFormSection';
