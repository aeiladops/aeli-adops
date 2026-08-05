'use client';

import { ButtonPrimary } from '@/src/components/shared/ui/button';
import {
  AlertCircle,
  CheckCircle2,
  Globe,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  Video,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/* ─────────── Option Data ─────────── */

const SERVICE_OPTIONS = [
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
  'Google Ad Manager',
  'Google AdSense',
  'Google Ad Manager + AdSense',
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

const CATEGORY_OPTIONS = [
  'News',
  'Business & Finance',
  'Sports',
  'Entertainment',
  'Technology',
  'Education',
  'Lifestyle',
  'Gaming',
  'Other',
];

const CONTACT_METHOD_OPTIONS = [
  { id: 'Email', label: 'Email', icon: Mail },
  { id: 'Phone', label: 'Phone', icon: Phone },
  { id: 'WhatsApp', label: 'WhatsApp', icon: MessageSquare },
  { id: 'Google Meet', label: 'Google Meet', icon: Video },
];

/* ─────────── Types ─────────── */

type FormData = {
  services: string[];
  adPlatform: string;
  monthlyPageViews: string;
  websiteCategory: string;
  requirements: string;
  name: string;
  email: string;
  phone: string;
  websiteUrl: string;
  preferredContact: string;
  agreeToContact: boolean;
  honeypot: string;
};

type ServiceRequestModalProps = {
  open: boolean;
  onClose: () => void;
  preSelectedService?: string;
};

/* ─────────── Component ─────────── */

export default function ServiceRequestModal({
  open,
  onClose,
  preSelectedService,
}: ServiceRequestModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    services: preSelectedService ? [preSelectedService] : [],
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

  /* Sync preSelectedService on open */
  useEffect(() => {
    if (open && preSelectedService) {
      setFormData((prev) => ({
        ...prev,
        services: prev.services.includes(preSelectedService)
          ? prev.services
          : [...prev.services, preSelectedService],
      }));
    }
  }, [open, preSelectedService]);

  /* Open/close animation */
  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsAnimatingOut(false);
      document.body.style.overflow = 'hidden';
    } else if (isVisible) {
      setIsAnimatingOut(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setIsAnimatingOut(false);
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timeout);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, isVisible]);

  /* Escape key */
  const handleClose = useCallback(() => {
    setIsAnimatingOut(true);
    setTimeout(() => onClose(), 300);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, handleClose]);

  /* Handlers */
  const toggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists ? prev.services.filter((s) => s !== service) : [...prev.services, service],
      };
    });
    if (errors.services) setErrors((prev) => ({ ...prev, services: '' }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /* Validation */
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.services.length === 0) newErrors.services = 'Please select at least one service';
    if (!formData.adPlatform) newErrors.adPlatform = 'Please select your current ad platform';
    if (!formData.monthlyPageViews) newErrors.monthlyPageViews = 'Please select monthly page views';
    if (!formData.websiteCategory) newErrors.websiteCategory = 'Please select a website category';
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.websiteUrl.trim()) newErrors.websiteUrl = 'Website URL is required';
    if (!formData.agreeToContact) newErrors.agreeToContact = 'Please agree to be contacted';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  /* Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError('');
    if (!validate()) {
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/service-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const resData = await response.json();
      if (response.ok && resData.success) {
        if (resData.whatsappUrl) {
          setWhatsappRedirectUrl(resData.whatsappUrl);
          window.open(resData.whatsappUrl, '_blank');
        }
        setSubmitSuccess(true);
        scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setGlobalError(resData.error || 'Failed to submit request. Please try again.');
      }
    } catch {
      setGlobalError('Network error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Reset on full close */
  const resetForm = () => {
    setFormData({
      services: [],
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
    setGlobalError('');
    setWhatsappRedirectUrl('');
    setSubmitSuccess(false);
    handleClose();
  };

  if (!isVisible || typeof document === 'undefined') return null;

  /* ─── Input class helpers ─── */
  const inputBase =
    'w-full rounded-xl border bg-white px-4.5 py-3.5 text-secondary placeholder:text-secondary/40 transition-all focus:outline-none focus:ring-2 font-inter-tight text-sm';
  const inputNormal = `${inputBase} border-secondary/20 focus:border-primary-500 focus:ring-primary-500/20`;
  const inputError = `${inputBase} border-red-500 focus:ring-red-200`;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${
        isAnimatingOut ? 'service-modal-exit' : 'service-modal-enter'
      }`}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 z-0 bg-secondary/50 backdrop-blur-[20px] ${
          isAnimatingOut ? 'animate-fadeOut' : 'animate-fadeIn'
        }`}
        onClick={handleClose}
      />

      {/* Modal Panel */}
      <div
        className={`relative z-10 flex max-h-[92vh] w-full max-w-[880px] flex-col overflow-hidden rounded-2xl border border-secondary/10 bg-white shadow-2xl ${
          isAnimatingOut ? 'animate-slideDown' : 'animate-slideUp'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-secondary/10 bg-gradient-to-r from-primary-50 to-white px-6 py-5 md:px-8">
          <div>
            <h2 className="text-heading-5 md:text-heading-4 font-semibold text-secondary">
              {submitSuccess ? 'Thank You!' : 'Request a Service'}
            </h2>
            {!submitSuccess && (
              <p className="text-tagline-2 mt-1 text-secondary/60">
                Tell us about your website and requirements
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-secondary/10 bg-white text-secondary/60 transition-all hover:bg-secondary/5 hover:text-secondary"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8">
          {submitSuccess ? (
            /* ─── Thank You State ─── */
            <div className="space-y-8 text-center animate-fadeIn py-8">
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
                <CheckCircle2 className="size-10" />
              </div>

              <div className="space-y-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  <Sparkles className="size-3.5" /> Request Submitted & Logged in CRM
                </span>
                <h3 className="text-heading-4 md:text-heading-3 font-bold text-secondary">
                  Your request has been submitted successfully.
                </h3>
                <p className="text-tagline-1 mx-auto max-w-lg text-secondary/70 leading-relaxed">
                  Your details have been saved to our CRM portal and sent to WhatsApp (+91 7095185429).
                </p>
              </div>

              <div className="mx-auto max-w-md rounded-2xl border border-secondary/10 bg-secondary/5 p-6 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-secondary">Next Steps</p>
                    <p className="mt-1 text-xs text-secondary/60 leading-relaxed">
                      An AdOps engineer will review your site and contact you directly via{' '}
                      <strong>{formData.preferredContact}</strong> or WhatsApp.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
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
                <ButtonPrimary onClick={resetForm} className="w-full sm:w-auto">Close & Return →</ButtonPrimary>
              </div>
            </div>
          ) : (
            /* ─── Form ─── */
            <form onSubmit={handleSubmit} className="space-y-10" noValidate>
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

              {/* ═══ Section 1: Services ═══ */}
              <div className="space-y-4">
                <div className="border-b border-secondary/10 pb-3">
                  <h3 className="text-lg font-semibold text-secondary">
                    Services You&apos;re Interested In{' '}
                    <span className="text-primary-600">*</span>
                  </h3>
                  <p className="text-tagline-2 text-secondary/60">
                    Select one or more services.
                  </p>
                </div>
                {errors.services && (
                  <p className="text-xs font-medium text-red-500">{errors.services}</p>
                )}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {SERVICE_OPTIONS.map((service) => {
                    const isSelected = formData.services.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`group relative flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'border-primary-500 bg-primary-50/80 ring-2 ring-primary-500/30 shadow-md'
                            : 'border-secondary/15 bg-white hover:border-primary-300 hover:bg-primary-50/30'
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
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? 'text-primary-800 font-semibold' : 'text-secondary/80'
                          }`}
                        >
                          {service}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ═══ Section 2: About Your Website ═══ */}
              <div className="space-y-5">
                <div className="border-b border-secondary/10 pb-3">
                  <h3 className="text-lg font-semibold text-secondary">About Your Website</h3>
                  <p className="text-tagline-2 text-secondary/60">
                    Help us understand your current setup and traffic.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  {/* Ad Platform */}
                  <fieldset className="space-y-2">
                    <label
                      htmlFor="adPlatformModal"
                      className="text-tagline-2 font-medium text-secondary"
                    >
                      Current Ad Platform <span className="text-primary-600">*</span>
                    </label>
                    <select
                      id="adPlatformModal"
                      name="adPlatform"
                      value={formData.adPlatform}
                      onChange={handleInputChange}
                      className={errors.adPlatform ? inputError : inputNormal}
                    >
                      <option value="">Select platform...</option>
                      {AD_PLATFORM_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.adPlatform && (
                      <p className="text-xs font-medium text-red-500">{errors.adPlatform}</p>
                    )}
                  </fieldset>

                  {/* Monthly Page Views */}
                  <fieldset className="space-y-2">
                    <label
                      htmlFor="monthlyPageViewsModal"
                      className="text-tagline-2 font-medium text-secondary"
                    >
                      Monthly Page Views <span className="text-primary-600">*</span>
                    </label>
                    <select
                      id="monthlyPageViewsModal"
                      name="monthlyPageViews"
                      value={formData.monthlyPageViews}
                      onChange={handleInputChange}
                      className={errors.monthlyPageViews ? inputError : inputNormal}
                    >
                      <option value="">Select range...</option>
                      {PAGEVIEW_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.monthlyPageViews && (
                      <p className="text-xs font-medium text-red-500">{errors.monthlyPageViews}</p>
                    )}
                  </fieldset>

                  {/* Website Category */}
                  <fieldset className="space-y-2">
                    <label
                      htmlFor="websiteCategoryModal"
                      className="text-tagline-2 font-medium text-secondary"
                    >
                      Website Category <span className="text-primary-600">*</span>
                    </label>
                    <select
                      id="websiteCategoryModal"
                      name="websiteCategory"
                      value={formData.websiteCategory}
                      onChange={handleInputChange}
                      className={errors.websiteCategory ? inputError : inputNormal}
                    >
                      <option value="">Select category...</option>
                      {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.websiteCategory && (
                      <p className="text-xs font-medium text-red-500">{errors.websiteCategory}</p>
                    )}
                  </fieldset>
                </div>
              </div>

              {/* ═══ Section 3: Requirements ═══ */}
              <div className="space-y-4">
                <div className="border-b border-secondary/10 pb-3">
                  <h3 className="text-lg font-semibold text-secondary">
                    Tell Us About Your Requirements
                  </h3>
                  <p className="text-tagline-2 text-secondary/60">How can we help?</p>
                </div>

                <fieldset className="space-y-2">
                  <label
                    htmlFor="requirementsModal"
                    className="text-tagline-2 font-medium text-secondary"
                  >
                    Describe your current setup, challenges, or goals{' '}
                    <span className="font-normal text-secondary/40">(Optional)</span>
                  </label>
                  <textarea
                    id="requirementsModal"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="Example: We're looking to improve ad revenue, optimize our Google Ad Manager setup, troubleshoot delivery issues, or explore better monetization opportunities."
                    className={`${inputNormal} h-32 resize-none`}
                  />
                </fieldset>
              </div>

              {/* ═══ Section 4: Contact ═══ */}
              <div className="space-y-5">
                <div className="border-b border-secondary/10 pb-3">
                  <h3 className="text-lg font-semibold text-secondary">Contact Us!</h3>
                  <p className="text-tagline-2 text-secondary/60">
                    How should we reach out to you?
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <fieldset className="space-y-2">
                    <label htmlFor="nameModal" className="text-tagline-2 font-medium text-secondary">
                      Full Name <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="nameModal"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className={errors.name ? inputError : inputNormal}
                      required
                    />
                    {errors.name && (
                      <p className="text-xs font-medium text-red-500">{errors.name}</p>
                    )}
                  </fieldset>

                  <fieldset className="space-y-2">
                    <label
                      htmlFor="emailModal"
                      className="text-tagline-2 font-medium text-secondary"
                    >
                      Email Address <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="emailModal"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@company.com"
                      className={errors.email ? inputError : inputNormal}
                      required
                    />
                    {errors.email && (
                      <p className="text-xs font-medium text-red-500">{errors.email}</p>
                    )}
                  </fieldset>

                  <fieldset className="space-y-2">
                    <label
                      htmlFor="phoneModal"
                      className="text-tagline-2 font-medium text-secondary"
                    >
                      Phone / WhatsApp{' '}
                      <span className="font-normal text-secondary/40">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneModal"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className={inputNormal}
                    />
                  </fieldset>

                  <fieldset className="space-y-2">
                    <label
                      htmlFor="websiteUrlModal"
                      className="text-tagline-2 font-medium text-secondary"
                    >
                      Website URL <span className="text-primary-600">*</span>
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-secondary/40" />
                      <input
                        type="url"
                        id="websiteUrlModal"
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleInputChange}
                        placeholder="https://www.yourwebsite.com"
                        className={`${errors.websiteUrl ? inputError : inputNormal} pl-10`}
                        required
                      />
                    </div>
                    {errors.websiteUrl && (
                      <p className="text-xs font-medium text-red-500">{errors.websiteUrl}</p>
                    )}
                  </fieldset>
                </div>

                {/* Preferred Contact Method */}
                <fieldset className="space-y-3">
                  <legend className="text-tagline-2 font-medium text-secondary">
                    Preferred Contact Method
                  </legend>
                  <div className="flex flex-wrap gap-3">
                    {CONTACT_METHOD_OPTIONS.map((method) => {
                      const IconComponent = method.icon;
                      const isSelected = formData.preferredContact === method.id;
                      return (
                        <label
                          key={method.id}
                          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50/80 text-primary-800 ring-2 ring-primary-500/30'
                              : 'border-secondary/15 bg-white text-secondary/70 hover:border-primary-300 hover:bg-primary-50/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferredContact"
                            value={method.id}
                            checked={isSelected}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`flex size-4 items-center justify-center rounded-full border-2 ${
                              isSelected ? 'border-primary-600 bg-primary-600' : 'border-secondary/30'
                            }`}
                          >
                            {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                          </div>
                          <IconComponent className="size-4 shrink-0" />
                          {method.label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Consent */}
                <fieldset className="space-y-1">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeToContact"
                      checked={formData.agreeToContact}
                      onChange={handleCheckboxChange}
                      className="sr-only"
                    />
                    <div
                      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
                        formData.agreeToContact
                          ? 'border-primary-600 bg-primary-600 text-white'
                          : 'border-secondary/30'
                      }`}
                    >
                      {formData.agreeToContact && <CheckCircle2 className="size-3.5" />}
                    </div>
                    <span className="text-sm text-secondary/70">
                      I agree to be contacted by Aeli AdOps regarding my inquiry.
                    </span>
                  </label>
                  {errors.agreeToContact && (
                    <p className="ml-8 text-xs font-medium text-red-500">{errors.agreeToContact}</p>
                  )}
                </fieldset>
              </div>

              {/* ═══ CTA Section ═══ */}
              <div className="space-y-4 rounded-xl border border-primary-100 bg-gradient-to-r from-primary-50 to-white p-5">
                <div>
                  <h4 className="text-base font-semibold text-secondary">Ready to Get Started?</h4>
                  <p className="mt-1 text-sm text-secondary/60">
                    Our team will review your request and reach out with the next steps. Whether you
                    need technical support, monetization guidance, or a complete Ad Operations
                    partner, we&apos;re here to help you succeed.
                  </p>
                </div>
                <ButtonPrimary
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full justify-center md:w-auto ${
                    isSubmitting ? 'cursor-not-allowed opacity-70' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin text-white" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="size-4" /> Request Service →
                    </span>
                  )}
                </ButtonPrimary>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
