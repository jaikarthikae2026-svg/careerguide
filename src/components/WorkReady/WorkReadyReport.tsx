import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Sparkles,
  FileText,
  Copy,
  Check,
  Send,
  Download,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import {
  initialWorkReadyReport,
  workReadyBadgesData,
  WorkReadyReportData,
} from '../../data/workReadyData';

interface WorkReadyReportProps {
  report?: WorkReadyReportData;
  act: (msg: string, inc?: number) => void;
}

export const WorkReadyReport: React.FC<WorkReadyReportProps> = ({
  report = initialWorkReadyReport,
  act,
}) => {
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopySummary = () => {
    const text = `WorkReady 90-Day Workplace Transition Report for Divya (Overall Score: ${report.overallReadinessScore}%)\n\nStrongest Behaviors:\n${report.strongestBehaviors.map((b) => '• ' + b).join('\n')}\n\nFirst Week Action:\n${report.firstWeekActions[0]}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    act('Workplace transition summary copied');
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="workReadyReportSection">
      {/* Title */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">FINAL 90-DAY TRANSITION REPORT</p>
          <h1>Workplace Diagnostic & Verification</h1>
          <p className="muted">
            Personalized transition playbook based on your simulation decisions, task ownership, and peer review ratings.
          </p>
        </div>

        <div className="buttonRow" style={{ margin: 0 }}>
          <button className="secondary" onClick={handleCopySummary}>
            {copiedSummary ? <Check size={14} /> : <Copy size={14} />}
            {copiedSummary ? 'Copied Summary' : 'Copy Summary'}
          </button>
          <button
            className="primary"
            onClick={() => act('WorkReady 90-Day Transition Report downloaded as PDF', 30)}
          >
            <Download size={14} /> Download Verified Report PDF
          </button>
        </div>
      </div>

      {/* Hero Diagnostic Card */}
      <div className="card reportHeroCard" style={{ background: 'linear-gradient(135deg, #241c47, #151825)', marginBottom: 20 }}>
        <div className="showcaseHeroRow">
          <div className="avatar huge" style={{ width: 68, height: 68, fontSize: 22, background: 'linear-gradient(135deg, #7c6df0, #4c3ba8)' }}>
            DV
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 26, margin: 0 }}>Divya</h2>
              <span className="pill green">
                <ShieldCheck size={13} style={{ marginRight: 3 }} /> WorkReady: Junior Frontend Developer
              </span>
              <span className="pill purple">
                Phase: {report.currentPhase}
              </span>
            </div>

            <p style={{ fontSize: 13, color: '#c7cbde', margin: '4px 0 8px' }}>
              Transitioning to Junior Frontend Engineer · Verified by CareerOS Simulation Engine
            </p>
          </div>

          <div className="showcaseReadinessScore">
            <small style={{ color: '#a69eff', textTransform: 'uppercase', fontSize: 9 }}>Workplace Score</small>
            <div style={{ fontSize: 38, fontWeight: 800, color: '#e0daff' }}>
              {report.overallReadinessScore}<span style={{ fontSize: 16 }}>%</span>
            </div>
            <span className="pill green" style={{ fontSize: 9 }}>Proficient Candidate</span>
          </div>
        </div>
      </div>

      {/* Verification Badges Grid */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="cardTop" style={{ marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Earned Workplace Verification Badges</h3>
          <span className="pill purple">Linked to Career Passport</span>
        </div>

        <div className="badgesGrid">
          {workReadyBadgesData.map((badge) => (
            <div
              key={badge.id}
              className={`card badgeItemCard ${badge.isUnlocked ? 'badgeUnlocked' : 'badgeLocked'}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <Award size={20} color={badge.isUnlocked ? '#ffd175' : '#6b7280'} />
                {badge.isUnlocked ? (
                  <span className="pill green" style={{ fontSize: 8 }}>✓ Unlocked</span>
                ) : (
                  <span className="pill" style={{ fontSize: 8, opacity: 0.6 }}>Locked</span>
                )}
              </div>
              <b style={{ fontSize: 12, color: badge.isUnlocked ? '#f0edff' : '#888fa0', display: 'block' }}>
                {badge.title}
              </b>
              <small style={{ color: '#9fa7ba', fontSize: 10, display: 'block', margin: '4px 0 6px', lineHeight: 1.4 }}>
                {badge.description}
              </small>
              <div style={{ fontSize: 9, color: '#888fa0', borderTop: '1px solid #282d3e', paddingTop: 4 }}>
                <b>Criteria:</b> {badge.criteria}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostic Findings Grid (Strengths vs Risks) */}
      <div className="podGridTwoCol" style={{ marginBottom: 20 }}>
        {/* Strongest Behaviors */}
        <div className="card">
          <div className="cardTop" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={16} color="#86e5b1" /> Strongest Workplace Behaviors
            </h3>
            <span className="pill green">Top Assets</span>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            {report.strongestBehaviors.map((b, i) => (
              <div key={i} className="reportBehaviorItem" style={{ borderLeftColor: '#4dbd83' }}>
                <b style={{ fontSize: 12, color: '#d8fae8' }}>{b}</b>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Areas & Mitigation */}
        <div className="card">
          <div className="cardTop" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              <AlertTriangle size={16} color="#ffd175" /> Diagnostic Risk Areas & Focus
            </h3>
            <span className="pill orange">Actionable</span>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            {report.riskAreas.map((r, i) => (
              <div key={i} className="reportBehaviorItem" style={{ borderLeftColor: '#d5a652' }}>
                <b style={{ fontSize: 12, color: '#ffecb3' }}>{r}</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* First Week Action Plan & Manager Questions */}
      <div className="podGridTwoCol" style={{ marginBottom: 20 }}>
        {/* First Week Actions */}
        <div className="card">
          <h3 style={{ margin: '0 0 10px', fontSize: 15, color: '#b9aeff' }}>
            📅 First-Week Action Recommendations
          </h3>
          <div style={{ display: 'grid', gap: 8, fontSize: 12, color: '#d1d6e8' }}>
            {report.firstWeekActions.map((action, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#252044', color: '#a89bff', display: 'grid', placeItems: 'center', fontSize: 10, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Questions to Ask Your Manager */}
        <div className="card">
          <h3 style={{ margin: '0 0 10px', fontSize: 15, color: '#ffd175' }}>
            💬 Key Questions to Ask Your Manager in Week 1
          </h3>
          <div style={{ display: 'grid', gap: 8, fontSize: 12, color: '#ffecb8' }}>
            {report.questionsToAskManager.map((q, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: '#ffd175' }}>•</span>
                <i>{q}</i>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 30-60-90 Day Personal Goals Milestone Matrix */}
      <div className="card">
        <h3 style={{ margin: '0 0 14px', fontSize: 16 }}>
          🎯 30-60-90 Day Milestone Roadmap
        </h3>

        <div className="milestoneRoadmapGrid">
          <div className="milestoneColumn card" style={{ background: '#171a26', border: '1px solid #2b3042' }}>
            <div className="cardTop">
              <span className="pill purple">DAYS 1–30</span>
              <span className="pill green">Adapt</span>
            </div>
            <h4 style={{ margin: '8px 0 6px' }}>Foundation & Norms</h4>
            <div style={{ display: 'grid', gap: 6, fontSize: 11, color: '#c7cbde' }}>
              {report.thirtyDayGoals.map((g, i) => (
                <div key={i}>• {g}</div>
              ))}
            </div>
          </div>

          <div className="milestoneColumn card" style={{ background: '#171a26', border: '1px solid #2b3042' }}>
            <div className="cardTop">
              <span className="pill purple">DAYS 31–60</span>
              <span className="pill orange">Contribute</span>
            </div>
            <h4 style={{ margin: '8px 0 6px' }}>Ownership & Velocity</h4>
            <div style={{ display: 'grid', gap: 6, fontSize: 11, color: '#c7cbde' }}>
              {report.sixtyDayGoals.map((g, i) => (
                <div key={i}>• {g}</div>
              ))}
            </div>
          </div>

          <div className="milestoneColumn card" style={{ background: '#171a26', border: '1px solid #2b3042' }}>
            <div className="cardTop">
              <span className="pill purple">DAYS 61–90</span>
              <span className="pill green">Lead</span>
            </div>
            <h4 style={{ margin: '8px 0 6px' }}>Demonstrate Impact</h4>
            <div style={{ display: 'grid', gap: 6, fontSize: 11, color: '#c7cbde' }}>
              {report.ninetyDayGoals.map((g, i) => (
                <div key={i}>• {g}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
