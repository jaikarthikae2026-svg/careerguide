const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type ApiEnvelope<T> = { success: boolean; data: T; message?: string };

let authToken = sessionStorage.getItem('careeros_token') || '';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? {Authorization: `Bearer ${authToken}`} : {}),
      ...options.headers,
    },
  });
  const payload = (await response.json()) as ApiEnvelope<T>;
  if (!response.ok || !payload.success) {
    throw new Error(payload.message || 'CareerOS API request failed');
  }
  return payload.data;
}

export const careerApi = {
  async loginDemo() {
    const data = await request<{token: string}>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({email: 'alex@careeros.demo', password: 'password123'}),
    });
    authToken = data.token;
    sessionStorage.setItem('careeros_token', authToken);
  },
  dashboard: () => request<any>('/dashboard'),
  wellbeing: (wellbeing: 'FOCUSED' | 'OKAY' | 'STRESSED') => request<any>('/missions/wellbeing', {
    method: 'POST',
    body: JSON.stringify({wellbeing}),
  }),
  submitInterview: (payload: {type: string; question: string; answer: string; companyId?: string}) => request<any>('/interviews', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
};
