import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  FileText,
  MessageSquare,
  ArrowRight,
  Save,
} from 'lucide-react';
import {
  HiddenStrength,
} from '../../data/hiddenStrengthsData';

interface ResumeApprovalModalProps {
  strength: HiddenStrength;
  onClose: () => void;
  onApplyToResume: (bulletText: string, summaryText: string) => void;
  act: (msg: string, inc?: number) => void;
}

export const ResumeApprovalModal: React.FC<ResumeApprovalModalProps> = ({
  strength,
  onClose,
  onApplyToResume,
  act,
}) => {
  const [bullet, setBullet] = useState(strength.generatedContent.resumeBullet);
  const [summary, setSummary] = useState(strength.generatedContent.professionalSummary);
  const [story, setStory] = useState(strength.generatedContent.interviewStory);
  const [passportVisibility, setPassportVisibility] = useState<'Recruiters only' | 'Mentors only' | 'Public preview' | 'Private'>('Recruiters only');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    act(`Copied ${sectionName} to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleConfirmAddToResume = () => {
    onApplyToResume(bullet, summary);
    act(`Added evidence-backed strength to resume and Career Passport (${passportVisibility})! (+25 XP)`, 25);
    onClose();
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
            <p className="eyebrow">RESUME CONTENT GENERATION & APPROVAL</p>
            <h2 style={{ fontSize: 20, margin: 0 }}>Review & Approve Strength Wording</h2>
          </div>
          <button className="icon" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Strength Header */}
        <div className="card" style={{ background: '#161926', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="pill purple" style={{ fontSize: 9 }}>{strength.category}</span>
            <h3 style={{ margin: '4px 0 2px', fontSize: 16 }}>{strength.title}</h3>
            <small style={{ color: '#8e96a8', fontSize: 11 }}>Based on {strength.evidenceCount} verified observations</small>
          </div>
          <span className="pill green" style={{ fontSize: 9 }}>✓ Evidence-Backed</span>
        </div>

        {/* 1. Resume Bullet */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div className="cardTop" style={{ marginBottom: 6 }}>
            <b style={{ fontSize: 12, color: '#c4bbff', display: 'flex', alignItems: 'center', gap: 6 }}>
              <FileText size={13} /> 1. RESUME EXPERIENCE BULLET
            </b>
            <button
              className="secondary"
              style={{ fontSize: 10, padding: '3px 8px', height: 'auto' }}
              onClick={() => handleCopy(bullet, 'Resume Bullet')}
            >
              {copiedSection === 'Resume Bullet' ? <Check size={11} /> : <Copy size={11} />} Copy Bullet
            </button>
          </div>
          <textarea
            className="workplaceTextarea"
            rows={2}
            value={bullet}
            onChange={(e) => setBullet(e.target.value)}
          />
        </div>

        {/* 2. Professional Summary */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div className="cardTop" style={{ marginBottom: 6 }}>
            <b style={{ fontSize: 12, color: '#c4bbff', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={13} /> 2. PROFESSIONAL SUMMARY SENTENCE
            </b>
            <button
              className="secondary"
              style={{ fontSize: 10, padding: '3px 8px', height: 'auto' }}
              onClick={() => handleCopy(summary, 'Professional Summary')}
            >
              {copiedSection === 'Professional Summary' ? <Check size={11} /> : <Copy size={11} />} Copy Summary
            </button>
          </div>
          <textarea
            className="workplaceTextarea"
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        {/* 3. Interview Story Narrative */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div className="cardTop" style={{ marginBottom: 6 }}>
            <b style={{ fontSize: 12, color: '#86e5b1', display: 'flex', alignItems: 'center', gap: 6 }}>
              <MessageSquare size={13} /> 3. INTERVIEW SPEAKING STORY (STAR FORMAT)
            </b>
            <button
              className="secondary"
              style={{ fontSize: 10, padding: '3px 8px', height: 'auto' }}
              onClick={() => handleCopy(story, 'Interview Story')}
            >
              {copiedSection === 'Interview Story' ? <Check size={11} /> : <Copy size={11} />} Copy Story
            </button>
          </div>
          <textarea
            className="workplaceTextarea"
            rows={3}
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>

        {/* Career Passport Visibility */}
        <div className="card" style={{ background: '#131520', border: '1px solid #282e42', marginBottom: 16 }}>
          <div className="cardTop" style={{ marginBottom: 6 }}>
            <small style={{ color: '#c4bbff', fontWeight: 700 }}>Add to AI Career Passport with Visibility:</small>
            <span className="pill purple" style={{ fontSize: 8 }}>Portfolio Control</span>
          </div>
          <select
            className="filterSelect"
            style={{ width: '100%' }}
            value={passportVisibility}
            onChange={(e: any) => setPassportVisibility(e.target.value)}
          >
            <option value="Recruiters only">Recruiters only (Recommended for campus placements)</option>
            <option value="Mentors only">Mentors only</option>
            <option value="Public preview">Public preview (Shareable link)</option>
            <option value="Private">Private (Draft only)</option>
          </select>
        </div>

        {/* Actions */}
        <div className="profileActions">
          <button type="button" className="secondary" onClick={onClose}>
            Reject Suggestion
          </button>
          <button className="primary" type="button" onClick={handleConfirmAddToResume}>
            Approve & Add to Current Resume <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
