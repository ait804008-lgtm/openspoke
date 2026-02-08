// API client for openSpoke

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: HeadersInit;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Trips API
export const tripsApi = {
  list: (dispatcherId?: string) =>
    request<{ trips: any[] }>(`/trips${dispatcherId ? `?dispatcherId=${dispatcherId}` : ''}`),

  get: (id: string) => request<any>(`/trips/${id}`),

  create: (trip: any) => request<any>('/trips', { method: 'POST', body: trip }),

  update: (id: string, updates: any) =>
    request<any>(`/trips/${id}`, { method: 'PUT', body: updates }),

  delete: (id: string) => request<any>(`/trips/${id}`, { method: 'DELETE' }),

  optimize: async (id: string): Promise<{ optimizedRoute: any }> => {
    // Mock route optimization
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      optimizedRoute: {
        distance: 5000 + Math.random() * 10000,
        duration: 1200 + Math.random() * 1800,
        polyline: '',
      },
    };
  },
};

// Stops API
export const stopsApi = {
  list: (tripId?: string) =>
    request<{ stops: any[] }>(`/stops${tripId ? `?tripId=${tripId}` : ''}`),

  get: (id: string) => request<any>(`/stops/${id}`),

  create: (stop: any) => request<any>('/stops', { method: 'POST', body: stop }),

  update: (id: string, updates: any) =>
    request<any>(`/stops/${id}`, { method: 'PUT', body: updates }),

  delete: (id: string) => request<any>(`/stops/${id}`, { method: 'DELETE' }),

  updateStatus: (id: string, status: string) =>
    request<any>(`/stops/${id}`, { method: 'PUT', body: { status } }),
};

// Auth API (mock)
export const authApi = {
  login: async (email: string, password: string, role: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      user: {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0],
        role,
        avatar: `https://ui-avatars.com/api/?name=${email}&background=random`,
        createdAt: new Date().toISOString(),
      },
    };
  },
};

export default { tripsApi, stopsApi, authApi };
