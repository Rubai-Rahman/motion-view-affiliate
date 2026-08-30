'use server';

import { apiPost } from '@/lib/fetch/fetchCore';
import { ActionResult, AuthSession, LoginPayload } from '@/types/auth.types';
import { cookies } from 'next/headers';

interface LoginResponseData {
  token: string;
  user: {
    id: string;
    login: string;
    name: string;
  };
}

export type LoginActionResult = ActionResult<AuthSession>;

export async function loginAction(
  payload: LoginPayload,
): Promise<LoginActionResult> {
  const { login, password } = payload;

  if (!login || !password) {
    return {
      success: false,
      error: 'Login and password are required',
    };
  }

  const result = await apiPost<LoginResponseData>(
    '/login',
    { login, password },
    { auth: false },
  );

  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }

  const cookieStore = await cookies();
  cookieStore.set('session_token', result.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    success: true,
    data: {
      user: {
        id: result.data.user.id,
        name: result.data.user.name,
        email: result.data.user.login,
        role: 'user',
      },
      accessToken: result.data.token,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
    },
  };
}
