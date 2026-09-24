import React, { useState } from 'react';
import {
  Users,
  Building2,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Star,
  ExternalLink,
  MessageSquare,
  Search,
  Filter,
  ArrowRight,
  X,
  FileText,
  Send,
  Clock,
  Briefcase,
  AlertCircle,
  Check,
} from 'lucide-react';
import {
  Mentor,
  ReferralRequest,
  sampleReferralRequests,
} from '../../data/networkData';

interface MentorsAlumniProps {
  mentors: Mentor[];
  onRequestGuidance: (mentor: Mentor) => void;
  onJumpToFeature: (pageName: string) => void;
  act: (msg: string, inc?: number) => void;
}

export const MentorsAlumni: React.FC<MentorsAlumniProps> = ({
  mentors,
  onRequestGuidance,
  onJumpToFeature,
  act,
}) => {
  const [filterType, setFilterType] = useState<'ALL' | 'MENTORS' | 'ALUMNI'>('ALL');
  const [companyFilter, setCompanyFilter] = useState('ALL');
  const [domainFilter, setDomainFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Introduction / Request Modal State
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [requestReason, setRequestReason] = useState<
    'Portfolio Review' | 'Technical Guidance' | 'Referral Readiness Check' | 'Mock Interview Followup'
  >('Portfolio Review');
  const [customMessage, setCustomMessage] = useState('');
  const [attachedProof, setAttachedProof] = useState<string[]>([
    'AI Career Platform (Deployed React/Node.js)',
    'Verified 84% React Benchmark Score',
    'CareerOS ATS Resume (88% Compatibility)',
  ]);
  const [requestsList, setRequestsList] = useState<ReferralRequest[]>(sampleReferralRequests);
  const [activeViewTab, setActiveViewTab] = useState<'directory' | 'readiness' | 'requests'>('directory');

  const filteredMentors = mentors.filter((m) => {
    if (filterType === 'ALUMNI' && !m.isAlumni) return false;
    if (filterType === 'MENTORS' && m.isAlumni) return false;
    if (companyFilter !== 'ALL' && m.company !== companyFilter) return false;
    if (domainFilter !== 'ALL' && !m.skills.some((s) => s.toLowerCase().includes(domainFilter.toLowerCase()))) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.company.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const companiesList = Array.from(new Set(mentors.map((m) => m.company)));

  const handleOpenRequestModal = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    const initialMsg = `Hello ${mentor.name.split(' ')[0]}, I’m preparing for junior engineering roles and recently completed a React platform project with full error boundary and caching architecture. Since you work at ${mentor.company}, I would deeply appreciate a short portfolio review. I have attached my 2-minute project walkthrough and would value your feedback on testing and system architecture.`;
    setCustomMessage(initialMsg);
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;

    const newReq: ReferralRequest = {
      id: 'req-' + Date.now(),
      mentorName: selectedMentor.name,
      mentorRole: selectedMentor.role,
      mentorCompany: selectedMentor.company,
      targetRole: 'Junior Frontend Developer',
      reason: requestReason,
      status: 'SENT',
      submittedAt: 'Just now',
      message: customMessage,
      attachedProof: attachedProof,
    };

    setRequestsList([newReq, ...requestsList]);
    setSelectedMentor(null);
    act(`Structured request sent to ${selectedMentor.name}!`, 50);
  };

  return (
    <div className="mentorsAlumniSection">
      {/* Title Header */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">VERIFIED INDUSTRY DIRECTORY & ALUMNI PROTOCOL</p>
          <h1>Mentors, Alumni & Referral Readiness</h1>
          <p className="muted">
            Connect with verified engineers and alumni. Anti-spam verification gate is active to protect alumni and maintain high referral response rates.
          </p>
        </div>

        {/* View Switcher */}
        <div className="podSubTabNav">
          <button
            className={`podNavBtn ${activeViewTab === 'directory' ? 'active' : ''}`}
            onClick={() => setActiveViewTab('directory')}
          >
            <Users size={15} /> Mentors & Alumni ({mentors.length})
          </button>
          <button
            className={`podNavBtn ${activeViewTab === 'readiness' ? 'active' : ''}`}
            onClick={() => setActiveViewTab('readiness')}
          >
            <ShieldCheck size={15} /> Pre-Contact Verification (76%)
          </button>
          <button
            className={`podNavBtn ${activeViewTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveViewTab('requests')}
          >
            <MessageSquare size={15} /> Track Requests ({requestsList.length})
          </button>
        </div>
      </div>

      {/* Verification Protocol Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #1b2033, #151824)', border: '1px solid #2f3854', padding: '12px 18px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="statIcon" style={{ width: 34, height: 34, background: '#1c382c', color: '#86e5b1', borderRadius: 8 }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <b style={{ fontSize: 13, color: '#f0edff' }}>Pre-Contact Verification Gate: ACTIVE</b>
            <small style={{ display: 'block', color: '#9fa7bc', fontSize: 11 }}>
              Students must maintain $\ge 70\%$ readiness and have $\ge 1$ verified project before alumni introduction requests can be submitted.
            </small>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className="pill green" style={{ fontSize: 10 }}>
            ✓ Your Verification Status: UNLOCKED (76%)
          </span>
          <button
            className="secondary"
            style={{ fontSize: 10, padding: '4px 10px', height: 'auto' }}
            onClick={() => setActiveViewTab('readiness')}
          >
            Audit Proof Checklist
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* VIEW 1: MENTORS & ALUMNI DIRECTORY */}
      {/* ------------------------------------------------------------- */}
      {activeViewTab === 'directory' && (
        <div>
          {/* Filters Toolbar */}
          <div className="filterToolbar card" style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flex: 1, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['ALL', 'MENTORS', 'ALUMNI'] as const).map((t) => (
                  <button
                    key={t}
                    className={`pill ${filterType === t ? 'purple' : ''}`}
                    style={{ cursor: 'pointer', padding: '6px 12px' }}
                    onClick={() => setFilterType(t)}
                  >
                    {t === 'ALL' ? 'All Verified' : t === 'MENTORS' ? 'Industry Mentors' : 'College Alumni'}
                  </button>
                ))}
              </div>

              <select
                className="filterSelect"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
              >
                <option value="ALL">All Companies</option>
                {companiesList.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                className="filterSelect"
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
              >
                <option value="ALL">All Specializations</option>
                <option value="React">Frontend & UI</option>
                <option value="Distributed">Distributed Systems & Cloud</option>
                <option value="SQL">Database & SQL</option>
                <option value="ML">AI & Machine Learning</option>
                <option value="DSA">DSA & Algorithms</option>
              </select>

              <input
                className="filterSearchInput"
                placeholder="Search mentor name, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="mentorsGrid">
            {filteredMentors.map((mentor) => (
              <div className="card mentorCard" key={mentor.id}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div className="avatar huge" style={{ width: 52, height: 52, fontSize: 16, flexShrink: 0 }}>
                    {mentor.avatar}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <b style={{ fontSize: 16 }}>{mentor.name}</b>
                      {mentor.isVerified && (
                        <span className="pill green" style={{ fontSize: 9 }}>
                          <ShieldCheck size={11} style={{ marginRight: 2 }} /> Verified
                        </span>
                      )}
                      {mentor.isAlumni && (
                        <span className="pill orange" style={{ fontSize: 9 }}>
                          🎓 {mentor.almaMater} Alumni
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: 12, color: '#c7cbdb', marginTop: 3 }}>
                      <b>{mentor.role}</b> at <span style={{ color: '#b9aeff' }}>{mentor.company}</span>
                    </div>
                    <small style={{ color: '#8e96a8', display: 'block', marginTop: 2 }}>
                      {mentor.experienceYears} yrs experience · {mentor.careerPath}
                    </small>
                  </div>
                </div>

                <p style={{ fontSize: 12, color: '#d1d6e8', margin: '12px 0 10px', lineHeight: 1.5 }}>
                  {mentor.bio}
                </p>

                <div className="podTags" style={{ marginBottom: 12 }}>
                  {mentor.skills.map((s) => (
                    <span key={s} className="pill" style={{ fontSize: 9 }}>{s}</span>
                  ))}
                </div>

                <div className="mentorSessionTypes">
                  <small style={{ color: '#979ea0', display: 'block', marginBottom: 4 }}>Available Session Types:</small>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {mentor.sessionTypes.map((st) => (
                      <span key={st} className="sessionTag">
                        ✓ {st}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mentorCardFooter">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                    <Star size={14} color="#ffd175" fill="#ffd175" />
                    <b>{mentor.rating}</b>
                    <span style={{ color: '#888fa0' }}>({mentor.reviewCount} reviews)</span>
                  </div>

                  <span className="availabilityPill">
                    <Clock size={11} /> {mentor.availability}
                  </span>
                </div>

                <div className="buttonRow" style={{ margin: '14px 0 0' }}>
                  <button
                    className="primary full"
                    onClick={() => handleOpenRequestModal(mentor)}
                  >
                    Request Guidance / Review <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* VIEW 2: EVIDENCE-BASED REFERRAL READINESS */}
      {/* ------------------------------------------------------------- */}
      {activeViewTab === 'readiness' && (
        <div className="readinessBreakdown">
          {/* Top Hero Card */}
          <div className="card" style={{ background: 'linear-gradient(135deg, #241c47, #171a26)', marginBottom: 18 }}>
            <div className="cardTop">
              <div>
                <span className="pill purple">ROLE-SPECIFIC BENCHMARK</span>
                <h2 style={{ fontSize: 24, margin: '8px 0 4px' }}>Target: Junior Frontend Developer</h2>
                <p className="muted">
                  CareerOS referral readiness evaluates verifiable code artifacts, peer review scores, and mock interview rigor.
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 11, color: '#a69eff' }}>Current Readiness</span>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#c7bcff', letterSpacing: -1 }}>
                  76<span style={{ fontSize: 20 }}>%</span>
                </div>
                <span className="pill orange">Building & Evidence Pending</span>
              </div>
            </div>

            <div className="readinessStatusSteps">
              {[
                { label: 'Exploring', done: true },
                { label: 'Building', done: true },
                { label: 'Evidence Pending', done: true, current: true },
                { label: 'Review Pending', done: false },
                { label: 'Referral-Ready (85%+)', done: false },
                { label: 'Employer Shortlisted', done: false },
              ].map((step, i) => (
                <div className={`readinessStepItem ${step.done ? 'stepDone' : ''} ${step.current ? 'stepCurrent' : ''}`} key={i}>
                  <div className="stepCircle">{step.done ? <Check size={11} /> : i + 1}</div>
                  <span>{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="podGridTwoCol">
            {/* Completed Proofs */}
            <div className="card">
              <div className="cardTop" style={{ marginBottom: 12 }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={18} color="#75d7a0" /> Completed Proof Items (5/7)
                </h3>
                <span className="pill green">Verified</span>
              </div>

              <div className="proofItemsList">
                {[
                  { title: 'React 18 & State Architecture Assessment', score: '84% Mastery', feature: 'Learning Hub' },
                  { title: 'Two Deployed Fullstack Projects (Live URLs + GitHub)', score: 'Verified', feature: 'Career Passport' },
                  { title: 'Connected & Verified GitHub Profile (12 Repos)', score: 'Verified', feature: 'Career Passport' },
                  { title: '1 Verified Staff Mentor Code Review (Aravind @ Razorpay)', score: 'Approved', feature: 'Mentors & Alumni' },
                  { title: 'Completed Live Technical Mock Interview', score: '79% Score', feature: 'Mock Arena' },
                ].map((item, i) => (
                  <div className="proofCardItem" key={i}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Check size={14} color="#75d7a0" />
                      <b>{item.title}</b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginTop: 4, marginLeft: 22 }}>
                      <span style={{ color: '#86e5b1' }}>{item.score}</span>
                      <span style={{ color: '#979ea0' }}>via {item.feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Still Needed Checklist with Deep Links */}
            <div className="card">
              <div className="cardTop" style={{ marginBottom: 12 }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AlertCircle size={18} color="#ffd175" /> Still Needed for Referral-Ready (85%+)
                </h3>
                <span className="pill orange">2 Items Remaining</span>
              </div>
              <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
                Complete these verified tasks to unlock one-click evidence-backed introductions to verified company referrers:
              </p>

              <div className="actionableGapsList">
                <div className="gapItemCard">
                  <div>
                    <b>1. Add Automated Testing Proof (Jest / RTL)</b>
                    <p style={{ fontSize: 12, color: '#c7cbde', margin: '4px 0 8px' }}>
                      Write 5+ unit/integration tests for your primary React dashboard components.
                    </p>
                  </div>
                  <button
                    className="secondary"
                    onClick={() => {
                      onJumpToFeature('Learning Hub');
                      act('Navigating to Learning Hub for Testing modules', 10);
                    }}
                  >
                    Open Learning Hub <ArrowRight size={13} />
                  </button>
                </div>

                <div className="gapItemCard">
                  <div>
                    <b>2. Submit FinEdge / Employer Challenge Entry</b>
                    <p style={{ fontSize: 12, color: '#c7cbde', margin: '4px 0 8px' }}>
                      Participate in an employer challenge to prove real-world problem execution.
                    </p>
                  </div>
                  <button
                    className="secondary"
                    onClick={() => {
                      onJumpToFeature('Daily Mission');
                      act('Navigating to Employer Challenge Arena', 10);
                    }}
                  >
                    View Challenge <ArrowRight size={13} />
                  </button>
                </div>

                <div className="gapItemCard">
                  <div>
                    <b>3. Practice Live Technical Defense (Target Score: 85%)</b>
                    <p style={{ fontSize: 12, color: '#c7cbde', margin: '4px 0 8px' }}>
                      Elevate your mock interview clarity on trade-offs and complexity.
                    </p>
                  </div>
                  <button
                    className="secondary"
                    onClick={() => {
                      onJumpToFeature('Mock Arena');
                      act('Opening AI Mock Arena for practice', 10);
                    }}
                  >
                    Open Mock Arena <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* VIEW 3: TRACK REFERRAL & INTRO REQUESTS */}
      {/* ------------------------------------------------------------- */}
      {activeViewTab === 'requests' && (
        <div className="requestsTracker">
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="cardTop">
              <h3>Active Introduction & Review Requests</h3>
              <span className="pill green">{requestsList.length} Active</span>
            </div>
            <p className="muted" style={{ fontSize: 12 }}>
              Track the status of your structured guidance and referral requests in real-time.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 14 }}>
            {requestsList.map((req) => (
              <div className="card requestCard" key={req.id}>
                <div className="cardTop">
                  <div>
                    <span className="pill purple">{req.reason}</span>
                    <h3 style={{ margin: '8px 0 2px' }}>Request to {req.mentorName}</h3>
                    <small style={{ color: '#a2aabf' }}>{req.mentorRole} at {req.mentorCompany} · Submitted {req.submittedAt}</small>
                  </div>

                  <span className={`pill ${req.status === 'FEEDBACK_RECEIVED' ? 'green' : req.status === 'ACCEPTED' ? 'orange' : 'purple'}`}>
                    {req.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="requestMessageBox">
                  <small style={{ color: '#8f96a8', display: 'block', marginBottom: 4 }}>Your Message:</small>
                  <p style={{ fontSize: 12, color: '#e0e4f2', margin: 0, fontStyle: 'italic' }}>
                    "{req.message}"
                  </p>
                </div>

                {req.feedbackNotes && (
                  <div className="feedbackReceivedBox">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, color: '#86e5b1', fontSize: 12, fontWeight: 700 }}>
                      <CheckCircle2 size={14} /> Mentor Feedback Received:
                    </div>
                    <p style={{ fontSize: 12, color: '#d3fae4', margin: 0 }}>
                      "{req.feedbackNotes}"
                    </p>
                  </div>
                )}

                <div className="attachedProofTags">
                  <small style={{ color: '#888fa0', marginRight: 6 }}>Attached Proof:</small>
                  {req.attachedProof.map((p) => (
                    <span key={p} className="proofTag">
                      📄 {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* REQUEST INTRODUCTION / GUIDANCE MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedMentor && (
        <div className="profileModalOverlay" onClick={() => setSelectedMentor(null)}>
          <div className="profileModal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640, maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="profileModalHeader">
              <div>
                <p className="eyebrow">STRUCTURED REQUEST FLOW</p>
                <h2>Request Guidance from {selectedMentor.name}</h2>
              </div>
              <button className="icon" onClick={() => setSelectedMentor(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="card" style={{ background: '#191d2c', marginBottom: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className="avatar" style={{ width: 42, height: 42, fontSize: 14 }}>
                {selectedMentor.avatar}
              </div>
              <div>
                <b>{selectedMentor.name}</b> · <span style={{ color: '#a89bff' }}>{selectedMentor.role} at {selectedMentor.company}</span>
                <small style={{ display: 'block', color: '#9da5b8' }}>{selectedMentor.availability} · Verified Expert</small>
              </div>
            </div>

            <form onSubmit={handleSendRequest}>
              <div className="profileField" style={{ marginBottom: 14 }}>
                <span>Select Reason for Request</span>
                <select
                  className="filterSelect"
                  style={{ width: '100%' }}
                  value={requestReason}
                  onChange={(e: any) => setRequestReason(e.target.value)}
                >
                  <option value="Portfolio Review">Portfolio & Architecture Review (Most Effective)</option>
                  <option value="Technical Guidance">Technical Question / Trade-off Advice</option>
                  <option value="Referral Readiness Check">Referral Readiness Audit for {selectedMentor.company}</option>
                  <option value="Mock Interview Followup">Post-Mock Technical Improvement Check</option>
                </select>
              </div>

              <div className="card" style={{ background: '#141824', border: '1px solid #293246', marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <h4 style={{ margin: 0, fontSize: 12, color: '#86e5b1', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ShieldCheck size={14} /> Pre-Contact Verification Passed (4 / 4)
                  </h4>
                  <span className="pill green" style={{ fontSize: 9 }}>Verified Access</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 11, color: '#c7cbde' }}>
                  <div>✓ Readiness: <b>76%</b> (Threshold: 70%)</div>
                  <div>✓ Verified Projects: <b>2 Deployed</b></div>
                  <div>✓ Career Pod Reviews: <b>Active</b></div>
                  <div>✓ Anti-Spam Proof: <b>Attached</b></div>
                </div>
              </div>

              <div className="card" style={{ background: '#161925', marginBottom: 14 }}>
                <h4 style={{ margin: '0 0 6px', fontSize: 12, color: '#c4bcff' }}>📄 Automatically Attached Verified Proof</h4>
                <div style={{ display: 'grid', gap: 4, fontSize: 11, color: '#c7cbde' }}>
                  {attachedProof.map((p) => (
                    <div key={p}>• {p}</div>
                  ))}
                </div>
              </div>

              <div className="profileField" style={{ marginBottom: 14 }}>
                <span>Generated Professional Message (Editable)</span>
                <textarea
                  style={{ minHeight: 95, background: '#171a25', border: '1px solid #363d52', borderRadius: 8, padding: 10, color: '#fff', fontSize: 12, font: 'inherit', width: '100%' }}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                />
              </div>

              <div className="disclaimerBanner">
                <AlertCircle size={14} color="#ffd175" style={{ flexShrink: 0 }} />
                <small>
                  <b>Outcome Note:</b> CareerOS facilitates high-signal introductions based on verified proof. Mentors provide independent feedback, and referrals remain at the mentor's discretion.
                </small>
              </div>

              <div className="profileActions" style={{ marginTop: 16 }}>
                <button type="button" className="secondary" onClick={() => setSelectedMentor(null)}>
                  Cancel
                </button>
                <button className="primary" type="submit">
                  Send Structured Request (+50 XP) <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
