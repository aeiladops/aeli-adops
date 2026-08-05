import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, generateSessionToken, SESSION_COOKIE_NAME } from '@/src/lib/auth/admin-auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const token = await generateSessionToken();
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: { username: 'adminvijay', role: 'admin' },
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('[API Admin Login] Error during login:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred during authentication' },
      { status: 500 }
    );
  }
}
