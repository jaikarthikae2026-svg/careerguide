import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Play,
  BookOpen,
  Award,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  Target,
  Layers,
} from 'lucide-react';
import {
  ImprovementPlanData,
  initialImprovementPlan,
  ImprovementTask,
} from '../../data/rejectionIntelligenceData';

interface ImprovementPlanViewProps {
  plan?: ImprovementPlanData;
  onJumpToFeature: (pageName: string) => void;
  act: (msg: string, inc?: number) => void;
}

export const ImprovementPlanView: React.FC<ImprovementPlanViewProps> = ({
  plan = initialImprovementPlan,
  onJumpToFeature,
  act,
}) => {
  const [tasks, setTasks] = useState<ImprovementTask[]>(plan.tasks);

  const handleToggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus =
            t.status === 'Completed'
              ? 'In progress'
              : t.status === 'In progress'
              ? 'Completed'
              : 'In progress';
          act(`Task status updated: ${t.title} is now ${nextStatus}`, 10);
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="improvementPlanSection">
      {/* Header */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">ACTIONABLE RECOVERY ROADMAP</p>
          <h1>Your Personalized Improvement Plan</h1>
          <p className="muted">
            Targeted remediation addressing the specific root causes of assessment drop-offs and missing evidence.
          </p>
        </div>

        <div className="card statCard" style={{ padding: '10px 18px', background: '#1c2438' }}>
          <div>
            <small>Plan Completion</small>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <b style={{ fontSize: 22, color: '#86e5b1' }}>{progressPercent}%</b>
              <span className="pill green" style={{ fontSize: 9 }}>
                {completedCount} of {tasks.length} Completed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Goal Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #221940, #141724)', border: '1px solid #4a3d7d', marginBottom: 20 }}>
        <div className="cardTop">
          <div>
            <span className="pill purple">TARGET GOAL</span>
            <h2 style={{ fontSize: 20, margin: '8px 0 4px', color: '#f0edff' }}>{plan.goal}</h2>
            <small style={{ color: '#9da5b8', fontSize: 11 }}>
              Target Role: <b>{plan.targetRole}</b> · Total Estimated Effort: <b>{plan.estimatedEffort}</b>
            </small>
          </div>

          <div style={{ textAlign: 'right' }}>
            <small style={{ color: '#8e96a8', display: 'block', fontSize: 10 }}>Reapply Readiness</small>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#ffd175' }}>
              {plan.currentReadiness}% → <span style={{ color: '#86e5b1' }}>{plan.predictedReadiness}%</span>
            </div>
            <span className="pill green" style={{ fontSize: 8 }}>+13 Points Projected</span>
          </div>
        </div>

        <div className="miniProgress" style={{ width: '100%', height: 7, margin: '14px 0 10px' }}>
          <i style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg, #6353af, #86e5b1)' }} />
        </div>

        <p style={{ fontSize: 11, color: '#9da5b8', margin: 0, fontStyle: 'italic' }}>
          {plan.disclaimer}
        </p>
      </div>

      {/* Structured Tasks List */}
      <div className="sectionTitle" style={{ marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>4-Step Actionable Remediation Sequence</h3>
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        {tasks.map((task) => {
          const isDone = task.status === 'Completed';
          const isProg = task.status === 'In progress';

          return (
            <div
              key={task.id}
              className="card"
              style={{
                background: isDone ? 'rgba(22, 53, 39, 0.25)' : '#161926',
                border: isDone ? '1px solid #2e6648' : isProg ? '1px solid #6353af' : '1px solid #282f42',
                padding: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 14,
              }}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flex: 1 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: isDone ? '#1c382c' : isProg ? '#28204d' : '#202434',
                    color: isDone ? '#86e5b1' : isProg ? '#c4bbff' : '#888fa0',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 12,
                    fontWeight: 800,
                    flexShrink: 0,
                    border: isDone ? '1px solid #3fa870' : '1px solid #383f56',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleToggleTaskStatus(task.id)}
                >
                  {isDone ? '✓' : task.stepNumber}
                </div>

                <div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                    <b style={{ fontSize: 14, color: isDone ? '#86e5b1' : '#f0edff' }}>{task.title}</b>
                    <span className="pill purple" style={{ fontSize: 8 }}>
                      {task.source}
                    </span>
                    <span
                      className={`pill ${isDone ? 'green' : isProg ? 'orange' : ''}`}
                      style={{ fontSize: 8 }}
                    >
                      {task.status}
                    </span>
                  </div>

                  <p style={{ fontSize: 12, color: '#c7cbde', margin: '4px 0 6px', lineHeight: 1.45 }}>
                    {task.description}
                  </p>

                  <small style={{ color: '#8e96a8', fontSize: 10 }}>
                    ⏱️ Estimated time: <b>{task.estimatedHours}</b>
                  </small>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  className="secondary"
                  style={{ fontSize: 11, padding: '6px 10px' }}
                  onClick={() => handleToggleTaskStatus(task.id)}
                >
                  {isDone ? 'Mark Incomplete' : isProg ? 'Mark Complete' : 'Start Task'}
                </button>

                <button
                  className="primary"
                  style={{ fontSize: 11, padding: '6px 12px' }}
                  onClick={() => {
                    onJumpToFeature(task.sourcePage);
                    act(`Launched ${task.title} in ${task.sourcePage}`, 15);
                  }}
                >
                  Open in {task.source} <ArrowRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
