import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar as RechartsRadar,
  LineChart,
  Line,
  Tooltip,
} from "recharts";
import {
  LayoutDashboard,
  IdCard,
  GitBranch,
  Map,
  BookOpen,
  Target,
  CalendarDays,
  Mic2,
  FileText,
  ChartNoAxesCombined,
  Orbit,
  Settings,
  Search,
  Bell,
  Sparkles,
  ChevronRight,
  Lock,
  Check,
  Circle,
  X,
  Play,
  MessageSquare,
  ArrowUpRight,
  Menu,
  Send,
  Zap,
  Trophy,
  Brain,
  Code2,
  Heart,
  Key,
  RefreshCw,
  Bot,
  Users,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import "./styles.css";
import {
  careerApi,
  getStoredGeminiKey,
  setStoredGeminiKey,
  ChatMessage,
  InterviewEvaluation,
  AiStatus,
} from "./api";
import { CareerNetwork } from "./components/CareerNetwork/CareerNetwork";
import { WorkReady } from "./components/WorkReady/WorkReady";
import { MicroInternships } from "./components/MicroInternships/MicroInternships";
import { ReadinessAnalytics } from "./components/ReadinessAnalytics/ReadinessAnalytics";
import { ResumeIntelligence } from "./components/ResumeIntelligence/ResumeIntelligence";

const studentName = "Divya";
const normalizeStudentIdentity = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) textNodes.push(node as Text);
  textNodes.forEach((textNode) => {
    textNode.nodeValue =
      textNode.nodeValue
        ?.replace(/\bAlex Johnson\b/g, studentName)
        .replace(/\bAlex\b/g, studentName)
        .replace(/\bALEX JOHNSON\b/g, studentName)
        .replace(/\bAJ\b/g, "DV") ?? null;
  });
};

if (typeof document !== "undefined") {
  const identityObserver = new MutationObserver(normalizeStudentIdentity);
  identityObserver.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(normalizeStudentIdentity, 0);
}

type Page =
  | "Command Center"
  | "Career Passport"
  | "Skill Tree"
  | "Career Roadmap"
  | "Learning Hub"
  | "Company Fit"
  | "Career Network"
  | "WorkReady"
  | "Micro-Internships"
  | "Daily Mission"
  | "Mock Arena"
  | "Resume Intelligence"
  | "Readiness Analytics"
  | "Future Scope";
const nav: { label: Page; icon: any }[] = [
  ["Command Center", LayoutDashboard],
  ["Career Passport", IdCard],
  ["Skill Tree", GitBranch],
  ["Career Roadmap", Map],
  ["Learning Hub", BookOpen],
  ["Company Fit", Target],
  ["Career Network", Users],
  ["WorkReady", Briefcase],
  ["Micro-Internships", Sparkles],
  ["Daily Mission", CalendarDays],
  ["Mock Arena", Mic2],
  ["Resume Intelligence", FileText],
  ["Readiness Analytics", ChartNoAxesCombined],
  ["Future Scope", Orbit],
].map(([label, icon]) => ({ label, icon }));
const skillData = [
  { name: "DSA", value: 70 },
  { name: "Core CS", value: 60 },
  { name: "Projects", value: 85 },
  { name: "Communication", value: 75 },
  { name: "Resume", value: 82 },
  { name: "Interview", value: 58 },
];
const trend = [
  { x: "May", v: 65 },
  { x: "Jun", v: 68 },
  { x: "Jul", v: 70 },
  { x: "Aug", v: 72 },
];
function Score({ value, size = 160 }: { value: number; size?: number }) {
  return (
    <div
      className="score"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(#8b7cff ${value * 3.6}deg,#252a38 0deg)`,
      }}
    >
      <div className="scoreInner">
        <b>{value}</b>
        <span>/ 100</span>
      </div>
    </div>
  );
}
function Card({
  children,
  className = "",
  style,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={"card " + className} style={style} onClick={onClick} {...props}>
      {children}
    </section>
  );
}
function Pill({
  children,
  tone = "purple",
  className = "",
  style,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: string }) {
  return (
    <span className={"pill " + tone + " " + className} style={style} {...props}>
      {children}
    </span>
  );
}
function ProfileEditor({
  close,
  act,
}: {
  close: () => void;
  act: (msg: string, inc?: number) => void;
}) {
  const [form, setForm] = useState({
    name: "Divya",
    role: "Software Engineer",
    location: "Bengaluru, India",
    email: "divya.careeros@email.com",
  });
  const updateField = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));
  return (
    <div className="profileModalOverlay" onClick={close}>
      <div className="profileModal" onClick={(e) => e.stopPropagation()}>
        <div className="profileModalHeader">
          <div>
            <p className="eyebrow">PROFILE EDITOR</p>
            <h2>Edit professional profile</h2>
          </div>
          <button
            className="icon"
            onClick={close}
            aria-label="Close profile editor"
          >
            <X size={18} />
          </button>
        </div>
        <div className="profileFields">
          <label className="profileField">
            <span>Name</span>
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </label>
          <label className="profileField">
            <span>Target role</span>
            <input
              value={form.role}
              onChange={(e) => updateField("role", e.target.value)}
            />
          </label>
          <label className="profileField">
            <span>Location</span>
            <input
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </label>
          <label className="profileField">
            <span>Email</span>
            <input
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </label>
        </div>
        <div className="profileActions">
          <button className="secondary" onClick={close}>
            Cancel
          </button>
          <button
            className="primary"
            onClick={() => {
              act("Profile updated");
              close();
            }}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
function SettingsPanel({
  close,
  act,
}: {
  close: () => void;
  act: (msg: string) => void;
}) {
  const [notifications, setNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [geminiKey, setGeminiKey] = useState(() => getStoredGeminiKey());
  const [status, setStatus] = useState<AiStatus | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    careerApi
      .getAiStatus()
      .then(setStatus)
      .catch(() => {});
  }, []);

  const testConnection = async () => {
    setTesting(true);
    setStoredGeminiKey(geminiKey);
    try {
      const res = await careerApi.getAiStatus();
      setStatus(res);
      if (res.isAvailable) {
        act("Gemini API connection verified!");
      } else {
        act("Running in offline mock mode");
      }
    } catch (e: any) {
      act("Connection check failed");
    } finally {
      setTesting(false);
    }
  };

  const saveSettings = () => {
    setStoredGeminiKey(geminiKey);
    act("Settings & API configuration saved");
    close();
  };

  return (
    <div className="profileModalOverlay" onClick={close}>
      <div className="profileModal" onClick={(e) => e.stopPropagation()}>
        <div className="profileModalHeader">
          <div>
            <p className="eyebrow">CAREEROS SETTINGS</p>
            <h2>Preferences & AI Engine</h2>
          </div>
          <button className="icon" onClick={close} aria-label="Close settings">
            <X size={18} />
          </button>
        </div>
        <div className="settingsOptions">
          <label className="settingOption">
            <span>
              <b>Career notifications</b>
              <small>
                Receive reminders about your daily mission and progress.
              </small>
            </span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          </label>
          <label className="settingOption">
            <span>
              <b>Compact dashboard</b>
              <small>Use a denser layout for more information on screen.</small>
            </span>
            <input
              type="checkbox"
              checked={compactMode}
              onChange={(e) => setCompactMode(e.target.checked)}
            />
          </label>
        </div>

        <div className="apiKeySection">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Sparkles size={16} color="#9d8cff" />
              <h4>Google Gemini API Key</h4>
            </div>
            {status && (
              <span className={`aiBadge ${status.isAvailable ? "active" : "mock"}`}>
                {status.isAvailable ? `Gemini 2.5 Flash (${status.configuredVia})` : "Smart Mock Mode"}
              </span>
            )}
          </div>
          <p className="muted" style={{ fontSize: 11, margin: "4px 0 10px" }}>
            Provide your Gemini API key to activate live LLM intelligence across the Career Mentor, Mock Interview Arena, and Resume Intelligence.
          </p>
          <div className="apiKeyInputGroup">
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIzaSy..."
            />
            <button className="secondary" onClick={testConnection} disabled={testing} style={{ minWidth: 110 }}>
              {testing ? <RefreshCw size={14} className="aiSpin" /> : "Test Key"}
            </button>
          </div>
        </div>

        <div className="profileActions">
          <button className="secondary" onClick={close}>
            Cancel
          </button>
          <button className="primary" onClick={saveSettings}>
            Save settings
          </button>
        </div>
      </div>
    </div>
  );
}
function NotificationsPanel({ close }: { close: () => void }) {
  const notifications = [
    {
      title: "Daily mission update",
      detail: "Your Trees practice plan is ready for today.",
      time: "2h ago",
    },
    {
      title: "Interview reminder",
      detail: "Mock interview session starts in 30 minutes.",
      time: "Today",
    },
    {
      title: "Resume insight",
      detail: "Add SQL keywords to improve your backend fit.",
      time: "Yesterday",
    },
  ];

  return (
    <div className="profileModalOverlay" onClick={close}>
      <div className="profileModal" onClick={(e) => e.stopPropagation()}>
        <div className="profileModalHeader">
          <div>
            <p className="eyebrow">NOTIFICATIONS</p>
            <h2>Your updates</h2>
          </div>
          <button className="icon" onClick={close} aria-label="Close notifications">
            <X size={18} />
          </button>
        </div>
        <div className="notificationList">
          {notifications.map((item) => (
            <div key={item.title} className="notificationItem">
              <div className="notificationDot" />
              <div>
                <b>{item.title}</b>
                <p>{item.detail}</p>
              </div>
              <span>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function PersonProfilePanel({ close }: { close: () => void }) {
  const person = {
    name: "Divya",
    role: "Software Engineer",
    location: "Bengaluru, India",
    email: "divya.careeros@email.com",
    profileStrength: "8.4 / 10",
    focus: "Trees & Graphs, SQL, and System Design",
  };

  return (
    <div className="profileModalOverlay" onClick={close}>
      <div className="profileModal" onClick={(e) => e.stopPropagation()}>
        <div className="profileModalHeader">
          <div>
            <p className="eyebrow">ABOUT</p>
            <h2>Profile overview</h2>
          </div>
          <button className="icon" onClick={close} aria-label="Close profile overview">
            <X size={18} />
          </button>
        </div>
        <div className="profileFields">
          <div className="profilePreview" style={{ display: "grid", gap: 12 }}>
            <div className="avatar" style={{ width: 52, height: 52, fontSize: 18 }}>
              DV
            </div>
            <div>
              <h3 style={{ margin: 0 }}>{person.name}</h3>
              <p style={{ margin: "4px 0 0", color: "#b7bfd6" }}>{person.role}</p>
            </div>
          </div>
          <label className="profileField">
            <span>Location</span>
            <input value={person.location} readOnly />
          </label>
          <label className="profileField">
            <span>Email</span>
            <input value={person.email} readOnly />
          </label>
          <label className="profileField">
            <span>Profile strength</span>
            <input value={person.profileStrength} readOnly />
          </label>
          <label className="profileField">
            <span>Current focus</span>
            <input value={person.focus} readOnly />
          </label>
        </div>
      </div>
    </div>
  );
}
function App() {
  const [page, setPage] = useState<Page>("Command Center");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebar, setSidebar] = useState(true);
  const [readiness, setReadiness] = useState(72);
  const [xp, setXp] = useState(1250);
  const [target, setTarget] = useState("Nexa Systems");
  const [assistant, setAssistant] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [personProfileOpen, setPersonProfileOpen] = useState(false);
  const [stressSupport, setStressSupport] = useState(false);
  const [apiError, setApiError] = useState("");
  const [toast, setToast] = useState("");
  const [completed, setCompleted] = useState(1);
  const [skill, setSkill] = useState<{
    name: string;
    value: number;
    status: string;
  } | null>(null);
  const [company, setCompany] = useState("Nexa Systems");
  useEffect(() => {
    careerApi
      .loginDemo()
      .then(() => careerApi.dashboard())
      .then((data) => {
        setReadiness(data.placementReadiness.overallScore);
        setXp(data.xp);
        setTarget(
          data.activeTargetCompany?.name ||
            data.activeTargetCompany?.company?.name ||
            "Nexa Systems",
        );
        setCompany(
          data.activeTargetCompany?.name ||
            data.activeTargetCompany?.company?.name ||
            "Nexa Systems",
        );
      })
      .catch((error) =>
        setApiError(`Live career data unavailable: ${error.message}`),
      );
  }, []);
  const act = (msg: string, inc = 0) => {
    if (msg.includes("reduced") || msg === "stress-support") {
      localStorage.setItem("careerOSStress", "true");
      setAssistant(true);
      setToast("AI support chat opened");
      careerApi
        .wellbeing("STRESSED")
        .catch(() =>
          setApiError("Could not sync wellbeing with the CareerOS API."),
        );
    } else {
      setToast(msg);
    }
    if (inc) {
      setXp((x) => Math.min(2000, x + inc));
      setReadiness((r) => Math.min(100, r + Math.ceil(inc / 50)));
    }
    setTimeout(() => setToast(""), 2300);
  };
  const filteredNav = nav.filter(({ label }) =>
    label.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );
  return (
    <div className="app">
      <aside className={sidebar ? "sidebar" : "sidebar collapsed"}>
        <div className="brand">
          <div className="logo">
            <Sparkles size={18} />
          </div>
          {sidebar && (
            <span>
              Career<span>OS</span>
            </span>
          )}
          <button
            className="icon collapse"
            onClick={() => setSidebar(!sidebar)}
          >
            <Menu size={18} />
          </button>
        </div>
        <nav>
          {(filteredNav.length ? filteredNav : nav).map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={page === label ? "active" : ""}
              onClick={() => setPage(label)}
              title={label}
            >
              <Icon size={19} />
              {sidebar && <span>{label}</span>}
            </button>
          ))}
          {searchQuery && filteredNav.length === 0 && sidebar && (
            <div className="searchEmpty">No matching section</div>
          )}
        </nav>
        <div className="sidebottom">
          <button onClick={() => setSettingsOpen(true)}>
            <Settings size={18} />
            {sidebar && "Settings"}
          </button>
          <div className="profile">
            <div
              className="avatar"
              onClick={() => setPersonProfileOpen(true)}
              style={{ cursor: "pointer" }}
            >
              DV
            </div>
            {sidebar && (
              <div>
                <b>Divya</b>
                <small>Level 12</small>
              </div>
            )}
          </div>
        </div>
      </aside>
      <main>
        <header>
          <button
            className="mobileMenu icon"
            onClick={() => setSidebar(!sidebar)}
          >
            <Menu />
          </button>
          <div className="search">
            <Search size={18} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && filteredNav[0]) {
                  setPage(filteredNav[0].label);
                  setSearchQuery("");
                }
              }}
              placeholder="Search your career OS..."
            />
          </div>
          <div className="topActions">
            <button className="aiButton" onClick={() => setAssistant(true)}>
              <Sparkles size={16} /> Ask CareerOS AI
            </button>
            <button className="icon" onClick={() => setNotificationsOpen(true)}>
              <Bell size={19} />
              <i />
            </button>
            <div
              className="avatar"
              onClick={() => setPersonProfileOpen(true)}
              style={{ cursor: "pointer" }}
            >
              DV
            </div>
          </div>
        </header>
        <div className="content">
          {page === "Command Center" && (
            <Dashboard
              readiness={readiness}
              xp={xp}
              target={target}
              go={setPage}
              act={act}
            />
          )}{" "}
          {page === "Career Passport" && (
            <Passport
              act={act}
              openProfile={() => {
                setProfileOpen(true);
                act("Profile editor opened");
              }}
            />
          )}{" "}
          {page === "Skill Tree" && (
            <SkillTree selected={skill} setSelected={setSkill} act={act} />
          )}{" "}
          {page === "Career Roadmap" && <Roadmap go={setPage} act={act} />}{" "}
          {page === "Learning Hub" && <Learning act={act} />}{" "}
          {page === "Company Fit" && (
            <Radar
              target={target}
              setTarget={setTarget}
              company={company}
              setCompany={setCompany}
              act={act}
            />
          )}{" "}
          {page === "Career Network" && (
            <CareerNetwork go={setPage} act={act} />
          )}{" "}
          {page === "WorkReady" && (
            <WorkReady go={setPage} act={act} />
          )}{" "}
          {page === "Micro-Internships" && (
            <MicroInternships go={setPage} act={act} />
          )}{" "}
          {page === "Daily Mission" && (
            <Mission
              completed={completed}
              setCompleted={setCompleted}
              act={act}
            />
          )}{" "}
          {page === "Mock Arena" && <Mock act={act} />}{" "}
          {page === "Resume Intelligence" && (
            <ResumeIntelligence go={setPage} act={act} />
          )}{" "}
          {page === "Readiness Analytics" && (
            <ReadinessAnalytics readiness={readiness} go={setPage} act={act} />
          )}{" "}
          {page === "Future Scope" && <Future act={act} />}
        </div>
      </main>
      {assistant && <Ai close={() => setAssistant(false)} act={act} />}{" "}
      {profileOpen && (
        <ProfileEditor close={() => setProfileOpen(false)} act={act} />
      )}{" "}
      {settingsOpen && (
        <SettingsPanel close={() => setSettingsOpen(false)} act={act} />
      )}
      {notificationsOpen && (
        <NotificationsPanel close={() => setNotificationsOpen(false)} />
      )}
      {personProfileOpen && (
        <PersonProfilePanel close={() => setPersonProfileOpen(false)} />
      )}
      {toast && (
        <div className="toast">
          <Check size={16} />
          {toast}
        </div>
      )}
    </div>
  );
}
function Dashboard(p: any) {
  return (
    <>
      <div className="titleRow">
        <div>
          <p className="eyebrow">COMMAND CENTER</p>
          <h1>
            Good Evening, Divya <span>👋</span>
          </h1>
          <p className="muted">
            Your career is moving forward. Here’s what matters today.
          </p>
        </div>
        <Pill tone="green">
          <Zap size={14} /> 7 day streak
        </Pill>
      </div>
      <div className="dashGrid">
        <Card className="readiness">
          <p className="eyebrow">PLACEMENT READINESS</p>
          <Score value={p.readiness} />
          <b className="level">
            Placement Explorer <Pill>Level 12</Pill>
          </b>
          <div className="xp">
            <span>1,250 / 2,000 XP</span>
            <div>
              <i style={{ width: p.xp / 20 + "%" }} />
            </div>
            <small>Next: Career Strategist</small>
          </div>
        </Card>
        <Card className="next">
          <div className="cardTop">
            <Pill>
              <Sparkles size={14} /> YOUR NEXT BEST ACTION
            </Pill>
            <button className="icon">
              <ArrowUpRight size={18} />
            </button>
          </div>
          <h2>
            Master <em>Trees & Graphs</em>
          </h2>
          <p>
            Improving this skill could increase your readiness from{" "}
            {p.readiness}% to approximately{" "}
            <strong>{Math.min(100, p.readiness + 6)}%</strong>.
          </p>
          <div className="buttonRow">
            <button className="primary" onClick={() => p.go("Learning Hub")}>
              <Play size={16} /> Start learning
            </button>
            <button className="secondary" onClick={() => p.go("Skill Tree")}>
              View skill tree <ChevronRight size={16} />
            </button>
          </div>
          <div className="aiReason">
            <Brain size={17} />
            <span>
              <b>Why this now?</b> Required by 4 of your 5 selected companies.
            </span>
          </div>
        </Card>
      </div>
      <div className="insights">
        {[
          ["Best company match", p.target, "85% Fit", Target],
          ["Current learning", "Trees & Graphs", "60% Progress", BookOpen],
          ["Interview readiness", "Room to grow", "68%", Mic2],
          ["Resume match", "Strong profile", "82%", FileText],
        ].map(([a, b, c, I]: any) => (
          <Card key={a}>
            <div className="insightIcon">
              <I size={18} />
            </div>
            <p>{a}</p>
            <b>{b}</b>
            <small>{c}</small>
          </Card>
        ))}
      </div>
      <Card className="hiddenStrengthCard" style={{ background: 'linear-gradient(135deg, #1c1a38, #141724)', border: '1px solid #4a3d7d', marginTop: 14 }}>
        <div className="cardTop" style={{ marginBottom: 6 }}>
          <Pill tone="purple"><Sparkles size={14} /> NEW INSIGHT</Pill>
          <span className="pill green">High Confidence</span>
        </div>
        <h3 style={{ fontSize: 17, margin: '6px 0 4px', color: '#f0edff' }}>Feedback-Driven Execution</h3>
        <p style={{ color: '#c7cbde', fontSize: 12, margin: '0 0 10px', lineHeight: 1.45 }}>
          CareerOS discovered a strength you may be underrepresenting: You consistently improve your work by <b>28%</b> after receiving review feedback across 3 projects.
        </p>
        <button className="primary" style={{ fontSize: 11, padding: '6px 12px' }} onClick={() => p.go("Resume Intelligence")}>
          <Sparkles size={13} /> View Hidden Strength <ArrowRight size={13} />
        </button>
      </Card>
      <Card className="applicationInsightCard" style={{ background: 'linear-gradient(135deg, #201a3c, #141724)', border: '1px solid #48397a', marginTop: 14 }}>
        <div className="cardTop" style={{ marginBottom: 6 }}>
          <Pill tone="orange"><Sparkles size={14} /> APPLICATION INSIGHT</Pill>
          <span className="pill purple">18 Tracked Applications</span>
        </div>
        <h3 style={{ fontSize: 17, margin: '6px 0 4px', color: '#f0edff' }}>You received 6 responses from your last 18 applications</h3>
        <p style={{ color: '#c7cbde', fontSize: 12, margin: '0 0 10px', lineHeight: 1.45 }}>
          <b>Most common drop-off:</b> Technical screening · <b>Likely improvement:</b> Strengthen timed problem-solving & automated testing proof.
        </p>
        <button className="primary" style={{ fontSize: 11, padding: '6px 12px' }} onClick={() => p.go("Readiness Analytics")}>
          <Sparkles size={13} /> View Rejection Insights & Plan <ArrowRight size={13} />
        </button>
      </Card>
      <Card className="microRecommendationCard" style={{ background: 'linear-gradient(135deg, #221940, #141724)', border: '1px solid #4a3d7d', marginTop: 14 }}>
        <div className="cardTop" style={{ marginBottom: 8 }}>
          <Pill tone="purple"><Sparkles size={14} /> RECOMMENDED MICRO-INTERNSHIP</Pill>
          <span className="pill green">82% Match</span>
        </div>
        <h2 style={{ fontSize: 18, margin: '6px 0 4px', color: '#f0edff' }}>Build a Student Placement Analytics Dashboard</h2>
        <p style={{ color: '#c7cbde', fontSize: 12, margin: '0 0 10px' }}>
          You are an <b>82% match</b> based on your target role, Skill Tree, and completed learning modules.
        </p>
        <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#a2aabf', background: '#131520', padding: '8px 12px', borderRadius: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <div>🛠️ <b>Skills:</b> SQL · Excel · Power BI · Storytelling</div>
          <div>⏱️ <b>Duration:</b> 10 days (6–8 hrs total)</div>
          <div>💰 <b>Stipend:</b> ₹3,500 stipend</div>
          <div>🏆 <b>Outcome:</b> Employer-reviewed project & verified experience</div>
        </div>
        <div className="buttonRow" style={{ margin: 0 }}>
          <button className="primary" onClick={() => p.go("Micro-Internships")}>
            <Briefcase size={15} /> View Opportunity & Apply
          </button>
          <button className="secondary" onClick={() => p.go("Skill Tree")}>
            Improve Match in Skill Tree <ChevronRight size={15} />
          </button>
        </div>
      </Card>
      <Card className="missionPreview">
        <div>
          <p className="eyebrow">TODAY’S MISSION</p>
          <h2>Build confidence in Trees</h2>
          <p className="muted">4 focused actions · 1 hr 2 min total</p>
        </div>
        <div className="missionSteps">
          {[
            "Learn Binary Trees",
            "Solve 3 Tree Problems",
            "Quick Assessment",
            "Explain BST",
          ].map((x, i) => (
            <div key={x}>
              <span className={i === 0 ? "done" : i === 1 ? "current" : ""}>
                {i < 1 ? <Check size={14} /> : `0${i + 1}`}
              </span>
              {x}
              <small>{[20, 30, 10, 2][i]} min</small>
            </div>
          ))}
        </div>
        <button className="primary" onClick={() => p.go("Daily Mission")}>
          Start today’s mission
        </button>
      </Card>
    </>
  );
}
function Passport({ act, openProfile }: any) {
  const skills = [
    ["Python", 85, "Advanced"],
    ["DSA", 65, "Intermediate"],
    ["DBMS", 60, "Intermediate"],
    ["Operating Systems", 35, "Beginner"],
    ["Communication", 72, "Intermediate"],
  ];
  return (
    <>
      <div className="titleRow">
        <div>
          <p className="eyebrow">AI CAREER PASSPORT</p>
          <h1>Your unified professional profile</h1>
          <p className="muted">
            Evidence-based signals that shape your career path.
          </p>
        </div>
        <button
          className="secondary"
          onClick={() => {
            openProfile();
            act("Profile editor opened");
          }}
        >
          Edit profile
        </button>
      </div>
      <Card className="passportHero">
        <div className="avatar huge">AJ</div>
        <div>
          <h2>
            Alex Johnson <Pill tone="green">Verified profile</Pill>
          </h2>
          <p>Computer Science Student · Bengaluru, India</p>
          <div className="tags">
            <Pill>Target: Software Engineer</Pill>
            <Pill tone="orange">Intermediate preparation</Pill>
          </div>
        </div>
        <div className="passportStats">
          <span>
            <b>12</b> Projects
          </span>
          <span>
            <b>185</b> Problems solved
          </span>
          <span>
            <b>7.8</b> Profile strength
          </span>
        </div>
      </Card>
      <div className="twoCol">
        <Card>
          <h3>
            Skills <small>Live confidence indicators</small>
          </h3>
          {skills.map(([name, value, level]: any) => (
            <div className="skillbar" key={name}>
              <div>
                <b>{name}</b>
                <span>
                  {level} · {value}%
                </span>
              </div>
              <div>
                <i style={{ width: value + "%" }} />
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <h3>Connected profiles</h3>
          {[
            ["GitHub", "12 repositories", "Connected"],
            ["LeetCode", "185 problems solved", "Connected"],
            ["LinkedIn", "Profile completed", "Connected"],
          ].map((x) => (
            <div className="connection" key={x[0]}>
              <div className="connectionIcon">{x[0][0]}</div>
              <span>
                <b>{x[0]}</b>
                <small>{x[1]}</small>
              </span>
              <Pill tone="green">{x[2]}</Pill>
            </div>
          ))}
        </Card>
      </div>
      <h2 className="sectionTitle">Featured projects</h2>
      <div className="projectGrid">
        {[
          [
            "AI Career Platform",
            "React · Node.js · OpenAI",
            "A guided career preparation platform built for students.",
          ],
          [
            "Smart Attendance System",
            "Python · Computer Vision",
            "Face recognition attendance with real-time reporting.",
          ],
        ].map((x) => (
          <Card key={x[0]}>
            <Code2 className="purple" />
            <h3>{x[0]}</h3>
            <p>{x[2]}</p>
            <div className="tags">
              <Pill>{x[1]}</Pill>
            </div>
            <button
              className="textBtn"
              onClick={() => act("Project details loaded")}
            >
              View project <ArrowUpRight size={15} />
            </button>
          </Card>
        ))}
      </div>
    </>
  );
}
function SkillTree({ selected, setSelected, act }: any) {
  const nodes = [
    ["Python", 85, "mastered", "prog"],
    ["Java", 55, "progress", "prog"],
    ["C++", 20, "gap", "prog"],
    ["Arrays", 90, "mastered", "dsa"],
    ["Linked Lists", 82, "mastered", "dsa"],
    ["Trees", 60, "progress", "dsa"],
    ["Graphs", 20, "locked", "dsa"],
    ["DBMS", 60, "progress", "core"],
    ["Operating Systems", 35, "gap", "core"],
    ["Networks", 30, "gap", "core"],
    ["Frontend", 75, "mastered", "dev"],
    ["Backend", 62, "progress", "dev"],
    ["Git", 78, "mastered", "dev"],
    ["Communication", 72, "progress", "pro"],
    ["Interview Skills", 58, "progress", "pro"],
  ];
  return (
    <>
      <div className="titleRow">
        <div>
          <p className="eyebrow">SKILL CONSTELLATION</p>
          <h1>Engineer skill tree</h1>
          <p className="muted">
            Your role is the root. Every skill creates a stronger career signal.
          </p>
        </div>
        <div className="legend">
          <Pill tone="green">Mastered</Pill>
          <Pill tone="orange">In progress</Pill>
          <Pill tone="red">Gap</Pill>
        </div>
      </div>
      <div className="treeLayout">
        <Card className="tree">
          <div className="treeCore">
            <span>ROLE ROOT</span>
            <b>
              Software
              <br />
              Engineer
            </b>
          </div>
          {["prog", "dsa", "core", "dev", "pro"].map((branch, i) => (
            <div className={"branch b" + i} key={branch}>
              {nodes
                .filter((n) => n[3] === branch)
                .map((n: any) => (
                  <button
                    className={"node " + n[2]}
                    onClick={() =>
                      setSelected({ name: n[0], value: n[1], status: n[2] })
                    }
                    key={n[0]}
                  >
                    {n[2] === "locked" ? (
                      <Lock size={15} />
                    ) : (
                      <>
                        <b>{n[1]}%</b>
                      </>
                    )}
                    <small>{n[0]}</small>
                  </button>
                ))}
            </div>
          ))}
        </Card>
        <Card className="detail">
          <Pill>{selected ? "SKILL INTELLIGENCE" : "SELECT A NODE"}</Pill>
          {selected ? (
            <>
              <h2>{selected.name}</h2>
              <div className="detailScore">
                {selected.value}%{" "}
                <span>
                  {selected.status === "gap"
                    ? "Skill gap"
                    : selected.status === "progress"
                      ? "In progress"
                      : "Mastered"}
                </span>
              </div>
              <p>
                Required for your target software engineering roles and relevant
                to 4 of your 5 selected companies.
              </p>
              <h4>Recommended mission</h4>
              <ul>
                <li>Learn the key concepts</li>
                <li>Solve 5 practice problems</li>
                <li>Take a mini assessment</li>
              </ul>
              <div className="reward">
                <Trophy size={18} />
                <span>
                  Complete assessment <b>+150 XP</b>
                </span>
              </div>
              <button
                className="primary full"
                onClick={() => act(`${selected.name} mission started`, 150)}
              >
                Start skill mission
              </button>
            </>
          ) : (
            <>
              <h2>Map your potential</h2>
              <p>
                Click any skill node to see why it matters, its company
                relevance, and the fastest route to improving it.
              </p>
              <div className="detailArt">
                <GitBranch size={54} />
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
}
function Roadmap({ go, act }: any) {
  const stages = [
    ["Programming Fundamentals", "100", "done"],
    ["DSA Foundations", "100", "done"],
    ["Trees & Graphs", "60", "current"],
    ["Core CS Fundamentals", "35", "next"],
    ["Projects & Portfolio", "50", "next"],
    ["Interview Preparation", "20", "locked"],
    ["Placement Ready", "0", "locked"],
  ];
  const [open, setOpen] = useState(2);
  return (
    <>
      <div className="titleRow">
        <div>
          <p className="eyebrow">AI CAREER ROADMAP</p>
          <h1>Your route to placement ready</h1>
          <p className="muted">
            A living plan that updates as your capability grows.
          </p>
        </div>
      </div>
      <div className="roadmap">
        {stages.map(([name, val, status], i) => (
          <div className={"roadStage " + status} key={name}>
            <button className="roadDot" onClick={() => setOpen(i)}>
              {status === "done" ? <Check /> : i + 1}
            </button>
            <Card>
              <div className="roadHead">
                <div>
                  <Pill
                    tone={
                      status === "done"
                        ? "green"
                        : status === "current"
                          ? "orange"
                          : "purple"
                    }
                  >
                    {status === "current"
                      ? "CURRENT STAGE"
                      : status === "done"
                        ? "COMPLETE"
                        : "UP NEXT"}
                  </Pill>
                  <h2>{name}</h2>
                </div>
                <b>{val}%</b>
              </div>
              <div className="progress">
                <i style={{ width: val + "%" }} />
              </div>
              {open === i && (
                <div className="roadExpand">
                  <p>
                    {status === "current"
                      ? "Arrays, Linked Lists and Stacks are complete. Trees is your current focus; Graphs unlock at 70%."
                      : "Strengthen the foundations that move your readiness forward."}
                  </p>
                  <span>
                    Estimated time:{" "}
                    {status === "current" ? "2–3 weeks" : "2 weeks"}
                  </span>
                  <button
                    className="primary"
                    onClick={() =>
                      status === "current"
                        ? go("Learning Hub")
                        : act("Stage added to your plan")
                    }
                  >
                    {status === "current" ? "Continue journey" : "Add to plan"}
                  </button>
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
      <Card className="insightBanner">
        <Sparkles />
        <div>
          <b>AI insight</b>
          <p>
            Completing Trees & Graphs can improve your placement readiness by
            approximately 6%.
          </p>
        </div>
      </Card>
    </>
  );
}
function Learning({ act }: any) {
  const resources = [
    [
      "Video course",
      "Binary Trees Fundamentals",
      "45 min",
      "Start learning",
      "https://www.youtube.com/results?search_query=binary+tree+data+structure+for+beginners",
    ],
    [
      "Article",
      "Tree Traversal Explained",
      "15 min",
      "Read",
      "https://www.youtube.com/results?search_query=tree+traversal+explained",
    ],
    [
      "Documentation",
      "Tree Data Structures",
      "20 min",
      "Explore",
      "https://www.youtube.com/results?search_query=tree+data+structure+youtube",
    ],
  ];
  const assessmentQuestions = [
    {
      question:
        "What is the maximum number of nodes in a binary tree of height h?",
      answer: "2^(h+1)-1",
    },
    {
      question:
        "Which traversal visits the left subtree, then the root, then the right subtree?",
      answer: "In-order",
    },
    {
      question: "A binary tree node can have at most how many children?",
      answer: "2",
    },
    {
      question:
        "What is the time complexity of a DFS traversal on a binary tree with n nodes?",
      answer: "O(n)",
    },
  ];
  const challengeDetails: any = {
    "Invert Binary Tree":
      "Given the root of a binary tree, invert it and return the root of the inverted tree. You must swap left and right children recursively or iteratively.",
    "Binary Tree Level Order Traversal":
      "Return the level-order traversal of a binary tree from top to bottom, left to right. Use a queue to process each node layer by layer.",
    "Serialize and Deserialize Binary Tree":
      "Design an algorithm to serialize a binary tree into a string and deserialize it back into the original structure. Preserve structure and null markers.",
  };
  const challenges = [
    ["Easy", "Invert Binary Tree", "+40 XP"],
    ["Medium", "Binary Tree Level Order Traversal", "+75 XP"],
    ["Hard", "Serialize and Deserialize Binary Tree", "+120 XP"],
  ];
  const [showAssessment, setShowAssessment] = useState(false);
  const [answers, setAnswers] = useState<string[]>(
    Array(assessmentQuestions.length).fill(""),
  );
  const [submitted, setSubmitted] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(
    null,
  );
  const openResource = (title: string, url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    act(`${title} opened in YouTube`);
  };
  const onAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    if (submitted) setSubmitted(false);
  };
  const score = answers.filter(
    (answer, index) =>
      answer.trim().toLowerCase() ===
      assessmentQuestions[index].answer.toLowerCase(),
  ).length;
  const startChallenge = (challengeName: string) => {
    setSelectedChallenge(challengeName);
    act(`${challengeName} started`, 80);
  };
  return (
    <>
      <div className="titleRow">
        <div>
          <p className="eyebrow">LEARNING HUB</p>
          <h1>Turn knowledge into confidence</h1>
          <p className="muted">
            Your current topic: <b>Trees</b>
          </p>
        </div>
        <Pill tone="orange">60% topic progress</Pill>
      </div>
      <div className="flow">
        <b>LEARN</b>
        <ChevronRight />
        <b>PRACTICE</b>
        <ChevronRight />
        <b>ASSESS</b>
        <ChevronRight />
        <b>INTERVIEW</b>
      </div>
      <h2 className="sectionTitle">Learn</h2>
      <div className="resourceGrid">
        {resources.map((r, i) => (
          <Card key={r[1]}>
            <div className="resourceIcon">
              {i === 0 ? "▶" : i === 1 ? "✦" : "▤"}
            </div>
            <Pill>{r[0]}</Pill>
            <h3>{r[1]}</h3>
            <p>{r[2]} · Beginner-friendly</p>
            <button
              className="secondary full"
              onClick={() => openResource(r[1], r[4])}
            >
              {r[3]}
            </button>
          </Card>
        ))}
      </div>
      <div className="twoCol">
        <Card>
          <h2>Practice challenges</h2>
          {challenges.map((x: any) => (
            <div className="challenge" key={x[1]}>
              <Pill
                tone={
                  x[0] === "Easy"
                    ? "green"
                    : x[0] === "Medium"
                      ? "orange"
                      : "red"
                }
              >
                {x[0]}
              </Pill>
              <b>{x[1]}</b>
              <span>{x[2]}</span>
              <button
                className="icon"
                onClick={() => {
                  setSelectedChallenge(x[1]);
                  act(`${x[1]} challenge opened`);
                }}
              >
                <ChevronRight />
              </button>
            </div>
          ))}
        </Card>
        {selectedChallenge && (
          <Card className="assessment">
            <Pill>CHALLENGE</Pill>
            <h2>{selectedChallenge}</h2>
            <p>{challengeDetails[selectedChallenge]}</p>
            <button
              className="primary full"
              onClick={() => startChallenge(selectedChallenge)}
            >
              Start challenge
            </button>
          </Card>
        )}
        <Card className="assessment">
          <Pill>ASSESS</Pill>
          <h2>Quick assessment</h2>
          <p>10 questions · 10 minutes · unlock Graphs at 70%</p>
          {!showAssessment ? (
            <button
              className="primary full"
              onClick={() => {
                setShowAssessment(true);
                act("Assessment started", 100);
              }}
            >
              Take assessment
            </button>
          ) : (
            <div className="assessmentQuestions">
              {assessmentQuestions.map((item, index) => (
                <label className="profileField" key={item.question}>
                  <span>
                    {index + 1}. {item.question}
                  </span>
                  <input
                    value={answers[index]}
                    onChange={(e) => onAnswerChange(index, e.target.value)}
                    placeholder="Type your answer"
                  />
                </label>
              ))}
              <button
                className="primary full"
                onClick={() => {
                  setSubmitted(true);
                  act("Assessment completed", 120);
                }}
              >
                Submit answers
              </button>
              {submitted && (
                <div className="assessmentResult">
                  <b>
                    Score: {score}/{assessmentQuestions.length}
                  </b>
                  <p>
                    {score >= 3
                      ? "Nice work — your tree fundamentals are strong."
                      : "A quick review on binary trees will help you improve."}
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="interviewPrompt">
            <Mic2 />
            <span>
              <b>Interview challenge</b> Explain the difference between a Binary
              Tree and BST.
            </span>
          </div>
        </Card>
      </div>
    </>
  );
}
function Radar({ target, setTarget, company, setCompany, act }: any) {
  const companies = [
    ["Nexa Systems", 85, "best"],
    ["Veridian", 76, "stretch"],
    ["Kairo Labs", 62, "stretch"],
    ["Orbital", 45, "future"],
  ];
  const planByCompany: any = {
    "Nexa Systems": [
      "Week 1: Revise tree basics and traversals",
      "Week 2: Solve 5 binary tree coding problems",
      "Week 3: Practice OS fundamentals and SQL basics",
      "Week 4: Mock interview + resume alignment",
    ],
    Veridian: [
      "Week 1: Strengthen tree and graph fundamentals",
      "Week 2: Solve medium DSA problems and explain solutions clearly",
      "Week 3: Improve DBMS and System Design basics",
      "Week 4: Targeted mock interview and company-specific prep",
    ],
    "Kairo Labs": [
      "Week 1: Work on data structures and complexity analysis",
      "Week 2: Complete tree and hashmap practice sets",
      "Week 3: Focus on communication and project explanations",
      "Week 4: Fine-tune resume and interview storytelling",
    ],
    Orbital: [
      "Week 1: Build core CS confidence and data structure basics",
      "Week 2: Practice coding interviews and project walkthroughs",
      "Week 3: Improve SQL and networking fundamentals",
      "Week 4: Prepare for future-fit role conversations",
    ],
  };
  const [plan, setPlan] = useState<string[]>([]);
  const generatePlan = () => {
    setPlan(planByCompany[company] || planByCompany["Nexa Systems"]);
    act("Preparation plan generated");
  };
  return (
    <>
      <div className="titleRow">
        <div>
          <p className="eyebrow">COMPANY FIT & OPPORTUNITY RADAR</p>
          <h1>Your opportunity radar</h1>
          <p className="muted">
            AI-ranked opportunities based on your skills and preparation.
          </p>
        </div>
        <Pill tone="orange">
          <Target size={14} /> Active target: {target}
        </Pill>
      </div>
      <div className="radarLayout">
        <Card className="radar">
          <div className="ring r1">
            <span>BEST FIT</span>
          </div>
          <div className="ring r2">
            <span>STRETCH OPPORTUNITIES</span>
          </div>
          <div className="ring r3">
            <span>FUTURE TARGETS</span>
          </div>
          {companies.map((x: any, i) => (
            <button
              key={x[0]}
              onClick={() => setCompany(x[0])}
              className={"company c" + i + (company === x[0] ? " picked" : "")}
            >
              <b>{x[0]}</b>
              <small>{x[1]}% fit</small>
            </button>
          ))}
        </Card>
        <Card className="companyPanel">
          <Pill>COMPANY INTELLIGENCE</Pill>
          <h2>{company}</h2>
          <div className="companyScores">
            <div>
              <b>{companies.find((x) => x[0] === company)?.[1]}%</b>
              <span>Overall fit</span>
            </div>
            <div>
              <b>78%</b>
              <span>Readiness</span>
            </div>
            <div>
              <b>4–6</b>
              <span>Weeks prep</span>
            </div>
          </div>
          <h4>Skills you have</h4>
          <p className="checks">
            <Check /> Python <Check /> Basic DSA <Check /> Git <Check />{" "}
            Projects
          </p>
          <h4>Focus areas</h4>
          <p className="warn">
            ⚠ Trees & Graphs <br />✕ Operating Systems · System Design
          </p>
          <div className="aiReason">
            <Sparkles />
            <span>
              Focus on Trees, Operating Systems and SQL for a significant
              preparation lift.
            </span>
          </div>
          <button
            className="primary full"
            onClick={() => {
              setTarget(company);
              act(`${company} is now your active target`);
            }}
          >
            Make this my target
          </button>
          <button className="textBtn" onClick={generatePlan}>
            Generate preparation plan <ChevronRight size={15} />
          </button>
          {plan.length > 0 && (
            <div
              className="planCard"
              style={{
                marginTop: 16,
                padding: 12,
                borderRadius: 12,
                background: "rgba(139,124,255,0.08)",
                border: "1px solid rgba(139,124,255,0.2)",
              }}
            >
              <b style={{ display: "block", marginBottom: 8 }}>
                Preparation plan for {company}
              </b>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  display: "grid",
                  gap: 8,
                  color: "#edf0f8",
                }}
              >
                {plan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
function Mission({ completed, setCompleted, act }: any) {
  const [mood, setMood] = useState("Focused");
  const tasks = [
    ["LEARN", "Binary Trees", "20 min"],
    ["PRACTICE", "Solve 3 Tree Problems", "30 min"],
    ["ASSESS", "Tree Assessment", "10 min"],
    ["INTERVIEW", "Explain Binary Search Trees", "2 min"],
  ];
  return (
    <>
      <div className="titleRow">
        <div>
          <p className="eyebrow">ADAPTIVE DAILY MISSION</p>
          <h1>Today’s career mission</h1>
          <p className="muted">
            A focused plan that flexes around your performance.
          </p>
        </div>
        <Pill tone="orange">{completed} / 4 completed</Pill>
      </div>
      <div className="missionLayout">
        <Card>
          <div className="missionTimeline">
            {tasks.map((t, i) => (
              <div
                className={
                  "timelineItem " +
                  (i < completed
                    ? "done"
                    : i === completed
                      ? "current"
                      : "locked")
                }
                key={t[1]}
              >
                <span>{i < completed ? <Check /> : i + 1}</span>
                <div>
                  <Pill
                    tone={
                      i < completed
                        ? "green"
                        : i === completed
                          ? "orange"
                          : "purple"
                    }
                  >
                    {t[0]}
                  </Pill>
                  <h3>{t[1]}</h3>
                  <p>
                    {t[2]} ·{" "}
                    {i < completed
                      ? "Completed"
                      : i === completed
                        ? "Current focus"
                        : "Unlock after practice"}
                  </p>
                  {i === completed && (
                    <button
                      className="primary"
                      onClick={() => {
                        setCompleted(Math.min(4, completed + 1));
                        act("Mission step completed", 80);
                      }}
                    >
                      Complete step <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <div>
          <Card className="adapt">
            <Pill>
              <Sparkles size={14} /> AI PLAN UPDATE
            </Pill>
            <h2>Your plan adapted</h2>
            <p>
              Your Tree assessment performance was below average. Tomorrow we’ll
              add 20 minutes of revision and 3 Easy/Medium problems.
            </p>
          </Card>
          <Card className="wellbeing">
            <Heart />
            <h3>How are you feeling?</h3>
            <div>
              {["Focused", "Okay", "Stressed"].map((x) => (
                <button
                  className={mood === x ? "selected" : ""}
                  onClick={() => {
                    setMood(x);
                    if (x === "Stressed")
                      act(
                        "We've reduced today's workload to your top priority",
                      );
                  }}
                  key={x}
                >
                  {x === "Focused" ? "😊" : x === "Okay" ? "😐" : "😫"} {x}
                </button>
              ))}
            </div>
            <p>
              {mood === "Stressed"
                ? "We'll reduce today’s workload and focus on your highest-priority task."
                : "Your plan is calibrated for strong momentum."}
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
function Mock({ act }: any) {
  const [mode, setMode] = useState("Technical Interview");
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [generatingQuestion, setGeneratingQuestion] = useState(false);
  const [customQuestion, setCustomQuestion] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);
  const [history, setHistory] = useState<{ attempt: number; score: number }[]>([
    { attempt: 1, score: 62 },
    { attempt: 2, score: 74 },
  ]);

  const modes = [
    "Technical Interview",
    "HR Interview",
    "Core CS",
    "Project Defense",
    "Target Company",
    "Communication",
  ];

  const defaultQuestions: Record<string, string> = {
    "Technical Interview": "Explain the difference between a process and a thread.",
    "HR Interview": "Tell me about a time you handled a difficult team disagreement.",
    "Core CS": "What happens when you type a URL into a browser?",
    "Project Defense": "What was the most important technical trade-off in your project?",
    "Target Company": "Why do you want to work at Nexa Systems?",
    Communication: "Explain binary search to a non-technical person.",
  };

  const currentQuestion = customQuestion || defaultQuestions[mode] || defaultQuestions["Technical Interview"];

  const generateNewQuestion = async () => {
    setGeneratingQuestion(true);
    setAnswer("");
    setEvaluation(null);
    try {
      const res = await careerApi.generateInterviewQuestion({ type: mode });
      setCustomQuestion(res.question);
      act(`New AI question generated (${res.provider === "gemini" ? "Gemini LLM" : "Mock"})`);
    } catch {
      act("Using standard question catalog");
    } finally {
      setGeneratingQuestion(false);
    }
  };

  const submit = async () => {
    if (!answer.trim() || evaluating) return;
    setEvaluating(true);
    try {
      const result = await careerApi.evaluateInterview({
        type: mode,
        question: currentQuestion,
        answer: answer.trim(),
      });
      setEvaluation(result);
      setHistory((prev) => [...prev, { attempt: prev.length + 1, score: result.score }]);
      act(`AI evaluation completed (${result.score}/100)`, 60);
    } catch (err: any) {
      act("AI evaluation failed, please try again");
    } finally {
      setEvaluating(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      act("Voice recognition not supported in this browser");
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;
      act("Voice listening... Speak your answer now");
      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript));
        act("Voice captured!");
      };
      recognition.onerror = () => {
        act("Voice input cancelled");
      };
      recognition.start();
    } catch {
      act("Microphone unavailable");
    }
  };

  return (
    <>
      <div className="titleRow">
        <div>
          <p className="eyebrow">AI MOCK ARENA</p>
          <h1>Practice under pressure</h1>
          <p className="muted">
            Realistic coaching powered by Gemini LLM. Actionable feedback. Measurable improvement.
          </p>
        </div>
      </div>
      <div className="modes">
        {modes.map((m, i) => (
          <button
            className={mode === m ? "modeSelected" : ""}
            onClick={() => {
              setMode(m);
              setStarted(false);
              setAnswer("");
              setCustomQuestion(null);
              setEvaluation(null);
            }}
            key={m}
          >
            <span>{["💻", "👔", "🧠", "📂", "🎯", "🗣"][i]}</span>
            <b>{m}</b>
          </button>
        ))}
      </div>
      <Card className="interview">
        <div className="interviewer">
          <div className="aiFace">
            <Sparkles />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <Pill>
                <Bot size={12} style={{ marginRight: 4 }} /> AI INTERVIEWER
              </Pill>
              {started && (
                <button
                  className="secondary"
                  onClick={generateNewQuestion}
                  disabled={generatingQuestion}
                  style={{ fontSize: 11, padding: "4px 10px", height: "auto" }}
                >
                  <RefreshCw size={12} className={generatingQuestion ? "aiSpin" : ""} />
                  {generatingQuestion ? "Generating..." : "New Question"}
                </button>
              )}
            </div>
            <h2>
              {started ? currentQuestion : "Choose a mode to enter the arena"}
            </h2>
            <p>
              {started
                ? "Take a moment. We’re listening for your reasoning, trade-offs, and clarity."
                : "Your adaptive interviewer will select questions based on your career plan."}
            </p>
          </div>
        </div>
        {started ? (
          <div className="answerArea">
            <button
              className="secondary"
              onClick={handleVoiceInput}
            >
              <Mic2 size={16} /> Answer by voice
            </button>
            <textarea
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setEvaluation(null);
              }}
              placeholder="Or type your answer here… (Explain your reasoning, architectural choices, and complexity trade-offs)"
              disabled={evaluating}
            />
            <button
              className="primary"
              onClick={submit}
              disabled={!answer.trim() || evaluating}
            >
              {evaluating ? (
                <>
                  <RefreshCw size={14} className="aiSpin" /> Evaluating...
                </>
              ) : (
                <>
                  Submit answer <Send size={15} />
                </>
              )}
            </button>
          </div>
        ) : (
          <button className="primary" onClick={() => setStarted(true)}>
            Begin {mode} <Play size={16} />
          </button>
        )}
      </Card>

      {evaluation && (
        <Card className="aiReport">
          <div className="cardTop">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Pill>
                <Sparkles size={14} /> AI FEEDBACK REPORT
              </Pill>
              <span className={`aiBadge ${evaluation.provider === "gemini" ? "active" : "mock"}`}>
                {evaluation.provider === "gemini" ? "Evaluated by Gemini LLM" : "Smart Mock Feedback"}
              </span>
            </div>
            <b>{evaluation.score} / 100</b>
          </div>

          <div className="scoreBreakdown">
            <div className="scoreTag">
              <span>Technical Depth</span>
              <b>{evaluation.technicalScore}/10</b>
            </div>
            <div className="scoreTag">
              <span>Communication</span>
              <b>{evaluation.communicationScore}/10</b>
            </div>
            <div className="scoreTag">
              <span>Clarity</span>
              <b>{evaluation.clarityScore}/10</b>
            </div>
            <div className="scoreTag">
              <span>Structure & Trade-offs</span>
              <b>{evaluation.structureScore}/10</b>
            </div>
          </div>

          <h2>{evaluation.score >= 80 ? "Outstanding answer!" : evaluation.score >= 65 ? "Good foundation!" : "Keep practicing!"}</h2>
          <p>{evaluation.feedback}</p>

          <div className="reportGrid">
            <div>
              <h4>Strengths</h4>
              <div className="checks" style={{ display: "grid", gap: 6 }}>
                {evaluation.strengths.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                    <Check size={14} color="#75d7a0" /> {s}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4>Improve next</h4>
              <div className="warn" style={{ display: "grid", gap: 6 }}>
                {evaluation.improvements.map((imp, i) => (
                  <div key={i} style={{ fontSize: 12, lineHeight: 1.4 }}>
                    • {imp}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {evaluation.idealAnswer && (
            <div className="idealAnswerBox">
              <h4>Exemplary Model Answer</h4>
              <p>"{evaluation.idealAnswer}"</p>
            </div>
          )}

          <div className="aiReason" style={{ marginTop: 14 }}>
            <Brain size={17} />
            <span>
              <b>Next practice:</b> Give a structured answer using Context → Action → Trade-off → Result.
            </span>
          </div>
        </Card>
      )}

      <div className="twoCol">
        <Card>
          <h3>Improvement curve</h3>
          <div className="chart">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={history.map((h) => ({ v: h.score }))}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="#9d8cff"
                  strokeWidth={3}
                />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h3>Attempt history</h3>
          {history.map((h, i) => (
            <div className="attempt" key={i}>
              <span>
                {i === history.length - 1 ? <Play size={14} /> : <Check size={14} />}
              </span>
              Attempt {h.attempt} · {h.score}% {i === history.length - 1 && "· Current"}
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}
function Resume({ act }: any) {
  const [company, setCompany] = useState("");
  const [companyPromptOpen, setCompanyPromptOpen] = useState(false);
  const [companyInput, setCompanyInput] = useState("");
  const [isTailoring, setIsTailoring] = useState(false);
  const [tailorExplanation, setTailorExplanation] = useState<string | null>(null);
  const [aiProvider, setAiProvider] = useState<"gemini" | "mock">("mock");
  const [resumeMode, setResumeMode] = useState<
    "general" | "improve" | "concise" | "keywords" | "quantify" | "company"
  >("general");

  const [experienceOne, setExperienceOne] = useState(
    "Built an AI-powered placement preparation platform using React, Node.js and intelligent study paths.",
  );
  const [experienceTwo, setExperienceTwo] = useState(
    "Developed a computer vision system to automate attendance tracking and real-time reporting.",
  );
  const [skillsText, setSkillsText] = useState("Python · React · Node.js · SQL · Git · Data Structures");
  const [missingText, setMissingText] = useState("⚠ SQL · REST APIs · Docker");
  const [metrics, setMetrics] = useState({
    jobMatch: 82,
    atsScore: 88,
    keywordCoverage: 74,
  });

  const tailored = company.length > 0;

  const submitCompany = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = companyInput.trim();
    if (!name) return;
    setCompany(name);
    setResumeMode("company");
    setCompanyPromptOpen(false);
    setIsTailoring(true);

    try {
      const res = await careerApi.tailorResumeBullet({
        bulletText: experienceOne,
        action: "company",
        targetCompany: name,
      });
      setExperienceOne(res.rewrittenText);
      setTailorExplanation(res.explanation);
      setAiProvider(res.provider);
      setSkillsText(`Python · React · Node.js · SQL · REST APIs · Docker · ${name} fit`);
      setMissingText(`✓ Aligned to ${name} engineering stack`);
      act(`Resume tailored for ${name} using ${res.provider === "gemini" ? "Gemini LLM" : "Mock AI"}`, 50);
    } catch {
      act(`Resume tailored for ${name}`, 50);
    } finally {
      setIsTailoring(false);
    }
  };

  const handleAction = async (action: string) => {
    if (action === "Tailor for target company") {
      setCompanyPromptOpen(true);
      return;
    }
    const modeMap: Record<string, "improve" | "concise" | "keywords" | "quantify" | "company"> = {
      "Improve bullet point": "improve",
      "Make more concise": "concise",
      "Add relevant keywords": "keywords",
      "Quantify impact": "quantify",
    };

    const targetAction = modeMap[action] || "improve";
    setResumeMode(targetAction);
    setIsTailoring(true);

    try {
      const res = await careerApi.tailorResumeBullet({
        bulletText: experienceOne,
        action: targetAction,
        targetCompany: company || undefined,
      });
      setExperienceOne(res.rewrittenText);
      setTailorExplanation(res.explanation);
      setAiProvider(res.provider);

      if (targetAction === "keywords") {
        setSkillsText("Python · React · Node.js · SQL · REST APIs · Docker · Git · Data Structures");
        setMissingText("✓ Added relevant keywords for backend and fullstack roles");
      } else if (targetAction === "quantify") {
        setMissingText("✓ Quantified impact with performance metrics");
      }

      act(`${action} generated by ${res.provider === "gemini" ? "Gemini LLM" : "AI"}`, 20);
    } catch {
      act(`${action} applied to your resume`, 20);
    } finally {
      setIsTailoring(false);
    }
  };

  const generateTargetedResume = async () => {
    setIsTailoring(true);
    try {
      const analysis = await careerApi.analyzeResume({
        resumeContent: `${experienceOne}\n${experienceTwo}\n${skillsText}`,
        companyName: company || "TechNova",
      });
      setMetrics({
        jobMatch: analysis.jobMatchScore,
        atsScore: analysis.atsScore,
        keywordCoverage: analysis.keywordScore,
      });
      setAiProvider(analysis.provider);
      act(`Targeted resume analyzed (${analysis.atsScore}% ATS score)`, 50);
    } catch {
      act("Targeted resume generated", 50);
    } finally {
      setIsTailoring(false);
    }
  };

  const versionPills = [
    { label: "General Resume", mode: "general" },
    { label: "Software Engineer Resume", mode: "improve" },
    {
      label: tailored ? `${company} Resume` : "Company Resume",
      mode: tailored ? "company" : "general",
    },
  ];

  return (
    <>
      <div className="titleRow">
        <div>
          <p className="eyebrow">RESUME INTELLIGENCE</p>
          <h1>Turn your experience into signal</h1>
          <p className="muted">A precise, role-aware review of your resume powered by Gemini LLM.</p>
        </div>
        <button
          className="primary"
          onClick={generateTargetedResume}
          disabled={isTailoring}
        >
          {isTailoring ? <RefreshCw size={14} className="aiSpin" /> : <Sparkles size={14} />}
          {isTailoring ? "Analyzing..." : "Generate targeted resume"}
        </button>
      </div>
      <div className="resumeLayout">
        <Card className="resumePaper">
          <div className="resumeName">ALEX JOHNSON</div>
          <p>
            Software Engineer Candidate
            {tailored && <> · Tailored for {company}</>}
          </p>
          <hr />
          <b>EXPERIENCE</b>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
            <h4 style={{ margin: 0 }}>AI Career Platform</h4>
            {tailorExplanation && (
              <span className={`aiBadge ${aiProvider === "gemini" ? "active" : "mock"}`} style={{ fontSize: 9 }}>
                {aiProvider === "gemini" ? "Gemini Rewritten" : "AI Mode"}
              </span>
            )}
          </div>
          <p style={{ marginTop: 4 }}>{experienceOne}</p>
          {tailorExplanation && (
            <small style={{ display: "block", color: "#695ea3", fontStyle: "italic", marginBottom: 8 }}>
              💡 {tailorExplanation}
            </small>
          )}
          <h4>Smart Attendance System</h4>
          <p>{experienceTwo}</p>
          <hr />
          <b>SKILLS</b>
          <p>{skillsText}</p>
          {tailored && (
            <>
              <hr />
              <b>TARGET COMPANY</b>
              <p>{company}</p>
            </>
          )}
        </Card>
        <div>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Pill>
                <Sparkles size={14} /> AI RESUME INTELLIGENCE
              </Pill>
              <span className={`aiBadge ${aiProvider === "gemini" ? "active" : "mock"}`}>
                {aiProvider === "gemini" ? "Gemini 2.5 Flash" : "Smart Mock"}
              </span>
            </div>
            <div className="resumeMetrics">
              {[
                [`${metrics.jobMatch}%`, "Job Match"],
                [`${metrics.atsScore}%`, "ATS Compatibility"],
                [`${metrics.keywordCoverage}%`, "Keyword Coverage"],
              ].map((x) => (
                <div key={x[1]}>
                  <b>{x[0]}</b>
                  <span>{x[1]}</span>
                </div>
              ))}
            </div>
            <h4>Strengths</h4>
            <p className="checks">
              <Check size={14} /> Python <Check size={14} /> Full-stack projects <Check size={14} /> GitHub activity
            </p>
            <h4>Missing keywords</h4>
            <p className="warn">
              {missingText}
            </p>
          </Card>
          <Card>
            <h3>AI actions</h3>
            {[
              "Improve bullet point",
              "Make more concise",
              "Add relevant keywords",
              "Quantify impact",
              "Tailor for target company",
            ].map((x) => (
              <button
                className="actionButton"
                onClick={() => handleAction(x)}
                key={x}
                disabled={isTailoring}
              >
                <span>{x}</span>
                <ChevronRight size={16} />
              </button>
            ))}
          </Card>
          <div className="resumeVersions">
            {versionPills.map(({ label, mode }) => (
              <button
                key={label}
                className={"pill " + (resumeMode === mode ? "purple" : "")}
                style={{
                  background: resumeMode === mode ? "#302b55" : "transparent",
                  borderRadius: 20,
                  padding: "4px 8px",
                  border: "1px solid #454071",
                  color: resumeMode === mode ? "#c8c0ff" : "#c8c0ff",
                  marginRight: 8,
                  marginBottom: 8,
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (mode === "company" && !tailored) {
                    setCompanyPromptOpen(true);
                    return;
                  }
                  setResumeMode(mode as any);
                  act(`${label} opened`, 20);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {companyPromptOpen && (
        <div
          className="profileModalOverlay"
          onClick={() => setCompanyPromptOpen(false)}
        >
          <form
            className="profileModal"
            onSubmit={submitCompany}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="profileModalHeader">
              <div>
                <p className="eyebrow">RESUME TAILORING</p>
                <h2>Choose a target company</h2>
              </div>
              <button
                type="button"
                className="icon"
                onClick={() => setCompanyPromptOpen(false)}
                aria-label="Close company prompt"
              >
                <X size={18} />
              </button>
            </div>
            <label className="profileField">
              <span>Company name</span>
              <input
                autoFocus
                value={companyInput}
                onChange={(event) => setCompanyInput(event.target.value)}
                placeholder="e.g. Google, Microsoft, TechNova"
              />
            </label>
            <div className="profileActions">
              <button
                type="button"
                className="secondary"
                onClick={() => setCompanyPromptOpen(false)}
              >
                Cancel
              </button>
              <button className="primary" type="submit" disabled={isTailoring}>
                {isTailoring ? "Tailoring..." : "Tailor resume"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
function Analytics({ readiness }: any) {
  const focusPlan = [
    [
      "Day 1-2",
      "Revise binary tree fundamentals and traversals",
      "Core concept review",
    ],
    [
      "Day 3-4",
      "Solve 5 tree and graph problems on arrays, DFS and BFS patterns",
      "Practice",
    ],
    [
      "Day 5",
      "Revise Operating Systems and DBMS basics for interview confidence",
      "Concept refresh",
    ],
    [
      "Day 6-7",
      "Take a mock interview and refine your explanations",
      "Performance check",
    ],
  ];
  const [planOpen, setPlanOpen] = useState(false);
  return (
    <>
      <div className="titleRow">
        <div>
          <p className="eyebrow">PLACEMENT READINESS ANALYTICS</p>
          <h1>Measure what moves your career</h1>
          <p className="muted">
            Your signals are improving. Keep your focus on the biggest gaps.
          </p>
        </div>
      </div>
      <div className="analyticsTop">
        <Card className="readyLarge">
          <div>
            <p className="eyebrow">PLACEMENT READINESS</p>
            <Score value={readiness} size={190} />
          </div>
          <div>
            <h2>{readiness}% ready</h2>
            <p>+7 points in the last 90 days</p>
            <Pill tone="green">On track</Pill>
          </div>
        </Card>
        <Card>
          <h3>Biggest bottleneck</h3>
          <h2>Core CS Fundamentals</h2>
          <p>
            Improving Operating Systems and DBMS can have the highest impact on
            your readiness.
          </p>
          <button className="secondary" onClick={() => setPlanOpen(true)}>
            View focus plan
          </button>
          {planOpen && (
            <div
              style={{
                marginTop: 16,
                padding: 12,
                borderRadius: 12,
                background: "rgba(139,124,255,0.08)",
                border: "1px solid rgba(139,124,255,0.2)",
              }}
            >
              <b style={{ display: "block", marginBottom: 8 }}>
                7-day focus plan
              </b>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  display: "grid",
                  gap: 8,
                  color: "#edf0f8",
                }}
              >
                {focusPlan.map(([day, task, label]) => (
                  <li key={day}>
                    <b>{day}</b> · {task}{" "}
                    <small style={{ color: "#b7aaff" }}>({label})</small>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </div>
      <div className="twoCol">
        <Card>
          <h3>Capability breakdown</h3>
          <ResponsiveContainer width="100%" height={310}>
            <RadarChart data={skillData}>
              <PolarGrid stroke="#32384a" />
              <PolarAngleAxis
                dataKey="name"
                tick={{ fill: "#a9afc0", fontSize: 11 }}
              />
              <RechartsRadar
                dataKey="value"
                stroke="#9d8cff"
                fill="#9d8cff"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3>Readiness trend</h3>
          <ResponsiveContainer width="100%" height={310}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="a" x1="0" x2="0" y1="0" y2="1">
                  <stop stopColor="#8b7cff" stopOpacity=".45" />
                  <stop offset="1" stopColor="#8b7cff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="#a796ff"
                fill="url(#a)"
                strokeWidth={3}
              />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );
}
function Future({ act }: any) {
  const [role, setRole] = useState("Senior Engineer");
  const [pathOpen, setPathOpen] = useState(false);
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(
    null,
  );
  const rolePaths: any = {
    "Junior Software Engineer": [
      "Build strong CS fundamentals",
      "Solve 30 DSA problems this month",
      "Complete 2 practical projects",
    ],
    "Software Engineer": [
      "Strengthen DSA and system design basics",
      "Practice SQL and backend fundamentals",
      "Ship one full-stack project",
    ],
    "Senior Engineer": [
      "Improve architecture design clarity",
      "Master distributed systems and cloud basics",
      "Lead 2 technical discussions and reviews",
    ],
    "Tech Lead · AI Engineer · Architect": [
      "Design scalable systems",
      "Learn AI/ML fundamentals and deployment",
      "Mentor peers and drive project decisions",
    ],
    "AI Engineer": [
      "Learn Python, ML fundamentals, and model evaluation",
      "Build a small deployable AI project",
      "Practice system design for ML products",
    ],
    "Data Engineer": [
      "Master SQL, ETL pipelines, and warehousing",
      "Learn Python for data processing",
      "Build a data pipeline project",
    ],
    "Cloud Engineer": [
      "Study AWS/GCP networking and containers",
      "Practice Linux, IaC, and deployment flows",
      "Deploy a project to the cloud",
    ],
    "Product Engineer": [
      "Improve product thinking and analytics",
      "Work on end-to-end user features",
      "Practice stakeholder communication and experimentation",
    ],
  };
  const path = rolePaths[role] || rolePaths["Senior Engineer"];
  const alternativePaths: any = {
    "AI Engineer": [
      "Learn Python + ML basics",
      "Build a prediction or NLP mini-project",
      "Practice ML system design",
    ],
    "Data Engineer": [
      "Learn SQL, ETL, and warehousing",
      "Build a pipeline with Python + Airflow",
      "Practice data modeling and reliability",
    ],
    "Cloud Engineer": [
      "Study networking, Linux, and containers",
      "Learn cloud deployment and IaC",
      "Deploy a real app to AWS or GCP",
    ],
    "Product Engineer": [
      "Map user problems to product features",
      "Learn analytics and experiments",
      "Practice product demos and stakeholder communication",
    ],
  };
  return (
    <>
      <div className="titleRow">
        <div>
          <p className="eyebrow">CAREER TIME MACHINE</p>
          <h1>Where can this career take you?</h1>
          <p className="muted">
            Explore the skills and decisions that shape your next decade.
          </p>
        </div>
      </div>
      <Card className="currentRole">
        <Pill>CURRENT TARGET ROLE</Pill>
        <h2>Software Engineer</h2>
        <div>
          {[
            ["Future demand", "HIGH"],
            ["Career growth", "STRONG"],
            ["AI impact", "MODERATE"],
            ["Growth potential", "★★★★☆"],
          ].map((x) => (
            <span key={x[0]}>
              <small>{x[0]}</small>
              <b>{x[1]}</b>
            </span>
          ))}
        </div>
      </Card>
      <div className="futureLayout">
        <Card className="careerTimeline">
          {[
            ["2026", "Junior Software Engineer", "CURRENT TARGET"],
            ["2028", "Software Engineer", "NEXT"],
            ["2030", "Senior Engineer", "EXPLORE"],
            ["2032+", "Tech Lead · AI Engineer · Architect", "BRANCH"],
          ].map((x) => (
            <button
              className={role === x[1] ? "timeActive" : ""}
              onClick={() => setRole(x[1])}
              key={x[0]}
            >
              <b>{x[0]}</b>
              <span>
                {x[1]}
                <small>{x[2]}</small>
              </span>
            </button>
          ))}
        </Card>
        <Card className="rolePanel">
          <Pill>FUTURE ROLE</Pill>
          <h2>{role}</h2>
          <p>Build toward this role through deliberate skill compounding.</p>
          <h4>Skills to start building now</h4>
          <div className="tags">
            <Pill>System Design</Pill>
            <Pill>Cloud Computing</Pill>
            <Pill>Distributed Systems</Pill>
          </div>
          <h4>Readiness signals</h4>
          <p className="checks">
            <Check /> Advanced Programming <Check /> System Design{" "}
            <span className="warn">⚠ Cloud · ✕ Leadership</span>
          </p>
          <button
            className="primary"
            onClick={() => {
              setPathOpen(true);
              act(`${role} path added to your roadmap`);
            }}
          >
            Explore role path
          </button>
          {pathOpen && (
            <div
              style={{
                marginTop: 16,
                padding: 12,
                borderRadius: 12,
                background: "rgba(139,124,255,0.08)",
                border: "1px solid rgba(139,124,255,0.2)",
              }}
            >
              <b style={{ display: "block", marginBottom: 8 }}>{role} path</b>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  display: "grid",
                  gap: 8,
                  color: "#edf0f8",
                }}
              >
                {path.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </div>
      <h2 className="sectionTitle">Alternative paths</h2>
      <div className="pathGrid">
        {[
          "AI Engineer",
          "Data Engineer",
          "Cloud Engineer",
          "Product Engineer",
        ].map((x, i) => (
          <Card key={x}>
            <Orbit className="purple" />
            <h3>{x}</h3>
            <b>{[82, 76, 70, 78][i]}% compatibility</b>
            <p>{[3, 4, 4, 2][i]} new skills required</p>
            <button
              className="textBtn"
              onClick={() => {
                setSelectedAlternative(x);
                setPathOpen(true);
                act(`${x} path explored`);
              }}
            >
              Explore path <ChevronRight size={15} />
            </button>
            {selectedAlternative === x && pathOpen && (
              <div
                style={{
                  marginTop: 12,
                  padding: 10,
                  borderRadius: 10,
                  background: "rgba(139,124,255,0.07)",
                  border: "1px solid rgba(139,124,255,0.15)",
                  color: "#edf0f8",
                }}
              >
                <b style={{ display: "block", marginBottom: 6 }}>{x} roadmap</b>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 18,
                    display: "grid",
                    gap: 6,
                  }}
                >
                  {(alternativePaths[x] || []).map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
function Ai({ close, act }: any) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<"gemini" | "mock">("mock");
  const chatBottomRef = React.useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const isStressed = typeof window !== "undefined" && localStorage.getItem("careerOSStress");
    if (isStressed) {
      return [
        { role: "user", content: "I feel stressed and overwhelmed with placement preparation." },
        {
          role: "assistant",
          content:
            "I hear you, and your wellbeing comes first. Take a deep breath and give yourself permission to pause. Would you like me to request a confidential student counsellor referral for you?",
        },
      ];
    }
    return [
      {
        role: "assistant",
        content: `Hi ${studentName}! I’m your CareerOS AI mentor powered by Gemini. What would you like to prepare or improve today?`,
      },
    ];
  });

  useEffect(() => {
    careerApi.getAiStatus().then((s) => {
      if (s.isAvailable) setProvider("gemini");
    }).catch(() => {});
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const ask = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setQ("");
    setLoading(true);

    try {
      const res = await careerApi.chat(updated, {
        name: studentName,
        targetRole: "Software Engineer",
        targetCompany: "TechNova",
        readinessScore: 72,
        wellbeing: localStorage.getItem("careerOSStress") ? "STRESSED" : "FOCUSED",
      });
      setMessages([...updated, { role: "assistant", content: res.message }]);
      setProvider(res.provider);
      act(`CareerOS AI answered (${res.provider === "gemini" ? "Gemini 2.5 Flash" : "Smart Mock"})`);
    } catch {
      setMessages([
        ...updated,
        {
          role: "assistant",
          content:
            "I'm currently running in offline mode. Focus on Trees & Graphs practice and Operating Systems fundamentals today.",
        },
      ]);
      act("AI answered your question");
    } finally {
      setLoading(false);
    }
  };

  const refer = () => {
    setMessages((m) => [
      ...m,
      { role: "user", content: "Refer me to a counsellor" },
      {
        role: "assistant",
        content:
          "Your counsellor referral request has been recorded. Please watch your student email for confidential follow-up from our student support team. Take things one step at a time today.",
      },
    ]);
    localStorage.removeItem("careerOSStress");
    act("Counsellor referral requested");
  };

  return (
    <div className="aiPanel">
      <div className="aiHead">
        <div className="logo">
          <Sparkles size={17} />
        </div>
        <span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <b>CareerOS AI</b>
            <span className={`aiBadge ${provider === "gemini" ? "active" : "mock"}`} style={{ fontSize: 9 }}>
              {provider === "gemini" ? "Gemini 2.5 Flash" : "Offline Mode"}
            </span>
          </div>
          <small>Personalized placement & career mentor</small>
        </span>
        <button className="icon" onClick={close}>
          <X size={18} />
        </button>
      </div>

      <div className="aiChat">
        {messages.map((m, i) => (
          <div
            className={m.role === "user" ? "userMsg" : "botMsg"}
            key={i}
            style={{
              fontSize: 11,
              lineHeight: 1.55,
              padding: "10px 12px",
              background: m.role === "user" ? "#34305a" : "#222635",
              borderRadius: 10,
              marginBottom: 10,
              marginLeft: m.role === "user" ? 30 : 0,
              marginRight: m.role === "assistant" ? 15 : 0,
              whiteSpace: "pre-wrap",
            }}
          >
            {m.content}
          </div>
        ))}

        {loading && (
          <div className="aiTyping">
            <Sparkles size={12} className="aiSpin" style={{ marginRight: 4 }} />
            CareerOS AI is thinking
            <span className="aiDot" />
            <span className="aiDot" />
            <span className="aiDot" />
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      <div className="suggestions">
        {[
          "What should I study today?",
          "How to crack Google SWE interview?",
          "Why is my readiness 72%?",
          "How to improve my resume bullets?",
        ].map((x) => (
          <button onClick={() => ask(x)} key={x} disabled={loading}>
            {x}
          </button>
        ))}
        {typeof window !== "undefined" && localStorage.getItem("careerOSStress") && (
          <button onClick={refer} style={{ borderColor: "#ea9e9e", color: "#ffd1d1" }}>
            Refer me to a counsellor
          </button>
        )}
      </div>

      <div className="aiInput">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && q && ask(q)}
          placeholder="Ask anything about roadmaps, interviews, companies…"
          disabled={loading}
        />
        <button onClick={() => q && ask(q)} disabled={!q.trim() || loading}>
          {loading ? <RefreshCw size={14} className="aiSpin" /> : <Send size={15} />}
        </button>
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
