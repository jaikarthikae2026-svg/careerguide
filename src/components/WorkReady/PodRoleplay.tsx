import React, { useState } from 'react';
import {
  Users,
  Target,
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  Send,
  Star,
  Award,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Play,
  X,
} from 'lucide-react';
import {
  PodRoleplaySession,
  samplePodRoleplaySessions,
} from '../../data/workReadyData';

interface PodRoleplayProps {
  sessions?: PodRoleplaySession[];
  act: (msg: string, inc?: number) => void;
}

export const PodRoleplay: React.FC<PodRoleplayProps> = ({
  sessions = samplePodRoleplaySessions,
  act,
}) => {
  const [selectedPersona, setSelectedPersona] = useState<'Employee' | 'Manager' | 'Client' | 'Observer'>('Employee');
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('This Thursday, 5:00 PM IST');
  const [selectedPodScenario, setSelectedPodScenario] = useState('Sprint Deadline Delay & Escalation Practice');
  const [rubricScores, setRubricScores] = useState({
    clarity: 5,
    professionalism: 5,
    ownership: 4,
    nextSteps: 5,
    proactiveTiming: 4,
    tone: 5,
  });
  const [feedbackText, setFeedbackText] = useState('');
  const [activeSessions, setActiveSessions] = useState<PodRoleplaySession[]>(sessions);

  const handleScheduleSession = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession: PodRoleplaySession = {
      id: 'prs-' + Date.now(),
      title: selectedPodScenario,
      scenarioTheme: 'Live peer roleplay with React Placement Pod.',
      participants: [
        { name: 'Divya (You)', avatar: 'DV', assignedPersona: selectedPersona },
        { name: 'Kunal Sharma', avatar: 'KS', assignedPersona: selectedPersona === 'Employee' ? 'Manager' : 'Employee' },
        { name: 'Tanvi Agarwal', avatar: 'TA', assignedPersona: 'Client' },
        { name: 'Harsh Vardhan', avatar: 'HV', assignedPersona: 'Observer' },
      ],
      rubricScores: { clarity: 5, professionalism: 5, ownership: 5, nextSteps: 5, proactiveTiming: 5, tone: 5 },
      peerFeedbackText: 'Scheduled live group practice session.',
      status: 'SCHEDULED',
    };
    setActiveSessions([newSession, ...activeSessions]);
    setScheduleModalOpen(false);
    act(`Scheduled peer roleplay session with React Placement Pod!`, 30);
  };

  return (
    <div className="podRoleplaySection">
      {/* Title */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">CAREER POD INTEGRATION</p>
          <h1>Peer Workplace Roleplay & Review</h1>
          <p className="muted">
            Roleplay realistic workplace dilemmas with your Career Pod. Switch between Employee, Manager, Client, and Observer personas.
          </p>
        </div>

        <button className="primary" onClick={() => setScheduleModalOpen(true)}>
          <Calendar size={14} /> Schedule Pod Practice Session
        </button>
      </div>

      {/* Roleplay Persona Selector */}
      <div className="card" style={{ marginBottom: 20, background: 'linear-gradient(135deg, #21193d, #161826)' }}>
        <div className="cardTop">
          <div>
            <span className="pill purple">ACTIVE ROLEPLAY PERSONA</span>
            <h3 style={{ margin: '8px 0 4px' }}>Choose your simulation perspective:</h3>
          </div>
          <span className="pill green">Multi-Perspective Training</span>
        </div>

        <div className="personaGrid">
          {[
            {
              role: 'Employee',
              icon: '💼',
              title: 'Junior Developer / Employee',
              desc: 'Practise communicating blockers, requesting reviews, and negotiating deadlines with manager.',
            },
            {
              role: 'Manager',
              icon: '👔',
              title: 'Engineering Manager',
              desc: 'Practise setting sprint priorities, giving feedback, and coaching juniors through roadblocks.',
            },
            {
              role: 'Client',
              icon: '🏢',
              title: 'Product / Client Stakeholder',
              desc: 'Practise pushing for feature timelines and understanding engineering trade-offs.',
            },
            {
              role: 'Observer',
              icon: '🔍',
              title: 'Peer Rubric Observer',
              desc: 'Observe the conversation, score on the 6-dimension rubric, and provide actionable feedback.',
            },
          ].map((item) => {
            const isPicked = selectedPersona === item.role;
            return (
              <div
                key={item.role}
                className={`card personaCard ${isPicked ? 'personaCardActive' : ''}`}
                onClick={() => {
                  setSelectedPersona(item.role as any);
                  act(`Switched roleplay persona to ${item.role}`);
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
                <b style={{ fontSize: 13, color: '#f0edff', display: 'block' }}>{item.title}</b>
                <small style={{ color: '#9ba1b2', fontSize: 11, lineHeight: 1.4, display: 'block', marginTop: 4 }}>
                  {item.desc}
                </small>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6-Dimension Peer Review Rubric */}
      <div className="podGridTwoCol">
        {/* Past Sessions List */}
        <div className="card">
          <div className="cardTop" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Completed Pod Roleplay Sessions ({activeSessions.length})</h3>
            <span className="pill green">Peer Reviewed</span>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            {activeSessions.map((session) => (
              <div className="card sessionHistoryCard" key={session.id}>
                <div className="cardTop">
                  <b>{session.title}</b>
                  <span className={`pill ${session.status === 'COMPLETED' ? 'green' : 'orange'}`}>
                    {session.status}
                  </span>
                </div>
                <p style={{ fontSize: 11, color: '#c7cbde', margin: '4px 0 8px' }}>
                  {session.scenarioTheme}
                </p>

                <div className="participantsRow">
                  <small style={{ color: '#888fa0', marginRight: 6 }}>Personas:</small>
                  {session.participants.map((p) => (
                    <span key={p.name} className="charTag">
                      {p.name} as {p.assignedPersona}
                    </span>
                  ))}
                </div>

                {session.peerFeedbackText && (
                  <div className="feedbackReceivedBox" style={{ marginTop: 8 }}>
                    <small style={{ color: '#86e5b1', fontWeight: 700 }}>Pod Feedback:</small>
                    <p style={{ fontSize: 11, color: '#d8f8e8', margin: '2px 0 0' }}>
                      "{session.peerFeedbackText}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Peer Review Rubric Tool */}
        <div className="card">
          <div className="cardTop" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>6-Dimension Peer Evaluation Rubric</h3>
            <span className="pill purple">Standard Rubric</span>
          </div>
          <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
            When observing a pod mate's roleplay, score them across these 6 workplace criteria:
          </p>

          <div className="rubricGrid">
            {[
              { key: 'clarity', label: '1. Was the communication clear and structured?' },
              { key: 'professionalism', label: '2. Was the tone professional and empathetic?' },
              { key: 'ownership', label: '3. Did they take proactive task ownership?' },
              { key: 'nextSteps', label: '4. Did they identify concrete next steps?' },
              { key: 'proactiveTiming', label: '5. Did they communicate early enough?' },
              { key: 'tone', label: '6. Was the message constructive and solution-focused?' },
            ].map(({ key, label }) => (
              <div className="rubricItem" key={key}>
                <span style={{ fontSize: 11 }}>{label}</span>
                <div className="starButtons">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={`starBtn ${(rubricScores as any)[key] >= star ? 'starActive' : ''}`}
                      onClick={() => setRubricScores({ ...rubricScores, [key]: star })}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="profileField" style={{ marginTop: 14 }}>
            <span>Constructive Peer Feedback:</span>
            <input
              placeholder="e.g. Great proposal of 2 options. Next time, summarize the root cause in 1 sentence..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
          </div>

          <div className="buttonRow" style={{ margin: '14px 0 0' }}>
            <button
              className="primary full"
              onClick={() => {
                act('Peer roleplay evaluation submitted to pod (+40 XP)', 40);
                setFeedbackText('');
              }}
            >
              Submit Peer Rubric Evaluation <Send size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {scheduleModalOpen && (
        <div className="profileModalOverlay" onClick={() => setScheduleModalOpen(false)}>
          <div className="profileModal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <div className="profileModalHeader">
              <div>
                <p className="eyebrow">POD PRACTICE SESSION</p>
                <h2>Schedule Roleplay Session</h2>
              </div>
              <button className="icon" onClick={() => setScheduleModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleScheduleSession}>
              <div className="profileField" style={{ marginBottom: 14 }}>
                <span>Select Scenario Theme</span>
                <select
                  className="filterSelect"
                  style={{ width: '100%' }}
                  value={selectedPodScenario}
                  onChange={(e) => setSelectedPodScenario(e.target.value)}
                >
                  <option value="Sprint Deadline Delay & Escalation Practice">
                    Sprint Deadline Delay & Escalation Practice
                  </option>
                  <option value="Handling Critical Code Review Comments">
                    Handling Critical Code Review Comments
                  </option>
                  <option value="Daily Stand-up 90-Second Executive Update">
                    Daily Stand-up 90-Second Executive Update
                  </option>
                  <option value="Conflicting Product vs Tech Lead Priorities">
                    Conflicting Product vs Tech Lead Priorities
                  </option>
                </select>
              </div>

              <div className="profileField" style={{ marginBottom: 14 }}>
                <span>Target Date & Time</span>
                <input
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              </div>

              <div className="card" style={{ background: '#161925', fontSize: 11, color: '#c7cbde', marginBottom: 14 }}>
                <div style={{ color: '#86e5b1', fontWeight: 700, marginBottom: 4 }}>
                  ✓ React Placement Pod Members Invited:
                </div>
                <div>• Kunal Sharma (Pod Lead)</div>
                <div>• Tanvi Agarwal (Peer Reviewer)</div>
                <div>• Harsh Vardhan (Observer)</div>
              </div>

              <div className="profileActions">
                <button type="button" className="secondary" onClick={() => setScheduleModalOpen(false)}>
                  Cancel
                </button>
                <button className="primary" type="submit">
                  Confirm & Notify Pod (+30 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
