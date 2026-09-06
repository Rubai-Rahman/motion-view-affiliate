'use server';

import { apiPost } from '@/lib/fetch/fetchCore';
import {
  ActionResult,
  AuthSession,
  LoginPayload,
  SignupPayload,
} from '@/types/auth.types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface LoginResponseData {
  success: boolean;
  message: string;
  token: string;
  token_type: string;
  status?: number;
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

export interface SignupResult {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    affiliateCode: string;
    status: number;
  };
}

export type LoginActionResult = ActionResult<AuthSession>;
export type SignupActionResult = ActionResult<SignupResult>;

/**
 * Store authentication session token.
 */
async function setSessionCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set('session_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Create AuthSession from API response.
 */
function createAuthSession(
  user: {
    id: string | number;
    name: string;
    email: string;
    phone?: string;
    type: number;
  },
  token: string,
): AuthSession {
  return {
    user: {
      id: String(user.id),
      name: user.name,
      email: user.email,
      ...(user.phone ? { phone: user.phone } : {}),
      type: user.type,
    },
    accessToken: token,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };
}

/**
 * Login user.
 */
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
  if (result.data.status == 0) {
    redirect('/onboard');
  }
  await setSessionCookie(result.data.token);

  return {
    success: true,
    data: createAuthSession(
      {
        id: result.data.data.id,
        name: result.data.data.name,
        email: result.data.data.email,
        phone: result.data.data.phone,
        type: result.data.data.type,
      },
      result.data.token,
    ),
  };
}

/**
 * Register a new user.
 */
export async function signupAction(
  payload: SignupPayload,
): Promise<SignupActionResult> {
  const result = await apiPost<SignupResult>('/register', payload, {
    auth: false,
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}

/**
 * Logout user.
 */
export async function logoutAction(): Promise<ActionResult<null>> {
  const cookieStore = await cookies();

  cookieStore.delete('session_token');

  return {
    success: true,
    data: null,
  };
}
