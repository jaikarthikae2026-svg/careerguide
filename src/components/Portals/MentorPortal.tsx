import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Star,
  Clock,
  Sparkles,
  FileText,
  X,
  MessageSquare,
  RefreshCw,
  Send,
} from 'lucide-react';
import { careerApi } from '../../api';

interface MentorPortalProps {
  act: (msg: string, inc?: number) => void;
}

export const MentorPortal: React.FC<MentorPortalProps> = ({ act }) => {
  const [reviews, setReviews] = useState<any[]>([
    {
      id: 'proj-sub-1',
      studentName: 'Divya',
      studentRole: 'Junior Frontend Developer',
      title: 'Responsive Student Placement Analytics Dashboard',
      problemStatement:
        'Colleges lack real-time visibility into department placement readiness, skill gaps, and employer conversion trends.',
      requiredSkills: ['React.js', 'TypeScript', 'Recharts', 'Vitest', 'CSS Variables'],
      repoUrl: 'https://github.com/divya-dev/placement-analytics-dashboard',
      liveDemoUrl: 'https://placement-analytics.careeros.app',
      decisionsNotes:
        'Implemented responsive CSS grid cards, memoized chart calculations with useMemo, and wrote 12 Vitest unit tests with 88% branch coverage.',
      status: 'Verified',
      submittedAt: '2026-09-18',
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
        strengthFeedback:
          'Excellent component decomposition, clean TypeScript interfaces, and great use of responsive dark purple theme styling. The 12 Vitest tests demonstrate high production diligence.',
        improvementFeedback:
          'Consider lazy-loading heavy chart visualization modules with React.lazy() to further optimize initial bundle size.',
        reviewedAt: '2026-09-20',
      },
    },
    {
      id: 'proj-sub-2',
      studentName: 'Divya',
      studentRole: 'Junior Frontend Developer',
      title: 'Accessible Single-Page Merchant Checkout Flow',
      problemStatement:
        'High mobile cart abandonment due to complex multi-step forms and sluggish client validation.',
      requiredSkills: ['React', 'TypeScript', 'WCAG 2.1 AA', 'Vitest'],
      repoUrl: 'https://github.com/divya-dev/merchant-checkout',
      liveDemoUrl: 'https://checkout.careeros.app',
      decisionsNotes:
        'Implemented accordion step navigation, instant z-schema validation, and 8 Vitest unit tests.',
      status: 'Requested',
      submittedAt: '2026-09-23',
    },
  ]);

  const [activeTab, setActiveTab] = useState<'queue' | 'history' | 'profile'>('queue');
  const [selectedReview, setSelectedReview] = useState<any | null>(null);

  // 7-Category Evaluation Form State
  const [correctness, setCorrectness] = useState(5);
  const [quality, setQuality] = useState(4);
  const [clarity, setClarity] = useState(5);
  const [documentation, setDocumentation] = useState(5);
  const [problemSolving, setProblemSolving] = useState(5);
  const [decisionExplaining, setDecisionExplaining] = useState(4);
  const [professionalism, setProfessionalism] = useState(5);

  const [strengthFeedback, setStrengthFeedback] = useState(
    'Strong component modularity, clean error boundaries, and thorough unit testing.',
  );
  const [improvementFeedback, setImprovementFeedback] = useState(
    'Add automated accessibility tests for keyboard focus cycling.',
  );
  const [changeRequestDetails, setChangeRequestDetails] = useState('');

  const [evaluatingAction, setEvaluatingAction] = useState<'approve_verify' | 'request_changes'>('approve_verify');

  useEffect(() => {
    careerApi
      .getMentorReviewQueue()
      .then((data) => {
        if (data && data.length) setReviews(data);
      })
      .catch(() => {});
  }, []);

  const handleRespondRequest = async (id: string, action: 'accept' | 'decline') => {
    try {
      await careerApi.respondMentorReview(id, action);
    } catch {
      // Local fallback
    }

    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action === 'accept' ? 'In review' : 'Declined' } : r)),
    );
    act(`Review request ${action}ed!`);
  };

  const handleOpenEvaluationModal = (item: any, mode: 'approve_verify' | 'request_changes') => {
    setSelectedReview(item);
    setEvaluatingAction(mode);
  };

  const handleSubmitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReview) return;

    const scores = [
      correctness,
      quality,
      clarity,
      documentation,
      problemSolving,
      decisionExplaining,
      professionalism,
    ];
    const avg = Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1));

    const reviewPayload = {
      action: evaluatingAction,
      reviewerName: 'Sneha Roy',
      reviewerRole: 'Senior Frontend Architect',
      organization: 'Microsoft India',
      correctnessScore: correctness,
      qualityScore: quality,
      clarityScore: clarity,
      documentationScore: documentation,
      problemSolvingScore: problemSolving,
      decisionExplainingScore: decisionExplaining,
      professionalismScore: professionalism,
      strengthFeedback,
      improvementFeedback,
      changeRequestDetails: evaluatingAction === 'request_changes' ? changeRequestDetails : undefined,
    };

    try {
      await careerApi.evaluateProjectReview(selectedReview.id, reviewPayload);
    } catch {
      // Local fallback
    }

    setReviews((prev) =>
      prev.map((r) =>
        r.id === selectedReview.id
          ? {
              ...r,
              status: evaluatingAction === 'approve_verify' ? 'Verified' : 'Changes requested',
              score: Math.round(avg * 20),
              review: {
                ...reviewPayload,
                overallScore: avg,
                reviewedAt: new Date().toISOString().slice(0, 10),
              },
            }
          : r,
      ),
    );

    act(
      evaluatingAction === 'approve_verify'
        ? `Evidence VERIFIED for ${selectedReview.studentName}'s Career Passport! (+200 XP)`
        : `Changes requested on ${selectedReview.studentName}'s submission.`,
    );
    setSelectedReview(null);
  };

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {/* Title Row */}
      <div className="titleRow">
        <div>
          <p className="eyebrow">MENTOR & REVIEWER WORKFLOW PORTAL</p>
          <h1>Verified Industry Reviewer Console</h1>
          <p className="muted">
            Evaluate student project deliverables, score technical & workplace rubrics, and certify Career Passport proof packets.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span className="pill green">
            <ShieldCheck size={14} /> Verified Industry Reviewer: Microsoft India
          </span>
        </div>
      </div>

      {/* Mentor Profile Overview Header */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #1b1633, #131626)',
          border: '1px solid #48397a',
          padding: 20,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div
              className="avatar huge"
              style={{ background: '#3b2f6b', color: '#ffd175', border: '2px solid #8777f2' }}
            >
              SR
            </div>
            <div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <h2 style={{ margin: 0, fontSize: 18, color: '#f0edff' }}>Sneha Roy</h2>
                <span className="pill purple">Senior Reviewer</span>
              </div>
              <p style={{ margin: '4px 0 0', color: '#c7cbde', fontSize: 12 }}>
                Senior Frontend Architect · <b>Microsoft India</b> · 8+ Yrs Exp
              </p>
              <small style={{ color: '#8e96a8', fontSize: 11 }}>
                Specializations: React Architecture, Vitest Testing, Design Systems, Career Mentorship
              </small>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#8e96a8', fontSize: 11, display: 'block' }}>Assigned Reviews</span>
              <b style={{ fontSize: 22, color: '#ffd175' }}>{reviews.length}</b>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#8e96a8', fontSize: 11, display: 'block' }}>Verified Projects</span>
              <b style={{ fontSize: 22, color: '#86e5b1' }}>
                {reviews.filter((r) => r.status === 'Verified').length}
              </b>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#8e96a8', fontSize: 11, display: 'block' }}>Avg Reviewer Score</span>
              <b style={{ fontSize: 22, color: '#a89bff' }}>4.8 ★</b>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid #232a3c', paddingBottom: 10 }}>
        <button
          type="button"
          className={activeTab === 'queue' ? 'primary' : 'secondary'}
          style={{ fontSize: 12, padding: '6px 16px' }}
          onClick={() => setActiveTab('queue')}
        >
          Review Requests Queue ({reviews.length})
        </button>
        <button
          type="button"
          className={activeTab === 'history' ? 'primary' : 'secondary'}
          style={{ fontSize: 12, padding: '6px 16px' }}
          onClick={() => setActiveTab('history')}
        >
          Verified History ({reviews.filter((r) => r.status === 'Verified').length})
        </button>
      </div>

      {/* Review Queue List */}
      <div style={{ display: 'grid', gap: 16 }}>
        {reviews
          .filter((r) => (activeTab === 'history' ? r.status === 'Verified' : true))
          .map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                background: '#141724',
                border: item.status === 'Verified' ? '1px solid #334d42' : '1px solid #2d354d',
                padding: 20,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                <div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: 16, color: '#f0edff' }}>{item.title}</h3>
                    <span
                      className={`pill ${
                        item.status === 'Verified'
                          ? 'green'
                          : item.status === 'Changes requested'
                          ? 'red'
                          : 'orange'
                      }`}
                      style={{ fontSize: 10 }}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <small style={{ color: '#8e96a8', fontSize: 11, display: 'block', marginTop: 4 }}>
                    Submitted by <b>{item.studentName}</b> ({item.studentRole}) · Received: {item.submittedAt}
                  </small>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  {item.repoUrl && (
                    <button
                      className="secondary"
                      style={{ fontSize: 11, padding: '5px 10px' }}
                      onClick={() => window.open(item.repoUrl, '_blank')}
                    >
                      GitHub Repo <ExternalLink size={12} />
                    </button>
                  )}
                  {item.liveDemoUrl && (
                    <button
                      className="secondary"
                      style={{ fontSize: 11, padding: '5px 10px' }}
                      onClick={() => window.open(item.liveDemoUrl, '_blank')}
                    >
                      Live Demo <ExternalLink size={12} />
                    </button>
                  )}

                  {item.status === 'Requested' && (
                    <>
                      <button
                        className="secondary"
                        style={{ fontSize: 11, padding: '5px 12px', color: '#ff8a8a' }}
                        onClick={() => handleRespondRequest(item.id, 'decline')}
                      >
                        Decline
                      </button>
                      <button
                        className="primary"
                        style={{ fontSize: 11, padding: '5px 14px' }}
                        onClick={() => handleRespondRequest(item.id, 'accept')}
                      >
                        Accept Review
                      </button>
                    </>
                  )}

                  {(item.status === 'In review' || item.status === 'Resubmitted' || item.status === 'Requested') && (
                    <>
                      <button
                        className="secondary"
                        style={{ fontSize: 11, padding: '5px 12px' }}
                        onClick={() => handleOpenEvaluationModal(item, 'request_changes')}
                      >
                        Request Changes
                      </button>
                      <button
                        className="primary"
                        style={{ fontSize: 11, padding: '5px 14px' }}
                        onClick={() => handleOpenEvaluationModal(item, 'approve_verify')}
                      >
                        <CheckCircle2 size={13} /> Score & Verify
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Problem & Architectural Notes */}
              <div
                style={{
                  background: '#10121c',
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 12,
                  fontSize: 11,
                  border: '1px solid #1f2538',
                }}
              >
                <b style={{ color: '#f0edff', display: 'block', marginBottom: 4 }}>Problem Statement:</b>
                <p style={{ margin: '0 0 6px', color: '#cbd1e1' }}>{item.problemStatement}</p>
                <p style={{ margin: 0, color: '#8e96a8' }}>
                  <b>Implementation & Decisions:</b> {item.decisionsNotes}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: item.review ? 12 : 0 }}>
                {item.requiredSkills?.map((s: string) => (
                  <span key={s} className="pill purple" style={{ fontSize: 10 }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* Reviewer Result Box if verified */}
              {item.review && (
                <div
                  style={{
                    background: 'linear-gradient(135deg, #1b1633, #121422)',
                    border: '1px solid #4a3d7d',
                    padding: 14,
                    borderRadius: 8,
                    marginTop: 10,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div>
                      <b style={{ fontSize: 12, color: '#f0edff' }}>
                        Evaluated by {item.review.reviewerName} ({item.review.organization})
                      </b>
                      <small style={{ color: '#8e96a8', display: 'block', fontSize: 10 }}>
                        Score: ★ {item.review.overallScore} / 5.0 · Recorded on {item.review.reviewedAt}
                      </small>
                    </div>
                    <span className="pill green">VERIFIED PROOF PACKET</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 11, marginTop: 8 }}>
                    <div style={{ background: 'rgba(134, 229, 177, 0.08)', padding: 8, borderRadius: 6, border: '1px solid rgba(134, 229, 177, 0.2)' }}>
                      <b style={{ color: '#86e5b1', display: 'block', marginBottom: 2 }}>Strengths:</b>
                      <p style={{ margin: 0, color: '#d2f7e4' }}>{item.review.strengthFeedback}</p>
                    </div>
                    <div style={{ background: 'rgba(255, 209, 117, 0.08)', padding: 8, borderRadius: 6, border: '1px solid rgba(255, 209, 117, 0.2)' }}>
                      <b style={{ color: '#ffd175', display: 'block', marginBottom: 2 }}>Growth Opportunities:</b>
                      <p style={{ margin: 0, color: '#ffe7b8' }}>{item.review.improvementFeedback}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* 7-CATEGORY MENTOR SCORING MODAL */}
      {selectedReview && (
        <div className="profileModalOverlay" onClick={() => setSelectedReview(null)}>
          <div
            className="profileModal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 640, maxHeight: '92vh', overflowY: 'auto' }}
          >
            <div className="profileModalHeader">
              <div>
                <p className="eyebrow">
                  {evaluatingAction === 'approve_verify' ? 'INDUSTRY VERIFICATION RUBRIC' : 'REQUEST CHANGES & REVISIONS'}
                </p>
                <h3 style={{ margin: 0, fontSize: 18 }}>
                  {evaluatingAction === 'approve_verify'
                    ? `Score & Verify: ${selectedReview.title}`
                    : `Request Revisions: ${selectedReview.title}`}
                </h3>
                <small style={{ color: '#8e96a8' }}>Student: <b>{selectedReview.studentName}</b></small>
              </div>
              <button className="icon" onClick={() => setSelectedReview(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmitEvaluation} style={{ marginTop: 14 }}>
              <p className="muted" style={{ fontSize: 11, marginBottom: 12 }}>
                Rate each category on a 1–5 scale based on production industry standards:
              </p>

              {/* 7 Category Sliders */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div className="profileField">
                  <span>1. Correctness (1–5): {correctness}★</span>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={correctness}
                    onChange={(e) => setCorrectness(Number(e.target.value))}
                  />
                </div>
                <div className="profileField">
                  <span>2. Technical Quality (1–5): {quality}★</span>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                  />
                </div>
                <div className="profileField">
                  <span>3. Clarity (1–5): {clarity}★</span>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={clarity}
                    onChange={(e) => setClarity(Number(e.target.value))}
                  />
                </div>
                <div className="profileField">
                  <span>4. Documentation (1–5): {documentation}★</span>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={documentation}
                    onChange={(e) => setDocumentation(Number(e.target.value))}
                  />
                </div>
                <div className="profileField">
                  <span>5. Problem-Solving (1–5): {problemSolving}★</span>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={problemSolving}
                    onChange={(e) => setProblemSolving(Number(e.target.value))}
                  />
                </div>
                <div className="profileField">
                  <span>6. Decision Explanations (1–5): {decisionExplaining}★</span>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={decisionExplaining}
                    onChange={(e) => setDecisionExplaining(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="profileField" style={{ marginBottom: 14 }}>
                <span>7. Professionalism & Delivery (1–5): {professionalism}★</span>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={professionalism}
                  onChange={(e) => setProfessionalism(Number(e.target.value))}
                />
              </div>

              {evaluatingAction === 'request_changes' && (
                <div className="profileField" style={{ marginBottom: 12 }}>
                  <span style={{ color: '#ff8a8a' }}>Required Revisions & Actionable Next Steps</span>
                  <textarea
                    rows={2}
                    value={changeRequestDetails}
                    onChange={(e) => setChangeRequestDetails(e.target.value)}
                    placeholder="Describe specific fixes required before verification..."
                    style={{ width: '100%', background: '#161928', color: '#fff', border: '1px solid #4a2828', borderRadius: 6, padding: 8, fontSize: 12 }}
                    required
                  />
                </div>
              )}

              <div className="profileField" style={{ marginBottom: 10 }}>
                <span>Key Technical Strengths</span>
                <textarea
                  rows={2}
                  value={strengthFeedback}
                  onChange={(e) => setStrengthFeedback(e.target.value)}
                  style={{ width: '100%', background: '#161928', color: '#fff', border: '1px solid #282f42', borderRadius: 6, padding: 8, fontSize: 12 }}
                  required
                />
              </div>

              <div className="profileField" style={{ marginBottom: 14 }}>
                <span>Growth Opportunities & Recommendations</span>
                <textarea
                  rows={2}
                  value={improvementFeedback}
                  onChange={(e) => setImprovementFeedback(e.target.value)}
                  style={{ width: '100%', background: '#161928', color: '#fff', border: '1px solid #282f42', borderRadius: 6, padding: 8, fontSize: 12 }}
                  required
                />
              </div>

              <div className="profileActions">
                <button type="button" className="secondary" onClick={() => setSelectedReview(null)}>
                  Cancel
                </button>
                <button className="primary" type="submit">
                  {evaluatingAction === 'approve_verify' ? (
                    <>
                      Approve & Verify Proof Packet <CheckCircle2 size={14} />
                    </>
                  ) : (
                    <>
                      Send Revision Request <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
