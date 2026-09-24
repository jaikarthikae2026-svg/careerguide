const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export type ApiEnvelope<T> = { success: boolean; data: T; message?: string; errors?: any[] };

export type UserRole =
  | 'student'
  | 'mentor'
  | 'alumni'
  | 'recruiter'
  | 'employer_admin'
  | 'career_coach'
  | 'platform_admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  location?: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  studentProfile?: {
    id: string;
    college: string;
    degree: string;
    graduationYear: number;
    targetRole: string;
    targetIndustry: string;
    currentReadiness: number;
    currentLevel: number;
    xp: number;
    weeklyAvailabilityHours: number;
    workModePreference: string;
    financialConstraints: boolean;
  };
  mentorProfile?: {
    id: string;
    jobTitle: string;
    organization: string;
    industry: string;
    yearsExperience: number;
    bio: string;
    isVerified: boolean;
  };
}

export interface OnboardingData {
  fullName: string;
  email: string;
  college: string;
  degree: string;
  graduationYear: number;
  location: string;
  targetRole: string;
  targetIndustry: string;
  preferredLanguage: string;
  weeklyAvailabilityHours: number;
  workModePreference: 'Remote' | 'Hybrid' | 'On-site';
  financialConstraints: boolean;
  resumeUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  diagnosticAnswers?: Record<string, number>;
}

let authToken = localStorage.getItem('careeros_token') || sessionStorage.getItem('careeros_token') || '';

export const getStoredAuthToken = (): string => authToken;

export const setStoredAuthToken = (token: string, persist = true): void => {
  authToken = token;
  if (token) {
    if (persist) localStorage.setItem('careeros_token', token);
    sessionStorage.setItem('careeros_token', token);
  } else {
    localStorage.removeItem('careeros_token');
    sessionStorage.removeItem('careeros_token');
  }
};

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
  const token = getStoredAuthToken();

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(geminiKey ? { 'x-gemini-api-key': geminiKey } : {}),
        ...options.headers,
      },
    });

    const payload = (await response.json()) as ApiEnvelope<T>;
    if (!response.ok || !payload.success) {
      throw new Error(payload.message || `Request failed with status ${response.status}`);
    }
    return payload.data;
  } catch (err: any) {
    // If backend is not running, log cleanly without breaking app
    console.warn(`[CareerOS API] ${path}:`, err.message || err);
    throw err;
  }
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

// -------------------------------------------------------------
// COMPREHENSIVE CAREEROS API CLIENT
// -------------------------------------------------------------

export const careerApi = {
  // Authentication & Session
  async register(data: { name: string; email: string; password: string; role?: UserRole }) {
    const res = await request<{ token: string; user: UserProfile }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setStoredAuthToken(res.token);
    return res;
  },

  async login(email: string, password = 'password123') {
    const res = await request<{ token: string; user: UserProfile }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setStoredAuthToken(res.token);
    return res;
  },

  async loginDemo(role: UserRole = 'student') {
    const emailMap: Record<UserRole, string> = {
      student: 'divya@careeros.demo',
      mentor: 'sneha.roy@careeros.demo',
      alumni: 'vikram.seth@careeros.demo',
      recruiter: 'recruiter@technova.demo',
      employer_admin: 'employer@careeros.demo',
      career_coach: 'coach@careeros.demo',
      platform_admin: 'admin@careeros.demo',
    };
    return this.login(emailMap[role] || 'divya@careeros.demo');
  },

  async getCurrentUser(): Promise<UserProfile> {
    return request<UserProfile>('/auth/me');
  },

  async submitOnboarding(data: OnboardingData) {
    return request<{ user: UserProfile; initialPlan: any }>('/auth/onboarding', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async switchRole(role: UserRole) {
    const res = await request<{ token: string; user: UserProfile }>('/auth/switch-role', {
      method: 'POST',
      body: JSON.stringify({ role }),
    });
    setStoredAuthToken(res.token);
    return res;
  },

  logout() {
    setStoredAuthToken('');
    localStorage.removeItem('careeros_token');
    sessionStorage.removeItem('careeros_token');
  },

  // Student Profile Management
  async getProfile() {
    try {
      const res = await request<{ user: UserProfile }>('/profile');
      if (res?.user) {
        localStorage.setItem('careeros_user_profile', JSON.stringify(res.user));
      }
      return res;
    } catch (e) {
      const cached = localStorage.getItem('careeros_user_profile');
      if (cached) {
        return { user: JSON.parse(cached) as UserProfile };
      }
      throw e;
    }
  },

  async updateProfile(data: any) {
    const res = await request<{ user: UserProfile; message?: string }>('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (res?.user) {
      localStorage.setItem('careeros_user_profile', JSON.stringify(res.user));
    }
    return res;
  },

  // Student Dashboard & Goals
  async getDashboard() {
    return request<any>('/dashboard');
  },

  async updateTargetRole(targetRole: string) {
    return request<any>('/student/target-role', {
      method: 'POST',
      body: JSON.stringify({ targetRole }),
    });
  },

  // Skills & Diagnostic Assessment
  async getSkillsTree() {
    return request<any>('/skills/tree');
  },

  async getSkillMission(skillName: string) {
    return request<any>(`/skills/missions/${encodeURIComponent(skillName)}`);
  },

  async completeSkillMission(skillName: string) {
    return request<any>(`/skills/missions/${encodeURIComponent(skillName)}/complete`, {
      method: 'POST',
    });
  },

  async updateSkillProficiency(skillId: string, proficiency: number) {
    return request<any>('/profile/skills', {
      method: 'POST',
      body: JSON.stringify({ skillId, proficiency }),
    });
  },

  async getDiagnosticAssessment() {
    return request<any>('/assessments/diagnostic');
  },

  async submitDiagnosticAssessment(answers: Record<string, number>) {
    return request<any>('/assessments/diagnostic/submit', {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  },

  // Projects & Evidence
  async getProjects() {
    return request<any[]>('/profile/projects');
  },

  async submitProjectEvidence(data: any) {
    return request<any>('/projects/evidence', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Career Pods
  async getCareerPods() {
    return request<any[]>('/network/pods');
  },

  async joinPod(podId: string) {
    return request<any>(`/network/pods/${podId}/join`, {
      method: 'POST',
    });
  },

  // Mentors & Alumni
  async getMentors() {
    return request<any[]>('/network/mentors');
  },

  async requestMentor(data: any) {
    return request<any>('/network/mentors/request', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Micro-Internships
  async getMicroInternships() {
    return request<any[]>('/micro-internships');
  },

  async applyMicroInternship(id: string, data: any) {
    return request<any>(`/micro-internships/${id}/apply`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // WorkReady Workplace Simulations
  async getWorkReadyScenarios() {
    return request<any[]>('/workready/scenarios');
  },

  async submitWorkReadyAttempt(scenarioId: string, selectedOptionId: string) {
    return request<any>('/workready/attempts', {
      method: 'POST',
      body: JSON.stringify({ scenarioId, selectedOptionId }),
    });
  },

  // Job Applications & Rejection Intelligence
  async getJobApplications() {
    return request<any[]>('/applications');
  },

  async createJobApplication(data: any) {
    return request<any>('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateJobApplicationStage(id: string, stage: string, notes?: string) {
    return request<any>(`/applications/${id}/stage`, {
      method: 'PUT',
      body: JSON.stringify({ stage, notes }),
    });
  },

  // AI & Gemini Endpoints
  async getAiStatus(): Promise<AiStatus> {
    return request<AiStatus>('/ai/status');
  },

  async chatWithMentor(messages: ChatMessage[], context?: StudentContext) {
    return request<{ reply: string; provider: 'gemini' | 'mock'; sources?: string[] }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ messages, context }),
    });
  },

  async evaluateInterviewAnswer(data: { type: string; question: string; answer: string; companyName?: string }) {
    return request<InterviewEvaluation>('/ai/mock/evaluate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async analyzeResume(data: { resumeContent: string; targetRole?: string; companyName?: string }) {
    return request<ResumeAnalysis>('/resumes/1/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async tailorResumeBullet(data: { bulletText: string; action: string; targetCompany?: string; targetRole?: string }) {
    return request<ResumeTailorResponse>('/ai/resume/tailor', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Diagnostic Assessment
  async getDiagnosticForRole(role = 'Junior Frontend Developer') {
    return request<any>(`/assessments/diagnostic?role=${encodeURIComponent(role)}`);
  },

  async submitDiagnostic(role: string, answers: Record<string, number>) {
    return request<any>('/assessments/diagnostic/submit', {
      method: 'POST',
      body: JSON.stringify({ role, answers }),
    });
  },

  // Learning Hub Lessons & Progress
  async getLearningLessons(role = 'Junior Frontend Developer') {
    return request<any[]>(`/learning/lessons?role=${encodeURIComponent(role)}`);
  },

  async completeLearningLesson(lessonId: string) {
    return request<any>(`/learning/lessons/${lessonId}/complete`, {
      method: 'POST',
    });
  },

  // Project Studio & Reviews
  async getProjectSubmissions() {
    return request<any[]>('/projects/submissions');
  },

  async submitProject(data: {
    title: string;
    role?: string;
    problemStatement: string;
    requiredSkills?: string[];
    repoUrl: string;
    liveDemoUrl?: string;
    decisionsNotes: string;
  }) {
    return request<any>('/projects/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async submitProjectReview(
    projectId: string,
    reviewData: {
      reviewerName?: string;
      reviewerRole?: string;
      organization?: string;
      correctnessScore: number;
      qualityScore: number;
      clarityScore: number;
      problemSolvingScore: number;
      strengthFeedback: string;
      improvementFeedback: string;
    },
  ) {
    return request<any>(`/projects/${projectId}/review`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  // Career Passport
  async getPassportProfile() {
    return request<any>('/passport/profile');
  },

  async updatePassportVisibility(visibility: 'Private' | 'Mentors only' | 'Recruiters only' | 'Public preview') {
    return request<any>('/passport/visibility', {
      method: 'PUT',
      body: JSON.stringify({ visibility }),
    });
  },

  // Readiness Engine
  async getReadinessBreakdown() {
    return request<any>('/readiness');
  },

  // Mentor & Reviewer Portal
  async getMentorReviewQueue() {
    return request<any[]>('/mentor/reviews/queue');
  },

  async respondMentorReview(id: string, action: 'accept' | 'decline', reason?: string) {
    return request<any>(`/mentor/reviews/${id}/respond`, {
      method: 'POST',
      body: JSON.stringify({ action, reason }),
    });
  },

  async evaluateProjectReview(
    id: string,
    data: {
      action: 'approve_verify' | 'request_changes';
      reviewerName?: string;
      reviewerRole?: string;
      organization?: string;
      correctnessScore: number;
      qualityScore: number;
      clarityScore: number;
      documentationScore?: number;
      problemSolvingScore: number;
      decisionExplainingScore?: number;
      professionalismScore?: number;
      strengthFeedback: string;
      improvementFeedback: string;
      changeRequestDetails?: string;
    },
  ) {
    return request<any>(`/mentor/reviews/${id}/evaluate`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async resubmitProject(
    id: string,
    data: {
      repoUrl: string;
      liveDemoUrl?: string;
      revisionNotes: string;
    },
  ) {
    return request<any>(`/projects/${id}/resubmit`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // In-App Notifications
  async getInAppNotifications() {
    return request<{ notifications: any[]; unreadCount: number }>('/notifications');
  },

  async markNotificationAsRead(id: string) {
    return request<{ unreadCount: number }>(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  },

  async markAllNotificationsAsRead() {
    return request<{ unreadCount: number }>('/notifications/read-all', {
      method: 'PUT',
    });
  },

  // Secure File Storage
  async getSecureFiles() {
    return request<any[]>('/files');
  },

  async uploadSecureFile(data: {
    fileName: string;
    fileType: string;
    fileSize: string;
    category: 'Resume' | 'Certificate' | 'Project Proof' | 'Screenshot';
  }) {
    return request<any>('/files/upload', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async deleteSecureFile(id: string) {
    return request<any>(`/files/${id}`, {
      method: 'DELETE',
    });
  },

  // Account Management
  async resetPassword(email: string) {
    return request<any>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async deleteAccount() {
    return request<any>('/auth/account', {
      method: 'DELETE',
    });
  },

  // Career Pods & Peer Reviews
  async completePodTask(podId: string, taskId: string) {
    return request<any>(`/network/pods/${podId}/tasks/${taskId}/complete`, {
      method: 'POST',
    });
  },

  async submitPeerReview(podId: string, data: any) {
    return request<any>(`/network/pods/${podId}/peer-reviews`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Rejection Intelligence
  async getRejectionInsights() {
    return request<any>('/applications/rejection-insights');
  },

  // Backward-compatible method aliases
  async wellbeing(wb: string) {
    return request<any>('/missions/wellbeing', {
      method: 'POST',
      body: JSON.stringify({ wellbeing: wb }),
    });
  },

  async generateInterviewQuestion(data: any) {
    return request<any>('/ai/mock/question', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async evaluateInterview(data: any) {
    return this.evaluateInterviewAnswer(data);
  },

  async chat(messages: ChatMessage[], context?: StudentContext) {
    return this.chatWithMentor(messages, context);
  },
};
