import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Target,
  GraduationCap,
  BookOpen,
  Award,
  Layers,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { careerApi, OnboardingData, UserProfile } from '../../api';

interface OnboardingWizardProps {
  initialUser?: UserProfile;
  onClose: () => void;
  onComplete: (updatedUser: UserProfile) => void;
  act: (msg: string, inc?: number) => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  initialUser,
  onClose,
  onComplete,
  act,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [fullName, setFullName] = useState(initialUser?.fullName || 'Divya');
  const [college, setCollege] = useState('Vellore Institute of Technology');
  const [degree, setDegree] = useState('B.Tech in Computer Science');
  const [graduationYear, setGraduationYear] = useState(2026);
  const [location, setLocation] = useState('Bengaluru, India');
  const [weeklyAvailabilityHours, setWeeklyAvailabilityHours] = useState(15);
  const [workModePreference, setWorkModePreference] = useState<'Remote' | 'Hybrid' | 'On-site'>('Hybrid');

  // Career Intent
  const [targetRole, setTargetRole] = useState('Junior Frontend Developer');
  const [targetIndustry, setTargetIndustry] = useState('Fintech & SaaS');
  const [githubUrl, setGithubUrl] = useState('https://github.com/divya-dev');
  const [portfolioUrl, setPortfolioUrl] = useState('https://divya-portfolio.dev');

  // Diagnostic Quiz Questions by Role
  const roleQuestionBank: Record<
    string,
    {
      id: string;
      skill: string;
      question: string;
      options: string[];
      correctIndex: number;
    }[]
  > = {
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
      },
      {
        id: 'fe-q3',
        skill: 'Data Structures (Trees)',
        question: 'What is the average search time complexity in a balanced Binary Search Tree (BST)?',
        options: ['O(n)', 'O(log n)', 'O(1)'],
        correctIndex: 1,
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
      },
    ],
    'Data Analyst': [
      {
        id: 'da-q1',
        skill: 'SQL Grouping',
        question: 'Which clause is used to filter aggregated results after GROUP BY in SQL?',
        options: ['HAVING', 'WHERE', 'QUALIFY'],
        correctIndex: 0,
      },
      {
        id: 'da-q2',
        skill: 'Python Pandas',
        question: 'In Pandas, which method is best for imputing missing values with column means?',
        options: ['df.fillna(df.mean())', 'df.dropna()', 'df.replace_null()'],
        correctIndex: 0,
      },
      {
        id: 'da-q3',
        skill: 'Data Visualizations',
        question: 'Which visualization is ideal for showing weekly user cohort retention rates over time?',
        options: ['Cohort Heatmap / Triangle Grid', 'Pie Chart', 'Scatter Plot'],
        correctIndex: 0,
      },
      {
        id: 'da-q4',
        skill: 'Business Metrics',
        question: 'What does the LTV:CAC ratio evaluate in product growth analytics?',
        options: ['Customer lifetime value relative to acquisition cost', 'Daily active user count', 'Server load efficiency'],
        correctIndex: 0,
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
      },
      {
        id: 'ux-q2',
        skill: 'WCAG Accessibility',
        question: 'What is the minimum WCAG AA contrast ratio required for standard body text?',
        options: ['4.5:1', '3:1', '7:1'],
        correctIndex: 0,
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
      },
      {
        id: 'ba-q2',
        skill: 'Process Mapping',
        question: 'In BPMN process flowcharts, what does a diamond symbol denote?',
        options: ['Decision gateway / conditional branching', 'Start event', 'Database storage'],
        correctIndex: 0,
      },
      {
        id: 'ba-q3',
        skill: 'Acceptance Criteria',
        question: 'Which syntax structure is standard for BDD acceptance criteria?',
        options: ['Given [Context], When [Action], Then [Expected Outcome]', 'If, Else, Return', 'Try, Catch, Finally'],
        correctIndex: 0,
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
      },
    ],
  };

  const currentQuestions = roleQuestionBank[targetRole] || roleQuestionBank['Junior Frontend Developer'];
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    // initialize defaults
    const initial: Record<string, number> = {};
    currentQuestions.forEach((q) => {
      initial[q.id] = q.correctIndex;
    });
    setQuizAnswers(initial);
  }, [targetRole]);

  const handleFinishOnboarding = async () => {
    setLoading(true);
    const data: OnboardingData = {
      fullName,
      email: initialUser?.email || 'divya@careeros.demo',
      college,
      degree,
      graduationYear,
      location,
      targetRole,
      targetIndustry,
      preferredLanguage: 'English',
      weeklyAvailabilityHours,
      workModePreference,
      financialConstraints: false,
      githubUrl,
      portfolioUrl,
      diagnosticAnswers: quizAnswers,
    };

    try {
      const res = await careerApi.submitOnboarding(data);
      act(`Personalized Career Roadmap generated for ${targetRole}! (+100 XP)`, 100);
      onComplete(res.user);
      onClose();
    } catch {
      act(`Onboarding completed for ${targetRole}! (+100 XP)`, 100);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profileModalOverlay">
      <div
        className="profileModal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 680, maxHeight: '92vh', overflowY: 'auto' }}
      >
        {/* Stepper Header */}
        <div className="profileModalHeader">
          <div>
            <p className="eyebrow">CAREEROS ONBOARDING & DIAGNOSTIC CALIBRATION</p>
            <h2 style={{ fontSize: 20, margin: 0 }}>
              {step === 1 && '1. Personal & Academic Profile'}
              {step === 2 && '2. Target Career Intent'}
              {step === 3 && `3. Baseline Diagnostic: ${targetRole}`}
              {step === 4 && '4. Your Personalized Placement Plan'}
            </h2>
          </div>
          <button className="icon" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div style={{ display: 'flex', gap: 6, margin: '14px 0 20px' }}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: s <= step ? 'linear-gradient(90deg, #6353af, #86e5b1)' : '#252a3a',
              }}
            />
          ))}
        </div>

        {/* STEP 1: PERSONAL & ACADEMIC */}
        {step === 1 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div className="profileField">
                <span>Full Name</span>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="profileField">
                <span>College / Institute</span>
                <input value={college} onChange={(e) => setCollege(e.target.value)} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 12, marginBottom: 12 }}>
              <div className="profileField">
                <span>Degree Program</span>
                <input value={degree} onChange={(e) => setDegree(e.target.value)} required />
              </div>
              <div className="profileField">
                <span>Graduation Year</span>
                <input
                  type="number"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div className="profileField">
                <span>Current Location</span>
                <input value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
              <div className="profileField">
                <span>Weekly Study Hours</span>
                <input
                  type="number"
                  value={weeklyAvailabilityHours}
                  onChange={(e) => setWeeklyAvailabilityHours(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="profileActions">
              <button type="button" className="secondary" onClick={onClose}>
                Skip
              </button>
              <button className="primary" type="button" onClick={() => setStep(2)}>
                Next: Target Role <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CAREER INTENT */}
        {step === 2 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div className="profileField">
                <span>Primary Target Role</span>
                <select
                  className="filterSelect"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                >
                  <option value="Junior Frontend Developer">Junior Frontend Developer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Business Analyst">Business Analyst</option>
                </select>
              </div>
              <div className="profileField">
                <span>Target Industry</span>
                <input value={targetIndustry} onChange={(e) => setTargetIndustry(e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div className="profileField">
                <span>Work Mode Preference</span>
                <select
                  className="filterSelect"
                  value={workModePreference}
                  onChange={(e: any) => setWorkModePreference(e.target.value)}
                >
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
              <div className="profileField">
                <span>GitHub / Work Profile</span>
                <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
              </div>
            </div>

            <div className="profileActions">
              <button type="button" className="secondary" onClick={() => setStep(1)}>
                Back
              </button>
              <button className="primary" type="button" onClick={() => setStep(3)}>
                Next: Role Diagnostic <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DIAGNOSTIC QUIZ */}
        {step === 3 && (
          <div>
            <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
              Answer 5 role-specific diagnostic calibration questions to calculate your baseline placement readiness score for <b>{targetRole}</b>:
            </p>

            <div style={{ display: 'grid', gap: 14, marginBottom: 18 }}>
              {currentQuestions.map((q, qIndex) => (
                <div key={q.id} style={{ background: '#131520', padding: 12, borderRadius: 8, border: '1px solid #242a3c' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <b style={{ fontSize: 12, color: '#f0edff' }}>
                      Question {qIndex + 1}: {q.question}
                    </b>
                    <span className="pill purple" style={{ fontSize: 8 }}>{q.skill}</span>
                  </div>

                  <div style={{ display: 'grid', gap: 6 }}>
                    {q.options.map((opt, optIndex) => (
                      <label
                        key={optIndex}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          background: quizAnswers[q.id] === optIndex ? 'rgba(139,124,255,0.15)' : '#161928',
                          border: quizAnswers[q.id] === optIndex ? '1px solid #8777f2' : '1px solid #262c3e',
                          padding: '6px 10px',
                          borderRadius: 6,
                          fontSize: 11,
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={quizAnswers[q.id] === optIndex}
                          onChange={() => setQuizAnswers({ ...quizAnswers, [q.id]: optIndex })}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="profileActions">
              <button type="button" className="secondary" onClick={() => setStep(2)}>
                Back
              </button>
              <button className="primary" type="button" onClick={() => setStep(4)}>
                Calculate Plan & Readiness <Sparkles size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: INITIAL PLAN GENERATION */}
        {step === 4 && (
          <div>
            <div className="card" style={{ background: 'linear-gradient(135deg, #221940, #141724)', border: '1px solid #4a3d7d', padding: 18, marginBottom: 14 }}>
              <div className="cardTop">
                <div>
                  <span className="pill green">DIAGNOSTIC CALIBRATED</span>
                  <h3 style={{ fontSize: 17, margin: '6px 0 2px', color: '#f0edff' }}>Welcome to CareerOS, {fullName}!</h3>
                  <small style={{ color: '#8e96a8' }}>Target Role: <b>{targetRole}</b> ({targetIndustry}) · {workModePreference}</small>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <small style={{ color: '#8e96a8', display: 'block', fontSize: 10 }}>Baseline Readiness</small>
                  <b style={{ fontSize: 24, color: '#86e5b1' }}>68/100</b>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14, fontSize: 11 }}>
              <div className="card" style={{ background: '#121422', padding: 12, border: '1px solid #232a3c' }}>
                <b style={{ color: '#ffd175', display: 'block', marginBottom: 4 }}>🎯 Recommended First Project</b>
                <p style={{ margin: 0, color: '#c7cbde' }}>Student Placement Analytics Dashboard (React + TypeScript + Vitest)</p>
              </div>
              <div className="card" style={{ background: '#121422', padding: 12, border: '1px solid #232a3c' }}>
                <b style={{ color: '#86e5b1', display: 'block', marginBottom: 4 }}>👥 Matched Career Pod</b>
                <p style={{ margin: 0, color: '#c7cbde' }}>Frontend Pod Alpha · 7 active student peers & weekly mentor review</p>
              </div>
              <div className="card" style={{ background: '#121422', padding: 12, border: '1px solid #232a3c' }}>
                <b style={{ color: '#a89bff', display: 'block', marginBottom: 4 }}>📚 First Learning Path</b>
                <p style={{ margin: 0, color: '#c7cbde' }}>React Render Optimization, Async Error Handling & Vitest</p>
              </div>
              <div className="card" style={{ background: '#121422', padding: 12, border: '1px solid #232a3c' }}>
                <b style={{ color: '#86e5b1', display: 'block', marginBottom: 4 }}>💼 Matched Opportunity</b>
                <p style={{ margin: 0, color: '#c7cbde' }}>TechNova Labs Micro-Internship (₹3,500 stipend · 82% match)</p>
              </div>
            </div>

            <div className="card" style={{ marginBottom: 16, padding: 12 }}>
              <h4 style={{ margin: '0 0 8px', fontSize: 12, color: '#f0edff' }}>Your 12-Week Placement Action Plan</h4>
              <div style={{ display: 'grid', gap: 6, fontSize: 11 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#131520', padding: '6px 8px', borderRadius: 6 }}>
                  <CheckCircle2 size={12} color="#86e5b1" />
                  <span><b>Weeks 1–3:</b> Master {targetRole} Core Concepts & Diagnostic Gaps</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#131520', padding: '6px 8px', borderRadius: 6 }}>
                  <CheckCircle2 size={12} color="#86e5b1" />
                  <span><b>Weeks 4–6:</b> Build Verified Project Evidence with Senior Mentor Review</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#131520', padding: '6px 8px', borderRadius: 6 }}>
                  <CheckCircle2 size={12} color="#86e5b1" />
                  <span><b>Weeks 7–9:</b> Career Pod Collaboration & Workplace Simulation Drills</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#131520', padding: '6px 8px', borderRadius: 6 }}>
                  <CheckCircle2 size={12} color="#86e5b1" />
                  <span><b>Weeks 10–12:</b> Apply to Employer Micro-Internships & Unlock Referrals</span>
                </div>
              </div>
            </div>

            <div className="profileActions">
              <button className="primary full" onClick={handleFinishOnboarding} disabled={loading}>
                {loading ? 'Saving Plan...' : 'Launch Command Center Dashboard'} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
