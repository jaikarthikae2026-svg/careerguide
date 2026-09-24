import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Briefcase,
  HelpCircle,
  Layers,
  Award,
  BookOpen,
  Calendar,
  Check,
} from 'lucide-react';
import {
  RejectionBlocker,
  rejectionBlockersData,
  recoveryTimelineData,
  RejectionReasonType,
} from '../../data/rejectionIntelligenceData';

interface RejectionIntelligenceViewProps {
  blockers?: RejectionBlocker[];
  onStartImprovementPlan: () => void;
  onOpenAddApplication: () => void;
  onJumpToFeature: (pageName: string) => void;
  act: (msg: string, inc?: number) => void;
}

export const RejectionIntelligenceView: React.FC<RejectionIntelligenceViewProps> = ({
  blockers = rejectionBlockersData,
  onStartImprovementPlan,
  onOpenAddApplication,
  onJumpToFeature,
  act,
}) => {
  const renderConfidenceBadge = (type: RejectionReasonType, label: string) => {
    switch (type) {
      case 'CONFIRMED':
        return (
          <span className="pill green" style={{ fontSize: 9 }}>
            <CheckCircle2 size={10} style={{ marginRight: 3 }} /> {label}
          </span>
        );
      case 'PROBABLE':
        return (
          <span className="pill purple" style={{ fontSize: 9 }}>
            <Sparkles size={10} style={{ marginRight: 3 }} /> {label}
          </span>
        );
      default:
        return (
          <span className="pill" style={{ fontSize: 9, opacity: 0.7 }}>
            <HelpCircle size={10} style={{ marginRight: 3 }} /> {label}
          </span>
        );
    }
  };

  return (
    <div className="rejectionIntelligenceSection">
      {/* Header */}
      <div className="titleRow">
        <div>
          <p className="eyebrow">REJECTION INTELLIGENCE & PATTERN DIAGNOSTIC</p>
          <h1>Turn rejection into your next advantage</h1>
          <p className="muted">
            Identify repeated patterns in your applications and focus your effort on the highest-impact skill improvements.
          </p>
        </div>

        <div className="buttonRow" style={{ margin: 0 }}>
          <button className="secondary" onClick={onOpenAddApplication}>
            + Log New Application
          </button>
          <button className="primary" onClick={onStartImprovementPlan}>
            <Sparkles size={14} /> Start Improvement Plan
          </button>
        </div>
      </div>

      {/* Privacy & Ethical Tone Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #1d2238, #141724)', border: '1px solid #333d5c', padding: '12px 18px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="statIcon" style={{ width: 34, height: 34, background: '#252044', color: '#a89bff', borderRadius: 8 }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <b style={{ fontSize: 13, color: '#f0edff' }}>Evidence-Based Diagnostic Notice</b>
            <small style={{ display: 'block', color: '#9fa7bc', fontSize: 11 }}>
              CareerOS clearly separates confirmed employer feedback from statistical patterns inferred from your application history.
            </small>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span className="pill green" style={{ fontSize: 9 }}>✓ Confirmed Reason</span>
          <span className="pill purple" style={{ fontSize: 9 }}>⚡ Probable Pattern</span>
          <span className="pill" style={{ fontSize: 9 }}>❓ Unknown Reason</span>
        </div>
      </div>

      {/* Top 3 Diagnostic Blockers Section */}
      <div className="sectionTitle" style={{ marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>Top 3 Contributing Factors & Actionable Next Steps</h3>
        <p className="muted" style={{ fontSize: 12, marginTop: 4 }}>
          Focusing on these three specific areas can increase your technical interview qualification rate from 18% to ~45%.
        </p>
      </div>

      <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
        {blockers.map((blocker, idx) => (
          <div className="card blockerAnalysisCard" key={blocker.id} style={{ background: '#161928', border: '1px solid #2e354e', padding: 18 }}>
            <div className="cardTop" style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="pill orange" style={{ fontWeight: 700 }}>
                  #{idx + 1} {blocker.impactLevel}
                </span>
                {renderConfidenceBadge(blocker.confidenceType, blocker.confidenceLevel)}
              </div>
              <span className="aiBadge mock">⏱️ {blocker.estimatedEffortHours} to resolve</span>
            </div>

            <h3 style={{ fontSize: 17, margin: '6px 0', color: '#f0edff' }}>{blocker.title}</h3>

            <div style={{ background: '#121420', padding: 10, borderRadius: 8, border: '1px solid #23283a', margin: '8px 0 10px', fontSize: 11, color: '#d8ddf0' }}>
              <b>Evidence:</b> {blocker.evidence}
            </div>

            <p style={{ fontSize: 12, color: '#c7cbde', lineHeight: 1.5, margin: '0 0 12px' }}>
              {blocker.explanation}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(139,124,255,0.06)', border: '1px solid rgba(139,124,255,0.2)', padding: '10px 14px', borderRadius: 8, flexWrap: 'wrap', gap: 10 }}>
              <div style={{ fontSize: 11, color: '#dcd6ff' }}>
                <b>Recommended Action:</b> {blocker.recommendedAction}
              </div>
              <button
                className="primary"
                style={{ fontSize: 11, padding: '5px 12px', height: 'auto' }}
                onClick={() => {
                  onJumpToFeature(blocker.pageTarget);
                  act(`Navigated to ${blocker.linkedFeature} for remediation`, 10);
                }}
              >
                Resolve in {blocker.linkedFeature} <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Two-Column Grid: Reapply Readiness (Left) vs Recovery Timeline (Right) */}
      <div className="simulatorTwoCol" style={{ gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {/* Left: Reapply Readiness Card */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #221940, #141724)', border: '1px solid #4a3d7d' }}>
          <div className="cardTop" style={{ marginBottom: 10 }}>
            <div>
              <span className="pill purple">REAPPLY READINESS DIAGNOSTIC</span>
              <h3 style={{ margin: '8px 0 2px' }}>Target: Junior Frontend Developer</h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <small style={{ color: '#8e96a8', display: 'block', fontSize: 10 }}>Current → Target</small>
              <b style={{ fontSize: 20, color: '#ffd175' }}>61% → <span style={{ color: '#86e5b1' }}>74%</span></b>
            </div>
          </div>

          <p style={{ fontSize: 12, color: '#c7cbde', margin: '0 0 14px', lineHeight: 1.45 }}>
            You are ready to reapply to tier-1 companies after completing these 4 targeted evidence items:
          </p>

          <div style={{ display: 'grid', gap: 8, fontSize: 11 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#131520', padding: 8, borderRadius: 6 }}>
              <CheckCircle2 size={14} color="#86e5b1" />
              <span>Complete Timed JavaScript & Async Module (Learning Hub)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#131520', padding: 8, borderRadius: 6 }}>
              <CheckCircle2 size={14} color="#86e5b1" />
              <span>Add 12 Vitest unit tests to React project (Project Studio)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#131520', padding: 8, borderRadius: 6 }}>
              <span style={{ width: 14, height: 14, border: '1px solid #8e96a8', borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ color: '#ffd175' }}>Pass 1 Technical Mock Arena Simulation (&gt; 80%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#131520', padding: 8, borderRadius: 6 }}>
              <span style={{ width: 14, height: 14, border: '1px solid #8e96a8', borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ color: '#ffd175' }}>Request Mentor Code Review in Career Pod</span>
            </div>
          </div>

          <div className="buttonRow" style={{ marginTop: 16 }}>
            <button className="primary full" onClick={onStartImprovementPlan}>
              Execute 4-Step Improvement Plan <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Right: Recovery Timeline */}
        <div className="card">
          <div className="cardTop" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Recovery & Progress Timeline</h3>
            <span className="pill green">Turning Rejection to Progress</span>
          </div>
          <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
            Chronological milestones showing how you responded to past rejections:
          </p>

          <div className="recoveryTimelineList" style={{ display: 'grid', gap: 10 }}>
            {recoveryTimelineData.map((ev) => (
              <div
                key={ev.id}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  background: '#131520',
                  padding: 10,
                  borderRadius: 8,
                  border: '1px solid #23283a',
                }}
              >
                <div
                  style={{
                    background: ev.type === 'REJECTION' ? '#3d2028' : ev.type === 'MENTOR_REVIEW' ? '#1c382c' : '#221e3f',
                    color: ev.type === 'REJECTION' ? '#ff999f' : ev.type === 'MENTOR_REVIEW' ? '#86e5b1' : '#c4bbff',
                    padding: '4px 8px',
                    borderRadius: 6,
                    fontSize: 10,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {ev.date}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 12, color: '#f0edff' }}>{ev.title}</b>
                    {ev.scoreChange && (
                      <span className="pill green" style={{ fontSize: 8 }}>{ev.scoreChange}</span>
                    )}
                  </div>
                  <small style={{ color: '#8e96a8', display: 'block', marginTop: 2, fontSize: 10 }}>
                    {ev.description}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
