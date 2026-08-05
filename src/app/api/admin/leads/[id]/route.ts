import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionAsync } from '@/src/lib/auth/admin-auth';
import {
  fetchLeadByIdFromStore,
  updateLeadInStore,
  addNoteToLeadInStore,
  convertLeadToClientInStore,
} from '@/src/lib/supabase';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const isAuth = await verifyAdminSessionAsync(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const lead = await fetchLeadByIdFromStore(id);
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('[API Admin Lead GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch lead' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const isAuth = await verifyAdminSessionAsync(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    // Check if adding a note
    if (body.action === 'add_note' && body.noteText) {
      const updated = await addNoteToLeadInStore(id, body.noteText, body.author || 'Admin');
      return NextResponse.json({ success: true, lead: updated });
    }

    // Check if updating follow up
    const updated = await updateLeadInStore(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error('[API Admin Lead PATCH] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const isAuth = await verifyAdminSessionAsync(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    if (body.action === 'convert_to_client') {
      const result = await convertLeadToClientInStore(id);
      if (!result) {
        return NextResponse.json({ success: false, error: 'Lead not found or conversion failed' }, { status: 404 });
      }
      return NextResponse.json({ success: true, ...result });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('[API Admin Lead POST] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to perform lead action' }, { status: 500 });
  }
}
