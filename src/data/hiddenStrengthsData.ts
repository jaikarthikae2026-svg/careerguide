export type ConfidenceLevel = 'High confidence' | 'Emerging strength' | 'Personal pattern';

export type EvidenceSourceType =
  | 'Project evidence'
  | 'Mentor verified'
  | 'Employer reviewed'
  | 'Peer reviewed'
  | 'WorkReady evidence'
  | 'Assessment evidence'
  | 'Progress evidence';

export type TargetRoleType =
  | 'Junior Frontend Developer'
  | 'Data Analyst'
  | 'UI/UX Designer'
  | 'Product Management Intern'
  | 'Business Analyst'
  | 'Digital Marketing Associate';

export interface EvidenceSourceItem {
  type: EvidenceSourceType;
  label: string;
  detail: string;
  sourceModule: string;
  isVerified: boolean;
}

export interface GeneratedResumeContent {
  resumeBullet: string;
  professionalSummary: string;
  interviewStory: string;
}

export interface HiddenStrength {
  id: string;
  title: string;
  category: string;
  confidence: ConfidenceLevel;
  confidenceColor: 'green' | 'amber' | 'blue';
  observedBehavior: string;
  repeatedEvidence: string;
  relevantOutcome: string;
  careerInsight: string;
  evidenceCount: number;
  lastUpdated: string;
  targetRoles: TargetRoleType[];
  evidenceSources: EvidenceSourceItem[];
  generatedContent: GeneratedResumeContent;
  isFeatured?: boolean;
  isApprovedForResume?: boolean;
  passportVisibility?: 'Private' | 'Mentors only' | 'Recruiters only' | 'Public preview';
  isHidden?: boolean;
}

export interface WordingComparison {
  id: string;
  weakClaim: string;
  evidenceBackedStatement: string;
  trait: string;
  evidenceSource: string;
}

// -------------------------------------------------------------
// 6 EVIDENCE-BACKED HIDDEN STRENGTHS
// -------------------------------------------------------------

export const sampleHiddenStrengths: HiddenStrength[] = [
  {
    id: 'hs-1',
    title: 'Feedback-Driven Builder & Execution',
    category: 'Execution & Quality',
    confidence: 'High confidence',
    confidenceColor: 'green',
    observedBehavior: 'You consistently revise and optimize project architectures after receiving feedback rather than abandoning or defending initial drafts.',
    repeatedEvidence: '4 structured review cycles across 3 completed projects (Merchant Checkout Flow, Placement Dashboard, WorkReady simulations).',
    relevantOutcome: 'Average project evaluation score improved by 28% (from 62% to 80%) across peer and mentor reviews.',
    careerInsight: 'You turn external feedback into measurable code quality and user experience compounding.',
    evidenceCount: 18,
    lastUpdated: '23 August 2026',
    isFeatured: true,
    isApprovedForResume: true,
    passportVisibility: 'Recruiters only',
    targetRoles: ['Junior Frontend Developer', 'UI/UX Designer', 'Product Management Intern'],
    evidenceSources: [
      {
        type: 'Project evidence',
        label: '3 Completed Projects',
        detail: 'Merchant Checkout, Placement Analytics, Currency Formatter',
        sourceModule: 'Projects & Micro-Internships',
        isVerified: true,
      },
      {
        type: 'Peer reviewed',
        label: '5 Peer Reviews',
        detail: 'Career Pod reviewers noted rapid turnaround on code comments',
        sourceModule: 'Career Pods',
        isVerified: true,
      },
      {
        type: 'Mentor verified',
        label: '2 Mentor Reviews',
        detail: 'Sneha Roy (Microsoft) and Vikram Seth signed off on architecture revisions',
        sourceModule: 'Mentors & Alumni',
        isVerified: true,
      },
      {
        type: 'WorkReady evidence',
        label: '4 WorkReady Scenarios',
        detail: 'Responded constructively to simulated stakeholder criticism in 4 scenarios',
        sourceModule: 'WorkReady',
        isVerified: true,
      },
      {
        type: 'Progress evidence',
        label: '6-Week Progress History',
        detail: 'Evaluation scores compounded consistently across all revisions',
        sourceModule: 'Readiness Analytics',
        isVerified: true,
      },
    ],
    generatedContent: {
      resumeBullet:
        'Improved a production React application through four structured review cycles, increasing project evaluation score by 28% and resolving 14 code quality issues.',
      professionalSummary:
        'Junior Frontend Developer who combines iterative component implementation with feedback-driven refinement, demonstrated across multiple mentor-reviewed web applications.',
      interviewStory:
        'One of my core working strengths is actively leveraging feedback to improve software quality. In my Merchant Checkout project, I incorporated review comments across four distinct cycles—improving the evaluation score by 28% by eliminating unnecessary re-renders, introducing unit tests, and documenting architectural decisions.',
    },
  },
  {
    id: 'hs-2',
    title: 'Structured Problem-Solving & Edge-Case Guarding',
    category: 'Technical Rigor',
    confidence: 'High confidence',
    confidenceColor: 'green',
    observedBehavior: 'You proactively write automated unit tests and validate boundary conditions before submitting deliverables.',
    repeatedEvidence: 'Added 12 Vitest unit tests to Checkout repo and scored 84% on the Mock Arena Technical Assessment.',
    relevantOutcome: 'Zero regression defects reported during supervisor evaluation in Micro-Internship workspace.',
    careerInsight: 'High reliability in anticipating runtime edge cases and writing maintainable code.',
    evidenceCount: 14,
    lastUpdated: '20 August 2026',
    isApprovedForResume: true,
    passportVisibility: 'Recruiters only',
    targetRoles: ['Junior Frontend Developer', 'Data Analyst', 'Business Analyst'],
    evidenceSources: [
      {
        type: 'Project evidence',
        label: 'Vitest Unit Suite',
        detail: '12 unit tests with 86% branch coverage in Merchant Checkout',
        sourceModule: 'Projects',
        isVerified: true,
      },
      {
        type: 'Assessment evidence',
        label: '84% Mock Arena Score',
        detail: 'Demonstrated mastery of boundary checks and async error boundaries',
        sourceModule: 'Mock Arena',
        isVerified: true,
      },
      {
        type: 'Employer reviewed',
        label: 'NovaMetrics Sign-off',
        detail: 'Supervisor confirmed zero runtime unhandled exceptions',
        sourceModule: 'Micro-Internships',
        isVerified: true,
      },
      {
        type: 'Progress evidence',
        label: 'Skill Tree Level 4',
        detail: 'Verified Software Testing & QA node',
        sourceModule: 'Skill Tree',
        isVerified: true,
      },
    ],
    generatedContent: {
      resumeBullet:
        'Engineered 12 automated unit tests achieving 86% branch coverage for critical checkout flows, eliminating edge-case runtime exceptions.',
      professionalSummary:
        'Quality-focused developer experienced in defensive coding, unit testing with Vitest/Jest, and building robust React interfaces with verified edge-case coverage.',
      interviewStory:
        'When building the payment checkout component, I anticipated multiple failure states like network timeouts and invalid currency inputs. I wrote 12 unit tests before handoff, ensuring zero runtime errors during the employer evaluation review.',
    },
  },
  {
    id: 'hs-3',
    title: 'Clear Technical Explanation & Storytelling',
    category: 'Communication',
    confidence: 'Emerging strength',
    confidenceColor: 'amber',
    observedBehavior: 'You present technical architecture decisions with clear trade-off rationale and visual diagrams.',
    repeatedEvidence: 'Delivered 3 project walkthroughs in Career Pod and recorded Loom video for Placement Analytics Dashboard.',
    relevantOutcome: 'Received an average mentor rating of 4.5/5 for presentation clarity and stakeholder communication.',
    careerInsight: 'Strong ability to bridge complex technical details with user-facing business value.',
    evidenceCount: 9,
    lastUpdated: '18 August 2026',
    isApprovedForResume: false,
    passportVisibility: 'Mentors only',
    targetRoles: ['Data Analyst', 'Product Management Intern', 'Junior Frontend Developer'],
    evidenceSources: [
      {
        type: 'Peer reviewed',
        label: '3 Career Pod Demos',
        detail: 'Peers rated explanation clarity 4.6/5 with positive remarks on diagram clarity',
        sourceModule: 'Career Pods',
        isVerified: true,
      },
      {
        type: 'Mentor verified',
        label: '4.5/5 Mentor Score',
        detail: 'Alumni mentor highlighted concise trade-off articulation',
        sourceModule: 'Mentors & Alumni',
        isVerified: true,
      },
      {
        type: 'WorkReady evidence',
        label: 'Sprint Demo Simulation',
        detail: 'Successfully explained API latency trade-offs to simulated product manager',
        sourceModule: 'WorkReady',
        isVerified: true,
      },
    ],
    generatedContent: {
      resumeBullet:
        'Presented architectural trade-offs and data visualizations across 3 technical reviews, receiving a 4.5/5 mentor rating for presentation clarity.',
      professionalSummary:
        'Analytical communicator adept at translating technical architecture and data insights into clear, actionable executive summaries and stakeholder presentations.',
      interviewStory:
        'During our Placement Analytics project, I needed to explain why we migrated from client-side filtering to server-side aggregations. I created a simple latency benchmark visual that convinced our team to adopt the faster architecture.',
    },
  },
  {
    id: 'hs-4',
    title: 'Proactive Risk & Blocker Communication',
    category: 'Workplace Behavior',
    confidence: 'Emerging strength',
    confidenceColor: 'amber',
    observedBehavior: 'You signal project roadblocks and timeline dependencies early rather than waiting for deadline reminders.',
    repeatedEvidence: 'Identified and escalated timeline blockers in 4 out of 5 WorkReady simulated scenarios.',
    relevantOutcome: 'Prevented simulated project delays and maintained 100% on-time milestone delivery.',
    careerInsight: 'Demonstrates psychological safety, accountability, and dependable task ownership in cross-functional teams.',
    evidenceCount: 8,
    lastUpdated: '15 August 2026',
    isApprovedForResume: false,
    passportVisibility: 'Private',
    targetRoles: ['Product Management Intern', 'Junior Frontend Developer', 'Business Analyst'],
    evidenceSources: [
      {
        type: 'WorkReady evidence',
        label: '4 Blocker Alerts',
        detail: 'Sent early risk notification in Jira/Slack simulation before sprint cutoff',
        sourceModule: 'WorkReady',
        isVerified: true,
      },
      {
        type: 'Employer reviewed',
        label: 'Supervisor Note',
        detail: 'Employer praised proactive query submission during initial project kickoff',
        sourceModule: 'Micro-Internships',
        isVerified: true,
      },
    ],
    generatedContent: {
      resumeBullet:
        'Maintained 100% on-time milestone delivery by proactively identifying technical dependencies and coordinating early risk mitigations with team leads.',
      professionalSummary:
        'Disciplined collaborator with a proven track record of proactive risk communication, transparent milestone tracking, and dependable project execution.',
      interviewStory:
        'In a recent simulation project, I noticed a third-party webhook schema change that would block checkout integration. I raised a clear mitigation proposal 3 days before the deadline, allowing the team to adjust without slipping our release date.',
    },
  },
  {
    id: 'hs-5',
    title: 'User Empathy & Accessibility Standards',
    category: 'Product & Design',
    confidence: 'Emerging strength',
    confidenceColor: 'amber',
    observedBehavior: 'You design user flows with high contrast ratios, ARIA semantic tags, and keyboard navigability.',
    repeatedEvidence: 'Implemented WCAG 2.1 AA accessibility standards across 2 web applications and conducted screen reader tests.',
    relevantOutcome: 'Achieved 98/100 Lighthouse accessibility audit score on Merchant Checkout Flow.',
    careerInsight: 'Deep consideration for inclusive software design and user experience consistency.',
    evidenceCount: 7,
    lastUpdated: '10 August 2026',
    isApprovedForResume: false,
    targetRoles: ['UI/UX Designer', 'Junior Frontend Developer', 'Product Management Intern'],
    evidenceSources: [
      {
        type: 'Project evidence',
        label: 'Lighthouse 98/100',
        detail: 'Audited and verified keyboard navigation and contrast ratios',
        sourceModule: 'Projects',
        isVerified: true,
      },
      {
        type: 'Progress evidence',
        label: 'Skill Tree UI Node',
        detail: 'Completed Web Accessibility & Inclusive Design verification',
        sourceModule: 'Skill Tree',
        isVerified: true,
      },
    ],
    generatedContent: {
      resumeBullet:
        'Designed and implemented accessible React components adhering to WCAG 2.1 AA guidelines, achieving a 98/100 Lighthouse accessibility audit score.',
      professionalSummary:
        'UI engineer passionate about inclusive design, semantic HTML, and building high-performance web applications that pass strict accessibility benchmarks.',
      interviewStory:
        'I treat accessibility as a core feature rather than an afterthought. When building the Merchant Checkout interface, I verified full keyboard navigation and screen reader compatibility, ensuring all users can complete transactions smoothly.',
    },
  },
  {
    id: 'hs-6',
    title: 'Self-Directed Skill Compounding',
    category: 'Learning Agility',
    confidence: 'Personal pattern',
    confidenceColor: 'blue',
    observedBehavior: 'You complete daily micro-missions and practice modules consistently over multi-week horizons.',
    repeatedEvidence: 'Maintained a 24-day Daily Mission streak and solved 38 technical practice challenges.',
    relevantOutcome: 'Readiness score compounded from 54% to 69% over a 90-day trajectory.',
    careerInsight: 'High intrinsic motivation and daily compounding discipline (useful for personal planning).',
    evidenceCount: 12,
    lastUpdated: '22 August 2026',
    isApprovedForResume: false,
    passportVisibility: 'Private',
    targetRoles: ['Junior Frontend Developer', 'Data Analyst', 'Business Analyst', 'Digital Marketing Associate'],
    evidenceSources: [
      {
        type: 'Progress evidence',
        label: '24-Day Streak',
        detail: 'Consistent daily problem-solving submissions',
        sourceModule: 'Daily Mission',
        isVerified: true,
      },
      {
        type: 'Assessment evidence',
        label: '+15 Score Increase',
        detail: 'Continuous compounding across 90-day placement readiness trend',
        sourceModule: 'Readiness Analytics',
        isVerified: true,
      },
    ],
    generatedContent: {
      resumeBullet:
        'Maintained a continuous 6-week daily engineering practice regimen, solving 38 algorithmic problems and completing 3 full-stack projects.',
      professionalSummary:
        'Self-motivated software candidate dedicated to continuous skill compounding, algorithmic problem-solving, and practical full-stack project building.',
      interviewStory:
        'I believe in steady, incremental improvement. Over the past 90 days, I dedicated daily sessions to mastering data structures and React patterns, which directly lifted my assessment pass rate and problem-solving confidence.',
    },
  },
];

// -------------------------------------------------------------
// 4 COMPARATIVE WORDING TRANSFORMATIONS (Weak vs Better)
// -------------------------------------------------------------

export const wordingTransformationsData: WordingComparison[] = [
  {
    id: 'wt-1',
    weakClaim: 'Hardworking and dedicated student',
    evidenceBackedStatement: 'Completed 5 projects while improving assessment performance from 48% to 81% over six weeks.',
    trait: 'Dedication & Consistency',
    evidenceSource: 'Daily Mission & Learning Hub analytics',
  },
  {
    id: 'wt-2',
    weakClaim: 'Good communicator and presenter',
    evidenceBackedStatement: 'Explained 3 technical projects through structured presentations and received an average mentor rating of 4.5/5 for clarity.',
    trait: 'Technical Articulation',
    evidenceSource: 'Career Pods & Mentor Review ratings',
  },
  {
    id: 'wt-3',
    weakClaim: 'Strong team player',
    evidenceBackedStatement: 'Reviewed 12 peer submissions in Career Pod and coordinated a multi-milestone deliverable across 3 release checkpoints.',
    trait: 'Collaborative Delivery',
    evidenceSource: 'Career Pod peer review logs',
  },
  {
    id: 'wt-4',
    weakClaim: 'Creative problem solver',
    evidenceBackedStatement: 'Engineered and tested 3 alternative interface solutions under the same product constraints, lifting user task completion by 24%.',
    trait: 'Solution Exploration',
    evidenceSource: 'Micro-Internship project evaluations',
  },
];

// -------------------------------------------------------------
// CAREER EDGE DIFFERENTIATOR
// -------------------------------------------------------------

export const careerEdgeSummaryData = {
  primaryDifferentiator: 'Feedback-Driven Execution & Rapid Iteration',
  targetRole: 'Junior Frontend Developer',
  supportingPoints: [
    'Act on peer and mentor review comments quickly (average 24h turnaround).',
    'Improve measurable outcomes (+28% score increase across project revisions).',
    'Complete multiple rigorous iterations rather than stopping at first drafts.',
    'Explain what changed and why with documented trade-off rationale.',
  ],
  bestFitRoles: [
    'Junior Frontend Developer',
    'UI Engineer',
    'Product Engineering Intern',
    'Data Analytics Analyst',
  ],
};
