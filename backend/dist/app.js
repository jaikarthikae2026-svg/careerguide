import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import { aiService } from './services/aiService.js';
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
const secret = process.env.JWT_SECRET || 'careeros-demo-secret';
let currentUser = {
    id: 'usr-student-1',
    email: 'divya@careeros.demo',
    fullName: 'Divya',
    role: 'student',
    location: 'Bengaluru, India',
    isEmailVerified: true,
    studentProfile: {
        id: 'sp-1',
        college: 'Vellore Institute of Technology',
        degree: 'B.Tech in Computer Science',
        graduationYear: 2026,
        targetRole: 'Junior Frontend Developer',
        targetIndustry: 'Fintech / SaaS',
        currentReadiness: 68,
        currentLevel: 8,
        xp: 1650,
        weeklyAvailabilityHours: 15,
        workModePreference: 'Hybrid',
        financialConstraints: false,
    },
};
// Diagnostic Question Banks by Role
export const roleDiagnostics = {
    'Junior Frontend Developer': [
        {
            id: 'fe-q1',
            skill: 'JavaScript Closures',
            question: 'What is the primary characteristic of a closure in JavaScript?',
            options: [
                'A function bundled together with references to its surrounding lexical scope',
                'A function that executes automatically on startup',
                'A method to close network sockets',
            ],
            correctIndex: 0,
            explanation: 'A closure gives an inner function access to an outer function’s scope variables even after execution finishes.',
        },
        {
            id: 'fe-q2',
            skill: 'React Immutability',
            question: 'Why should you avoid direct state mutations in React?',
            options: [
                'Direct mutations bypass React shallow comparison, failing to trigger re-renders',
                'It causes syntax errors in modern browsers',
                'It locks memory permanently',
            ],
            correctIndex: 0,
            explanation: 'React compares state references shallowly. Mutating an object directly keeps the same reference, skipping re-renders.',
        },
        {
            id: 'fe-q3',
            skill: 'Data Structures (Trees)',
            question: 'What is the average search time complexity in a balanced Binary Search Tree (BST)?',
            options: ['O(n)', 'O(log n)', 'O(1)'],
            correctIndex: 1,
            explanation: 'In a balanced BST, each comparison halves the remaining search space, resulting in O(log n) time complexity.',
        },
        {
            id: 'fe-q4',
            skill: 'Automated Testing (Vitest)',
            question: 'What is the best practice for isolating API calls in unit tests?',
            options: [
                'Mock network responses with spy/mock handlers',
                'Call live production server',
                'Skip testing async functions',
            ],
            correctIndex: 0,
            explanation: 'Mocking HTTP requests avoids network flakiness, isolates unit logic, and enables deterministic edge-case testing.',
        },
        {
            id: 'fe-q5',
            skill: 'WorkReady Communication',
            question: 'When discovering an unexpected blocker 3 days before a deadline, what is the best action?',
            options: [
                'Proactively communicate the blocker and propose 2 mitigation paths',
                'Work silently and mention the delay on deadline day',
                'Wait for the manager to notice',
            ],
            correctIndex: 0,
            explanation: 'Early transparent communication allows teams to reallocate support or re-scope before a missed deadline.',
        },
    ],
    'Data Analyst': [
        {
            id: 'da-q1',
            skill: 'SQL Grouping',
            question: 'Which clause is used to filter aggregated results after GROUP BY in SQL?',
            options: ['HAVING', 'WHERE', 'QUALIFY'],
            correctIndex: 0,
            explanation: 'HAVING filters aggregated group values whereas WHERE filters raw rows before aggregation.',
        },
        {
            id: 'da-q2',
            skill: 'Python Pandas',
            question: 'In Pandas, which method is best for imputing missing values with column means?',
            options: ['df.fillna(df.mean())', 'df.dropna()', 'df.replace_null()'],
            correctIndex: 0,
            explanation: 'df.fillna(df.mean()) replaces nulls with calculated column arithmetic means.',
        },
        {
            id: 'da-q3',
            skill: 'Data Visualizations',
            question: 'Which visualization is ideal for showing weekly user cohort retention rates over time?',
            options: ['Cohort Heatmap / Triangle Grid', 'Pie Chart', 'Scatter Plot'],
            correctIndex: 0,
            explanation: 'Heatmaps visually convey retention percentages across time cohorts with distinct color intensity.',
        },
        {
            id: 'da-q4',
            skill: 'Business Metrics',
            question: 'What does the LTV:CAC ratio evaluate in product growth analytics?',
            options: ['Customer lifetime value relative to acquisition cost', 'Daily active user count', 'Server load efficiency'],
            correctIndex: 0,
            explanation: 'LTV:CAC indicates marketing ROI and long-term customer monetization efficiency (healthy benchmark is >= 3:1).',
        },
        {
            id: 'da-q5',
            skill: 'Stakeholder Communication',
            question: 'How should data findings be presented to non-technical executive stakeholders?',
            options: [
                'Synthesize strategic business insights and recommendations with visual clarity',
                'Share a 50-page raw SQL dump',
                'Read raw CSV tables aloud',
            ],
            correctIndex: 0,
            explanation: 'Executive stakeholders need clear actionable decisions rather than raw database queries.',
        },
    ],
    'UI/UX Designer': [
        {
            id: 'ux-q1',
            skill: 'Design Systems',
            question: 'What is the primary value of design tokens in Figma and code?',
            options: [
                'Maintains visual consistency and enables instant global theme styling across platforms',
                'Reduces PNG image file sizes',
                'Converts frames to C++ code',
            ],
            correctIndex: 0,
            explanation: 'Design tokens provide a unified semantic source of truth for colors, typography, and spacing.',
        },
        {
            id: 'ux-q2',
            skill: 'WCAG Accessibility',
            question: 'What is the minimum WCAG AA contrast ratio required for standard body text?',
            options: ['4.5:1', '3:1', '7:1'],
            correctIndex: 0,
            explanation: 'WCAG AA requires at least a 4.5:1 contrast ratio for normal body text against its background.',
        },
        {
            id: 'ux-q3',
            skill: 'Usability Research',
            question: 'What does the Think-Aloud protocol uncover in formative user testing?',
            options: [
                'User mental models, friction points, and conceptual misunderstandings',
                'Typing speed of the participant',
                'Microphone hardware latency',
            ],
            correctIndex: 0,
            explanation: 'Think-Aloud reveals real-time participant thoughts, expectations, and points of confusion.',
        },
        {
            id: 'ux-q4',
            skill: 'Interaction Design',
            question: 'Why are skeleton screens preferred over spinning loaders for dashboard cards?',
            options: [
                'They reduce perceived latency by providing visual scaffolding while data loads',
                'They are purely decorative',
                'They prevent users from scrolling',
            ],
            correctIndex: 0,
            explanation: 'Skeletons give immediate feedback on the expected layout shape, improving perceived speed.',
        },
        {
            id: 'ux-q5',
            skill: 'Design Critique',
            question: 'How should a designer address critical stakeholder usability feedback?',
            options: [
                'Clarify the root friction point, evaluate user task metrics, and iterate prototype alternatives',
                'Reject feedback immediately',
                'Delete the entire Figma file',
            ],
            correctIndex: 0,
            explanation: 'Constructive designers evaluate the core usability problem and iterate evidence-based solutions.',
        },
    ],
    'Business Analyst': [
        {
            id: 'ba-q1',
            skill: 'Agile User Stories',
            question: 'What is the standard format for an agile User Story?',
            options: [
                'As a [persona], I want [feature/action], so that [business value]',
                'Input, Output, Memory Size',
                'Cost, Time, Quality triangle',
            ],
            correctIndex: 0,
            explanation: 'User stories focus on the persona, capability, and expected customer benefit.',
        },
        {
            id: 'ba-q2',
            skill: 'Process Mapping',
            question: 'In BPMN process flowcharts, what does a diamond symbol denote?',
            options: ['Decision gateway / conditional branching', 'Start event', 'Database storage'],
            correctIndex: 0,
            explanation: 'Diamonds represent decision divergence points where the workflow splits based on conditions.',
        },
        {
            id: 'ba-q3',
            skill: 'Acceptance Criteria',
            question: 'Which syntax structure is standard for BDD acceptance criteria?',
            options: ['Given [Context], When [Action], Then [Expected Outcome]', 'If, Else, Return', 'Try, Catch, Finally'],
            correctIndex: 0,
            explanation: 'Given-When-Then defines clear preconditions, user actions, and testable outcomes.',
        },
        {
            id: 'ba-q4',
            skill: 'Root-Cause Analysis',
            question: 'Why is root-cause analysis (5 Whys) essential in business problem solving?',
            options: [
                'Prevents recurring defects by resolving foundational structural gaps rather than surface symptoms',
                'Extends project meetings',
                'Delays sprint delivery',
            ],
            correctIndex: 0,
            explanation: 'Drilling down to root causes eliminates the underlying drivers rather than treating temporary symptoms.',
        },
        {
            id: 'ba-q5',
            skill: 'Stakeholder Prioritization',
            question: 'When teams disagree on feature priorities, what is the best BA approach?',
            options: [
                'Facilitate an objective prioritization framework (RICE/MoSCoW) tied to measurable OKRs',
                'Agree with the loudest stakeholder',
                'Cancel all features',
            ],
            correctIndex: 0,
            explanation: 'Frameworks like RICE or MoSCoW remove bias by evaluating reach, impact, confidence, and effort.',
        },
    ],
};
let learningLessons = [
    {
        id: 'lesson-fe-1',
        role: 'Junior Frontend Developer',
        title: 'JavaScript Async Patterns & Promises in Depth',
        skill: 'JavaScript / TypeScript',
        duration: '20 min',
        xpReward: 50,
        completed: true,
        content: 'Mastering the JavaScript Event Loop: Microtasks (Promises, queueMicrotask) take strict priority over Macrotasks (setTimeout, setInterval). When building asynchronous frontend interfaces, always handle errors with try/catch blocks and use Promise.allSettled() when fetching parallel resources where partial success is acceptable.',
        exercise: {
            question: 'Which Promise static method waits for all promises to settle regardless of outcome?',
            options: ['Promise.race()', 'Promise.allSettled()', 'Promise.any()'],
            correctIndex: 1,
            explanation: 'Promise.allSettled() returns outcome objects with status fulfilled or rejected for every promise without short-circuiting.',
        },
    },
    {
        id: 'lesson-fe-2',
        role: 'Junior Frontend Developer',
        title: 'React Render Optimization & Memoization',
        skill: 'React.js',
        duration: '25 min',
        xpReward: 50,
        completed: false,
        content: 'React re-renders components whenever state or parent props change. To prevent expensive tree recalculations: (1) Use React.memo for pure display components, (2) Wrap heavy transformations in useMemo with proper dependency arrays, and (3) Use useCallback for stable function handler references passed to memoized children.',
        exercise: {
            question: 'What is the primary purpose of the useCallback hook in React?',
            options: [
                'To cache expensive calculation return values',
                'To preserve function reference identity across component renders',
                'To fetch data automatically on mount',
            ],
            correctIndex: 1,
            explanation: 'useCallback caches function definitions between renders, ensuring child components relying on reference equality do not re-render unnecessarily.',
        },
    },
    {
        id: 'lesson-fe-3',
        role: 'Junior Frontend Developer',
        title: 'Automated Component Testing with Vitest & React Testing Library',
        skill: 'Testing & Vitest',
        duration: '30 min',
        xpReward: 75,
        completed: false,
        content: 'Test behavior rather than implementation details. Use getByRole to find elements the way screen readers do, mock network endpoints using MSW or vi.fn(), and assert expected visual feedback across loading, error, and success states.',
        exercise: {
            question: 'Which RTL query is the recommended standard for selecting interactive buttons?',
            options: ['getByRole("button", { name: /submit/i })', 'getByTestId("submit-btn")', 'querySelector("button")'],
            correctIndex: 0,
            explanation: 'getByRole aligns with accessibility trees and encourages accessible semantic HTML structure.',
        },
    },
];
let projectSubmissions = [
    {
        id: 'proj-sub-1',
        studentId: 'usr-student-1',
        studentName: 'Divya',
        projectId: 'proj-fe-dashboard',
        role: 'Junior Frontend Developer',
        title: 'Responsive Student Placement Analytics Dashboard',
        problemStatement: 'Colleges and placement cells struggle with fragmented placement data, lacking real-time visibility into student skill readiness and department placement metrics.',
        requiredSkills: ['React.js', 'TypeScript', 'Recharts', 'Vitest', 'CSS Variables'],
        repoUrl: 'https://github.com/divya-dev/placement-analytics-dashboard',
        liveDemoUrl: 'https://placement-analytics.careeros.app',
        decisionsNotes: 'Implemented responsive CSS grid cards, memoized chart data transformations with useMemo, and added 12 automated unit tests with Vitest achieving 88% branch coverage.',
        status: 'Verified',
        score: 86,
        review: {
            reviewerName: 'Sneha Roy',
            reviewerRole: 'Senior Frontend Architect',
            organization: 'Microsoft India',
            overallScore: 4.6,
            correctnessScore: 5,
            qualityScore: 4,
            clarityScore: 5,
            documentationScore: 5,
            problemSolvingScore: 5,
            decisionExplainingScore: 4,
            professionalismScore: 5,
            strengthFeedback: 'Excellent component decomposition, clean TypeScript interfaces, and great use of responsive dark purple theme styling. The 12 Vitest tests demonstrate high production diligence.',
            improvementFeedback: 'Consider lazy-loading heavy chart visualization modules with React.lazy() to further optimize initial bundle size.',
            reviewedAt: '2026-09-20T14:30:00.000Z',
        },
        submittedAt: '2026-09-18T10:15:00.000Z',
        verifiedAt: '2026-09-20T14:30:00.000Z',
        approvedForPassport: true,
        passportVisibility: 'Recruiters only',
    },
    {
        id: 'proj-sub-2',
        studentId: 'usr-student-1',
        studentName: 'Divya',
        projectId: 'proj-fe-checkout',
        role: 'Junior Frontend Developer',
        title: 'Accessible Single-Page Merchant Checkout Flow',
        problemStatement: 'High mobile cart abandonment due to complex multi-step forms and sluggish client validation.',
        requiredSkills: ['React', 'TypeScript', 'WCAG 2.1 AA', 'Vitest'],
        repoUrl: 'https://github.com/divya-dev/merchant-checkout',
        liveDemoUrl: 'https://checkout.careeros.app',
        decisionsNotes: 'Implemented accordion step navigation, instant z-schema validation, and 8 Vitest unit tests.',
        status: 'Requested',
        submittedAt: '2026-09-23T16:00:00.000Z',
        approvedForPassport: true,
        passportVisibility: 'Recruiters only',
    },
];
let jobApplications = [
    {
        id: 'app-1',
        studentId: 'usr-student-1',
        companyName: 'TechNova Labs',
        role: 'Junior Frontend Developer',
        location: 'Bengaluru, India',
        workMode: 'Hybrid',
        source: 'CareerOS Campus Room',
        resumeVersion: 'ATS_Software_Dev_Resume_v3.pdf',
        referralUsed: 'Yes (Sneha Roy · Microsoft Alumni)',
        currentStage: 'Technical interview',
        appliedDate: '2026-09-12',
        lastUpdated: '2026-09-21',
        assessmentScore: '88% (Passed)',
        interviewNotes: 'System architecture round scheduled for Friday. Prepare component profiling trade-offs.',
        studentNotes: 'Strong match on React & Vitest testing requirements.',
    },
    {
        id: 'app-2',
        studentId: 'usr-student-1',
        companyName: 'Razorpay',
        role: 'Frontend Engineering Intern',
        location: 'Bengaluru, India',
        workMode: 'Hybrid',
        source: 'Direct Portal',
        resumeVersion: 'ATS_Software_Dev_Resume_v3.pdf',
        referralUsed: 'No',
        currentStage: 'Assessment',
        appliedDate: '2026-09-15',
        lastUpdated: '2026-09-19',
        assessmentScore: 'Completed · Awaiting Results',
        studentNotes: 'Online test had 2 DSA problems (Arrays, Trees) and 1 React debugging question.',
    },
    {
        id: 'app-3',
        studentId: 'usr-student-1',
        companyName: 'FinPulse Systems',
        role: 'Associate UI Engineer',
        location: 'Hyderabad, India',
        workMode: 'Remote',
        source: 'LinkedIn',
        resumeVersion: 'ATS_Software_Dev_Resume_v2.pdf',
        referralUsed: 'No',
        currentStage: 'Rejected',
        appliedDate: '2026-08-28',
        lastUpdated: '2026-09-10',
        rejectionStage: 'Online Assessment',
        rejectionReason: 'Time limit expired on algorithmic section',
        employerFeedback: 'Strong portfolio, but assessment score fell below 75% threshold.',
        studentNotes: 'Need more practice with timed tree traversal problems under 20 mins.',
    },
];
// Career Pods Collection
let podTasksState = {
    'task-pod-1': true,
    'task-pod-2': false,
    'task-pod-3': false,
};
// WorkReady Simulation Attempts Collection
let workReadyAttempts = [];
let inAppNotifications = [
    {
        id: 'notif-1',
        userId: 'usr-student-1',
        title: 'Project Verified on Career Passport!',
        detail: 'Sneha Roy verified "Placement Analytics Dashboard" with a 4.6/5 rating.',
        type: 'PROJECT_VERIFIED',
        isRead: false,
        actionUrl: 'Career Passport',
        createdAt: new Date().toISOString(),
        timeAgo: '10m ago',
    },
    {
        id: 'notif-2',
        userId: 'usr-student-1',
        title: 'Technical Interview Scheduled',
        detail: 'TechNova Labs moved your application to Technical Interview stage.',
        type: 'APPLICATION_UPDATE',
        isRead: false,
        actionUrl: 'Readiness Analytics',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        timeAgo: '1h ago',
    },
    {
        id: 'notif-3',
        userId: 'usr-student-1',
        title: 'Career Pod Mission Check-In',
        detail: 'Frontend Pod Alpha: 5 of 8 members completed this week’s testing mission.',
        type: 'POD_ACTIVITY',
        isRead: true,
        actionUrl: 'Career Network',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        timeAgo: 'Yesterday',
    },
];
let secureFiles = [
    {
        id: 'file-1',
        ownerId: 'usr-student-1',
        fileName: 'Divya_Frontend_ATS_Resume_2026.pdf',
        fileType: 'application/pdf',
        fileSize: '240 KB',
        category: 'Resume',
        privateToken: 'tok_res_' + Date.now(),
        uploadedAt: '2026-09-20',
    },
    {
        id: 'file-2',
        ownerId: 'usr-student-1',
        fileName: 'Vitest_Test_Coverage_Proof.png',
        fileType: 'image/png',
        fileSize: '1.2 MB',
        category: 'Project Proof',
        privateToken: 'tok_proof_' + Date.now(),
        uploadedAt: '2026-09-18',
    },
];
const ok = (res, data, status = 200) => res.status(status).json({ success: true, data });
const fail = (res, message, status = 400, errors = []) => res.status(status).json({ success: false, message, errors });
const token = (id, role = 'student', email = 'divya@careeros.demo') => jwt.sign({ sub: id, role, email }, secret, { expiresIn: '7d' });
const auth = (req, res, next) => {
    const raw = req.headers.authorization?.replace('Bearer ', '');
    if (!raw) {
        req.userId = currentUser.id;
        req.userRole = currentUser.role;
        req.userEmail = currentUser.email;
        return next();
    }
    try {
        const payload = jwt.verify(raw, secret);
        req.userId = payload.sub;
        req.userRole = payload.role || 'student';
        req.userEmail = payload.email;
        next();
    }
    catch {
        req.userId = currentUser.id;
        req.userRole = currentUser.role;
        req.userEmail = currentUser.email;
        next();
    }
};
const validate = (schema) => (req, res, next) => {
    const p = schema.safeParse(req.body);
    if (!p.success)
        return fail(res, 'Validation failed', 422, p.error.issues);
    req.body = p.data;
    next();
};
const addXP = (amount) => {
    if (currentUser.studentProfile) {
        currentUser.studentProfile.xp += amount;
        currentUser.studentProfile.currentLevel = Math.max(1, Math.floor(currentUser.studentProfile.xp / 200) + 6);
    }
};
// -------------------------------------------------------------
// 2. AUTHENTICATION, PASSWORD RESET & ACCOUNT MANAGEMENT
// -------------------------------------------------------------
app.get('/health', (_, res) => ok(res, { status: 'ok', mode: 'express-careeros-fullstack' }));
app.post('/api/auth/login', (req, res) => {
    let role = 'student';
    let name = 'Divya';
    if (req.body.email?.includes('mentor') || req.body.email?.includes('sneha')) {
        role = 'mentor';
        name = 'Sneha Roy';
    }
    else if (req.body.email?.includes('recruiter')) {
        role = 'recruiter';
        name = 'Vikram Seth';
    }
    else if (req.body.email?.includes('admin')) {
        role = 'platform_admin';
        name = 'Platform Administrator';
    }
    currentUser.email = req.body.email || currentUser.email;
    currentUser.role = role;
    currentUser.fullName = name;
    ok(res, { token: token(currentUser.id, role, currentUser.email), user: currentUser });
});
app.post('/api/auth/register', (req, res) => {
    currentUser = {
        id: 'usr-' + Date.now(),
        email: req.body.email,
        fullName: req.body.name,
        role: req.body.role || 'student',
        location: 'Bengaluru, India',
        isEmailVerified: true,
        studentProfile: {
            id: 'sp-' + Date.now(),
            college: 'Vellore Institute of Technology',
            degree: 'B.Tech in Computer Science',
            graduationYear: 2026,
            targetRole: 'Junior Frontend Developer',
            targetIndustry: 'Fintech / SaaS',
            currentReadiness: 68,
            currentLevel: 8,
            xp: 1650,
            weeklyAvailabilityHours: 15,
            workModePreference: 'Hybrid',
            financialConstraints: false,
        },
    };
    ok(res, { token: token(currentUser.id, currentUser.role, currentUser.email), user: currentUser }, 201);
});
app.post('/api/auth/reset-password', (req, res) => {
    ok(res, { message: `Password reset instructions sent to ${req.body.email || currentUser.email}` });
});
app.delete('/api/auth/account', auth, (req, res) => {
    ok(res, { message: 'Account and associated student profile data deleted successfully.' });
});
app.get('/api/auth/me', auth, (_, res) => ok(res, currentUser));
app.get('/api/profile', auth, (_, res) => ok(res, { user: currentUser }));
app.put('/api/profile', auth, (req, res) => {
    if (req.body.fullName)
        currentUser.fullName = req.body.fullName;
    if (req.body.location !== undefined)
        currentUser.location = req.body.location;
    if (req.body.email)
        currentUser.email = req.body.email;
    if (req.body.avatarUrl !== undefined)
        currentUser.avatarUrl = req.body.avatarUrl;
    if (currentUser.studentProfile) {
        if (req.body.college !== undefined)
            currentUser.studentProfile.college = req.body.college;
        if (req.body.degree !== undefined)
            currentUser.studentProfile.degree = req.body.degree;
        if (req.body.graduationYear !== undefined)
            currentUser.studentProfile.graduationYear = Number(req.body.graduationYear);
        if (req.body.targetRole !== undefined)
            currentUser.studentProfile.targetRole = req.body.targetRole;
        if (req.body.targetIndustry !== undefined)
            currentUser.studentProfile.targetIndustry = req.body.targetIndustry;
        if (req.body.preferredLanguage !== undefined)
            currentUser.studentProfile.preferredLanguage = req.body.preferredLanguage;
        if (req.body.weeklyAvailabilityHours !== undefined)
            currentUser.studentProfile.weeklyAvailabilityHours = Number(req.body.weeklyAvailabilityHours);
        if (req.body.workModePreference !== undefined)
            currentUser.studentProfile.workModePreference = req.body.workModePreference;
        if (req.body.githubUrl !== undefined)
            currentUser.studentProfile.githubUrl = req.body.githubUrl;
        if (req.body.portfolioUrl !== undefined)
            currentUser.studentProfile.portfolioUrl = req.body.portfolioUrl;
        if (req.body.linkedinUrl !== undefined)
            currentUser.studentProfile.linkedinUrl = req.body.linkedinUrl;
        if (req.body.bio !== undefined)
            currentUser.studentProfile.bio = req.body.bio;
    }
    ok(res, { user: currentUser, message: 'Profile updated successfully.' });
});
app.post('/api/profile', auth, (req, res) => {
    if (req.body.fullName)
        currentUser.fullName = req.body.fullName;
    if (req.body.location !== undefined)
        currentUser.location = req.body.location;
    if (req.body.email)
        currentUser.email = req.body.email;
    if (req.body.avatarUrl !== undefined)
        currentUser.avatarUrl = req.body.avatarUrl;
    if (currentUser.studentProfile) {
        if (req.body.college !== undefined)
            currentUser.studentProfile.college = req.body.college;
        if (req.body.degree !== undefined)
            currentUser.studentProfile.degree = req.body.degree;
        if (req.body.graduationYear !== undefined)
            currentUser.studentProfile.graduationYear = Number(req.body.graduationYear);
        if (req.body.targetRole !== undefined)
            currentUser.studentProfile.targetRole = req.body.targetRole;
        if (req.body.targetIndustry !== undefined)
            currentUser.studentProfile.targetIndustry = req.body.targetIndustry;
        if (req.body.preferredLanguage !== undefined)
            currentUser.studentProfile.preferredLanguage = req.body.preferredLanguage;
        if (req.body.weeklyAvailabilityHours !== undefined)
            currentUser.studentProfile.weeklyAvailabilityHours = Number(req.body.weeklyAvailabilityHours);
        if (req.body.workModePreference !== undefined)
            currentUser.studentProfile.workModePreference = req.body.workModePreference;
        if (req.body.githubUrl !== undefined)
            currentUser.studentProfile.githubUrl = req.body.githubUrl;
        if (req.body.portfolioUrl !== undefined)
            currentUser.studentProfile.portfolioUrl = req.body.portfolioUrl;
        if (req.body.linkedinUrl !== undefined)
            currentUser.studentProfile.linkedinUrl = req.body.linkedinUrl;
        if (req.body.bio !== undefined)
            currentUser.studentProfile.bio = req.body.bio;
    }
    ok(res, { user: currentUser, message: 'Profile updated successfully.' });
});
app.post('/api/auth/switch-role', auth, (req, res) => {
    const role = req.body.role;
    let name = 'Divya';
    if (role === 'mentor')
        name = 'Sneha Roy';
    if (role === 'recruiter')
        name = 'Vikram Seth';
    if (role === 'platform_admin')
        name = 'Platform Administrator';
    currentUser.role = role;
    currentUser.fullName = name;
    ok(res, { token: token(currentUser.id, role, currentUser.email), user: currentUser });
});
// -------------------------------------------------------------
// 3. ONBOARDING & DIAGNOSTIC ASSESSMENT
// -------------------------------------------------------------
app.post('/api/onboarding', auth, (req, res) => {
    if (currentUser.studentProfile) {
        currentUser.fullName = req.body.fullName || currentUser.fullName;
        currentUser.studentProfile.college = req.body.college || currentUser.studentProfile.college;
        currentUser.studentProfile.degree = req.body.degree || currentUser.studentProfile.degree;
        currentUser.studentProfile.graduationYear = req.body.graduationYear || currentUser.studentProfile.graduationYear;
        currentUser.studentProfile.targetRole = req.body.targetRole || currentUser.studentProfile.targetRole;
        currentUser.studentProfile.targetIndustry = req.body.targetIndustry || currentUser.studentProfile.targetIndustry;
        currentUser.studentProfile.weeklyAvailabilityHours = req.body.weeklyAvailabilityHours || 15;
        currentUser.studentProfile.workModePreference = req.body.workModePreference || 'Hybrid';
    }
    addXP(100);
    ok(res, { user: currentUser, roadmapGenerated: true });
});
app.get('/api/assessments/diagnostic', auth, (req, res) => {
    const roleQuery = req.query.role || currentUser.studentProfile?.targetRole || 'Junior Frontend Developer';
    const questions = roleDiagnostics[roleQuery] || roleDiagnostics['Junior Frontend Developer'];
    ok(res, { role: roleQuery, questions });
});
app.post('/api/assessments/diagnostic/submit', auth, (req, res) => {
    const roleQuery = req.body.role || currentUser.studentProfile?.targetRole || 'Junior Frontend Developer';
    const questions = roleDiagnostics[roleQuery] || roleDiagnostics['Junior Frontend Developer'];
    const answers = req.body.answers || {};
    let correctCount = 0;
    const strongSkills = [];
    const skillGaps = [];
    questions.forEach((q) => {
        if (answers[q.id] === q.correctIndex) {
            correctCount++;
            strongSkills.push(q.skill);
        }
        else {
            skillGaps.push(q.skill);
        }
    });
    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    if (currentUser.studentProfile) {
        currentUser.studentProfile.currentReadiness = Math.round(calculatedScore * 0.7 + 25);
    }
    addXP(80);
    ok(res, {
        role: roleQuery,
        score: calculatedScore,
        correctCount,
        totalQuestions: questions.length,
        strongSkills,
        skillGaps,
        explanations: questions.map((q) => ({
            skill: q.skill,
            question: q.question,
            correct: answers[q.id] === q.correctIndex,
            explanation: q.explanation,
        })),
    });
});
// -------------------------------------------------------------
// 4. LEARNING HUB LESSONS & PROGRESS
// -------------------------------------------------------------
app.get('/api/learning/lessons', auth, (req, res) => {
    ok(res, learningLessons);
});
app.post('/api/learning/lessons/:id/complete', auth, (req, res) => {
    const lesson = learningLessons.find((l) => l.id === String(req.params.id));
    if (lesson) {
        lesson.completed = true;
        addXP(lesson.xpReward);
    }
    ok(res, { lesson, message: 'Lesson completed and XP awarded!' });
});
// -------------------------------------------------------------
// 5. PROJECT STUDIO, REVIEWS & RESUBMISSIONS
// -------------------------------------------------------------
app.get('/api/projects/submissions', auth, (_, res) => {
    ok(res, projectSubmissions);
});
app.post('/api/projects/submit', auth, (req, res) => {
    const newProject = {
        id: 'proj-sub-' + Date.now(),
        studentId: currentUser.id,
        studentName: currentUser.fullName,
        projectId: 'proj-' + Date.now(),
        role: req.body.role || currentUser.studentProfile?.targetRole || 'Junior Frontend Developer',
        title: req.body.title,
        problemStatement: req.body.problemStatement,
        requiredSkills: req.body.requiredSkills || ['React', 'TypeScript', 'Vitest'],
        repoUrl: req.body.repoUrl,
        liveDemoUrl: req.body.liveDemoUrl || '',
        decisionsNotes: req.body.decisionsNotes,
        status: 'Requested',
        submittedAt: new Date().toISOString(),
        approvedForPassport: true,
        passportVisibility: 'Recruiters only',
    };
    projectSubmissions.unshift(newProject);
    addXP(100);
    ok(res, newProject, 201);
});
app.get('/api/mentor/reviews/queue', auth, (_, res) => {
    ok(res, projectSubmissions);
});
app.post('/api/mentor/reviews/:id/respond', auth, (req, res) => {
    const proj = projectSubmissions.find((p) => p.id === String(req.params.id));
    if (!proj)
        return fail(res, 'Review request not found', 404);
    if (req.body.action === 'accept') {
        proj.status = 'In review';
    }
    else {
        proj.status = 'Declined';
    }
    ok(res, { project: proj, message: `Review request ${req.body.action}ed successfully.` });
});
app.post('/api/mentor/reviews/:id/evaluate', auth, (req, res) => {
    const proj = projectSubmissions.find((p) => p.id === String(req.params.id));
    if (!proj)
        return fail(res, 'Project submission not found', 404);
    const scores = [
        req.body.correctnessScore,
        req.body.qualityScore,
        req.body.clarityScore,
        req.body.documentationScore || 4,
        req.body.problemSolvingScore,
        req.body.decisionExplainingScore || 4,
        req.body.professionalismScore || 5,
    ];
    const avgScore = Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1));
    proj.review = {
        reviewerName: req.body.reviewerName || 'Sneha Roy',
        reviewerRole: req.body.reviewerRole || 'Senior Frontend Architect',
        organization: req.body.organization || 'Microsoft India',
        overallScore: avgScore,
        correctnessScore: req.body.correctnessScore,
        qualityScore: req.body.qualityScore,
        clarityScore: req.body.clarityScore,
        documentationScore: req.body.documentationScore || 4,
        problemSolvingScore: req.body.problemSolvingScore,
        decisionExplainingScore: req.body.decisionExplainingScore || 4,
        professionalismScore: req.body.professionalismScore || 5,
        strengthFeedback: req.body.strengthFeedback,
        improvementFeedback: req.body.improvementFeedback,
        changeRequestDetails: req.body.changeRequestDetails,
        reviewedAt: new Date().toISOString(),
    };
    if (req.body.action === 'approve_verify') {
        proj.status = 'Verified';
        proj.score = Math.round(avgScore * 20);
        proj.verifiedAt = new Date().toISOString();
        addXP(200);
    }
    else {
        proj.status = 'Changes requested';
    }
    ok(res, { project: proj, message: `Review recorded with status: ${proj.status}` });
});
app.post('/api/projects/:id/resubmit', auth, (req, res) => {
    const proj = projectSubmissions.find((p) => p.id === String(req.params.id));
    if (!proj)
        return fail(res, 'Project submission not found', 404);
    proj.repoUrl = req.body.repoUrl;
    if (req.body.liveDemoUrl)
        proj.liveDemoUrl = req.body.liveDemoUrl;
    proj.decisionsNotes = `${proj.decisionsNotes}\n\n[Revision Notes]: ${req.body.revisionNotes}`;
    proj.status = 'Resubmitted';
    ok(res, { project: proj, message: 'Project revised evidence resubmitted for mentor review!' });
});
// -------------------------------------------------------------
// 6. APPLICATION TRACKER & REJECTION INTELLIGENCE
// -------------------------------------------------------------
app.get('/api/applications', auth, (_, res) => {
    ok(res, jobApplications);
});
app.post('/api/applications', auth, (req, res) => {
    const record = {
        id: 'app-' + Date.now(),
        studentId: currentUser.id,
        ...req.body,
        appliedDate: new Date().toISOString().slice(0, 10),
        lastUpdated: new Date().toISOString().slice(0, 10),
    };
    jobApplications.unshift(record);
    ok(res, record, 201);
});
app.put('/api/applications/:id/stage', auth, (req, res) => {
    const appRecord = jobApplications.find((a) => a.id === String(req.params.id));
    if (!appRecord)
        return fail(res, 'Application not found', 404);
    appRecord.currentStage = req.body.stage;
    appRecord.lastUpdated = new Date().toISOString().slice(0, 10);
    if (req.body.interviewNotes)
        appRecord.interviewNotes = req.body.interviewNotes;
    if (req.body.employerFeedback)
        appRecord.employerFeedback = req.body.employerFeedback;
    if (req.body.rejectionReason)
        appRecord.rejectionReason = req.body.rejectionReason;
    ok(res, appRecord);
});
app.get('/api/applications/rejection-insights', auth, (_, res) => {
    const total = jobApplications.length;
    const rejected = jobApplications.filter((a) => a.currentStage === 'Rejected').length;
    ok(res, {
        totalApplications: total,
        rejectionsTracked: rejected,
        confirmedFeedbacks: [
            {
                company: 'FinPulse Systems',
                role: 'Associate UI Engineer',
                feedback: 'Strong portfolio, but assessment score fell below 75% threshold.',
                stage: 'Online Assessment',
            },
        ],
        probablePatterns: [
            {
                pattern: 'Technical Assessment Drop-off',
                confidence: 'High (3 of 4 rejections)',
                recommendation: 'Practice timed tree/array problem solving and Vitest automated testing drills.',
            },
        ],
        recoveryPlan: [
            { step: 1, action: 'Complete Binary Tree practice in Learning Hub', link: 'Learning Hub' },
            { step: 2, action: 'Solve 5 timed interview simulations in Mock Arena', link: 'Mock Arena' },
            { step: 3, action: 'Add Vitest branch coverage badges to Career Passport', link: 'Career Passport' },
        ],
    });
});
// -------------------------------------------------------------
// 7. CAREER PODS & WORKREADY SIMULATIONS
// -------------------------------------------------------------
app.post('/api/network/pods/:id/tasks/:taskId/complete', auth, (req, res) => {
    podTasksState[String(req.params.taskId)] = true;
    addXP(150);
    ok(res, { taskId: req.params.taskId, completed: true, message: 'Pod weekly task completed! (+150 XP)' });
});
app.post('/api/network/pods/:id/peer-reviews', auth, (req, res) => {
    addXP(80);
    ok(res, {
        message: 'Peer review submitted successfully! (+80 XP)',
        badgeEarned: 'Helpful Reviewer',
    });
});
app.get('/api/workready/scenarios', auth, (_, res) => {
    ok(res, {
        totalScenarios: 30,
        progression: 'Days 1–30: Adapt',
        attempts: workReadyAttempts,
    });
});
app.post('/api/workready/attempts', auth, (req, res) => {
    const record = {
        id: 'wr-att-' + Date.now(),
        scenarioId: req.body.scenarioId,
        selectedOption: req.body.selectedOptionId,
        timestamp: new Date().toISOString(),
    };
    workReadyAttempts.push(record);
    addXP(60);
    ok(res, { attempt: record, message: 'WorkReady attempt recorded! (+60 XP)' });
});
// -------------------------------------------------------------
// 8. NOTIFICATIONS & SECURE FILES
// -------------------------------------------------------------
app.get('/api/notifications', auth, (_, res) => {
    const unreadCount = inAppNotifications.filter((n) => !n.isRead).length;
    ok(res, { notifications: inAppNotifications, unreadCount });
});
app.put('/api/notifications/:id/read', auth, (req, res) => {
    const notif = inAppNotifications.find((n) => n.id === String(req.params.id));
    if (notif)
        notif.isRead = true;
    const unreadCount = inAppNotifications.filter((n) => !n.isRead).length;
    ok(res, { unreadCount });
});
app.put('/api/notifications/read-all', auth, (_, res) => {
    inAppNotifications.forEach((n) => (n.isRead = true));
    ok(res, { unreadCount: 0 });
});
app.get('/api/files', auth, (_, res) => {
    ok(res, secureFiles);
});
app.post('/api/files/upload', auth, (req, res) => {
    const fileRecord = {
        id: 'file-' + Date.now(),
        ownerId: currentUser.id,
        fileName: req.body.fileName,
        fileType: req.body.fileType,
        fileSize: req.body.fileSize,
        category: req.body.category,
        privateToken: 'priv_tok_' + Math.random().toString(36).substring(2, 10),
        uploadedAt: new Date().toISOString().slice(0, 10),
    };
    secureFiles.unshift(fileRecord);
    ok(res, fileRecord, 201);
});
app.delete('/api/files/:id', auth, (req, res) => {
    secureFiles = secureFiles.filter((f) => f.id !== String(req.params.id));
    ok(res, { deleted: true });
});
// -------------------------------------------------------------
// 9. READINESS ENGINE & DASHBOARD
// -------------------------------------------------------------
app.get('/api/readiness', auth, (_, res) => {
    const verifiedCount = projectSubmissions.filter((p) => p.status === 'Verified').length;
    const projectScore = verifiedCount > 0 ? 86 : 45;
    const technicalScore = 74;
    const learningScore = 67;
    const reviewScore = 92;
    const overall = Math.round(technicalScore * 0.3 + learningScore * 0.25 + projectScore * 0.25 + reviewScore * 0.2);
    ok(res, {
        overallScore: overall,
        technicalSkills: technicalScore,
        learningProgress: learningScore,
        projectEvidence: projectScore,
        reviewQuality: reviewScore,
        workplaceReadiness: 82,
        applicationReadiness: 78,
        targetRole: currentUser.studentProfile?.targetRole || 'Junior Frontend Developer',
        biggestBottleneck: 'Technical Assessment Performance',
        nextBestAction: 'Complete React optimization lesson and apply to Micro-Internship',
    });
});
app.get('/api/dashboard', auth, (_, res) => {
    ok(res, {
        student: currentUser,
        readinessScore: 68,
        targetRole: currentUser.studentProfile?.targetRole || 'Junior Frontend Developer',
        activeApplications: jobApplications.length,
        verifiedProjects: projectSubmissions.filter((p) => p.status === 'Verified').length,
        unreadNotifications: inAppNotifications.filter((n) => !n.isRead).length,
    });
});
// -------------------------------------------------------------
// 10. AI INTELLIGENCE & RESUME SERVICES
// -------------------------------------------------------------
app.get('/api/ai/status', (req, res) => {
    const customKey = req.headers['x-gemini-key'] || undefined;
    ok(res, aiService.getAiStatus(customKey));
});
app.post('/api/ai/chat', async (req, res) => {
    try {
        const customKey = req.headers['x-gemini-key'] || undefined;
        const studentContext = {
            name: currentUser.fullName,
            targetRole: currentUser.studentProfile?.targetRole,
            readinessScore: currentUser.studentProfile?.currentReadiness,
            xp: currentUser.studentProfile?.xp,
            level: currentUser.studentProfile?.currentLevel,
            targetCompany: 'TechNova',
            strongSkills: ['React', 'TypeScript', 'Vitest'],
            weakSkills: ['Trees', 'System Design'],
        };
        const result = await aiService.chatWithCareerMentor(req.body.messages || [], studentContext, customKey);
        ok(res, result);
    }
    catch (err) {
        fail(res, err.message || 'AI Chat failed', 500);
    }
});
app.post('/api/ai/mock/question', (req, res) => {
    const roleQuery = req.body.role || currentUser.studentProfile?.targetRole || 'Junior Frontend Developer';
    const typeQuery = req.body.type || 'TECHNICAL';
    const sampleQuestions = {
        TECHNICAL: [
            'Can you explain the Virtual DOM in React and how the reconciliation diffing algorithm works?',
            'How do JavaScript closures work and in what real-world scenarios do they prevent memory leaks or cause them?',
            'What is the difference between shallow and deep comparison in React memoization hooks like useMemo and useCallback?',
            'How would you architect an accessible, high-performance infinite scroll feed with virtualization?',
        ],
        BEHAVIORAL: [
            'Tell me about a time you encountered a blocking bug right before a major sprint deadline. How did you handle communication and resolution?',
            'Describe a situation where a reviewer requested significant changes to your code. How did you respond?',
            'How do you prioritize competing tasks when working across multiple projects with tight deadlines?',
        ],
        SYSTEM_DESIGN: [
            'How would you design the client-side caching layer for an analytics dashboard with real-time WebSocket updates?',
            'Explain how you would optimize Core Web Vitals (LCP, FID/INP, CLS) for a high-traffic e-commerce checkout flow.',
        ],
    };
    const pool = sampleQuestions[typeQuery] || sampleQuestions.TECHNICAL;
    const question = pool[Math.floor(Math.random() * pool.length)];
    ok(res, {
        question,
        role: roleQuery,
        type: typeQuery,
        estimatedMinutes: 5,
    });
});
app.post('/api/ai/mock/evaluate', async (req, res) => {
    try {
        const customKey = req.headers['x-gemini-key'] || undefined;
        const result = await aiService.evaluateInterviewAnswer({
            type: req.body.type || 'TECHNICAL',
            question: req.body.question || 'Explain React reconciliation',
            answer: req.body.answer || '',
            companyName: req.body.companyName || 'TechNova',
        }, customKey);
        addXP(50);
        ok(res, result);
    }
    catch (err) {
        fail(res, err.message || 'Evaluation failed', 500);
    }
});
const handleResumeAnalysis = async (req, res) => {
    try {
        const customKey = req.headers['x-gemini-key'] || undefined;
        const result = await aiService.analyzeResumeWithAi({
            resumeContent: req.body.resumeContent || '',
            targetRole: req.body.targetRole || currentUser.studentProfile?.targetRole,
            companyName: req.body.companyName || 'TechNova',
        }, customKey);
        addXP(40);
        ok(res, result);
    }
    catch (err) {
        fail(res, err.message || 'Resume analysis failed', 500);
    }
};
app.post('/api/resumes/1/analyze', handleResumeAnalysis);
app.post('/api/resumes/:id/analyze', handleResumeAnalysis);
app.post('/api/ai/resume/analyze', handleResumeAnalysis);
app.post('/api/ai/resume/tailor', async (req, res) => {
    try {
        const customKey = req.headers['x-gemini-key'] || undefined;
        const result = await aiService.tailorResumeBullet({
            bulletText: req.body.bulletText || '',
            action: req.body.action || 'improve',
            targetCompany: req.body.targetCompany,
            targetRole: req.body.targetRole || currentUser.studentProfile?.targetRole,
        }, customKey);
        addXP(20);
        ok(res, result);
    }
    catch (err) {
        fail(res, err.message || 'Resume tailoring failed', 500);
    }
});
app.post('/api/missions/wellbeing', auth, (req, res) => {
    ok(res, { status: req.body.wellbeing || 'FOCUSED', recordedAt: new Date().toISOString() });
});
const skillMissionsStore = {
    React: {
        skillName: 'React',
        missionTitle: 'Build a High-Performance Virtualized Data Grid',
        whyItMatters: 'Top tier frontend and full-stack engineering interviews require mastery of rendering lifecycles, memoization hooks, and DOM optimization.',
        difficulty: 'Intermediate',
        duration: '3–4 hours',
        xpReward: 150,
        tasks: [
            { id: 't-1', label: 'Review React Reconciliation & Fiber Architecture in Learning Hub', completed: true },
            { id: 't-2', label: 'Implement custom useMemo & useCallback optimizations for list rows', completed: false },
            { id: 't-3', label: 'Write 8 automated unit tests with Vitest & React Testing Library', completed: false },
            { id: 't-4', label: 'Document performance benchmarks and bundle size impact', completed: false },
            { id: 't-5', label: 'Submit GitHub repository & live demonstration link', completed: false },
        ],
        learningResources: [
            { title: 'React Render Optimization Masterclass', type: 'Lesson', url: 'Learning Hub' },
            { title: 'Vitest Component Testing Patterns', type: 'Guide', url: 'Learning Hub' },
        ],
        status: 'In progress',
    },
    Trees: {
        skillName: 'Trees',
        missionTitle: 'Master Binary Search Trees & Lowest Common Ancestor Algorithms',
        whyItMatters: 'Tree traversals (Inorder, Preorder, Postorder, BFS Level-Order) constitute 35% of algorithmic screening rounds at product companies.',
        difficulty: 'Intermediate',
        duration: '2–3 hours',
        xpReward: 150,
        tasks: [
            { id: 't-1', label: 'Understand DFS recursion vs iterative stack traversals', completed: true },
            { id: 't-2', label: 'Solve 3 LeetCode-style BST problems (Validate BST, LCA, Max Path Sum)', completed: false },
            { id: 't-3', label: 'Implement balance-check rotation logic in TypeScript/Python', completed: false },
            { id: 't-4', label: 'Explain time and space complexities in written decision notes', completed: false },
        ],
        learningResources: [
            { title: 'Binary Tree Traversal Patterns', type: 'Lesson', url: 'Learning Hub' },
            { title: 'Mock Technical Screening Practice', type: 'Interactive', url: 'Mock Arena' },
        ],
        status: 'Not started',
    },
    Python: {
        skillName: 'Python',
        missionTitle: 'Build an Async Data Ingestion Pipeline with Pandas',
        whyItMatters: 'Data engineering and backend roles require idiomatic Python, generator comprehension, and robust data transformations.',
        difficulty: 'Intermediate',
        duration: '3–4 hours',
        xpReward: 150,
        tasks: [
            { id: 't-1', label: 'Review Python Generators, Decorators, and Asyncio', completed: true },
            { id: 't-2', label: 'Build structured data parser with type annotations (Pydantic)', completed: false },
            { id: 't-3', label: 'Process multi-format CSV/JSON payloads with Pandas imputation', completed: false },
            { id: 't-4', label: 'Submit pipeline repository with Pytest test suite', completed: false },
        ],
        learningResources: [
            { title: 'Python Advanced Idioms & Async', type: 'Lesson', url: 'Learning Hub' },
        ],
        status: 'In progress',
    },
};
app.get('/api/skills/missions/:skillName', auth, (req, res) => {
    const name = String(req.params.skillName);
    const match = skillMissionsStore[name] || {
        skillName: name,
        missionTitle: `Build a Capstone Production Artifact in ${name}`,
        whyItMatters: `Mastering ${name} is critical for closing key skill gaps and proving hands-on proficiency to recruiter evaluation engines.`,
        difficulty: 'Intermediate',
        duration: '2–4 hours',
        xpReward: 150,
        tasks: [
            { id: 't-1', label: `Study core ${name} architecture principles`, completed: true },
            { id: 't-2', label: `Implement 2 hands-on coding exercises demonstrating ${name}`, completed: false },
            { id: 't-3', label: 'Add automated unit tests verifying edge cases', completed: false },
            { id: 't-4', label: 'Submit GitHub repository proof and write architectural decisions', completed: false },
        ],
        learningResources: [
            { title: `${name} Deep Dive & Best Practices`, type: 'Lesson', url: 'Learning Hub' },
            { title: 'Diagnostic Quiz Practice', type: 'Assessment', url: 'Diagnostic Assessment' },
        ],
        status: 'Not started',
    };
    ok(res, match);
});
app.post('/api/skills/missions/:skillName/complete', auth, (req, res) => {
    const name = String(req.params.skillName);
    addXP(150);
    if (currentUser.studentProfile) {
        currentUser.studentProfile.currentReadiness = Math.min(100, currentUser.studentProfile.currentReadiness + 3);
    }
    ok(res, {
        skillName: name,
        status: 'Completed',
        xpAwarded: 150,
        message: `Skill mission for ${name} completed! (+150 XP, +3 Readiness)`,
    });
});
app.use((_, res) => fail(res, 'Route not found', 404));
app.use((err, _req, res, _next) => {
    console.error(err);
    fail(res, 'Internal server error', 500);
});
export default app;
