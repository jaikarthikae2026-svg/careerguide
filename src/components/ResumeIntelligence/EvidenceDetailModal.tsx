import React from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  EyeOff,
  AlertCircle,
  Clock,
  Layers,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import {
  HiddenStrength,
} from '../../data/hiddenStrengthsData';

interface EvidenceDetailModalProps {
  strength: HiddenStrength;
  onClose: () => void;
  onOpenResumeApproval: (strength: HiddenStrength) => void;
  onHideStrength: (id: string) => void;
  onMarkInaccurate: (id: string) => void;
  act: (msg: string, inc?: number) => void;
}

export const EvidenceDetailModal: React.FC<EvidenceDetailModalProps> = ({
  strength,
  onClose,
  onOpenResumeApproval,
  onHideStrength,
  onMarkInaccurate,
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
              <span className="pill purple">{strength.category}</span>
              <span
                className={`pill ${
                  strength.confidence === 'High confidence'
                    ? 'green'
                    : strength.confidence === 'Emerging strength'
                    ? 'orange'
                    : 'blue'
                }`}
                style={{ fontSize: 9 }}
              >
                {strength.confidence}
              </span>
            </div>
            <h2 style={{ fontSize: 20, margin: 0 }}>Why CareerOS Identified This</h2>
          </div>
          <button className="icon" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Strength Title Card */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #221940, #141724)', border: '1px solid #4a3d7d', marginBottom: 14 }}>
          <div className="cardTop">
            <div>
              <b style={{ fontSize: 16, color: '#f0edff' }}>{strength.title}</b>
              <small style={{ color: '#9da5b8', display: 'block', marginTop: 2 }}>
                Evidence Count: <b>{strength.evidenceCount} verified observations</b> · Last updated: <b>{strength.lastUpdated}</b>
              </small>
            </div>
            <span className="pill green" style={{ fontSize: 9 }}>Verified Signal</span>
          </div>
        </div>

        {/* Observed Behavior & Career Insight */}
        <div className="podGridTwoCol" style={{ marginBottom: 14 }}>
          <div className="card" style={{ background: '#141825', border: '1px solid #282f42' }}>
            <div className="cardTop" style={{ marginBottom: 6 }}>
              <b style={{ fontSize: 12, color: '#c4bbff' }}>OBSERVED BEHAVIOR</b>
            </div>
            <p style={{ fontSize: 11, color: '#e2e0ff', margin: 0, lineHeight: 1.45 }}>
              {strength.observedBehavior}
            </p>
          </div>

          <div className="card" style={{ background: '#161d2a', border: '1px solid #2e3e5c' }}>
            <div className="cardTop" style={{ marginBottom: 6 }}>
              <b style={{ fontSize: 12, color: '#86e5b1' }}>MEASURABLE OUTCOME</b>
            </div>
            <p style={{ fontSize: 11, color: '#d8fae8', margin: 0, lineHeight: 1.45 }}>
              {strength.relevantOutcome}
            </p>
          </div>
        </div>

        {/* Evidence Sources List */}
        <div className="card" style={{ marginBottom: 14 }}>
          <h4 style={{ margin: '0 0 10px', fontSize: 13 }}>5 Verified Evidence Sources</h4>
          <div style={{ display: 'grid', gap: 8 }}>
            {strength.evidenceSources.map((source, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#131520',
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid #24293a',
                  fontSize: 11,
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CheckCircle2 size={13} color="#86e5b1" />
                  <div>
                    <b style={{ color: '#f0edff' }}>{source.label}</b>
                    <span style={{ color: '#8e96a8', marginLeft: 6 }}>({source.detail})</span>
                  </div>
                </div>
                <span className="pill purple" style={{ fontSize: 8 }}>
                  {source.sourceModule}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Target Roles Where This Strength Is Useful */}
        <div className="card" style={{ background: '#131520', marginBottom: 16 }}>
          <small style={{ color: '#888fa0', display: 'block', marginBottom: 6 }}>
            Target Roles Where This Strength Creates Advantage:
          </small>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {strength.targetRoles.map((role) => (
              <span key={role} className="pill green" style={{ fontSize: 9 }}>
                🎯 {role}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="profileActions" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              className="secondary"
              style={{ fontSize: 11, padding: '6px 10px' }}
              onClick={() => {
                onHideStrength(strength.id);
                onClose();
                act(`Hidden insight: ${strength.title}`);
              }}
            >
              <EyeOff size={12} /> Hide Insight
            </button>
            <button
              type="button"
              className="secondary"
              style={{ fontSize: 11, padding: '6px 10px' }}
              onClick={() => {
                onMarkInaccurate(strength.id);
                onClose();
                act(`Marked ${strength.title} as inaccurate for retraining`);
              }}
            >
              <AlertCircle size={12} /> Mark Inaccurate
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className="secondary" onClick={onClose}>
              Close
            </button>
            <button
              className="primary"
              type="button"
              onClick={() => {
                onClose();
                onOpenResumeApproval(strength);
              }}
            >
              Add to Resume <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
