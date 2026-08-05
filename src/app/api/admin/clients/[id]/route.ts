import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionAsync } from '@/src/lib/auth/admin-auth';
import { updateClientInStore } from '@/src/lib/supabase';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const isAuth = await verifyAdminSessionAsync(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await updateClientInStore(id, body);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, client: updated });
  } catch (error) {
    console.error('[API Admin Client PATCH] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update client' }, { status: 500 });
  }
}
