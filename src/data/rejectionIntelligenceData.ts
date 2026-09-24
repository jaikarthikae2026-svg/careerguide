export type ApplicationStage =
  | 'Saved'
  | 'Applied'
  | 'Resume review'
  | 'Assessment'
  | 'Technical interview'
  | 'Behavioral interview'
  | 'Final interview'
  | 'Offer'
  | 'Rejected'
  | 'Withdrawn';

export type RejectionReasonType = 'CONFIRMED' | 'PROBABLE' | 'UNKNOWN';

export interface JobApplication {
  id: string;
  company: string;
  logo: string;
  role: string;
  applicationDate: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  source: 'Campus Placement' | 'Career Network Referral' | 'LinkedIn' | 'Company Portal';
  resumeVersion: string;
  referralUsed?: string;
  currentStage: ApplicationStage;
  outcome: 'Active' | 'Rejected' | 'Offer' | 'Withdrawn';
  rejectionStage?: 'Resume screening' | 'Online assessment' | 'Technical interview' | 'Behavioral interview' | 'Final interview';
  rejectionReasonType?: RejectionReasonType;
  employerFeedback?: string;
  patternInference?: string;
  interviewQuestions?: string[];
  assessmentScore?: string;
  studentNotes?: string;
  jobDescriptionUrl?: string;
  appliedProjects?: string[];
}

export interface RejectionBlocker {
  id: string;
  title: string;
  impactLevel: 'High Impact' | 'Medium Impact' | 'Low Impact';
  confidenceLevel: 'Confirmed by employer' | 'Strong pattern' | 'Possible pattern' | 'Unknown';
  confidenceType: RejectionReasonType;
  evidence: string;
  explanation: string;
  recommendedAction: string;
  linkedFeature: string;
  pageTarget: string;
  estimatedEffortHours: string;
}

export interface ImprovementTask {
  id: string;
  stepNumber: number;
  title: string;
  source: 'Learning Hub' | 'Mock Arena' | 'Skill Tree' | 'Career Network' | 'Project Studio';
  sourcePage: string;
  status: 'Not started' | 'In progress' | 'Completed';
  estimatedHours: string;
  description: string;
}

export interface ImprovementPlanData {
  goal: string;
  targetRole: string;
  currentReadiness: number;
  predictedReadiness: number;
  estimatedEffort: string;
  tasks: ImprovementTask[];
  disclaimer: string;
}

export interface RecoveryTimelineEvent {
  id: string;
  date: string;
  title: string;
  type: 'REJECTION' | 'GAP_IDENTIFIED' | 'LEARNING_COMPLETED' | 'ASSESSMENT_PASSED' | 'PROJECT_ADDED' | 'MENTOR_REVIEW';
  description: string;
  scoreChange?: string;
}

export interface FunnelStageMetric {
  stage: string;
  count: number;
  dropOffRate: number;
  conversionRate: number;
  rejectionCount: number;
  stageKey: string;
}

// -------------------------------------------------------------
// 18 REALISTIC JOB APPLICATIONS WITH OUTCOMES
// -------------------------------------------------------------

export const sampleApplicationsData: JobApplication[] = [
  {
    id: 'app-1',
    company: 'Razorpay',
    logo: 'RZ',
    role: 'Junior Frontend Engineer',
    applicationDate: '12 Aug 2026',
    location: 'Bengaluru, India',
    workMode: 'Hybrid',
    source: 'Career Network Referral',
    resumeVersion: 'ATS_Software_Dev_Resume_v3.pdf',
    referralUsed: 'Vikram Seth (Alumni - IIT Bombay)',
    currentStage: 'Rejected',
    outcome: 'Rejected',
    rejectionStage: 'Online assessment',
    rejectionReasonType: 'PROBABLE',
    employerFeedback: 'Thank you for participating. While your profile was strong, we are moving forward with candidates who scored in the 90th percentile on the data structures test.',
    patternInference: 'Passed resume screening smoothly, but stopped at DSA assessment. Testing and JavaScript problem-solving speed were key contributing factors.',
    assessmentScore: '72% (Cutoff: 85%)',
    studentNotes: 'Ran out of time on Question 3 (Graph traversal). Need faster dynamic programming patterns.',
    appliedProjects: ['Placement Analytics Dashboard', 'Merchant Checkout Flow'],
  },
  {
    id: 'app-2',
    company: 'Swiggy',
    logo: 'SW',
    role: 'Associate Software Developer (Frontend)',
    applicationDate: '18 Aug 2026',
    location: 'Bengaluru, India',
    workMode: 'Hybrid',
    source: 'Campus Placement',
    resumeVersion: 'ATS_Software_Dev_Resume_v3.pdf',
    currentStage: 'Rejected',
    outcome: 'Rejected',
    rejectionStage: 'Online assessment',
    rejectionReasonType: 'PROBABLE',
    employerFeedback: 'Automated notification: Assessment score did not meet the sectional benchmark for core JavaScript fundamentals.',
    patternInference: 'Second consecutive assessment drop-off in JavaScript closures and async promise scheduling.',
    assessmentScore: '68% (Cutoff: 80%)',
    studentNotes: 'Struggled on event-loop priority question.',
    appliedProjects: ['Accessible Merchant Checkout Flow'],
  },
  {
    id: 'app-3',
    company: 'Microsoft India',
    logo: 'MS',
    role: 'Software Engineering Trainee',
    applicationDate: '24 Aug 2026',
    location: 'Hyderabad, India',
    workMode: 'Hybrid',
    source: 'Career Network Referral',
    resumeVersion: 'ATS_Software_Dev_Resume_v3.pdf',
    referralUsed: 'Sneha Roy (Senior Engineer - Microsoft)',
    currentStage: 'Technical interview',
    outcome: 'Active',
    rejectionStage: undefined,
    employerFeedback: 'Technical Round 1 scheduled for next Tuesday.',
    studentNotes: 'Preparing binary tree traversals and React custom hook optimizations.',
    appliedProjects: ['Placement Analytics Dashboard', 'FinPulse Currency Formatter'],
  },
  {
    id: 'app-4',
    company: 'Cred',
    logo: 'CR',
    role: 'Frontend Engineer (Design Systems)',
    applicationDate: '5 Aug 2026',
    location: 'Bengaluru, India',
    workMode: 'On-site',
    source: 'LinkedIn',
    resumeVersion: 'ATS_Software_Dev_Resume_v2.pdf',
    currentStage: 'Rejected',
    outcome: 'Rejected',
    rejectionStage: 'Technical interview',
    rejectionReasonType: 'CONFIRMED',
    employerFeedback: 'Candidate showed great visual aesthetics, but we required hands-on experience building automated unit tests (Jest/Vitest) and CI component pipelines which was missing from the project walkthrough.',
    patternInference: 'Confirmed employer feedback: Missing automated unit testing project evidence.',
    interviewQuestions: ['How do you test custom hooks in isolation?', 'Explain how you set up visual regression testing in Storybook.'],
    studentNotes: 'Interviewer asked in-depth questions on Jest mocking and rendering tests.',
    appliedProjects: ['Accessible Merchant Checkout Flow'],
  },
  {
    id: 'app-5',
    company: 'Zoho Corporation',
    logo: 'ZH',
    role: 'Member Technical Staff',
    applicationDate: '28 Jul 2026',
    location: 'Chennai, India',
    workMode: 'On-site',
    source: 'Campus Placement',
    resumeVersion: 'ATS_Software_Dev_Resume_v1.pdf',
    currentStage: 'Rejected',
    outcome: 'Rejected',
    rejectionStage: 'Online assessment',
    rejectionReasonType: 'UNKNOWN',
    employerFeedback: 'No specific feedback provided.',
    patternInference: 'Assessment stage drop-off. Pattern correlates with timing out on complex C++/Java OOP questions.',
    assessmentScore: '70%',
    studentNotes: 'Zoho Round 2 coding test was quite lengthy.',
  },
  {
    id: 'app-6',
    company: 'Postman India',
    logo: 'PM',
    role: 'Associate Developer Advocate / UI',
    applicationDate: '15 Aug 2026',
    location: 'Bengaluru, India',
    workMode: 'Remote',
    source: 'Company Portal',
    resumeVersion: 'ATS_Software_Dev_Resume_v3.pdf',
    currentStage: 'Resume review',
    outcome: 'Active',
    studentNotes: 'Recruiter viewed application 2 days ago.',
  },
  {
    id: 'app-7',
    company: 'Flipkart',
    logo: 'FK',
    role: 'UI Engineer 1',
    applicationDate: '10 Jul 2026',
    location: 'Bengaluru, India',
    workMode: 'Hybrid',
    source: 'LinkedIn',
    resumeVersion: 'ATS_Software_Dev_Resume_v1.pdf',
    currentStage: 'Rejected',
    outcome: 'Rejected',
    rejectionStage: 'Resume screening',
    rejectionReasonType: 'PROBABLE',
    employerFeedback: 'No direct feedback provided.',
    patternInference: 'Resume screening drop-off on early Resume v1. Keyword match was 62% prior to ATS optimization.',
    studentNotes: 'Applied with older resume before updating to ATS-optimized version in Resume Intelligence.',
  },
  {
    id: 'app-8',
    company: 'NovaMetrics Analytics',
    logo: 'NM',
    role: 'Junior Data & Frontend Analyst',
    applicationDate: '20 Aug 2026',
    location: 'Hyderabad, India',
    workMode: 'Remote',
    source: 'Campus Placement',
    resumeVersion: 'ATS_Software_Dev_Resume_v3.pdf',
    currentStage: 'Behavioral interview',
    outcome: 'Active',
    studentNotes: 'Completed technical take-home micro-internship with 88% score. Final manager round scheduled.',
  },
  {
    id: 'app-9',
    company: 'Amazon India',
    logo: 'AZ',
    role: 'Backend SDE-1',
    applicationDate: '2 Jul 2026',
    location: 'Hyderabad, India',
    workMode: 'Hybrid',
    source: 'Company Portal',
    resumeVersion: 'ATS_Software_Dev_Resume_v1.pdf',
    currentStage: 'Rejected',
    outcome: 'Rejected',
    rejectionStage: 'Resume screening',
    rejectionReasonType: 'PROBABLE',
    patternInference: 'Role targeting misalignment: Applied to distributed backend role while portfolio evidence is 85% frontend React.',
    studentNotes: 'Profile was primarily frontend-focused; lacked distributed systems proof.',
  },
  {
    id: 'app-10',
    company: 'PhonePe',
    logo: 'PP',
    role: 'Software Engineer (Frontend)',
    applicationDate: '8 Aug 2026',
    location: 'Bengaluru, India',
    workMode: 'On-site',
    source: 'Campus Placement',
    resumeVersion: 'ATS_Software_Dev_Resume_v2.pdf',
    currentStage: 'Rejected',
    outcome: 'Rejected',
    rejectionStage: 'Technical interview',
    rejectionReasonType: 'CONFIRMED',
    employerFeedback: 'Strong communication and React knowledge. However, the candidate struggled to optimize component re-renders during live coding and was hesitant on WebSocket state synchronization.',
    patternInference: 'Confirmed employer feedback: React performance profiling and WebSocket state sync.',
    studentNotes: 'Interviewer asked to live profile a 10,000-item table with React DevTools.',
  },
  {
    id: 'app-11',
    company: 'Urban Company',
    logo: 'UC',
    role: 'Frontend Developer Intern',
    applicationDate: '14 Aug 2026',
    location: 'Gurugram, India',
    workMode: 'Hybrid',
    source: 'LinkedIn',
    resumeVersion: 'ATS_Software_Dev_Resume_v3.pdf',
    currentStage: 'Assessment',
    outcome: 'Active',
    studentNotes: 'Assessment link received; deadline in 3 days.',
  },
  {
    id: 'app-12',
    company: 'Groww',
    logo: 'GW',
    role: 'Associate Frontend Engineer',
    applicationDate: '25 Jul 2026',
    location: 'Bengaluru, India',
    workMode: 'Hybrid',
    source: 'Company Portal',
    resumeVersion: 'ATS_Software_Dev_Resume_v2.pdf',
    currentStage: 'Rejected',
    outcome: 'Rejected',
    rejectionStage: 'Online assessment',
    rejectionReasonType: 'UNKNOWN',
    employerFeedback: 'No reason specified.',
    patternInference: 'Assessment drop-off. Candidate completed 2 of 3 questions.',
  },
  {
    id: 'app-13',
    company: 'Zepto',
    logo: 'ZP',
    role: 'Frontend SDE-1',
    applicationDate: '19 Jul 2026',
    location: 'Mumbai, India',
    workMode: 'On-site',
    source: 'LinkedIn',
    resumeVersion: 'ATS_Software_Dev_Resume_v2.pdf',
    currentStage: 'Rejected',
    outcome: 'Rejected',
    rejectionStage: 'Resume screening',
    rejectionReasonType: 'UNKNOWN',
    employerFeedback: 'We have received an overwhelmingly high volume of applications and cannot proceed at this time.',
    patternInference: 'High applicant volume; standard competitive resume filtering.',
  },
  {
    id: 'app-14',
    company: 'Juspay',
    logo: 'JP',
    role: 'UI Functional Engineer',
    applicationDate: '11 Jul 2026',
    location: 'Bengaluru, India',
    workMode: 'On-site',
    source: 'Campus Placement',
    resumeVersion: 'ATS_Software_Dev_Resume_v1.pdf',
    currentStage: 'Rejected',
    outcome: 'Rejected',
    rejectionStage: 'Online assessment',
    rejectionReasonType: 'CONFIRMED',
    employerFeedback: 'Candidate did not complete the PureScript / Functional programming challenge within the allotted 60 minutes.',
    patternInference: 'Niche functional language requirement not covered in current curriculum.',
  },
  {
    id: 'app-15',
    company: 'Hasura',
    logo: 'HS',
    role: 'Frontend Engineer',
    applicationDate: '30 Jul 2026',
    location: 'Remote',
    workMode: 'Remote',
    source: 'Career Network Referral',
    resumeVersion: 'ATS_Software_Dev_Resume_v3.pdf',
    currentStage: 'Rejected',
    outcome: 'Rejected',
    rejectionStage: 'Technical interview',
    rejectionReasonType: 'CONFIRMED',
    employerFeedback: 'The role was filled by an internal team transfer. Your technical performance was rated 4/5 by the engineering interviewer.',
    patternInference: 'Confirmed reason: Position filled internally. Technical performance was strong.',
  },
  {
    id: 'app-16',
    company: 'Dunzo',
    logo: 'DZ',
    role: 'Frontend Trainee',
    applicationDate: '22 Jun 2026',
    location: 'Bengaluru, India',
    workMode: 'On-site',
    source: 'Campus Placement',
    resumeVersion: 'ATS_Software_Dev_Resume_v1.pdf',
    currentStage: 'Rejected',
    outcome: 'Rejected',
    rejectionStage: 'Resume screening',
    rejectionReasonType: 'UNKNOWN',
  },
  {
    id: 'app-17',
    company: 'CleverTap',
    logo: 'CT',
    role: 'Junior UI Engineer',
    applicationDate: '16 Aug 2026',
    location: 'Mumbai, India',
    workMode: 'Hybrid',
    source: 'LinkedIn',
    resumeVersion: 'ATS_Software_Dev_Resume_v3.pdf',
    currentStage: 'Applied',
    outcome: 'Active',
    studentNotes: 'Submitted via company career portal.',
  },
  {
    id: 'app-18',
    company: 'Chargebee',
    logo: 'CB',
    role: 'Associate Frontend Developer',
    applicationDate: '10 Aug 2026',
    location: 'Chennai, India',
    workMode: 'Remote',
    source: 'Company Portal',
    resumeVersion: 'ATS_Software_Dev_Resume_v3.pdf',
    currentStage: 'Resume review',
    outcome: 'Active',
    studentNotes: 'Under hiring manager review.',
  },
];

// -------------------------------------------------------------
// TOP 3 DIAGNOSTIC BLOCKERS
// -------------------------------------------------------------

export const rejectionBlockersData: RejectionBlocker[] = [
  {
    id: 'blocker-1',
    title: 'Technical Screening & Timed Problem Solving',
    impactLevel: 'High Impact',
    confidenceLevel: 'Strong pattern',
    confidenceType: 'PROBABLE',
    evidence: 'Reached online technical assessments 5 times across top employers, but passed 1 time (20% pass rate).',
    explanation:
      'Based on recorded outcomes, JavaScript async closures, graph traversals, and time management in 60-minute coding tests represent the most frequent bottleneck before reaching live interview rounds.',
    recommendedAction:
      'Complete the timed 45-minute JavaScript & DSA problem-solving track in Learning Hub and practice 2 timed simulations in Mock Arena.',
    linkedFeature: 'Mock Arena (Timed Technical Round)',
    pageTarget: 'Mock Arena',
    estimatedEffortHours: '4–6 hours',
  },
  {
    id: 'blocker-2',
    title: 'Portfolio Automated Testing Evidence',
    impactLevel: 'Medium Impact',
    confidenceLevel: 'Confirmed by employer',
    confidenceType: 'CONFIRMED',
    evidence: 'Cred and PhonePe interviewers explicitly cited a lack of unit tests (Jest/Vitest) and component test coverage on submitted projects.',
    explanation:
      'Leading engineering teams require candidates to prove they write maintainable, tested code. Adding unit tests and CI badges to your existing React projects directly resolves this blocker.',
    recommendedAction:
      'Add Vitest/Jest unit tests and an automated GitHub Actions test badge to your Placement Analytics and Merchant Checkout projects.',
    linkedFeature: 'Skill Tree (Software Testing & QA)',
    pageTarget: 'Skill Tree',
    estimatedEffortHours: '3–4 hours',
  },
  {
    id: 'blocker-3',
    title: 'Role Targeting Alignment',
    impactLevel: 'Medium Impact',
    confidenceLevel: 'Possible pattern',
    confidenceType: 'PROBABLE',
    evidence: '3 of your 18 applications were for pure backend/distributed systems roles where your current evidence match is under 60%.',
    explanation:
      'Your verified project evidence is 85% focused on React, TypeScript, and UI data visualization. Focusing on Junior Frontend and UI Analyst roles yields a 3x higher interview shortlist rate.',
    recommendedAction:
      'Align applications to Junior Frontend Developer, UI Engineer, and Data Analytics Analyst roles in Company Fit.',
    linkedFeature: 'Company Fit (Role Alignment)',
    pageTarget: 'Company Fit',
    estimatedEffortHours: '1 hour',
  },
];

// -------------------------------------------------------------
// APPLICATION FUNNEL STATISTICS
// -------------------------------------------------------------

export const funnelStagesData: FunnelStageMetric[] = [
  { stage: 'Applications Submitted', count: 18, dropOffRate: 0, conversionRate: 100, rejectionCount: 0, stageKey: 'Applied' },
  { stage: 'Resume Views / Screenings', count: 7, dropOffRate: 61, conversionRate: 39, rejectionCount: 4, stageKey: 'Resume review' },
  { stage: 'Shortlists & Intros', count: 4, dropOffRate: 43, conversionRate: 22, rejectionCount: 0, stageKey: 'Shortlist' },
  { stage: 'Technical Assessments', count: 3, dropOffRate: 25, conversionRate: 17, rejectionCount: 4, stageKey: 'Assessment' },
  { stage: 'Live Technical Interviews', count: 2, dropOffRate: 33, conversionRate: 11, rejectionCount: 3, stageKey: 'Technical interview' },
  { stage: 'Final Offers', count: 0, dropOffRate: 100, conversionRate: 0, rejectionCount: 0, stageKey: 'Offer' },
];

export const rejectionDistributionData = [
  { stage: 'Online Assessment', count: 5, percentage: 42, color: '#ffd175' },
  { stage: 'Resume Screening', count: 4, percentage: 33, color: '#fca5a5' },
  { stage: 'Technical Interview', count: 3, percentage: 25, color: '#a89bff' },
];

// -------------------------------------------------------------
// RECOVERY TIMELINE & REAPPLY READINESS
// -------------------------------------------------------------

export const recoveryTimelineData: RecoveryTimelineEvent[] = [
  {
    id: 'rt-1',
    date: '12 Aug',
    title: 'Assessment Drop-off at Razorpay',
    type: 'REJECTION',
    description: 'Timed out on Graph Traversal question during 60-min coding round.',
  },
  {
    id: 'rt-2',
    date: '13 Aug',
    title: 'Identified JavaScript Async & Graph Gap',
    type: 'GAP_IDENTIFIED',
    description: 'Rejection Intelligence detected repeated assessment bottleneck pattern.',
  },
  {
    id: 'rt-3',
    date: '17 Aug',
    title: 'Completed Timed Learning Hub Module',
    type: 'LEARNING_COMPLETED',
    description: 'Mastered BFS/DFS graph traversals and React asynchronous state patterns.',
    scoreChange: '+6 readiness points',
  },
  {
    id: 'rt-4',
    date: '20 Aug',
    title: 'Passed Timed Mock Assessment',
    type: 'ASSESSMENT_PASSED',
    description: 'Scored 84% on the Mock Arena Technical Assessment (up from 72%).',
    scoreChange: '72% → 84%',
  },
  {
    id: 'rt-5',
    date: '23 Aug',
    title: 'Added Automated Testing to React Project',
    type: 'PROJECT_ADDED',
    description: 'Added 12 Vitest unit tests to Accessible Merchant Checkout repository.',
    scoreChange: 'Verified Project Evidence',
  },
  {
    id: 'rt-6',
    date: '25 Aug',
    title: 'Mentor Review & Microsoft Referral',
    type: 'MENTOR_REVIEW',
    description: 'Sneha Roy reviewed updated testing proof and referred for Technical Round 1.',
  },
];

export const initialImprovementPlan: ImprovementPlanData = {
  goal: 'Pass the Next Frontend Technical Assessment & Live Interview',
  targetRole: 'Junior Frontend Developer',
  currentReadiness: 61,
  predictedReadiness: 74,
  estimatedEffort: '8–10 hours',
  disclaimer: 'Estimated improvement based on your current evidence. This is an analytical projection and not a guarantee.',
  tasks: [
    {
      id: 'task-1',
      stepNumber: 1,
      title: 'Complete Timed JavaScript Problem-Solving & Async Module',
      source: 'Learning Hub',
      sourcePage: 'Learning Hub',
      status: 'Completed',
      estimatedHours: '2 hours',
      description: 'Practice closures, event loop microtasks, and array manipulation patterns under timed conditions.',
    },
    {
      id: 'task-2',
      stepNumber: 2,
      title: 'Add Vitest Unit Tests & CI Badge to React Project',
      source: 'Project Studio',
      sourcePage: 'Micro-Internships',
      status: 'In progress',
      estimatedHours: '3 hours',
      description: 'Write 8-10 unit tests for form validation and custom hook rendering states in the Merchant Checkout project.',
    },
    {
      id: 'task-3',
      stepNumber: 3,
      title: 'Complete 2 Technical Mock Interviews with AI Coach',
      source: 'Mock Arena',
      sourcePage: 'Mock Arena',
      status: 'Not started',
      estimatedHours: '2.5 hours',
      description: 'Practice explaining React render optimization, trade-offs, and debugging live code with the Mock Arena coach.',
    },
    {
      id: 'task-4',
      stepNumber: 4,
      title: 'Request Mentor Review in Career Pod Before Reapplying',
      source: 'Career Network',
      sourcePage: 'Career Network',
      status: 'Not started',
      estimatedHours: '1 hour',
      description: 'Share your updated GitHub repository and test suite with your Career Pod for peer review.',
    },
  ],
};
