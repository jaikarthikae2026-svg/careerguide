export type RoleTrack =
  | 'Junior Software Developer'
  | 'Data Analyst'
  | 'UI/UX Designer'
  | 'Product Management Intern';

export type SimulationPhase =
  | 'Days 1–30: Adapt'
  | 'Days 31–60: Contribute'
  | 'Days 61–90: Demonstrate Ownership';

export type ScenarioCategory =
  | 'First Day & Onboarding'
  | 'Communication'
  | 'Task Ownership'
  | 'Feedback'
  | 'Teamwork'
  | 'Meetings'
  | 'Mistakes & Problem-Solving'
  | 'Prioritization'
  | 'Remote & Hybrid Work';

export interface DecisionOption {
  id: string;
  title: string;
  actionText: string;
  consequenceSummary: string;
  skillDeltas: {
    skill: string;
    delta: number;
  }[];
  strengthFeedback: string;
  improvementFeedback: string;
  betterMessageTemplate: string;
  followUpAction: string;
  consequenceLevel: 'EXEMPLARY' | 'ACCEPTABLE_WITH_RISK' | 'SUBOPTIMAL';
}

export interface WorkplaceEmail {
  id: string;
  senderName: string;
  senderRole: string;
  senderAvatar: string;
  subject: string;
  timestamp: string;
  isUnread: boolean;
  preview: string;
  body: string;
  urgency: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface WorkplaceChatMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  senderRole: string;
  channel: string;
  timestamp: string;
  message: string;
  isDirectMessage?: boolean;
}

export interface WorkplaceTaskItem {
  id: string;
  key: string;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
  assignee: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  storyPoints: number;
  dueDate: string;
}

export interface WorkplaceMeetingEvent {
  id: string;
  title: string;
  time: string;
  durationMinutes: number;
  organizer: string;
  attendees: string[];
  locationOrLink: string;
  agenda: string;
  startsInMinutes: number;
}

export interface WorkplaceScenario {
  id: string;
  title: string;
  category: ScenarioCategory;
  phase: SimulationPhase;
  roleTrack: RoleTrack;
  companyName: string;
  simulatedDay: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  context: string;
  charactersInvolved: {
    name: string;
    role: string;
    avatar: string;
  }[];
  workplaceTools: {
    emails: WorkplaceEmail[];
    chatMessages: WorkplaceChatMessage[];
    tasks: WorkplaceTaskItem[];
    meetings: WorkplaceMeetingEvent[];
    projectBrief: string;
  };
  currentObjective: string;
  dilemmaDescription: string;
  options: DecisionOption[];
  isCompleted?: boolean;
  scoreEarned?: number;
}

export interface WorkplaceSkillScore {
  id: string;
  name: string;
  score: number;
  level: 'Mastered' | 'Proficient' | 'Developing' | 'Needs Practice';
  strongBehavior: string;
  riskBehavior: string;
  actionItem: string;
  linkedCareerOSFeature: string;
  pageTarget: string;
}

export interface PodRoleplaySession {
  id: string;
  title: string;
  scenarioTheme: string;
  participants: {
    name: string;
    avatar: string;
    assignedPersona: 'Employee' | 'Manager' | 'Client' | 'Observer';
  }[];
  rubricScores: {
    clarity: number;
    professionalism: number;
    ownership: number;
    nextSteps: number;
    proactiveTiming: number;
    tone: number;
  };
  peerFeedbackText: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'IN_PROGRESS';
}

export interface WorkReadyBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  criteria: string;
}

export interface WorkReadyReportData {
  overallReadinessScore: number;
  currentPhase: string;
  strongestBehaviors: string[];
  riskAreas: string[];
  recommendedRealWorldHabits: string[];
  firstWeekActions: string[];
  questionsToAskManager: string[];
  thirtyDayGoals: string[];
  sixtyDayGoals: string[];
  ninetyDayGoals: string[];
}

// -------------------------------------------------------------
// REALISTIC MOCK DATA FOR WORKREADY
// -------------------------------------------------------------

export const workplaceSkillsData: WorkplaceSkillScore[] = [
  {
    id: 'ws-comm',
    name: 'Clear Communication',
    score: 81,
    level: 'Proficient',
    strongBehavior: 'Writes structured updates with clear context and bullet points.',
    riskBehavior: 'Occasionally uses jargon when explaining blockers to product managers.',
    actionItem: 'Practise summarizing technical trade-offs for non-technical stakeholders.',
    linkedCareerOSFeature: 'Career Playbook (Communication Simulations)',
    pageTarget: 'Career Network',
  },
  {
    id: 'ws-owner',
    name: 'Task Ownership',
    score: 67,
    level: 'Developing',
    strongBehavior: 'Takes full responsibility when mistakes occur without blaming dependencies.',
    riskBehavior: 'Waits until 80% through the sprint before escalating scope creep.',
    actionItem: 'Notify managers as soon as an estimate changes by > 20%.',
    linkedCareerOSFeature: 'Career Roadmap (Sprint Execution Phase)',
    pageTarget: 'Career Roadmap',
  },
  {
    id: 'ws-prior',
    name: 'Task Prioritization',
    score: 58,
    level: 'Needs Practice',
    strongBehavior: 'Consistently focuses on high-quality code formatting and tests.',
    riskBehavior: 'Spends too much time on low-priority edge-case CSS rather than core API contracts.',
    actionItem: 'Confirm priority matrix (P0 critical vs P2 nice-to-have) during morning stand-ups.',
    linkedCareerOSFeature: 'Learning Hub (Engineering Productivity)',
    pageTarget: 'Learning Hub',
  },
  {
    id: 'ws-team',
    name: 'Teamwork & Collaboration',
    score: 76,
    level: 'Proficient',
    strongBehavior: 'Provides constructive peer PR reviews and helps unblock pod teammates.',
    riskBehavior: 'Hesitates to ask senior engineers for short architecture sanity checks.',
    actionItem: 'Schedule 10-min weekly async alignment syncs with peer developers.',
    linkedCareerOSFeature: 'Career Pods (Peer Review Hub)',
    pageTarget: 'Career Network',
  },
  {
    id: 'ws-feed',
    name: 'Feedback Response',
    score: 72,
    level: 'Proficient',
    strongBehavior: 'Receives critical code review comments gracefully and implements changes.',
    riskBehavior: 'Sometimes does not ask for clarifying examples when feedback is abstract.',
    actionItem: 'Ask "Could you share an example of what ideal execution looks like here?"',
    linkedCareerOSFeature: 'Career Playbook (Code Review Navigation)',
    pageTarget: 'Career Network',
  },
  {
    id: 'ws-prob',
    name: 'Problem-Solving & Escalation',
    score: 79,
    level: 'Proficient',
    strongBehavior: 'Investigates logs and debugs locally before pinging seniors.',
    riskBehavior: 'Stays stuck for > 2 hours when third-party documentation is incomplete.',
    actionItem: 'Apply the 45-minute rule: debug, hypothesize two options, then ask.',
    linkedCareerOSFeature: 'AI Career Mentor',
    pageTarget: 'Command Center',
  },
  {
    id: 'ws-prof',
    name: 'Professionalism & Tone',
    score: 84,
    level: 'Mastered',
    strongBehavior: 'Maintains calm, empathetic, and solution-focused tone in Slack and email.',
    riskBehavior: 'None detected.',
    actionItem: 'Continue mentoring peers on professional communication tone.',
    linkedCareerOSFeature: 'Career Passport',
    pageTarget: 'Career Passport',
  },
  {
    id: 'ws-adapt',
    name: 'Adaptability & Agility',
    score: 75,
    level: 'Proficient',
    strongBehavior: 'Pivots smoothly when sprint priorities shift due to customer urgency.',
    riskBehavior: 'Needs minor time to re-estimate tasks after requirement changes.',
    actionItem: 'Create modular task breakdowns to absorb scope adjustments easily.',
    linkedCareerOSFeature: 'Daily Mission',
    pageTarget: 'Daily Mission',
  },
  {
    id: 'ws-rel',
    name: 'Reliability & Follow-Through',
    score: 80,
    level: 'Proficient',
    strongBehavior: 'Delivers on agreed sprint commitments 85% of the time.',
    riskBehavior: 'Needs reminders to document post-mortem learnings.',
    actionItem: 'Write a 3-bullet takeaway after completing complex bug fixes.',
    linkedCareerOSFeature: 'Skill Tree',
    pageTarget: 'Skill Tree',
  },
  {
    id: 'ws-meet',
    name: 'Meeting Effectiveness',
    score: 70,
    level: 'Developing',
    strongBehavior: 'Arrives on time with bullet points prepared for daily stand-up.',
    riskBehavior: 'Does not speak up with clarifying questions during large group meetings.',
    actionItem: 'Prepare 1 thoughtful question before joining sprint retrospectives.',
    linkedCareerOSFeature: 'Mock Arena (Communication Round)',
    pageTarget: 'Mock Arena',
  },
];

export const workplaceScenariosData: WorkplaceScenario[] = [
  {
    id: 'sc-1',
    title: 'Update your manager before the deadline is at risk',
    category: 'Task Ownership',
    phase: 'Days 1–30: Adapt',
    roleTrack: 'Junior Software Developer',
    companyName: 'NovaLabs Technologies',
    simulatedDay: 12,
    difficulty: 'Intermediate',
    durationMinutes: 8,
    context:
      'You are building the OAuth payment integration for NovaLabs. You estimated 2 days, but hit unexpected undocumented token expiration edge cases. Your manager expects the PR by 4:00 PM today. It is currently 1:30 PM and you estimate another 4 hours of work.',
    charactersInvolved: [
      { name: 'Karthik Rao', role: 'Engineering Manager', avatar: 'KR' },
      { name: 'Sameer Sen', role: 'Lead Backend Engineer', avatar: 'SS' },
      { name: 'Neha Gupta', role: 'Product Manager', avatar: 'NG' },
    ],
    workplaceTools: {
      emails: [
        {
          id: 'em-1',
          senderName: 'Karthik Rao',
          senderRole: 'Engineering Manager',
          senderAvatar: 'KR',
          subject: 'Sprint 14 Demo Readiness: OAuth Integration status',
          timestamp: '11:15 AM',
          isUnread: true,
          urgency: 'HIGH',
          preview: 'Hi Divya, just checking in on the payment PR status for today’s 4 PM staging rollout...',
          body: `Hi Divya,\n\nJust checking in on the OAuth payment integration PR. We have our staging rollout scheduled for 4:30 PM so the QA team can test the checkout flow.\n\nAre we on track for the 4:00 PM PR merge?\n\nBest,\nKarthik`,
        },
        {
          id: 'em-2',
          senderName: 'Neha Gupta',
          senderRole: 'Product Manager',
          senderAvatar: 'NG',
          subject: 'Sprint Goals & Merchant Onboarding Milestone',
          timestamp: '9:00 AM',
          isUnread: false,
          urgency: 'MEDIUM',
          preview: 'Team, merchant onboarding milestone is tied to this sprint’s payment gateway release...',
          body: `Team,\n\nMerchant onboarding kickoff is next Tuesday. Getting the payment flow to QA today is critical for our deadline.\n\nThanks,\nNeha`,
        },
      ],
      chatMessages: [
        {
          id: 'cm-1',
          senderName: 'Sameer Sen',
          senderAvatar: 'SS',
          senderRole: 'Lead Backend Engineer',
          channel: '#dev-backend',
          timestamp: '1:10 PM',
          message: 'FYI: The third-party auth service has rate limiting on sandbox tokens if refreshed more than 10 times in 1 min.',
        },
        {
          id: 'cm-2',
          senderName: 'Karthik Rao',
          senderAvatar: 'KR',
          senderRole: 'Engineering Manager',
          channel: 'Direct Message',
          timestamp: '1:25 PM',
          isDirectMessage: true,
          message: 'Hey Divya, ping me if you need any unblocking before 4 PM.',
        },
      ],
      tasks: [
        { id: 't-101', key: 'NOVA-342', title: 'Implement OAuth Token Refresh & Session Storage', status: 'IN_PROGRESS', assignee: 'Divya (You)', priority: 'CRITICAL', storyPoints: 5, dueDate: 'Today, 4:00 PM' },
        { id: 't-102', key: 'NOVA-345', title: 'Add Unit Tests for Payment Webhook Signature', status: 'TODO', assignee: 'Divya (You)', priority: 'HIGH', storyPoints: 3, dueDate: 'Tomorrow, 12:00 PM' },
      ],
      meetings: [
        {
          id: 'mtg-1',
          title: 'Daily Engineering Stand-up',
          time: '10:00 AM - 10:15 AM',
          durationMinutes: 15,
          organizer: 'Karthik Rao',
          attendees: ['Karthik Rao', 'Divya', 'Sameer Sen', 'Neha Gupta'],
          locationOrLink: 'Google Meet #nova-standup',
          agenda: 'Sprint 14 daily blockers and commits.',
          startsInMinutes: 0,
        },
        {
          id: 'mtg-2',
          title: 'Staging Release Sync',
          time: '4:30 PM - 5:00 PM',
          durationMinutes: 30,
          organizer: 'Neha Gupta',
          attendees: ['Karthik Rao', 'Neha Gupta', 'QA Team'],
          locationOrLink: 'Room 3B / Zoom',
          agenda: 'Review staging build and sign off for QA testing.',
          startsInMinutes: 180,
        },
      ],
      projectBrief: 'NovaLabs Checkout OAuth Gateway: Connect user frontend session to third-party merchant auth with automatic token silent-refresh.',
    },
    currentObjective: 'Communicate the unexpected token refresh delay to Karthik before 2:00 PM, propose two actionable mitigation paths, and agree on sprint priorities.',
    dilemmaDescription: 'Do you stay silent and code furiously hoping to finish by 4 PM, notify your manager with clear trade-offs, or ask a teammate to do your work?',
    options: [
      {
        id: 'opt-1',
        title: 'Option A: Stay silent, skip unit tests, and push whatever code is ready at 3:55 PM',
        actionText: 'Keep head down and push code right before deadline without mentioning the risk.',
        consequenceSummary: 'The PR fails in CI due to missing tests, QA is blocked at 4:30 PM, and Karthik is caught off guard during the release sync.',
        skillDeltas: [
          { skill: 'Clear Communication', delta: -15 },
          { skill: 'Task Ownership', delta: -12 },
          { skill: 'Reliability', delta: -10 },
        ],
        strengthFeedback: 'You showed determination to hit the deadline.',
        improvementFeedback: 'Staying silent when deadlines are at risk destroys team trust. Surprises right at deadline time are the #1 frustration for engineering managers.',
        betterMessageTemplate: `Hi Karthik,\n\nQuick heads up on NOVA-342 (OAuth integration): I’ve implemented the core token exchange, but hit an undocumented token expiration edge case during error handling. I estimate an additional 3-4 hours to complete it safely.\n\nTwo options to keep staging moving:\n1. Deliver the working UI and standard auth flow for 4:30 PM QA staging, and deploy the silent-refresh edge case patch tomorrow morning.\n2. I pair with Sameer for 30 minutes to unblock the refresh logic if we want full coverage today.\n\nWhich direction do you prefer?`,
        followUpAction: 'Send proactive delay warning immediately with concrete options.',
        consequenceLevel: 'SUBOPTIMAL',
      },
      {
        id: 'opt-2',
        title: 'Option B: Proactively message manager at 1:30 PM with root cause, time estimate, and 2 mitigation options',
        actionText: 'Send structured DM to Karthik explaining the token issue, new 4-hour estimate, and proposal to deliver core UI for staging first.',
        consequenceSummary: 'Karthik thanks you for the early heads-up, approves Option 1 (staging core UI first), and pairs you with Sameer for 20 minutes to resolve the token edge case.',
        skillDeltas: [
          { skill: 'Clear Communication', delta: +15 },
          { skill: 'Task Ownership', delta: +18 },
          { skill: 'Prioritization', delta: +12 },
          { skill: 'Problem-Solving', delta: +10 },
        ],
        strengthFeedback: 'Exemplary workplace judgment! You notified early (3 hours before deadline), explained the exact technical reason, and provided two proactive solution paths.',
        improvementFeedback: 'Keep maintaining this structured update cadence across all deliverables.',
        betterMessageTemplate: `Hi Karthik,\n\nQuick heads up on NOVA-342 (OAuth integration): I’ve completed the core token exchange, but hit an undocumented token expiration edge case during error handling. I estimate an additional 3-4 hours to complete it safely.\n\nTwo options to keep staging moving:\n1. Deliver the working UI and standard auth flow for 4:30 PM QA staging, and deploy the silent-refresh edge case patch tomorrow morning.\n2. I pair with Sameer for 30 minutes to unblock the refresh logic if we want full coverage today.\n\nWhich direction do you prefer?`,
        followUpAction: 'Update Jira story ticket with technical notes and notify QA channel.',
        consequenceLevel: 'EXEMPLARY',
      },
      {
        id: 'opt-3',
        title: 'Option C: Post in #dev-backend asking Sameer to write the token refresh code for you',
        actionText: 'Ask your senior teammate to take over the hard part of your task because you are blocked.',
        consequenceSummary: 'Sameer is in the middle of a critical database migration and feels disrupted. You didn’t diagnose the issue or propose hypotheses first.',
        skillDeltas: [
          { skill: 'Task Ownership', delta: -8 },
          { skill: 'Teamwork', delta: -5 },
          { skill: 'Problem-Solving', delta: -6 },
        ],
        strengthFeedback: 'You recognized you needed help.',
        improvementFeedback: 'Never dump your assigned task on teammates. Diagnose first, summarize what you investigated, and ask for a specific 15-minute guidance session instead of handing off the work.',
        betterMessageTemplate: `Hi Sameer, I noticed your note on the sandbox rate limit. I’ve tested the token renewal header and suspect the clock skew is invalidating the JWT. If you have 10 minutes after standup, could I show you my 4-line refresh interceptor for a quick sanity check?`,
        followUpAction: 'Prepare minimal reproducible example before asking senior engineer.',
        consequenceLevel: 'ACCEPTABLE_WITH_RISK',
      },
    ],
    isCompleted: true,
    scoreEarned: 88,
  },
  {
    id: 'sc-2',
    title: 'Respond constructively to critical pull request review comments',
    category: 'Feedback',
    phase: 'Days 1–30: Adapt',
    roleTrack: 'Junior Software Developer',
    companyName: 'FinPulse Systems',
    simulatedDay: 18,
    difficulty: 'Intermediate',
    durationMinutes: 7,
    context:
      'You submitted your first major pull request for the transaction filter component. Lead engineer Ananya left 6 review comments, including: "This component has too much nested state and re-renders 12 times per keystroke. Please refactor using useMemo/useCallback and separate the query logic into a custom hook."',
    charactersInvolved: [
      { name: 'Ananya Sharma', role: 'Staff Frontend Engineer', avatar: 'AS' },
      { name: 'Rohan Mehra', role: 'Senior SDE', avatar: 'RM' },
    ],
    workplaceTools: {
      emails: [],
      chatMessages: [
        {
          id: 'cm-201',
          senderName: 'GitHub Bot',
          senderAvatar: 'GH',
          senderRole: 'CI/CD Bot',
          channel: '#pr-notifications',
          timestamp: '2:15 PM',
          message: 'PR #108 (Transaction Filter UI) has 6 new review comments from @ananya.',
        },
      ],
      tasks: [
        { id: 't-201', key: 'FP-88', title: 'Transaction Ledger Filter Component', status: 'IN_REVIEW', assignee: 'Divya', priority: 'HIGH', storyPoints: 5, dueDate: 'Tomorrow' },
      ],
      meetings: [],
      projectBrief: 'FinPulse Ledger: Real-time filtering over 20,000 transaction records with sub-50ms render times.',
    },
    currentObjective: 'Address code review comments constructively, clarify any ambiguities without being defensive, and update the PR.',
    dilemmaDescription: 'How do you respond to senior feedback that asks for an architectural refactor?',
    options: [
      {
        id: 'opt-21',
        title: 'Option A: Reply that it passed all local tests and ask if we can merge now and optimize later in a backlog ticket',
        actionText: 'Push back on the performance refactor to avoid extra work.',
        consequenceSummary: 'Ananya blocks the PR. Senior engineers perceive you as defensive and uninterested in code quality standards.',
        skillDeltas: [
          { skill: 'Feedback Response', delta: -14 },
          { skill: 'Professionalism', delta: -10 },
          { skill: 'Teamwork', delta: -8 },
        ],
        strengthFeedback: 'You cared about shipping velocity.',
        improvementFeedback: 'Code review comments from senior engineers are free masterclasses. Defensiveness flags low coachability.',
        betterMessageTemplate: `Hi Ananya, thanks for the thorough review! I see how the unmemoized filter predicate was causing render cascades. I have extracted the query parsing into 'useTransactionFilter' and memoized the filtered dataset in commit #4f2a. Could you take a quick look to verify this matches what you had in mind?`,
        followUpAction: 'Refactor code and attach before/after React DevTools profiler screenshots.',
        consequenceLevel: 'SUBOPTIMAL',
      },
      {
        id: 'opt-22',
        title: 'Option B: Thank the reviewer, break down the refactor into a custom hook, and request verification',
        actionText: 'Acknowledge the performance concern, refactor the code cleanly, and reply with specific commit references.',
        consequenceSummary: 'Ananya approves the PR within 30 minutes, commends your quick learning on React performance, and shares the pattern with other juniors.',
        skillDeltas: [
          { skill: 'Feedback Response', delta: +18 },
          { skill: 'Clear Communication', delta: +12 },
          { skill: 'Problem-Solving', delta: +14 },
          { skill: 'Professionalism', delta: +15 },
        ],
        strengthFeedback: 'Outstanding coachability and professionalism! You separated ego from code quality and verified the solution.',
        improvementFeedback: 'Keep adopting team architectural conventions as you build future features.',
        betterMessageTemplate: `Hi Ananya, thanks for the thorough review! I see how the unmemoized filter predicate was causing render cascades. I have extracted the query parsing into 'useTransactionFilter' and memoized the filtered dataset in commit #4f2a. Could you take a quick look to verify this matches what you had in mind?`,
        followUpAction: 'Add benchmark note in PR summary showing 70% reduction in re-renders.',
        consequenceLevel: 'EXEMPLARY',
      },
    ],
    isCompleted: true,
    scoreEarned: 92,
  },
  {
    id: 'sc-3',
    title: 'Give a crisp 90-second update in daily stand-up',
    category: 'Meetings',
    phase: 'Days 1–30: Adapt',
    roleTrack: 'Junior Software Developer',
    companyName: 'CloudScale Networks',
    simulatedDay: 5,
    difficulty: 'Beginner',
    durationMinutes: 6,
    context:
      'It is your first week in daily stand-up with 8 engineers, the tech lead, and the engineering director. Your turn comes up: "Divya, how are things going with the setup and your first ticket?"',
    charactersInvolved: [
      { name: 'Vikram Seth', role: 'Tech Lead', avatar: 'VS' },
      { name: 'Priya Iyer', role: 'Engineering Director', avatar: 'PI' },
    ],
    workplaceTools: {
      emails: [],
      chatMessages: [],
      tasks: [
        { id: 't-301', key: 'CS-12', title: 'Local Docker Environment Setup & Hello World API', status: 'DONE', assignee: 'Divya', priority: 'MEDIUM', storyPoints: 2, dueDate: 'Today' },
        { id: 't-302', key: 'CS-18', title: 'Fix User Profile Avatar Fallback Bug', status: 'IN_PROGRESS', assignee: 'Divya', priority: 'MEDIUM', storyPoints: 3, dueDate: 'In 2 days' },
      ],
      meetings: [
        {
          id: 'mtg-301',
          title: 'Daily Stand-up #cloud-core',
          time: '9:30 AM - 9:45 AM',
          durationMinutes: 15,
          organizer: 'Vikram Seth',
          attendees: ['Vikram Seth', 'Priya Iyer', 'Divya', 'Team (6)'],
          locationOrLink: 'Zoom Room #cloud-standup',
          agenda: '1. What I did yesterday 2. What I will do today 3. Blockers.',
          startsInMinutes: 2,
        },
      ],
      projectBrief: 'CloudScale Core: Microservices cluster running Docker and Kubernetes.',
    },
    currentObjective: 'Deliver a structured 3-part stand-up update (Yesterday, Today, Blockers) under 90 seconds without rambling.',
    dilemmaDescription: 'Do you tell a long story about every terminal command that failed, or give a crisp executive summary?',
    options: [
      {
        id: 'opt-31',
        title: 'Option A: Structured 3-Part Standup Format (Yesterday, Today, Blockers)',
        actionText: 'State: Yesterday completed Docker setup & CS-12. Today working on CS-18 avatar fallback bug. Blocker: Need DB test seed credentials from DevOps.',
        consequenceSummary: 'Vikram approves immediately, DevOps engineer in the meeting drops credentials in chat, and stand-up finishes on time.',
        skillDeltas: [
          { skill: 'Meeting Effectiveness', delta: +16 },
          { skill: 'Clear Communication', delta: +14 },
          { skill: 'Professionalism', delta: +10 },
        ],
        strengthFeedback: 'Crisp, structured, and respected everyone’s time. The blocker was actionable and resolved on the spot.',
        improvementFeedback: 'Maintain this exact format for all stand-up updates.',
        betterMessageTemplate: `"Yesterday: Completed local Docker setup and resolved CS-12 test endpoint.\nToday: Working on CS-18 avatar fallback bug; aim to open PR by 3 PM.\nBlockers: Need test DB credentials for the staging replica (pinged #devops)."`,
        followUpAction: 'Update Jira board status to IN_PROGRESS.',
        consequenceLevel: 'EXEMPLARY',
      },
      {
        id: 'opt-32',
        title: 'Option B: Spend 4 minutes recounting every error message you saw while installing Docker',
        actionText: 'Describe every file you edited, every StackOverflow post you read, and how long your laptop took to boot.',
        consequenceSummary: 'Director Priya checks her watch, Vikram gently interrupts to keep the meeting on schedule, and other engineers lose focus.',
        skillDeltas: [
          { skill: 'Meeting Effectiveness', delta: -14 },
          { skill: 'Clear Communication', delta: -10 },
        ],
        strengthFeedback: 'You were thorough about your effort.',
        improvementFeedback: 'Stand-up is an operational sync, not a debugging session. Focus on outcomes and blockers; take technical deep-dives to a separate thread.',
        betterMessageTemplate: `"Yesterday: Completed local Docker setup and resolved CS-12 test endpoint.\nToday: Working on CS-18 avatar fallback bug; aim to open PR by 3 PM.\nBlockers: Need test DB credentials for the staging replica (pinged #devops)."`,
        followUpAction: 'Practice writing down 3 bullet points before standup starts.',
        consequenceLevel: 'SUBOPTIMAL',
      },
    ],
    isCompleted: true,
    scoreEarned: 95,
  },
  {
    id: 'sc-4',
    title: 'Prioritize conflicting requests from Product and Engineering Leads',
    category: 'Prioritization',
    phase: 'Days 31–60: Contribute',
    roleTrack: 'Junior Software Developer',
    companyName: 'NovaLabs Technologies',
    simulatedDay: 42,
    difficulty: 'Advanced',
    durationMinutes: 9,
    context:
      'Product Manager Neha asks you directly on Slack to add a "Download CSV" button on the customer dashboard by 3 PM for an enterprise demo. Meanwhile, Tech Lead Sameer assigned you to patch a memory leak in the WebSocket connection before the 4 PM release.',
    charactersInvolved: [
      { name: 'Neha Gupta', role: 'Product Manager', avatar: 'NG' },
      { name: 'Sameer Sen', role: 'Lead Backend Engineer', avatar: 'SS' },
      { name: 'Karthik Rao', role: 'Engineering Manager', avatar: 'KR' },
    ],
    workplaceTools: {
      emails: [],
      chatMessages: [
        {
          id: 'cm-401',
          senderName: 'Neha Gupta',
          senderAvatar: 'NG',
          senderRole: 'Product Manager',
          channel: 'Direct Message',
          timestamp: '11:45 AM',
          message: 'Hey Divya! Huge favor: Can you add a quick CSV download button to the analytics table? I have a live demo with Acme Corp at 3:30 PM!',
        },
        {
          id: 'cm-402',
          senderName: 'Sameer Sen',
          senderAvatar: 'SS',
          senderRole: 'Lead Backend Engineer',
          channel: 'Direct Message',
          timestamp: '11:50 AM',
          message: 'Divya, please keep 100% focus on the WebSocket memory leak fix NOVA-510. It’s blocking our sprint release cutoff at 4 PM.',
        },
      ],
      tasks: [
        { id: 't-401', key: 'NOVA-510', title: 'Fix WebSocket Memory Leak in Event Bus', status: 'IN_PROGRESS', assignee: 'Divya', priority: 'CRITICAL', storyPoints: 5, dueDate: 'Today, 4:00 PM' },
        { id: 't-402', key: 'NOVA-525', title: 'CSV Export Button for Analytics Table', status: 'TODO', assignee: 'Unassigned', priority: 'HIGH', storyPoints: 2, dueDate: 'Today, 3:00 PM' },
      ],
      meetings: [],
      projectBrief: 'NovaLabs Event Engine: High-reliability dashboard used by enterprise clients.',
    },
    currentObjective: 'Align conflicting stakeholder priorities openly without saying a blunt "no" or silently overcommitting and dropping both.',
    dilemmaDescription: 'Do you say yes to both and burn out, ignore Product, or bring the leads into a transparent 3-way alignment?',
    options: [
      {
        id: 'opt-41',
        title: 'Option A: Say "Yes" to Neha and try to finish both the CSV export and WebSocket leak in 3 hours',
        actionText: 'Attempt to juggle both urgent tasks simultaneously without notifying Sameer or Karthik.',
        consequenceSummary: 'You rush both tasks. The CSV export exports corrupted date columns during the live demo, and you miss the WebSocket release cutoff.',
        skillDeltas: [
          { skill: 'Task Ownership', delta: -12 },
          { skill: 'Prioritization', delta: -15 },
          { skill: 'Reliability', delta: -14 },
        ],
        strengthFeedback: 'You wanted to be helpful to the product team.',
        improvementFeedback: 'Saying yes to everything is the fastest path to missing critical commitments. Real professionals manage trade-offs transparently.',
        betterMessageTemplate: `Hi Neha,\n\nI understand the demo importance for Acme Corp! Right now I am on the P0 WebSocket release blocker (NOVA-510) due at 4 PM per engineering plan.\n\nTo ensure your demo is covered:\n1. I can provide a manual CSV export from staging database for your 3:30 PM demo data.\n2. Or if you need the UI button live, could you align with Karthik/Sameer to temporarily reassign the WebSocket patch?\n\nHappy to execute whichever path you and Karthik prioritize!`,
        followUpAction: 'Create a 3-way Slack thread with Neha and Karthik to confirm priority.',
        consequenceLevel: 'SUBOPTIMAL',
      },
      {
        id: 'opt-42',
        title: 'Option B: Acknowledge demo urgency, state current P0 commitment, and offer a viable alternative',
        actionText: 'Explain the P0 WebSocket release constraint to Neha, offer manual demo data, and loop in Karthik for priority sign-off.',
        consequenceSummary: 'Neha appreciates the manual demo CSV export for her client meeting. Karthik ensures the WebSocket patch is completed on time without team friction.',
        skillDeltas: [
          { skill: 'Prioritization', delta: +18 },
          { skill: 'Clear Communication', delta: +15 },
          { skill: 'Problem-Solving', delta: +16 },
          { skill: 'Professionalism', delta: +14 },
        ],
        strengthFeedback: 'Masterful stakeholder navigation! You protected the core engineering release while solving the customer demo requirement.',
        improvementFeedback: 'Continue offering pragmatic alternatives when conflicting priorities arise.',
        betterMessageTemplate: `Hi Neha,\n\nI understand the demo importance for Acme Corp! Right now I am on the P0 WebSocket release blocker (NOVA-510) due at 4 PM per engineering plan.\n\nTo ensure your demo is covered:\n1. I can provide a manual CSV export from staging database for your 3:30 PM demo data.\n2. Or if you need the UI button live, could you align with Karthik/Sameer to temporarily reassign the WebSocket patch?\n\nHappy to execute whichever path you and Karthik prioritize!`,
        followUpAction: 'Generate manual CSV sample and hand off to Neha by 2:30 PM.',
        consequenceLevel: 'EXEMPLARY',
      },
    ],
    isCompleted: false,
  },
  {
    id: 'sc-5',
    title: 'Handle a production bug in code you deployed yesterday',
    category: 'Mistakes & Problem-Solving',
    phase: 'Days 31–60: Contribute',
    roleTrack: 'Junior Software Developer',
    companyName: 'FinPulse Systems',
    simulatedDay: 54,
    difficulty: 'Advanced',
    durationMinutes: 9,
    context:
      'At 10:15 AM, Sentry alerts spike. A null pointer exception in your user currency formatting utility is causing the mobile checkout screen to display blank totals for international users.',
    charactersInvolved: [
      { name: 'Karthik Rao', role: 'Engineering Manager', avatar: 'KR' },
      { name: 'DevOps OnCall Bot', role: 'Alert System', avatar: 'OB' },
    ],
    workplaceTools: {
      emails: [],
      chatMessages: [
        {
          id: 'cm-501',
          senderName: 'OnCall Sentry Bot',
          senderAvatar: 'OB',
          senderRole: 'Alert Bot',
          channel: '#alerts-prod',
          timestamp: '10:14 AM',
          message: '🚨 CRITICAL: 142 NullPointerExceptions in CurrencyFormatter.ts (Checkout Flow).',
        },
      ],
      tasks: [
        { id: 't-501', key: 'FP-911', title: 'HOTFIX: CurrencyFormatter fallback for non-INR symbols', status: 'TODO', assignee: 'Divya', priority: 'CRITICAL', storyPoints: 2, dueDate: 'NOW' },
      ],
      meetings: [],
      projectBrief: 'FinPulse International Payments Engine: multi-currency support for INR, USD, EUR, SGD.',
    },
    currentObjective: 'Acknowledge ownership, rollback or deploy safe hotfix with fallback, and write a 3-point post-mortem prevention plan.',
    dilemmaDescription: 'Do you blame QA for not catching it, or take immediate ownership, roll out a hotfix, and document prevention tests?',
    options: [
      {
        id: 'opt-51',
        title: 'Option A: Post in #alerts-prod: "I see the issue. Reverting commit #81a now while testing hotfix with optional chaining."',
        actionText: 'Take immediate responsibility, trigger rollback to stop bleeding, deploy verified hotfix, and add regression test.',
        consequenceSummary: 'Production downtime is limited to 6 minutes. Karthik and leadership praise your calm, high-ownership handling of a stressful incident.',
        skillDeltas: [
          { skill: 'Problem-Solving', delta: +18 },
          { skill: 'Task Ownership', delta: +20 },
          { skill: 'Reliability', delta: +15 },
          { skill: 'Professionalism', delta: +14 },
        ],
        strengthFeedback: 'Gold standard incident management! You stopped the customer impact first, took zero-defensiveness ownership, and added automated regression tests.',
        improvementFeedback: 'Ensure currency edge cases are included in your standard pull request test checklist.',
        betterMessageTemplate: `"Incident Update: Root cause was missing fallback in CurrencyFormatter for non-standard ISO currency codes.\nAction taken: Reverted commit to stabilize prod; hotfix PR #142 opened with optional chaining and 8 unit test cases covering all supported currencies.\nPrevention: Added linter rule requiring default currency fallback."`,
        followUpAction: 'Submit post-mortem summary in team documentation workspace.',
        consequenceLevel: 'EXEMPLARY',
      },
    ],
    isCompleted: false,
  },
  {
    id: 'sc-6',
    title: 'Communicate effectively in an asynchronous remote team',
    category: 'Remote & Hybrid Work',
    phase: 'Days 1–30: Adapt',
    roleTrack: 'Junior Software Developer',
    companyName: 'CloudScale Networks',
    simulatedDay: 22,
    difficulty: 'Intermediate',
    durationMinutes: 7,
    context:
      'You work remotely from Bengaluru. Your tech lead is in London (4.5 hours behind) and product manager is in Singapore (2.5 hours ahead). You need design asset approvals to finish your user dashboard screen before you sign off for the day.',
    charactersInvolved: [
      { name: 'Sarah Jenkins', role: 'Design Lead (London)', avatar: 'SJ' },
      { name: 'Chen Wei', role: 'Product Lead (Singapore)', avatar: 'CW' },
    ],
    workplaceTools: {
      emails: [],
      chatMessages: [],
      tasks: [],
      meetings: [],
      projectBrief: 'CloudScale Global Dashboard: Multi-region cloud performance explorer.',
    },
    currentObjective: 'Leave an asynchronous handover message with Loom video link, explicit decision options, and fallback default so work continues overnight.',
    dilemmaDescription: 'How do you keep cross-timezone work moving without blocking yourself or waking up teammates?',
    options: [
      {
        id: 'opt-61',
        title: 'Option A: Write an asynchronous handover message with Loom video, 2 options, and a safe default path',
        actionText: 'Post a clear end-of-day handover: "Here is what is completed, here are the 2 design options with a 90s Loom. If I don’t hear back by 10 AM SGT, I will proceed with Option A."',
        consequenceSummary: 'Chen Wei reviews the Loom in Singapore morning, confirms Option A, and your PR is ready for testing with zero timezone delays.',
        skillDeltas: [
          { skill: 'Clear Communication', delta: +16 },
          { skill: 'Adaptability', delta: +15 },
          { skill: 'Task Ownership', delta: +14 },
        ],
        strengthFeedback: 'Exceptional asynchronous remote etiquette! Providing a safe default decision keeps projects moving across time zones.',
        improvementFeedback: 'Keep leveraging short video walk-throughs for visual reviews.',
        betterMessageTemplate: `Hi Sarah & Chen,\n\nEnd-of-day async update on CS-88 (Dashboard UI):\n• Completed: Metric card grid & responsive sidebar.\n• Decision needed: For empty chart states, do we show skeleton loaders (Option A) or illustration cards (Option B)?\n• 90-sec Loom walkthrough: [loom-link]\n• Default path: To keep sprint on track, I'll proceed with Option A (skeleton) tomorrow at 9:30 AM IST unless you prefer Option B.\n\nHave a great evening!`,
        followUpAction: 'Tag PR with [Async Review] label and pin Loom link in description.',
        consequenceLevel: 'EXEMPLARY',
      },
    ],
    isCompleted: false,
  },
  {
    id: 'sc-7',
    title: 'Present your completed feature to cross-functional stakeholders in Sprint Review',
    category: 'Meetings',
    phase: 'Days 61–90: Demonstrate Ownership',
    roleTrack: 'Junior Software Developer',
    companyName: 'NovaLabs Technologies',
    simulatedDay: 75,
    difficulty: 'Advanced',
    durationMinutes: 8,
    context:
      'In Sprint 18 Review, you are presenting the newly completed Customer Analytics Dashboard to 25 attendees, including the VP of Product, Sales Lead, and Customer Success Manager.',
    charactersInvolved: [
      { name: 'Vikram Patel', role: 'VP of Product', avatar: 'VP' },
      { name: 'Anita Roy', role: 'Customer Success Lead', avatar: 'AR' },
    ],
    workplaceTools: {
      emails: [],
      chatMessages: [],
      tasks: [],
      meetings: [],
      projectBrief: 'NovaLabs Enterprise Analytics: Live revenue metrics, churn indicators, and CSV streaming.',
    },
    currentObjective: 'Structure a 3-minute demo around User Value → Live Walkthrough → Architectural Highlights → Q&A.',
    dilemmaDescription: 'How do you demo software so non-technical and technical stakeholders both understand the impact?',
    options: [
      {
        id: 'opt-71',
        title: 'Option A: Structure demo around Customer Value first, then live 2-min workflow, then metric impact',
        actionText: 'Open with the customer problem solved, run smooth live demo, highlight sub-100ms render speed, and invite questions.',
        consequenceSummary: 'VP of Product praises the clarity of the presentation and Sales Lead asks for the recording to share with enterprise prospects.',
        skillDeltas: [
          { skill: 'Meeting Effectiveness', delta: +18 },
          { skill: 'Clear Communication', delta: +18 },
          { skill: 'Professionalism', delta: +15 },
        ],
        strengthFeedback: 'Masterful presentation structure! You framed code in terms of customer business value and user experience.',
        improvementFeedback: 'Prepare a backup video in case live network drops during future large demos.',
        betterMessageTemplate: `"Hi everyone! Today I'm excited to demo the new Customer Analytics Dashboard.\n\nProblem solved: Enterprise clients previously waited 15 seconds to calculate monthly cohort churn. \n\nLive Demo: With our new client-side caching and streaming table, users can filter 50,000 transactions instantly with sub-100ms response times. Here is how a manager filters churned accounts in 2 clicks...\n\nImpact: Tested across 5 beta merchants with 100% positive feedback."`,
        followUpAction: 'Share demo recording link in #general-announcements.',
        consequenceLevel: 'EXEMPLARY',
      },
    ],
    isCompleted: false,
  },
  {
    id: 'sc-8',
    title: 'Clarify ambiguous requirements on your first day assignment',
    category: 'First Day & Onboarding',
    phase: 'Days 1–30: Adapt',
    roleTrack: 'Junior Software Developer',
    companyName: 'NovaLabs Technologies',
    simulatedDay: 2,
    difficulty: 'Beginner',
    durationMinutes: 5,
    context:
      'On your second day, your mentor assigns a ticket: "Add search filtering to the user table." The ticket description has only one line and no UI wireframes or API contract specifications.',
    charactersInvolved: [
      { name: 'Sameer Sen', role: 'Lead Backend Engineer', avatar: 'SS' },
    ],
    workplaceTools: {
      emails: [],
      chatMessages: [],
      tasks: [],
      meetings: [],
      projectBrief: 'User Management Admin Console.',
    },
    currentObjective: 'Clarify search requirements (client-side vs server-side, debounce time, search fields) before writing 500 lines of code.',
    dilemmaDescription: 'Do you guess requirements and risk rewriting everything, or ask structured clarifying questions?',
    options: [
      {
        id: 'opt-81',
        title: 'Option A: Prepare 3 specific clarifying questions (search debounce, target fields, server vs client)',
        actionText: 'Send a structured note to Sameer asking to clarify search scope, debounce delay, and API endpoint.',
        consequenceSummary: 'Sameer provides the Figma mock link and confirms server-side search API with 300ms debounce, saving you 2 days of rewrite.',
        skillDeltas: [
          { skill: 'Clear Communication', delta: +14 },
          { skill: 'Task Ownership', delta: +15 },
          { skill: 'Problem-Solving', delta: +12 },
        ],
        strengthFeedback: 'Proactive requirement clarification is the hallmark of thoughtful engineers.',
        improvementFeedback: 'Document the agreed requirements directly into the Jira ticket for future team reference.',
        betterMessageTemplate: `Hi Sameer,\n\nI'm reviewing NOVA-102 (User Table Search). To ensure I align with our architecture before coding, could you confirm:\n1. Should search filter across Name & Email only, or also Organization?\n2. Is this client-side filtering over the active page, or a debounced server-side query to '/api/users/search'?\n3. Is there an existing debounce hook in our shared UI library I should reuse?`,
        followUpAction: 'Update Jira ticket description with the 3 confirmed requirements.',
        consequenceLevel: 'EXEMPLARY',
      },
    ],
    isCompleted: false,
  },
];

export const workReadyBadgesData: WorkReadyBadge[] = [
  {
    id: 'badge-comm',
    title: 'Verified Workplace Communication',
    description: 'Mastered proactive blocker updates, async remote handovers, and executive stand-ups.',
    iconName: 'MessageSquare',
    isUnlocked: true,
    unlockedAt: '2 days ago',
    criteria: 'Score $\ge 80\%$ on 4 Communication scenarios.',
  },
  {
    id: 'badge-owner',
    title: 'Verified Task Ownership',
    description: 'Demonstrated proactive deadline escalation, estimation accuracy, and zero-blame incident recovery.',
    iconName: 'ShieldCheck',
    isUnlocked: true,
    unlockedAt: 'Yesterday',
    criteria: 'Complete 3 Task Ownership scenarios with Exemplary rating.',
  },
  {
    id: 'badge-feed',
    title: 'Verified Feedback Handling',
    description: 'Demonstrated high coachability, constructive PR review replies, and architectural adaptability.',
    iconName: 'Award',
    isUnlocked: false,
    criteria: 'Score $\ge 75\%$ on critical code review and performance scenarios.',
  },
  {
    id: 'badge-team',
    title: 'Verified Team Collaboration',
    description: 'Successfully resolved stakeholder priority conflicts and contributed to peer reviews.',
    iconName: 'Users',
    isUnlocked: false,
    criteria: 'Complete 2 Career Pod roleplay sessions with 5-star peer rubric.',
  },
  {
    id: 'badge-meet',
    title: 'Verified Meeting Effectiveness',
    description: 'Delivers structured stand-up updates under 90s and customer-centric sprint reviews.',
    iconName: 'Calendar',
    isUnlocked: false,
    criteria: 'Master Daily Stand-up and Sprint Review scenarios.',
  },
  {
    id: 'badge-30d',
    title: 'Verified First 30 Days',
    description: 'Completed foundational onboarding, tool mastery, and early communication protocols.',
    iconName: 'Sparkles',
    isUnlocked: true,
    unlockedAt: 'Today',
    criteria: 'Complete all Days 1–30 Adapt modules with $\ge 70\%$ average.',
  },
  {
    id: 'badge-full',
    title: 'WorkReady: Junior Frontend Developer',
    description: 'Comprehensive 90-day workplace transition certification across all 10 workplace skills.',
    iconName: 'Briefcase',
    isUnlocked: false,
    criteria: 'Complete all 3 phases (30-60-90 days), 1 peer roleplay, and score $\ge 75\%$ overall.',
  },
];

export const samplePodRoleplaySessions: PodRoleplaySession[] = [
  {
    id: 'prs-1',
    title: 'Sprint Deadline Delay & Escalation Practice',
    scenarioTheme: 'Communicating unexpected API breaking change 4 hours before staging cutoff.',
    participants: [
      { name: 'Divya', avatar: 'DV', assignedPersona: 'Employee' },
      { name: 'Kunal Sharma', avatar: 'KS', assignedPersona: 'Manager' },
      { name: 'Tanvi Agarwal', avatar: 'TA', assignedPersona: 'Client' },
      { name: 'Harsh Vardhan', avatar: 'HV', assignedPersona: 'Observer' },
    ],
    rubricScores: {
      clarity: 5,
      professionalism: 5,
      ownership: 4,
      nextSteps: 5,
      proactiveTiming: 4,
      tone: 5,
    },
    peerFeedbackText: 'Divya stated the root cause clearly and proposed two mitigation options immediately. Great calm tone under pressure!',
    status: 'COMPLETED',
  },
  {
    id: 'prs-2',
    title: 'Conflicting Product vs Tech Lead Priorities',
    scenarioTheme: 'Negotiating an urgent marketing request against a core database migration.',
    participants: [
      { name: 'Divya', avatar: 'DV', assignedPersona: 'Employee' },
      { name: 'Sneha Roy', avatar: 'SR', assignedPersona: 'Manager' },
      { name: 'Aditya Nair', avatar: 'AN', assignedPersona: 'Client' },
    ],
    rubricScores: {
      clarity: 4,
      professionalism: 4,
      ownership: 4,
      nextSteps: 4,
      proactiveTiming: 4,
      tone: 4,
    },
    peerFeedbackText: 'Good alternative proposed (manual CSV export). Next time, create a shared 3-way Slack thread immediately.',
    status: 'COMPLETED',
  },
];

export const initialWorkReadyReport: WorkReadyReportData = {
  overallReadinessScore: 72,
  currentPhase: 'Days 1–30: Adapt',
  strongestBehaviors: [
    'Clear, structured written communication in Slack and email with bullet points.',
    'High coachability during pull request reviews without personal defensiveness.',
    'Quick incident response with rollback-first mindset during production glitches.',
  ],
  riskAreas: [
    'Delayed escalation when dependencies or third-party APIs block progress (> 2 hrs).',
    'Tendency to accept conflicting stakeholder requests instead of facilitating 3-way alignment.',
  ],
  recommendedRealWorldHabits: [
    'Apply the 45-minute rule: investigate logs, formulate two hypotheses, then reach out.',
    'Send proactive blocker updates with 2 concrete mitigation options before deadlines.',
    'Prepare 3 bullet points before joining daily stand-up meetings.',
  ],
  firstWeekActions: [
    'Ask your engineering manager: "What is your preferred format and cadence for progress updates and blockers?"',
    'Set up 1-on-1 coffee chats (15 min) with your tech lead, buddy, and product manager.',
    'Document all local setup hurdles in the onboarding wiki for the next new joiner.',
  ],
  questionsToAskManager: [
    '"What does an exemplary first 30 days look like for my role?"',
    '"How should I balance self-directed debugging with asking teammates for help?"',
    '"Who are the key cross-functional stakeholders I should align with for this project?"',
  ],
  thirtyDayGoals: [
    'Ship 3 small bug fixes to production with zero regressions.',
    'Master local development environment, CI/CD deployment pipelines, and testing suites.',
    'Deliver crisp daily stand-up updates under 90 seconds.',
  ],
  sixtyDayGoals: [
    'Own an end-to-end feature from PRD review to staging deployment.',
    'Proactively identify and communicate potential scope risks at least 2 days before sprint deadlines.',
    'Provide constructive code reviews for at least 4 peer pull requests.',
  ],
  ninetyDayGoals: [
    'Demonstrate autonomous technical decision-making on complex architecture tasks.',
    'Present a completed feature demo to cross-functional stakeholders in Sprint Review.',
    'Achieve full WorkReady: Junior Frontend Developer certification.',
  ],
};
