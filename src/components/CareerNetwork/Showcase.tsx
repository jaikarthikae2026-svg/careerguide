import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Code2,
  Globe,
  Lock,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  FileText,
  Copy,
  Check,
  Send,
  Eye,
  X,
} from 'lucide-react';
import {
  sampleVerifiedProjects,
  VerifiedProject,
} from '../../data/networkData';

interface ShowcaseProps {
  studentName?: string;
  projects?: VerifiedProject[];
  act: (msg: string, inc?: number) => void;
}

export const Showcase: React.FC<ShowcaseProps> = ({
  studentName = 'Divya',
  projects = sampleVerifiedProjects,
  act,
}) => {
  const [visibility, setVisibility] = useState<'PRIVATE' | 'MENTORS_ONLY' | 'RECRUITERS_ONLY' | 'PUBLIC'>('PUBLIC');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const publicUrl = `https://careeros.network/p/${studentName.toLowerCase()}-verified`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    act('Public portfolio link copied to clipboard');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleToggleVisibility = (mode: 'PRIVATE' | 'MENTORS_ONLY' | 'RECRUITERS_ONLY' | 'PUBLIC') => {
    setVisibility(mode);
    act(`Showcase visibility updated: ${mode.replace('_', ' ')}`);
  };

  return (
    <div className="showcaseSection">
      {/* Title & Visibility Toolbar */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">VERIFIED CANDIDATE SHOWCASE</p>
          <h1>Public Portfolio & Proof Profile</h1>
          <p className="muted">
            A high-signal portfolio showcasing verified code artifacts, mentor endorsements, and peer contribution badges.
          </p>
        </div>

        <div className="showcaseControls">
          <div className="visibilitySelector card" style={{ padding: '6px 10px', display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#979ea0', marginRight: 4 }}>
              <Eye size={13} style={{ verticalAlign: 'middle', marginRight: 2 }} /> Visibility:
            </span>
            {[
              { key: 'PRIVATE', label: 'Private' },
              { key: 'MENTORS_ONLY', label: 'Mentors Only' },
              { key: 'RECRUITERS_ONLY', label: 'Recruiters Only' },
              { key: 'PUBLIC', label: 'Public Preview' },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`pill ${visibility === key ? 'purple' : ''}`}
                style={{ padding: '4px 8px', fontSize: 10, cursor: 'pointer' }}
                onClick={() => handleToggleVisibility(key as any)}
              >
                {label}
              </button>
            ))}
          </div>

          <button className="primary" onClick={() => setShareModalOpen(true)}>
            <Share2 size={14} /> Share Profile
          </button>
        </div>
      </div>

      {/* Portfolio Paper / Card Layout */}
      <div className="showcasePaper card">
        {/* Candidate Profile Hero */}
        <div className="showcaseHeroRow">
          <div className="avatar huge" style={{ width: 68, height: 68, fontSize: 22, background: 'linear-gradient(135deg, #a594ff, #5945c7)' }}>
            DV
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 26, margin: 0 }}>{studentName}</h2>
              <span className="pill green">
                <ShieldCheck size={13} style={{ marginRight: 3 }} /> CareerOS Verified Candidate
              </span>
              <span className="pill purple">
                Rank: Top 15% in React Placement Cohort
              </span>
            </div>

            <p style={{ fontSize: 13, color: '#c7cbde', margin: '4px 0 8px' }}>
              Aspiring Software Development Engineer · Target: Junior Frontend / Fullstack Roles
            </p>

            <div className="verifiedSkillsRow">
              {[
                'React 18 (84%)',
                'TypeScript',
                'REST APIs',
                'Node.js & Express',
                'SQL Indexing',
                'Component Testing',
                'Git Workflows',
              ].map((skill) => (
                <span key={skill} className="verifiedSkillPill">
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="showcaseReadinessScore">
            <small style={{ color: '#a69eff', textTransform: 'uppercase', fontSize: 9 }}>CareerOS Score</small>
            <div style={{ fontSize: 38, fontWeight: 800, color: '#e0daff' }}>
              76<span style={{ fontSize: 16 }}>%</span>
            </div>
            <span className="pill orange" style={{ fontSize: 9 }}>Referral-Ready Candidate</span>
          </div>
        </div>

        <hr style={{ borderColor: '#2c3247', margin: '20px 0' }} />

        {/* Peer Contribution Badges Row */}
        <div className="showcaseBadgesRow">
          <h4 style={{ margin: '0 0 8px', fontSize: 12, color: '#b9aeff' }}>PEER & MENTOR CONTRIBUTION BADGES</h4>
          <div className="badgeList" style={{ gap: 8 }}>
            {[
              { name: 'Reliable Collaborator', desc: '100% on-time sprint task completion' },
              { name: 'Helpful Reviewer', desc: '8+ peer code reviews rated 5-stars' },
              { name: 'Strong Explainer', desc: 'Verified 2-minute architectural Loom demos' },
              { name: 'Consistent Finisher', desc: '6-week React placement pod capstone complete' },
              { name: 'Pod Leader', desc: 'Led sprint standups & milestone reviews' },
            ].map((badge) => (
              <div key={badge.name} className="showcaseBadgeCard">
                <Award size={16} color="#ffd175" />
                <div>
                  <b>{badge.name}</b>
                  <small>{badge.desc}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ borderColor: '#2c3247', margin: '20px 0' }} />

        {/* Featured Verified Projects */}
        <div className="showcaseProjectsSection">
          <div className="cardTop" style={{ marginBottom: 14 }}>
            <h3 style={{ margin: 0 }}>Verified Engineering Projects (6)</h3>
            <span className="pill purple">Code & Architecture Audited</span>
          </div>

          <div className="projectGrid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {projects.map((proj) => (
              <div className="card" key={proj.id} style={{ background: '#171a26', border: '1px solid #2d3347' }}>
                <div className="cardTop">
                  <h4 style={{ margin: 0, fontSize: 16 }}>{proj.title}</h4>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" style={{ color: '#a89bff' }}>
                        <Code2 size={14} />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#a89bff' }}>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: 12, color: '#c7cbde', margin: '8px 0', lineHeight: 1.5 }}>
                  {proj.description}
                </p>

                <div className="podTags" style={{ margin: '8px 0' }}>
                  {proj.technologies.map((t) => (
                    <span key={t} className="pill" style={{ fontSize: 9 }}>{t}</span>
                  ))}
                </div>

                <div className="archHighlightBox">
                  <Sparkles size={13} color="#9d8cff" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: '#e0e4f2' }}>
                    <b>Architecture:</b> {proj.architectureHighlight}
                  </span>
                </div>

                {proj.mentorEndorsement && (
                  <div className="mentorEndorsementBox">
                    <CheckCircle2 size={13} color="#86e5b1" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: '#b6f5d3', fontStyle: 'italic' }}>
                      {proj.mentorEndorsement}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <hr style={{ borderColor: '#2c3247', margin: '22px 0' }} />

        {/* Footer Actions on Showcase */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="primary" onClick={() => act('Contact request recorded')}>
              <Send size={14} /> Request Introduction
            </button>
            <button className="secondary" onClick={() => act('Verified Resume downloaded', 20)}>
              <FileText size={14} /> Download Verified Resume PDF
            </button>
          </div>

          <div style={{ fontSize: 11, color: '#888fa0' }}>
            🔒 CareerOS Privacy: Contact details disclosed only upon mutual approval.
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="profileModalOverlay" onClick={() => setShareModalOpen(false)}>
          <div className="profileModal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div className="profileModalHeader">
              <div>
                <p className="eyebrow">SHARE CANDIDATE PORTFOLIO</p>
                <h2>Public Showcase Link</h2>
              </div>
              <button className="icon" onClick={() => setShareModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
              Share this tamper-proof verified profile link with hiring managers, mentors, and on your LinkedIn:
            </p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <input
                className="filterSearchInput"
                readOnly
                value={publicUrl}
                style={{ flex: 1, color: '#c4b8ff' }}
              />
              <button className="primary" onClick={handleCopyLink}>
                {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                {copiedLink ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="card" style={{ background: '#161a26', fontSize: 12, color: '#cbd0e2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, color: '#86e5b1' }}>
                <CheckCircle2 size={14} /> Verified Artifacts Included:
              </div>
              <div>• 6 Code-audited projects & Loom walkthroughs</div>
              <div>• 76% Referral readiness badge & assessment scores</div>
              <div>• Razorpay & Swiggy mentor endorsements</div>
            </div>

            <div className="profileActions" style={{ marginTop: 18 }}>
              <button className="secondary" onClick={() => setShareModalOpen(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
