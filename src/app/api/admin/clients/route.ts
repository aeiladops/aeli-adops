import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionAsync } from '@/src/lib/auth/admin-auth';
import { fetchClientsFromStore, createClientInStore } from '@/src/lib/supabase';

export async function GET(req: NextRequest) {
  const isAuth = await verifyAdminSessionAsync(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const clients = await fetchClientsFromStore();
    return NextResponse.json({ success: true, clients });
  } catch (error) {
    console.error('[API Admin Clients GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSessionAsync(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const client = await createClientInStore(body);
    return NextResponse.json({ success: true, client });
  } catch (error) {
    console.error('[API Admin Clients POST] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create client' }, { status: 500 });
  }
}
