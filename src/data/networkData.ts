export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  experienceYears: number;
  almaMater?: string;
  careerPath: string;
  skills: string[];
  industries: string[];
  languages: string[];
  availability: string;
  isVerified: boolean;
  isAlumni?: boolean;
  rating: number;
  reviewCount: number;
  sessionTypes: string[];
  bio: string;
}

export interface CareerPodMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  badges: string[];
  isLead?: boolean;
  isCurrentUser?: boolean;
  tasksCompleted: number;
  totalTasks: number;
}

export interface PodTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  assignedTo?: string;
  xpReward: number;
}

export interface PeerReviewQueueItem {
  id: string;
  authorName: string;
  authorAvatar: string;
  projectTitle: string;
  submissionType: string;
  submittedAt: string;
  demoUrl?: string;
  repoUrl?: string;
  summary: string;
  rubricScores?: {
    correctness: number;
    technicalQuality: number;
    clarity: number;
    documentation: number;
    userExperience: number;
    decisionExplanation: number;
  };
  feedbackGiven?: boolean;
}

export interface PodDiscussionPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  roleLabel: string;
  timestamp: string;
  content: string;
  likes: number;
  replies: number;
}

export interface CareerPod {
  id: string;
  name: string;
  careerGoal: string;
  targetRole: string;
  membersCount: number;
  maxCapacity: number;
  currentAvgReadiness: number;
  durationWeeks: number;
  progressPercent: number;
  skillFocus: string[];
  language: string;
  mentorAvailability: string;
  mentorName?: string;
  nextMilestone: string;
  activityStatus: 'ACTIVE' | 'LAUNCHING' | 'COMPLETING';
  isOpen: boolean;
  weeklyHours: number;
  members: CareerPodMember[];
  weeklyMission: {
    title: string;
    description: string;
    deadline: string;
  };
  tasks: PodTask[];
  peerReviewQueue: PeerReviewQueueItem[];
  discussions: PodDiscussionPost[];
  demoDayCountdownDays: number;
}

export interface EmployerOpportunity {
  id: string;
  organization: string;
  logo: string;
  type: 'CHALLENGE' | 'HIRING_ROOM' | 'MICRO_INTERNSHIP' | 'OFFICE_HOUR' | 'HACKATHON' | 'JOB';
  targetRole: string;
  title: string;
  description: string;
  skillsRequired: string[];
  deadline: string;
  isPaid: boolean;
  stipend?: string;
  isRemote: boolean;
  location: string;
  eligibility: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  studentReadinessMatch: number;
  isTrustVerified: boolean;
  participantsCount: number;
  outcome: string;
}

export interface PlaybookOption {
  id: string;
  text: string;
  score: 'EXCELLENT' | 'SUBOPTIMAL' | 'POOR';
  feedback: string;
}

export interface PlaybookSimulation {
  id: string;
  category: 'Cold Outreach' | 'Portfolio & Demos' | 'Referral Requests' | 'Interview Follow-ups' | 'Workplace Navigation' | 'Negotiation';
  title: string;
  scenario: string;
  context: string;
  options: PlaybookOption[];
  idealTemplate: string;
  realWorldActionChecklist: string[];
  badgeUnlock: string;
  estimatedMinutes: number;
  completed?: boolean;
}

export interface ReferralRequest {
  id: string;
  mentorName: string;
  mentorRole: string;
  mentorCompany: string;
  targetRole: string;
  reason: 'Portfolio Review' | 'Technical Guidance' | 'Referral Readiness Check' | 'Mock Interview Followup';
  status: 'DRAFT' | 'SENT' | 'VIEWED' | 'ACCEPTED' | 'FEEDBACK_RECEIVED' | 'INTRODUCTION_APPROVED';
  submittedAt: string;
  message: string;
  attachedProof: string[];
  feedbackNotes?: string;
}

export interface VerifiedProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  verifiedSkills: string[];
  mentorEndorsement?: string;
  architectureHighlight: string;
}

// -------------------------------------------------------------
// REALISTIC MOCK DATA (Indian Tech & Placement Ecosystem)
// -------------------------------------------------------------

export const mentorsData: Mentor[] = [
  {
    id: 'm1',
    name: 'Aravind Swaminathan',
    avatar: 'AS',
    role: 'Staff Frontend Engineer',
    company: 'Razorpay',
    experienceYears: 7,
    almaMater: 'NIT Trichy',
    careerPath: 'Junior SDE → Senior Frontend → Staff Engineer',
    skills: ['React', 'TypeScript', 'Frontend Architecture', 'Web Performance', 'Design Systems'],
    industries: ['Fintech', 'Payments', 'SaaS'],
    languages: ['English', 'Tamil', 'Hindi'],
    availability: '2 slots this week',
    isVerified: true,
    isAlumni: true,
    rating: 4.9,
    reviewCount: 42,
    sessionTypes: ['Portfolio review', 'Technical mock interview', 'Project review'],
    bio: 'Leads core checkout experience at Razorpay. Passionate about helping tier-2/3 college grads build high-signal frontend portfolios.',
  },
  {
    id: 'm2',
    name: 'Pooja Narayanan',
    avatar: 'PN',
    role: 'Senior Software Engineer',
    company: 'Swiggy',
    experienceYears: 5,
    almaMater: 'BITS Pilani',
    careerPath: 'Intern → SDE-1 → Senior SDE',
    skills: ['Node.js', 'Go', 'Distributed Systems', 'Kafka', 'PostgreSQL'],
    industries: ['FoodTech', 'Logistics', 'High-Concurrency'],
    languages: ['English', 'Hindi', 'Telugu'],
    availability: 'Available Thursday & Saturday',
    isVerified: true,
    isAlumni: true,
    rating: 4.95,
    reviewCount: 38,
    sessionTypes: ['System Design review', 'Technical mock interview', 'Resume review'],
    bio: 'Core backend platform engineer at Swiggy handling routing and dispatch engines. Experienced in real-world API scalability.',
  },
  {
    id: 'm3',
    name: 'Rohan Deshmukh',
    avatar: 'RD',
    role: 'Senior SDE (Cloud & Platforms)',
    company: 'Microsoft India',
    experienceYears: 6,
    almaMater: 'IIT Bombay',
    careerPath: 'SDE → SDE-2 → Senior SDE (Azure)',
    skills: ['Core CS', 'Operating Systems', 'Azure', 'C++', 'System Design'],
    industries: ['Cloud Infrastructure', 'Enterprise Platforms'],
    languages: ['English', 'Marathi', 'Hindi'],
    availability: 'Weekend slots available',
    isVerified: true,
    isAlumni: true,
    rating: 4.88,
    reviewCount: 51,
    sessionTypes: ['Core CS & OS deep-dive', 'Mock interview', 'Referral readiness check'],
    bio: 'Builds scalable Azure microservices at Microsoft IDC. Mentored over 120 students into product engineering roles.',
  },
  {
    id: 'm4',
    name: 'Ananya Sen',
    avatar: 'AS',
    role: 'Lead Product Engineer',
    company: 'Cred',
    experienceYears: 6,
    almaMater: 'IIIT Hyderabad',
    careerPath: 'Frontend Dev → Fullstack Dev → Lead Product Engineer',
    skills: ['Product Thinking', 'React Native', 'React', 'GraphQL', 'Microfrontends'],
    industries: ['Fintech', 'Consumer Tech'],
    languages: ['English', 'Bengali', 'Hindi'],
    availability: '1 slot today',
    isVerified: true,
    rating: 4.92,
    reviewCount: 29,
    sessionTypes: ['Portfolio review', 'Product thinking for engineers', 'Career conversation'],
    bio: 'Obsessed with crafting clean user experiences and high-trust engineering systems at Cred. Mentors on storytelling through code.',
  },
  {
    id: 'm5',
    name: 'Vikramaditya Rao',
    avatar: 'VR',
    role: 'Principal Architect',
    company: 'Zoho Corporation',
    experienceYears: 10,
    almaMater: 'Anna University',
    careerPath: 'Software Engineer → Member Technical Staff → Principal Architect',
    skills: ['Java', 'Database Internals', 'SQL Indexing', 'Distributed Caching', 'Linux'],
    industries: ['Enterprise SaaS', 'Cloud Office'],
    languages: ['English', 'Tamil'],
    availability: 'Friday evening',
    isVerified: true,
    rating: 4.97,
    reviewCount: 64,
    sessionTypes: ['Project review', 'Database design audit', 'Industry Q&A'],
    bio: '10+ years architecting multi-tenant databases and SaaS backends at Zoho. Strong advocate for deep foundational CS over superficial frameworks.',
  },
  {
    id: 'm6',
    name: 'Kavita Menon',
    avatar: 'KM',
    role: 'Machine Learning Engineer',
    company: 'Google India',
    experienceYears: 4,
    almaMater: 'IIT Madras',
    careerPath: 'Research Intern → Applied Scientist → ML Engineer',
    skills: ['Python', 'PyTorch', 'LLMs', 'MLOps', 'Vector Search'],
    industries: ['AI Research', 'Search & Assistant'],
    languages: ['English', 'Malayalam', 'Hindi'],
    availability: 'Saturday morning',
    isVerified: true,
    isAlumni: true,
    rating: 4.9,
    reviewCount: 33,
    sessionTypes: ['AI project review', 'Technical interview', 'Career roadmap'],
    bio: 'Works on generative intelligence and search ranking models at Google Bengaluru. Helps students transition from academic ML to production systems.',
  },
  {
    id: 'm7',
    name: 'Deepak Chhabra',
    avatar: 'DC',
    role: 'Staff SDE & Tech Lead',
    company: 'Flipkart',
    experienceYears: 8,
    almaMater: 'DTU Delhi',
    careerPath: 'SDE-1 → SDE-2 → Staff SDE',
    skills: ['Java', 'High Throughput', 'Distributed Transactions', 'DSA', 'Spring Boot'],
    industries: ['E-Commerce', 'Supply Chain Tech'],
    languages: ['English', 'Hindi', 'Punjabi'],
    availability: '3 slots this week',
    isVerified: true,
    isAlumni: true,
    rating: 4.85,
    reviewCount: 47,
    sessionTypes: ['DSA problem defense', 'Technical mock interview', 'Resume review'],
    bio: 'Tech lead for Flipkart fulfillment and warehouse algorithms. Conducted 200+ engineering hiring interviews.',
  },
  {
    id: 'm8',
    name: 'Shreya Kulkarni',
    avatar: 'SK',
    role: 'Engineering Lead (Developer Tools)',
    company: 'Postman',
    experienceYears: 7,
    almaMater: 'COEP Pune',
    careerPath: 'Open Source Contributor → SDE → Engineering Lead',
    skills: ['APIs', 'Node.js', 'Developer Platforms', 'Open Source', 'System Architecture'],
    industries: ['DevTools', 'API Infrastructure'],
    languages: ['English', 'Hindi', 'Marathi'],
    availability: 'Available tomorrow',
    isVerified: true,
    rating: 4.94,
    reviewCount: 35,
    sessionTypes: ['API architecture review', 'Portfolio review', 'Career conversation'],
    bio: 'Leads API tooling and open-source developer platform initiatives at Postman. Mentors students on building public engineering credibility.',
  },
];

export const alumniData: Mentor[] = mentorsData.filter((m) => m.isAlumni);

export const careerPodsData: CareerPod[] = [
  {
    id: 'pod-react-placement',
    name: 'React Placement Pod',
    careerGoal: 'Become referral-ready for Junior Frontend & Fullstack roles at Product Startups.',
    targetRole: 'Junior Frontend Developer',
    membersCount: 8,
    maxCapacity: 10,
    currentAvgReadiness: 74,
    durationWeeks: 6,
    progressPercent: 64,
    skillFocus: ['React 18', 'REST APIs', 'TypeScript', 'Component Testing'],
    language: 'English',
    mentorAvailability: 'Bi-weekly office hours with Aravind (Razorpay)',
    mentorName: 'Aravind Swaminathan',
    nextMilestone: 'Sprint 3: Deliver State Management & Performance Audit',
    activityStatus: 'ACTIVE',
    isOpen: true,
    weeklyHours: 6,
    demoDayCountdownDays: 14,
    members: [
      { id: 'u0', name: 'Divya (You)', avatar: 'DV', role: 'Frontend Engineer Trainee', badges: ['Consistent Finisher', 'Helpful Reviewer'], isCurrentUser: true, tasksCompleted: 5, totalTasks: 6 },
      { id: 'u1', name: 'Kunal Sharma', avatar: 'KS', role: 'Pod Leader', badges: ['Pod Leader', 'Reliable Collaborator'], isLead: true, tasksCompleted: 6, totalTasks: 6 },
      { id: 'u2', name: 'Tanvi Agarwal', avatar: 'TA', role: 'Frontend Specialist', badges: ['Strong Explainer'], tasksCompleted: 4, totalTasks: 6 },
      { id: 'u3', name: 'Harsh Vardhan', avatar: 'HV', role: 'UI Engineer', badges: ['Peer Mentor'], tasksCompleted: 5, totalTasks: 6 },
      { id: 'u4', name: 'Sneha Roy', avatar: 'SR', role: 'React Trainee', badges: ['Consistent Finisher'], tasksCompleted: 3, totalTasks: 6 },
      { id: 'u5', name: 'Aditya Nair', avatar: 'AN', role: 'Fullstack Explorer', badges: ['Helpful Reviewer'], tasksCompleted: 4, totalTasks: 6 },
      { id: 'u6', name: 'Megha Joshi', avatar: 'MJ', role: 'Web Developer', badges: ['Reliable Collaborator'], tasksCompleted: 5, totalTasks: 6 },
      { id: 'u7', name: 'Rishi Patel', avatar: 'RP', role: 'Junior Dev', badges: ['Consistent Finisher'], tasksCompleted: 2, totalTasks: 6 },
    ],
    weeklyMission: {
      title: 'Build API integration with error states & submit 2-min Loom walkthrough',
      description: 'Implement optimistic updates and structured error boundaries for your primary dashboard screen. Submit peer review with trade-off justification.',
      deadline: 'Sunday, 11:59 PM',
    },
    tasks: [
      { id: 't1', title: 'Implement React Query / custom fetch hook with caching', description: 'Ensure offline resilience and retry logic on 5xx errors.', dueDate: 'In 2 days', status: 'COMPLETED', xpReward: 100 },
      { id: 't2', title: 'Add Jest/RTL tests for core user workflow', description: 'Cover happy path and at least 2 edge cases.', dueDate: 'In 4 days', status: 'IN_PROGRESS', xpReward: 150 },
      { id: 't3', title: 'Record 2-min Loom explaining trade-offs', description: 'Explain state vs derived state decisions clearly.', dueDate: 'In 6 days', status: 'TODO', xpReward: 120 },
      { id: 't4', title: 'Complete peer review on 2 fellow pod members', description: 'Use the 6-dimension rubric to give actionable feedback.', dueDate: 'In 7 days', status: 'TODO', xpReward: 100 },
    ],
    peerReviewQueue: [
      {
        id: 'pr-1',
        authorName: 'Tanvi Agarwal',
        authorAvatar: 'TA',
        projectTitle: 'Realtime Task Kanban with Optimistic UI',
        submissionType: 'React + Tailwind + WebSockets',
        submittedAt: 'Today at 9:15 AM',
        demoUrl: 'https://kanban-demo.careeros.dev',
        repoUrl: 'https://github.com/tanvi/kanban-demo',
        summary: 'Built drag-and-drop task boards with optimistic UI updates and socket syncing. Would love review on hook architecture.',
      },
      {
        id: 'pr-2',
        authorName: 'Harsh Vardhan',
        authorAvatar: 'HV',
        projectTitle: 'Fintech Transaction Filter & Chart Explorer',
        submissionType: 'React + TypeScript + Recharts',
        submittedAt: 'Yesterday at 6:40 PM',
        demoUrl: 'https://fintech-charts.careeros.dev',
        repoUrl: 'https://github.com/harsh/fintech-viz',
        summary: 'Integrated virtualization for 10,000 transaction rows and added dynamic CSV export. Need feedback on memory performance.',
      },
    ],
    discussions: [
      { id: 'd1', authorName: 'Kunal Sharma', authorAvatar: 'KS', roleLabel: 'Pod Leader', timestamp: '2 hours ago', content: 'Great job on the API milestone everyone! Remember that during mentor review with Aravind on Saturday, he will ask why you chose your specific state management pattern.', likes: 6, replies: 3 },
      { id: 'd2', authorName: 'Tanvi Agarwal', authorAvatar: 'TA', roleLabel: 'Frontend Specialist', timestamp: '4 hours ago', content: 'Just uploaded my Kanban PR. Tested across slow 3G throttling. Looking for review feedback on the error boundary fallback UI!', likes: 4, replies: 2 },
    ],
  },
  {
    id: 'pod-data-analytics',
    name: 'Data Analytics Launch Group',
    careerGoal: 'Master business metrics, SQL queries, and interactive BI dashboards for analytics roles.',
    targetRole: 'Junior Data Analyst',
    membersCount: 6,
    maxCapacity: 8,
    currentAvgReadiness: 71,
    durationWeeks: 4,
    progressPercent: 71,
    skillFocus: ['Advanced SQL', 'Excel Modeling', 'Power BI', 'Business Storytelling'],
    language: 'English',
    mentorAvailability: 'Weekly review with Pooja (Swiggy Analytics)',
    mentorName: 'Pooja Narayanan',
    nextMilestone: 'Cohort Capstone: E-Commerce Retention & Cohort Analysis',
    activityStatus: 'ACTIVE',
    isOpen: true,
    weeklyHours: 5,
    demoDayCountdownDays: 10,
    members: [],
    weeklyMission: {
      title: 'Analyze 500k row delivery dataset and present 3 operational bottlenecks',
      description: 'Run window functions to calculate 90th percentile delivery times by hub and build an interactive summary chart.',
      deadline: 'Saturday, 6:00 PM',
    },
    tasks: [],
    peerReviewQueue: [],
    discussions: [],
  },
  {
    id: 'pod-product-case',
    name: 'Product Case Interview Circle',
    careerGoal: 'Crack APM & Product Analyst interview rounds through weekly live peer mocks.',
    targetRole: 'Associate Product Manager',
    membersCount: 7,
    maxCapacity: 8,
    currentAvgReadiness: 68,
    durationWeeks: 3,
    progressPercent: 55,
    skillFocus: ['Product Sense', 'Metric Trees', 'User Journey Mapping', 'RCA Frameworks'],
    language: 'English',
    mentorAvailability: 'Guest sessions with Ananya (Cred)',
    mentorName: 'Ananya Sen',
    nextMilestone: 'Design a micro-savings feature for UPI users in Tier-3 India',
    activityStatus: 'ACTIVE',
    isOpen: true,
    weeklyHours: 4,
    demoDayCountdownDays: 7,
    members: [],
    weeklyMission: {
      title: 'Submit 3-page PRD on improving checkout conversion by 15%',
      description: 'Include North Star metric, trade-off matrix, guardrail metrics, and go-to-market experiment plan.',
      deadline: 'Monday, 10:00 AM',
    },
    tasks: [],
    peerReviewQueue: [],
    discussions: [],
  },
  {
    id: 'pod-backend-scale',
    name: 'Backend Scalability Pod',
    careerGoal: 'Build high-throughput microservices and master database indexing and concurrency.',
    targetRole: 'Backend Engineer',
    membersCount: 8,
    maxCapacity: 8,
    currentAvgReadiness: 79,
    durationWeeks: 8,
    progressPercent: 80,
    skillFocus: ['PostgreSQL Indexing', 'Redis Caching', 'Go / Node.js', 'System Architecture'],
    language: 'English',
    mentorAvailability: 'Vikramaditya (Zoho)',
    mentorName: 'Vikramaditya Rao',
    nextMilestone: 'Stress testing backend to sustain 5,000 QPS with p99 < 50ms',
    activityStatus: 'ACTIVE',
    isOpen: false,
    weeklyHours: 8,
    demoDayCountdownDays: 18,
    members: [],
    weeklyMission: {
      title: 'Implement idempotency key middleware for payment webhooks',
      description: 'Prevent double-charge race conditions under high concurrent retry storms.',
      deadline: 'Friday, 11:59 PM',
    },
    tasks: [],
    peerReviewQueue: [],
    discussions: [],
  },
  {
    id: 'pod-system-design',
    name: 'System Design Masters',
    careerGoal: 'Master High-Level and Low-Level system design patterns for Tier-1 engineering rounds.',
    targetRole: 'Software Development Engineer',
    membersCount: 5,
    maxCapacity: 8,
    currentAvgReadiness: 75,
    durationWeeks: 6,
    progressPercent: 40,
    skillFocus: ['HLD', 'LLD', 'Clean Code', 'Design Patterns', 'Distributed Consensus'],
    language: 'English',
    mentorAvailability: 'Rohan Deshmukh (Microsoft)',
    mentorName: 'Rohan Deshmukh',
    nextMilestone: 'Design a distributed rate-limiter with token-bucket & sliding window',
    activityStatus: 'ACTIVE',
    isOpen: true,
    weeklyHours: 6,
    demoDayCountdownDays: 25,
    members: [],
    weeklyMission: {
      title: 'Write LLD in TypeScript for a Parking Lot & Ticket Allocation Engine',
      description: 'Incorporate SOLID principles, factory and strategy patterns with clean unit tests.',
      deadline: 'Sunday, 8:00 PM',
    },
    tasks: [],
    peerReviewQueue: [],
    discussions: [],
  },
  {
    id: 'pod-cloud-devops',
    name: 'Cloud & DevOps Sprint',
    careerGoal: 'Automate CI/CD pipelines, Docker container orchestration, and AWS deployments.',
    targetRole: 'Cloud / DevOps Engineer',
    membersCount: 6,
    maxCapacity: 8,
    currentAvgReadiness: 66,
    durationWeeks: 5,
    progressPercent: 50,
    skillFocus: ['Docker', 'GitHub Actions', 'AWS ECS / EC2', 'Terraform basics', 'Monitoring'],
    language: 'English',
    mentorAvailability: 'Deepak Chhabra (Flipkart)',
    mentorName: 'Deepak Chhabra',
    nextMilestone: 'Deploy automated blue-green zero-downtime deployment pipeline',
    activityStatus: 'ACTIVE',
    isOpen: true,
    weeklyHours: 5,
    demoDayCountdownDays: 20,
    members: [],
    weeklyMission: {
      title: 'Containerize multi-tier application with Docker Compose & health checks',
      description: 'Write hardened Dockerfile and configure automated build on GitHub release tags.',
      deadline: 'Saturday, 11:59 PM',
    },
    tasks: [],
    peerReviewQueue: [],
    discussions: [],
  },
  {
    id: 'pod-dsa-sprint',
    name: 'DSA 100-Problem Placement Sprint',
    careerGoal: 'Conquer top recurring LeetCode patterns for online assessments and live coding rounds.',
    targetRole: 'SDE Candidate',
    membersCount: 8,
    maxCapacity: 10,
    currentAvgReadiness: 72,
    durationWeeks: 6,
    progressPercent: 60,
    skillFocus: ['Two Pointers', 'Sliding Window', 'Trees & BST', 'Dynamic Programming', 'Graphs'],
    language: 'English',
    mentorAvailability: 'Weekly problem teardown with Deepak (Flipkart)',
    mentorName: 'Deepak Chhabra',
    nextMilestone: 'Master 15 Dynamic Programming patterns with recurrence visualization',
    activityStatus: 'ACTIVE',
    isOpen: true,
    weeklyHours: 7,
    demoDayCountdownDays: 16,
    members: [],
    weeklyMission: {
      title: 'Solve 10 Graph BFS/DFS & Dijkstra problems with clean space-complexity notes',
      description: 'Document the invariant and trade-off in the pod repository.',
      deadline: 'Sunday, 11:59 PM',
    },
    tasks: [],
    peerReviewQueue: [],
    discussions: [],
  },
  {
    id: 'pod-ai-founders',
    name: 'AI Agent & LLM Builders Pod',
    careerGoal: 'Build and deploy production-grade AI agents, RAG systems, and function-calling workflows.',
    targetRole: 'AI Engineer / Fullstack AI Dev',
    membersCount: 7,
    maxCapacity: 8,
    currentAvgReadiness: 77,
    durationWeeks: 4,
    progressPercent: 75,
    skillFocus: ['Gemini API', 'Vector DBs', 'RAG', 'Agentic Loops', 'Evaluation'],
    language: 'English',
    mentorAvailability: 'Kavita Menon (Google)',
    mentorName: 'Kavita Menon',
    nextMilestone: 'Build an autonomous evaluation pipeline with ground-truth test cases',
    activityStatus: 'ACTIVE',
    isOpen: true,
    weeklyHours: 6,
    demoDayCountdownDays: 12,
    members: [],
    weeklyMission: {
      title: 'Implement structured output parser with automatic retry logic for tool calling',
      description: 'Ensure deterministic JSON schemas and robust error recovery on hallucinations.',
      deadline: 'Saturday, 8:00 PM',
    },
    tasks: [],
    peerReviewQueue: [],
    discussions: [],
  },
];

export const employerOpportunitiesData: EmployerOpportunity[] = [
  {
    id: 'opp-1',
    organization: 'FinEdge Technologies',
    logo: 'FE',
    type: 'CHALLENGE',
    targetRole: 'Junior Frontend Engineer',
    title: 'Fintech Transaction Analytics Dashboard Challenge',
    description: 'Build a high-performance interactive transaction visualization system with filtering, export, and responsive dark theme.',
    skillsRequired: ['React', 'TypeScript', 'Data Visualization', 'REST APIs'],
    deadline: 'In 6 days',
    isPaid: true,
    stipend: '₹35,000 cash prizes + Fast-track interview',
    isRemote: true,
    location: 'Remote (India)',
    eligibility: '2025/2026 Batch Graduates with 70%+ readiness',
    difficulty: 'Intermediate',
    studentReadinessMatch: 82,
    isTrustVerified: true,
    participantsCount: 148,
    outcome: 'Direct SDE-1 interview shortlisting for top 10 submissions.',
  },
  {
    id: 'opp-2',
    organization: 'CloudScale Networks',
    logo: 'CS',
    type: 'HIRING_ROOM',
    targetRole: 'Backend Engineer (Distributed Systems)',
    title: 'High-Concurrency Event Processing Hiring Room',
    description: 'Exclusive hiring room for students with verified backend projects. Solve a live architectural puzzle and meet the engineering leads.',
    skillsRequired: ['Node.js', 'Go', 'Redis', 'PostgreSQL'],
    deadline: 'In 3 days',
    isPaid: true,
    stipend: '₹8 - 14 LPA Full-time SDE Offer',
    isRemote: false,
    location: 'Bengaluru / Hyderabad',
    eligibility: 'Tier-1/2/3 with verified project proof & 75%+ Core CS score',
    difficulty: 'Advanced',
    studentReadinessMatch: 76,
    isTrustVerified: true,
    participantsCount: 84,
    outcome: 'Same-day interview rounds & offer rollout.',
  },
  {
    id: 'opp-3',
    organization: 'DataPulse AI Labs',
    logo: 'DP',
    type: 'MICRO_INTERNSHIP',
    targetRole: 'Data Engineering Intern',
    title: 'Automated ETL & Data Quality Pipeline Sprint',
    description: '4-week paid micro-internship helping DataPulse build ingestion pipelines for public regulatory feeds.',
    skillsRequired: ['Python', 'SQL', 'Data Pipelines', 'FastAPI'],
    deadline: 'In 8 days',
    isPaid: true,
    stipend: '₹25,000 / month',
    isRemote: true,
    location: 'Remote',
    eligibility: 'Demonstrated SQL and Python coursework or projects',
    difficulty: 'Intermediate',
    studentReadinessMatch: 70,
    isTrustVerified: true,
    participantsCount: 210,
    outcome: 'Option for full semester extension & PPO conversion.',
  },
  {
    id: 'opp-4',
    organization: 'Razorpay Engineering',
    logo: 'RP',
    type: 'OFFICE_HOUR',
    targetRole: 'Product Engineering Candidates',
    title: 'Engineering Deep-Dive: Handling Millions in Peak Festive Traffic',
    description: 'Live office hour and Q&A with Razorpay Staff Engineers. Review architecture trade-offs and receive live portfolio feedback.',
    skillsRequired: ['Web Engineering', 'Distributed Caching', 'System Design'],
    deadline: 'This Friday, 7:00 PM IST',
    isPaid: false,
    isRemote: true,
    location: 'Live Stream + Interactive Q&A',
    eligibility: 'Open to all CareerOS Network members',
    difficulty: 'Beginner',
    studentReadinessMatch: 90,
    isTrustVerified: true,
    participantsCount: 420,
    outcome: 'Certificate of attendance & priority review for student projects.',
  },
  {
    id: 'opp-5',
    organization: 'Swiggy Tech',
    logo: 'SW',
    type: 'CHALLENGE',
    targetRole: 'Logistics & Algorithms SDE',
    title: 'Optimal Delivery Route & Batching Simulation Challenge',
    description: 'Write an algorithm to minimize delivery rider idle time given dynamic real-world pickup and delivery constraints.',
    skillsRequired: ['Data Structures', 'Graph Algorithms', 'Java / Python / C++'],
    deadline: 'In 12 days',
    isPaid: true,
    stipend: '₹50,000 First Prize + Direct SDE-1 Interview',
    isRemote: true,
    location: 'Online',
    eligibility: 'Enrolled engineering students with strong DSA background',
    difficulty: 'Advanced',
    studentReadinessMatch: 68,
    isTrustVerified: true,
    participantsCount: 312,
    outcome: 'Top 5 rankers skip technical screening round.',
  },
  {
    id: 'opp-6',
    organization: 'NextGen SaaS',
    logo: 'NG',
    type: 'JOB',
    targetRole: 'Junior Fullstack Engineer',
    title: 'Collaborative Document Editor Development',
    description: 'Full-time opening building real-time CRDT sync and rich-text editing modules for remote enterprise teams.',
    skillsRequired: ['React', 'Node.js', 'WebSockets', 'PostgreSQL'],
    deadline: 'In 14 days',
    isPaid: true,
    stipend: '₹9 - 13 LPA CTC',
    isRemote: true,
    location: 'Remote (India)',
    eligibility: 'Completed at least 2 deployed fullstack projects',
    difficulty: 'Intermediate',
    studentReadinessMatch: 85,
    isTrustVerified: true,
    participantsCount: 95,
    outcome: 'Direct technical interview with Engineering Lead.',
  },
];

export const playbookSimulationsData: PlaybookSimulation[] = [
  {
    id: 'pb-1',
    category: 'Cold Outreach',
    title: 'How to message a senior engineer on LinkedIn for portfolio feedback',
    scenario: 'You want feedback from a Staff Frontend Engineer at Razorpay on your new React project. What message do you send?',
    context: 'Senior engineers receive dozens of generic "Please give me a referral" messages every week. The secret is to show genuine context, make the ask frictionless (< 3 min effort), and prove you have already done the heavy lifting.',
    options: [
      {
        id: 'opt-1a',
        text: 'Hi sir, I am a fresher looking for job. Please check my resume and give referral in Razorpay.',
        score: 'POOR',
        feedback: 'Too transactional, low-effort, and asks for a referral before establishing any trust or skill proof. Likely to be ignored.',
      },
      {
        id: 'opt-1b',
        text: 'Hello Aravind, I noticed your talk on Razorpay checkout optimizations. I built a React payment dashboard focusing on sub-100ms render speeds. Could you review my 2-min Loom and critique my state caching trade-off when you have a free moment?',
        score: 'EXCELLENT',
        feedback: 'Exemplary! References their work, shows relevant technical proof, asks a specific question, and keeps the time commitment to 2 minutes.',
      },
      {
        id: 'opt-1c',
        text: 'Hello, can we connect on a 30-minute Zoom call so you can teach me what skills I need to get into fintech companies?',
        score: 'SUBOPTIMAL',
        feedback: 'A 30-minute synchronous call is too large a commitment for someone who does not know you yet. Start with an asynchronous, specific question first.',
      },
    ],
    idealTemplate: `Hello [Name],

I saw your recent work on [Specific topic or company achievement]. I've been building a [Project Name] using [Tech Stack], specifically focusing on [Technical Challenge e.g. optimistic updates / concurrency].

If you have 2 minutes, I would value your perspective on one architectural decision: [Specific Question e.g. whether you would recommend React Query or custom state caching in this scenario]?

Live Demo: [Link] (2-min video walkthrough attached)

Thank you for your time and engineering insights!`,
    realWorldActionChecklist: [
      'Find a specific technical post or open-source PR by the engineer.',
      'Record a concise 90-second video demo (no filler).',
      'Ask ONE specific technical question instead of generic "advice".',
      'Make sure repo has a clean README and live deployment URL.',
    ],
    badgeUnlock: 'Master of High-Signal Outreach',
    estimatedMinutes: 4,
    completed: true,
  },
  {
    id: 'pb-2',
    category: 'Referral Requests',
    title: 'How to ask for an employee referral with verified evidence',
    scenario: 'You meet 85% of the requirements for an open Junior SDE role at Swiggy and an alumnus from your college works there. How do you approach them?',
    context: 'Employees stake their personal reputation when referring someone. Making it effortless for them by providing the exact Job ID, matching bullet points, and clean artifacts maximizes your success rate.',
    options: [
      {
        id: 'opt-2a',
        text: 'Hey! I saw Swiggy is hiring. Can you refer me to any SDE opening? Here is my resume PDF.',
        score: 'POOR',
        feedback: 'Forces the alumnus to search the internal job board for you and guess your qualifications.',
      },
      {
        id: 'opt-2b',
        text: 'Hi Pooja, hope you are doing well! I am applying for Job ID #SW-8942 (Junior Backend SDE - Logistics). I have tailored my verified projects to match the PostgreSQL and high-throughput requirements, and scored 84% on the CareerOS readiness benchmark. If comfortable, would you be willing to submit my profile for this specific role? Attached is a 1-paragraph summary you can paste directly.',
        score: 'EXCELLENT',
        feedback: 'Perfect! Provides the exact Job ID, demonstrates verified qualifications, gives them a ready-to-paste blurb, and gives them an easy out.',
      },
      {
        id: 'opt-2c',
        text: 'Hello, I really need a referral because off-campus applications never get replied to. Please help me out.',
        score: 'SUBOPTIMAL',
        feedback: 'Appeals to sympathy rather than technical competency. Referrers need confidence in your ability to clear the interviews.',
      },
    ],
    idealTemplate: `Hi [Name],

Hope you're having a great week! 

I'm applying for [Job Title] (Req ID: [Job ID]) at [Company]. I wanted to reach out because my recent work directly mirrors the requirements:
• [Achievement 1: e.g. Built a Redis-backed queue sustaining 2,000 QPS]
• [Achievement 2: e.g. 85% score on verified DSA & Core CS benchmark]

If you feel my profile is a solid match, would you be open to submitting an internal referral? I've included a ready-to-paste 3-sentence summary and my verified portfolio link below to make it as quick as possible for you:

Portfolio: [Link] | Resume: [Link]

Either way, thank you for your time!`,
    realWorldActionChecklist: [
      'Locate the exact Job ID from the company careers page.',
      'Check that your resume keywords match the job description (ATS > 80%).',
      'Provide a 3-sentence third-person blurb the referrer can copy-paste.',
      'Always include your portfolio link with live project demos.',
    ],
    badgeUnlock: 'Referral Strategist',
    estimatedMinutes: 5,
    completed: true,
  },
  {
    id: 'pb-3',
    category: 'Portfolio & Demos',
    title: 'How to present a project in 90 seconds during an interview or demo',
    scenario: 'An interviewer asks: "Tell me about the most impactful project on your resume." How do you structure your explanation?',
    context: 'Elite candidates avoid rambling through every line of code. They use the Problem → Technical Bottleneck → Architectural Choice → Measurable Outcome format.',
    options: [
      {
        id: 'opt-3a',
        text: 'So basically I used React and Node and MongoDB. First I made the login page, then I made the navbar, then I made the database connection with Mongoose...',
        score: 'POOR',
        feedback: 'Lists chronological steps rather than engineering problem solving, trade-offs, or measurable impact.',
      },
      {
        id: 'opt-3b',
        text: 'I built an AI placement platform used by 200+ students. The main engineering challenge was real-time interview evaluation latency. I decoupled the LLM analysis via asynchronous worker queues and Redis caching, cutting p95 response time from 6.4s to 820ms while handling concurrent submissions.',
        score: 'EXCELLENT',
        feedback: 'Superb! Concise, explains the real architectural bottleneck, clearly states the trade-off decision, and shares concrete performance metrics.',
      },
      {
        id: 'opt-3c',
        text: 'It is a really cool app that helps people. I spent 3 months on it and worked really hard on the CSS animation.',
        score: 'SUBOPTIMAL',
        feedback: 'Lacks technical depth and engineering specificity.',
      },
    ],
    idealTemplate: `1. Context (15s): "I built [Project Name], which solves [Problem] for [Target Users]."
2. Core Technical Hurdle (30s): "The primary engineering challenge was [Specific Bottleneck e.g. state synchronization / database latency under peak load]."
3. Architectural Decision (30s): "To solve this, I chose [Technology/Pattern] over [Alternative] because [Trade-off Reason]."
4. Measurable Result (15s): "This resulted in [Concrete Metric e.g. 40% reduction in API latency / 99.8% test coverage]. Here is the live demo."`,
    realWorldActionChecklist: [
      'State the problem in one sentence without jargon.',
      'Highlight ONE non-trivial architectural trade-off.',
      'State why you rejected the obvious alternative approach.',
      'End with a concrete latency, throughput, or user metric.',
    ],
    badgeUnlock: 'High-Impact Communicator',
    estimatedMinutes: 4,
    completed: false,
  },
  {
    id: 'pb-4',
    category: 'Interview Follow-ups',
    title: 'How to write a high-value post-interview thank you email',
    scenario: 'You just finished a 45-minute technical interview where the interviewer asked a challenging tree traversal question you partially solved. What do you do?',
    context: 'A great follow-up email is not just "Thanks for your time." It shows intellectual curiosity and that you spent time reflecting on the discussion and refining your solution.',
    options: [
      {
        id: 'opt-4a',
        text: 'Send nothing. Recruiters will email if they want you.',
        score: 'SUBOPTIMAL',
        feedback: 'Misses an opportunity to show your engineering mindset and dedication.',
      },
      {
        id: 'opt-4b',
        text: 'Hi Sir, thanks for interview. When can I expect offer letter? I really need this job.',
        score: 'POOR',
        feedback: 'Shows impatience and lacks professionalism.',
      },
      {
        id: 'opt-4c',
        text: 'Send a concise note thanking them for the discussion, referencing the specific optimization they suggested for the tree traversal, and including a 6-line code snippet showing the optimized O(1) space solution you worked out after the call.',
        score: 'EXCELLENT',
        feedback: 'Unbelievably high signal! Proves you are self-driven, take feedback seriously, and solve problems even after the timer stops.',
      },
    ],
    idealTemplate: `Hi [Interviewer Name],

Thank you for taking the time to speak with me today regarding the [Role Name] position at [Company]. I really enjoyed our discussion on [Specific Topic discussed].

I kept thinking about your question regarding [Problem Name] and how we could optimize the space complexity. After our call, I implemented the [e.g. iterative Morris traversal / cached approach] to achieve O(1) auxiliary space:

[Link to GitHub Gist / Clean Code snippet]

Regardless of the outcome, I truly appreciated your guidance today.

Best regards,
[Your Name]`,
    realWorldActionChecklist: [
      'Send within 12 hours of the interview.',
      'Reference a specific technical insight from the conversation.',
      'If you stumbled on a question, share the corrected solution in a clean Gist.',
      'Keep the total email under 120 words.',
    ],
    badgeUnlock: 'Post-Interview Pro',
    estimatedMinutes: 4,
    completed: false,
  },
  {
    id: 'pb-5',
    category: 'Workplace Navigation',
    title: 'How to handle a disagreement on code review without being defensive',
    scenario: 'A senior engineer on your team leaves a comment on your pull request saying: "This implementation has too much cognitive complexity. Refactor into smaller composable functions."',
    context: 'Code reviews are not personal critiques. Tier-1 engineers demonstrate curiosity, clarify intent, propose options, and embrace team conventions.',
    options: [
      {
        id: 'opt-5a',
        text: 'Reply: "It works fine in my local testing and passed all test cases so we should merge it to save time."',
        score: 'POOR',
        feedback: 'Defensive, ignores maintainability concerns, and harms peer collaboration.',
      },
      {
        id: 'opt-5b',
        text: 'Reply: "Thanks for the feedback! I broke down the data transformation into three pure helper functions (validatePayload, calculateTotals, formatResponse) in commit #a49f. Does this match what you had in mind?"',
        score: 'EXCELLENT',
        feedback: 'Collaborative, action-oriented, demonstrates clean code principles, and verifies alignment.',
      },
      {
        id: 'opt-5c',
        text: 'Silently delete the PR and feel discouraged from contributing.',
        score: 'SUBOPTIMAL',
        feedback: 'Feedback is a natural part of professional growth in engineering teams.',
      },
    ],
    idealTemplate: `"Thanks for catching that, [Name]! I agree that breaking this down improves readability. 

I've refactored the logic into [Function A] and [Function B] in commit [SHA]. Please let me know if this aligns with the team standard, and I'll squash the commits."`,
    realWorldActionChecklist: [
      'Assume positive intent: review comments target the code, not you.',
      'Ask clarifying questions if the suggestion is ambiguous.',
      'Provide a direct commit link when addressing the feedback.',
      'Thank the reviewer for helping you uphold code quality.',
    ],
    badgeUnlock: 'Collaborative Craftsperson',
    estimatedMinutes: 3,
    completed: false,
  },
  {
    id: 'pb-6',
    category: 'Workplace Navigation',
    title: 'How to ask your manager or team lead for clarification when stuck',
    scenario: 'You have been assigned a task to implement a webhook listener, but the third-party schema documentation is inconsistent. You have spent 90 minutes trying to debug it.',
    context: 'The "15-minute / 60-minute rule": Try resolving it on your own first, but never stay blocked for half a day in silence. When asking, summarize what you tried and present hypotheses.',
    options: [
      {
        id: 'opt-6a',
        text: 'Wait for the next morning standup and say "I was blocked so I could not do anything."',
        score: 'POOR',
        feedback: 'Passive approach that stalls sprint momentum and shows lack of initiative.',
      },
      {
        id: 'opt-6b',
        text: 'Post on Slack: "Hey, I am stuck on the webhook task. I inspected sample payloads and verified the HMAC signature passes, but the nested metadata field is missing in 2 event types. I tested Approach A (fallback parser) and Approach B (optional chaining). Which direction aligns with our API contract?"',
        score: 'EXCELLENT',
        feedback: 'Perfect! Shows investigation diligence, isolates the exact issue, and offers two concrete solution paths.',
      },
      {
        id: 'opt-6c',
        text: 'Immediately call your lead on Slack every 5 minutes with one-line questions.',
        score: 'SUBOPTIMAL',
        feedback: 'Disrupts the lead without batching your thoughts or demonstrating initial debugging.',
      },
    ],
    idealTemplate: `Hi [Lead/Mentor],

I'm currently working on [Task Name] and hit a roadblock regarding [Specific Issue].

Here is what I've investigated so far:
1. [Observed Behavior vs Expected Behavior]
2. [What I tried e.g. verified logs, tested edge case]

I see two potential approaches:
• Option A: [Description & Trade-off]
• Option B: [Description & Trade-off]

Would you recommend Option A, or is there an existing internal utility I should use?`,
    realWorldActionChecklist: [
      'Spend 30-45 min researching logs, documentation, and codebase.',
      'State what you tried, what failed, and what you hypothesize.',
      'Propose at least two actionable options.',
      'Keep the message structured and easy to scan asynchronously.',
    ],
    badgeUnlock: 'Proactive Problem Solver',
    estimatedMinutes: 3,
    completed: false,
  },
  {
    id: 'pb-7',
    category: 'Negotiation',
    title: 'How to negotiate an internship stipend or start date respectfully',
    scenario: 'You received an internship offer with a stipend of ₹15,000/month, but you have another competing verified offer at ₹25,000/month for a similar role.',
    context: 'Negotiation is a standard, respected business conversation when backed by competitive data, gratitude, and genuine interest in the company.',
    options: [
      {
        id: 'opt-7a',
        text: 'Tell them: "Your offer is too low compared to other companies. Match ₹25,000 or I will reject."',
        score: 'POOR',
        feedback: 'Confrontational and risks offer revocation.',
      },
      {
        id: 'opt-7b',
        text: 'Thank the hiring manager warmly, state your enthusiasm for their team and product, mention your other active offer in the ₹25k range, and ask if there is flexibility to adjust the compensation closer to market rate so you can sign immediately.',
        score: 'EXCELLENT',
        feedback: 'Balanced, respectful, leverages competitive signal, and gives them a clear win-win incentive to close you.',
      },
      {
        id: 'opt-7c',
        text: 'Accept immediately without asking, even though the compensation creates financial strain for relocation.',
        score: 'SUBOPTIMAL',
        feedback: 'It is always acceptable to professionally inquire about compensation flexibility.',
      },
    ],
    idealTemplate: `Dear [Hiring Manager / Recruiter Name],

Thank you so much for extending the offer to join [Company] as a [Role]! I am very excited about the opportunity to work on [Specific Team/Product].

I am reviewing the offer details. Given another active opportunity I am currently considering at [Comp Range], is there any flexibility in the monthly stipend toward [Target Amount]? [Company] remains my top choice, and bridging this gap would allow me to accept and sign immediately.

Thank you again for your consideration and support throughout the process!`,
    realWorldActionChecklist: [
      'Always start with genuine gratitude and enthusiasm.',
      'Anchor your request to competitive offers or verified market data.',
      'State that you are ready to sign immediately if they meet your number.',
      'Keep communication in writing or schedule a polite 5-min phone call.',
    ],
    badgeUnlock: 'Value Negotiator',
    estimatedMinutes: 4,
    completed: false,
  },
  {
    id: 'pb-8',
    category: 'Cold Outreach',
    title: 'How to reach out to college alumni working at target companies',
    scenario: 'You want to connect with an alumnus from your institute who graduated 3 years ago and is now an SDE-2 at Microsoft India.',
    context: 'Shared college alumni pride is one of the highest-converting networking avenues when approached with respect and shared identity.',
    options: [
      {
        id: 'opt-8a',
        text: 'Hello senior, I am also from your college. Please refer me to Microsoft.',
        score: 'POOR',
        feedback: 'Rushes to the ask without establishing rapport or demonstrating preparation.',
      },
      {
        id: 'opt-8b',
        text: 'Hi Rohan! As a fellow student at [College Name], I was inspired seeing your journey to Microsoft. I am preparing for SDE roles and focusing heavily on OS and Distributed Systems. If you ever have 5 minutes for asynchronous advice on what skills helped you most during your transition, I would be grateful for your insights!',
        score: 'EXCELLENT',
        feedback: 'Warm, respectful of alumni bond, focuses on learning from their journey, and keeps pressure low.',
      },
      {
        id: 'opt-8c',
        text: 'Hi, can you send me all the interview questions Microsoft asked you when you were hired?',
        score: 'POOR',
        feedback: 'Asks them to violate NDA and demonstrates shortcut-seeking behavior.',
      },
    ],
    idealTemplate: `Hi [Alum Name],

Greetings from a fellow [College Name] student! I came across your profile while researching [Company] and wanted to reach out.

Seeing your transition from our campus to [Company's] engineering team has been really inspiring. I'm currently in my [Year] year, preparing for [Target Role] with a focus on [Key Skill 1] and [Key Skill 2].

I'd love to follow your work here on LinkedIn. If you ever have a few minutes down the line, I'd value any key lessons you learned during your early career transition!

Wishing you continued success,
[Your Name]`,
    realWorldActionChecklist: [
      'Mention your shared college branch/year in the first sentence.',
      'Compliment a real milestone in their career.',
      'Keep the initial connection ask non-transactional.',
      'Engage with their public posts before asking for referrals.',
    ],
    badgeUnlock: 'Alumni Network Catalyst',
    estimatedMinutes: 4,
    completed: false,
  },
  {
    id: 'pb-9',
    category: 'Portfolio & Demos',
    title: 'How to write a high-signal GitHub README for a portfolio project',
    scenario: 'Recruiters and hiring managers spend 30 seconds scanning your GitHub repository. What should the top of your README contain?',
    context: 'Senior engineers look for architecture diagrams, live demo links, key technical decisions, setup instructions, and benchmark figures—not just default boilerplate.',
    options: [
      {
        id: 'opt-9a',
        text: 'Leave the default "This project was bootstrapped with Create React App. Run npm start to view."',
        score: 'POOR',
        feedback: 'Signals zero care for documentation and developer ergonomics.',
      },
      {
        id: 'opt-9b',
        text: 'Include a 1-sentence elevator pitch, prominent Live Demo & Loom Walkthrough links, Architecture Diagram, Key Engineering Decisions & Trade-offs table, and Benchmark stats (e.g. Lighthouse score, latency, test coverage).',
        score: 'EXCELLENT',
        feedback: 'World-class standard! Allows any reviewer to assess your engineering maturity in 15 seconds.',
      },
      {
        id: 'opt-9c',
        text: 'A 4,000-word essay detailing every single file in the repo without pictures or links.',
        score: 'SUBOPTIMAL',
        feedback: 'Too dense. Reviewers need quick visual hierarchy and interactive links.',
      },
    ],
    idealTemplate: `# [Project Name] 🚀
> [One-line summary explaining problem and user value]

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)]() [![Coverage](https://img.shields.io/badge/coverage-92%25-blue)]()

## 🔗 Quick Links
- **[Live Deployment](https://...)**
- **[2-Minute Video Walkthrough](https://...)**

## 🏗️ Architecture & Key Engineering Decisions
| Problem | Decision | Trade-off / Why |
|---|---|---|
| Latency under load | Redis cache layer | Sub-15ms reads at the cost of 60s cache TTL |
| Race conditions | Distributed lock with Redlock | Minor write latency penalty for zero double-writes |

## 🧪 Testing & Performance
- **Unit & Integration Tests**: 42 passing tests (Jest/Supertest)
- **Lighthouse**: 98 Performance / 100 Accessibility`,
    realWorldActionChecklist: [
      'Pin working live demo link at the very top.',
      'Include a clear ASCII or Mermaid architecture diagram.',
      'Add a table explaining why you chose specific libraries.',
      'Show test coverage badge and sample command to run tests.',
    ],
    badgeUnlock: 'Documentation Architect',
    estimatedMinutes: 4,
    completed: false,
  },
  {
    id: 'pb-10',
    category: 'Workplace Navigation',
    title: 'How to introduce yourself in 60 seconds (The Career Pitch)',
    scenario: 'At an employer networking mixer or the start of a hiring room interview, the recruiter asks: "Walk me through your background."',
    context: 'A great elevator pitch connects where you started, what hard problems you love solving, what you have built, and why this specific company excites you.',
    options: [
      {
        id: 'opt-10a',
        text: 'Start from your 10th grade marks, list your school hobbies, recite your college GPA, and list every programming language you heard of.',
        score: 'POOR',
        feedback: 'Irrelevant detail that loses the listener in the first 20 seconds.',
      },
      {
        id: 'opt-10b',
        text: 'Structure into: Present focus ("Final year CS student passionate about distributed frontend systems") → Proof of craft ("Recently built an AI placement engine with sub-second latency and won the FinEdge hackathon") → Alignment ("Excited about your team because of your recent micro-frontend migration").',
        score: 'EXCELLENT',
        feedback: 'Crisp, structured, compelling, and leaves an immediate hook for technical follow-up questions.',
      },
      {
        id: 'opt-10c',
        text: 'Say: "Everything is written in my resume so you can read it there."',
        score: 'POOR',
        feedback: 'Dismissive and fails the basic communication screening.',
      },
    ],
    idealTemplate: `"I'm [Name], a final-year CS student focused on [Core Domain e.g. scalable web platforms and API systems]. 

Over the past year, I've focused on building high-signal projects—most notably [Project Name], where I [Key Technical Achievement e.g. implemented optimistic UI and caching for 200+ active users]. I also regularly solve system design problems in my Career Pod.

I've followed [Company's] engineering blog on [Topic], and I'm really excited about your work on [Specific Product/Challenge]. I'd love to bring my strong foundations in [Skill 1 & 2] to your team."`,
    realWorldActionChecklist: [
      'Keep strictly between 45 and 60 seconds.',
      'Highlight 1 marquee project and 1 measurable result.',
      'Connect your experience directly to the specific company.',
      'Practice out loud with a timer.',
    ],
    badgeUnlock: 'Elevator Pitch Master',
    estimatedMinutes: 4,
    completed: false,
  },
];

export const sampleReferralRequests: ReferralRequest[] = [
  {
    id: 'req-1',
    mentorName: 'Aravind Swaminathan',
    mentorRole: 'Staff Frontend Engineer',
    mentorCompany: 'Razorpay',
    targetRole: 'Junior Frontend Developer',
    reason: 'Portfolio Review',
    status: 'FEEDBACK_RECEIVED',
    submittedAt: '2 days ago',
    message: 'Hello Aravind, I noticed your talk on Razorpay checkout optimizations. I built a React payment dashboard focusing on sub-100ms render speeds. Could you review my 2-min Loom and critique my state caching trade-off when you have a free moment?',
    attachedProof: ['AI Career Platform (React/Node)', '88% ATS Resume', 'Razorpay Checkout Challenge Entry'],
    feedbackNotes: 'Great component composition and memoization. Recommend decoupling your fetch hook into a dedicated service layer before referral submission.',
  },
  {
    id: 'req-2',
    mentorName: 'Pooja Narayanan',
    mentorRole: 'Senior SDE',
    mentorCompany: 'Swiggy',
    targetRole: 'Backend Engineer',
    reason: 'Referral Readiness Check',
    status: 'ACCEPTED',
    submittedAt: 'Yesterday',
    message: 'Hi Pooja, I am preparing for junior backend opportunities and completed the Smart Attendance System using OpenCV & Node.js backend. Would value your perspective on my database indexing strategy.',
    attachedProof: ['Smart Attendance System', 'Core CS Benchmark (85%)'],
  },
  {
    id: 'req-3',
    mentorName: 'Rohan Deshmukh',
    mentorRole: 'Senior SDE',
    mentorCompany: 'Microsoft India',
    targetRole: 'Software Engineer',
    reason: 'Technical Guidance',
    status: 'SENT',
    submittedAt: 'Today at 10:15 AM',
    message: 'Hi Rohan, as an alum preparing for SDE-1 interviews, I have been working on Tree & Graph problems and would love your advice on preparing for Azure platform team rounds.',
    attachedProof: ['185 LeetCode Solved', 'DSA Tree Mastery Badge'],
  },
];

export const sampleVerifiedProjects: VerifiedProject[] = [
  {
    id: 'proj-1',
    title: 'AI Career Operating System',
    description: 'Autonomous placement preparation engine with adaptive study paths, interactive mock interviews, and ATS intelligence.',
    technologies: ['React 18', 'TypeScript', 'Node.js', 'Express', 'Gemini API', 'PostgreSQL'],
    githubUrl: 'https://github.com/alex/careeros',
    liveUrl: 'https://careeros.demo',
    verifiedSkills: ['React', 'TypeScript', 'API Integration', 'LLM Agent Engineering'],
    mentorEndorsement: 'Verified by Aravind Swaminathan (Razorpay) — "Excellent state isolation and structured error handling."',
    architectureHighlight: 'Decoupled prompt pipelines with client-side fallback resilience and WebSocket streaming support.',
  },
  {
    id: 'proj-2',
    title: 'Smart Attendance Computer Vision Suite',
    description: 'Real-time multi-face recognition attendance tracking with sub-second verification and automated audit logs.',
    technologies: ['Python', 'OpenCV', 'FastAPI', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/alex/attendance',
    liveUrl: 'https://attendance-cv.demo',
    verifiedSkills: ['Python', 'OpenCV', 'Database Indexing', 'Docker'],
    mentorEndorsement: 'Verified by Pooja Narayanan (Swiggy) — "Clean data pipeline architecture and robust edge-case handling."',
    architectureHighlight: 'Optimized feature embedding extraction pipeline achieving 30 FPS inference on standard CPU hardware.',
  },
  {
    id: 'proj-3',
    title: 'Distributed In-Memory Task Queue',
    description: 'Lightweight priority queue supporting delayed tasks, dead-letter exchanges, and worker rebalancing.',
    technologies: ['Go', 'Redis', 'gRPC', 'Docker Compose'],
    githubUrl: 'https://github.com/alex/task-queue',
    verifiedSkills: ['Distributed Systems', 'Redis', 'Go', 'Concurrency'],
    architectureHighlight: 'Implemented atomic Lua scripts for zero race-condition task acquisitions across 10 concurrent worker nodes.',
  },
  {
    id: 'proj-4',
    title: 'Fintech Transaction Analytics Dashboard',
    description: 'High-throughput financial ledger visualizer with virtualized scrolling, CSV streaming export, and custom charts.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Recharts'],
    githubUrl: 'https://github.com/alex/fintech-viz',
    verifiedSkills: ['React', 'Data Visualization', 'Web Performance'],
    architectureHighlight: 'Custom canvas rendering layer allowing smooth 60fps scrubbing over 50,000 ledger records.',
  },
  {
    id: 'proj-5',
    title: 'Collaborative Markdown & Code Canvas',
    description: 'Multiplayer note taking and diagramming tool with conflict-free replicated data types (CRDTs).',
    technologies: ['TypeScript', 'Yjs', 'WebSockets', 'Tailwind'],
    githubUrl: 'https://github.com/alex/canvas-crdt',
    verifiedSkills: ['WebSockets', 'CRDTs', 'Frontend Architecture'],
    architectureHighlight: 'Peer-to-peer WebRTC fallback mesh reducing central signaling server bandwidth by 70%.',
  },
  {
    id: 'proj-6',
    title: 'SQL Query Performance & Index Analyzer',
    description: 'Developer CLI tool that parses PostgreSQL EXPLAIN outputs, highlights table scans, and recommends optimal compound indexes.',
    technologies: ['Node.js', 'PostgreSQL', 'TypeScript', 'CLI'],
    githubUrl: 'https://github.com/alex/pg-index-analyzer',
    verifiedSkills: ['SQL', 'PostgreSQL', 'Developer Tooling'],
    architectureHighlight: 'AST query parser detecting un-indexed foreign key joins and high-cost sequential scans automatically.',
  },
];
