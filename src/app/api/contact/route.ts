import { NextRequest, NextResponse } from 'next/server';
import { createLeadInStore } from '@/src/lib/supabase';
import { appendToGoogleSheets } from '@/src/lib/services/google-sheets-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, website, pageviews, service, message } = body;

    if (!name?.trim() || !email?.trim() || !website?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields (Name, Email, Website, Message).' },
        { status: 400 }
      );
    }

    // 1. Create Lead in CRM
    let newLead;
    try {
      newLead = await createLeadInStore({
        full_name: name.trim(),
        company: company?.trim() || '',
        website: website.trim(),
        email: email.trim(),
        phone: phone?.trim() || '',
        form_source: 'Contact Form',
        service_requested: service || 'General Contact',
        monthly_pageviews: pageviews || 'Not Specified',
        additional_info: message.trim(),
        status: 'New',
        priority: 'Medium',
      });
    } catch (crmErr) {
      console.warn('[API Contact] Error saving lead to CRM:', crmErr);
    }

    // 2. Backup to Google Sheets
    try {
      await appendToGoogleSheets({
        name: name.trim(),
        company: company?.trim() || 'Contact Form Lead',
        website: website.trim(),
        email: email.trim(),
        phone: phone?.trim() || '',
        category: 'General',
        monthlyPageviews: pageviews || 'Not Specified',
        audienceGeography: 'Global',
        monetisationSetup: [service || 'Contact Form'],
        areasToImprove: [service || 'Contact Form'],
        additionalInfo: message.trim(),
      });
    } catch (sheetsErr) {
      console.warn('[API Contact] Google Sheets backup error:', sheetsErr);
    }

    return NextResponse.json({
      success: true,
      leadId: newLead?.id,
      message: `Thank you for contacting Aeli AdOps! We have received your inquiry. Reference ID: ${newLead?.id || 'Received'}`,
    });
  } catch (error) {
    console.error('[API Contact] Error handling contact form submission:', error);
    return NextResponse.json(
      { success: false, error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
