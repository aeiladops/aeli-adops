import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionAsync } from '@/src/lib/auth/admin-auth';
import { fetchAuditRequestsFromStore, updateAuditRequestInStore } from '@/src/lib/supabase';

export async function GET(req: NextRequest) {
  const isAuth = await verifyAdminSessionAsync(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const audits = await fetchAuditRequestsFromStore();
    return NextResponse.json({ success: true, audits });
  } catch (error) {
    console.error('[API Admin Audits GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch audit requests' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const isAuth = await verifyAdminSessionAsync(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, audit_status, assigned_to } = await req.json();
    const updated = await updateAuditRequestInStore(id, { audit_status, assigned_to });
    return NextResponse.json({ success: true, audit: updated });
  } catch (error) {
    console.error('[API Admin Audits PATCH] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update audit request' }, { status: 500 });
  }
}
