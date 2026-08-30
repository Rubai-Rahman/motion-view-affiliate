'use server';

import { apiPost } from '@/lib/fetch/fetchCore';

import {
  ActionResult,
  AuthSession,
  LoginPayload,
  SignupPayload,
} from '@/types/auth.types';

import { cookies } from 'next/headers';

interface LoginResponseData {
  success: boolean;
  message: string;
  token: string;
  token_type: string;
  data: {
    id: number;
    name: string;
    email: string;
    phone: string;
    profile_picture: string;
    address: string;
    description: string;
    affiliate_code: string;
    commission_rate: string;
    customer_discount_rate: string;
    type: number;
    status: number;
  };
}

interface SignupResponseData {
  token: string;
  user: {
    id: string;
    login: string;
    name: string;
    type: number;
  };
}

export type LoginActionResult = ActionResult<AuthSession>;
export type SignupActionResult = ActionResult<AuthSession>;

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
  console.log('result===', result);

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
        id: String(result.data.data.id),
        name: result.data.data.name,
        email: result.data.data.email,
        phone: result.data.data.phone,
        type: result.data.data.type,
      },
      accessToken: result.data.token,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
    },
  };
}

export async function signupAction(
  payload: SignupPayload,
): Promise<SignupActionResult> {
  const result = await apiPost<SignupResponseData>('/signup', payload, {
    auth: false,
  });

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
        type: result.data.user.type,
      },
      accessToken: result.data.token,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
    },
  };
}
