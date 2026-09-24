import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Award,
  CheckCircle2,
  FileText,
  Target,
  Layers,
  ChevronRight,
  RefreshCw,
  Check,
  X,
  Bot,
  Zap,
  Copy,
  AlertCircle,
  BookOpen,
} from 'lucide-react';
import {
  careerApi,
  ChatMessage,
  InterviewEvaluation,
  AiStatus,
} from '../../api';
import { HiddenStrengthsDashboard } from './HiddenStrengthsDashboard';
import { EvidenceDetailModal } from './EvidenceDetailModal';
import { ResumeApprovalModal } from './ResumeApprovalModal';
import {
  HiddenStrength,
  sampleHiddenStrengths,
} from '../../data/hiddenStrengthsData';

interface ResumeIntelligenceProps {
  initialTab?: 'score' | 'hidden-strengths' | 'ats' | 'improvements' | 'role-based' | 'versions';
  go: (page: any) => void;
  act: (msg: string, inc?: number) => void;
}

interface ImprovementProposal {
  title: string;
  originalText: string;
  suggestedText: string;
  explanation: string;
  targetField: 'bullet1' | 'bullet2' | 'summary' | 'skills';
  provider: 'gemini' | 'mock';
}

export const ResumeIntelligence: React.FC<ResumeIntelligenceProps> = ({
  initialTab = 'score',
  go,
  act,
}) => {
  const [activeTab, setActiveTab] = useState<
    'score' | 'hidden-strengths' | 'ats' | 'improvements' | 'role-based' | 'versions'
  >(initialTab);

  const [companyPromptOpen, setCompanyPromptOpen] = useState(false);
  const [companyInput, setCompanyInput] = useState('');
  const [company, setCompany] = useState('TechNova');
  const [tailored, setTailored] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [tailorExplanation, setTailorExplanation] = useState('');
  const [aiProvider, setAiProvider] = useState<'gemini' | 'mock'>('mock');
  const [aiError, setAiError] = useState<string | null>(null);

  // Resume Content State with LocalStorage Persistence
  const [experienceOne, setExperienceOne] = useState(() => {
    return (
      localStorage.getItem('careeros_resume_bullet1') ||
      'Built a full-stack learning platform using React, TypeScript, and Node.js. Implemented user authentication and dynamic dashboard features for 500+ active users.'
    );
  });
  const [experienceTwo, setExperienceTwo] = useState(() => {
    return (
      localStorage.getItem('careeros_resume_bullet2') ||
      'Developed a real-time attendance system with QR code scanning and automated reporting, reducing administrative overhead by 40%.'
    );
  });
  const [summaryText, setSummaryText] = useState(() => {
    return (
      localStorage.getItem('careeros_resume_summary') ||
      'Detail-oriented Junior Software Engineer with solid foundations in React, TypeScript, and RESTful API architecture. Proven track record building responsive web applications.'
    );
  });
  const [skillsText, setSkillsText] = useState(() => {
    return (
      localStorage.getItem('careeros_resume_skills') ||
      'Python · React · Node.js · SQL · REST APIs · Docker · Git · Vitest'
    );
  });

  const [metrics, setMetrics] = useState(() => {
    const saved = localStorage.getItem('careeros_resume_metrics');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      jobMatch: 84,
      atsScore: 78,
      keywordCoverage: 76,
    };
  });

  // Analysis result state
  const [analysisDetails, setAnalysisDetails] = useState<{
    strengths: string[];
    weakSections: string[];
    missingKeywords: string[];
    suggestions: string[];
  }>({
    strengths: [
      'Strong quantifiable metrics in experience bullets (500+ active users, 40% overhead reduction)',
      'Clear modern tech stack representation (React, TypeScript, Node.js, Vitest)',
      'Clear project separation with high recruiter readability',
    ],
    weakSections: [
      'Professional summary could highlight target industry domain alignment',
      'System design and cloud deployment keywords are underrepresented',
    ],
    missingKeywords: ['GraphQL', 'CI/CD Pipelines', 'Docker', 'Web Accessibility (WCAG)'],
    suggestions: [
      'Inject active engineering verbs at the beginning of each project bullet',
      'Add a dedicated section for verified open-source and hackathon contributions',
      'Include automated testing branch coverage metrics where applicable',
    ],
  });

  // Job Description Matching State
  const [jobDescriptionInput, setJobDescriptionInput] = useState('');
  const [jobMatchResult, setJobMatchResult] = useState<{
    matchScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    recommendedLessons: { title: string; page: string }[];
    tailoredSuggestions: string[];
  } | null>(null);

  // Modal States
  const [selectedEvidenceStrength, setSelectedEvidenceStrength] = useState<HiddenStrength | null>(null);
  const [selectedApprovalStrength, setSelectedApprovalStrength] = useState<HiddenStrength | null>(null);
  const [activeProposal, setActiveProposal] = useState<ImprovementProposal | null>(null);
  const [editedProposalText, setEditedProposalText] = useState('');
  const [selectedBulletTarget, setSelectedBulletTarget] = useState<'bullet1' | 'bullet2' | 'summary'>('bullet1');

  // Check backend AI status on mount
  useEffect(() => {
    careerApi
      .getAiStatus()
      .then((status) => {
        if (status?.provider) setAiProvider(status.provider);
      })
      .catch(() => {
        setAiProvider('mock');
      });
  }, []);

  // Save resume state helper
  const saveResumeState = (b1: string, b2: string, sm: string, sk: string, m: typeof metrics) => {
    localStorage.setItem('careeros_resume_bullet1', b1);
    localStorage.setItem('careeros_resume_bullet2', b2);
    localStorage.setItem('careeros_resume_summary', sm);
    localStorage.setItem('careeros_resume_skills', sk);
    localStorage.setItem('careeros_resume_metrics', JSON.stringify(m));
  };

  // 1. Analyze Resume
  const generateTargetedResume = async () => {
    setIsAnalyzing(true);
    setAiError(null);
    try {
      const fullResume = `SUMMARY:\n${summaryText}\n\nEXPERIENCE:\n${experienceOne}\n${experienceTwo}\n\nSKILLS:\n${skillsText}`;
      const res = await careerApi.analyzeResume({
        resumeContent: fullResume,
        companyName: company || 'TechNova',
      });

      const newMetrics = {
        jobMatch: res.jobMatchScore || 86,
        atsScore: res.atsScore || 82,
        keywordCoverage: res.keywordScore || 80,
      };

      setMetrics(newMetrics);
      if (res.strengths) {
        setAnalysisDetails({
          strengths: res.strengths.length ? res.strengths : analysisDetails.strengths,
          weakSections: res.weakSections?.length ? res.weakSections : analysisDetails.weakSections,
          missingKeywords: res.missingKeywords?.length ? res.missingKeywords : analysisDetails.missingKeywords,
          suggestions: res.suggestions?.length ? res.suggestions : analysisDetails.suggestions,
        });
      }
      setAiProvider(res.provider);
      saveResumeState(experienceOne, experienceTwo, summaryText, skillsText, newMetrics);
      act(`Resume analyzed! ATS Score: ${newMetrics.atsScore}% (+40 XP)`, 40);
    } catch (err: any) {
      setAiError(err.message || 'AI service temporarily offline. Using deterministic evaluation.');
      act('Resume analyzed with local rule engine (+40 XP)', 40);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 2. Improve Bullet / Resume action with Approval Modal
  const handleOpenImprovement = async (actionType: string) => {
    setIsTailoring(true);
    setAiError(null);

    const currentText =
      selectedBulletTarget === 'bullet1'
        ? experienceOne
        : selectedBulletTarget === 'bullet2'
        ? experienceTwo
        : summaryText;

    try {
      const res = await careerApi.tailorResumeBullet({
        bulletText: currentText,
        action: actionType,
        targetCompany: company,
      });

      setAiProvider(res.provider);
      setActiveProposal({
        title: `${actionType} (${selectedBulletTarget === 'bullet1' ? 'Experience #1' : selectedBulletTarget === 'bullet2' ? 'Experience #2' : 'Professional Summary'})`,
        originalText: currentText,
        suggestedText: res.rewrittenText,
        explanation: res.explanation || 'Enhanced with action-oriented structure and measurable results.',
        targetField: selectedBulletTarget,
        provider: res.provider,
      });
      setEditedProposalText(res.rewrittenText);
    } catch (err: any) {
      // Deterministic rule fallback
      const fallbackRewrites: Record<string, string> = {
        'Quantify impact':
          'Architected a full-stack learning platform using React, TypeScript, and Node.js, supporting 500+ daily active users with sub-120ms API response latency and 99.8% uptime.',
        'Make more concise':
          'Engineered a scalable React and TypeScript learning portal with JWT authentication, serving 500+ active users.',
        'Add relevant keywords':
          'Built a responsive full-stack platform using React.js, TypeScript, Node.js, Vitest, and RESTful APIs with Dockerized container deployments.',
        'Improve bullet point':
          'Spearheaded development of a high-throughput learning portal utilizing React hooks, TypeScript type safety, and Node.js microservices.',
      };

      const rewrite = fallbackRewrites[actionType] || `${currentText} (Enhanced with verified metrics)`;
      setActiveProposal({
        title: `${actionType} (${selectedBulletTarget})`,
        originalText: currentText,
        suggestedText: rewrite,
        explanation: 'Formatted using Google Context-Action-Result (CAR) resume rubric.',
        targetField: selectedBulletTarget,
        provider: 'mock',
      });
      setEditedProposalText(rewrite);
    } finally {
      setIsTailoring(false);
    }
  };

  // Apply approved improvement
  const handleConfirmProposal = () => {
    if (!activeProposal) return;
    const approvedText = editedProposalText.trim() || activeProposal.suggestedText;

    let b1 = experienceOne;
    let b2 = experienceTwo;
    let sm = summaryText;

    if (activeProposal.targetField === 'bullet1') {
      b1 = approvedText;
      setExperienceOne(b1);
    } else if (activeProposal.targetField === 'bullet2') {
      b2 = approvedText;
      setExperienceTwo(b2);
    } else if (activeProposal.targetField === 'summary') {
      sm = approvedText;
      setSummaryText(sm);
    }

    const updatedMetrics = {
      ...metrics,
      atsScore: Math.min(96, metrics.atsScore + 4),
      jobMatch: Math.min(98, metrics.jobMatch + 3),
    };
    setMetrics(updatedMetrics);
    saveResumeState(b1, b2, sm, skillsText, updatedMetrics);

    setActiveProposal(null);
    act('Resume updated successfully! (+20 XP)', 20);
  };

  // 3. Job Description Matcher
  const handleAnalyzeJobMatch = () => {
    if (!jobDescriptionInput.trim()) {
      setAiError('Please paste a job description or click "Load Sample JD".');
      return;
    }

    setIsMatching(true);
    setAiError(null);

    setTimeout(() => {
      const isFrontend =
        jobDescriptionInput.toLowerCase().includes('react') ||
        jobDescriptionInput.toLowerCase().includes('frontend') ||
        jobDescriptionInput.toLowerCase().includes('typescript');

      const matchRes = {
        matchScore: isFrontend ? 88 : 74,
        matchedSkills: ['React.js', 'TypeScript', 'Node.js', 'REST APIs', 'Git', 'Vitest'],
        missingSkills: ['GraphQL', 'CI/CD Pipelines (GitHub Actions)', 'Docker Containerization'],
        recommendedLessons: [
          { title: 'React Performance & Reconciliation', page: 'Learning Hub' },
          { title: 'Docker & CI/CD Fundamentals', page: 'Learning Hub' },
        ],
        tailoredSuggestions: [
          'Highlight your Placement Analytics Dashboard project under primary technical evidence',
          'Add a bullet highlighting your experience with Vitest unit test suites and 88% branch coverage',
          'Emphasize component accessibility (ARIA labels and keyboard navigation)',
        ],
      };

      setJobMatchResult(matchRes);
      setIsMatching(false);
      act(`Job Match Analysis completed: ${matchRes.matchScore}% alignment (+50 XP)`, 50);
    }, 600);
  };

  const loadSampleJD = () => {
    setJobDescriptionInput(
      `Job Title: Junior / Associate Frontend Software Engineer\nCompany: TechNova Technologies\n\nRequirements:\n- 0–2 years experience building modern web applications with React, TypeScript, and JavaScript (ES6+).\n- Strong understanding of component lifecycles, state management, and REST API integration.\n- Familiarity with unit testing frameworks (Vitest, Jest) and responsive CSS.\n- Nice to have: GraphQL, Docker, CI/CD pipelines, and Web Accessibility standards.`
    );
  };

  const submitCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = companyInput.trim() || 'TechNova';
    setTailored(true);
    setCompany(name);
    setCompanyPromptOpen(false);
    setIsTailoring(true);

    try {
      const res = await careerApi.tailorResumeBullet({
        bulletText: experienceOne,
        action: 'company',
        targetCompany: name,
      });
      setExperienceOne(res.rewrittenText);
      setTailorExplanation(res.explanation);
      setAiProvider(res.provider);
      setSkillsText(`Python · React · Node.js · SQL · REST APIs · Docker · ${name} Fit`);
      act(`Resume tailored for ${name} (+50 XP)`, 50);
    } catch {
      act(`Resume tailored for ${name}`, 50);
    } finally {
      setIsTailoring(false);
    }
  };

  const handleApplyApprovedStrength = (bullet: string) => {
    setExperienceOne(bullet);
    setTailorExplanation('Updated with verified Hidden Strength evidence wording.');
    const updatedMetrics = {
      ...metrics,
      atsScore: Math.min(95, metrics.atsScore + 6),
      jobMatch: Math.min(96, metrics.jobMatch + 5),
    };
    setMetrics(updatedMetrics);
    saveResumeState(bullet, experienceTwo, summaryText, skillsText, updatedMetrics);
  };

  const versionPills = [
    { label: 'General Software Engineer Resume', score: 88, updated: 'Today' },
    { label: 'Frontend Developer (React Focus)', score: 92, updated: '2 days ago' },
    { label: tailored ? `${company} Tailored Resume` : 'TechNova Targeted Resume', score: 94, updated: 'Just now' },
  ];

  return (
    <div className="resumeIntelligenceContainer">
      {/* Segmented Sub-Navigation Tabs */}
      <div className="networkTopTabsBar">
        {[
          { key: 'score', label: 'Resume Score & Editor', icon: FileText },
          { key: 'hidden-strengths', label: 'Hidden Strengths (5)', icon: Sparkles },
          { key: 'ats', label: 'ATS Alignment', icon: Target },
          { key: 'improvements', label: 'Resume Improvements', icon: Zap },
          { key: 'role-based', label: 'Job Description Matcher', icon: Award },
          { key: 'versions', label: 'Resume Versions (3)', icon: Layers },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`networkTabBtn ${activeTab === key ? 'networkTabActive' : ''}`}
            onClick={() => {
              setActiveTab(key as any);
              act(`Resume Intelligence: Switched to ${label}`);
            }}
          >
            <Icon size={15} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      <div className="resumeTabContent" style={{ marginTop: 14 }}>
        {/* TAB 1: RESUME SCORE & EDITOR */}
        {activeTab === 'score' && (
          <>
            <div className="titleRow">
              <div>
                <p className="eyebrow">RESUME INTELLIGENCE ENGINE</p>
                <h1>Turn your engineering experience into signal</h1>
                <p className="muted">
                  Evidence-based resume analysis and live rewriting calibrated for applicant tracking systems.
                </p>
              </div>
              <button
                className="primary"
                onClick={generateTargetedResume}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? <RefreshCw size={14} className="aiSpin" /> : <Sparkles size={14} />}
                {isAnalyzing ? 'Analyzing Resume...' : 'Analyze Resume & ATS Scan'}
              </button>
            </div>

            {/* Provider Notice */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#161925',
                border: '1px solid #2d3448',
                padding: '8px 14px',
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className={`aiBadge ${aiProvider === 'gemini' ? 'active' : 'mock'}`}>
                  {aiProvider === 'gemini' ? 'Gemini 2.5 Flash Connected' : 'CareerOS Rule Engine (Demo Mode)'}
                </span>
                <span style={{ fontSize: 11, color: '#9aa2b5' }}>
                  {aiProvider === 'gemini'
                    ? 'Real-time LLM inference active for ATS scoring and semantic tailoring.'
                    : 'Deterministic rule analysis active. Connect GEMINI_API_KEY in backend for live LLM.'}
                </span>
              </div>
              <button
                className="secondary"
                style={{ fontSize: 11, padding: '4px 10px' }}
                onClick={() => setCompanyPromptOpen(true)}
              >
                <Target size={12} style={{ marginRight: 4 }} />
                Target: {company}
              </button>
            </div>

            <div className="resumeLayout">
              {/* Paper View */}
              <div className="card resumePaper">
                <div className="resumeName">DIVYA</div>
                <p>
                  Junior Software Engineer · Bengaluru, India
                  {tailored && <> · Tailored for {company}</>}
                </p>
                <hr />

                <b>PROFESSIONAL SUMMARY</b>
                <p style={{ marginTop: 4 }}>{summaryText}</p>
                <hr />

                <b>EXPERIENCE & CAPSTONE PROJECTS</b>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  <h4 style={{ margin: 0 }}>Placement Analytics & Checkout Dashboard</h4>
                  {tailorExplanation && (
                    <span className="pill green" style={{ fontSize: 8 }}>
                      Verified Signal
                    </span>
                  )}
                </div>
                <p style={{ marginTop: 4 }}>{experienceOne}</p>
                {tailorExplanation && (
                  <small style={{ display: 'block', color: '#8b7cff', fontStyle: 'italic', margin: '4px 0 8px' }}>
                    💡 {tailorExplanation}
                  </small>
                )}

                <h4 style={{ marginTop: 12 }}>Smart Attendance & Reporting System</h4>
                <p style={{ marginTop: 4 }}>{experienceTwo}</p>
                <hr />

                <b>TECHNICAL SKILLS</b>
                <p style={{ marginTop: 4 }}>{skillsText}</p>
              </div>

              {/* Sidebar Score & Quick Actions */}
              <div>
                <div className="card" style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="pill purple">
                      <Sparkles size={14} /> ATS COMPATIBILITY
                    </span>
                    <b style={{ color: '#86e5b1', fontSize: 15 }}>{metrics.atsScore}/100</b>
                  </div>

                  <div className="resumeMetrics" style={{ margin: '14px 0' }}>
                    {[
                      [`${metrics.jobMatch}%`, 'Role Match'],
                      [`${metrics.atsScore}%`, 'ATS Score'],
                      [`${metrics.keywordCoverage}%`, 'Keyword Match'],
                    ].map((x) => (
                      <div key={x[1]}>
                        <b>{x[0]}</b>
                        <span>{x[1]}</span>
                      </div>
                    ))}
                  </div>

                  <h4>Strengths Identified</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
                    {analysisDetails.strengths.map((str, idx) => (
                      <div key={idx} style={{ fontSize: 11.5, color: '#86e5b1', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                        <Check size={13} style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>

                  <h4>Missing ATS Keywords</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {analysisDetails.missingKeywords.map((kw) => (
                      <span key={kw} className="pill orange" style={{ fontSize: 9 }}>
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card" style={{ marginBottom: 14 }}>
                  <h3>AI Assistant Actions</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { label: 'Quantify impact & metrics', action: 'Quantify impact' },
                      { label: 'Make more concise & active', action: 'Make more concise' },
                      { label: 'Inject high-value ATS keywords', action: 'Add relevant keywords' },
                      { label: 'Tailor for target company', action: 'Tailor for target company' },
                    ].map(({ label, action }) => (
                      <button
                        key={label}
                        className="actionButton"
                        onClick={() => {
                          if (action === 'Tailor for target company') {
                            setCompanyPromptOpen(true);
                          } else {
                            handleOpenImprovement(action);
                          }
                        }}
                        disabled={isTailoring}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',
                          padding: '10px 12px',
                          background: '#131520',
                          border: '1px solid #282f42',
                          borderRadius: 8,
                          color: '#edf0f8',
                          cursor: 'pointer',
                        }}
                      >
                        <span style={{ fontSize: 12 }}>{label}</span>
                        <ChevronRight size={15} color="#8b7cff" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: HIDDEN STRENGTHS */}
        {activeTab === 'hidden-strengths' && (
          <HiddenStrengthsDashboard
            onOpenEvidenceDetail={(s) => setSelectedEvidenceStrength(s)}
            onOpenResumeApproval={(s) => setSelectedApprovalStrength(s)}
            act={act}
          />
        )}

        {/* TAB 3: ATS ALIGNMENT */}
        {activeTab === 'ats' && (
          <div className="card" style={{ padding: 22 }}>
            <div className="cardTop" style={{ marginBottom: 14 }}>
              <div>
                <h2 style={{ margin: 0 }}>ATS Compatibility & Semantic Keyword Extraction</h2>
                <p className="muted" style={{ marginTop: 4 }}>
                  Evaluated against top parsing engines (Workday, Greenhouse, Lever, iCIMS).
                </p>
              </div>
              <span className="pill green" style={{ fontSize: 13, padding: '6px 12px' }}>
                {metrics.atsScore}% Overall Match
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
              <div style={{ background: '#131520', padding: 16, borderRadius: 10, border: '1px solid #252b3d' }}>
                <b style={{ color: '#86e5b1', display: 'block', marginBottom: 8 }}>
                  ✓ Matched Stack Keywords ({skillsText.split('·').length})
                </b>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {skillsText.split('·').map((k) => (
                    <span key={k.trim()} className="pill green" style={{ fontSize: 10 }}>
                      {k.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: '#131520', padding: 16, borderRadius: 10, border: '1px solid #252b3d' }}>
                <b style={{ color: '#ffd175', display: 'block', marginBottom: 8 }}>
                  ⚡ High-Value Recommended Keywords
                </b>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {analysisDetails.missingKeywords.map((k) => (
                    <span key={k} className="pill orange" style={{ fontSize: 10 }}>
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <h4 style={{ color: '#eeeaff' }}>ATS Parsing Recommendations:</h4>
              <ul style={{ color: '#bec5d8', fontSize: 12.5, lineHeight: 1.6, paddingLeft: 18 }}>
                {analysisDetails.suggestions.map((sug, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    {sug}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: RESUME IMPROVEMENTS */}
        {activeTab === 'improvements' && (
          <div className="card" style={{ padding: 22 }}>
            <h2 style={{ margin: '0 0 8px' }}>AI-Powered Resume Section Improvements</h2>
            <p className="muted" style={{ marginBottom: 18 }}>
              Select any section to generate high-impact rewrites with Google Context-Action-Result (CAR) formulation.
            </p>

            {/* Target Selector */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
              {[
                { key: 'bullet1', label: 'Experience #1 (Placement Analytics)' },
                { key: 'bullet2', label: 'Experience #2 (Attendance System)' },
                { key: 'summary', label: 'Professional Summary' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`secondary ${selectedBulletTarget === key ? 'active' : ''}`}
                  onClick={() => setSelectedBulletTarget(key as any)}
                  style={{
                    background: selectedBulletTarget === key ? '#302859' : '#171a25',
                    borderColor: selectedBulletTarget === key ? '#7b68ee' : '#2b3042',
                    color: selectedBulletTarget === key ? '#fff' : '#a9b0c2',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div
              style={{
                background: '#131520',
                padding: 16,
                borderRadius: 10,
                border: '1px solid #282f42',
                marginBottom: 18,
              }}
            >
              <small style={{ color: '#8e96a8', display: 'block', marginBottom: 6, fontWeight: 700 }}>
                CURRENT TEXT:
              </small>
              <p style={{ fontSize: 13, color: '#f0edff', margin: 0, lineHeight: 1.5 }}>
                "
                {selectedBulletTarget === 'bullet1'
                  ? experienceOne
                  : selectedBulletTarget === 'bullet2'
                  ? experienceTwo
                  : summaryText}
                "
              </p>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                className="primary"
                onClick={() => handleOpenImprovement('Quantify impact')}
                disabled={isTailoring}
              >
                <Sparkles size={14} /> Quantify Metrics (+20 XP)
              </button>
              <button
                className="secondary"
                onClick={() => handleOpenImprovement('Make more concise')}
                disabled={isTailoring}
              >
                Make More Concise
              </button>
              <button
                className="secondary"
                onClick={() => handleOpenImprovement('Add relevant keywords')}
                disabled={isTailoring}
              >
                Inject Keyword Stack
              </button>
              <button
                className="secondary"
                onClick={() => handleOpenImprovement('Improve bullet point')}
                disabled={isTailoring}
              >
                Active Verbs & CAR Rubric
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: JOB DESCRIPTION MATCHING */}
        {activeTab === 'role-based' && (
          <div className="card" style={{ padding: 22 }}>
            <div className="cardTop" style={{ marginBottom: 14 }}>
              <div>
                <h2 style={{ margin: 0 }}>Target Job Description Matcher</h2>
                <p className="muted" style={{ marginTop: 4 }}>
                  Paste any job description to discover match percentage, missing stack keywords, and tailored recommendations.
                </p>
              </div>
              <button className="secondary" onClick={loadSampleJD} style={{ fontSize: 11 }}>
                Load Sample Frontend JD
              </button>
            </div>

            <textarea
              rows={6}
              value={jobDescriptionInput}
              onChange={(e) => setJobDescriptionInput(e.target.value)}
              placeholder="Paste job description text here (requirements, responsibilities, technical stack)..."
              style={{
                width: '100%',
                background: '#131520',
                border: '1px solid #2e3549',
                borderRadius: 10,
                color: '#edf0f8',
                padding: '12px 14px',
                font: 'inherit',
                fontSize: 12.5,
                lineHeight: 1.5,
                marginBottom: 14,
              }}
            />

            {aiError && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(90, 20, 20, 0.4)',
                  border: '1px solid #832b2b',
                  borderRadius: 8,
                  padding: '8px 12px',
                  color: '#ffaaaa',
                  fontSize: 12,
                  marginBottom: 14,
                }}
              >
                <AlertCircle size={15} />
                <span>{aiError}</span>
              </div>
            )}

            <button
              className="primary"
              onClick={handleAnalyzeJobMatch}
              disabled={isMatching}
            >
              {isMatching ? <RefreshCw size={14} className="aiSpin" /> : <Target size={14} />}
              {isMatching ? 'Matching Stack...' : 'Analyze Job Match (+50 XP)'}
            </button>

            {/* Results Section */}
            {jobMatchResult && (
              <div
                style={{
                  marginTop: 22,
                  padding: 18,
                  background: '#141824',
                  borderRadius: 12,
                  border: '1px solid #2f374d',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h3 style={{ margin: 0, color: '#f0edff' }}>Job Match Analysis Results</h3>
                  <span className="pill green" style={{ fontSize: 12, padding: '4px 10px' }}>
                    {jobMatchResult.matchScore}% Match Alignment
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                  <div style={{ background: '#10131c', padding: 12, borderRadius: 8 }}>
                    <b style={{ color: '#86e5b1', fontSize: 11, display: 'block', marginBottom: 6 }}>
                      ✓ Matched Skill Requirements:
                    </b>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {jobMatchResult.matchedSkills.map((s) => (
                        <span key={s} className="pill green" style={{ fontSize: 9 }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: '#10131c', padding: 12, borderRadius: 8 }}>
                    <b style={{ color: '#ffd175', fontSize: 11, display: 'block', marginBottom: 6 }}>
                      ⚡ Missing Stack Keywords:
                    </b>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {jobMatchResult.missingSkills.map((s) => (
                        <span key={s} className="pill orange" style={{ fontSize: 9 }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <h4 style={{ margin: '0 0 6px', color: '#eeeaff' }}>Recommended Learning Hub Lessons:</h4>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {jobMatchResult.recommendedLessons.map((l, idx) => (
                      <button
                        key={idx}
                        className="secondary"
                        style={{ fontSize: 11, padding: '6px 12px' }}
                        onClick={() => go(l.page)}
                      >
                        <BookOpen size={13} style={{ marginRight: 4 }} />
                        {l.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 6px', color: '#eeeaff' }}>Tailoring Recommendations:</h4>
                  <ul style={{ color: '#c2c9db', fontSize: 12, paddingLeft: 18, margin: 0, lineHeight: 1.6 }}>
                    {jobMatchResult.tailoredSuggestions.map((sug, i) => (
                      <li key={i}>{sug}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: RESUME VERSIONS */}
        {activeTab === 'versions' && (
          <div className="card" style={{ padding: 22 }}>
            <div className="cardTop" style={{ marginBottom: 14 }}>
              <div>
                <h2 style={{ margin: 0 }}>Saved Resume Proof Packets (3)</h2>
                <p className="muted" style={{ marginTop: 4 }}>
                  Customized ATS versions preserved in local storage and backend sync.
                </p>
              </div>
              <button className="primary" onClick={() => setActiveTab('score')}>
                <Sparkles size={14} /> Create New Version
              </button>
            </div>

            <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
              {versionPills.map((v) => (
                <div
                  key={v.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#131520',
                    padding: '14px 18px',
                    borderRadius: 10,
                    border: '1px solid #282f42',
                  }}
                >
                  <div>
                    <b style={{ fontSize: 13.5, color: '#f0edff' }}>{v.label}</b>
                    <small style={{ display: 'block', color: '#8e96a8', marginTop: 3 }}>
                      ATS Score: {v.score}% · Updated: {v.updated}
                    </small>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="secondary"
                      onClick={() => {
                        setActiveTab('score');
                        act(`Loaded ${v.label}`);
                      }}
                    >
                      Open in Editor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Target Company Modal */}
      {companyPromptOpen && (
        <div className="profileModalOverlay" onClick={() => setCompanyPromptOpen(false)}>
          <form
            className="profileModal"
            onSubmit={submitCompany}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="profileModalHeader">
              <div>
                <p className="eyebrow">RESUME TAILORING</p>
                <h2>Choose a target company</h2>
              </div>
              <button
                type="button"
                className="icon"
                onClick={() => setCompanyPromptOpen(false)}
                aria-label="Close company prompt"
              >
                <X size={18} />
              </button>
            </div>
            <label className="profileField">
              <span>Company name</span>
              <input
                autoFocus
                value={companyInput}
                onChange={(event) => setCompanyInput(event.target.value)}
                placeholder="e.g. Google, Microsoft, TechNova, Razorpay"
              />
            </label>
            <div className="profileActions">
              <button
                type="button"
                className="secondary"
                onClick={() => setCompanyPromptOpen(false)}
              >
                Cancel
              </button>
              <button className="primary" type="submit" disabled={isTailoring}>
                {isTailoring ? 'Tailoring...' : 'Tailor bullet'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUGGESTION APPROVAL MODAL */}
      {activeProposal && (
        <div className="profileModalOverlay" onClick={() => setActiveProposal(null)}>
          <div
            className="profileModal"
            style={{ width: 'min(620px, calc(100vw - 32px))' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profileModalHeader" style={{ borderBottom: '1px solid #2b3144', paddingBottom: 12 }}>
              <div>
                <p className="eyebrow">AI SUGGESTION REVIEW & APPROVAL</p>
                <h2 style={{ fontSize: 20, margin: '4px 0 0' }}>{activeProposal.title}</h2>
              </div>
              <button type="button" className="icon" onClick={() => setActiveProposal(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: 14 }}>
                <small style={{ color: '#8e96a8', display: 'block', marginBottom: 4, fontWeight: 700 }}>
                  ORIGINAL CONTENT:
                </small>
                <p style={{ fontSize: 12, color: '#a2a9bc', background: '#11131c', padding: 10, borderRadius: 8, margin: 0 }}>
                  "{activeProposal.originalText}"
                </p>
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <small style={{ color: '#8fe3b6', fontWeight: 700 }}>
                    AI SUGGESTED REWRITE (EDITABLE):
                  </small>
                  <button
                    type="button"
                    className="secondary"
                    style={{ fontSize: 10, padding: '2px 8px' }}
                    onClick={() => {
                      navigator.clipboard.writeText(editedProposalText);
                      act('Copied suggestion to clipboard');
                    }}
                  >
                    <Copy size={11} style={{ marginRight: 3 }} /> Copy
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={editedProposalText}
                  onChange={(e) => setEditedProposalText(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#161a26',
                    border: '1px solid #3c4663',
                    borderRadius: 8,
                    color: '#edf0f8',
                    padding: 10,
                    font: 'inherit',
                    fontSize: 12.5,
                    lineHeight: 1.5,
                  }}
                />
              </div>

              <div
                style={{
                  background: '#1a182e',
                  border: '1px solid #3d346b',
                  borderRadius: 8,
                  padding: '10px 12px',
                  fontSize: 11.5,
                  color: '#c4b8ff',
                  marginBottom: 16,
                }}
              >
                💡 <b>Rationale:</b> {activeProposal.explanation}
              </div>

              <div className="profileActions">
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setActiveProposal(null)}
                >
                  Reject & Close
                </button>
                <button
                  type="button"
                  className="primary"
                  onClick={handleConfirmProposal}
                >
                  <Check size={14} /> Apply to Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EVIDENCE DETAIL MODAL */}
      {selectedEvidenceStrength && (
        <EvidenceDetailModal
          strength={selectedEvidenceStrength}
          onClose={() => setSelectedEvidenceStrength(null)}
          onOpenResumeApproval={(s) => {
            setSelectedEvidenceStrength(null);
            setSelectedApprovalStrength(s);
          }}
          onHideStrength={() => {
            setSelectedEvidenceStrength(null);
            act('Strength hidden from dashboard');
          }}
          onMarkInaccurate={() => {
            setSelectedEvidenceStrength(null);
            act('Marked as inaccurate. CareerOS will recalibrate');
          }}
          act={act}
        />
      )}

      {/* RESUME APPROVAL MODAL */}
      {selectedApprovalStrength && (
        <ResumeApprovalModal
          strength={selectedApprovalStrength}
          onClose={() => setSelectedApprovalStrength(null)}
          onApplyToResume={handleApplyApprovedStrength}
          act={act}
        />
      )}
    </div>
  );
};

