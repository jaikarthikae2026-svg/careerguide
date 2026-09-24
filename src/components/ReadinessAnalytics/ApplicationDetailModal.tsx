import React from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  FileText,
  Building,
  User,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
import {
  JobApplication,
} from '../../data/rejectionIntelligenceData';

interface ApplicationDetailModalProps {
  application: JobApplication;
  onClose: () => void;
  onStartImprovementPlan: () => void;
  onJumpToFeature: (pageName: string) => void;
  act: (msg: string, inc?: number) => void;
}

export const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({
  application,
  onClose,
  onStartImprovementPlan,
  onJumpToFeature,
  act,
}) => {
  return (
    <div className="profileModalOverlay" onClick={onClose}>
      <div
        className="profileModal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 660, maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div className="profileModalHeader">
          <div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
              <span className="pill purple">{application.role}</span>
              <span
                className={`pill ${application.outcome === 'Active' ? 'green' : 'orange'}`}
                style={{ fontSize: 9 }}
              >
                {application.currentStage}
              </span>
            </div>
            <h2 style={{ fontSize: 20, margin: 0 }}>{application.company} Application Post-Mortem</h2>
          </div>
          <button className="icon" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Application Meta Info */}
        <div className="card" style={{ background: '#161926', marginBottom: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11, color: '#c7cbde' }}>
          <div>📍 <b>Location:</b> {application.location} ({application.workMode})</div>
          <div>📅 <b>Applied:</b> {application.applicationDate}</div>
          <div>📄 <b>Resume:</b> {application.resumeVersion}</div>
          <div>🔗 <b>Source:</b> {application.source} {application.referralUsed ? `(Referral: ${application.referralUsed})` : ''}</div>
        </div>

        {/* What We Know vs What Pattern Suggests */}
        <div className="podGridTwoCol" style={{ marginBottom: 14 }}>
          {/* Confirmed Feedback */}
          <div className="card" style={{ background: '#141825', border: '1px solid #282f42' }}>
            <div className="cardTop" style={{ marginBottom: 6 }}>
              <b style={{ fontSize: 12, color: '#86e5b1', display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle2 size={13} /> WHAT WE KNOW
              </b>
              <span className="pill green" style={{ fontSize: 8 }}>Confirmed</span>
            </div>
            <p style={{ fontSize: 11, color: '#d8fae8', margin: 0, lineHeight: 1.45 }}>
              {application.employerFeedback || 'No direct employer feedback was provided for this application.'}
            </p>
          </div>

          {/* Pattern Inference */}
          <div className="card" style={{ background: '#191830', border: '1px solid #3c3468' }}>
            <div className="cardTop" style={{ marginBottom: 6 }}>
              <b style={{ fontSize: 12, color: '#ffd175', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Sparkles size={13} /> WHAT THE PATTERN SUGGESTS
              </b>
              <span className="pill purple" style={{ fontSize: 8 }}>Analytical Signal</span>
            </div>
            <p style={{ fontSize: 11, color: '#ffecb3', margin: 0, lineHeight: 1.45 }}>
              {application.patternInference ||
                'Your React project evidence is strong, but timed problem-solving and automated unit testing were key differentiators for this role.'}
            </p>
          </div>
        </div>

        {/* Projects Attached */}
        {application.appliedProjects && application.appliedProjects.length > 0 && (
          <div className="card" style={{ background: '#131520', marginBottom: 14 }}>
            <small style={{ color: '#888fa0', display: 'block', marginBottom: 4 }}>Project Proof Attached to Application:</small>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {application.appliedProjects.map((proj) => (
                <span key={proj} className="pill purple" style={{ fontSize: 9 }}>
                  📁 {proj}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Action Items */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #1c1834, #141724)', border: '1px solid #3c326b', marginBottom: 16 }}>
          <h4 style={{ margin: '0 0 8px', fontSize: 13, color: '#c4bbff' }}>Recommended Recovery Actions</h4>
          <div style={{ display: 'grid', gap: 6, fontSize: 11, color: '#edf0f8' }}>
            <div>1. Complete timed JavaScript & Async problem-solving track in Learning Hub.</div>
            <div>2. Add 10 Vitest unit tests to your primary React repository.</div>
            <div>3. Complete 2 timed technical mock interviews in Mock Arena.</div>
            <div>4. Reapply to similar frontend roles with updated evidence.</div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="profileActions">
          <button type="button" className="secondary" onClick={onClose}>
            Close
          </button>
          <button
            className="primary"
            type="button"
            onClick={() => {
              onClose();
              onStartImprovementPlan();
              act(`Started recovery plan for ${application.company} application`, 15);
            }}
          >
            Start Improvement Plan <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
