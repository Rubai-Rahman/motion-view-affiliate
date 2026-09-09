/* -------------------------------------------------------------------------- */
/* Request payloads                                                           */
/* -------------------------------------------------------------------------- */

export interface LoginPayload {
  login: string; // email or phone
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  phone: string;
  address?: string;
  description?: string;
  type: number;
  password: string;
  password_confirmation: string;
}

export interface ForgotPasswordPayload {
  phone: string;
  password: string;
  password_confirmation: string;
}
export interface ResetPasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}

/* -------------------------------------------------------------------------- */
/* Response shapes                                                            */
/* -------------------------------------------------------------------------- */

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: number;
  address: string;
  affiliate_code: string;
  description: string;
  profile_picture: string;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  expiresAt: number;
}

export type ActionResult<T = undefined> =
  | { success: true; data: T; message?: string }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string>;
      message?: string;
    };

export type AuthActionResult = ActionResult<AuthSession>;

export async function parseApiError(err: unknown): Promise<string> {
  if (err instanceof Response) {
    try {
      const body = await err.json();
      if (typeof body?.message === 'string') return body.message;
      if (Array.isArray(body?.errors)) return body.errors.join(', ');
    } catch {
      return `Request failed with status ${err.status}`;
    }
  }
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return 'An unexpected error occurred. Please try again.';
}
