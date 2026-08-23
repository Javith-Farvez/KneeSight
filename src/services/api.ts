/**
 * KneeSight AI — Base API Client
 * Connects to FastAPI backend with configurable base URL and error resilience.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  isFallback: boolean;
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: Error | null }> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second safety timeout

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorText = await res.text();
      return { data: null, error: new Error(`HTTP ${res.status}: ${errorText || res.statusText}`) };
    }

    const data = (await res.json()) as T;
    return { data, error: null };
  } catch (err: any) {
    clearTimeout(timeoutId);
    return {
      data: null,
      error: err instanceof Error ? err : new Error(String(err) || 'Network error occurred'),
    };
  }
}
