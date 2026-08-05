import { NextRequest, NextResponse } from 'next/server';
import { createLeadInStore } from '@/src/lib/supabase';
import { appendToGoogleSheets } from '@/src/lib/services/google-sheets-service';
import { generateWhatsAppRedirectUrl } from '@/src/lib/services/whatsapp-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      services,
      adPlatform,
      monthlyPageViews,
      websiteCategory,
      requirements,
      name,
      email,
      phone,
      websiteUrl,
      preferredContact,
      agreeToContact,
      honeypot,
    } = body;

    // Bot detection
    if (honeypot) {
      return NextResponse.json({ success: true }); // Silent fail for bots
    }

    // Validation
    const errors: Record<string, string> = {};

    if (!services || !Array.isArray(services) || services.length === 0) {
      errors.services = 'Please select at least one service';
    }
    if (!adPlatform) errors.adPlatform = 'Please select your current ad platform';
    if (!monthlyPageViews) errors.monthlyPageViews = 'Please select monthly page views';
    if (!websiteCategory) errors.websiteCategory = 'Please select a website category';
    if (!name?.trim()) errors.name = 'Full name is required';
    if (!email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email';
    }
    if (!websiteUrl?.trim()) errors.websiteUrl = 'Website URL is required';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // 1. Create CRM lead automatically
    let newLead;
    try {
      const selectedServicesStr = Array.isArray(services) ? services.join(', ') : services || 'Service Request';
      newLead = await createLeadInStore({
        full_name: name.trim(),
        company: '',
        website: websiteUrl.trim(),
        email: email.trim(),
        phone: phone?.trim() || '',
        form_source: 'Service Request',
        service_requested: selectedServicesStr,
        monthly_pageviews: monthlyPageViews,
        website_category: websiteCategory,
        current_ad_platform: adPlatform,
        preferred_contact_method: preferredContact || 'Email',
        requirements: requirements || '',
        status: 'New',
        priority: 'Medium',
      });
    } catch (crmErr) {
      console.warn('[API Service Request] Error creating lead in CRM:', crmErr);
    }

    // 2. Google Sheets Backup Sync (Soft-fail)
    try {
      await appendToGoogleSheets({
        name,
        company: 'Service Request',
        website: websiteUrl,
        email,
        phone: phone || '',
        category: websiteCategory,
        monthlyPageviews: monthlyPageViews,
        audienceGeography: 'Global',
        monetisationSetup: [adPlatform],
        areasToImprove: Array.isArray(services) ? services : [services],
        additionalInfo: requirements || '',
      });
    } catch (sheetsErr) {
      console.warn('[API Service Request] Google Sheets sync error:', sheetsErr);
    }

    // 3. Generate WhatsApp Redirect URL
    const { whatsappUrl } = generateWhatsAppRedirectUrl({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      website: websiteUrl.trim(),
      services: Array.isArray(services) ? services : [services],
      adPlatform,
      monthlyPageviews: monthlyPageViews,
      category: websiteCategory,
      requirements,
      leadId: newLead?.id,
      formType: 'Service Request',
    });

    return NextResponse.json({
      success: true,
      leadId: newLead?.id,
      message: `Service request submitted successfully and saved in CRM. Reference ID: ${newLead?.id || 'Received'}`,
      whatsappUrl,
    });
  } catch (error) {
    console.error('Service request submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
