import React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  Target,
  ExternalLink,
} from 'lucide-react';
import {
  WorkplaceSkillScore,
  workplaceSkillsData,
} from '../../data/workReadyData';

interface WorkplaceSkillsProps {
  skills?: WorkplaceSkillScore[];
  onJumpToFeature: (pageName: string) => void;
  act: (msg: string, inc?: number) => void;
}

export const WorkplaceSkills: React.FC<WorkplaceSkillsProps> = ({
  skills = workplaceSkillsData,
  onJumpToFeature,
  act,
}) => {
  const avgScore = Math.round(
    skills.reduce((acc, s) => acc + s.score, 0) / skills.length
  );

  return (
    <div className="workplaceSkillsSection">
      {/* Title */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">WORKPLACE COMPETENCIES</p>
          <h1>Workplace Skills Scorecard</h1>
          <p className="muted">
            Continuous diagnostic tracking your workplace communication, task ownership, meeting presence, and feedback agility.
          </p>
        </div>

        <div className="card statCard" style={{ padding: '10px 18px', background: '#1c2438' }}>
          <div>
            <small>Workplace Skill Average</small>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <b style={{ fontSize: 24, color: '#c4bbff' }}>{avgScore}%</b>
              <span className="pill green" style={{ fontSize: 9 }}>Proficient</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="skillsScorecardGrid">
        {skills.map((skill) => {
          const isHigh = skill.score >= 80;
          const isMid = skill.score >= 70 && skill.score < 80;
          const isLow = skill.score < 70;

          return (
            <div className="card skillCompetencyCard" key={skill.id}>
              <div className="cardTop" style={{ marginBottom: 10 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16 }}>{skill.name}</h3>
                  <small style={{ color: '#8890a2' }}>Benchmarked for Junior SDE</small>
                </div>
                <span
                  className={`pill ${isHigh ? 'green' : isMid ? 'purple' : 'orange'}`}
                  style={{ fontSize: 9 }}
                >
                  {skill.level}
                </span>
              </div>

              {/* Score Bar */}
              <div className="skillProgressRow">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: '#a2aabf' }}>Competency Score</span>
                  <b style={{ color: isHigh ? '#86e5b1' : isMid ? '#c4b8ff' : '#ffd175' }}>
                    {skill.score}%
                  </b>
                </div>
                <div className="miniProgress" style={{ width: '100%', height: 6 }}>
                  <i
                    style={{
                      width: `${skill.score}%`,
                      background: isHigh
                        ? 'linear-gradient(90deg, #4dbd83, #86e5b1)'
                        : isMid
                        ? 'linear-gradient(90deg, #7c6cf0, #a89bff)'
                        : 'linear-gradient(90deg, #d5a652, #ffd175)',
                    }}
                  />
                </div>
              </div>

              {/* Strong Behavior & Risk Area */}
              <div className="behaviorSplitBlock">
                <div className="strongBehavior">
                  <span style={{ color: '#86e5b1', fontSize: 10, fontWeight: 700 }}>✓ STRENGTH:</span>
                  <p style={{ fontSize: 11, color: '#d8f6e6', margin: '2px 0 0' }}>{skill.strongBehavior}</p>
                </div>
                <div className="riskBehavior">
                  <span style={{ color: '#ffd175', fontSize: 10, fontWeight: 700 }}>⚠️ RISK AREA:</span>
                  <p style={{ fontSize: 11, color: '#ffecb8', margin: '2px 0 0' }}>{skill.riskBehavior}</p>
                </div>
              </div>

              {/* Action Item & Deep-Link */}
              <div className="skillActionFooter">
                <div style={{ fontSize: 11, color: '#c7cbde', marginBottom: 8 }}>
                  <b>Action Item:</b> {skill.actionItem}
                </div>
                <button
                  className="secondary full"
                  style={{ fontSize: 11, padding: '6px 10px' }}
                  onClick={() => {
                    onJumpToFeature(skill.pageTarget);
                    act(`Navigated to ${skill.linkedCareerOSFeature} for remediation`, 10);
                  }}
                >
                  Remediate in {skill.linkedCareerOSFeature} <ArrowRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
