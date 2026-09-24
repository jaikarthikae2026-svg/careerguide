import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  Briefcase,
  Building,
  User,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import {
  funnelStagesData,
  rejectionDistributionData,
  JobApplication,
  sampleApplicationsData,
} from '../../data/rejectionIntelligenceData';

interface ApplicationFunnelViewProps {
  onSelectApplication: (app: JobApplication) => void;
  act: (msg: string, inc?: number) => void;
}

export const ApplicationFunnelView: React.FC<ApplicationFunnelViewProps> = ({
  onSelectApplication,
  act,
}) => {
  const [selectedFunnelStage, setSelectedFunnelStage] = useState<string>('ALL');

  const filteredApplications = sampleApplicationsData.filter((app) => {
    if (selectedFunnelStage === 'ALL') return true;
    if (selectedFunnelStage === 'Applied') return true;
    if (selectedFunnelStage === 'Resume review') {
      return ['Resume review', 'Assessment', 'Technical interview', 'Behavioral interview', 'Final interview', 'Offer'].includes(app.currentStage) || app.rejectionStage === 'Resume screening';
    }
    if (selectedFunnelStage === 'Assessment') {
      return ['Assessment', 'Technical interview', 'Behavioral interview', 'Final interview', 'Offer'].includes(app.currentStage) || app.rejectionStage === 'Online assessment';
    }
    if (selectedFunnelStage === 'Technical interview') {
      return ['Technical interview', 'Behavioral interview', 'Final interview', 'Offer'].includes(app.currentStage) || app.rejectionStage === 'Technical interview';
    }
    return true;
  });

  return (
    <div className="applicationFunnelSection">
      {/* Title */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">CONVERSION FUNNEL DIAGNOSTIC</p>
          <h1>Interactive Application Funnel</h1>
          <p className="muted">
            Click on any funnel stage to filter matching applications and inspect drop-off rates across each hiring hurdle.
          </p>
        </div>

        {selectedFunnelStage !== 'ALL' && (
          <button
            className="secondary"
            onClick={() => {
              setSelectedFunnelStage('ALL');
              act('Reset funnel filter');
            }}
          >
            Clear Filter (Show All 18)
          </button>
        )}
      </div>

      {/* Funnel & Rejection Distribution Two-Col */}
      <div className="simulatorTwoCol" style={{ gridTemplateColumns: '1.2fr 0.8fr', marginBottom: 24 }}>
        {/* Left: Clickable Funnel Tiers */}
        <div className="card funnelCard" style={{ padding: 18 }}>
          <div className="cardTop" style={{ marginBottom: 14 }}>
            <h3 style={{ margin: 0 }}>Hiring Funnel Progression</h3>
            <span className="pill purple">Click Tier to Filter</span>
          </div>

          <div className="funnelTiersList" style={{ display: 'grid', gap: 10 }}>
            {funnelStagesData.map((stage, idx) => {
              const isSelected = selectedFunnelStage === stage.stageKey;
              const widthPct = Math.max(28, Math.round((stage.count / 18) * 100));

              return (
                <div
                  key={stage.stage}
                  className={`funnelTierItem ${isSelected ? 'funnelTierSelected' : ''}`}
                  onClick={() => {
                    setSelectedFunnelStage(stage.stageKey);
                    act(`Filtered funnel by: ${stage.stage}`);
                  }}
                  style={{
                    background: isSelected ? 'rgba(139,124,255,0.2)' : '#141724',
                    border: isSelected ? '1px solid #8777f2' : '1px solid #282f42',
                    borderRadius: 10,
                    padding: '10px 14px',
                    cursor: 'pointer',
                    transition: '0.15s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="pill" style={{ fontSize: 9, padding: '2px 6px' }}>Step {idx + 1}</span>
                      <b style={{ fontSize: 13, color: '#f0edff' }}>{stage.stage}</b>
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <b style={{ fontSize: 15, color: '#86e5b1' }}>{stage.count} candidates</b>
                      <span className="statSub" style={{ fontSize: 10 }}>({stage.conversionRate}%)</span>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="miniProgress" style={{ width: '100%', height: 6 }}>
                    <i
                      style={{
                        width: `${widthPct}%`,
                        background:
                          idx === 0
                            ? 'linear-gradient(90deg, #6353af, #8777f2)'
                            : idx === 1
                            ? 'linear-gradient(90deg, #5377af, #7bc5ff)'
                            : idx === 2
                            ? 'linear-gradient(90deg, #489e7c, #86e5b1)'
                            : idx === 3
                            ? 'linear-gradient(90deg, #a8843c, #ffd175)'
                            : 'linear-gradient(90deg, #a84860, #ff999f)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Rejection Stage Distribution Breakdown */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="cardTop" style={{ marginBottom: 12 }}>
              <h3 style={{ margin: 0 }}>Rejection by Stage</h3>
              <span className="pill orange">12 Total Outcomes</span>
            </div>
            <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
              Distribution of recorded drop-offs across hiring rounds:
            </p>

            <div style={{ display: 'grid', gap: 14 }}>
              {rejectionDistributionData.map((item) => (
                <div key={item.stage} style={{ background: '#131520', padding: 12, borderRadius: 8, border: '1px solid #24293a' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                    <b style={{ color: '#f0edff' }}>{item.stage}</b>
                    <span style={{ color: item.color, fontWeight: 700 }}>
                      {item.count} rejections ({item.percentage}%)
                    </span>
                  </div>
                  <div className="miniProgress" style={{ width: '100%', height: 7 }}>
                    <i style={{ width: `${item.percentage}%`, background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: '#161a29', border: '1px solid #2c344a', marginTop: 14 }}>
            <small style={{ color: '#86e5b1', fontWeight: 700, display: 'block', marginBottom: 2 }}>
              💡 Key Insight:
            </small>
            <p style={{ fontSize: 11, color: '#c7cbde', margin: 0, lineHeight: 1.45 }}>
              42% of rejections occur at <b>Online Assessments</b>. Improving timed problem-solving will yield the highest return on interview conversions.
            </p>
          </div>
        </div>
      </div>

      {/* Filtered Applications List */}
      <div className="card">
        <div className="cardTop" style={{ marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>
            Applications in Stage: <span style={{ color: '#c4b8ff' }}>{selectedFunnelStage}</span> ({filteredApplications.length})
          </h3>
          <span className="pill purple">Click to Inspect Post-Mortem</span>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              className="card"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#131622',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #262c3e',
                cursor: 'pointer',
              }}
              onClick={() => {
                onSelectApplication(app);
                act(`Inspecting post-mortem for ${app.company} application`);
              }}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div className="avatar" style={{ width: 28, height: 28, fontSize: 10 }}>
                  {app.logo}
                </div>
                <div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <b style={{ fontSize: 12, color: '#f0edff' }}>{app.company}</b>
                    <span className="pill" style={{ fontSize: 8 }}>{app.role}</span>
                  </div>
                  <small style={{ color: '#888fa0', fontSize: 10 }}>
                    Applied: {app.applicationDate} · {app.source}
                  </small>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span
                  className={`pill ${app.outcome === 'Active' ? 'green' : 'orange'}`}
                  style={{ fontSize: 9 }}
                >
                  {app.currentStage}
                </span>
                <span style={{ fontSize: 11, color: '#8777f2' }}>
                  View Post-Mortem <ArrowRight size={12} style={{ verticalAlign: 'middle' }} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
