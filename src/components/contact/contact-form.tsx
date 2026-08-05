'use client';

import { useState } from 'react';
import { ButtonPrimary } from '@/src/components/shared/ui/button';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    pageviews: '',
    service: 'free-audit',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage(data.message || 'Thank you! Your inquiry has been submitted.');
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          website: '',
          pageviews: '',
          service: 'free-audit',
          message: '',
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch {
      setErrorMessage('Connection error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit}>
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 flex items-start gap-3 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Inquiry Submitted!</p>
            <p className="text-xs text-emerald-800 mt-1">{successMessage}</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <fieldset className="space-y-2">
          <label htmlFor="name" className="text-tagline-2 text-secondary/90 inline-block font-normal">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="text-secondary/90 placeholder:text-secondary/60 w-full rounded-md border border-secondary/20 bg-white/80 px-4.5 py-3 focus-within:border-secondary/60 focus-within:outline-none"
            required
          />
        </fieldset>

        <fieldset className="space-y-2">
          <label htmlFor="company" className="text-tagline-2 text-secondary/90 inline-block font-normal">
            Company Name *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company Name"
            className="text-secondary/90 placeholder:text-secondary/60 w-full rounded-md border border-secondary/20 bg-white/80 px-4.5 py-3 focus-within:border-secondary/60 focus-within:outline-none"
            required
          />
        </fieldset>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <fieldset className="space-y-2">
          <label htmlFor="email" className="text-tagline-2 text-secondary/90 inline-block font-normal">
            Business Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="business@example.com"
            className="text-secondary/90 placeholder:text-secondary/60 w-full rounded-md border border-secondary/20 bg-white/80 px-4.5 py-3 focus-within:border-secondary/60 focus-within:outline-none"
            required
          />
        </fieldset>

        <fieldset className="space-y-2">
          <label htmlFor="phone" className="text-tagline-2 text-secondary/90 inline-block font-normal">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="text-secondary/90 placeholder:text-secondary/60 w-full rounded-md border border-secondary/20 bg-white/80 px-4.5 py-3 focus-within:border-secondary/60 focus-within:outline-none"
          />
        </fieldset>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <fieldset className="space-y-2">
          <label htmlFor="website" className="text-tagline-2 text-secondary/90 inline-block font-normal">
            Website URL *
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://www.yourwebsite.com"
            className="text-secondary/90 placeholder:text-secondary/60 w-full rounded-md border border-secondary/20 bg-white/80 px-4.5 py-3 focus-within:border-secondary/60 focus-within:outline-none"
            required
          />
        </fieldset>

        <fieldset className="space-y-2">
          <label htmlFor="pageviews" className="text-tagline-2 text-secondary/90 inline-block font-normal">
            Approximate Monthly Pageviews
          </label>
          <input
            type="text"
            id="pageviews"
            name="pageviews"
            value={formData.pageviews}
            onChange={handleChange}
            placeholder="e.g. 500,000"
            className="text-secondary/90 placeholder:text-secondary/60 w-full rounded-md border border-secondary/20 bg-white/80 px-4.5 py-3 focus-within:border-secondary/60 focus-within:outline-none"
          />
        </fieldset>
      </div>

      <fieldset className="space-y-2">
        <label htmlFor="service" className="text-tagline-2 text-secondary/90 inline-block font-normal">
          What Can We Help With? *
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="text-secondary/90 w-full rounded-md border border-secondary/20 bg-white/80 px-4.5 py-3 focus-within:border-secondary/60 focus-within:outline-none"
          required
        >
          <option value="free-audit">Free Publisher Audit</option>
          <option value="yield-optimization">Yield Optimization</option>
          <option value="google-ad-manager">Google Ad Manager</option>
          <option value="ad-operations">Ad Operations</option>
          <option value="programmatic-direct">Programmatic Direct</option>
          <option value="technical-support">Technical Support</option>
          <option value="website-monetization">Website Monetisation</option>
          <option value="other">Other</option>
        </select>
      </fieldset>

      <fieldset className="space-y-2">
        <label
          htmlFor="message"
          className="text-tagline-2 text-secondary/90 inline-block font-normal"
        >
          Message / Additional Information *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your publishing business and what you're trying to achieve..."
          className="text-secondary/90 placeholder:text-secondary/60 h-32 w-full rounded-md border border-secondary/20 bg-white/80 px-4.5 py-3 focus-within:border-secondary/60 focus-within:outline-none"
          required
        />
      </fieldset>

      <div className="inline-block pt-2">
        <ButtonPrimary
          type="submit"
          disabled={loading}
          className="w-full md:w-auto"
          textClassName="text-center text-nowrap max-sm:flex-1 max-sm:pr-8!"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
            </span>
          ) : (
            'Start The Conversation →'
          )}
        </ButtonPrimary>
      </div>
    </form>
  );
};

export default ContactForm;
