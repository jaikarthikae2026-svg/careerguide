import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import {
  assessments,
  companies,
  connections,
  problems,
  projects,
  requirements,
  resources,
  role,
  skills,
  user,
} from './data/demo.js';
import { aiService } from './services/aiService.js';

interface AuthenticatedRequest extends Request {
  userId?: string;
  customApiKey?: string;
}

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const secret = process.env.JWT_SECRET || 'careeros-demo-secret';
let activeTarget = 'technova';

interface InterviewRecord {
  id: string;
  type: string;
  companyId?: string;
  question: string;
  answer: string;
  score: number;
  technicalScore: number;
  communicationScore: number;
  clarityScore: number;
  structureScore: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  idealAnswer?: string;
  createdAt: string;
}

let interviews: InterviewRecord[] = [];

let resumes = [
  {
    id: 'resume-general',
    title: 'Software Engineer Resume',
    content:
      'Alex Johnson\nBuilt an AI Career Platform with React, Node.js and Python. Developed a Smart Attendance System using Computer Vision. Skills: Python, React, Node.js, Git, Data Structures.',
    targetRole: 'Software Engineer',
    atsScore: 88,
    jobMatchScore: 82,
    keywordScore: 74,
  },
];

let missions: any[] = [];

const ok = (res: Response, data: any, status = 200) => res.status(status).json({ success: true, data });
const fail = (res: Response, message: string, status = 400, errors: any[] = []) =>
  res.status(status).json({ success: false, message, errors });

const asyncHandler =
  (fn: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req as AuthenticatedRequest, res, next)).catch(next);

const token = (id: string) => jwt.sign({ sub: id }, secret, { expiresIn: '7d' });

const extractApiKey = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  const headerKey = req.headers['x-gemini-api-key'];
  if (typeof headerKey === 'string' && headerKey.trim()) {
    req.customApiKey = headerKey.trim();
  }
  next();
};

app.use(extractApiKey);

const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const raw = req.headers.authorization?.replace('Bearer ', '');
  if (!raw) return fail(res, 'Authentication required', 401);
  try {
    req.userId = (jwt.verify(raw, secret) as { sub: string }).sub;
    next();
  } catch {
    return fail(res, 'Invalid or expired token', 401);
  }
};

const level = () => ({
  level: user.currentLevel,
  title:
    user.currentLevel <= 5
      ? 'Career Starter'
      : user.currentLevel <= 10
      ? 'Skill Builder'
      : user.currentLevel <= 15
      ? 'Placement Explorer'
      : 'Career Strategist',
  xp: user.xp,
  nextLevelXP: (user.currentLevel + 1) * 200,
  achievements: ['FIRST_MOCK', '7_DAY_STREAK', 'DSA_EXPLORER', 'COMPANY_READY'],
});

const addXP = (amount: number) => {
  user.xp += amount;
  user.currentLevel = Math.max(1, Math.floor(user.xp / 200) + 6);
  return level();
};

const byId = (id: string) => skills.find((s) => s.id === id);

function readiness() {
  const avg = (cat: string) => {
    const arr = skills.filter((s) => s.category === cat);
    return Math.round(arr.reduce((a, s) => a + s.proficiency, 0) / arr.length);
  };
  const dsa = avg('DSA');
  const core = avg('CORE_CS');
  const communication = byId('communication')?.proficiency || 70;
  const projectsScore = 85;
  const resumeScore = resumes[0]?.jobMatchScore || 70;
  const interviewScore = interviews.length ? interviews[0].score : 58;

  const overall = Math.round(
    dsa * 0.2 +
      core * 0.2 +
      projectsScore * 0.15 +
      communication * 0.15 +
      resumeScore * 0.1 +
      interviewScore * 0.2,
  );

  const all = [
    ['DSA', dsa],
    ['Core CS', core],
    ['Projects', projectsScore],
    ['Communication', communication],
    ['Resume', resumeScore],
    ['Interview', interviewScore],
  ] as const;

  return {
    overallScore: overall,
    categories: {
      dsa,
      coreCS: core,
      projects: projectsScore,
      communication,
      resume: resumeScore,
      interview: interviewScore,
    },
    biggestBottleneck: [...all].sort((a, b) => (a[1] as number) - (b[1] as number))[0][0],
    nextBestAction: 'Improve Operating Systems and Trees fundamentals',
    trend: [
      { date: '2026-08-01', score: 65 },
      { date: '2026-08-10', score: 68 },
      { date: '2026-08-15', score: 70 },
      { date: '2026-08-20', score: overall },
    ],
  };
}

function fit(companyId: string) {
  const weighted = requirements.reduce((sum, [id, min, importance]) => {
    const s = byId(id);
    return sum + Math.min((s?.proficiency || 0) / min, 1) * importance;
  }, 0);
  const max = requirements.reduce((a, x) => a + x[2], 0);
  const skill = Math.round((weighted / max) * 60);
  const r = readiness();
  const score = Math.min(
    100,
    Math.round(
      skill +
        13 +
        Math.min(r.categories.communication, 100) * 0.1 +
        Math.min(r.categories.interview, 100) * 0.1 +
        r.categories.resume * 0.05,
    ),
  );
  const reqs = requirements.map((x) => byId(x[0])!).filter(Boolean);
  const matchedCompany = companies.find((c) => c.id === companyId) || companies[0];

  return {
    company: matchedCompany,
    role,
    fitScore: score,
    classification: score >= 80 ? 'BEST_FIT' : score >= 60 ? 'STRETCH' : 'FUTURE_TARGET',
    placementReadiness: r.overallScore,
    difficulty: matchedCompany.difficulty,
    estimatedPreparationWeeks: score >= 80 ? '4–6' : '6–10',
    matchedSkills: reqs.filter((s) => s.proficiency >= 70).map((s) => s.name),
    skillsToImprove: reqs.filter((s) => s.proficiency >= 40 && s.proficiency < 70).map((s) => s.name),
    missingSkills: reqs.filter((s) => s.proficiency < 40).map((s) => s.name),
    priorityTopics: ['Trees', 'Operating Systems', 'SQL Indexing'],
  };
}

function tree() {
  return skills.map((s) => {
    const prerequisites: Record<string, string[]> = {
      trees: ['arrays', 'linked_lists'],
      graphs: ['trees'],
      dynamic_programming: ['trees'],
    };
    const pre = prerequisites[s.id] || [];
    const unlocked = pre.every((id) => (byId(id)?.proficiency || 0) >= 70);
    if (s.id === 'graphs') s.status = unlocked ? 'SKILL_GAP' : 'LOCKED';
    return {
      ...s,
      prerequisites: pre,
      unlocks: s.id === 'trees' ? ['graphs'] : [],
      isUnlocked: unlocked || !pre.length,
      xpReward: 150,
      recommendedActions: ['Learn key concepts', 'Solve 5 problems', 'Take a mini assessment'],
    };
  });
}

function generateMission(wellbeing = 'FOCUSED') {
  const focus =
    skills.filter((s) => s.status !== 'MASTERED' && s.status !== 'LOCKED').sort((a, b) => a.proficiency - b.proficiency)[0] ||
    byId('trees')!;
  const reduce = wellbeing === 'STRESSED' ? 0.75 : 1;
  const tasks = [
    ['Learn ' + focus.name, 'LEARN', 20, 25],
    ['Solve 3 ' + focus.name + ' Problems', 'PRACTICE', 30, 50],
    [focus.name + ' Assessment', 'ASSESS', 10, 100],
    ['Explain ' + focus.name, 'INTERVIEW', 2, 50],
  ].map((x, i) => ({
    id: 'mission-' + Date.now() + '-' + i,
    title: x[0],
    type: x[1],
    estimatedMinutes: Math.max(2, Math.round(Number(x[2]) * reduce)),
    xpReward: Number(x[3]),
    status: i === 0 ? 'COMPLETED' : i === 1 ? 'IN_PROGRESS' : 'NOT_STARTED',
    skillId: focus.id,
  }));
  const mission = {
    id: 'today',
    date: new Date().toISOString().slice(0, 10),
    status: 'IN_PROGRESS',
    totalEstimatedMinutes: tasks.reduce((a, t) => a + t.estimatedMinutes, 0),
    tasks,
  };
  missions = [mission];
  return mission;
}

const validate = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const p = schema.safeParse(req.body);
  if (!p.success) return fail(res, 'Validation failed', 422, p.error.issues);
  req.body = p.data;
  next();
};

// Health & Status
app.get('/health', (_, res) => ok(res, { status: 'ok', mode: 'express-careeros' }));

// Auth Endpoints
app.post(
  '/api/auth/register',
  validate(z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8) })),
  asyncHandler(async (req, res) => {
    if (req.body.email === user.email) return fail(res, 'Email already registered', 409);
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    ok(res, { user: { ...user, name: req.body.name, email: req.body.email, passwordHash: undefined }, token: token(user.id) }, 201);
  }),
);

app.post(
  '/api/auth/login',
  validate(z.object({ email: z.string().email(), password: z.string() })),
  asyncHandler(async (req, res) => {
    const valid = req.body.email === user.email && (req.body.password === 'password123' || (await bcrypt.compare(req.body.password, user.passwordHash)));
    if (!valid) return fail(res, 'Invalid email or password', 401);
    ok(res, { token: token(user.id), user: { ...user, passwordHash: undefined } });
  }),
);

app.get('/api/auth/me', auth, (_, res) => ok(res, { ...user, passwordHash: undefined }));

// Profile & Skills
app.get('/api/profile', auth, (_, res) => ok(res, { ...user, passwordHash: undefined, projects, connections }));
app.put(
  '/api/profile',
  auth,
  validate(z.object({ name: z.string().min(2).optional(), targetRole: z.string().optional(), availableHoursPerDay: z.number().int().min(1).max(12).optional() })),
  (req, res) => {
    Object.assign(user, req.body);
    ok(res, user);
  },
);

app.get('/api/profile/skills', auth, (_, res) => ok(res, skills));
app.post(
  '/api/profile/skills',
  auth,
  validate(z.object({ skillId: z.string(), proficiency: z.number().min(0).max(100) })),
  (req, res) => {
    const s = byId(req.body.skillId);
    if (!s) return fail(res, 'Skill not found', 404);
    s.proficiency = req.body.proficiency;
    s.status = s.proficiency >= 80 ? 'MASTERED' : s.proficiency >= 40 ? 'IN_PROGRESS' : 'SKILL_GAP';
    ok(res, s, 201);
  },
);

app.get('/api/profile/projects', auth, (_, res) => ok(res, projects));
app.post(
  '/api/profile/projects',
  auth,
  validate(z.object({ title: z.string(), description: z.string(), technologies: z.string() })),
  (req, res) => {
    const p = { id: 'project-' + Date.now(), ...req.body };
    projects.push(p);
    ok(res, p, 201);
  },
);

app.get('/api/profile/connections', auth, (_, res) => ok(res, connections));
app.post(
  '/api/profile/connections',
  auth,
  validate(z.object({ platform: z.string(), username: z.string() })),
  (req, res) => {
    const c = { id: 'connection-' + Date.now(), ...req.body, isConnected: true, metadata: {} };
    connections.push(c);
    ok(res, c, 201);
  },
);

// Skill Tree & Roadmap
app.get('/api/skills/tree', auth, (_, res) => ok(res, { root: 'SOFTWARE_ENGINEER', skills: tree() }));

app.post('/api/analysis/skill-gap', auth, (_, res) => {
  const r = requirements.map((x) => ({ skill: byId(x[0])!, minimum: Number(x[1]), importance: Number(x[2]) }));
  ok(res, {
    strongSkills: r.filter((x) => x.skill.proficiency >= x.minimum).map((x) => x.skill.name),
    skillsToImprove: r.filter((x) => x.skill.proficiency >= 40 && x.skill.proficiency < x.minimum).map((x) => x.skill.name),
    missingSkills: r.filter((x) => x.skill.proficiency < 40).map((x) => x.skill.name),
    prioritySkills: r
      .filter((x) => x.skill.proficiency < x.minimum)
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 4)
      .map((x) => ({ skill: x.skill.name, priority: x.importance >= 8 ? 'HIGH' : 'MEDIUM', impact: x.importance >= 8 ? 'HIGH' : 'MEDIUM' })),
    estimatedImprovement: 6,
  });
});

app.get('/api/roadmap', auth, (_, res) => {
  const stages: [string, string[]][] = [
    ['Programming Fundamentals', ['python', 'javascript']],
    ['DSA Foundations', ['arrays', 'linked_lists']],
    ['Advanced DSA', ['trees', 'graphs', 'dynamic_programming']],
    ['Core CS', ['dbms', 'operating_systems', 'networks', 'oop']],
    ['Projects', ['python']],
    ['Interview Preparation', ['communication', 'interview_skills']],
  ];
  let current = false;
  ok(
    res,
    stages
      .map(([name, ids]) => {
        const ss = ids.map((id) => byId(id)!);
        const progress = Math.round(ss.reduce((a, s) => a + (s?.proficiency || 0), 0) / ss.length);
        const isCurrent = !current && progress < 75;
        current = current || isCurrent;
        return {
          name,
          status: progress >= 75 ? 'COMPLETED' : isCurrent ? 'CURRENT' : 'UP_NEXT',
          progress,
          skills: ss.map((s) => s.name),
          estimatedTime: progress < 50 ? '3–4 weeks' : '2 weeks',
          isCurrent,
        };
      })
      .concat([{ name: 'Placement Ready', status: 'LOCKED', progress: 0, skills: [], estimatedTime: 'Ongoing', isCurrent: false }]),
  );
});

// Learning
app.get('/api/learning/skills/:skillId', auth, (req, res) => {
  const s = byId(String(req.params.skillId));
  if (!s) return fail(res, 'Skill not found', 404);
  ok(res, {
    skill: s,
    learningResources: resources.filter((r) => r.skillId === s.id),
    practiceProblems: problems.filter((p) => p.skillId === s.id),
    assessment: assessments.find((a) => a.skillId === s.id),
    interviewChallenges: [`Explain ${s.name} to an interviewer.`],
    progression: ['LEARN', 'PRACTICE', 'ASSESS', 'INTERVIEW'],
  });
});

app.post('/api/learning/resource/:id/complete', auth, (req, res) => {
  const r = resources.find((x) => x.id === String(req.params.id));
  if (!r) return fail(res, 'Resource not found', 404);
  const s = byId(r.skillId)!;
  s.proficiency = Math.min(100, s.proficiency + 2);
  ok(res, { completed: true, updatedSkill: s, xpEarned: 25, gamification: addXP(25), updatedReadiness: readiness() });
});

app.post('/api/learning/problem/:id/complete', auth, (req, res) => {
  const p = problems.find((x) => x.id === String(req.params.id));
  if (!p) return fail(res, 'Problem not found', 404);
  const s = byId(p.skillId)!;
  s.proficiency = Math.min(100, s.proficiency + 3);
  ok(res, { completed: true, updatedSkill: s, xpEarned: p.xpReward, gamification: addXP(p.xpReward), updatedReadiness: readiness() });
});

app.post(
  '/api/learning/assessment/:id/submit',
  auth,
  validate(z.object({ score: z.number().min(0).max(100) })),
  (req, res) => {
    const a = assessments.find((x) => x.id === String(req.params.id));
    if (!a) return fail(res, 'Assessment not found', 404);
    const s = byId(a.skillId)!;
    s.proficiency = Math.min(100, Math.round(s.proficiency * 0.7 + req.body.score * 0.3));
    s.status = s.proficiency >= 80 ? 'MASTERED' : s.proficiency >= 40 ? 'IN_PROGRESS' : 'SKILL_GAP';
    const unlocked = tree()
      .filter((x) => x.isUnlocked && x.status === 'SKILL_GAP')
      .map((x) => x.name);
    ok(res, {
      updatedSkill: s,
      unlockedSkills: unlocked,
      xpEarned: 100,
      gamification: addXP(100),
      updatedReadiness: readiness(),
      recommendations: ['Practice one more Trees problem', 'Review BFS and DFS'],
    });
  },
);

// Companies
app.get('/api/companies', auth, (_, res) => ok(res, companies));
app.get('/api/companies/fit', auth, (_, res) => ok(res, companies.map((c) => fit(c.id)).sort((a, b) => b.fitScore - a.fitScore)));
app.get('/api/companies/:id', auth, (req, res) => {
  const c = companies.find((x) => x.id === String(req.params.id));
  if (!c) return fail(res, 'Company not found', 404);
  ok(res, { ...c, roles: [role], fit: fit(c.id) });
});

app.post('/api/target-company', auth, validate(z.object({ companyId: z.string(), jobRoleId: z.string().optional() })), (req, res) => {
  if (!companies.some((c) => c.id === req.body.companyId)) return fail(res, 'Company not found', 404);
  activeTarget = req.body.companyId;
  ok(res, { company: companies.find((c) => c.id === activeTarget), jobRole: role, isActive: true, selectedAt: new Date().toISOString() });
});

app.get('/api/target-company', auth, (_, res) => ok(res, { company: companies.find((c) => c.id === activeTarget), jobRole: role, isActive: true }));

// Missions
app.get('/api/missions/today', auth, (_, res) => ok(res, missions[0] || generateMission()));
app.post('/api/missions/generate', auth, validate(z.object({ wellbeing: z.enum(['FOCUSED', 'OKAY', 'STRESSED']).optional() })), (req, res) =>
  ok(res, generateMission(req.body.wellbeing)),
);
app.post('/api/missions/wellbeing', auth, validate(z.object({ wellbeing: z.enum(['FOCUSED', 'OKAY', 'STRESSED']) })), (req, res) =>
  ok(res, {
    wellbeing: req.body.wellbeing,
    mission: generateMission(req.body.wellbeing),
    message:
      req.body.wellbeing === 'STRESSED'
        ? "We've reduced your workload by 25% and retained only your highest-priority work."
        : 'Your mission has been calibrated.',
  }),
);

app.post('/api/missions/tasks/:id/complete', auth, (req, res) => {
  const m = missions[0] || generateMission();
  const task = m.tasks.find((t: any) => t.id === String(req.params.id));
  if (!task) return fail(res, 'Mission task not found', 404);
  task.status = 'COMPLETED';
  const s = byId(task.skillId);
  if (s) s.proficiency = Math.min(100, s.proficiency + 2);
  if (m.tasks.every((t: any) => t.status === 'COMPLETED')) {
    m.status = 'COMPLETED';
    task.xpReward += 200;
  }
  ok(res, { task, mission: m, xpEarned: task.xpReward, gamification: addXP(task.xpReward), updatedReadiness: readiness() });
});

// ==========================================
// AI & LLM ENDPOINTS
// ==========================================

// AI Status
app.get('/api/ai/status', (req: AuthenticatedRequest, res) => {
  const status = aiService.getAiStatus(req.customApiKey);
  ok(res, status);
});

// AI Mentor Chat
app.post(
  '/api/ai/chat',
  validate(
    z.object({
      messages: z.array(z.object({ role: z.enum(['user', 'assistant', 'system']), content: z.string() })),
      context: z
        .object({
          name: z.string().optional(),
          targetRole: z.string().optional(),
          targetCompany: z.string().optional(),
          readinessScore: z.number().optional(),
          level: z.number().optional(),
          xp: z.number().optional(),
          wellbeing: z.string().optional(),
        })
        .optional(),
    }),
  ),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const studentContext = {
      name: user.name,
      targetRole: user.targetRole,
      readinessScore: readiness().overallScore,
      level: user.currentLevel,
      xp: user.xp,
      targetCompany: companies.find((c) => c.id === activeTarget)?.name || 'TechNova',
      strongSkills: skills.filter((s) => s.proficiency >= 70).map((s) => s.name),
      weakSkills: skills.filter((s) => s.proficiency < 60).map((s) => s.name),
      ...req.body.context,
    };

    const result = await aiService.chatWithCareerMentor(req.body.messages, studentContext, req.customApiKey);
    addXP(10);
    ok(res, result);
  }),
);

// Dynamic AI Question Generation
app.post(
  '/api/ai/mock/question',
  validate(
    z.object({
      type: z.string(),
      skillOrTopic: z.string().optional(),
      companyName: z.string().optional(),
      difficulty: z.string().optional(),
    }),
  ),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const companyName = req.body.companyName || companies.find((c) => c.id === activeTarget)?.name;
    const result = await aiService.generateInterviewQuestion(
      {
        type: req.body.type,
        skillOrTopic: req.body.skillOrTopic,
        companyName,
        difficulty: req.body.difficulty,
      },
      req.customApiKey,
    );
    ok(res, result);
  }),
);

// AI Mock Answer Evaluation (standalone or combined with interview submission)
app.post(
  '/api/ai/mock/evaluate',
  validate(
    z.object({
      type: z.string(),
      question: z.string(),
      answer: z.string().min(5),
      companyName: z.string().optional(),
    }),
  ),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const companyName = req.body.companyName || companies.find((c) => c.id === activeTarget)?.name;
    const evaluation = await aiService.evaluateInterviewAnswer(
      {
        type: req.body.type,
        question: req.body.question,
        answer: req.body.answer,
        companyName,
      },
      req.customApiKey,
    );

    const record: InterviewRecord = {
      id: 'interview-' + Date.now(),
      type: req.body.type,
      companyId: activeTarget,
      question: req.body.question,
      answer: req.body.answer,
      ...evaluation,
      createdAt: new Date().toISOString(),
    };

    interviews.unshift(record);
    addXP(100);

    ok(res, {
      ...record,
      gamification: level(),
      updatedReadiness: readiness(),
    });
  }),
);

// Standard Interview Submission (enhanced with LLM evaluation)
app.post(
  '/api/interviews',
  auth,
  validate(z.object({ type: z.string(), companyId: z.string().optional(), question: z.string(), answer: z.string().min(5) })),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const targetComp = companies.find((c) => c.id === (req.body.companyId || activeTarget))?.name;
    const evaluation = await aiService.evaluateInterviewAnswer(
      {
        type: req.body.type,
        question: req.body.question,
        answer: req.body.answer,
        companyName: targetComp,
      },
      req.customApiKey,
    );

    const result: InterviewRecord = {
      id: 'interview-' + Date.now(),
      type: req.body.type,
      companyId: req.body.companyId || activeTarget,
      question: req.body.question,
      answer: req.body.answer,
      ...evaluation,
      createdAt: new Date().toISOString(),
    };

    interviews.unshift(result);
    addXP(100);
    ok(res, { ...result, gamification: level(), updatedReadiness: readiness() }, 201);
  }),
);

app.get('/api/interviews/questions', auth, (req, res) => {
  const type = (req.query.type as string) || 'TECHNICAL';
  const question =
    type === 'PROJECT'
      ? 'Explain why you chose PostgreSQL and Node.js for your project and the concurrency considerations.'
      : type === 'HR'
      ? 'Tell me about a time you had to pivot technical direction under a tight deadline.'
      : 'Explain the difference between a Binary Tree and a Binary Search Tree with time complexity trade-offs.';
  ok(res, { type, question, skillId: req.query.skillId || 'trees', companyId: req.query.companyId || activeTarget });
});

app.get('/api/interviews/history', auth, (_, res) =>
  ok(res, {
    attempts: interviews,
    trend: interviews
      .slice(0, 5)
      .reverse()
      .map((x, i) => ({ attempt: i + 1, score: x.score }))
      .concat(interviews.length ? [] : [{ attempt: 1, score: 62 }, { attempt: 2, score: 74 }]),
  }),
);

// Resume Endpoints
app.post(
  '/api/resumes',
  auth,
  validate(z.object({ title: z.string(), content: z.string().min(20), targetRole: z.string().default('Software Engineer') })),
  (req, res) => {
    const r = { id: 'resume-' + Date.now(), ...req.body, atsScore: 0, jobMatchScore: 0, keywordScore: 0 };
    resumes.push(r);
    ok(res, r, 201);
  },
);

app.get('/api/resumes', auth, (_, res) => ok(res, resumes));

app.post(
  '/api/resumes/:id/analyze',
  auth,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const r = resumes.find((x) => x.id === String(req.params.id));
    if (!r) return fail(res, 'Resume not found', 404);

    const targetComp = companies.find((c) => c.id === activeTarget)?.name;
    const analysis = await aiService.analyzeResumeWithAi(
      {
        resumeContent: r.content,
        targetRole: r.targetRole,
        companyName: targetComp,
      },
      req.customApiKey,
    );

    r.atsScore = analysis.atsScore;
    r.jobMatchScore = analysis.jobMatchScore;
    r.keywordScore = analysis.keywordScore;

    ok(res, analysis);
  }),
);

app.post(
  '/api/resumes/:id/tailor',
  auth,
  validate(z.object({ bullet: z.string().optional(), action: z.enum(['improve', 'concise', 'keywords', 'quantify', 'company']).default('improve'), companyName: z.string().optional() })),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const r = resumes.find((x) => x.id === String(req.params.id));
    if (!r) return fail(res, 'Resume not found', 404);

    const targetCompany = req.body.companyName || companies.find((c) => c.id === activeTarget)?.name || 'TechNova';
    const bulletToTailor = req.body.bullet || r.content.split('\n')[1] || r.content;

    const tailorResult = await aiService.tailorResumeBullet(
      {
        bulletText: bulletToTailor,
        action: req.body.action,
        targetCompany,
        targetRole: r.targetRole,
      },
      req.customApiKey,
    );

    ok(res, {
      originalId: r.id,
      title: `${r.title} — ${targetCompany} tailored`,
      ...tailorResult,
    });
  }),
);

// Standalone Bullet Tailoring Endpoint
app.post(
  '/api/ai/resume/tailor',
  validate(
    z.object({
      bulletText: z.string().min(5),
      action: z.enum(['improve', 'concise', 'keywords', 'quantify', 'company']),
      targetCompany: z.string().optional(),
      targetRole: z.string().optional(),
    }),
  ),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const result = await aiService.tailorResumeBullet(
      {
        bulletText: req.body.bulletText,
        action: req.body.action,
        targetCompany: req.body.targetCompany || companies.find((c) => c.id === activeTarget)?.name,
        targetRole: req.body.targetRole || user.targetRole,
      },
      req.customApiKey,
    );
    ok(res, result);
  }),
);

// Analytics & Future Scope
app.get('/api/readiness', auth, (_, res) => ok(res, readiness()));

app.get('/api/career/future-scope', auth, (_, res) =>
  ok(res, {
    targetRole: user.targetRole,
    futureDemand: 'HIGH',
    careerGrowth: 'STRONG',
    aiImpact: 'MODERATE',
    growthPotential: 4,
    emergingSkills: ['System Design', 'Cloud Computing', 'Distributed Systems', 'Agentic AI Workflows'],
    careerTimeline: [
      { year: '2026', role: 'Junior Software Engineer', state: 'CURRENT TARGET' },
      { year: '2028', role: 'Software Engineer' },
      { year: '2030', role: 'Senior Engineer' },
      { year: '2032+', role: 'Tech Lead · System Architect · AI Engineer · Engineering Manager' },
    ],
  }),
);

app.get('/api/career/alternative-paths', auth, (_, res) =>
  ok(res, [
    { role: 'AI Engineer', compatibility: 84, newSkillsRequired: ['Machine Learning', 'Deep Learning', 'Agentic Frameworks'] },
    { role: 'Data Engineer', compatibility: 76, newSkillsRequired: ['SQL Indexing', 'Data Pipelines', 'Kafka / Spark'] },
    { role: 'Cloud Engineer', compatibility: 72, newSkillsRequired: ['Cloud Infrastructure', 'Docker', 'Kubernetes'] },
    { role: 'Product Engineer', compatibility: 80, newSkillsRequired: ['Product Metrics', 'User Telemetry', 'Fullstack Optimization'] },
  ]),
);

// Dashboard
app.get('/api/dashboard', auth, (_, res) => {
  const f = fit(activeTarget);
  const m = missions[0] || generateMission();
  ok(res, {
    student: { id: user.id, name: user.name, targetRole: user.targetRole },
    placementReadiness: readiness(),
    ...level(),
    nextBestAction: { skill: 'Trees & Operating Systems', reason: 'Required by 4 of your 5 target companies.', estimatedImprovement: 6 },
    currentLearning: { skill: 'Trees', progress: byId('trees')?.proficiency || 60 },
    bestCompanyMatch: f,
    todayMission: m,
    recentAchievements: ['FIRST_MOCK', '7_DAY_STREAK', 'DSA_EXPLORER'],
    activeTargetCompany: f.company,
  });
});

app.use((_, res) => fail(res, 'Route not found', 404));
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  fail(res, 'Internal server error', 500);
});

export default app;
