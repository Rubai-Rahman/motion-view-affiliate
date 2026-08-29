'use server';

import { apiPost } from '@/lib/fetch/fetchCore';
import { cookies } from 'next/headers';

interface LoginPayload {
  login: string;
  password: string;
}

interface LoginResponseData {
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    login: string;
    name: string;
  };
}

export interface LoginActionResult {
  success: boolean;
  message: string;
  user?: LoginResponseData['user'];
}

export async function loginAction(
  payload: LoginPayload,
): Promise<LoginActionResult> {
  const { login, password } = payload;

  if (!login || !password) {
    return { success: false, message: 'Login and password are required' };
  }

  const result = await apiPost<LoginResponseData>(
    '/login',
    { login, password },
    { auth: false }, // no session exists yet
  );

  if (!result.success) {
    return { success: false, message: result.error };
  }

  const cookieStore = await cookies();
  cookieStore.set('session_token', result.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  if (result.data.refreshToken) {
    cookieStore.set('refresh_token', result.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return {
    success: true,
    message: 'Logged in successfully',
    user: result.data.user,
  };
}
