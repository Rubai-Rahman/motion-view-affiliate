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
  email: string;
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
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  expiresAt: number;
}

/* -------------------------------------------------------------------------- */
/* Server-action result envelope                                              */
/* -------------------------------------------------------------------------- */

export type ActionResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string> };

export type LoginActionResult = ActionResult<AuthSession>;

/* -------------------------------------------------------------------------- */
/* API error helper                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Parses an unknown thrown value into a human-readable error string.
 * Handles fetch Response objects, plain Error instances, and
 * structured API responses ({ message, errors }).
 */
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
