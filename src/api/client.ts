const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://api.thinkhive.net/api').replace(/\/$/, '');

export interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

export class ApiError extends Error {
  status?: number;
  data?: any;

  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { timeout = 8000, retries = 1, ...fetchOptions } = options;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  let lastError: any;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(fetchOptions.headers || {}),
        },
      });

      clearTimeout(timer);

      let responseData: any;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        const errorMsg =
          (responseData && typeof responseData === 'object' && (responseData.message || responseData.error)) ||
          `Request failed with status ${response.status}`;
        throw new ApiError(Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg, response.status, responseData);
      }

      // If backend wrapped in { success: true, data: ... }, unwrap data
      if (responseData && typeof responseData === 'object' && 'data' in responseData && responseData.success === true) {
        return responseData.data as T;
      }

      return responseData as T;
    } catch (err: any) {
      clearTimeout(timer);
      lastError = err;

      // Don't retry client-side 4xx errors
      if (err instanceof ApiError && err.status && err.status >= 400 && err.status < 500) {
        throw err;
      }

      // If aborted by timeout
      if (err.name === 'AbortError') {
        lastError = new ApiError('Request timed out. Please check your connection.', 408);
      }

      // Wait brief backoff if retrying
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 300 * Math.pow(2, attempt)));
      }
    }
  }

  throw lastError || new ApiError('Network request failed');
}
