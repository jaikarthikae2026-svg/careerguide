import React, { useState } from 'react';
import {
  X,
  Star,
  Award,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Eye,
  TrendingUp,
  ArrowRight,
  Send,
  FileCheck,
} from 'lucide-react';
import {
  EmployerReview,
  sampleEmployerReviews,
} from '../../data/microInternshipData';

interface EmployerReviewModalProps {
  review?: EmployerReview;
  onClose: () => void;
  onJumpToFeature: (pageName: string) => void;
  act: (msg: string, inc?: number) => void;
}

export const EmployerReviewModal: React.FC<EmployerReviewModalProps> = ({
  review = sampleEmployerReviews[0],
  onClose,
  onJumpToFeature,
  act,
}) => {
  const [visibility, setVisibility] = useState<'Private' | 'Mentors only' | 'Recruiters only' | 'Public preview'>('Recruiters only');
  const [passportAdded, setPassportAdded] = useState(false);

  const handleApprovePassport = () => {
    setPassportAdded(true);
    act('Verified Experience Badge added to Career Passport with visibility: ' + visibility, 30);
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
            <p className="eyebrow">STRUCTURED EMPLOYER EVALUATION</p>
            <h2 style={{ fontSize: 20, margin: 0 }}>Employer Review & Verification</h2>
          </div>
          <button className="icon" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Hero Review Card */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #221940, #141724)', border: '1px solid #4a3d7d', marginBottom: 16 }}>
          <div className="cardTop">
            <div>
              <b style={{ fontSize: 15, color: '#f0edff' }}>{review.projectName}</b>
              <small style={{ color: '#9da5b8', display: 'block', marginTop: 2 }}>
                Reviewed by <b>{review.reviewerName}</b> ({review.reviewerRole} at {review.organizationName})
              </small>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#ffd175' }}>
                {review.overallScore} <span style={{ fontSize: 13, color: '#a2aabf' }}>/ 5</span>
              </div>
              <span className="pill green" style={{ fontSize: 8 }}>Verified Score</span>
            </div>
          </div>
        </div>

        {/* 6-Dimension Ratings Grid */}
        <div className="card" style={{ marginBottom: 16 }}>
          <h4 style={{ margin: '0 0 10px', fontSize: 13 }}>Performance Across 6 Employer Dimensions</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#131520', padding: 8, borderRadius: 6 }}>
              <span style={{ color: '#c7cbde' }}>Deliverable Quality:</span>
              <b style={{ color: '#ffd175' }}>★ {review.ratings.deliverableQuality}/5</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#131520', padding: 8, borderRadius: 6 }}>
              <span style={{ color: '#c7cbde' }}>Technical Correctness:</span>
              <b style={{ color: '#ffd175' }}>★ {review.ratings.technicalCorrectness}/5</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#131520', padding: 8, borderRadius: 6 }}>
              <span style={{ color: '#c7cbde' }}>Communication:</span>
              <b style={{ color: '#ffd175' }}>★ {review.ratings.communication}/5</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#131520', padding: 8, borderRadius: 6 }}>
              <span style={{ color: '#c7cbde' }}>Deadline Reliability:</span>
              <b style={{ color: '#ffd175' }}>★ {review.ratings.deadlineReliability}/5</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#131520', padding: 8, borderRadius: 6 }}>
              <span style={{ color: '#c7cbde' }}>Problem-Solving:</span>
              <b style={{ color: '#ffd175' }}>★ {review.ratings.problemSolving}/5</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#131520', padding: 8, borderRadius: 6 }}>
              <span style={{ color: '#c7cbde' }}>Feedback Response:</span>
              <b style={{ color: '#ffd175' }}>★ {review.ratings.feedbackResponse}/5</b>
            </div>
          </div>
        </div>

        {/* Written Strength & Improvement Feedback */}
        <div className="feedbackSplitGrid" style={{ marginBottom: 16 }}>
          <div className="strengthBox">
            <h5 style={{ margin: '0 0 4px', color: '#86e5b1', fontSize: 11 }}>✓ STRENGTH IDENTIFIED:</h5>
            <p style={{ fontSize: 11, color: '#d8fae8', margin: 0 }}>{review.strengthSummary}</p>
          </div>
          <div className="improvementBox">
            <h5 style={{ margin: '0 0 4px', color: '#ffd175', fontSize: 11 }}>⚡ NEXT IMPROVEMENT ACTION:</h5>
            <p style={{ fontSize: 11, color: '#ffecb8', margin: 0 }}>{review.improvementSummary}</p>
          </div>
        </div>

        {/* Readiness Analytics Impact Preview */}
        <div className="card" style={{ background: '#161926', marginBottom: 16 }}>
          <div className="cardTop" style={{ marginBottom: 8 }}>
            <h4 style={{ margin: 0, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              <TrendingUp size={14} color="#86e5b1" /> Readiness Analytics Impact
            </h4>
            <span className="pill green">Verified Signal</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, textAlign: 'center' }}>
            <div style={{ background: '#121420', padding: 8, borderRadius: 6 }}>
              <small style={{ color: '#8e96a8', display: 'block', fontSize: 10 }}>Project Readiness</small>
              <b style={{ color: '#86e5b1', fontSize: 13 }}>54% → 73%</b>
            </div>
            <div style={{ background: '#121420', padding: 8, borderRadius: 6 }}>
              <small style={{ color: '#8e96a8', display: 'block', fontSize: 10 }}>Technical Evidence</small>
              <b style={{ color: '#86e5b1', fontSize: 13 }}>62% → 78%</b>
            </div>
            <div style={{ background: '#121420', padding: 8, borderRadius: 6 }}>
              <small style={{ color: '#8e96a8', display: 'block', fontSize: 10 }}>Workplace Communication</small>
              <b style={{ color: '#86e5b1', fontSize: 13 }}>68% → 79%</b>
            </div>
          </div>
        </div>

        {/* Career Passport Verification Visibility Settings */}
        <div className="card" style={{ background: '#151724', border: '1px solid #2d3448', marginBottom: 18 }}>
          <div className="cardTop" style={{ marginBottom: 8 }}>
            <h4 style={{ margin: 0, fontSize: 13, color: '#c4bbff' }}>Publish to AI Career Passport</h4>
            <span className="pill purple">Portfolio Control</span>
          </div>

          <div className="profileField" style={{ marginBottom: 10 }}>
            <span>Choose Verified Experience Visibility:</span>
            <select
              className="filterSelect"
              style={{ width: '100%' }}
              value={visibility}
              onChange={(e: any) => setVisibility(e.target.value)}
            >
              <option value="Recruiters only">Recruiters only (Recommended)</option>
              <option value="Mentors only">Mentors only</option>
              <option value="Public preview">Public preview (Shareable link)</option>
              <option value="Private">Private (Draft only)</option>
            </select>
          </div>

          <p style={{ fontSize: 11, color: '#9da5b8', margin: 0 }}>
            Only verified project links and employer ratings will be displayed. Your contact details remain private.
          </p>
        </div>

        {/* Actions */}
        <div className="profileActions">
          <button type="button" className="secondary" onClick={onClose}>
            Close
          </button>
          {passportAdded ? (
            <button
              className="secondary"
              type="button"
              onClick={() => {
                onJumpToFeature('Career Passport');
                onClose();
                act('Navigated to Career Passport');
              }}
            >
              View in Career Passport <ArrowRight size={14} />
            </button>
          ) : (
            <button className="primary" type="button" onClick={handleApprovePassport}>
              Approve & Add to Career Passport <ShieldCheck size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
