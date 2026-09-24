import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Send,
  FileText,
  User,
  Briefcase,
  Check,
  ExternalLink,
} from 'lucide-react';
import {
  MicroInternship,
  StudentApplication,
} from '../../data/microInternshipData';

interface ApplicationModalProps {
  internship: MicroInternship;
  onClose: () => void;
  onSubmitSuccess: (newApp: StudentApplication) => void;
  onJumpToFeature: (pageName: string) => void;
  act: (msg: string, inc?: number) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  internship,
  onClose,
  onSubmitSuccess,
  onJumpToFeature,
  act,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedResume, setSelectedResume] = useState('ATS_Software_Dev_Resume_v3.pdf');
  const [selectedProject, setSelectedProject] = useState('Placement Analytics Dashboard (GitHub)');
  const [availabilityHours, setAvailabilityHours] = useState('8-10 hours/week');
  const [motivationText, setMotivationText] = useState(
    `I am deeply interested in '${internship.title}' because it addresses real-world ${internship.targetRole} challenges. I recently completed projects in ${internship.requiredSkills.slice(0, 2).map((s) => s.name).join(' & ')}, and I hope to strengthen my production-grade deliverable standards and gain direct supervisor feedback from ${internship.organization.name}.`
  );
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleGenerateAiDraft = () => {
    setMotivationText(
      `As an aspiring ${internship.targetRole}, I am eager to contribute to ${internship.organization.name}'s project '${internship.title}'. I have strong hands-on experience in ${internship.requiredSkills[0]?.name || 'core technologies'} and have verified my foundational skills through CareerOS assessments. I am committed to meeting all 5 project milestones, communicating proactive weekly updates, and incorporating supervisor guidance into the final deliverable.`
    );
    act('Generated AI-assisted motivation statement draft', 10);
  };

  const handleFinalSubmit = () => {
    const newApplication: StudentApplication = {
      id: 'app-' + Date.now(),
      internshipId: internship.id,
      internshipTitle: internship.title,
      organizationName: internship.organization.name,
      targetRole: internship.targetRole,
      appliedDate: 'Just now',
      status: 'Submitted',
      expectedResponseDate: 'Within 48 hours',
      matchScore: internship.studentMatchPercentage,
      stipendAmount: internship.stipendAmount,
      motivationStatement: motivationText,
    };
    onSubmitSuccess(newApplication);
    setStep(5); // Success state
    act(`Application submitted for ${internship.title}! (+50 XP)`, 50);
  };

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
            <p className="eyebrow">STRUCTURED APPLICATION FLOW · STEP {step} OF 4</p>
            <h2 style={{ fontSize: 20, margin: 0 }}>Apply to {internship.organization.name}</h2>
          </div>
          <button className="icon" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        {step <= 4 && (
          <div className="applicationStepperBar" style={{ display: 'flex', gap: 6, margin: '14px 0 18px' }}>
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  background: step >= s ? '#8777f2' : '#282e42',
                  transition: '0.2s',
                }}
              />
            ))}
          </div>
        )}

        {/* STEP 1: ELIGIBILITY & GAPS */}
        {step === 1 && (
          <div className="stepEligibility">
            <div className="card" style={{ background: '#161925', marginBottom: 14 }}>
              <div className="cardTop">
                <b>Candidate Match Diagnostic</b>
                <span className="pill green">{internship.studentMatchPercentage}% Match</span>
              </div>
              <p style={{ fontSize: 12, color: '#c7cbde', margin: '4px 0 10px' }}>
                Based on your Career Passport, Skill Tree, and Learning Hub history.
              </p>

              <div style={{ display: 'grid', gap: 6, fontSize: 11 }}>
                <div style={{ color: '#86e5b1', fontWeight: 700 }}>✓ Verified Strengths in Profile:</div>
                {internship.requiredSkills.filter((s) => s.isVerified).map((s) => (
                  <div key={s.name} style={{ color: '#d8fae8' }}>• {s.name} (Verified Level: {s.studentLevel})</div>
                ))}

                {internship.requiredSkills.some((s) => !s.isVerified) && (
                  <>
                    <div style={{ color: '#ffd175', fontWeight: 700, marginTop: 8 }}>⚡ Recommended Preparation Gaps:</div>
                    {internship.requiredSkills.filter((s) => !s.isVerified).map((s) => (
                      <div key={s.name} style={{ color: '#ffe6b3' }}>
                        • {s.name} (Required: {s.requiredLevel})
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className="profileActions" style={{ marginTop: 16 }}>
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  onJumpToFeature('Learning Hub');
                  act('Navigated to Learning Hub to improve match');
                }}
              >
                Improve My Match in Learning Hub
              </button>
              <button className="primary" type="button" onClick={() => setStep(2)}>
                Continue Application <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROFILE & RESUME EVIDENCE */}
        {step === 2 && (
          <div className="stepProfileEvidence">
            <div className="profileField" style={{ marginBottom: 14 }}>
              <span>Select Verified Resume Version:</span>
              <select
                className="filterSelect"
                style={{ width: '100%' }}
                value={selectedResume}
                onChange={(e) => setSelectedResume(e.target.value)}
              >
                <option value="ATS_Software_Dev_Resume_v3.pdf">ATS_Software_Dev_Resume_v3.pdf (Score: 88%)</option>
                <option value="Data_Analytics_Resume_v2.pdf">Data_Analytics_Resume_v2.pdf (Score: 84%)</option>
              </select>
            </div>

            <div className="profileField" style={{ marginBottom: 14 }}>
              <span>Attach Featured Portfolio Project:</span>
              <select
                className="filterSelect"
                style={{ width: '100%' }}
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="Placement Analytics Dashboard (GitHub)">Placement Analytics Dashboard (GitHub & Live Demo)</option>
                <option value="Accessible Merchant Checkout Flow (React)">Accessible Merchant Checkout Flow (React & TypeScript)</option>
              </select>
            </div>

            <div className="profileField" style={{ marginBottom: 14 }}>
              <span>Weekly Availability Commitment:</span>
              <input
                value={availabilityHours}
                onChange={(e) => setAvailabilityHours(e.target.value)}
              />
            </div>

            <div className="profileActions" style={{ marginTop: 16 }}>
              <button type="button" className="secondary" onClick={() => setStep(1)}>
                <ArrowLeft size={14} /> Back
              </button>
              <button className="primary" type="button" onClick={() => setStep(3)}>
                Next: Motivation <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: MOTIVATION STATEMENT */}
        {step === 3 && (
          <div className="stepMotivation">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#f0edff' }}>
                Why are you interested in this project & what do you hope to learn?
              </span>
              <button
                type="button"
                className="secondary"
                style={{ fontSize: 10, padding: '3px 8px', height: 'auto' }}
                onClick={handleGenerateAiDraft}
              >
                <Sparkles size={11} color="#ffd175" /> Generate AI Draft
              </button>
            </div>

            <textarea
              className="workplaceTextarea"
              rows={6}
              value={motivationText}
              onChange={(e) => setMotivationText(e.target.value)}
            />

            <div className="profileActions" style={{ marginTop: 16 }}>
              <button type="button" className="secondary" onClick={() => setStep(2)}>
                <ArrowLeft size={14} /> Back
              </button>
              <button className="primary" type="button" onClick={() => setStep(4)}>
                Next: Confirmation <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: TERMS & FINAL CONFIRMATION */}
        {step === 4 && (
          <div className="stepConfirmation">
            <div className="card" style={{ background: '#141724', border: '1px solid #293246', marginBottom: 14 }}>
              <h4 style={{ margin: '0 0 8px', fontSize: 13, color: '#86e5b1' }}>Application Summary & Commitment</h4>
              <div style={{ display: 'grid', gap: 6, fontSize: 11, color: '#c7cbde' }}>
                <div>• <b>Project:</b> {internship.title}</div>
                <div>• <b>Organization:</b> {internship.organization.name}</div>
                <div>• <b>Duration:</b> {internship.durationLabel} ({internship.weeklyTimeCommitment})</div>
                <div>• <b>Compensation:</b> {internship.stipendAmount}</div>
                <div>• <b>Supervisor:</b> {internship.organization.supervisorName}</div>
              </div>
            </div>

            <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 11, color: '#cbd2e8', cursor: 'pointer', margin: '14px 0' }}>
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                style={{ marginTop: 2 }}
              />
              <span>
                I agree to complete the 5 deliverables before the deadline, adhere to professional communication standards, and acknowledge that completion provides verified experience and employer review (employment or referral is not guaranteed).
              </span>
            </label>

            <div className="profileActions" style={{ marginTop: 16 }}>
              <button type="button" className="secondary" onClick={() => setStep(3)}>
                <ArrowLeft size={14} /> Back
              </button>
              <button
                className="primary"
                type="button"
                disabled={!termsAgreed || !motivationText.trim()}
                onClick={handleFinalSubmit}
              >
                Submit Micro-Internship Application <Send size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CELEBRATION & NEXT ACTION */}
        {step === 5 && (
          <div className="stepSuccessCelebration" style={{ textAlign: 'center', padding: '16px 8px' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#1c382c', color: '#86e5b1', display: 'grid', placeItems: 'center', margin: '0 auto 14px' }}>
              <CheckCircle2 size={32} />
            </div>

            <h2 style={{ fontSize: 22, margin: '0 0 6px', color: '#f0edff' }}>Application Submitted!</h2>
            <p style={{ fontSize: 12, color: '#c7cbde', maxWidth: 440, margin: '0 auto 16px' }}>
              Your application for <b>{internship.title}</b> has been received by {internship.organization.name}. Expected review decision within <b>48 hours</b>.
            </p>

            <div className="card" style={{ background: '#161925', textAlign: 'left', marginBottom: 18 }}>
              <b style={{ fontSize: 12, color: '#ffd175', display: 'block', marginBottom: 6 }}>
                ⚡ Recommended Next Preparation Action:
              </b>
              <p style={{ fontSize: 11, color: '#d8ddf0', margin: 0, lineHeight: 1.45 }}>
                Practise the <b>"Update your manager before deadline is at risk"</b> scenario in <b>WorkReady</b> to ensure high supervisor ratings during your project.
              </p>
            </div>

            <div className="buttonRow" style={{ justifyContent: 'center' }}>
              <button
                className="secondary"
                onClick={() => {
                  onJumpToFeature('WorkReady');
                  onClose();
                  act('Navigated to WorkReady simulation');
                }}
              >
                Practise in WorkReady
              </button>
              <button className="primary" onClick={onClose}>
                Done & View Applications
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
