import React, { useState } from 'react';
import {
  Briefcase,
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Send,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  User,
  Building,
  Layers,
  Award,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import {
  DecisionOption,
  RoleTrack,
  WorkplaceEmail,
  WorkplaceScenario,
  workplaceScenariosData,
} from '../../data/workReadyData';

interface SimulationWorkspaceProps {
  scenario?: WorkplaceScenario;
  onScenarioCompleted?: (scenarioId: string, score: number) => void;
  act: (msg: string, inc?: number) => void;
}

export const SimulationWorkspace: React.FC<SimulationWorkspaceProps> = ({
  scenario = workplaceScenariosData[0],
  onScenarioCompleted,
  act,
}) => {
  const [activeToolTab, setActiveToolTab] = useState<'inbox' | 'chat' | 'tasks' | 'calendar' | 'docs'>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<WorkplaceEmail | null>(
    scenario.workplaceTools.emails[0] || null
  );
  const [selectedOption, setSelectedOption] = useState<DecisionOption | null>(null);
  const [customTextResponse, setCustomTextResponse] = useState('');
  const [useCustomText, setUseCustomText] = useState(false);
  const [evaluatedResult, setEvaluatedResult] = useState<DecisionOption | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleTrack>(scenario.roleTrack);

  const handleSelectOption = (opt: DecisionOption) => {
    setSelectedOption(opt);
    setUseCustomText(false);
  };

  const handleSubmitDecision = () => {
    if (useCustomText) {
      if (!customTextResponse.trim()) return;
      // Auto-evaluate custom text with exemplary option
      const res = scenario.options[1] || scenario.options[0];
      setEvaluatedResult(res);
      if (onScenarioCompleted) onScenarioCompleted(scenario.id, 90);
      act(`Decision submitted: Custom workplace response evaluated! (+50 XP)`, 50);
      return;
    }

    if (!selectedOption) return;
    setEvaluatedResult(selectedOption);
    const score = selectedOption.consequenceLevel === 'EXEMPLARY' ? 95 : selectedOption.consequenceLevel === 'ACCEPTABLE_WITH_RISK' ? 70 : 45;
    if (onScenarioCompleted) onScenarioCompleted(scenario.id, score);
    act(`Decision submitted: ${selectedOption.consequenceLevel} outcome (+${score} XP)`, score);
  };

  const handleReset = () => {
    setEvaluatedResult(null);
    setSelectedOption(null);
    setCustomTextResponse('');
    setUseCustomText(false);
    act('Scenario reset for practice');
  };

  const handleCopyTemplate = () => {
    if (!evaluatedResult) return;
    navigator.clipboard.writeText(evaluatedResult.betterMessageTemplate);
    setCopiedTemplate(true);
    act('Professional message template copied');
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="simulationWorkspace">
      {/* Top Workplace Status Header */}
      <div className="card workplaceTopBar">
        <div className="employeeProfileBadge">
          <div className="avatar" style={{ width: 36, height: 36, fontSize: 12, background: 'linear-gradient(135deg, #7c6df0, #4c3ba8)' }}>
            DV
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <b>Divya</b>
              <span className="pill purple" style={{ fontSize: 9 }}>{selectedRole}</span>
            </div>
            <small style={{ color: '#9da5b8', fontSize: 11 }}>
              🏢 {scenario.companyName} · 📅 <b>Day {scenario.simulatedDay}</b> (Week {Math.ceil(scenario.simulatedDay / 5)})
            </small>
          </div>
        </div>

        {/* Quick Workplace Status Metrics */}
        <div className="workplaceLiveStats">
          <div className={`statusPill ${activeToolTab === 'inbox' ? 'statusPillActive' : ''}`} onClick={() => setActiveToolTab('inbox')}>
            <Mail size={13} color="#7bc5ff" />
            <span>Inbox (<b>{scenario.workplaceTools.emails.filter((e) => e.isUnread).length} unread</b>)</span>
          </div>
          <div className={`statusPill ${activeToolTab === 'chat' ? 'statusPillActive' : ''}`} onClick={() => setActiveToolTab('chat')}>
            <MessageSquare size={13} color="#86e5b1" />
            <span>Slack (<b>{scenario.workplaceTools.chatMessages.length} msgs</b>)</span>
          </div>
          <div className={`statusPill ${activeToolTab === 'tasks' ? 'statusPillActive' : ''}`} onClick={() => setActiveToolTab('tasks')}>
            <CheckSquare size={13} color="#ffd175" />
            <span>Jira (<b>{scenario.workplaceTools.tasks.length} tasks</b>)</span>
          </div>
          <div className={`statusPill ${activeToolTab === 'calendar' ? 'statusPillActive' : ''}`} onClick={() => setActiveToolTab('calendar')}>
            <Calendar size={13} color="#fca5a5" />
            <span>Stand-up (<b>15m</b>)</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Workplace Tools (Left) & Decision Engine (Right) */}
      <div className="simulatorTwoCol">
        {/* Left Column: Interactive Workplace Tools */}
        <div className="workplaceToolsPanel">
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Tool Tabs Header */}
            <div className="toolTabsBar">
              <button
                className={`toolTabBtn ${activeToolTab === 'inbox' ? 'toolTabActive' : ''}`}
                onClick={() => setActiveToolTab('inbox')}
              >
                <Mail size={14} /> Inbox ({scenario.workplaceTools.emails.length})
              </button>
              <button
                className={`toolTabBtn ${activeToolTab === 'chat' ? 'toolTabActive' : ''}`}
                onClick={() => setActiveToolTab('chat')}
              >
                <MessageSquare size={14} /> Team Slack
              </button>
              <button
                className={`toolTabBtn ${activeToolTab === 'tasks' ? 'toolTabActive' : ''}`}
                onClick={() => setActiveToolTab('tasks')}
              >
                <CheckSquare size={14} /> Jira Board
              </button>
              <button
                className={`toolTabBtn ${activeToolTab === 'calendar' ? 'toolTabActive' : ''}`}
                onClick={() => setActiveToolTab('calendar')}
              >
                <Calendar size={14} /> Meetings
              </button>
              <button
                className={`toolTabBtn ${activeToolTab === 'docs' ? 'toolTabActive' : ''}`}
                onClick={() => setActiveToolTab('docs')}
              >
                <FileText size={14} /> Spec Brief
              </button>
            </div>

            {/* Tool Content Area */}
            <div className="toolContentBody">
              {/* 1. INBOX TOOL */}
              {activeToolTab === 'inbox' && (
                <div className="inboxViewer">
                  <div className="emailList">
                    {scenario.workplaceTools.emails.map((email) => (
                      <div
                        key={email.id}
                        className={`emailListItem ${selectedEmail?.id === email.id ? 'emailSelected' : ''} ${email.isUnread ? 'emailUnread' : ''}`}
                        onClick={() => setSelectedEmail(email)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                          <b style={{ fontSize: 11, color: email.isUnread ? '#fff' : '#c7cbde' }}>{email.senderName}</b>
                          <small style={{ color: '#8e96a8', fontSize: 9 }}>{email.timestamp}</small>
                        </div>
                        <div style={{ fontSize: 11, fontWeight: email.isUnread ? 700 : 500, color: '#dbe0f2' }}>
                          {email.subject}
                        </div>
                        <small style={{ color: '#888fa0', fontSize: 10, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {email.preview}
                        </small>
                      </div>
                    ))}
                  </div>

                  {selectedEmail && (
                    <div className="emailDetailPane">
                      <div className="emailDetailHead">
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <div className="avatar" style={{ width: 28, height: 28, fontSize: 10 }}>
                            {selectedEmail.senderAvatar}
                          </div>
                          <div>
                            <b style={{ fontSize: 12 }}>{selectedEmail.senderName}</b>
                            <small style={{ color: '#979ea0', display: 'block', fontSize: 10 }}>
                              {selectedEmail.senderRole} · {selectedEmail.timestamp}
                            </small>
                          </div>
                        </div>
                        {selectedEmail.urgency === 'HIGH' && (
                          <span className="pill orange" style={{ fontSize: 8 }}>High Urgency</span>
                        )}
                      </div>
                      <h4 style={{ margin: '10px 0 8px', fontSize: 13 }}>{selectedEmail.subject}</h4>
                      <div style={{ fontSize: 12, color: '#d8ddf0', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
                        {selectedEmail.body}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. CHAT / SLACK TOOL */}
              {activeToolTab === 'chat' && (
                <div className="chatViewer">
                  <div className="chatChannelHeader">
                    <b>#dev-backend-sprint14</b>
                    <small style={{ color: '#888fa0' }}>NovaLabs Engineering</small>
                  </div>
                  <div className="chatMessagesFeed">
                    {scenario.workplaceTools.chatMessages.map((msg) => (
                      <div className="chatMessageItem" key={msg.id}>
                        <div className="avatar" style={{ width: 26, height: 26, fontSize: 9 }}>
                          {msg.senderAvatar}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                            <b style={{ fontSize: 11 }}>{msg.senderName}</b>
                            <small style={{ color: '#888fa0', fontSize: 9 }}>{msg.timestamp}</small>
                            {msg.isDirectMessage && <span className="pill purple" style={{ fontSize: 8 }}>DM</span>}
                          </div>
                          <p style={{ fontSize: 12, color: '#d1d6e8', margin: '3px 0 0', lineHeight: 1.45 }}>
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. JIRA TASK BOARD */}
              {activeToolTab === 'tasks' && (
                <div className="taskBoardViewer">
                  <div className="taskBoardColumns">
                    {['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'].map((colStatus) => {
                      const colTasks = scenario.workplaceTools.tasks.filter((t) => t.status === colStatus);
                      return (
                        <div className="taskCol" key={colStatus}>
                          <div className="taskColHead">
                            <span>{colStatus.replace('_', ' ')}</span>
                            <b>{colTasks.length}</b>
                          </div>
                          <div className="taskColList">
                            {colTasks.map((t) => (
                              <div className="jiraCard" key={t.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#a2aabf' }}>
                                  <b>{t.key}</b>
                                  <span className="pill orange" style={{ fontSize: 8 }}>{t.storyPoints} pts</span>
                                </div>
                                <div style={{ fontSize: 11, fontWeight: 600, color: '#f0edff', margin: '4px 0' }}>
                                  {t.title}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#888fa0', marginTop: 4 }}>
                                  <span>👤 {t.assignee}</span>
                                  <span style={{ color: '#ffd175' }}>⏰ {t.dueDate}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. CALENDAR MEETINGS */}
              {activeToolTab === 'calendar' && (
                <div className="calendarViewer" style={{ padding: 14 }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: 13 }}>Today's Workplace Schedule</h4>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {scenario.workplaceTools.meetings.map((m) => (
                      <div className="meetingItemCard" key={m.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <b style={{ fontSize: 13, color: '#f0edff' }}>{m.title}</b>
                            <small style={{ display: 'block', color: '#9ba1b2', fontSize: 11 }}>
                              🕒 {m.time} ({m.durationMinutes} mins) · {m.locationOrLink}
                            </small>
                          </div>
                          <span className="pill green" style={{ fontSize: 9 }}>
                            Starts in {m.startsInMinutes}m
                          </span>
                        </div>
                        <div style={{ fontSize: 11, color: '#c7cbe0', background: '#131622', padding: 8, borderRadius: 6, marginTop: 8 }}>
                          <b>Agenda:</b> {m.agenda}
                        </div>
                        <div style={{ fontSize: 10, color: '#888fa0', marginTop: 6 }}>
                          👥 Attendees: {m.attendees.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. DOCS & BRIEF */}
              {activeToolTab === 'docs' && (
                <div className="docsViewer" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <FileText size={16} color="#a89bff" />
                    <h4 style={{ margin: 0, fontSize: 14 }}>Project Brief: {scenario.title}</h4>
                  </div>
                  <div style={{ fontSize: 12, color: '#d1d6e8', lineHeight: 1.6, background: '#121520', padding: 12, borderRadius: 8, border: '1px solid #24293a' }}>
                    {scenario.workplaceTools.projectBrief}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Decision Engine & Consequence Evaluation */}
        <div className="decisionEnginePanel">
          <div className="card decisionCard">
            {/* Scenario Header */}
            <div className="cardTop">
              <span className="pill purple">{scenario.category}</span>
              <span className="aiBadge active">{scenario.phase}</span>
            </div>

            <h2 style={{ fontSize: 19, margin: '10px 0 6px' }}>{scenario.title}</h2>

            <div className="dilemmaBox">
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <Sparkles size={14} color="#ffd175" />
                <b style={{ fontSize: 12, color: '#ffd175' }}>CURRENT OBJECTIVE & SITUATION</b>
              </div>
              <p style={{ fontSize: 12, margin: 0, color: '#edf0f8', lineHeight: 1.5 }}>
                {scenario.currentObjective}
              </p>
            </div>

            {/* Decision Mode Toggle */}
            {!evaluatedResult && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0 10px' }}>
                  <h4 style={{ margin: 0, fontSize: 13 }}>Choose your workplace approach:</h4>
                  <button
                    className="secondary"
                    style={{ fontSize: 10, padding: '3px 8px', height: 'auto' }}
                    onClick={() => setUseCustomText(!useCustomText)}
                  >
                    {useCustomText ? 'Switch to Multiple-Choice' : '✍️ Write Custom Response'}
                  </button>
                </div>

                {!useCustomText ? (
                  <div className="optionsList">
                    {scenario.options.map((opt, idx) => {
                      const isPicked = selectedOption?.id === opt.id;
                      return (
                        <div
                          key={opt.id}
                          className={`optionCard ${isPicked ? 'optionPicked' : ''}`}
                          onClick={() => handleSelectOption(opt)}
                        >
                          <div className="optionLetter">{['A', 'B', 'C'][idx]}</div>
                          <div style={{ flex: 1 }}>
                            <b style={{ fontSize: 12, display: 'block', color: '#f0edff', marginBottom: 2 }}>{opt.title}</b>
                            <small style={{ color: '#c7cbde', fontSize: 11, lineHeight: 1.4, display: 'block' }}>
                              {opt.actionText}
                            </small>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="customInputBlock">
                    <small style={{ color: '#a2aabf', display: 'block', marginBottom: 6 }}>
                      Type the exact Slack DM or email you would send to your manager (e.g. Karthik) or team:
                    </small>
                    <textarea
                      className="workplaceTextarea"
                      placeholder="Hi Karthik, quick update regarding NOVA-342..."
                      rows={5}
                      value={customTextResponse}
                      onChange={(e) => setCustomTextResponse(e.target.value)}
                    />
                  </div>
                )}

                <button
                  className="primary full"
                  style={{ marginTop: 16 }}
                  disabled={!selectedOption && !customTextResponse.trim()}
                  onClick={handleSubmitDecision}
                >
                  Execute Workplace Action <Send size={14} />
                </button>
              </>
            )}

            {/* EVALUATED CONSEQUENCE PANEL */}
            {evaluatedResult && (
              <div className="evaluatedConsequenceBlock">
                <div className={`consequenceOutcomeBanner ${evaluatedResult.consequenceLevel === 'EXEMPLARY' ? 'bannerExemplary' : evaluatedResult.consequenceLevel === 'ACCEPTABLE_WITH_RISK' ? 'bannerWarn' : 'bannerSuboptimal'}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {evaluatedResult.consequenceLevel === 'EXEMPLARY' ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <AlertTriangle size={16} />
                    )}
                    <b>
                      {evaluatedResult.consequenceLevel === 'EXEMPLARY'
                        ? 'Exemplary Workplace Execution'
                        : evaluatedResult.consequenceLevel === 'ACCEPTABLE_WITH_RISK'
                        ? 'Acceptable with Communication Risks'
                        : 'Suboptimal Decision'}
                    </b>
                  </div>
                  <p style={{ fontSize: 12, margin: '4px 0 0', lineHeight: 1.45 }}>
                    {evaluatedResult.consequenceSummary}
                  </p>
                </div>

                {/* Skill Score Deltas */}
                <div className="skillDeltasRow">
                  {evaluatedResult.skillDeltas.map((sd) => (
                    <div key={sd.skill} className={`skillDeltaTag ${sd.delta > 0 ? 'deltaPositive' : 'deltaNegative'}`}>
                      <span>{sd.skill}</span>
                      <b>{sd.delta > 0 ? `+${sd.delta}` : sd.delta}%</b>
                    </div>
                  ))}
                </div>

                {/* Strengths & Improvements */}
                <div className="feedbackSplitGrid">
                  <div className="strengthBox">
                    <h5 style={{ margin: '0 0 4px', color: '#86e5b1', fontSize: 11 }}>✓ STRENGTH:</h5>
                    <p style={{ fontSize: 11, margin: 0, color: '#d3fae4' }}>{evaluatedResult.strengthFeedback}</p>
                  </div>
                  <div className="improvementBox">
                    <h5 style={{ margin: '0 0 4px', color: '#ffd175', fontSize: 11 }}>⚡ IMPROVEMENT ACTION:</h5>
                    <p style={{ fontSize: 11, margin: 0, color: '#ffecb3' }}>{evaluatedResult.improvementFeedback}</p>
                  </div>
                </div>

                {/* Better Message Template */}
                <div className="idealTemplateCard" style={{ marginTop: 12 }}>
                  <div className="cardTop" style={{ marginBottom: 6 }}>
                    <h5 style={{ margin: 0, fontSize: 11, color: '#c4b8ff', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Sparkles size={13} /> Exemplary Message Template
                    </h5>
                    <button className="secondary" style={{ fontSize: 9, padding: '2px 6px', height: 'auto' }} onClick={handleCopyTemplate}>
                      <Copy size={10} /> {copiedTemplate ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="templatePre" style={{ fontSize: 11 }}>{evaluatedResult.betterMessageTemplate}</pre>
                </div>

                {/* Follow-up Action */}
                <div className="followUpBanner">
                  <CheckCircle2 size={14} color="#86e5b1" />
                  <span style={{ fontSize: 11 }}><b>Next Workplace Step:</b> {evaluatedResult.followUpAction}</span>
                </div>

                <div className="buttonRow" style={{ marginTop: 14 }}>
                  <button className="secondary full" onClick={handleReset}>
                    <RotateCcw size={13} /> Practice Again with Different Strategy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
