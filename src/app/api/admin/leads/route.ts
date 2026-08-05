import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionAsync } from '@/src/lib/auth/admin-auth';
import { fetchLeadsFromStore, createLeadInStore } from '@/src/lib/supabase';

export async function GET(req: NextRequest) {
  const isAuth = await verifyAdminSessionAsync(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const status = searchParams.get('status') || '';
    const priority = searchParams.get('priority') || '';
    const source = searchParams.get('source') || '';

    let leads = await fetchLeadsFromStore();

    if (query) {
      leads = leads.filter(
        (l) =>
          l.full_name.toLowerCase().includes(query) ||
          (l.company && l.company.toLowerCase().includes(query)) ||
          l.website.toLowerCase().includes(query) ||
          l.email.toLowerCase().includes(query) ||
          l.id.toLowerCase().includes(query)
      );
    }

    if (status) {
      leads = leads.filter((l) => l.status === status);
    }

    if (priority) {
      leads = leads.filter((l) => l.priority === priority);
    }

    if (source) {
      leads = leads.filter((l) => l.form_source === source);
    }

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error('[API Admin Leads GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSessionAsync(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const newLead = await createLeadInStore(body);
    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    console.error('[API Admin Leads POST] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create lead' }, { status: 500 });
  }
}
