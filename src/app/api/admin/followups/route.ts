import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionAsync } from '@/src/lib/auth/admin-auth';
import { fetchFollowUpsFromStore } from '@/src/lib/supabase';

export async function GET(req: NextRequest) {
  const isAuth = await verifyAdminSessionAsync(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const followUps = await fetchFollowUpsFromStore();
    return NextResponse.json({ success: true, followUps });
  } catch (error) {
    console.error('[API Admin FollowUps GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch follow ups' }, { status: 500 });
  }
}
