import { Resend } from 'resend';
import { PublisherAuditFormData } from '../validation/audit-form';
import { getPublisherConfirmationEmailHtml } from '../email-templates/publisher-confirmation';
import { getAdminNotificationEmailHtml } from '../email-templates/admin-notification';

export interface SendEmailResult {
  publisherEmailSent: boolean;
  adminEmailSent: boolean;
  error?: string;
}

export async function sendAuditEmails(data: PublisherAuditFormData): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@aeliadops.com';
  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey) {
    console.warn('[Resend Service] RESEND_API_KEY is not configured in environment variables. Email sending skipped.');
    return {
      publisherEmailSent: false,
      adminEmailSent: false,
      error: 'RESEND_API_KEY missing',
    };
  }

  const resend = new Resend(apiKey);
  let publisherEmailSent = false;
  let adminEmailSent = false;

  // 1. Publisher Confirmation Email
  try {
    const publisherHtml = getPublisherConfirmationEmailHtml(data);
    const pubResult = await resend.emails.send({
      from: fromEmail,
      to: [data.email],
      subject: "We've Received Your Publisher Audit Request | Aeli AdOps",
      html: publisherHtml,
    });

    if (pubResult.error) {
      console.error('[Resend Service] Error sending publisher confirmation:', pubResult.error);
    } else {
      publisherEmailSent = true;
      console.log('[Resend Service] Publisher confirmation email sent successfully to:', data.email);
    }
  } catch (err) {
    console.error('[Resend Service] Exception sending publisher confirmation email:', err);
  }

  // 2. Admin Notification Email
  try {
    const adminHtml = getAdminNotificationEmailHtml(data);
    const adminResult = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject: `New Publisher Audit Request — ${data.company}`,
      html: adminHtml,
    });

    if (adminResult.error) {
      console.error('[Resend Service] Error sending admin notification:', adminResult.error);
    } else {
      adminEmailSent = true;
      console.log('[Resend Service] Admin notification email sent successfully to:', adminEmail);
    }
  } catch (err) {
    console.error('[Resend Service] Exception sending admin notification email:', err);
  }

  return {
    publisherEmailSent,
    adminEmailSent,
  };
}
