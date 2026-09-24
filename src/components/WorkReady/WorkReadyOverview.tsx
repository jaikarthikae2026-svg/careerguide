import React from 'react';
import {
  Briefcase,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Target,
  Users,
  Award,
  Calendar,
  AlertTriangle,
  Flame,
  Layers,
} from 'lucide-react';
import {
  WorkplaceScenario,
  SimulationPhase,
} from '../../data/workReadyData';

interface WorkReadyOverviewProps {
  onNavigateTab: (tab: string) => void;
  onLaunchScenario: (scenario: WorkplaceScenario) => void;
  nextRecommendedScenario: WorkplaceScenario;
  act: (msg: string, inc?: number) => void;
}

export const WorkReadyOverview: React.FC<WorkReadyOverviewProps> = ({
  onNavigateTab,
  onLaunchScenario,
  nextRecommendedScenario,
  act,
}) => {
  const timelineStages: {
    phase: SimulationPhase;
    days: string;
    label: string;
    focus: string;
    isCurrent: boolean;
    isDone: boolean;
    completedCount: number;
    totalCount: number;
  }[] = [
    {
      phase: 'Days 1–30: Adapt',
      days: 'Days 1–30',
      label: 'Adapt & Learn Norms',
      focus: 'Onboarding, tools, asking questions, small bug fixes, progress updates, documentation.',
      isCurrent: true,
      isDone: false,
      completedCount: 6,
      totalCount: 10,
    },
    {
      phase: 'Days 31–60: Contribute',
      days: 'Days 31–60',
      label: 'Contribute & Deliver',
      focus: 'Task ownership, meeting deadlines, peer code reviews, receiving feedback, blocker escalation.',
      isCurrent: false,
      isDone: false,
      completedCount: 4,
      totalCount: 10,
    },
    {
      phase: 'Days 61–90: Demonstrate Ownership',
      days: 'Days 61–90',
      label: 'Demonstrate High Ownership',
      focus: 'Managing full workstreams, handling ambiguity, cross-functional demos, measurable business impact.',
      isCurrent: false,
      isDone: false,
      completedCount: 2,
      totalCount: 10,
    },
  ];

  return (
    <div className="workReadyOverview">
      {/* Header */}
      <div className="titleRow">
        <div>
          <p className="eyebrow">WORKREADY SIMULATION ENGINE</p>
          <h1>Prepare for the workplace before your first day</h1>
          <p className="muted">
            Build the communication, collaboration, ownership, and judgment skills that determine success after you get hired.
          </p>
        </div>
        <div className="buttonRow" style={{ margin: 0 }}>
          <button
            className="secondary"
            onClick={() => {
              onNavigateTab('catalog');
              act('Exploring 30 workplace scenarios', 10);
            }}
          >
            <Layers size={15} /> Explore Scenarios
          </button>
          <button
            className="primary"
            onClick={() => {
              onLaunchScenario(nextRecommendedScenario);
              onNavigateTab('simulator');
              act('Launched WorkReady interactive simulation', 15);
            }}
          >
            <Briefcase size={15} /> Continue Simulation
          </button>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="networkStatsGrid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="card statCard">
          <div className="statIcon" style={{ background: '#251e45', color: '#a89bff' }}>
            <TrendingUp size={20} />
          </div>
          <div>
            <small>Workplace Readiness</small>
            <b style={{ color: '#c4b8ff' }}>72%</b>
            <span className="statSub">Benchmarked for Junior SDE</span>
          </div>
        </div>

        <div className="card statCard">
          <div className="statIcon" style={{ background: '#1c2e42', color: '#7bc5ff' }}>
            <Calendar size={20} />
          </div>
          <div>
            <small>Current Phase</small>
            <b style={{ fontSize: 16 }}>First 30 Days</b>
            <span className="statSub">Days 1–30: Adapt & Team Norms</span>
          </div>
        </div>

        <div className="card statCard">
          <div className="statIcon" style={{ background: '#1a382c', color: '#7be3af' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <small>Scenarios Completed</small>
            <b>12 / 30</b>
            <span className="statSub">40% of program completed</span>
          </div>
        </div>

        <div className="card statCard">
          <div className="statIcon" style={{ background: '#382f1b', color: '#ffd175' }}>
            <Award size={20} />
          </div>
          <div>
            <small>WorkReady Verification</small>
            <b style={{ color: '#ffd175', fontSize: 16 }}>In Progress</b>
            <span className="statSub">4 of 7 badges unlocked</span>
          </div>
        </div>
      </div>

      {/* Secondary Metric Highlights */}
      <div className="workReadyHighlightsRow">
        <div className="card highlightPillCard" style={{ borderColor: '#285a41', background: 'rgba(22, 53, 39, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="pill green" style={{ fontSize: 9 }}>STRONGEST SKILL</span>
            <b style={{ fontSize: 13, color: '#86e5b1' }}>Clear Communication (81%)</b>
          </div>
          <small style={{ color: '#b6eed1', display: 'block', marginTop: 4 }}>
            Structured written updates & clear stand-up bullet points.
          </small>
        </div>

        <div className="card highlightPillCard" style={{ borderColor: '#785320', background: 'rgba(66, 46, 23, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="pill orange" style={{ fontSize: 9 }}>NEEDS PRACTICE</span>
            <b style={{ fontSize: 13, color: '#ffd175' }}>Task Prioritization (58%)</b>
          </div>
          <small style={{ color: '#ffe6b3', display: 'block', marginTop: 4 }}>
            Proactively escalate scope creep before deadline day.
          </small>
        </div>

        <div className="card highlightPillCard" style={{ borderColor: '#483984', background: 'rgba(42, 33, 76, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="pill purple" style={{ fontSize: 9 }}>CAREER POD PEER SESSIONS</span>
            <b style={{ fontSize: 13, color: '#c4bbff' }}>3 Sessions Completed</b>
          </div>
          <small style={{ color: '#dcd6ff', display: 'block', marginTop: 4 }}>
            Roleplayed Employee & Manager with React Placement Pod.
          </small>
        </div>
      </div>

      {/* Your Next Workplace Action Card */}
      <div className="card nextActionCard" style={{ marginTop: 20 }}>
        <div className="cardTop" style={{ marginBottom: 12 }}>
          <span className="pill orange">
            <Sparkles size={13} style={{ marginRight: 4 }} /> YOUR NEXT WORKPLACE ACTION
          </span>
          <span className="aiBadge mock">⏱️ 8 mins · Intermediate · +50 XP</span>
        </div>
        <h2>{nextRecommendedScenario.title}</h2>
        <p className="nextActionDesc">
          {nextRecommendedScenario.context}
        </p>

        <div className="whyNowBanner" style={{ background: 'rgba(43, 35, 74, 0.7)', borderColor: '#534494', color: '#d8d1ff' }}>
          <Target size={16} color="#a89bff" />
          <span>
            <b>Workplace Focus:</b> Master the habit of early blocker communication and trade-off negotiation before missing commitments.
          </span>
        </div>

        <div className="buttonRow" style={{ marginTop: 18 }}>
          <button
            className="primary"
            onClick={() => {
              onLaunchScenario(nextRecommendedScenario);
              onNavigateTab('simulator');
              act('Started scenario: ' + nextRecommendedScenario.title, 20);
            }}
          >
            Start Interactive Workplace Scenario <ArrowRight size={15} />
          </button>
          <button
            className="secondary"
            onClick={() => onNavigateTab('skills')}
          >
            View Workplace Skills Breakdown
          </button>
        </div>
      </div>

      {/* 30-60-90 Day Program Timeline */}
      <div className="sectionTitle" style={{ marginTop: 28 }}>
        <h3 style={{ margin: 0 }}>The 30-60-90 Day Workplace Transition Program</h3>
        <p className="muted" style={{ fontSize: 12, marginTop: 4 }}>
          Structured journey modeling real onboarding expectations across leading tech employers.
        </p>
      </div>

      <div className="programTimelineGrid">
        {timelineStages.map((stage, idx) => (
          <div
            className={`card programStageCard ${stage.isCurrent ? 'programStageActive' : ''}`}
            key={idx}
          >
            <div className="cardTop" style={{ marginBottom: 8 }}>
              <span className="pill purple">{stage.days}</span>
              {stage.isCurrent ? (
                <span className="pill green">Active Phase</span>
              ) : (
                <span className="pill" style={{ opacity: 0.7 }}>Unlocked</span>
              )}
            </div>

            <h3 style={{ fontSize: 17, margin: '8px 0 6px' }}>{stage.label}</h3>
            <p style={{ fontSize: 12, color: '#c7cbde', minHeight: 45, lineHeight: 1.5 }}>
              {stage.focus}
            </p>

            <div className="stageProgressBlock">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: '#9fa7ba' }}>Phase Scenarios</span>
                <b>{stage.completedCount} / {stage.totalCount} completed</b>
              </div>
              <div className="miniProgress" style={{ width: '100%', height: 6 }}>
                <i style={{ width: `${(stage.completedCount / stage.totalCount) * 100}%` }} />
              </div>
            </div>

            <button
              className="secondary full"
              style={{ marginTop: 14 }}
              onClick={() => {
                onNavigateTab('catalog');
                act(`Viewing ${stage.days} scenarios`);
              }}
            >
              View {stage.days} Scenarios <ArrowUpRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
