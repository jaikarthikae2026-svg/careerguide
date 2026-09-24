import React, { useState } from 'react';
import {
  Building2,
  Award,
  Calendar,
  Clock,
  Briefcase,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Users,
  X,
  ArrowRight,
  Filter,
  Check,
} from 'lucide-react';
import {
  EmployerOpportunity,
  employerOpportunitiesData,
} from '../../data/networkData';

interface OpportunitiesProps {
  opportunities?: EmployerOpportunity[];
  onSelectOpportunity?: (opp: EmployerOpportunity) => void;
  act: (msg: string, inc?: number) => void;
}

export const Opportunities: React.FC<OpportunitiesProps> = ({
  opportunities = employerOpportunitiesData,
  act,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'ALL' | 'CHALLENGE' | 'HIRING_ROOM' | 'MICRO_INTERNSHIP' | 'OFFICE_HOUR' | 'JOB'
  >('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [selectedOppForApply, setSelectedOppForApply] = useState<EmployerOpportunity | null>(null);
  const [registeredIds, setRegisteredIds] = useState<string[]>(['opp-4']);

  const filteredOpps = opportunities.filter((opp) => {
    if (selectedCategory !== 'ALL' && opp.type !== selectedCategory) return false;
    if (selectedDifficulty !== 'ALL' && opp.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const handleApply = (opp: EmployerOpportunity) => {
    if (registeredIds.includes(opp.id)) {
      act(`Already registered for ${opp.title}`);
      return;
    }
    setSelectedOppForApply(opp);
  };

  const handleConfirmRegistration = () => {
    if (!selectedOppForApply) return;
    setRegisteredIds([...registeredIds, selectedOppForApply.id]);
    const oppName = selectedOppForApply.title;
    setSelectedOppForApply(null);
    act(`Registered for ${oppName}! Submission workspace unlocked.`, 40);
  };

  return (
    <div className="opportunitiesSection">
      {/* Title */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">HIGH-SIGNAL ACCESS</p>
          <h1>Employer Challenges & Hiring Rooms</h1>
          <p className="muted">
            Direct access to employer opportunities, live engineering rooms, and micro-internships designed for high-signal student builders.
          </p>
        </div>

        <div className="card statCard" style={{ padding: '10px 16px', background: '#1c2438' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Sparkles size={18} color="#ffd175" />
            <div>
              <small>Verified Partner Status</small>
              <b style={{ fontSize: 13, color: '#86e5b1', display: 'block' }}>Direct Fast-Track Active</b>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="filterToolbar card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { key: 'ALL', label: 'All Opportunities' },
            { key: 'CHALLENGE', label: '🏆 Employer Challenges' },
            { key: 'HIRING_ROOM', label: '🚪 Live Hiring Rooms' },
            { key: 'MICRO_INTERNSHIP', label: '💼 Micro-Internships' },
            { key: 'OFFICE_HOUR', label: '🎙️ Industry Office Hours' },
            { key: 'JOB', label: '🚀 Role-Specific Jobs' },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`pill ${selectedCategory === key ? 'purple' : ''}`}
              style={{ padding: '6px 12px', cursor: 'pointer' }}
              onClick={() => setSelectedCategory(key as any)}
            >
              {label}
            </button>
          ))}

          <select
            className="filterSelect"
            style={{ marginLeft: 'auto' }}
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="ALL">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="opportunitiesGrid">
        {filteredOpps.map((opp) => {
          const isRegistered = registeredIds.includes(opp.id);
          return (
            <div className="card oppCard" key={opp.id}>
              <div className="cardTop">
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div className="avatar" style={{ width: 38, height: 38, fontSize: 12, background: 'linear-gradient(135deg, #7c6cf0, #423594)', color: '#fff' }}>
                    {opp.logo}
                  </div>
                  <div>
                    <b>{opp.organization}</b>
                    <span className="pill purple" style={{ fontSize: 9, marginLeft: 6 }}>{opp.type.replace('_', ' ')}</span>
                  </div>
                </div>

                <div className="matchScoreBadge">
                  <small>Match</small>
                  <b>{opp.studentReadinessMatch}%</b>
                </div>
              </div>

              <h3 style={{ fontSize: 17, margin: '14px 0 6px' }}>{opp.title}</h3>
              <p className="muted" style={{ fontSize: 12, lineHeight: 1.5, minHeight: 45 }}>
                {opp.description}
              </p>

              <div className="podTags" style={{ margin: '10px 0' }}>
                {opp.skillsRequired.map((s) => (
                  <span key={s} className="pill" style={{ fontSize: 9 }}>{s}</span>
                ))}
              </div>

              <div className="oppDetailsGrid">
                <div>
                  <small>Target Role</small>
                  <b>{opp.targetRole}</b>
                </div>
                <div>
                  <small>Deadline</small>
                  <b style={{ color: '#ffd175' }}>{opp.deadline}</b>
                </div>
                <div>
                  <small>Compensation / Prize</small>
                  <b style={{ color: '#86e5b1' }}>{opp.stipend || 'Verified Certification'}</b>
                </div>
                <div>
                  <small>Location & Mode</small>
                  <b>{opp.location}</b>
                </div>
              </div>

              <div className="oppOutcomeBanner">
                <ShieldCheck size={14} color="#86e5b1" style={{ flexShrink: 0 }} />
                <span><b>Expected Outcome:</b> {opp.outcome}</span>
              </div>

              <div className="buttonRow" style={{ margin: '14px 0 0' }}>
                {isRegistered ? (
                  <button className="secondary full" style={{ borderColor: '#489c72', color: '#86e5b1' }}>
                    ✓ Registered / In Workspace
                  </button>
                ) : (
                  <button
                    className="primary full"
                    onClick={() => handleApply(opp)}
                  >
                    {opp.type === 'OFFICE_HOUR' ? 'Reserve Free Seat' : opp.type === 'HIRING_ROOM' ? 'Enter Hiring Room' : 'Apply / Register'} <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {selectedOppForApply && (
        <div className="profileModalOverlay" onClick={() => setSelectedOppForApply(null)}>
          <div className="profileModal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <div className="profileModalHeader">
              <div>
                <p className="eyebrow">FAST-TRACK APPLICATION</p>
                <h2>{selectedOppForApply.title}</h2>
              </div>
              <button className="icon" onClick={() => setSelectedOppForApply(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="card" style={{ background: '#191e2e', marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <b>🏢 {selectedOppForApply.organization}</b>
                <span className="pill green">{selectedOppForApply.studentReadinessMatch}% Readiness Match</span>
              </div>
              <p style={{ fontSize: 12, color: '#c7cbe0' }}>{selectedOppForApply.description}</p>
            </div>

            <div className="modalCommitmentGrid" style={{ marginBottom: 14 }}>
              <div className="commitmentItem">
                <b>🎯 Eligibility</b>
                <small>{selectedOppForApply.eligibility}</small>
              </div>
              <div className="commitmentItem">
                <b>💰 Reward / Offer</b>
                <small>{selectedOppForApply.stipend || 'Fast-track interview'}</small>
              </div>
              <div className="commitmentItem">
                <b>⚡ Verified Skills Attached</b>
                <small>{selectedOppForApply.skillsRequired.join(', ')}</small>
              </div>
              <div className="commitmentItem">
                <b>🏆 Direct Outcome</b>
                <small>{selectedOppForApply.outcome}</small>
              </div>
            </div>

            <div className="profileActions">
              <button className="secondary" onClick={() => setSelectedOppForApply(null)}>
                Cancel
              </button>
              <button className="primary" onClick={handleConfirmRegistration}>
                Confirm Registration (+40 XP) <CheckCircle2 size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
