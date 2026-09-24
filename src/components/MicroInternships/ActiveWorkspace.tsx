import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Send,
  Upload,
  Link2,
  FileText,
  Video,
  Code2,
  ShieldCheck,
  Users,
  Sparkles,
  Award,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import {
  ActiveMicroProject,
  sampleActiveProjects,
} from '../../data/microInternshipData';

interface ActiveWorkspaceProps {
  project?: ActiveMicroProject;
  onOpenEmployerReview?: () => void;
  onJumpToFeature: (pageName: string) => void;
  act: (msg: string, inc?: number) => void;
}

export const ActiveWorkspace: React.FC<ActiveWorkspaceProps> = ({
  project = sampleActiveProjects[0],
  onOpenEmployerReview,
  onJumpToFeature,
  act,
}) => {
  const [githubUrl, setGithubUrl] = useState(project.submittedDeliverables.githubUrl || '');
  const [demoUrl, setDemoUrl] = useState(project.submittedDeliverables.demoUrl || '');
  const [videoUrl, setVideoUrl] = useState(project.submittedDeliverables.walkthroughVideoUrl || '');
  const [handoffNotes, setHandoffNotes] = useState(project.submittedDeliverables.handoffNotes || '');
  const [newMessageText, setNewMessageText] = useState('');
  const [messages, setMessages] = useState(project.supervisorMessages);
  const [milestones, setMilestones] = useState(project.milestones);
  const [workReadyTasks, setWorkReadyTasks] = useState(project.workReadyTasks);
  const [submittedForReview, setSubmittedForReview] = useState(false);

  const handleToggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const newStatus = m.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
          return { ...m, status: newStatus };
        }
        return m;
      })
    );
    act('Project milestone updated', 10);
  };

  const handleToggleWorkReadyTask = (id: string) => {
    setWorkReadyTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t))
    );
    act('Workplace readiness task marked completed', 5);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;
    const msg = {
      id: 'sm-' + Date.now(),
      senderName: 'Divya (You)',
      senderAvatar: 'DV',
      timestamp: 'Just now',
      message: newMessageText,
      isSupervisor: false,
    };
    setMessages([...messages, msg]);
    setNewMessageText('');
    act('Progress update sent to supervisor', 10);
  };

  const handleSubmitForReview = () => {
    setSubmittedForReview(true);
    act('Final project deliverables submitted for employer review! (+40 XP)', 40);
  };

  return (
    <div className="activeWorkspaceSection">
      {/* Top Banner */}
      <div className="card workspaceHeaderCard" style={{ background: 'linear-gradient(135deg, #221a42, #141724)', border: '1px solid #4a3d7d', marginBottom: 20 }}>
        <div className="cardTop">
          <div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
              <span className="pill green">● ACTIVE MICRO-INTERNSHIP</span>
              <span className="pill purple">{project.targetRole}</span>
              <span className="pill orange">⏰ {project.daysRemaining} days remaining</span>
            </div>
            <h1 style={{ fontSize: 22, margin: '4px 0 6px', color: '#f0edff' }}>{project.title}</h1>
            <p className="muted" style={{ margin: 0, fontSize: 12 }}>
              🏢 <b>{project.organization.name}</b> · Supervisor: <b>{project.organization.supervisorName}</b> ({project.organization.supervisorRole}) · Deadline: <b>{project.deadline}</b>
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="statSub" style={{ color: '#a2aabf', display: 'block', fontSize: 11 }}>Project Progress</span>
            <b style={{ fontSize: 28, color: '#86e5b1' }}>{project.progressPercent}%</b>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="miniProgress" style={{ width: '100%', height: 8, marginTop: 14 }}>
          <i style={{ width: `${project.progressPercent}%`, background: 'linear-gradient(90deg, #6353af, #86e5b1)' }} />
        </div>
      </div>

      {/* Main Grid: Milestones & Submission (Left) vs WorkReady & Messaging (Right) */}
      <div className="simulatorTwoCol" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
        {/* Left Column: Milestones & Deliverables Submission */}
        <div style={{ display: 'grid', gap: 20 }}>
          {/* 6-Stage Milestones Checklist */}
          <div className="card">
            <div className="cardTop" style={{ marginBottom: 12 }}>
              <h3 style={{ margin: 0 }}>Project Milestones ({milestones.filter((m) => m.status === 'COMPLETED').length} / {milestones.length})</h3>
              <span className="pill green">Sprint Execution</span>
            </div>

            <div style={{ display: 'grid', gap: 10 }}>
              {milestones.map((milestone) => {
                const isDone = milestone.status === 'COMPLETED';
                const isCur = milestone.status === 'IN_PROGRESS';
                return (
                  <div
                    key={milestone.id}
                    className={`milestoneItemCard ${isDone ? 'milestoneDone' : isCur ? 'milestoneActive' : ''}`}
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                      background: isCur ? '#1d2134' : '#141724',
                      border: isCur ? '1px solid #6353af' : '1px solid #282f42',
                      padding: 12,
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}
                    onClick={() => handleToggleMilestone(milestone.id)}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: isDone ? '#1c382c' : isCur ? '#2a2150' : '#222738',
                        color: isDone ? '#86e5b1' : isCur ? '#c4bbff' : '#888fa0',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 11,
                        fontWeight: 700,
                        flexShrink: 0,
                        border: isDone ? '1px solid #3fa870' : '1px solid #3d445c',
                      }}
                    >
                      {isDone ? '✓' : milestone.stepNumber}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <b style={{ fontSize: 13, color: isDone ? '#86e5b1' : '#f0edff' }}>
                          {milestone.title}
                        </b>
                        <span className={`pill ${isDone ? 'green' : isCur ? 'orange' : ''}`} style={{ fontSize: 9 }}>
                          {milestone.dueDate}
                        </span>
                      </div>
                      <small style={{ color: '#a2aabf', display: 'block', marginTop: 3, fontSize: 11 }}>
                        {milestone.description}
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deliverables Submission Box */}
          <div className="card">
            <div className="cardTop" style={{ marginBottom: 12 }}>
              <h3 style={{ margin: 0 }}>Deliverable Submissions & Links</h3>
              <span className="pill purple">Evidence Files</span>
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
              <div className="profileField">
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Code2 size={13} color="#86e5b1" /> GitHub Repository URL:
                </span>
                <input
                  value={githubUrl}
                  placeholder="https://github.com/username/project-repo"
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>

              <div className="profileField">
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Link2 size={13} color="#7bc5ff" /> Live Demo URL:
                </span>
                <input
                  value={demoUrl}
                  placeholder="https://your-demo-url.app"
                  onChange={(e) => setDemoUrl(e.target.value)}
                />
              </div>

              <div className="profileField">
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Video size={13} color="#ffd175" /> 3-Minute Walkthrough Video (Loom / YouTube):
                </span>
                <input
                  value={videoUrl}
                  placeholder="https://loom.com/share/..."
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>

              <div className="profileField">
                <span>Final Executive Handoff Notes & Recommendations:</span>
                <textarea
                  className="workplaceTextarea"
                  rows={3}
                  value={handoffNotes}
                  onChange={(e) => setHandoffNotes(e.target.value)}
                  placeholder="Summarize key insights, data anomalies handled, and production recommendations..."
                />
              </div>
            </div>

            <div className="buttonRow" style={{ marginTop: 16 }}>
              {submittedForReview ? (
                <div className="consequenceOutcomeBanner bannerExemplary" style={{ width: '100%', margin: 0 }}>
                  <b>✓ Deliverables Submitted for Employer Review</b>
                  <p style={{ fontSize: 11, margin: '2px 0 0' }}>
                    Supervisor Aravind Swaminathan has been notified. You can preview the employer review rubric below.
                  </p>
                  {onOpenEmployerReview && (
                    <button
                      className="primary"
                      style={{ marginTop: 8, fontSize: 11, padding: '4px 10px', height: 'auto' }}
                      onClick={onOpenEmployerReview}
                    >
                      Open Employer Review Form & Verification
                    </button>
                  )}
                </div>
              ) : (
                <button className="primary full" onClick={handleSubmitForReview}>
                  Submit Deliverables for Review <Send size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: WorkReady Tasks & Supervisor Messaging */}
        <div style={{ display: 'grid', gap: 20 }}>
          {/* WorkReady Workplace Skills Practised */}
          <div className="card" style={{ background: 'linear-gradient(135deg, #1c1834, #141724)', border: '1px solid #3c326b' }}>
            <div className="cardTop" style={{ marginBottom: 10 }}>
              <h4 style={{ margin: 0, fontSize: 13, color: '#ffd175', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={14} /> WORKPLACE SKILLS PRACTISED
              </h4>
              <span className="pill green">WorkReady Sync</span>
            </div>
            <p className="muted" style={{ fontSize: 11, marginBottom: 10 }}>
              Demonstrate strong professional habits alongside your technical deliverables.
            </p>

            <div style={{ display: 'grid', gap: 6 }}>
              {workReadyTasks.map((t) => (
                <label
                  key={t.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 11,
                    color: t.isDone ? '#86e5b1' : '#c7cbde',
                    cursor: 'pointer',
                    background: '#121420',
                    padding: '6px 10px',
                    borderRadius: 6,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={() => handleToggleWorkReadyTask(t.id)}
                  />
                  <span>{t.title}</span>
                </label>
              ))}
            </div>

            <button
              className="secondary full"
              style={{ marginTop: 12, fontSize: 11 }}
              onClick={() => {
                onJumpToFeature('WorkReady');
                act('Navigated to WorkReady to practice workplace communication');
              }}
            >
              Practise in WorkReady <ArrowRight size={12} />
            </button>
          </div>

          {/* Career Pod Collaboration Box */}
          <div className="card" style={{ background: '#171926' }}>
            <div className="cardTop" style={{ marginBottom: 8 }}>
              <h4 style={{ margin: 0, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Users size={14} color="#a89bff" /> Career Pod Peer Review
              </h4>
              <span className="pill purple">React Pod</span>
            </div>
            <p style={{ fontSize: 11, color: '#c7cbde', margin: '0 0 10px' }}>
              {project.podCollaboration.peerFeedbackSummary}
            </p>
            <button
              className="secondary full"
              style={{ fontSize: 11 }}
              onClick={() => {
                onJumpToFeature('Career Network');
                act('Navigated to Career Pod to request peer review');
              }}
            >
              Request Peer Feedback in Career Pod
            </button>
          </div>

          {/* Supervisor Messaging Thread */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="cardTop" style={{ marginBottom: 10 }}>
              <h4 style={{ margin: 0, fontSize: 13 }}>Supervisor Direct Feed</h4>
              <span className="pill green">Online</span>
            </div>

            <div className="supervisorChatFeed" style={{ display: 'grid', gap: 10, maxHeight: 240, overflowY: 'auto', marginBottom: 12 }}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    background: m.isSupervisor ? '#1a1f30' : '#272044',
                    border: m.isSupervisor ? '1px solid #2e374e' : '1px solid #4a3e7e',
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#8e96a8', marginBottom: 2 }}>
                    <b>{m.senderName}</b>
                    <span>{m.timestamp}</span>
                  </div>
                  <p style={{ fontSize: 11, color: '#edf0f8', margin: 0, lineHeight: 1.4 }}>
                    {m.message}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 6 }}>
              <input
                className="filterSearchInput"
                style={{ flex: 1 }}
                placeholder="Ask supervisor a question or send update..."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
              />
              <button type="submit" className="primary" style={{ padding: '0 12px' }}>
                <Send size={13} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
