import React from 'react';
import {
  TrendingUp,
  Target,
  FileCheck,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar as RechartsRadar,
  AreaChart,
  Area,
  Tooltip,
} from 'recharts';
import {
  funnelStagesData,
  rejectionDistributionData,
} from '../../data/rejectionIntelligenceData';

interface AnalyticsOverviewProps {
  readiness: number;
  onNavigateTab: (tab: string) => void;
  act: (msg: string, inc?: number) => void;
}

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({
  readiness,
  onNavigateTab,
  act,
}) => {
  const skillData = [
    { name: 'DSA', value: 70 },
    { name: 'Core CS', value: 60 },
    { name: 'Projects', value: 85 },
    { name: 'Communication', value: 75 },
    { name: 'Resume', value: 82 },
    { name: 'Interview', value: 58 },
  ];

  const trend = [
    { x: 'May', v: 62 },
    { x: 'Jun', v: 65 },
    { x: 'Jul', v: 67 },
    { x: 'Aug', v: 69 },
  ];

  return (
    <div className="analyticsOverviewSection">
      {/* Title */}
      <div className="titleRow">
        <div>
          <p className="eyebrow">READINESS ANALYTICS & CONVERSION</p>
          <h1>Measure what moves your career forward</h1>
          <p className="muted">
            Continuous diagnostic tracking your placement readiness, application funnel conversion, and targeted improvement plans.
          </p>
        </div>

        <div className="buttonRow" style={{ margin: 0 }}>
          <button
            className="secondary"
            onClick={() => {
              onNavigateTab('funnel');
              act('Viewing Application Funnel', 5);
            }}
          >
            <Layers size={15} /> Application Funnel
          </button>
          <button
            className="primary"
            onClick={() => {
              onNavigateTab('rejection-intelligence');
              act('Opened Rejection Intelligence diagnostic', 10);
            }}
          >
            <Sparkles size={15} /> Rejection Intelligence
          </button>
        </div>
      </div>

      {/* Top Cards: Score + 10 Application Metrics Grid */}
      <div className="analyticsTop" style={{ marginBottom: 20 }}>
        {/* Circular Readiness Score */}
        <div className="card readyLarge" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <div>
            <p className="eyebrow">PLACEMENT READINESS</p>
            <div
              className="score"
              style={{
                width: 170,
                height: 170,
                background: `conic-gradient(#8b7cff ${readiness * 3.6}deg,#252a38 0deg)`,
              }}
            >
              <div className="scoreInner">
                <b>{readiness}</b>
                <span>/ 100</span>
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 24, margin: '0 0 4px' }}>{readiness}% ready</h2>
            <p style={{ color: '#86e5b1', fontSize: 12, margin: '0 0 8px' }}>+7 points in the last 90 days</p>
            <span className="pill green" style={{ fontSize: 10 }}>On Track for Hiring Season</span>
            <small style={{ display: 'block', color: '#8e96a8', marginTop: 8, fontSize: 11 }}>
              Target: <b>Junior Frontend Engineer</b>
            </small>
          </div>
        </div>

        {/* Top Funnel Diagnostic Card */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #221940, #151825)', border: '1px solid #4a3d7d' }}>
          <div className="cardTop" style={{ marginBottom: 6 }}>
            <span className="pill orange">APPLICATION CONVERSION INSIGHT</span>
            <span className="aiBadge mock">18 Applications Tracked</span>
          </div>
          <h3 style={{ fontSize: 18, margin: '6px 0 4px' }}>Most Common Drop-off: Online Assessment</h3>
          <p style={{ fontSize: 12, color: '#c7cbde', margin: '0 0 12px', lineHeight: 1.45 }}>
            You passed resume screening at 7 companies, but encountered bottlenecks during timed JavaScript/DSA assessments.
          </p>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="primary"
              style={{ fontSize: 11, padding: '6px 12px' }}
              onClick={() => {
                onNavigateTab('rejection-intelligence');
                act('Navigated to Rejection Intelligence');
              }}
            >
              View Rejection Intelligence & Plan <ArrowRight size={13} />
            </button>
            <button
              className="secondary"
              style={{ fontSize: 11, padding: '6px 12px' }}
              onClick={() => {
                onNavigateTab('tracker');
                act('Navigated to Application Tracker');
              }}
            >
              Manage Applications
            </button>
          </div>
        </div>
      </div>

      {/* 8-Metric Application Summary Grid */}
      <div className="networkStatsGrid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        <div className="card statCard">
          <div>
            <small>Applications Submitted</small>
            <b>18</b>
            <span className="statSub">Across 8 Tech Employers</span>
          </div>
        </div>

        <div className="card statCard">
          <div>
            <small>Shortlisted & Screened</small>
            <b style={{ color: '#86e5b1' }}>7</b>
            <span className="statSub">39% Screen Rate</span>
          </div>
        </div>

        <div className="card statCard">
          <div>
            <small>Technical Assessments</small>
            <b style={{ color: '#ffd175' }}>3</b>
            <span className="statSub">1 Passed · 2 In Review</span>
          </div>
        </div>

        <div className="card statCard">
          <div>
            <small>Live Interviews Reached</small>
            <b style={{ color: '#c4b8ff' }}>2</b>
            <span className="statSub">Microsoft & NovaMetrics</span>
          </div>
        </div>

        <div className="card statCard">
          <div>
            <small>Application Success Rate</small>
            <b style={{ color: '#86e5b1' }}>22%</b>
            <span className="statSub">Higher than college average (14%)</span>
          </div>
        </div>

        <div className="card statCard">
          <div>
            <small>Interview Conversion</small>
            <b style={{ color: '#ffd175' }}>18%</b>
            <span className="statSub">Assessment to Interview</span>
          </div>
        </div>

        <div className="card statCard">
          <div>
            <small>Recorded Outcomes</small>
            <b>11</b>
            <span className="statSub">6 Feedback / 5 Unknown</span>
          </div>
        </div>

        <div className="card statCard">
          <div>
            <small>Active Applications</small>
            <b style={{ color: '#86e5b1' }}>5</b>
            <span className="statSub">In Active Pipeline</span>
          </div>
        </div>
      </div>

      {/* Two-Column Charts: Capability Breakdown & Readiness Trend */}
      <div className="twoCol" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div className="card">
          <div className="cardTop" style={{ marginBottom: 10 }}>
            <h3 style={{ margin: 0 }}>Capability Breakdown</h3>
            <span className="pill purple">6 Dimensions</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={skillData}>
              <PolarGrid stroke="#32384a" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#a9afc0', fontSize: 11 }} />
              <RechartsRadar dataKey="value" stroke="#9d8cff" fill="#9d8cff" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="cardTop" style={{ marginBottom: 10 }}>
            <h3 style={{ margin: 0 }}>Readiness Compounding Trend</h3>
            <span className="pill green">+7 Points</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="a" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#8b7cff" stopOpacity=".45" />
                  <stop offset="1" stopColor="#8b7cff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke="#a796ff" fill="url(#a)" strokeWidth={3} />
              <Tooltip
                contentStyle={{ background: '#171a26', border: '1px solid #363d52', borderRadius: 8, fontSize: 12 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
