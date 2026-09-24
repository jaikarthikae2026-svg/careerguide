export type ApplicationStatus =
  | 'Draft'
  | 'Submitted'
  | 'Under review'
  | 'Assessment required'
  | 'Shortlisted'
  | 'Accepted'
  | 'Active'
  | 'Submitted for review'
  | 'Completed'
  | 'Verified'
  | 'Declined'
  | 'Withdrawn';

export type CompensationType =
  | 'Paid'
  | 'Unpaid'
  | 'Sponsored'
  | 'Certificate only'
  | 'Reimbursement available'
  | 'Payment details pending';

export interface SkillRequirement {
  name: string;
  requiredLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  studentLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'None';
  isVerified: boolean;
  learningHubLesson?: string;
  skillTreeBranch?: string;
}

export interface DeliverableItem {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  format: string;
}

export interface OrganizationInfo {
  id: string;
  name: string;
  logo: string;
  isVerified: boolean;
  industry: string;
  location: string;
  teamSize: string;
  supervisorName: string;
  supervisorRole: string;
  supervisorAvatar: string;
  completedStudentProjects: number;
  averageRating: number;
  interviewInvitationsGiven: number;
}

export interface MicroInternship {
  id: string;
  title: string;
  organization: OrganizationInfo;
  opportunityType: 'Employer-reviewed micro-internship' | 'Sponsored client challenge' | 'Startup sprint';
  targetRole: string;
  durationDays: number;
  durationLabel: string;
  weeklyTimeCommitment: string;
  totalHours: string;
  deadline: string;
  startDate: string;
  compensationType: CompensationType;
  stipendAmount: string;
  stipendNumeric: number;
  workMode: 'Remote' | 'On-site' | 'Hybrid';
  location: string;
  language: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isBeginnerFriendly: boolean;
  offersInterviewConsideration: boolean;
  availableSeats: number;
  studentMatchPercentage: number;
  whyRecommended?: string[];
  businessProblem: string;
  whyItMatters: string;
  description: string;
  deliverables: DeliverableItem[];
  requiredSkills: SkillRequirement[];
  selectionProcess: string[];
  terms: {
    paymentTerms: string;
    expectedHours: string;
    confidentiality: string;
    workOwnership: string;
    portfolioVisibility: boolean;
    interviewConsiderationTerms: string;
    disclaimer: string;
  };
  accessSupportRequired?: string[];
}

export interface ProjectMilestone {
  id: string;
  stepNumber: number;
  title: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
  dueDate: string;
  description: string;
}

export interface ActiveMicroProject {
  id: string;
  internshipId: string;
  title: string;
  organization: OrganizationInfo;
  targetRole: string;
  startDate: string;
  deadline: string;
  daysRemaining: number;
  progressPercent: number;
  milestones: ProjectMilestone[];
  submittedDeliverables: {
    githubUrl?: string;
    demoUrl?: string;
    walkthroughVideoUrl?: string;
    uploadedDocsCount: number;
    handoffNotes?: string;
  };
  supervisorMessages: {
    id: string;
    senderName: string;
    senderAvatar: string;
    timestamp: string;
    message: string;
    isSupervisor: boolean;
  }[];
  workReadyTasks: {
    id: string;
    title: string;
    isDone: boolean;
  }[];
  podCollaboration: {
    podName: string;
    peerReviewScheduled: boolean;
    sharedWithPod: boolean;
    peerFeedbackSummary?: string;
  };
}

export interface StudentApplication {
  id: string;
  internshipId: string;
  internshipTitle: string;
  organizationName: string;
  targetRole: string;
  appliedDate: string;
  status: ApplicationStatus;
  expectedResponseDate: string;
  matchScore: number;
  stipendAmount: string;
  motivationStatement: string;
}

export interface EmployerReview {
  id: string;
  projectName: string;
  studentName: string;
  organizationName: string;
  reviewerName: string;
  reviewerRole: string;
  ratings: {
    deliverableQuality: number; // 1-5
    technicalCorrectness: number;
    communication: number;
    deadlineReliability: number;
    problemSolving: number;
    feedbackResponse: number;
  };
  overallScore: number;
  strengthSummary: string;
  improvementSummary: string;
  recommendedForInterview: boolean;
  approvedForPassport: boolean;
  completedAt: string;
}

export interface AccessResource {
  id: string;
  name: string;
  category: 'Software' | 'Workspace' | 'Cloud' | 'Interview' | 'Stipend';
  provider: string;
  description: string;
  valueDescription: string;
  isActivated: boolean;
}

// -------------------------------------------------------------
// REALISTIC MOCK DATA FOR MICRO-INTERNSHIPS (INDIA TECH ECOSYSTEM)
// -------------------------------------------------------------

export const sampleOrganizations: OrganizationInfo[] = [
  {
    id: 'org-1',
    name: 'CareerBridge Labs',
    logo: 'CBL',
    isVerified: true,
    industry: 'EdTech & Hiring Intelligence',
    location: 'Bengaluru, India',
    teamSize: '45 employees',
    supervisorName: 'Aravind Swaminathan',
    supervisorRole: 'Head of Data & Analytics',
    supervisorAvatar: 'AS',
    completedStudentProjects: 38,
    averageRating: 4.8,
    interviewInvitationsGiven: 12,
  },
  {
    id: 'org-2',
    name: 'FinPulse Systems',
    logo: 'FPS',
    isVerified: true,
    industry: 'Fintech & Merchant Payments',
    location: 'Mumbai, India',
    teamSize: '120 employees',
    supervisorName: 'Meera Nambiar',
    supervisorRole: 'Lead Frontend Architect',
    supervisorAvatar: 'MN',
    completedStudentProjects: 24,
    averageRating: 4.7,
    interviewInvitationsGiven: 8,
  },
  {
    id: 'org-3',
    name: 'NovaMetrics Analytics',
    logo: 'NMA',
    isVerified: true,
    industry: 'SaaS Business Intelligence',
    location: 'Hyderabad, India',
    teamSize: '80 employees',
    supervisorName: 'Rohit Deshmukh',
    supervisorRole: 'VP of Product Operations',
    supervisorAvatar: 'RD',
    completedStudentProjects: 52,
    averageRating: 4.9,
    interviewInvitationsGiven: 19,
  },
  {
    id: 'org-4',
    name: 'CloudScale Networks',
    logo: 'CSN',
    isVerified: true,
    industry: 'Cloud Infrastructure & DevOps',
    location: 'Pune, India',
    teamSize: '65 employees',
    supervisorName: 'Vikram Seth',
    supervisorRole: 'Principal Platform Engineer',
    supervisorAvatar: 'VS',
    completedStudentProjects: 19,
    averageRating: 4.6,
    interviewInvitationsGiven: 6,
  },
  {
    id: 'org-5',
    name: 'AgriTech Solutions NGO',
    logo: 'ATS',
    isVerified: true,
    industry: 'Agritech Social Enterprise',
    location: 'Delhi NCR, India',
    teamSize: '30 employees',
    supervisorName: 'Sunita Sharma',
    supervisorRole: 'Director of Digital Initiatives',
    supervisorAvatar: 'SS',
    completedStudentProjects: 31,
    averageRating: 4.8,
    interviewInvitationsGiven: 7,
  },
  {
    id: 'org-6',
    name: 'EdVantage Digital',
    logo: 'EVD',
    isVerified: true,
    industry: 'Digital Growth & Growth Product',
    location: 'Chennai, India',
    teamSize: '25 employees',
    supervisorName: 'Karthik Raja',
    supervisorRole: 'Growth Marketing Lead',
    supervisorAvatar: 'KR',
    completedStudentProjects: 15,
    averageRating: 4.5,
    interviewInvitationsGiven: 4,
  },
];

export const microInternshipsData: MicroInternship[] = [
  {
    id: 'mi-1',
    title: 'Build a Student Placement Analytics Dashboard',
    organization: sampleOrganizations[0],
    opportunityType: 'Employer-reviewed micro-internship',
    targetRole: 'Data Analyst',
    durationDays: 10,
    durationLabel: '10 days',
    weeklyTimeCommitment: '6–8 hours total',
    totalHours: '8 hours',
    deadline: 'In 4 days',
    startDate: 'Immediate / Flexible',
    compensationType: 'Paid',
    stipendAmount: '₹3,500 stipend',
    stipendNumeric: 3500,
    workMode: 'Remote',
    location: 'Remote (Bengaluru HQ)',
    language: 'English',
    difficulty: 'Intermediate',
    isBeginnerFriendly: true,
    offersInterviewConsideration: true,
    availableSeats: 5,
    studentMatchPercentage: 82,
    whyRecommended: [
      'Matches your React and Data Analytics profile targets',
      'You completed the SQL and Charting modules in Learning Hub',
      'Fulfills your final employer-reviewed project requirement for Career Passport',
    ],
    businessProblem:
      'CareerBridge Labs collects hiring outcomes across 120 partner colleges but currently lacks an interactive executive dashboard for college placement directors to identify student drop-off bottlenecks in real time.',
    whyItMatters:
      'Placement directors need clear cohort analytics (offer acceptance rates, interview drop-off by domain, salary distribution) to guide at-risk students before placement season ends.',
    description:
      'Ingest sample multi-college placement CSV records, clean anomalies in SQL/Python, build 3 interactive dashboard views in Power BI/React Recharts, and write a 1-page business insight recommendation report.',
    deliverables: [
      { id: 'd-1', stepNumber: 1, title: 'Data Cleaning & Schema Definition', description: 'Clean raw student placement dataset and handle missing CGPA/package values.', format: 'SQL queries or Python notebook' },
      { id: 'd-2', stepNumber: 2, title: 'Cohort Funnel Analysis View', description: 'Build interactive funnel chart showing Applied → Shortlisted → Interviewed → Offered rates.', format: 'Power BI .pbix file or React component' },
      { id: 'd-3', stepNumber: 3, title: 'Salary & Domain Distribution View', description: 'Visualize CTC percentiles by branch, skill tags, and tier classifications.', format: 'Dashboard view' },
      { id: 'd-4', stepNumber: 4, title: 'Executive Insight Brief', description: 'Write a 1-page summary highlighting top 3 actionable bottlenecks for placement officers.', format: 'PDF / Markdown Document' },
      { id: 'd-5', stepNumber: 5, title: '3-Minute Video Walkthrough', description: 'Record Loom walkthrough explaining the data architecture and key business findings.', format: 'Loom / Video link' },
    ],
    requiredSkills: [
      { name: 'SQL & Data Cleaning', requiredLevel: 'Intermediate', studentLevel: 'Intermediate', isVerified: true, learningHubLesson: 'Advanced SQL Query Optimization', skillTreeBranch: 'DBMS' },
      { name: 'Data Visualization (Power BI / Charts)', requiredLevel: 'Intermediate', studentLevel: 'Intermediate', isVerified: true, learningHubLesson: 'Data Visualization & Storytelling', skillTreeBranch: 'Projects' },
      { name: 'Business Communication', requiredLevel: 'Intermediate', studentLevel: 'Intermediate', isVerified: true, learningHubLesson: 'Executive Writing for Engineers', skillTreeBranch: 'Communication' },
      { name: 'Excel / CSV Processing', requiredLevel: 'Beginner', studentLevel: 'Intermediate', isVerified: true },
    ],
    selectionProcess: [
      '1. Application & match profile review (24 hours)',
      '2. Quick 15-minute SQL dataset sanity assessment',
      '3. Project acceptance & supervisor onboarding',
      '4. Milestone execution & async supervisor check-ins',
      '5. Employer review & rubric rating',
      '6. Verified Career Passport badge & interview consideration',
    ],
    terms: {
      paymentTerms: '₹3,500 transferred directly via UPI/Bank within 5 business days of deliverable sign-off.',
      expectedHours: '8–10 total working hours across 10 days.',
      confidentiality: 'Synthetic anonymized dataset provided. No proprietary student PII involved.',
      workOwnership: 'Student owns portfolio display rights; employer receives license for internal dashboard usage.',
      portfolioVisibility: true,
      interviewConsiderationTerms: 'Top 20% of verified performers receive direct invitation to Data Analyst Trainee interview.',
      disclaimer: 'Completion may create verified experience and employer feedback. Employment or referral is not guaranteed.',
    },
    accessSupportRequired: ['Power BI Pro Student License', 'WorkHub High-Speed Wi-Fi Credits'],
  },
  {
    id: 'mi-2',
    title: 'Design & Code an Accessible Merchant Checkout Flow',
    organization: sampleOrganizations[1],
    opportunityType: 'Employer-reviewed micro-internship',
    targetRole: 'Junior Frontend Developer',
    durationDays: 14,
    durationLabel: '14 days',
    weeklyTimeCommitment: '8–10 hours total',
    totalHours: '12 hours',
    deadline: 'In 6 days',
    startDate: 'Next Monday',
    compensationType: 'Paid',
    stipendAmount: '₹5,000 stipend',
    stipendNumeric: 5000,
    workMode: 'Remote',
    location: 'Remote (Mumbai HQ)',
    language: 'English',
    difficulty: 'Intermediate',
    isBeginnerFriendly: false,
    offersInterviewConsideration: true,
    availableSeats: 3,
    studentMatchPercentage: 88,
    whyRecommended: [
      'Direct match for your React, TypeScript, and UI engineering skills',
      'FinPulse is actively hiring Junior Frontend Engineers in Mumbai/Remote',
      'Includes 1-on-1 code review with Staff Frontend Engineer Meera Nambiar',
    ],
    businessProblem:
      'FinPulse is expanding payment terminals to regional kirana store owners who navigate UI on low-end Android mobile browsers with high sunlight glare and screen readers.',
    whyItMatters:
      'Checkout bounce rate on mobile is currently 18% due to complex form validation and lack of accessible contrast ratios.',
    description:
      'Build a lightweight, mobile-first React/TypeScript checkout step component with WCAG 2.1 AA compliance, keyboard navigation, UPI QR generation, and error boundary fallbacks.',
    deliverables: [
      { id: 'd-21', stepNumber: 1, title: 'Figma UI Flow & High-Contrast Design', description: 'Review high-contrast color tokens and keyboard tab orders.', format: 'Figma link or spec' },
      { id: 'd-22', stepNumber: 2, title: 'React Checkout Component', description: 'Clean TypeScript component using Tailwind / CSS modules.', format: 'GitHub PR / Repo' },
      { id: 'd-23', stepNumber: 3, title: 'Accessibility (A11y) Audit Report', description: 'Automated Axe / Lighthouse score > 95 with zero critical violations.', format: 'Lighthouse PDF report' },
      { id: 'd-24', stepNumber: 4, title: 'Unit Tests for UPI Validation', description: 'Jest / Vitest test suite covering edge cases for VPA validation.', format: 'Test files' },
      { id: 'd-25', stepNumber: 5, title: 'Deployed Vercel Demo & Walkthrough', description: 'Live mobile-responsive URL with 2-minute video presentation.', format: 'Live URL + Video' },
    ],
    requiredSkills: [
      { name: 'React & TypeScript', requiredLevel: 'Intermediate', studentLevel: 'Intermediate', isVerified: true, learningHubLesson: 'React Performance & Patterns', skillTreeBranch: 'Projects' },
      { name: 'Web Accessibility (WCAG)', requiredLevel: 'Beginner', studentLevel: 'Intermediate', isVerified: true, learningHubLesson: 'Modern Frontend Accessibility', skillTreeBranch: 'Projects' },
      { name: 'Unit Testing (Jest/Vitest)', requiredLevel: 'Intermediate', studentLevel: 'Intermediate', isVerified: true },
    ],
    selectionProcess: [
      '1. Review GitHub repository and previous UI project links',
      '2. Automated 10-minute React component coding challenge',
      '3. Welcome sync with Meera Nambiar',
      '4. Mid-point PR review & architecture feedback',
      '5. Final code merge & employer review rating',
    ],
    terms: {
      paymentTerms: '₹5,000 paid upon completion and PR approval.',
      expectedHours: '12–15 hours total across 2 weeks.',
      confidentiality: 'Open-source starter kit used.',
      workOwnership: 'MIT open-source with employer attribution.',
      portfolioVisibility: true,
      interviewConsiderationTerms: 'Top scorers fast-tracked to technical round for SDE-1 role.',
      disclaimer: 'Completion may create verified experience and employer feedback. Employment or referral is not guaranteed.',
    },
    accessSupportRequired: ['Figma Pro Student License'],
  },
  {
    id: 'mi-3',
    title: 'Customer Churn Feature Engineering & Insight Model',
    organization: sampleOrganizations[2],
    opportunityType: 'Employer-reviewed micro-internship',
    targetRole: 'Data Analyst',
    durationDays: 12,
    durationLabel: '12 days',
    weeklyTimeCommitment: '8 hours total',
    totalHours: '10 hours',
    deadline: 'In 3 days',
    startDate: 'Flexible',
    compensationType: 'Paid',
    stipendAmount: '₹4,000 stipend',
    stipendNumeric: 4000,
    workMode: 'Remote',
    location: 'Remote (Hyderabad HQ)',
    language: 'English',
    difficulty: 'Intermediate',
    isBeginnerFriendly: true,
    offersInterviewConsideration: true,
    availableSeats: 4,
    studentMatchPercentage: 79,
    whyRecommended: [
      'Aligns with your Python, SQL, and exploratory data analysis experience',
      'NovaMetrics has offered interview invitations to 19 past student completers',
    ],
    businessProblem:
      'NovaMetrics SaaS clients lose 4.2% monthly recurring revenue to unpredicted mid-contract churn without early warning indicators.',
    whyItMatters:
      'Identifying the top 5 behavioral triggers (e.g. login drop, export frequency) allows customer success teams to intervene 30 days before contract renewal.',
    description:
      'Analyze 50,000 customer usage logs, engineer 8 predictive churn features, create a clean correlation matrix in Python/Pandas, and deliver actionable executive recommendations.',
    deliverables: [
      { id: 'd-31', stepNumber: 1, title: 'Exploratory Data Analysis Notebook', description: 'Jupyter notebook documenting data distributions and churn correlation.', format: '.ipynb file' },
      { id: 'd-32', stepNumber: 2, title: 'Feature Engineering Pipeline', description: 'Clean Python script computing 8 usage metrics per customer.', format: 'Python module' },
      { id: 'd-33', stepNumber: 3, title: 'Customer Churn Risk Scoring Table', description: 'Ranked risk table with probability bands (High/Med/Low).', format: 'CSV + Chart' },
      { id: 'd-34', stepNumber: 4, title: 'Executive Presentation Deck', description: '5-slide summary for VP of Product Operations.', format: 'PDF / Slides' },
      { id: 'd-35', stepNumber: 5, title: 'Recorded Findings Walkthrough', description: '3-minute executive briefing Loom.', format: 'Loom URL' },
    ],
    requiredSkills: [
      { name: 'Python & Pandas', requiredLevel: 'Intermediate', studentLevel: 'Intermediate', isVerified: true },
      { name: 'Statistical Analysis', requiredLevel: 'Intermediate', studentLevel: 'Intermediate', isVerified: true },
      { name: 'Data Storytelling', requiredLevel: 'Intermediate', studentLevel: 'Intermediate', isVerified: true },
    ],
    selectionProcess: [
      '1. Application & resume screening',
      '2. Python data wrangling benchmark check',
      '3. Kickoff with VP Rohit Deshmukh',
      '4. Final submission & employer evaluation',
    ],
    terms: {
      paymentTerms: '₹4,000 upon deliverable review.',
      expectedHours: '10 hours total.',
      confidentiality: 'Synthetic enterprise logs provided.',
      workOwnership: 'Shared portfolio rights.',
      portfolioVisibility: true,
      interviewConsiderationTerms: 'Interview consideration for Product Ops Analyst opening.',
      disclaimer: 'Completion may create verified experience and employer feedback. Employment or referral is not guaranteed.',
    },
  },
  {
    id: 'mi-4',
    title: 'Containerized CI/CD Pipeline for Microservices API',
    organization: sampleOrganizations[3],
    opportunityType: 'Employer-reviewed micro-internship',
    targetRole: 'Junior Software Developer',
    durationDays: 14,
    durationLabel: '14 days',
    weeklyTimeCommitment: '8 hours total',
    totalHours: '12 hours',
    deadline: 'In 8 days',
    startDate: 'Next week',
    compensationType: 'Paid',
    stipendAmount: '₹6,000 stipend',
    stipendNumeric: 6000,
    workMode: 'Remote',
    location: 'Remote (Pune HQ)',
    language: 'English',
    difficulty: 'Advanced',
    isBeginnerFriendly: false,
    offersInterviewConsideration: true,
    availableSeats: 2,
    studentMatchPercentage: 74,
    businessProblem:
      'CloudScale needs automated GitHub Actions pipelines that build Docker images, execute unit/integration tests in parallel, and publish versioned artifacts with security scanning.',
    whyItMatters:
      'Reduces developer deployment cycle time from 45 minutes to sub-5 minutes while blocking vulnerable packages.',
    description:
      'Write multi-stage Dockerfiles, configure GitHub Actions workflow YAMLs, integrate Trivy vulnerability scanner, and deploy a demo service to AWS ECS/Render.',
    deliverables: [
      { id: 'd-41', stepNumber: 1, title: 'Multi-stage Dockerfile Optimization', description: 'Slim image under 80MB using alpine base.', format: 'Dockerfile' },
      { id: 'd-42', stepNumber: 2, title: 'GitHub Actions Workflow YAML', description: 'Automated build, test, and container publish pipeline.', format: '.github/workflows/ci.yml' },
      { id: 'd-43', stepNumber: 3, title: 'Vulnerability Scan & Fix Log', description: 'Trivy security scan output with zero HIGH/CRITICAL CVEs.', format: 'Markdown report' },
      { id: 'd-44', stepNumber: 4, title: 'Live Deployed Service URL', description: 'Healthy endpoint running on cloud container host.', format: 'Live URL' },
      { id: 'd-45', stepNumber: 5, title: 'Architecture Readme & Diagram', description: 'Clear diagram showing CI/CD pipeline stages and rollback strategy.', format: 'README.md' },
    ],
    requiredSkills: [
      { name: 'Docker & Containerization', requiredLevel: 'Intermediate', studentLevel: 'Intermediate', isVerified: true },
      { name: 'GitHub Actions & CI/CD', requiredLevel: 'Intermediate', studentLevel: 'Beginner', isVerified: false, learningHubLesson: 'DevOps & CI/CD Pipelines', skillTreeBranch: 'Core CS' },
      { name: 'Linux & Shell Scripting', requiredLevel: 'Intermediate', studentLevel: 'Intermediate', isVerified: true },
    ],
    selectionProcess: [
      '1. Application review and GitHub activity check',
      '2. Dockerfile optimization sanity test',
      '3. Pipeline review by Principal Engineer Vikram Seth',
    ],
    terms: {
      paymentTerms: '₹6,000 completion stipend.',
      expectedHours: '12 hours.',
      confidentiality: 'Open-source repository.',
      workOwnership: 'Open-source portfolio.',
      portfolioVisibility: true,
      interviewConsiderationTerms: 'CloudScale DevOps internship referral.',
      disclaimer: 'Completion may create verified experience and employer feedback. Employment or referral is not guaranteed.',
    },
    accessSupportRequired: ['AWS Cloud Credits ($50)'],
  },
  {
    id: 'mi-5',
    title: 'Farmer Crop Advisory Mobile UI & Usability Audit',
    organization: sampleOrganizations[4],
    opportunityType: 'Sponsored client challenge',
    targetRole: 'UI/UX Designer',
    durationDays: 10,
    durationLabel: '10 days',
    weeklyTimeCommitment: '6 hours total',
    totalHours: '8 hours',
    deadline: 'In 5 days',
    startDate: 'Flexible',
    compensationType: 'Sponsored',
    stipendAmount: '₹3,000 grant stipend',
    stipendNumeric: 3000,
    workMode: 'Remote',
    location: 'Remote (Delhi NCR HQ)',
    language: 'Hindi & English',
    difficulty: 'Beginner',
    isBeginnerFriendly: true,
    offersInterviewConsideration: false,
    availableSeats: 6,
    studentMatchPercentage: 85,
    businessProblem:
      'AgriTech Solutions has developed a weather and market price advisory app for smallholder farmers across North India, but user drop-off on the advisory card screen is 35% due to text overload and lack of vernacular iconography.',
    whyItMatters:
      'Clear, glanceable visual indicators for rainfall probability and mandi crop rates enable farmers to make timely harvesting decisions.',
    description:
      'Redesign 3 critical screens in Figma with high visual iconography, vernacular audio buttons, and run usability feedback tests with 3 representative users.',
    deliverables: [
      { id: 'd-51', stepNumber: 1, title: 'Current UX Heuristic Audit', description: 'Identify 5 friction points on mobile screens.', format: 'Figma / PDF' },
      { id: 'd-52', stepNumber: 2, title: 'Redesigned Figma Component Library', description: 'Weather advisory cards, price tickers, and audio triggers.', format: 'Figma Prototype' },
      { id: 'd-53', stepNumber: 3, title: 'Usability Testing Synthesis', description: 'Test recordings and summary of 3 user walkthroughs.', format: 'Summary PDF' },
      { id: 'd-54', stepNumber: 4, title: 'Design Handoff Spec for Developers', description: 'Color tokens, typography scale, and responsive layout guidelines.', format: 'Figma Spec' },
      { id: 'd-55', stepNumber: 5, title: 'Presentation Loom Video', description: '3-minute explanation of UX decisions and accessibility enhancements.', format: 'Loom Video' },
    ],
    requiredSkills: [
      { name: 'Figma & Mobile UX Design', requiredLevel: 'Intermediate', studentLevel: 'Intermediate', isVerified: true },
      { name: 'Usability Testing & Heuristics', requiredLevel: 'Beginner', studentLevel: 'Beginner', isVerified: true },
      { name: 'Design Systems & Tokens', requiredLevel: 'Beginner', studentLevel: 'Beginner', isVerified: true },
    ],
    selectionProcess: [
      '1. Figma portfolio link submission',
      '2. Brief review by Sunita Sharma',
      '3. Project execution and peer design critique',
    ],
    terms: {
      paymentTerms: '₹3,000 grant stipend provided by AgriTech Digital Foundation.',
      expectedHours: '8 hours total.',
      confidentiality: 'Creative commons attribution.',
      workOwnership: 'Student maintains full portfolio showcase rights.',
      portfolioVisibility: true,
      interviewConsiderationTerms: 'NGO certificate of excellence & LinkedIn recommendation.',
      disclaimer: 'Completion may create verified experience and employer feedback. Employment or referral is not guaranteed.',
    },
    accessSupportRequired: ['Figma Pro Student License'],
  },
  {
    id: 'mi-6',
    title: 'B2B SaaS Organic SEO & Technical Content Sprint',
    organization: sampleOrganizations[5],
    opportunityType: 'Employer-reviewed micro-internship',
    targetRole: 'Digital Marketing Associate',
    durationDays: 8,
    durationLabel: '8 days',
    weeklyTimeCommitment: '5 hours total',
    totalHours: '6 hours',
    deadline: 'In 7 days',
    startDate: 'Immediate',
    compensationType: 'Paid',
    stipendAmount: '₹3,000 stipend',
    stipendNumeric: 3000,
    workMode: 'Remote',
    location: 'Remote (Chennai HQ)',
    language: 'English',
    difficulty: 'Beginner',
    isBeginnerFriendly: true,
    offersInterviewConsideration: true,
    availableSeats: 3,
    studentMatchPercentage: 70,
    businessProblem:
      'EdVantage Digital needs 3 high-intent technical comparison articles targeting engineering leads looking for hiring assessment tools.',
    whyItMatters:
      'Organic search traffic represents 60% of inbound sales leads; detailed technical teardowns rank highest on Google.',
    description:
      'Conduct keyword intent research, write two 1,200-word in-depth comparison articles, and provide an on-page SEO meta audit.',
    deliverables: [
      { id: 'd-61', stepNumber: 1, title: 'Keyword & Competitor Intent Map', description: 'Search volume and secondary keyword cluster table.', format: 'Google Sheet / Excel' },
      { id: 'd-62', stepNumber: 2, title: 'Article 1: Technical Benchmark Comparison', description: '1,200-word structured guide with architecture diagrams.', format: 'Google Doc / Markdown' },
      { id: 'd-63', stepNumber: 3, title: 'Article 2: Best Practices Teardown', description: '1,200-word engineering hiring checklist article.', format: 'Google Doc / Markdown' },
      { id: 'd-64', stepNumber: 4, title: 'On-Page SEO Meta Tags & Schema Markup', description: 'Title, Meta Description, JSON-LD Schema.', format: 'JSON / Text' },
      { id: 'd-65', stepNumber: 5, title: 'Content Distribution Plan', description: 'Suggested LinkedIn and Reddit developer community distribution hooks.', format: '1-page PDF' },
    ],
    requiredSkills: [
      { name: 'Technical Writing & Content Strategy', requiredLevel: 'Intermediate', studentLevel: 'Intermediate', isVerified: true },
      { name: 'SEO & Keyword Research', requiredLevel: 'Beginner', studentLevel: 'Beginner', isVerified: true },
    ],
    selectionProcess: [
      '1. Writing sample submission',
      '2. Review by Karthik Raja',
      '3. Article draft review & editorial feedback',
    ],
    terms: {
      paymentTerms: '₹3,000 paid upon final editorial sign-off.',
      expectedHours: '6–8 hours total.',
      confidentiality: 'Published under student byline or ghostwritten per agreement.',
      workOwnership: 'Student can showcase sample in portfolio.',
      portfolioVisibility: true,
      interviewConsiderationTerms: 'Eligible for Paid Growth Marketing Internship.',
      disclaimer: 'Completion may create verified experience and employer feedback. Employment or referral is not guaranteed.',
    },
  },
];

export const sampleActiveProjects: ActiveMicroProject[] = [
  {
    id: 'act-proj-1',
    internshipId: 'mi-1',
    title: 'Build a Student Placement Analytics Dashboard',
    organization: sampleOrganizations[0],
    targetRole: 'Data Analyst',
    startDate: '3 days ago',
    deadline: 'In 7 days (Oct 1)',
    daysRemaining: 7,
    progressPercent: 60,
    milestones: [
      { id: 'm-1', stepNumber: 1, title: 'Confirm requirements & setup schema', status: 'COMPLETED', dueDate: 'Day 2', description: 'Reviewed schema with supervisor Aravind Swaminathan.' },
      { id: 'm-2', stepNumber: 2, title: 'Submit initial data cleaning plan', status: 'COMPLETED', dueDate: 'Day 4', description: 'Handled missing values and outlier CTC packages.' },
      { id: 'm-3', stepNumber: 3, title: 'Complete first draft of dashboard views', status: 'IN_PROGRESS', dueDate: 'Day 7 (Tomorrow)', description: 'Building cohort funnel and domain distribution in Recharts.' },
      { id: 'm-4', stepNumber: 4, title: 'Receive employer feedback & iterate', status: 'UPCOMING', dueDate: 'Day 8', description: 'Review session with CareerBridge Labs engineering team.' },
      { id: 'm-5', stepNumber: 5, title: 'Submit final work & insight brief', status: 'UPCOMING', dueDate: 'Day 10', description: 'Upload final code repo, PDF report, and Loom video.' },
      { id: 'm-6', stepNumber: 6, title: 'Complete final reflection & verification', status: 'UPCOMING', dueDate: 'Day 11', description: 'Employer review rating and Career Passport badge unlock.' },
    ],
    submittedDeliverables: {
      githubUrl: 'https://github.com/divya-careeros/placement-analytics-dashboard',
      demoUrl: 'https://placement-analytics-demo.careeros.app',
      walkthroughVideoUrl: 'https://loom.com/share/demo-placement-analytics-cbl',
      uploadedDocsCount: 2,
      handoffNotes: 'Completed data cleaning SQL views. Working on interactive funnel chart filters.',
    },
    supervisorMessages: [
      {
        id: 'sm-1',
        senderName: 'Aravind Swaminathan',
        senderAvatar: 'AS',
        timestamp: 'Yesterday at 4:15 PM',
        message: 'Great progress on the data cleaning script, Divya! For the funnel chart, make sure to add a filter toggle between Tier-1 and Tier-2 colleges.',
        isSupervisor: true,
      },
      {
        id: 'sm-2',
        senderName: 'Divya (You)',
        senderAvatar: 'DV',
        timestamp: 'Yesterday at 5:30 PM',
        message: 'Thanks Aravind! I added the tier filter toggle and verified the offer drop-off calculation. Working on the salary distribution chart next.',
        isSupervisor: false,
      },
    ],
    workReadyTasks: [
      { id: 'wt-1', title: 'Sent professional onboarding introduction message', isDone: true },
      { id: 'wt-2', title: 'Confirmed project requirements and deliverables in writing', isDone: true },
      { id: 'wt-3', title: 'Sent mid-point progress update before deadline risk', isDone: true },
      { id: 'wt-4', title: 'Incorporated supervisor feedback into chart layout', isDone: false },
      { id: 'wt-5', title: 'Wrote structured final executive handoff brief', isDone: false },
    ],
    podCollaboration: {
      podName: 'React Placement Pod & Analytics Pod',
      peerReviewScheduled: true,
      sharedWithPod: true,
      peerFeedbackSummary: 'Kunal & Tanvi reviewed the dashboard schema: suggested adding tooltip metrics for median CTC.',
    },
  },
];

export const sampleApplications: StudentApplication[] = [
  {
    id: 'app-1',
    internshipId: 'mi-1',
    internshipTitle: 'Build a Student Placement Analytics Dashboard',
    organizationName: 'CareerBridge Labs',
    targetRole: 'Data Analyst',
    appliedDate: '3 days ago',
    status: 'Active',
    expectedResponseDate: 'In Progress (Accepted)',
    matchScore: 82,
    stipendAmount: '₹3,500 stipend',
    motivationStatement: 'Excited to apply my SQL and data visualization skills to solve real placement analytics bottlenecks.',
  },
  {
    id: 'app-2',
    internshipId: 'mi-2',
    internshipTitle: 'Design & Code an Accessible Merchant Checkout Flow',
    organizationName: 'FinPulse Systems',
    targetRole: 'Junior Frontend Developer',
    appliedDate: 'Yesterday',
    status: 'Under review',
    expectedResponseDate: 'Tomorrow by 5 PM',
    matchScore: 88,
    stipendAmount: '₹5,000 stipend',
    motivationStatement: 'Passionate about frontend accessibility and high-performance checkout UI on mobile devices.',
  },
  {
    id: 'app-3',
    internshipId: 'mi-3',
    internshipTitle: 'Customer Churn Feature Engineering & Insight Model',
    organizationName: 'NovaMetrics Analytics',
    targetRole: 'Data Analyst',
    appliedDate: '5 days ago',
    status: 'Shortlisted',
    expectedResponseDate: 'Assessment invitation received',
    matchScore: 79,
    stipendAmount: '₹4,000 stipend',
    motivationStatement: 'Eager to build predictive feature pipelines for SaaS retention metrics.',
  },
  {
    id: 'app-4',
    internshipId: 'mi-5',
    internshipTitle: 'Farmer Crop Advisory Mobile UI & Usability Audit',
    organizationName: 'AgriTech Solutions NGO',
    targetRole: 'UI/UX Designer',
    appliedDate: '1 week ago',
    status: 'Completed',
    expectedResponseDate: 'Completed & Verified',
    matchScore: 85,
    stipendAmount: '₹3,000 grant stipend',
    motivationStatement: 'Wanted to build accessible vernacular UX for rural mobile users.',
  },
];

export const sampleEmployerReviews: EmployerReview[] = [
  {
    id: 'er-1',
    projectName: 'Farmer Crop Advisory Mobile UI & Usability Audit',
    studentName: 'Divya',
    organizationName: 'AgriTech Solutions NGO',
    reviewerName: 'Sunita Sharma',
    reviewerRole: 'Director of Digital Initiatives',
    ratings: {
      deliverableQuality: 5,
      technicalCorrectness: 5,
      communication: 5,
      deadlineReliability: 4,
      problemSolving: 5,
      feedbackResponse: 5,
    },
    overallScore: 4.8,
    strengthSummary: 'Divya created exceptionally thoughtful vernacular iconography and recorded thorough usability testing interviews with clear synthesis.',
    improvementSummary: 'Ensure design system token names adhere strictly to material design typography scale.',
    recommendedForInterview: true,
    approvedForPassport: true,
    completedAt: '2 days ago',
  },
  {
    id: 'er-2',
    projectName: 'Transaction Ledger Filter Component',
    studentName: 'Divya',
    organizationName: 'FinPulse Systems',
    reviewerName: 'Ananya Sharma',
    reviewerRole: 'Staff Frontend Engineer',
    ratings: {
      deliverableQuality: 4,
      technicalCorrectness: 5,
      communication: 5,
      deadlineReliability: 5,
      problemSolving: 4,
      feedbackResponse: 5,
    },
    overallScore: 4.6,
    strengthSummary: 'Rapid refactor to custom React hooks with 70% reduction in re-renders after code review.',
    improvementSummary: 'Add more integration tests covering simulated network failure states.',
    recommendedForInterview: true,
    approvedForPassport: true,
    completedAt: '1 week ago',
  },
];

export const accessNetworkResourcesData: AccessResource[] = [
  {
    id: 'ar-1',
    name: 'Power BI Pro Student License',
    category: 'Software',
    provider: 'Microsoft Student Hub / CareerOS',
    description: 'Complimentary 90-day Power BI Pro cloud publishing license for micro-internship dashboards.',
    valueDescription: '₹1,200/mo value (Free for active projects)',
    isActivated: true,
  },
  {
    id: 'ar-2',
    name: 'WorkHub High-Speed Wi-Fi Space Credits',
    category: 'Workspace',
    provider: 'WorkHub India (95 Centers)',
    description: '20 hours of reserved ergonomic desk space with 300 Mbps fiber internet and power backup.',
    valueDescription: 'Available in Bengaluru, Pune, Hyderabad, Delhi NCR, Mumbai',
    isActivated: true,
  },
  {
    id: 'ar-3',
    name: 'Soundproof Interview & Recording Pod',
    category: 'Interview',
    provider: 'CareerOS Partner Centers',
    description: 'Reserve a 1-hour quiet acoustic room for video walkthrough recordings and employer syncs.',
    valueDescription: 'Instant booking with HD camera & ring light',
    isActivated: false,
  },
  {
    id: 'ar-4',
    name: 'AWS Cloud Credits ($50)',
    category: 'Cloud',
    provider: 'AWS Educate & CareerOS',
    description: 'Cloud credits for deploying Docker containers, serverless APIs, and database instances.',
    valueDescription: '₹4,100 cloud credit voucher',
    isActivated: false,
  },
  {
    id: 'ar-5',
    name: 'Figma Professional Student Access',
    category: 'Software',
    provider: 'Figma for Education',
    description: 'Unlimited team project files, design system tokens, and interactive prototype publishing.',
    valueDescription: 'Instant verification via college email',
    isActivated: true,
  },
  {
    id: 'ar-6',
    name: 'Micro-Internship Project Travel Grant',
    category: 'Stipend',
    provider: 'CareerOS Opportunity Fund',
    description: 'Up to ₹2,500 reimbursement for on-site user testing interviews and partner office visits.',
    valueDescription: 'Reimbursed upon receipt submission',
    isActivated: false,
  },
];
