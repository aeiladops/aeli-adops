import { NextRequest, NextResponse } from 'next/server';
import { validatePublisherAuditForm } from '@/src/lib/validation/audit-form';
import { appendToGoogleSheets } from '@/src/lib/services/google-sheets-service';
import { sendAuditEmails } from '@/src/lib/services/resend-service';
import { generateWhatsAppRedirectUrl } from '@/src/lib/services/whatsapp-service';
import { createLeadInStore } from '@/src/lib/supabase';

const ipRateMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateMap.get(ip);

  if (!entry) {
    ipRateMap.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    return false;
  }

  if (now > entry.expiresAt) {
    ipRateMap.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    return false;
  }

  if (entry.count >= 5) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 1. Server-side validation & sanitization
    const validation = validatePublisherAuditForm(body);

    if (!validation.isValid || !validation.sanitizedData) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const sanitizedData = validation.sanitizedData;

    // 2. Save directly into CRM Database with unique Lead ID
    let newLead;
    try {
      newLead = await createLeadInStore({
        full_name: sanitizedData.name,
        company: sanitizedData.company,
        website: sanitizedData.website,
        email: sanitizedData.email,
        phone: sanitizedData.phone || '',
        form_source: 'Free Publisher Audit',
        service_requested: 'Free Publisher Audit',
        monthly_pageviews: sanitizedData.monthlyPageviews,
        website_category: sanitizedData.category,
        current_ad_platform: sanitizedData.monetisationSetup.join(', ') || 'Not Specified',
        audience_geography: sanitizedData.audienceGeography || 'Not Specified',
        requirements: sanitizedData.areasToImprove.join(', '),
        additional_info: sanitizedData.additionalInfo || '',
        status: 'New',
        priority: 'High',
      });
    } catch (crmErr) {
      console.warn('[API Route] Error creating lead in CRM:', crmErr);
    }

    // 3. Save to Google Sheets (Soft-fail log so user submission succeeds even if Google Sheets endpoint is unavailable)
    const sheetsResult = await appendToGoogleSheets(sanitizedData);
    if (!sheetsResult.success) {
      console.warn('[API Route] Google Sheets submission warning:', sheetsResult.error);
    }

    // 4. Send Resend Emails (Publisher & Admin) with Lead ID reference
    const emailResult = await sendAuditEmails(sanitizedData);
    let emailWarningMessage: string | undefined = undefined;

    if (emailResult.error || (!emailResult.publisherEmailSent && !emailResult.adminEmailSent)) {
      console.error('[API Route] Resend email warning:', emailResult.error);
      emailWarningMessage =
        "Your request has been received, but we couldn't send the confirmation email. Our team will still review your submission.";
    }

    // 5. Generate WhatsApp Redirect URL with complete formatted request details
    const { whatsappUrl } = generateWhatsAppRedirectUrl({
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      website: sanitizedData.website,
      company: sanitizedData.company,
      services: sanitizedData.areasToImprove,
      adPlatform: sanitizedData.monetisationSetup.join(', '),
      monthlyPageviews: sanitizedData.monthlyPageviews,
      category: sanitizedData.category,
      requirements: sanitizedData.additionalInfo,
      leadId: newLead?.id,
      formType: 'Free Publisher Audit',
    });

    return NextResponse.json({
      success: true,
      leadId: newLead?.id || 'AELI-2026-0001',
      message: emailWarningMessage || `Your audit request has been successfully submitted and logged in CRM. Reference ID: ${newLead?.id || 'AELI-2026-0001'}`,
      warning: emailWarningMessage,
      whatsappUrl,
    });
  } catch (error) {
    console.error('[API Route] Server error handling publisher audit request:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
