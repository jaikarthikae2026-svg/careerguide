const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export type ApiEnvelope<T> = { success: boolean; data: T; message?: string };

let authToken = sessionStorage.getItem('careeros_token') || '';

export const getStoredGeminiKey = (): string => {
  return localStorage.getItem('careeros_gemini_api_key') || '';
};

export const setStoredGeminiKey = (key: string): void => {
  if (key.trim()) {
    localStorage.setItem('careeros_gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('careeros_gemini_api_key');
  }
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const geminiKey = getStoredGeminiKey();
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(geminiKey ? { 'x-gemini-api-key': geminiKey } : {}),
      ...options.headers,
    },
  });
  const payload = (await response.json()) as ApiEnvelope<T>;
  if (!response.ok || !payload.success) {
    throw new Error(payload.message || 'CareerOS API request failed');
  }
  return payload.data;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StudentContext {
  name?: string;
  targetRole?: string;
  targetCompany?: string;
  readinessScore?: number;
  level?: number;
  xp?: number;
  wellbeing?: string;
}

export interface InterviewEvaluation {
  id?: string;
  score: number;
  technicalScore: number;
  communicationScore: number;
  clarityScore: number;
  structureScore: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  idealAnswer?: string;
  provider: 'gemini' | 'mock';
  gamification?: any;
  updatedReadiness?: any;
}

export interface ResumeAnalysis {
  atsScore: number;
  jobMatchScore: number;
  keywordScore: number;
  strengths: string[];
  missingKeywords: string[];
  weakSections: string[];
  suggestions: string[];
  rule: string;
  provider: 'gemini' | 'mock';
}

export interface ResumeTailorResponse {
  rewrittenText: string;
  action: string;
  explanation: string;
  provider: 'gemini' | 'mock';
}

export interface AiStatus {
  provider: 'gemini' | 'mock';
  model: string;
  isAvailable: boolean;
  configuredVia: string;
}

export const careerApi = {
  async loginDemo() {
    const data = await request<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'alex@careeros.demo', password: 'password123' }),
    });
    authToken = data.token;
    sessionStorage.setItem('careeros_token', authToken);
  },
  dashboard: () => request<any>('/dashboard'),
  wellbeing: (wellbeing: 'FOCUSED' | 'OKAY' | 'STRESSED') =>
    request<any>('/missions/wellbeing', {
      method: 'POST',
      body: JSON.stringify({ wellbeing }),
    }),
  submitInterview: (payload: { type: string; question: string; answer: string; companyId?: string }) =>
    request<InterviewEvaluation>('/interviews', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // AI Specific API Calls
  getAiStatus: () => request<AiStatus>('/ai/status'),
  chat: (messages: ChatMessage[], context?: StudentContext) =>
    request<{ message: string; provider: 'gemini' | 'mock' }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ messages, context }),
    }),
  evaluateInterview: (payload: { type: string; question: string; answer: string; companyName?: string }) =>
    request<InterviewEvaluation>('/ai/mock/evaluate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  generateInterviewQuestion: (payload: { type: string; skillOrTopic?: string; companyName?: string; difficulty?: string }) =>
    request<{ question: string; topic: string; provider: 'gemini' | 'mock' }>('/ai/mock/question', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  analyzeResume: (payload?: { resumeContent?: string; targetRole?: string; companyName?: string }) =>
    request<ResumeAnalysis>('/resumes/resume-general/analyze', {
      method: 'POST',
      body: JSON.stringify(payload || {}),
    }),
  tailorResumeBullet: (payload: {
    bulletText: string;
    action: 'improve' | 'concise' | 'keywords' | 'quantify' | 'company';
    targetCompany?: string;
    targetRole?: string;
  }) =>
    request<ResumeTailorResponse>('/ai/resume/tailor', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
