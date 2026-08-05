import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/src/lib/auth/admin-auth';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    path: '/',
    maxAge: 0,
  });
  return response;
}
