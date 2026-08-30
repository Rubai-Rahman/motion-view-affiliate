import { cookies } from 'next/headers';

const BASE_URL = process.env.BACKEND_API_URL; // e.g. https://internal-api.yourcompany.com
const INTERNAL_API_KEY = process.env.BACKEND_API_KEY; // optional server-to-server secret

if (!BASE_URL) {
  throw new Error(
    'BACKEND_API_URL is not defined in your environment variables',
  );
}

export type ApiResponse<T> =
  | { success: true; data: T; status: number }
  | { success: false; error: string; status: number };

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  auth?: boolean; // attach the user's session cookie as a Bearer token, default true
  cache?: RequestCache;
  revalidate?: number | false;
}

/**
 * Every server action should go through this function.
 * Keeps the backend URL, auth handling, and error shape in one place.
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    body,
    headers = {},
    auth = true,
    cache,
    revalidate,
  } = options;

  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (INTERNAL_API_KEY) {
    finalHeaders['x-internal-api-key'] = INTERNAL_API_KEY;
  }

  if (auth) {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    if (token) {
      finalHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const res = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
      cache,
      next: revalidate !== undefined ? { revalidate } : undefined,
    });
    const contentType = res.headers.get('content-type') || '';
    const payload = contentType.includes('application/json')
      ? await res.json().catch(() => null)
      : null;

    if (!res.ok) {
      return {
        success: false,
        error: payload?.message || res.statusText || 'Request failed',
        status: res.status,
      };
    }

    return { success: true, data: payload as T, status: res.status };
  } catch (err) {
    console.error(`[apiRequest] ${method} ${endpoint} failed:`, err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network error',
      status: 500,
    };
  }
}

// Convenience shorthands used by your action files
export const apiGet = <T>(
  endpoint: string,
  options?: Omit<RequestOptions, 'method'>,
) => apiRequest<T>(endpoint, { ...options, method: 'GET' });

export const apiPost = <T>(
  endpoint: string,
  body?: unknown,
  options?: Omit<RequestOptions, 'method' | 'body'>,
) => apiRequest<T>(endpoint, { ...options, method: 'POST', body });

export const apiPut = <T>(
  endpoint: string,
  body?: unknown,
  options?: Omit<RequestOptions, 'method' | 'body'>,
) => apiRequest<T>(endpoint, { ...options, method: 'PUT', body });

export const apiDelete = <T>(
  endpoint: string,
  options?: Omit<RequestOptions, 'method'>,
) => apiRequest<T>(endpoint, { ...options, method: 'DELETE' });
