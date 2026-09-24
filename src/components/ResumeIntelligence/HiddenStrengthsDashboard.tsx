import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Award,
  ArrowRight,
  Target,
  FileText,
  MessageSquare,
  HelpCircle,
  Eye,
  Filter,
  Check,
  TrendingUp,
} from 'lucide-react';
import {
  HiddenStrength,
  sampleHiddenStrengths,
  TargetRoleType,
  wordingTransformationsData,
  careerEdgeSummaryData,
} from '../../data/hiddenStrengthsData';

interface HiddenStrengthsDashboardProps {
  onOpenEvidenceDetail: (strength: HiddenStrength) => void;
  onOpenResumeApproval: (strength: HiddenStrength) => void;
  act: (msg: string, inc?: number) => void;
}

export const HiddenStrengthsDashboard: React.FC<HiddenStrengthsDashboardProps> = ({
  onOpenEvidenceDetail,
  onOpenResumeApproval,
  act,
}) => {
  const [selectedRole, setSelectedRole] = useState<TargetRoleType>('Junior Frontend Developer');
  const [strengths, setStrengths] = useState<HiddenStrength[]>(sampleHiddenStrengths);

  const featuredStrength = strengths.find((s) => s.isFeatured) || strengths[0];
  const supportingStrengths = strengths.filter((s) => !s.isFeatured && !s.isHidden);

  const filteredStrengths = supportingStrengths.filter((s) =>
    s.targetRoles.includes(selectedRole)
  );

  return (
    <div className="hiddenStrengthsDashboardSection">
      {/* Title */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">HIDDEN STRENGTHS & EVIDENCE DISCOVERY</p>
          <h1>Discover what makes your work stand out</h1>
          <p className="muted">
            CareerOS analyzes your projects, progress, feedback, and simulations to identify strengths you may not know how to describe.
          </p>
        </div>

        <div className="buttonRow" style={{ margin: 0 }}>
          <button
            className="secondary"
            onClick={() => act('Recalculating evidence across recent project activities...', 15)}
          >
            <Sparkles size={14} /> Re-analyze Profile
          </button>
          <button
            className="primary"
            onClick={() => onOpenResumeApproval(featuredStrength)}
          >
            Add Selected Strength to Resume <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 5 Summary Metric Cards */}
      <div className="networkStatsGrid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
        <div className="card statCard">
          <div>
            <small>Strengths Discovered</small>
            <b>5</b>
            <span className="statSub">Observable Patterns</span>
          </div>
        </div>
        <div className="card statCard">
          <div>
            <small>High-Confidence</small>
            <b style={{ color: '#86e5b1' }}>2</b>
            <span className="statSub">Verified by Mentors</span>
          </div>
        </div>
        <div className="card statCard">
          <div>
            <small>Evidence Sources</small>
            <b style={{ color: '#ffd175' }}>18</b>
            <span className="statSub">Projects & Reviews</span>
          </div>
        </div>
        <div className="card statCard">
          <div>
            <small>Resume-Ready Insights</small>
            <b style={{ color: '#c4bbff' }}>3</b>
            <span className="statSub">Approved Wording</span>
          </div>
        </div>
        <div className="card statCard">
          <div>
            <small>Last Analysis</small>
            <b style={{ fontSize: 14 }}>23 Aug 2026</b>
            <span className="statSub">Up-to-Date</span>
          </div>
        </div>
      </div>

      {/* Featured Strength Card */}
      <div className="card featuredStrengthCard" style={{ background: 'linear-gradient(135deg, #221940, #141724)', border: '1px solid #4a3d7d', padding: 22, marginBottom: 24 }}>
        <div className="cardTop" style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className="pill green" style={{ fontSize: 9 }}>
              <CheckCircle2 size={11} style={{ marginRight: 3 }} /> High-Confidence Strength
            </span>
            <span className="pill purple" style={{ fontSize: 9 }}>{featuredStrength.category}</span>
          </div>
          <span className="aiBadge mock">Based on 18 observations</span>
        </div>

        <h2 style={{ fontSize: 22, margin: '6px 0 4px', color: '#f0edff' }}>{featuredStrength.title}</h2>
        <p style={{ color: '#c7cbde', fontSize: 13, margin: '0 0 14px', lineHeight: 1.45 }}>
          {featuredStrength.observedBehavior}
        </p>

        {/* Evidence Highlights Box */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, background: '#131520', padding: 12, borderRadius: 8, border: '1px solid #23283a', marginBottom: 16 }}>
          <div>
            <small style={{ color: '#8e96a8', display: 'block', fontSize: 10 }}>Projects Verified</small>
            <b style={{ color: '#f0edff', fontSize: 13 }}>3 Projects</b>
          </div>
          <div>
            <small style={{ color: '#8e96a8', display: 'block', fontSize: 10 }}>Peer Reviews</small>
            <b style={{ color: '#f0edff', fontSize: 13 }}>5 Peer Reviews</b>
          </div>
          <div>
            <small style={{ color: '#8e96a8', display: 'block', fontSize: 10 }}>Mentor Sign-offs</small>
            <b style={{ color: '#86e5b1', fontSize: 13 }}>2 Mentors (MSFT)</b>
          </div>
          <div>
            <small style={{ color: '#8e96a8', display: 'block', fontSize: 10 }}>Score Compounding</small>
            <b style={{ color: '#ffd175', fontSize: 13 }}>+28% Improvement</b>
          </div>
        </div>

        <div className="buttonRow" style={{ margin: 0 }}>
          <button className="secondary" onClick={() => onOpenEvidenceDetail(featuredStrength)}>
            <Eye size={14} /> View Evidence Sources
          </button>
          <button className="primary" onClick={() => onOpenResumeApproval(featuredStrength)}>
            <Sparkles size={14} /> Add to Resume & Career Passport
          </button>
        </div>
      </div>

      {/* Target Role Selector */}
      <div className="card" style={{ background: '#151825', padding: '12px 16px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Filter size={15} color="#8777f2" />
          <b style={{ fontSize: 13, color: '#f0edff' }}>Target Role Alignment:</b>
        </div>
        <select
          className="filterSelect"
          value={selectedRole}
          onChange={(e: any) => {
            setSelectedRole(e.target.value);
            act(`Filtered strengths for ${e.target.value}`);
          }}
        >
          <option value="Junior Frontend Developer">Junior Frontend Developer</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
          <option value="Product Management Intern">Product Management Intern</option>
          <option value="Business Analyst">Business Analyst</option>
          <option value="Digital Marketing Associate">Digital Marketing Associate</option>
        </select>
      </div>

      {/* Supporting Strengths Grid */}
      <div className="podCardsGrid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
        {filteredStrengths.map((s) => (
          <div className="card strengthInsightCard" key={s.id} style={{ background: '#161926', border: '1px solid #293043', padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="cardTop" style={{ marginBottom: 6 }}>
                <span className="pill purple" style={{ fontSize: 8 }}>{s.category}</span>
                <span
                  className={`pill ${
                    s.confidence === 'High confidence'
                      ? 'green'
                      : s.confidence === 'Emerging strength'
                      ? 'orange'
                      : 'blue'
                  }`}
                  style={{ fontSize: 8 }}
                >
                  {s.confidence}
                </span>
              </div>

              <h3 style={{ fontSize: 16, margin: '6px 0 4px', color: '#f0edff' }}>{s.title}</h3>
              <p style={{ fontSize: 12, color: '#c7cbde', margin: '0 0 10px', lineHeight: 1.45 }}>
                {s.observedBehavior}
              </p>

              <div style={{ background: '#121420', padding: 8, borderRadius: 6, fontSize: 11, color: '#86e5b1', marginBottom: 12 }}>
                <b>Outcome:</b> {s.relevantOutcome}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button
                className="secondary"
                style={{ fontSize: 11, padding: '5px 10px', flex: 1 }}
                onClick={() => onOpenEvidenceDetail(s)}
              >
                View Evidence
              </button>
              <button
                className="primary"
                style={{ fontSize: 11, padding: '5px 10px', flex: 1 }}
                onClick={() => onOpenResumeApproval(s)}
              >
                Add to Resume
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Your Career Edge Section */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #1c1a38, #141724)', border: '1px solid #3c326b', padding: 20, marginBottom: 24 }}>
        <div className="cardTop" style={{ marginBottom: 8 }}>
          <span className="pill purple">YOUR CAREER EDGE</span>
          <span className="pill green">Unique Differentiator</span>
        </div>
        <h3 style={{ fontSize: 18, margin: '4px 0 2px' }}>
          Your Strongest Differentiator: <span style={{ color: '#ffd175' }}>{careerEdgeSummaryData.primaryDifferentiator}</span>
        </h3>
        <p style={{ fontSize: 12, color: '#c7cbde', margin: '0 0 12px' }}>
          You are not only learning frontend development. Your pattern of compounding revisions gives you a distinct advantage over single-draft candidates.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, fontSize: 11, color: '#e2e0ff', marginBottom: 14 }}>
          {careerEdgeSummaryData.supportingPoints.map((pt, i) => (
            <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <CheckCircle2 size={13} color="#86e5b1" /> {pt}
            </div>
          ))}
        </div>
      </div>

      {/* Weak Generic Claims vs Evidence-Backed Statements */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="cardTop" style={{ marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Transform Weak Claims into Evidence-Backed Wording</h3>
          <span className="pill purple">Resume Impact Transformer</span>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          {wordingTransformationsData.map((w) => (
            <div
              key={w.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.6fr',
                gap: 12,
                background: '#131520',
                padding: 12,
                borderRadius: 8,
                border: '1px solid #24293a',
                alignItems: 'center',
              }}
            >
              <div style={{ borderRight: '1px solid #22283a', paddingRight: 10 }}>
                <span className="pill orange" style={{ fontSize: 8, marginBottom: 4 }}>Weak Generic Claim</span>
                <p style={{ fontSize: 12, color: '#ffb3b8', margin: 0, fontStyle: 'italic' }}>
                  "{w.weakClaim}"
                </p>
              </div>

              <div>
                <span className="pill green" style={{ fontSize: 8, marginBottom: 4 }}>Evidence-Backed Statement</span>
                <p style={{ fontSize: 12, color: '#d8fae8', margin: 0, fontWeight: 500 }}>
                  "{w.evidenceBackedStatement}"
                </p>
                <small style={{ color: '#888fa0', fontSize: 10, display: 'block', marginTop: 2 }}>
                  Source: {w.evidenceSource}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Notice Footer */}
      <div style={{ textAlign: 'center', padding: '8px 0', color: '#888fa0', fontSize: 11 }}>
        🔒 AI-generated insights are based on your CareerOS activity and available evidence. Review and approve every insight before using it professionally.
      </div>
    </div>
  );
};
