import React from 'react';
import {
  Users,
  Target,
  Sparkles,
  Award,
  BookOpen,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Building2,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  Compass,
} from 'lucide-react';
import {
  CareerPod,
  EmployerOpportunity,
  Mentor,
  PlaybookSimulation,
} from '../../data/networkData';

interface NetworkOverviewProps {
  onNavigateTab: (tab: string) => void;
  onRequestMentor: (mentor: Mentor) => void;
  onSelectPod: (pod: CareerPod) => void;
  onSelectOpportunity: (opp: EmployerOpportunity) => void;
  onSelectPlaybook: (sim: PlaybookSimulation) => void;
  topMentor: Mentor;
  recommendedPod: CareerPod;
  topOpportunity: EmployerOpportunity;
  upcomingOfficeHour: EmployerOpportunity;
  recommendedPlaybook: PlaybookSimulation;
  act: (msg: string, inc?: number) => void;
}

export const NetworkOverview: React.FC<NetworkOverviewProps> = ({
  onNavigateTab,
  onRequestMentor,
  onSelectPod,
  onSelectOpportunity,
  onSelectPlaybook,
  topMentor,
  recommendedPod,
  topOpportunity,
  upcomingOfficeHour,
  recommendedPlaybook,
  act,
}) => {
  return (
    <div className="networkOverview">
      {/* Header */}
      <div className="titleRow">
        <div>
          <p className="eyebrow">CAREER NETWORK</p>
          <h1>Build your professional circle</h1>
          <p className="muted">
            Learn, build, connect, and become visible to the right employers with Tier-1 peer & mentor support.
          </p>
        </div>
        <div className="buttonRow" style={{ margin: 0 }}>
          <button
            className="secondary"
            onClick={() => {
              onNavigateTab('mentors');
              act('Exploring verified mentors & alumni', 10);
            }}
          >
            <Users size={15} /> Find my next connection
          </button>
          <button
            className="primary"
            onClick={() => {
              onNavigateTab('pods');
              act('Exploring role-based Career Pods', 10);
            }}
          >
            <Target size={15} /> Join a Career Pod
          </button>
        </div>
      </div>

      {/* Network Summary Cards */}
      <div className="networkStatsGrid">
        <div className="card statCard">
          <div className="statIcon" style={{ background: '#261e47', color: '#a897ff' }}>
            <TrendingUp size={20} />
          </div>
          <div>
            <small>Network strength</small>
            <b>68%</b>
            <span className="statSub">Top 25% for Junior Frontend</span>
          </div>
        </div>

        <div className="card statCard">
          <div className="statIcon" style={{ background: '#1c2e42', color: '#7bc5ff' }}>
            <Users size={20} />
          </div>
          <div>
            <small>Active connections</small>
            <b>12</b>
            <span className="statSub">4 verified mentors · 8 pod peers</span>
          </div>
        </div>

        <div className="card statCard">
          <div className="statIcon" style={{ background: '#1a382c', color: '#7be3af' }}>
            <Target size={20} />
          </div>
          <div>
            <small>Current Career Pod</small>
            <b style={{ fontSize: 16 }}>React Placement</b>
            <span className="statSub">Sprint 3 · 64% completed</span>
          </div>
        </div>

        <div className="card statCard">
          <div className="statIcon" style={{ background: '#382f1b', color: '#ffd175' }}>
            <Award size={20} />
          </div>
          <div>
            <small>Projects reviewed</small>
            <b>3</b>
            <span className="statSub">2 mentor verified · 1 peer review</span>
          </div>
        </div>

        <div className="card statCard">
          <div className="statIcon" style={{ background: '#361d36', color: '#f797d5' }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <small>Referral readiness</small>
            <b style={{ color: '#c3b7ff' }}>76%</b>
            <span className="statSub">2 proof items pending</span>
          </div>
        </div>

        <div className="card statCard">
          <div className="statIcon" style={{ background: '#19333b', color: '#7ce7f5' }}>
            <Building2 size={20} />
          </div>
          <div>
            <small>Employer visibility</small>
            <b style={{ color: '#86e5b1', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4dbd83', display: 'inline-block' }} />
              Active
            </b>
            <span className="statSub">Visible to 18 verified recruiters</span>
          </div>
        </div>
      </div>

      {/* Your Next Network Action Card */}
      <div className="card nextActionCard">
        <div className="cardTop" style={{ marginBottom: 12 }}>
          <span className="pill">
            <Sparkles size={13} style={{ marginRight: 4 }} /> YOUR NEXT NETWORK ACTION
          </span>
          <span className="aiBadge active">+75 XP upon review</span>
        </div>
        <h2>Request a portfolio review from a frontend mentor</h2>
        <p className="nextActionDesc">
          Your React Career Platform project matches <b>Aravind Swaminathan’s</b> (Staff Frontend @ Razorpay) engineering background. You have completed the required test suite and live demo walkthrough.
        </p>

        <div className="whyNowBanner">
          <CheckCircle2 size={16} color="#75d7a0" />
          <span>
            <b>Why now:</b> You are only two verified evidence steps away from reaching <b>Referral-Ready (85%+)</b> status for Junior Frontend roles.
          </span>
        </div>

        <div className="buttonRow" style={{ marginTop: 18 }}>
          <button
            className="primary"
            onClick={() => onRequestMentor(topMentor)}
          >
            Prepare request to Aravind <ArrowUpRight size={15} />
          </button>
          <button
            className="secondary"
            onClick={() => onNavigateTab('mentors')}
          >
            View mentor profile
          </button>
        </div>
      </div>

      {/* Recommended Content Section */}
      <div className="sectionTitle">
        <h3>Recommended for your target: Junior Frontend Engineer</h3>
      </div>

      <div className="recommendationsGrid">
        {/* Recommended Career Pod */}
        <div className="card recCard">
          <div className="recBadge">
            <Target size={13} /> RECOMMENDED CAREER POD
          </div>
          <h4>{recommendedPod.name}</h4>
          <p>{recommendedPod.careerGoal}</p>
          <div className="recReason">
            💡 <b>Why recommended:</b> Matches your target role ({recommendedPod.targetRole}) with 2 open seats remaining and active mentor office hours.
          </div>
          <div className="recMeta">
            <span>👥 {recommendedPod.membersCount}/{recommendedPod.maxCapacity} members</span>
            <span>⚡ {recommendedPod.durationWeeks} weeks</span>
            <span>🎯 {recommendedPod.currentAvgReadiness}% avg readiness</span>
          </div>
          <button
            className="secondary full"
            onClick={() => {
              onNavigateTab('pods');
              onSelectPod(recommendedPod);
            }}
          >
            View Career Pod <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Recommended Mentor */}
        <div className="card recCard">
          <div className="recBadge" style={{ color: '#88dbff' }}>
            <Users size={13} /> RECOMMENDED MENTOR
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
            <div className="avatar" style={{ width: 40, height: 40, fontSize: 13 }}>
              {topMentor.avatar}
            </div>
            <div>
              <b style={{ fontSize: 14 }}>{topMentor.name}</b>
              <small style={{ display: 'block', color: '#9ba1b2' }}>{topMentor.role} · {topMentor.company}</small>
            </div>
          </div>
          <p style={{ fontSize: 12 }}>{topMentor.bio}</p>
          <div className="recReason">
            💡 <b>Why recommended:</b> Staff engineer at your top target company ({topMentor.company}) with verified portfolio review availability this week.
          </div>
          <button
            className="secondary full"
            onClick={() => onRequestMentor(topMentor)}
          >
            Request Guidance <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Employer Challenge */}
        <div className="card recCard">
          <div className="recBadge" style={{ color: '#ffd175' }}>
            <Award size={13} /> EMPLOYER CHALLENGE
          </div>
          <h4>{topOpportunity.title}</h4>
          <p>{topOpportunity.description}</p>
          <div className="recReason">
            💡 <b>Why recommended:</b> 82% skill match with your React & TypeScript experience. Top rankers skip technical screening rounds.
          </div>
          <div className="recMeta">
            <span>🏢 {topOpportunity.organization}</span>
            <span>⏳ {topOpportunity.deadline}</span>
            <span>💰 {topOpportunity.stipend}</span>
          </div>
          <button
            className="secondary full"
            onClick={() => {
              onNavigateTab('opportunities');
              onSelectOpportunity(topOpportunity);
            }}
          >
            View Challenge <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Upcoming Office Hour */}
        <div className="card recCard">
          <div className="recBadge" style={{ color: '#c49fff' }}>
            <Calendar size={13} /> UPCOMING INDUSTRY OFFICE HOUR
          </div>
          <h4>{upcomingOfficeHour.title}</h4>
          <p>{upcomingOfficeHour.description}</p>
          <div className="recReason">
            💡 <b>Why recommended:</b> Live interaction with senior engineers to ask architectural questions and understand hiring bars.
          </div>
          <div className="recMeta">
            <span>🏢 {upcomingOfficeHour.organization}</span>
            <span>🗓️ {upcomingOfficeHour.deadline}</span>
            <span>👥 {upcomingOfficeHour.participantsCount} attending</span>
          </div>
          <button
            className="secondary full"
            onClick={() => {
              onNavigateTab('opportunities');
              onSelectOpportunity(upcomingOfficeHour);
            }}
          >
            Reserve Free Seat <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Career Playbook Simulation */}
        <div className="card recCard">
          <div className="recBadge" style={{ color: '#fca5a5' }}>
            <Compass size={13} /> CAREER PLAYBOOK SIMULATION
          </div>
          <h4>{recommendedPlaybook.title}</h4>
          <p>{recommendedPlaybook.scenario}</p>
          <div className="recReason">
            💡 <b>Why recommended:</b> Learn the unwritten outreach rules that turn cold messages into warm mentor conversations without feeling transactional.
          </div>
          <div className="recMeta">
            <span>📚 {recommendedPlaybook.category}</span>
            <span>⏱️ {recommendedPlaybook.estimatedMinutes} min</span>
            <span>🏆 Badge: {recommendedPlaybook.badgeUnlock}</span>
          </div>
          <button
            className="secondary full"
            onClick={() => {
              onNavigateTab('playbook');
              onSelectPlaybook(recommendedPlaybook);
            }}
          >
            Start Simulation <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
