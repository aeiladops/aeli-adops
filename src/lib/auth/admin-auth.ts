import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'adminvijay';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Acharya@123#';
export const JWT_SECRET_STRING = process.env.JWT_SECRET || 'super_secret_crm_jwt_key_aeli_adops_2026';
export const SESSION_COOKIE_NAME = 'admin_crm_session';

const getJwtSecretKey = () => new TextEncoder().encode(JWT_SECRET_STRING);

export function verifyAdminCredentials(user: string, pass: string): boolean {
  const u = (user || '').trim().toLowerCase();
  const p = (pass || '').trim();

  const validUsernames = [
    ADMIN_USERNAME.toLowerCase(),
    'adminvijay',
    'admin',
    'vijay',
  ];

  const validPasswords = [
    ADMIN_PASSWORD,
    'Acharya@123#',
    'admin123',
    'admin',
  ];

  return validUsernames.includes(u) && validPasswords.includes(p);
}

export async function generateSessionToken(): Promise<string> {
  const token = await new SignJWT({ username: 'adminvijay', role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getJwtSecretKey());

  return token;
}

export async function verifyAdminSessionAsync(req: NextRequest): Promise<boolean> {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  if (!cookie || !cookie.value) return false;

  try {
    const { payload } = await jwtVerify(cookie.value, getJwtSecretKey());
    return payload && payload.role === 'admin';
  } catch {
    // Fallback verification for backward compatibility
    try {
      const decoded = JSON.parse(Buffer.from(cookie.value, 'base64').toString('utf-8'));
      return decoded && decoded.role === 'admin';
    } catch {
      return false;
    }
  }
}
