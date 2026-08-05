import { PublisherAuditFormData } from '../validation/audit-form';

export interface GoogleSheetsResult {
  success: boolean;
  error?: string;
}

export async function appendToGoogleSheets(data: PublisherAuditFormData): Promise<GoogleSheetsResult> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('[Google Sheets Service] GOOGLE_SHEETS_WEBHOOK_URL is not configured. Webhook submission skipped.');
    return {
      success: false,
      error: 'GOOGLE_SHEETS_WEBHOOK_URL missing',
    };
  }

  const payload = {
    timestamp: new Date().toISOString(),
    name: data.name,
    company: data.company,
    website: data.website,
    email: data.email,
    phone: data.phone || '',
    category: data.category,
    monthlyPageviews: data.monthlyPageviews,
    audienceGeography: data.audienceGeography,
    monetisationSetup: data.monetisationSetup.join(', '),
    areasToImprove: data.areasToImprove.join(', '),
    additionalInfo: data.additionalInfo || '',
    status: 'New Audit Request',
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      console.error('[Google Sheets Service] HTTP error submitting to Google Sheets:', response.status, text);
      return { success: false, error: `HTTP ${response.status}` };
    }

    console.log('[Google Sheets Service] Successfully appended row to Google Sheets.');
    return { success: true };
  } catch (err) {
    console.error('[Google Sheets Service] Network error submitting to Google Sheets:', err);
    return { success: false, error: 'Network error' };
  }
}
