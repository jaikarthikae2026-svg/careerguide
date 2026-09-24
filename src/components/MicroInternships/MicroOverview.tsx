import React from 'react';
import {
  Briefcase,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Star,
  Award,
  ShieldCheck,
  Building,
  Target,
  FileCheck,
  Zap,
  DollarSign,
  Layers,
} from 'lucide-react';
import {
  ActiveMicroProject,
  MicroInternship,
} from '../../data/microInternshipData';

interface MicroOverviewProps {
  onNavigateTab: (tab: string) => void;
  onSelectInternship: (internship: MicroInternship) => void;
  recommendedInternships: MicroInternship[];
  activeProject?: ActiveMicroProject;
  act: (msg: string, inc?: number) => void;
}

export const MicroOverview: React.FC<MicroOverviewProps> = ({
  onNavigateTab,
  onSelectInternship,
  recommendedInternships,
  activeProject,
  act,
}) => {
  return (
    <div className="microOverviewSection">
      {/* Header */}
      <div className="titleRow">
        <div>
          <p className="eyebrow">MICRO-INTERNSHIPS</p>
          <h1>Build experience before your first full-time job</h1>
          <p className="muted">
            Work on short, structured projects that turn your skills into verified professional experience and employer reviews.
          </p>
        </div>
        <div className="buttonRow" style={{ margin: 0 }}>
          <button
            className="secondary"
            onClick={() => {
              onNavigateTab('applications');
              act('Viewing my experience and applications', 5);
            }}
          >
            <FileCheck size={15} /> View My Experience
          </button>
          <button
            className="primary"
            onClick={() => {
              onNavigateTab('listings');
              act('Exploring available micro-internships', 10);
            }}
          >
            <Briefcase size={15} /> Find a Micro-Internship
          </button>
        </div>
      </div>

      {/* 6 Summary Cards */}
      <div className="networkStatsGrid" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
        <div className="card statCard">
          <div className="statIcon" style={{ background: '#251e45', color: '#a89bff' }}>
            <Briefcase size={18} />
          </div>
          <div>
            <small>Available</small>
            <b>24</b>
            <span className="statSub">Verified Projects</span>
          </div>
        </div>

        <div className="card statCard">
          <div className="statIcon" style={{ background: '#1c2e42', color: '#7bc5ff' }}>
            <FileCheck size={18} />
          </div>
          <div>
            <small>Applications</small>
            <b>4</b>
            <span className="statSub">1 Accepted · 1 Review</span>
          </div>
        </div>

        <div className="card statCard">
          <div className="statIcon" style={{ background: '#1a382c', color: '#7be3af' }}>
            <Zap size={18} />
          </div>
          <div>
            <small>Active Projects</small>
            <b style={{ color: '#86e5b1' }}>1</b>
            <span className="statSub">60% Complete</span>
          </div>
        </div>

        <div className="card statCard">
          <div className="statIcon" style={{ background: '#382f1b', color: '#ffd175' }}>
            <CheckCircle2 size={18} />
          </div>
          <div>
            <small>Completed</small>
            <b>3</b>
            <span className="statSub">100% Deliverables</span>
          </div>
        </div>

        <div className="card statCard">
          <div className="statIcon" style={{ background: '#2a1f3e', color: '#d39aff' }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <small>Verified Proof</small>
            <b style={{ color: '#c4b8ff' }}>2</b>
            <span className="statSub">On Career Passport</span>
          </div>
        </div>

        <div className="card statCard">
          <div className="statIcon" style={{ background: '#3b2026', color: '#ff999f' }}>
            <Star size={18} />
          </div>
          <div>
            <small>Employer Rating</small>
            <b style={{ color: '#ffd175' }}>4.6 <span style={{ fontSize: 11, color: '#a2aabf' }}>/ 5</span></b>
            <span className="statSub">From 2 Employers</span>
          </div>
        </div>
      </div>

      {/* Active Project In-Progress Banner */}
      {activeProject && (
        <div className="card activeProjectHeroCard" style={{ marginTop: 18, background: 'linear-gradient(135deg, #20193c, #151825)', border: '1px solid #4a3d7d' }}>
          <div className="cardTop">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="pill green">● ACTIVE MICRO-INTERNSHIP</span>
              <span className="pill orange">⏰ {activeProject.daysRemaining} days remaining</span>
            </div>
            <span className="pill purple">{activeProject.targetRole}</span>
          </div>

          <h2 style={{ fontSize: 20, margin: '10px 0 4px', color: '#f0edff' }}>{activeProject.title}</h2>
          <p style={{ fontSize: 12, color: '#c7cbde', margin: '0 0 12px' }}>
            🏢 <b>{activeProject.organization.name}</b> · Supervisor: <b>{activeProject.organization.supervisorName}</b> ({activeProject.organization.supervisorRole})
          </p>

          {/* Progress Bar & Stats */}
          <div className="activeProjectProgressRow" style={{ background: '#131520', padding: 12, borderRadius: 8, border: '1px solid #282f42', marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
              <span style={{ color: '#a2aabf' }}>Current Milestone: <b>Complete first draft of dashboard views (Day 7)</b></span>
              <b style={{ color: '#86e5b1' }}>{activeProject.progressPercent}% Completed</b>
            </div>
            <div className="miniProgress" style={{ width: '100%', height: 7 }}>
              <i style={{ width: `${activeProject.progressPercent}%`, background: 'linear-gradient(90deg, #6353af, #86e5b1)' }} />
            </div>

            <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 11, color: '#8e96a8', flexWrap: 'wrap' }}>
              <span>✓ Milestones: <b>2 / 6 complete</b></span>
              <span>✓ WorkReady Tasks: <b>3 / 5 checked</b></span>
              <span>💬 Supervisor Feed: <b>1 new feedback note</b></span>
              <span>🤝 Pod Peer Review: <b>Scheduled with React Pod</b></span>
            </div>
          </div>

          <div className="buttonRow" style={{ margin: 0 }}>
            <button
              className="primary"
              onClick={() => {
                onNavigateTab('workspace');
                act('Opened Active Micro-Internship Workspace', 15);
              }}
            >
              Open Project Workspace <ArrowRight size={15} />
            </button>
            <button
              className="secondary"
              onClick={() => {
                onNavigateTab('workspace');
                act('Viewing supervisor feedback');
              }}
            >
              View Supervisor Feedback & Task Board
            </button>
          </div>
        </div>
      )}

      {/* Recommended Micro-Internships Grid */}
      <div className="sectionTitle" style={{ marginTop: 26 }}>
        <div>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={16} color="#ffd175" /> Recommended for You based on Skills & Targets
          </h3>
          <p className="muted" style={{ fontSize: 12, marginTop: 4 }}>
            Matched to your target roles, Learning Hub achievements, and Career Passport gaps.
          </p>
        </div>
      </div>

      <div className="recommendationsGrid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 14 }}>
        {recommendedInternships.map((internship) => (
          <div className="card recommendedMicroCard" key={internship.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="cardTop" style={{ marginBottom: 8 }}>
                <span className="pill green" style={{ fontSize: 9 }}>
                  {internship.studentMatchPercentage}% Match
                </span>
                <span className="pill orange" style={{ fontSize: 9 }}>
                  {internship.stipendAmount}
                </span>
              </div>

              <h4 style={{ fontSize: 15, margin: '8px 0 4px', color: '#f0edff', lineHeight: 1.4 }}>
                {internship.title}
              </h4>
              <small style={{ color: '#a2aabf', display: 'block', marginBottom: 10 }}>
                🏢 {internship.organization.name} · ⏱️ {internship.durationLabel} ({internship.weeklyTimeCommitment})
              </small>

              {/* Rationale Box */}
              {internship.whyRecommended && (
                <div className="recommendationRationaleBox" style={{ background: '#161925', border: '1px solid #2b3245', borderRadius: 8, padding: 10, marginBottom: 12 }}>
                  <b style={{ fontSize: 10, color: '#c4bbff', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                    Recommended Because:
                  </b>
                  <div style={{ display: 'grid', gap: 3, fontSize: 11, color: '#c7cbde' }}>
                    {internship.whyRecommended.map((r, idx) => (
                      <div key={idx}>• {r}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skill Tags */}
              <div className="podTags" style={{ marginBottom: 12 }}>
                {internship.requiredSkills.map((s) => (
                  <span key={s.name} className="pill" style={{ fontSize: 9 }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="buttonRow" style={{ margin: '10px 0 0' }}>
              <button
                className="primary full"
                onClick={() => {
                  onSelectInternship(internship);
                  act(`Viewing details for ${internship.title}`, 10);
                }}
              >
                View Opportunity & Apply <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
