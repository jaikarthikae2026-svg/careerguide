import React, { useState } from 'react';
import {
  Users,
  Target,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  Calendar,
  X,
  Play,
  Send,
  MessageSquare,
  Check,
  Award,
  ChevronRight,
  Filter,
  Flame,
  ArrowRight,
  ExternalLink,
  Code2,
  Star,
} from 'lucide-react';
import {
  CareerPod,
  CareerPodMember,
  PeerReviewQueueItem,
  PodDiscussionPost,
  PodTask,
} from '../../data/networkData';
import { careerApi } from '../../api';

interface CareerPodsProps {
  pods: CareerPod[];
  myPod: CareerPod | null;
  onJoinPod: (pod: CareerPod) => void;
  act: (msg: string, inc?: number) => void;
}

export const CareerPods: React.FC<CareerPodsProps> = ({
  pods,
  myPod,
  onJoinPod,
  act,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'my-pod' | 'discover'>(
    myPod ? 'my-pod' : 'discover'
  );
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [skillFilter, setSkillFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Joining Pod Modal State
  const [selectedPodToJoin, setSelectedPodToJoin] = useState<CareerPod | null>(null);
  const [joinStep, setJoinStep] = useState<1 | 2 | 3>(1);
  const [confirmedRole, setConfirmedRole] = useState('Junior Frontend Developer');
  const [weeklyCommitmentAccepted, setWeeklyCommitmentAccepted] = useState(true);

  // Active Pod Interactive State
  const [currentPod, setCurrentPod] = useState<CareerPod>(
    myPod || pods[0]
  );
  const [discussionInput, setDiscussionInput] = useState('');
  const [discussions, setDiscussions] = useState<PodDiscussionPost[]>(
    currentPod.discussions || []
  );
  const [tasks, setTasks] = useState<PodTask[]>(currentPod.tasks || []);

  // Peer Review Modal State
  const [reviewingItem, setReviewingItem] = useState<PeerReviewQueueItem | null>(null);
  const [rubricScores, setRubricScores] = useState({
    correctness: 4,
    technicalQuality: 4,
    clarity: 5,
    documentation: 4,
    userExperience: 5,
    decisionExplanation: 4,
  });
  const [feedbackGood, setFeedbackGood] = useState('');
  const [feedbackImprove, setFeedbackImprove] = useState('');
  const [feedbackQuestion, setFeedbackQuestion] = useState('');
  const [readyForMentor, setReadyForMentor] = useState(true);
  const [reviewedItems, setReviewedItems] = useState<string[]>([]);

  // Filter pods
  const filteredPods = pods.filter((pod) => {
    if (roleFilter !== 'ALL' && !pod.targetRole.toLowerCase().includes(roleFilter.toLowerCase())) {
      return false;
    }
    if (skillFilter !== 'ALL' && !pod.skillFocus.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase()))) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        pod.name.toLowerCase().includes(q) ||
        pod.careerGoal.toLowerCase().includes(q) ||
        pod.targetRole.toLowerCase().includes(q) ||
        pod.skillFocus.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
          if (nextStatus === 'COMPLETED') {
            careerApi.completePodTask(currentPod.id, taskId).catch(() => {});
            act(`Task completed: ${t.title}`, t.xpReward);
          }
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handlePostDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discussionInput.trim()) return;
    const newPost: PodDiscussionPost = {
      id: 'd-' + Date.now(),
      authorName: 'Divya',
      authorAvatar: 'DV',
      roleLabel: 'Frontend Engineer Trainee',
      timestamp: 'Just now',
      content: discussionInput.trim(),
      likes: 1,
      replies: 0,
    };
    setDiscussions([newPost, ...discussions]);
    setDiscussionInput('');
    act('Posted in pod discussion board', 15);
  };

  const handleCompleteJoinPod = () => {
    if (!selectedPodToJoin) return;
    onJoinPod(selectedPodToJoin);
    setCurrentPod(selectedPodToJoin);
    setSelectedPodToJoin(null);
    setJoinStep(1);
    setActiveSubTab('my-pod');
    act(`Successfully joined ${selectedPodToJoin.name}!`, 100);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingItem) return;
    careerApi
      .submitPeerReview(currentPod.id, {
        targetSubmissionId: reviewingItem.id,
        scores: rubricScores,
        feedbackGood,
        feedbackImprove,
      })
      .catch(() => {});
    setReviewedItems([...reviewedItems, reviewingItem.id]);
    setReviewingItem(null);
    setFeedbackGood('');
    setFeedbackImprove('');
    setFeedbackQuestion('');
    act(`Peer review submitted for ${reviewingItem.authorName}! Badge progress updated. (+80 XP)`, 80);
  };

  return (
    <div className="careerPodsSection">
      {/* Title & Navigation Subtabs */}
      <div className="titleRow" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">PEER ACCELERATOR</p>
          <h1>Role-Based Career Pods</h1>
          <p className="muted">
            Small, goal-oriented circles of 6-8 students building real projects, reviewing code, and preparing for placement together.
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="podSubTabNav">
          <button
            className={`podNavBtn ${activeSubTab === 'my-pod' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('my-pod')}
          >
            <Flame size={15} /> My Pod Workspace ({currentPod.name.split(' ')[0]})
          </button>
          <button
            className={`podNavBtn ${activeSubTab === 'discover' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('discover')}
          >
            <Filter size={15} /> Discover Pods ({pods.length})
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SUBTAB 1: MY CAREER POD WORKSPACE */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'my-pod' && (
        <div className="myPodWorkspace">
          {/* Pod Header Card */}
          <div className="card podHeroCard">
            <div className="podHeroHead">
              <div>
                <span className="pill green">
                  <Flame size={12} style={{ marginRight: 4 }} /> ACTIVE SPRINT · WEEK 3 OF {currentPod.durationWeeks}
                </span>
                <h2 style={{ fontSize: 24, margin: '8px 0 4px' }}>{currentPod.name}</h2>
                <p className="muted" style={{ maxWidth: 650 }}>{currentPod.careerGoal}</p>
              </div>

              <div className="podProgressStats">
                <div className="statBlock">
                  <small>Pod Progress</small>
                  <b>{currentPod.progressPercent}%</b>
                  <div className="miniProgress"><i style={{ width: `${currentPod.progressPercent}%` }} /></div>
                </div>
                <div className="statBlock">
                  <small>Your Tasks Completed</small>
                  <b>5 / 6</b>
                  <div className="miniProgress"><i style={{ width: `83%` }} /></div>
                </div>
                <div className="statBlock">
                  <small>Demo Day In</small>
                  <b style={{ color: '#ffd175' }}>{currentPod.demoDayCountdownDays} Days</b>
                  <span style={{ fontSize: 10, color: '#9ba1b2' }}>Live mentor panel</span>
                </div>
              </div>
            </div>

            <div className="podMetaBar">
              <div className="metaItem">
                <span>🎯 Target Role:</span> <b>{currentPod.targetRole}</b>
              </div>
              <div className="metaItem">
                <span>⚡ Skill Focus:</span> <b>{currentPod.skillFocus.join(', ')}</b>
              </div>
              <div className="metaItem">
                <span>👨‍🏫 Lead Mentor:</span> <b>{currentPod.mentorName || 'Aravind Swaminathan (Razorpay)'}</b>
              </div>
              <div className="metaItem">
                <span>📅 Next Session:</span> <b>Saturday, 4:00 PM IST</b>
              </div>
            </div>
          </div>

          {/* Weekly Mission Card */}
          <div className="card missionHeroCard">
            <div className="cardTop">
              <span className="pill orange">
                <Target size={12} style={{ marginRight: 4 }} /> WEEKLY POD MISSION
              </span>
              <span style={{ fontSize: 11, color: '#ffd175' }}>⏰ Due {currentPod.weeklyMission.deadline}</span>
            </div>
            <h3 style={{ fontSize: 17, margin: '8px 0' }}>{currentPod.weeklyMission.title}</h3>
            <p style={{ fontSize: 13, color: '#c7cbe0' }}>{currentPod.weeklyMission.description}</p>
            <div className="buttonRow" style={{ margin: '14px 0 0' }}>
              <button className="primary" onClick={() => act('Project submission portal opened', 20)}>
                Submit your work for review <ArrowRight size={14} />
              </button>
              <button
                className="secondary"
                onClick={() => {
                  if (currentPod.peerReviewQueue.length) {
                    setReviewingItem(currentPod.peerReviewQueue[0]);
                  } else {
                    act('No pending submissions in queue');
                  }
                }}
              >
                Review peer submission (+60 XP)
              </button>
            </div>
          </div>

          {/* Grid Layout: Tasks & Review Queue (Left) vs Members & Discussion (Right) */}
          <div className="podGridTwoCol">
            {/* Left Column */}
            <div style={{ display: 'grid', gap: 18 }}>
              {/* Task Board */}
              <div className="card">
                <div className="cardTop" style={{ marginBottom: 12 }}>
                  <h3 style={{ margin: 0 }}>Sprint Task Board</h3>
                  <span className="aiBadge active">Sprint 3 of 6</span>
                </div>
                <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
                  Check off tasks as you build. Completing weekly tasks increases your referral readiness score.
                </p>

                <div className="taskList">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`taskItem ${task.status === 'COMPLETED' ? 'taskDone' : ''}`}
                      onClick={() => handleToggleTask(task.id)}
                    >
                      <div className="taskCheckbox">
                        {task.status === 'COMPLETED' ? <Check size={14} color="#86e5b1" /> : <i />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <b>{task.title}</b>
                        <small style={{ display: 'block', color: '#9aa2b5', marginTop: 2 }}>
                          {task.description}
                        </small>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span className="pill" style={{ fontSize: 9 }}>+{task.xpReward} XP</span>
                        <small style={{ display: 'block', color: '#ffd175', fontSize: 9, marginTop: 4 }}>
                          {task.dueDate}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Peer Review Queue */}
              <div className="card">
                <div className="cardTop" style={{ marginBottom: 12 }}>
                  <h3 style={{ margin: 0 }}>Peer Review Queue</h3>
                  <span className="pill purple">
                    <Award size={12} style={{ marginRight: 4 }} /> Rubric Verified
                  </span>
                </div>
                <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
                  Tier-1 institutes thrive because peers ruthlessly and constructively review each other’s code before mentors see it.
                </p>

                <div className="reviewQueueList">
                  {currentPod.peerReviewQueue.map((item) => {
                    const isReviewed = reviewedItems.includes(item.id);
                    return (
                      <div className="reviewQueueCard" key={item.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <div className="avatar" style={{ width: 34, height: 34, fontSize: 11 }}>
                              {item.authorAvatar}
                            </div>
                            <div>
                              <b>{item.authorName}</b>
                              <small style={{ display: 'block', color: '#9ba1b2' }}>{item.submissionType} · {item.submittedAt}</small>
                            </div>
                          </div>
                          {isReviewed ? (
                            <span className="aiBadge active">✓ Review Submitted (+60 XP)</span>
                          ) : (
                            <button
                              className="secondary"
                              style={{ fontSize: 11, padding: '5px 10px', height: 'auto' }}
                              onClick={() => setReviewingItem(item)}
                            >
                              Review with Rubric <ArrowRight size={12} />
                            </button>
                          )}
                        </div>

                        <h4 style={{ margin: '10px 0 4px', fontSize: 14 }}>{item.projectTitle}</h4>
                        <p style={{ fontSize: 12, color: '#c7cbde', margin: '4px 0 10px' }}>{item.summary}</p>

                        <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#9ba2b5' }}>
                          {item.demoUrl && (
                            <a href={item.demoUrl} target="_blank" rel="noreferrer" style={{ color: '#a89bff', display: 'flex', alignItems: 'center', gap: 4 }}>
                              <ExternalLink size={12} /> Live Preview
                            </a>
                          )}
                          {item.repoUrl && (
                            <a href={item.repoUrl} target="_blank" rel="noreferrer" style={{ color: '#a89bff', display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Code2 size={12} /> View Code
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Pod Members & Discussion */}
            <div style={{ display: 'grid', gap: 18 }}>
              {/* Pod Members with Contribution Badges */}
              <div className="card">
                <div className="cardTop" style={{ marginBottom: 12 }}>
                  <h3 style={{ margin: 0 }}>Pod Members ({currentPod.members.length})</h3>
                  <span className="pill green">Active Cohort</span>
                </div>

                <div className="memberList">
                  {currentPod.members.map((member) => (
                    <div className="memberCard" key={member.id}>
                      <div className="avatar" style={{ width: 36, height: 36, fontSize: 12 }}>
                        {member.avatar}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <b>{member.name}</b>
                          {member.isLead && <span className="pill orange" style={{ fontSize: 8 }}>Lead</span>}
                          {member.isCurrentUser && <span className="pill purple" style={{ fontSize: 8 }}>You</span>}
                        </div>
                        <small style={{ display: 'block', color: '#9ba1b2', fontSize: 10 }}>{member.role}</small>
                        <div className="badgeList" style={{ marginTop: 4 }}>
                          {member.badges.map((b) => (
                            <span key={b} className="memberBadgeTag">
                              ⭐ {b}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: 11, color: '#9da4b8' }}>
                        <b>{member.tasksCompleted}/{member.totalTasks}</b>
                        <small style={{ display: 'block' }}>tasks</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pod Discussion Board */}
              <div className="card">
                <div className="cardTop" style={{ marginBottom: 12 }}>
                  <h3 style={{ margin: 0 }}>Pod Discussion & Help</h3>
                  <MessageSquare size={16} color="#9d8cff" />
                </div>

                <form onSubmit={handlePostDiscussion} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      className="apiKeyInputGroup"
                      style={{ flex: 1, background: '#171a25', border: '1px solid #33384c', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 12 }}
                      placeholder="Ask the pod or share code updates..."
                      value={discussionInput}
                      onChange={(e) => setDiscussionInput(e.target.value)}
                    />
                    <button className="primary" type="submit" style={{ padding: '0 12px', height: 36 }}>
                      <Send size={13} />
                    </button>
                  </div>
                </form>

                <div className="discussionFeed">
                  {discussions.map((post) => (
                    <div className="discussionItem" key={post.id}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                        <div className="avatar" style={{ width: 24, height: 24, fontSize: 9 }}>
                          {post.authorAvatar}
                        </div>
                        <b style={{ fontSize: 12 }}>{post.authorName}</b>
                        <small style={{ color: '#888fa0', fontSize: 10 }}>{post.timestamp}</small>
                      </div>
                      <p style={{ fontSize: 12, color: '#d1d6e6', margin: '4px 0 6px 32px' }}>{post.content}</p>
                      <div style={{ display: 'flex', gap: 14, marginLeft: 32, fontSize: 10, color: '#979eb0' }}>
                        <button
                          onClick={() => act('Liked post')}
                          style={{ color: '#a89bff', display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          👍 {post.likes}
                        </button>
                        <span>💬 {post.replies} replies</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUBTAB 2: DISCOVER CAREER PODS */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'discover' && (
        <div className="discoverPods">
          {/* Filters Bar */}
          <div className="filterToolbar card">
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flex: 1, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#a2a8b8' }}>
                <Filter size={14} /> Filter by:
              </div>

              <select
                className="filterSelect"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="ALL">All Target Roles</option>
                <option value="Frontend">Frontend Developer</option>
                <option value="Backend">Backend Engineer</option>
                <option value="Data">Data Analyst / Engineer</option>
                <option value="Product">Associate Product Manager</option>
                <option value="SDE">Software Engineer (General)</option>
                <option value="AI">AI / LLM Engineer</option>
              </select>

              <select
                className="filterSelect"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
              >
                <option value="ALL">All Tech Stacks</option>
                <option value="React">React / TypeScript</option>
                <option value="SQL">SQL & Analytics</option>
                <option value="PostgreSQL">PostgreSQL / Redis</option>
                <option value="Docker">Docker & Cloud</option>
                <option value="DSA">DSA / LeetCode</option>
                <option value="Gemini">Gemini / AI Agents</option>
              </select>

              <input
                className="filterSearchInput"
                placeholder="Search pod name or goal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Pod Cards Grid */}
          <div className="podCardsGrid">
            {filteredPods.map((pod) => {
              const isJoined = currentPod.id === pod.id;
              return (
                <div className="card podCatalogCard" key={pod.id}>
                  <div className="cardTop">
                    <span className="pill purple">
                      {pod.targetRole}
                    </span>
                    <span className={`pill ${pod.isOpen ? 'green' : 'orange'}`}>
                      {pod.isOpen ? `${pod.maxCapacity - pod.membersCount} Seats Available` : 'Pod Full'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 18, margin: '12px 0 6px' }}>{pod.name}</h3>
                  <p className="muted" style={{ fontSize: 12, minHeight: 40 }}>{pod.careerGoal}</p>

                  <div className="podTags">
                    {pod.skillFocus.map((s) => (
                      <span key={s} className="pill" style={{ fontSize: 9 }}>{s}</span>
                    ))}
                  </div>

                  <div className="podMetricRow">
                    <div>
                      <small>Cohort Size</small>
                      <b>{pod.membersCount}/{pod.maxCapacity}</b>
                    </div>
                    <div>
                      <small>Duration</small>
                      <b>{pod.durationWeeks} Weeks</b>
                    </div>
                    <div>
                      <small>Avg Readiness</small>
                      <b style={{ color: '#86e5b1' }}>{pod.currentAvgReadiness}%</b>
                    </div>
                    <div>
                      <small>Commitment</small>
                      <b>{pod.weeklyHours}h / wk</b>
                    </div>
                  </div>

                  <div className="podMilestoneBanner">
                    <Calendar size={13} color="#9d8cff" />
                    <span><b>Next:</b> {pod.nextMilestone}</span>
                  </div>

                  <div className="podCardActions">
                    {isJoined ? (
                      <button
                        className="secondary full"
                        onClick={() => {
                          setActiveSubTab('my-pod');
                          act(`Switched to active workspace for ${pod.name}`);
                        }}
                      >
                        ✓ Currently Joined (Open Workspace)
                      </button>
                    ) : (
                      <button
                        className="primary full"
                        disabled={!pod.isOpen}
                        onClick={() => {
                          setSelectedPodToJoin(pod);
                          setJoinStep(1);
                        }}
                      >
                        {pod.isOpen ? 'Join Career Pod' : 'Join Waiting List'} <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* JOIN POD MODAL FLOW */}
      {/* ------------------------------------------------------------- */}
      {selectedPodToJoin && (
        <div className="profileModalOverlay" onClick={() => setSelectedPodToJoin(null)}>
          <div className="profileModal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 580 }}>
            <div className="profileModalHeader">
              <div>
                <p className="eyebrow">CAREER POD ONBOARDING</p>
                <h2>Join {selectedPodToJoin.name}</h2>
              </div>
              <button className="icon" onClick={() => setSelectedPodToJoin(null)}>
                <X size={18} />
              </button>
            </div>

            {joinStep === 1 && (
              <div>
                <div className="card" style={{ background: '#1a1f2e', marginBottom: 14 }}>
                  <h4 style={{ margin: '0 0 6px', color: '#b9aeff' }}>🎯 Pod Goal & Expectations</h4>
                  <p style={{ fontSize: 12 }}>{selectedPodToJoin.careerGoal}</p>
                </div>

                <div className="modalCommitmentGrid">
                  <div className="commitmentItem">
                    <b>⏱️ {selectedPodToJoin.weeklyHours} Hours / Week</b>
                    <small>Dedicated sprint time for coding & problem solving</small>
                  </div>
                  <div className="commitmentItem">
                    <b>🤝 2 Peer Reviews / Week</b>
                    <small>Mandatory constructive rubric feedback on peer code</small>
                  </div>
                  <div className="commitmentItem">
                    <b>📅 Weekly Mentor Office Hours</b>
                    <small>Live group Q&A with {selectedPodToJoin.mentorName || 'verified tech leads'}</small>
                  </div>
                  <div className="commitmentItem">
                    <b>🚀 Demo Day Showcase</b>
                    <small>Present working capstone to verified recruiter network</small>
                  </div>
                </div>

                <div className="profileActions" style={{ marginTop: 20 }}>
                  <button className="secondary" onClick={() => setSelectedPodToJoin(null)}>
                    Cancel
                  </button>
                  <button className="primary" onClick={() => setJoinStep(2)}>
                    Review Requirements & Continue <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {joinStep === 2 && (
              <div>
                <h4 style={{ margin: '0 0 8px' }}>Confirm Your Target Alignment</h4>
                <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
                  Career Pods are strictly outcome-aligned. Please confirm your primary goal for this cohort:
                </p>

                <div className="profileField" style={{ marginBottom: 14 }}>
                  <span>Your Target Placement Role</span>
                  <input
                    value={confirmedRole}
                    onChange={(e) => setConfirmedRole(e.target.value)}
                    placeholder="e.g. Junior Frontend Developer"
                  />
                </div>

                <label className="settingOption" style={{ background: '#1c2233', padding: 12, borderRadius: 10, border: '1px solid #333d54', marginBottom: 16 }}>
                  <span>
                    <b>I commit to active peer reviews & weekly deliverables</b>
                    <small style={{ display: 'block', color: '#9aa2b5', fontSize: 11 }}>
                      I understand that ghosting or failing to review peer work results in pod reallocation to maintain high group momentum.
                    </small>
                  </span>
                  <input
                    type="checkbox"
                    checked={weeklyCommitmentAccepted}
                    onChange={(e) => setWeeklyCommitmentAccepted(e.target.checked)}
                  />
                </label>

                <div className="profileActions">
                  <button className="secondary" onClick={() => setJoinStep(1)}>
                    Back
                  </button>
                  <button
                    className="primary"
                    disabled={!weeklyCommitmentAccepted}
                    onClick={handleCompleteJoinPod}
                  >
                    Confirm & Enter Career Pod <CheckCircle2 size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STRUCTURED PEER REVIEW MODAL (6-DIMENSION RUBRIC) */}
      {/* ------------------------------------------------------------- */}
      {reviewingItem && (
        <div className="profileModalOverlay" onClick={() => setReviewingItem(null)}>
          <div className="profileModal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 660, maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="profileModalHeader">
              <div>
                <p className="eyebrow">STRUCTURED PEER REVIEW</p>
                <h2>Reviewing: {reviewingItem.authorName}</h2>
              </div>
              <button className="icon" onClick={() => setReviewingItem(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="card" style={{ background: '#181b29', marginBottom: 16 }}>
              <h4 style={{ margin: '0 0 4px', fontSize: 14 }}>{reviewingItem.projectTitle}</h4>
              <p style={{ fontSize: 12, color: '#cbd2e8', margin: '4px 0 8px' }}>{reviewingItem.summary}</p>
              <div style={{ display: 'flex', gap: 14, fontSize: 11 }}>
                {reviewingItem.demoUrl && (
                  <a href={reviewingItem.demoUrl} target="_blank" rel="noreferrer" style={{ color: '#a89bff' }}>
                    🔗 Open Live Deployment
                  </a>
                )}
                {reviewingItem.repoUrl && (
                  <a href={reviewingItem.repoUrl} target="_blank" rel="noreferrer" style={{ color: '#a89bff' }}>
                    💻 Open GitHub Repo
                  </a>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmitReview}>
              <h4 style={{ margin: '0 0 10px', color: '#b9adff' }}>1. 6-Dimension Rubric Scoring (1 - 5)</h4>

              <div className="rubricGrid">
                {[
                  { key: 'correctness', label: '1. Functional Correctness & Edge Cases' },
                  { key: 'technicalQuality', label: '2. Technical Code Quality & Modular Architecture' },
                  { key: 'clarity', label: '3. Code Readability & Clean Structure' },
                  { key: 'documentation', label: '4. README, Setup Docs & Architecture Diagrams' },
                  { key: 'userExperience', label: '5. UX, Responsive Layout & Error States' },
                  { key: 'decisionExplanation', label: '6. Ability to Justify Engineering Decisions' },
                ].map(({ key, label }) => (
                  <div className="rubricItem" key={key}>
                    <span>{label}</span>
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

              <h4 style={{ margin: '18px 0 10px', color: '#b9adff' }}>2. Structured Actionable Feedback</h4>

              <div className="profileField" style={{ marginBottom: 12 }}>
                <span>What works well? (Specific engineering strength)</span>
                <input
                  required
                  placeholder="e.g. Excellent custom hook abstraction and clear error boundary fallback..."
                  value={feedbackGood}
                  onChange={(e) => setFeedbackGood(e.target.value)}
                />
              </div>

              <div className="profileField" style={{ marginBottom: 12 }}>
                <span>What should be improved first? (Highest priority refinement)</span>
                <input
                  required
                  placeholder="e.g. Decouple the data fetching cache to prevent unneeded re-renders..."
                  value={feedbackImprove}
                  onChange={(e) => setFeedbackImprove(e.target.value)}
                />
              </div>

              <div className="profileField" style={{ marginBottom: 12 }}>
                <span>What question would you ask the creator in a live interview?</span>
                <input
                  required
                  placeholder="e.g. Why did you choose WebSockets over Server-Sent Events for this throughput?"
                  value={feedbackQuestion}
                  onChange={(e) => setFeedbackQuestion(e.target.value)}
                />
              </div>

              <label className="settingOption" style={{ background: '#1c2233', padding: 10, borderRadius: 8, marginBottom: 18 }}>
                <span>
                  <b>Ready for Mentor Review</b>
                  <small style={{ display: 'block', color: '#9ba1b2', fontSize: 11 }}>
                    Check if this submission meets high-signal standards to show Aravind during office hours.
                  </small>
                </span>
                <input
                  type="checkbox"
                  checked={readyForMentor}
                  onChange={(e) => setReadyForMentor(e.target.checked)}
                />
              </label>

              <div className="profileActions">
                <button type="button" className="secondary" onClick={() => setReviewingItem(null)}>
                  Cancel
                </button>
                <button className="primary" type="submit">
                  Submit Rubric Review (+60 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
