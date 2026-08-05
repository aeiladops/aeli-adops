export interface PublisherAuditFormData {
  name: string;
  company: string;
  website: string;
  email: string;
  phone?: string;
  category: string;
  monthlyPageviews: string;
  audienceGeography: string;
  monetisationSetup: string[];
  areasToImprove: string[];
  additionalInfo?: string;
  honeypot?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedData?: PublisherAuditFormData;
}

export function validatePublisherAuditForm(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Check honeypot for bots
  if (data.honeypot && String(data.honeypot).trim().length > 0) {
    return {
      isValid: false,
      errors: { _form: 'Spam detected' },
    };
  }

  const name = (data.name || '').trim();
  const company = (data.company || '').trim() || 'Individual Publisher';
  const website = (data.website || data.websiteUrl || '').trim();
  const email = (data.email || '').trim();
  const phone = (data.phone || '').trim();
  const category = (data.category || data.websiteCategory || '').trim() || 'General';
  const monthlyPageviews = (data.monthlyPageviews || data.monthlyPageViews || '').trim() || 'Not Specified';
  const audienceGeography = (data.audienceGeography || '').trim() || 'Global';

  let monetisationSetup: string[] = [];
  if (Array.isArray(data.monetisationSetup) && data.monetisationSetup.length > 0) {
    monetisationSetup = data.monetisationSetup;
  } else if (data.adPlatform) {
    monetisationSetup = [data.adPlatform];
  } else {
    monetisationSetup = ['Not Specified'];
  }

  let areasToImprove: string[] = [];
  if (Array.isArray(data.areasToImprove) && data.areasToImprove.length > 0) {
    areasToImprove = data.areasToImprove;
  } else if (Array.isArray(data.services) && data.services.length > 0) {
    areasToImprove = data.services;
  } else {
    areasToImprove = ['Free Publisher Audit'];
  }

  const additionalInfo = (data.additionalInfo || data.requirements || data.goals || '').trim();

  if (!name) {
    errors.name = 'Full Name is required';
  }

  if (!website) {
    errors.website = 'Website URL is required';
  }

  if (!email) {
    errors.email = 'Business Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    sanitizedData: isValid
      ? {
          name,
          company,
          website: website.startsWith('http') ? website : `https://${website}`,
          email,
          phone,
          category,
          monthlyPageviews,
          audienceGeography,
          monetisationSetup,
          areasToImprove,
          additionalInfo,
        }
      : undefined,
  };
}
