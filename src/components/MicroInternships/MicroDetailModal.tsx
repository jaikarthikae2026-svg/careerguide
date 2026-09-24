import React from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Briefcase,
  Layers,
  ArrowRight,
  FileCheck,
  Building,
  User,
  Star,
  ExternalLink,
  BookOpen,
  DollarSign,
} from 'lucide-react';
import {
  MicroInternship,
} from '../../data/microInternshipData';

interface MicroDetailModalProps {
  internship: MicroInternship;
  onClose: () => void;
  onApply: (internship: MicroInternship) => void;
  onJumpToFeature: (pageName: string) => void;
  act: (msg: string, inc?: number) => void;
}

export const MicroDetailModal: React.FC<MicroDetailModalProps> = ({
  internship,
  onClose,
  onApply,
  onJumpToFeature,
  act,
}) => {
  return (
    <div className="profileModalOverlay" onClick={onClose}>
      <div
        className="profileModal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 740, maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div className="profileModalHeader">
          <div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
              <span className="pill purple">{internship.targetRole}</span>
              <span className="pill green">{internship.studentMatchPercentage}% Match</span>
              <span className="pill orange">{internship.stipendAmount}</span>
            </div>
            <h2 style={{ fontSize: 21, margin: 0 }}>{internship.title}</h2>
          </div>
          <button className="icon" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Employer Card */}
        <div className="card" style={{ background: '#161926', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div className="avatar" style={{ width: 38, height: 38, fontSize: 13, background: 'linear-gradient(135deg, #7c6df0, #4c3ba8)' }}>
              {internship.organization.logo}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <b style={{ fontSize: 14 }}>{internship.organization.name}</b>
                {internship.organization.isVerified && (
                  <span className="pill green" style={{ fontSize: 8 }}>
                    <ShieldCheck size={10} style={{ marginRight: 2 }} /> Verified
                  </span>
                )}
              </div>
              <small style={{ color: '#9da5b8', fontSize: 11 }}>
                {internship.organization.industry} · {internship.organization.location} · <b>{internship.organization.completedStudentProjects} projects completed</b>
              </small>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <small style={{ color: '#888fa0', display: 'block', fontSize: 10 }}>Supervisor</small>
            <b style={{ fontSize: 12, color: '#f0edff' }}>{internship.organization.supervisorName}</b>
            <span style={{ fontSize: 10, color: '#a2aabf', display: 'block' }}>{internship.organization.supervisorRole}</span>
          </div>
        </div>

        {/* Business Problem & Why It Matters */}
        <div className="podGridTwoCol" style={{ marginBottom: 16 }}>
          <div className="card" style={{ background: '#181b28', padding: 14 }}>
            <h4 style={{ margin: '0 0 6px', fontSize: 13, color: '#ffd175' }}>🏢 The Business Problem</h4>
            <p style={{ fontSize: 12, color: '#d8ddf0', lineHeight: 1.5, margin: 0 }}>
              {internship.businessProblem}
            </p>
          </div>

          <div className="card" style={{ background: '#181b28', padding: 14 }}>
            <h4 style={{ margin: '0 0 6px', fontSize: 13, color: '#86e5b1' }}>🎯 Why This Project Matters</h4>
            <p style={{ fontSize: 12, color: '#d8ddf0', lineHeight: 1.5, margin: 0 }}>
              {internship.whyItMatters}
            </p>
          </div>
        </div>

        {/* 5 Deliverables Checklist */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="cardTop" style={{ marginBottom: 10 }}>
            <h4 style={{ margin: 0, fontSize: 14 }}>Defined Project Deliverables ({internship.deliverables.length})</h4>
            <span className="pill purple">Structured Scope</span>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            {internship.deliverables.map((del) => (
              <div
                key={del.id}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  background: '#131520',
                  padding: 10,
                  borderRadius: 8,
                  border: '1px solid #242a3c',
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: '#252044',
                    color: '#c4bbff',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {del.stepNumber}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 12, color: '#f0edff' }}>{del.title}</b>
                    <span className="pill" style={{ fontSize: 9 }}>{del.format}</span>
                  </div>
                  <p style={{ fontSize: 11, color: '#a2aabf', margin: '3px 0 0' }}>
                    {del.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Skills Matrix with Learning Hub Remediation Links */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="cardTop" style={{ marginBottom: 10 }}>
            <h4 style={{ margin: 0, fontSize: 14 }}>Required Skills vs. Your Profile</h4>
            <span className="pill green">Skill Diagnostic</span>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            {internship.requiredSkills.map((skill) => (
              <div
                key={skill.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#141624',
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid #262c3e',
                }}
              >
                <div>
                  <b style={{ fontSize: 12, color: '#f0edff' }}>{skill.name}</b>
                  <small style={{ color: '#8e96a8', display: 'block', fontSize: 10 }}>
                    Required: <b>{skill.requiredLevel}</b> · Your Level: <span style={{ color: skill.isVerified ? '#86e5b1' : '#ffd175' }}>{skill.studentLevel}</span>
                  </small>
                </div>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {skill.isVerified ? (
                    <span className="pill green" style={{ fontSize: 9 }}>✓ Verified</span>
                  ) : (
                    <button
                      className="secondary"
                      style={{ fontSize: 9, padding: '3px 8px', height: 'auto' }}
                      onClick={() => {
                        onJumpToFeature('Learning Hub');
                        act(`Navigated to Learning Hub for ${skill.name}`);
                      }}
                    >
                      <BookOpen size={10} /> Learn in Learning Hub
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6-Step Selection Process */}
        <div className="card" style={{ marginBottom: 16, background: '#151825' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: 13 }}>6-Step Selection & Verification Flow</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, fontSize: 11, color: '#c7cbde' }}>
            {internship.selectionProcess.map((step, idx) => (
              <div key={idx} style={{ background: '#121420', padding: 8, borderRadius: 6, border: '1px solid #23283a' }}>
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Important Terms & Non-Guarantee Disclaimer */}
        <div className="card" style={{ background: '#121420', border: '1px solid #282e42', marginBottom: 18 }}>
          <h4 style={{ margin: '0 0 8px', fontSize: 13, color: '#c4bbff' }}>Important Terms & Policies</h4>
          <div style={{ display: 'grid', gap: 6, fontSize: 11, color: '#a2aabf' }}>
            <div>💰 <b>Payment:</b> {internship.terms.paymentTerms}</div>
            <div>⏱️ <b>Expected Commitment:</b> {internship.terms.expectedHours}</div>
            <div>📁 <b>Portfolio Rights:</b> {internship.terms.workOwnership}</div>
            <div>💼 <b>Interview Consideration:</b> {internship.terms.interviewConsiderationTerms}</div>
          </div>

          <div className="disclaimerBanner" style={{ marginTop: 12 }}>
            <AlertCircle size={14} color="#ffd175" style={{ flexShrink: 0 }} />
            <small style={{ fontSize: 10, color: '#ffd175' }}>
              <b>Notice:</b> {internship.terms.disclaimer}
            </small>
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
              onApply(internship);
              onClose();
              act(`Proceeding to apply for ${internship.title}`, 15);
            }}
          >
            Apply for Micro-Internship <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
