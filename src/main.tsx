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
  ShieldCheck,
  CheckCircle2,
  Award,
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
import { RoleSwitcherBar } from "./components/Auth/RoleSwitcherBar";
import { AuthModal } from "./components/Auth/AuthModal";
import { OnboardingWizard } from "./components/Auth/OnboardingWizard";
import { AdminPortal } from "./components/Portals/AdminPortal";
import { MentorPortal } from "./components/Portals/MentorPortal";
import { FileUploadModal } from "./components/Common/FileUploadModal";
import { UserProfile, UserRole } from "./api";

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
  | "Mentor Portal"
  | "Future Scope"
  | "Admin Operations";
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
  ["Mentor Portal", Award],
  ["Future Scope", Orbit],
  ["Admin Operations", ShieldCheck],
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
  currentUser,
  onProfileSaved,
  close,
  act,
}: {
  currentUser: UserProfile;
  onProfileSaved: (updatedUser: UserProfile) => void;
  close: () => void;
  act: (msg: string, inc?: number) => void;
}) {
  const [form, setForm] = useState({
    fullName: currentUser?.fullName || "Divya",
    email: currentUser?.email || "divya@careeros.demo",
    location: currentUser?.location || "Bengaluru, India",
    college: currentUser?.studentProfile?.college || "Vellore Institute of Technology",
    degree: currentUser?.studentProfile?.degree || "B.Tech in Computer Science",
    graduationYear: currentUser?.studentProfile?.graduationYear || 2026,
    targetRole: currentUser?.studentProfile?.targetRole || "Junior Frontend Developer",
    targetIndustry: currentUser?.studentProfile?.targetIndustry || "Fintech / SaaS",
    preferredLanguage: (currentUser?.studentProfile as any)?.preferredLanguage || "English",
    weeklyAvailabilityHours: currentUser?.studentProfile?.weeklyAvailabilityHours || 15,
    workModePreference: currentUser?.studentProfile?.workModePreference || "Hybrid",
    githubUrl: (currentUser?.studentProfile as any)?.githubUrl || "https://github.com/divya-dev",
    portfolioUrl: (currentUser?.studentProfile as any)?.portfolioUrl || "https://divya.dev",
    linkedinUrl: (currentUser?.studentProfile as any)?.linkedinUrl || "https://linkedin.com/in/divya-dev",
    bio: (currentUser?.studentProfile as any)?.bio || "Passionate frontend engineer eager to build accessible and scalable web applications.",
  });

  const [activeTab, setActiveTab] = useState<"personal" | "academic" | "links">("personal");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field: keyof typeof form, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim()) {
      setErrorMessage("Full name is required.");
      return;
    }
    if (!form.targetRole.trim()) {
      setErrorMessage("Target role is required.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    try {
      const res = await careerApi.updateProfile(form);
      if (res?.user) {
        onProfileSaved(res.user);
        act("Profile updated successfully.");
        close();
      } else {
        throw new Error("Invalid response");
      }
    } catch {
      setErrorMessage("Your profile could not be saved. Please try again.");
      act("Your profile could not be saved. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profileModalOverlay" onClick={close}>
      <div
        className="profileModal"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(640px, calc(100vw - 32px))", maxHeight: "90vh", display: "flex", flexDirection: "column" }}
      >
        <div className="profileModalHeader">
          <div>
            <p className="eyebrow">PERSISTENT PROFILE</p>
            <h2>Edit Professional Profile</h2>
          </div>
          <button
            className="icon"
            onClick={close}
            aria-label="Close profile editor"
            disabled={isSaving}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Sub-Navigation */}
        <div style={{ display: "flex", gap: 8, borderBottom: "1px solid #2a2f40", paddingBottom: 10, marginBottom: 16 }}>
          <button
            type="button"
            className={activeTab === "personal" ? "pill purple" : "pill"}
            onClick={() => setActiveTab("personal")}
          >
            Identity & Contact
          </button>
          <button
            type="button"
            className={activeTab === "academic" ? "pill purple" : "pill"}
            onClick={() => setActiveTab("academic")}
          >
            Academics & Role
          </button>
          <button
            type="button"
            className={activeTab === "links" ? "pill purple" : "pill"}
            onClick={() => setActiveTab("links")}
          >
            Links & Bio
          </button>
        </div>

        {errorMessage && (
          <div style={{ background: "#471822", color: "#ff8a93", border: "1px solid #782b3a", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 14 }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ overflowY: "auto", flex: 1, paddingRight: 4 }}>
          {activeTab === "personal" && (
            <div className="profileFields">
              <label className="profileField">
                <span>Full Name *</span>
                <input
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="e.g. Divya"
                  required
                />
              </label>
              <label className="profileField">
                <span>Email Address</span>
                <input
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="e.g. divya@university.edu"
                />
              </label>
              <label className="profileField">
                <span>Current Location</span>
                <input
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="e.g. Bengaluru, India"
                />
              </label>
              <label className="profileField">
                <span>Preferred Language</span>
                <input
                  value={form.preferredLanguage}
                  onChange={(e) => updateField("preferredLanguage", e.target.value)}
                  placeholder="e.g. English"
                />
              </label>
            </div>
          )}

          {activeTab === "academic" && (
            <div className="profileFields">
              <label className="profileField">
                <span>College / University</span>
                <input
                  value={form.college}
                  onChange={(e) => updateField("college", e.target.value)}
                  placeholder="e.g. Vellore Institute of Technology"
                />
              </label>
              <label className="profileField">
                <span>Degree & Major</span>
                <input
                  value={form.degree}
                  onChange={(e) => updateField("degree", e.target.value)}
                  placeholder="e.g. B.Tech in Computer Science"
                />
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label className="profileField">
                  <span>Graduation Year</span>
                  <input
                    type="number"
                    value={form.graduationYear}
                    onChange={(e) => updateField("graduationYear", Number(e.target.value))}
                    min={2024}
                    max={2030}
                  />
                </label>
                <label className="profileField">
                  <span>Weekly Availability (Hours)</span>
                  <input
                    type="number"
                    value={form.weeklyAvailabilityHours}
                    onChange={(e) => updateField("weeklyAvailabilityHours", Number(e.target.value))}
                    min={5}
                    max={40}
                  />
                </label>
              </div>
              <label className="profileField">
                <span>Target Professional Role *</span>
                <input
                  value={form.targetRole}
                  onChange={(e) => updateField("targetRole", e.target.value)}
                  placeholder="e.g. Junior Frontend Developer"
                  required
                />
              </label>
              <label className="profileField">
                <span>Target Industry</span>
                <input
                  value={form.targetIndustry}
                  onChange={(e) => updateField("targetIndustry", e.target.value)}
                  placeholder="e.g. Fintech / SaaS"
                />
              </label>
              <label className="profileField">
                <span>Work Mode Preference</span>
                <select
                  value={form.workModePreference}
                  onChange={(e) => updateField("workModePreference", e.target.value)}
                  style={{ background: "#1a1f2c", border: "1px solid #2c3344", borderRadius: 10, padding: "12px 13px", color: "#edf0f8", fontSize: 15 }}
                >
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </label>
            </div>
          )}

          {activeTab === "links" && (
            <div className="profileFields">
              <label className="profileField">
                <span>GitHub Profile URL</span>
                <input
                  value={form.githubUrl}
                  onChange={(e) => updateField("githubUrl", e.target.value)}
                  placeholder="https://github.com/..."
                />
              </label>
              <label className="profileField">
                <span>Portfolio / Live Demo URL</span>
                <input
                  value={form.portfolioUrl}
                  onChange={(e) => updateField("portfolioUrl", e.target.value)}
                  placeholder="https://..."
                />
              </label>
              <label className="profileField">
                <span>LinkedIn Profile URL</span>
                <input
                  value={form.linkedinUrl}
                  onChange={(e) => updateField("linkedinUrl", e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                />
              </label>
              <label className="profileField">
                <span>Professional Bio & Summary</span>
                <textarea
                  value={form.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  rows={3}
                  style={{ background: "#1a1f2c", border: "1px solid #2c3344", borderRadius: 10, padding: "12px 13px", color: "#edf0f8", fontSize: 14, fontFamily: "inherit", resize: "vertical" }}
                  placeholder="Summarize your technical foundation, projects, and career ambitions..."
                />
              </label>
            </div>
          )}

          <div className="profileActions" style={{ marginTop: 22 }}>
            <button type="button" className="secondary" onClick={close} disabled={isSaving}>
              Cancel
            </button>
            <button type="submit" className="primary" disabled={isSaving} style={{ minWidth: 140 }}>
              {isSaving ? "Saving profile..." : "Save changes"}
            </button>
          </div>
        </form>
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
function NotificationsPanel({
  close,
  notifications,
  onMarkRead,
  onMarkAllRead,
}: {
  close: () => void;
  notifications: any[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}) {
  const [tab, setTab] = useState<'all' | 'unread' | 'prefs'>('all');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [reviewAlerts, setReviewAlerts] = useState(true);
  const [appAlerts, setAppAlerts] = useState(true);

  const filtered = notifications.filter((n) => (tab === 'unread' ? !n.isRead : true));

  return (
    <div className="profileModalOverlay" onClick={close}>
      <div className="profileModal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
        <div className="profileModalHeader">
          <div>
            <p className="eyebrow">IN-APP NOTIFICATIONS</p>
            <h2 style={{ fontSize: 18, margin: '2px 0' }}>Activity Stream & Alerts</h2>
          </div>
          <button className="icon" onClick={close} aria-label="Close notifications">
            <X size={18} />
          </button>
        </div>

        {/* Filter Tabs & Mark All Read */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 14px' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              type="button"
              className={tab === 'all' ? 'primary' : 'secondary'}
              style={{ fontSize: 11, padding: '4px 10px' }}
              onClick={() => setTab('all')}
            >
              All ({notifications.length})
            </button>
            <button
              type="button"
              className={tab === 'unread' ? 'primary' : 'secondary'}
              style={{ fontSize: 11, padding: '4px 10px' }}
              onClick={() => setTab('unread')}
            >
              Unread ({notifications.filter((n) => !n.isRead).length})
            </button>
            <button
              type="button"
              className={tab === 'prefs' ? 'primary' : 'secondary'}
              style={{ fontSize: 11, padding: '4px 10px' }}
              onClick={() => setTab('prefs')}
            >
              Preferences
            </button>
          </div>

          {tab !== 'prefs' && (
            <button
              type="button"
              className="textBtn"
              style={{ fontSize: 11, color: '#8777f2' }}
              onClick={onMarkAllRead}
            >
              Mark all read
            </button>
          )}
        </div>

        {tab === 'prefs' ? (
          <div style={{ background: '#131522', padding: 14, borderRadius: 8, border: '1px solid #232a3c', display: 'grid', gap: 12 }}>
            <b style={{ fontSize: 12, color: '#f0edff' }}>Notification Channel Preferences:</b>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, cursor: 'pointer' }}>
              <span>Mentor Review & Evidence Verification Alerts</span>
              <input type="checkbox" checked={reviewAlerts} onChange={(e) => setReviewAlerts(e.target.checked)} />
            </label>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, cursor: 'pointer' }}>
              <span>Job Application Status Changes & Interview Invites</span>
              <input type="checkbox" checked={appAlerts} onChange={(e) => setAppAlerts(e.target.checked)} />
            </label>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, cursor: 'pointer' }}>
              <span>Daily Career Mission & Micro-Internship Reminders</span>
              <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} />
            </label>
          </div>
        ) : (
          <div className="notificationList" style={{ maxHeight: 360, overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: '#8e96a8', fontSize: 12 }}>
                No notifications to display.
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id || item.title}
                  className="notificationItem"
                  style={{
                    background: item.isRead ? 'transparent' : 'rgba(135,119,242,0.06)',
                    cursor: 'pointer',
                  }}
                  onClick={() => onMarkRead(item.id)}
                >
                  <div
                    className="notificationDot"
                    style={{ background: item.isRead ? '#3a425c' : '#8777f2' }}
                  />
                  <div style={{ flex: 1 }}>
                    <b style={{ fontSize: 12, color: item.isRead ? '#cbd1e1' : '#f0edff' }}>{item.title}</b>
                    <p style={{ fontSize: 11, margin: '2px 0 0', color: '#8e96a8' }}>{item.detail}</p>
                  </div>
                  <span style={{ fontSize: 10, color: '#68728a' }}>{item.timeAgo || item.time || 'Recent'}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
function PersonProfilePanel({
  currentUser,
  openEditor,
  close,
}: {
  currentUser: UserProfile;
  openEditor: () => void;
  close: () => void;
}) {
  const initials = currentUser?.fullName
    ? currentUser.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "DV";

  return (
    <div className="profileModalOverlay" onClick={close}>
      <div className="profileModal" onClick={(e) => e.stopPropagation()}>
        <div className="profileModalHeader">
          <div>
            <p className="eyebrow">IDENTITY</p>
            <h2>Profile Overview</h2>
          </div>
          <button className="icon" onClick={close} aria-label="Close profile overview">
            <X size={18} />
          </button>
        </div>
        <div className="profileFields">
          <div className="profilePreview" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="avatar" style={{ width: 52, height: 52, fontSize: 18 }}>
              {initials}
            </div>
            <div>
              <h3 style={{ margin: 0 }}>{currentUser?.fullName || "Divya"}</h3>
              <p style={{ margin: "4px 0 0", color: "#b7bfd6" }}>
                {currentUser?.studentProfile?.targetRole || (currentUser?.role === 'mentor' ? 'Senior Mentor' : currentUser?.role === 'platform_admin' ? 'Administrator' : 'Student')}
              </p>
              <small style={{ color: "#8e95a5" }}>{currentUser?.studentProfile?.college || currentUser?.location}</small>
            </div>
          </div>
          <label className="profileField">
            <span>Location</span>
            <input value={currentUser?.location || "Bengaluru, India"} readOnly />
          </label>
          <label className="profileField">
            <span>Email</span>
            <input value={currentUser?.email || "divya@careeros.demo"} readOnly />
          </label>
          <label className="profileField">
            <span>College / Institute</span>
            <input value={currentUser?.studentProfile?.college || "Vellore Institute of Technology"} readOnly />
          </label>
          <label className="profileField">
            <span>Degree & Grad Year</span>
            <input value={`${currentUser?.studentProfile?.degree || "B.Tech in Computer Science"} (${currentUser?.studentProfile?.graduationYear || 2026})`} readOnly />
          </label>
          <label className="profileField">
            <span>Target Role & Industry</span>
            <input value={`${currentUser?.studentProfile?.targetRole || "Junior Frontend Developer"} · ${currentUser?.studentProfile?.targetIndustry || "Fintech / SaaS"}`} readOnly />
          </label>
          {(currentUser?.studentProfile as any)?.bio && (
            <label className="profileField">
              <span>Bio</span>
              <input value={(currentUser?.studentProfile as any).bio} readOnly />
            </label>
          )}
        </div>
        <div className="profileActions" style={{ marginTop: 20 }}>
          <button className="secondary" onClick={close}>
            Close
          </button>
          <button
            className="primary"
            onClick={() => {
              close();
              openEditor();
            }}
          >
            Edit profile
          </button>
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
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([
    {
      id: "notif-1",
      title: "Project Verified on Career Passport!",
      detail: "Sneha Roy verified 'Placement Analytics Dashboard' with a 4.6/5 rating.",
      type: "PROJECT_VERIFIED",
      isRead: false,
      timeAgo: "10m ago",
    },
    {
      id: "notif-2",
      title: "Technical Interview Scheduled",
      detail: "TechNova Labs moved your application to Technical Interview stage.",
      type: "APPLICATION_UPDATE",
      isRead: false,
      timeAgo: "1h ago",
    },
    {
      id: "notif-3",
      title: "Career Pod Mission Check-In",
      detail: "Frontend Pod Alpha: 5 of 8 members completed this week's testing mission.",
      type: "POD_ACTIVITY",
      isRead: true,
      timeAgo: "Yesterday",
    },
  ]);
  const [unreadCount, setUnreadCount] = useState(2);
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("careeros_user_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      id: "usr-student-1",
      email: "divya@careeros.demo",
      fullName: "Divya",
      role: "student",
      location: "Bengaluru, India",
      isEmailVerified: true,
      studentProfile: {
        id: "sp-1",
        college: "Vellore Institute of Technology",
        degree: "B.Tech in Computer Science",
        graduationYear: 2026,
        targetRole: "Junior Frontend Developer",
        targetIndustry: "Fintech / SaaS",
        currentReadiness: 68,
        currentLevel: 8,
        xp: 1650,
        weeklyAvailabilityHours: 15,
        workModePreference: "Hybrid",
        financialConstraints: false,
      },
    };
  });
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
      .then(() => careerApi.getDashboard())
      .then((data: any) => {
        if (data?.placementReadiness?.overallScore) {
          setReadiness(data.placementReadiness.overallScore);
        }
        if (data?.xp) setXp(data.xp);
      })
      .catch((error) =>
        setApiError(`Live career data unavailable: ${error.message}`),
      );

    careerApi
      .getProfile()
      .then((res) => {
        if (res?.user) {
          setCurrentUser(res.user);
        }
      })
      .catch(() => {});

    careerApi
      .getInAppNotifications()
      .then((res) => {
        if (res?.notifications) {
          setNotifications(res.notifications);
          setUnreadCount(res.unreadCount);
        }
      })
      .catch(() => {});
  }, []);

  const handleMarkRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
    setUnreadCount((c) => Math.max(0, c - 1));
    try {
      await careerApi.markNotificationAsRead(id);
    } catch {
      // Local fallback
    }
  };

  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
    try {
      await careerApi.markAllNotificationsAsRead();
    } catch {
      // Local fallback
    }
  };

  const handleSwitchRole = async (role: UserRole) => {
    try {
      const res = await careerApi.switchRole(role);
      setCurrentUser(res.user);
      localStorage.setItem("careeros_user_profile", JSON.stringify(res.user));
      if (role === "platform_admin") {
        setPage("Admin Operations");
      } else if (role === "mentor") {
        setPage("Mentor Portal");
      } else {
        setPage("Command Center");
      }
    } catch {
      setCurrentUser((prev) => ({ ...prev, role }));
      if (role === "platform_admin") {
        setPage("Admin Operations");
      } else if (role === "mentor") {
        setPage("Mentor Portal");
      }
    }
  };
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

  const userInitials = currentUser?.fullName
    ? currentUser.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "DV";

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
              {userInitials}
            </div>
            {sidebar && (
              <div>
                <b>{currentUser?.fullName || "Divya"}</b>
                <small>Level {currentUser?.studentProfile?.currentLevel || 8}</small>
              </div>
            )}
          </div>
        </div>
      </aside>
      <main>
        <RoleSwitcherBar
          currentUser={currentUser}
          onSwitchRole={handleSwitchRole}
          onOpenAuthModal={() => setAuthModalOpen(true)}
          onOpenOnboarding={() => setOnboardingOpen(true)}
          onLogout={() => {
            careerApi.logout();
            act("Logged out. Switched to Guest persona.");
          }}
          act={act}
        />
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
            <button
              className="icon"
              onClick={() => setNotificationsOpen(true)}
              style={{ position: "relative" }}
              aria-label="Notifications"
            >
              <Bell size={19} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -2,
                    background: "#ff8a8a",
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: "bold",
                    borderRadius: "50%",
                    width: 15,
                    height: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
            <div
              className="avatar"
              onClick={() => setPersonProfileOpen(true)}
              style={{ cursor: "pointer" }}
            >
              {userInitials}
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
              openVault={() => setFileUploadOpen(true)}
              currentUser={currentUser}
              readiness={readiness}
            />
          )}{" "}
          {page === "Skill Tree" && (
            <SkillTree selected={skill} setSelected={setSkill} act={act} go={setPage} />
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
          {page === "Mentor Portal" && <MentorPortal act={act} />}{" "}
          {page === "Future Scope" && <Future act={act} />}{" "}
          {page === "Admin Operations" && <AdminPortal act={act} />}
        </div>
      </main>
      {assistant && <Ai close={() => setAssistant(false)} act={act} />}{" "}
      {profileOpen && (
        <ProfileEditor
          currentUser={currentUser}
          onProfileSaved={(u) => {
            setCurrentUser(u);
            localStorage.setItem("careeros_user_profile", JSON.stringify(u));
          }}
          close={() => setProfileOpen(false)}
          act={act}
        />
      )}{" "}
      {settingsOpen && (
        <SettingsPanel close={() => setSettingsOpen(false)} act={act} />
      )}
      {notificationsOpen && (
        <NotificationsPanel
          close={() => setNotificationsOpen(false)}
          notifications={notifications}
          onMarkRead={handleMarkRead}
          onMarkAllRead={handleMarkAllRead}
        />
      )}
      {personProfileOpen && (
        <PersonProfilePanel
          currentUser={currentUser}
          openEditor={() => setProfileOpen(true)}
          close={() => setPersonProfileOpen(false)}
        />
      )}
      {fileUploadOpen && (
        <FileUploadModal
          onClose={() => setFileUploadOpen(false)}
          act={act}
        />
      )}
      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={(u) => {
            setCurrentUser(u);
            localStorage.setItem("careeros_user_profile", JSON.stringify(u));
          }}
          onOpenOnboarding={() => setOnboardingOpen(true)}
          act={act}
        />
      )}
      {onboardingOpen && (
        <OnboardingWizard
          initialUser={currentUser}
          onClose={() => setOnboardingOpen(false)}
          onComplete={(u) => {
            setCurrentUser(u);
            localStorage.setItem("careeros_user_profile", JSON.stringify(u));
          }}
          act={act}
        />
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
            Placement Explorer <Pill tone="purple">Level 8</Pill>
          </b>
          <div className="xp" style={{ marginBottom: 12 }}>
            <span>{p.xp} / 2,000 XP</span>
            <div>
              <i style={{ width: Math.min(100, p.xp / 20) + "%" }} />
            </div>
            <small>Target: Junior Frontend Developer</small>
          </div>

          {/* 4-Factor Weighted Readiness Breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, width: "100%", fontSize: 10, background: "#121422", padding: "10px 12px", borderRadius: 8, border: "1px solid #232a3c" }}>
            <div>
              <span style={{ color: "#8e96a8" }}>Technical Skills:</span>
              <b style={{ color: "#86e5b1", display: "block" }}>74/100</b>
            </div>
            <div>
              <span style={{ color: "#8e96a8" }}>Learning Path:</span>
              <b style={{ color: "#ffd175", display: "block" }}>67/100</b>
            </div>
            <div>
              <span style={{ color: "#8e96a8" }}>Project Evidence:</span>
              <b style={{ color: "#a89bff", display: "block" }}>84/100</b>
            </div>
            <div>
              <span style={{ color: "#8e96a8" }}>Mentor Reviews:</span>
              <b style={{ color: "#86e5b1", display: "block" }}>92/100</b>
            </div>
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
            Complete <em>React Render Optimization</em>
          </h2>
          <p>
            Completing this lesson and exercise will increase your overall placement readiness from{" "}
            {p.readiness}% to approximately{" "}
            <strong>{Math.min(100, p.readiness + 6)}%</strong>.
          </p>
          <div className="buttonRow">
            <button className="primary" onClick={() => p.go("Learning Hub")}>
              <Play size={16} /> Start lesson in Learning Hub
            </button>
            <button className="secondary" onClick={() => p.go("Career Passport")}>
              View Career Passport <ChevronRight size={16} />
            </button>
          </div>
          <div className="aiReason">
            <Brain size={17} />
            <span>
              <b>Why this now?</b> Identified as your top priority gap from the Diagnostic Assessment.
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
function Passport({ act, openProfile, openVault, currentUser, readiness }: any) {
  const [submissions, setSubmissions] = useState<any[]>([
    {
      id: "proj-sub-1",
      title: "Responsive Student Placement Analytics Dashboard",
      role: "Junior Frontend Developer",
      problemStatement:
        "Colleges lack real-time visibility into department placement readiness, skill gaps, and employer conversion trends.",
      requiredSkills: ["React.js", "TypeScript", "Recharts", "Vitest", "CSS Variables"],
      repoUrl: "https://github.com/divya-dev/placement-analytics-dashboard",
      liveDemoUrl: "https://placement-analytics.careeros.app",
      decisionsNotes:
        "Implemented responsive CSS grid cards, memoized chart calculations with useMemo, and wrote 12 Vitest unit tests with 88% branch coverage.",
      status: "Verified",
      score: 86,
      review: {
        reviewerName: "Sneha Roy",
        reviewerRole: "Senior Frontend Architect",
        organization: "Microsoft India",
        overallScore: 4.6,
        correctnessScore: 5,
        qualityScore: 4,
        clarityScore: 5,
        problemSolvingScore: 5,
        strengthFeedback:
          "Excellent component decomposition, clean TypeScript interfaces, and great use of responsive dark purple theme styling. The 12 Vitest tests demonstrate high production diligence.",
        improvementFeedback:
          "Consider lazy-loading heavy chart visualization modules with React.lazy() to further optimize initial bundle size.",
        reviewedAt: "2026-09-20T14:30:00.000Z",
      },
      passportVisibility: "Recruiters only",
      verifiedAt: "2026-09-20",
    },
  ]);

  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState<string | null>(null);

  // Submission Form State
  const [projectTitle, setProjectTitle] = useState("AI-Powered Merchant Checkout Flow");
  const [problemStatement, setProblemStatement] = useState("High cart abandonment on mobile due to multi-step checkout friction.");
  const [repoUrl, setRepoUrl] = useState("https://github.com/divya-dev/merchant-checkout");
  const [liveDemoUrl, setLiveDemoUrl] = useState("https://checkout.careeros.app");
  const [decisionsNotes, setDecisionsNotes] = useState("Implemented single-page accordion checkout with instant client validation and 8 Vitest tests.");

  // Review Form State
  const [reviewerName, setReviewerName] = useState("Sneha Roy");
  const [reviewerRole, setReviewerRole] = useState("Senior Frontend Architect (Microsoft)");
  const [correctnessScore, setCorrectnessScore] = useState(5);
  const [qualityScore, setQualityScore] = useState(4);
  const [clarityScore, setClarityScore] = useState(5);
  const [problemSolvingScore, setProblemSolvingScore] = useState(5);
  const [strengthFeedback, setStrengthFeedback] = useState("Exceptional error boundary handling, strong TypeScript typing, and accessible form labels.");
  const [improvementFeedback, setImprovementFeedback] = useState("Add keyboard shortcut navigation for power users.");

  const [visibilitySetting, setVisibilitySetting] = useState<
    "Private" | "Mentors only" | "Recruiters only" | "Public preview"
  >("Recruiters only");

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = {
      id: "proj-sub-" + Date.now(),
      title: projectTitle,
      role: currentUser?.studentProfile?.targetRole || "Junior Frontend Developer",
      problemStatement,
      requiredSkills: ["React", "TypeScript", "Vitest"],
      repoUrl,
      liveDemoUrl,
      decisionsNotes,
      status: "Requested",
      approvedForPassport: true,
      passportVisibility: visibilitySetting,
      submittedAt: new Date().toISOString(),
    };

    setSubmissions([newRecord, ...submissions]);
    setSubmitModalOpen(false);
    act("Project evidence submitted to Project Studio! (+100 XP)", 100);

    try {
      await careerApi.submitProject({
        title: projectTitle,
        problemStatement,
        repoUrl,
        liveDemoUrl,
        decisionsNotes,
      });
    } catch {
      // Local fallback
    }
  };

  const handleAddReview = async (e: React.FormEvent, projId: string) => {
    e.preventDefault();
    const avgScore = Number(
      ((correctnessScore + qualityScore + clarityScore + problemSolvingScore) / 4).toFixed(1),
    );

    const reviewObj = {
      reviewerName,
      reviewerRole,
      organization: "Microsoft India",
      overallScore: avgScore,
      correctnessScore,
      qualityScore,
      clarityScore,
      problemSolvingScore,
      strengthFeedback,
      improvementFeedback,
      reviewedAt: new Date().toISOString(),
    };

    setSubmissions((prev) =>
      prev.map((p) =>
        p.id === projId
          ? {
              ...p,
              review: reviewObj,
              status: "Verified",
              score: Math.round(avgScore * 20),
              verifiedAt: new Date().toISOString().slice(0, 10),
            }
          : p,
      ),
    );

    setReviewModalOpen(null);
    act(`Project review recorded by ${reviewerName}! Status: VERIFIED (+200 XP)`, 200);

    try {
      await careerApi.submitProjectReview(projId, {
        reviewerName,
        reviewerRole,
        organization: "Microsoft India",
        correctnessScore,
        qualityScore,
        clarityScore,
        problemSolvingScore,
        strengthFeedback,
        improvementFeedback,
      });
    } catch {
      // Local fallback
    }
  };

  const skills = [
    ["React & Component Architecture", 88, "Advanced (Verified by Project Evidence)"],
    ["TypeScript & Type Safety", 82, "Advanced (Verified by Codebase)"],
    ["JavaScript Async & Closures", 85, "Advanced (Diagnostic Calibrated)"],
    ["Vitest Automated Testing", 78, "Intermediate (Verified by 12 Tests)"],
    ["Technical Communication", 80, "Intermediate (Microsoft Mentor Review)"],
  ];

  const studentInitials = currentUser?.fullName
    ? currentUser.fullName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "DV";

  return (
    <>
      <div className="titleRow">
        <div>
          <p className="eyebrow">AI CAREER PASSPORT & PROJECT STUDIO</p>
          <h1>Your Verified Professional Proof Packet</h1>
          <p className="muted">
            Evidence-based artifacts, mentor reviews, and verified skill signals that shape your placement readiness.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="secondary"
            onClick={() => {
              if (openVault) openVault();
              act("Encrypted File Vault opened");
            }}
          >
            🔒 Encrypted Vault
          </button>
          <button
            className="secondary"
            onClick={() => {
              openProfile();
              act("Profile editor opened");
            }}
          >
            Edit profile
          </button>
          <button className="primary" onClick={() => setSubmitModalOpen(true)}>
            <Sparkles size={15} /> Submit Project Evidence
          </button>
        </div>
      </div>

      <Card className="passportHero" style={{ marginBottom: 20 }}>
        <div className="avatar huge" style={{ background: "#262047", color: "#b3a5ff" }}>
          {studentInitials}
        </div>
        <div>
          <h2>
            {currentUser?.fullName || "Divya"} <Pill tone="green">Verified Student Identity</Pill>
          </h2>
          <p>
            {currentUser?.studentProfile?.degree || "Computer Science Student"} · {currentUser?.studentProfile?.college || "Vellore Institute of Technology"} · {currentUser?.location || "Bengaluru, India"}
          </p>
          <div className="tags" style={{ marginTop: 6 }}>
            <Pill tone="purple">Target: {currentUser?.studentProfile?.targetRole || "Junior Frontend Developer"}</Pill>
            <Pill tone="orange">Readiness: {readiness || currentUser?.studentProfile?.currentReadiness || 68}/100</Pill>
            <Pill tone="green">Recruiter Visible: {visibilitySetting}</Pill>
          </div>
        </div>
        <div className="passportStats">
          <span>
            <b>{submissions.length}</b> Verified Projects
          </span>
          <span>
            <b>4.6/5</b> Mentor Rating
          </span>
          <span>
            <b>8.4</b> Profile Strength
          </span>
        </div>
      </Card>

      {/* Recruiter Visibility Bar */}
      <Card style={{ marginBottom: 20, padding: "12px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ShieldCheck size={16} color="#86e5b1" />
            <b style={{ fontSize: 12 }}>Career Passport Recruiter Privacy Controls:</b>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {(["Private", "Mentors only", "Recruiters only", "Public preview"] as const).map((v) => (
              <button
                key={v}
                type="button"
                className={visibilitySetting === v ? "primary" : "secondary"}
                style={{ fontSize: 11, padding: "4px 10px" }}
                onClick={() => {
                  setVisibilitySetting(v);
                  careerApi.updatePassportVisibility(v).catch(() => {});
                  act(`Passport visibility updated to "${v}"`);
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Skills & Connected Accounts */}
      <div className="twoCol" style={{ marginBottom: 20 }}>
        <Card>
          <h3>
            Verified Skills <small>Live evidence confidence indicators</small>
          </h3>
          {skills.map(([name, value, level]: any) => (
            <div className="skillbar" key={name} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                <b>{name}</b>
                <span style={{ color: "#a89bff" }}>{level}</span>
              </div>
              <div style={{ height: 6, background: "#1b1f2e", borderRadius: 3, overflow: "hidden" }}>
                <i
                  style={{
                    display: "block",
                    height: "100%",
                    width: value + "%",
                    background: "linear-gradient(90deg, #6353af, #86e5b1)",
                  }}
                />
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <h3>Connected Work Profiles</h3>
          {[
            ["GitHub", "14 repositories · 88 commits", "Connected & Verified", "https://github.com/divya-dev"],
            ["LeetCode", "185 problems solved · Top 18%", "Connected", "https://leetcode.com"],
            ["LinkedIn", "Profile completed · 3 Endorsements", "Connected", "https://linkedin.com"],
          ].map((x) => (
            <div className="connection" key={x[0]} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, background: "#131520", padding: 10, borderRadius: 8 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div className="connectionIcon" style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "#252b3d", borderRadius: 6, fontSize: 12 }}>
                  {x[0][0]}
                </div>
                <span>
                  <b style={{ fontSize: 12, display: "block" }}>{x[0]}</b>
                  <small style={{ color: "#8e96a8", fontSize: 10 }}>{x[1]}</small>
                </span>
              </div>
              <Pill tone="green">{x[2]}</Pill>
            </div>
          ))}
        </Card>
      </div>

      {/* Verified Project Proof Packets Section */}
      <div className="titleRow" style={{ marginTop: 10, marginBottom: 12 }}>
        <div>
          <p className="eyebrow">PROJECT STUDIO</p>
          <h2 style={{ margin: 0, fontSize: 18 }}>Verified Project Proof Packets</h2>
        </div>
        <span className="pill green">{submissions.length} Projects Tracked</span>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {submissions.map((p) => (
          <Card key={p.id} style={{ background: "#141724", border: "1px solid #2d354d", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <h3 style={{ margin: 0, fontSize: 16 }}>{p.title}</h3>
                  <Pill tone={p.status === "Verified" ? "green" : "orange"}>
                    {p.status.toUpperCase()}
                  </Pill>
                </div>
                <small style={{ color: "#8e96a8", fontSize: 11, marginTop: 4, display: "block" }}>
                  Role: <b>{p.role}</b> · Submitted on {p.submittedAt ? new Date(p.submittedAt).toLocaleDateString() : "Recent"}
                </small>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                {p.repoUrl && (
                  <button
                    className="secondary"
                    style={{ fontSize: 11, padding: "5px 10px" }}
                    onClick={() => window.open(p.repoUrl, "_blank")}
                  >
                    GitHub Repo <ArrowUpRight size={12} />
                  </button>
                )}
                {p.liveDemoUrl && (
                  <button
                    className="secondary"
                    style={{ fontSize: 11, padding: "5px 10px" }}
                    onClick={() => window.open(p.liveDemoUrl, "_blank")}
                  >
                    Live Demo <ArrowUpRight size={12} />
                  </button>
                )}
                {!p.review && (
                  <button
                    className="primary"
                    style={{ fontSize: 11, padding: "5px 12px" }}
                    onClick={() => setReviewModalOpen(p.id)}
                  >
                    <CheckCircle2 size={12} /> Add Mentor Review
                  </button>
                )}
              </div>
            </div>

            <div style={{ background: "#10121c", padding: 12, borderRadius: 8, marginBottom: 12, fontSize: 11, color: "#cbd1e1", border: "1px solid #1f2538" }}>
              <b style={{ color: "#f0edff", display: "block", marginBottom: 4 }}>Problem & Architectural Decisions:</b>
              <p style={{ margin: "0 0 6px" }}>{p.problemStatement}</p>
              <p style={{ margin: 0, color: "#8e96a8" }}><b>Implementation:</b> {p.decisionsNotes}</p>
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              {p.requiredSkills?.map((s: string) => (
                <span key={s} className="pill purple" style={{ fontSize: 10 }}>{s}</span>
              ))}
            </div>

            {/* Mentor Review Section */}
            {p.review && (
              <div style={{ background: "linear-gradient(135deg, #1b1633, #121422)", border: "1px solid #4a3d7d", padding: 14, borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Award size={16} color="#86e5b1" />
                    <div>
                      <b style={{ fontSize: 12, color: "#f0edff" }}>Reviewed by {p.review.reviewerName}</b>
                      <small style={{ color: "#8e96a8", display: "block", fontSize: 10 }}>
                        {p.review.reviewerRole} ({p.review.organization})
                      </small>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="pill green">VERIFIED EVIDENCE</span>
                    <b style={{ display: "block", fontSize: 14, color: "#86e5b1", marginTop: 2 }}>
                      ★ {p.review.overallScore} / 5.0
                    </b>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 11, marginTop: 10 }}>
                  <div style={{ background: "rgba(134, 229, 177, 0.08)", padding: 8, borderRadius: 6, border: "1px solid rgba(134, 229, 177, 0.2)" }}>
                    <b style={{ color: "#86e5b1", display: "block", marginBottom: 2 }}>Strengths:</b>
                    <p style={{ margin: 0, color: "#d2f7e4" }}>{p.review.strengthFeedback}</p>
                  </div>
                  <div style={{ background: "rgba(255, 209, 117, 0.08)", padding: 8, borderRadius: 6, border: "1px solid rgba(255, 209, 117, 0.2)" }}>
                    <b style={{ color: "#ffd175", display: "block", marginBottom: 2 }}>Growth Opportunities:</b>
                    <p style={{ margin: 0, color: "#ffe7b8" }}>{p.review.improvementFeedback}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* SUBMISSION MODAL */}
      {submitModalOpen && (
        <div className="profileModalOverlay" onClick={() => setSubmitModalOpen(false)}>
          <div className="profileModal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <div className="profileModalHeader">
              <div>
                <p className="eyebrow">PROJECT STUDIO SUBMISSION</p>
                <h3 style={{ margin: 0, fontSize: 18 }}>Submit Project Proof Packet</h3>
              </div>
              <button className="icon" onClick={() => setSubmitModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} style={{ marginTop: 14 }}>
              <div className="profileField" style={{ marginBottom: 10 }}>
                <span>Project Title</span>
                <input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} required />
              </div>

              <div className="profileField" style={{ marginBottom: 10 }}>
                <span>Problem Statement</span>
                <textarea
                  rows={2}
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                  style={{ width: "100%", background: "#161928", color: "#fff", border: "1px solid #282f42", borderRadius: 6, padding: 8, fontSize: 12 }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <div className="profileField">
                  <span>GitHub Repo URL</span>
                  <input value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} placeholder="https://github.com/..." required />
                </div>
                <div className="profileField">
                  <span>Live Demo URL</span>
                  <input value={liveDemoUrl} onChange={(e) => setLiveDemoUrl(e.target.value)} placeholder="https://demo.app" />
                </div>
              </div>

              <div className="profileField" style={{ marginBottom: 14 }}>
                <span>Architectural Decisions & Tools</span>
                <textarea
                  rows={2}
                  value={decisionsNotes}
                  onChange={(e) => setDecisionsNotes(e.target.value)}
                  style={{ width: "100%", background: "#161928", color: "#fff", border: "1px solid #282f42", borderRadius: 6, padding: 8, fontSize: 12 }}
                  required
                />
              </div>

              <div className="profileActions">
                <button type="button" className="secondary" onClick={() => setSubmitModalOpen(false)}>
                  Cancel
                </button>
                <button className="primary" type="submit">
                  Submit Evidence for Review <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MENTOR REVIEW MODAL */}
      {reviewModalOpen && (
        <div className="profileModalOverlay" onClick={() => setReviewModalOpen(null)}>
          <div className="profileModal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <div className="profileModalHeader">
              <div>
                <p className="eyebrow">PEER & MENTOR EVALUATION</p>
                <h3 style={{ margin: 0, fontSize: 18 }}>Record Verified Project Review</h3>
              </div>
              <button className="icon" onClick={() => setReviewModalOpen(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={(e) => handleAddReview(e, reviewModalOpen)} style={{ marginTop: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <div className="profileField">
                  <span>Reviewer Name</span>
                  <input value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} required />
                </div>
                <div className="profileField">
                  <span>Reviewer Role / Org</span>
                  <input value={reviewerRole} onChange={(e) => setReviewerRole(e.target.value)} required />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <div className="profileField">
                  <span>Technical Correctness (1–5): {correctnessScore}★</span>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={correctnessScore}
                    onChange={(e) => setCorrectnessScore(Number(e.target.value))}
                  />
                </div>
                <div className="profileField">
                  <span>Code Quality & Tests (1–5): {qualityScore}★</span>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={qualityScore}
                    onChange={(e) => setQualityScore(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="profileField" style={{ marginBottom: 10 }}>
                <span>Strength Feedback</span>
                <textarea
                  rows={2}
                  value={strengthFeedback}
                  onChange={(e) => setStrengthFeedback(e.target.value)}
                  style={{ width: "100%", background: "#161928", color: "#fff", border: "1px solid #282f42", borderRadius: 6, padding: 8, fontSize: 12 }}
                  required
                />
              </div>

              <div className="profileField" style={{ marginBottom: 14 }}>
                <span>Growth & Improvement Areas</span>
                <textarea
                  rows={2}
                  value={improvementFeedback}
                  onChange={(e) => setImprovementFeedback(e.target.value)}
                  style={{ width: "100%", background: "#161928", color: "#fff", border: "1px solid #282f42", borderRadius: 6, padding: 8, fontSize: 12 }}
                  required
                />
              </div>

              <div className="profileActions">
                <button type="button" className="secondary" onClick={() => setReviewModalOpen(null)}>
                  Cancel
                </button>
                <button className="primary" type="submit">
                  Save Review & Verify Proof Packet <CheckCircle2 size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
interface SkillMissionDef {
  skillName: string;
  missionTitle: string;
  whyItMatters: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  xpReward: number;
  tasks: { id: string; label: string; completed: boolean }[];
  learningResources: { title: string; type: string; page?: string }[];
  status: "Not started" | "In progress" | "Submitted" | "Completed";
  repoUrl?: string;
  decisionNotes?: string;
}

function SkillMissionModal({
  skill,
  onClose,
  onComplete,
  act,
  go,
}: {
  skill: { name: string; value: number; status: string };
  onClose: () => void;
  onComplete: (skillName: string, newProficiency: number, newStatus: string) => void;
  act: (msg: string, inc?: number) => void;
  go?: (page: string) => void;
}) {
  const [mission, setMission] = useState<SkillMissionDef>(() => {
    const saved = localStorage.getItem(`careeros_mission_${skill.name}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }

    const defaultMissions: Record<string, SkillMissionDef> = {
      React: {
        skillName: "React",
        missionTitle: "Build a High-Performance Virtualized Task Management Grid",
        whyItMatters:
          "Target frontend roles heavily evaluate React reconciliation, custom hook encapsulation, and memory-safe DOM rendering.",
        difficulty: "Intermediate",
        duration: "3–4 hours",
        xpReward: 150,
        tasks: [
          { id: "t-1", label: "Review React state management, memoization & reconciliation in Learning Hub", completed: true },
          { id: "t-2", label: "Build a reusable data grid component with sorting and virtual scrolling", completed: false },
          { id: "t-3", label: "Add loading skeletons, error boundary fallback, and empty states", completed: false },
          { id: "t-4", label: "Write 6 Vitest unit tests verifying state mutations and keyboard navigation", completed: false },
          { id: "t-5", label: "Document component props interface and architectural trade-offs", completed: false },
        ],
        learningResources: [
          { title: "React Component Architecture & Hooks", type: "Lesson", page: "Learning Hub" },
          { title: "Vitest Component Testing Patterns", type: "Guide", page: "Learning Hub" },
        ],
        status: "In progress",
      },
      Trees: {
        skillName: "Trees",
        missionTitle: "Master Binary Search Trees, Traversals & LCA Algorithms",
        whyItMatters:
          "Tree traversals (DFS, BFS, recursion) represent over 35% of technical coding assessments at top tier software firms.",
        difficulty: "Intermediate",
        duration: "2–3 hours",
        xpReward: 150,
        tasks: [
          { id: "t-1", label: "Review Inorder, Preorder, and Level-Order traversal algorithms", completed: true },
          { id: "t-2", label: "Solve Validate Binary Search Tree & Lowest Common Ancestor problems", completed: false },
          { id: "t-3", label: "Implement height-balanced tree rotation checks", completed: false },
          { id: "t-4", label: "Analyze time and space complexity with dry-run test cases", completed: false },
        ],
        learningResources: [
          { title: "Tree Traversals & Recursion Deep Dive", type: "Lesson", page: "Learning Hub" },
          { title: "Mock Technical Screening Arena", type: "Interactive", page: "Mock Arena" },
        ],
        status: "In progress",
      },
      Python: {
        skillName: "Python",
        missionTitle: "Build an Async Data Ingestion Pipeline with Type Safety",
        whyItMatters:
          "Data engineering and backend systems require idiomatic Python generators, type hints, and asynchronous IO processing.",
        difficulty: "Intermediate",
        duration: "3–4 hours",
        xpReward: 150,
        tasks: [
          { id: "t-1", label: "Review Python Generators, Decorators, and Asyncio", completed: true },
          { id: "t-2", label: "Implement streaming data parser with Pydantic validation", completed: false },
          { id: "t-3", label: "Handle dirty datasets with automated schema transformation", completed: false },
          { id: "t-4", label: "Write Pytest suite with 80%+ branch coverage", completed: false },
        ],
        learningResources: [
          { title: "Python Advanced Idioms & Async", type: "Lesson", page: "Learning Hub" },
        ],
        status: "In progress",
      },
    };

    return (
      defaultMissions[skill.name] || {
        skillName: skill.name,
        missionTitle: `Build a Verified Production Artifact in ${skill.name}`,
        whyItMatters: `Mastering ${skill.name} eliminates a critical gap on your Career Passport and strengthens recruiter placement signal.`,
        difficulty: "Intermediate",
        duration: "2–4 hours",
        xpReward: 150,
        tasks: [
          { id: "t-1", label: `Review ${skill.name} core principles and design patterns`, completed: true },
          { id: "t-2", label: `Build a runnable demonstration project applying ${skill.name}`, completed: false },
          { id: "t-3", label: "Add automated tests verifying edge cases and error handling", completed: false },
          { id: "t-4", label: "Submit repository proof and explain technical decisions", completed: false },
        ],
        learningResources: [
          { title: `${skill.name} Core Concepts & Best Practices`, type: "Lesson", page: "Learning Hub" },
          { title: "Diagnostic Assessment Quiz", type: "Assessment", page: "Command Center" },
        ],
        status: "In progress",
      }
    );
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [repoUrl, setRepoUrl] = useState(mission.repoUrl || `https://github.com/divya-dev/${skill.name.toLowerCase()}-mission`);
  const [decisionNotes, setDecisionNotes] = useState(
    mission.decisionNotes || "Implemented clean modular architecture, memoized calculation cycles, and verified edge cases with unit tests."
  );

  const completedTasksCount = mission.tasks.filter((t) => t.completed).length;
  const totalTasks = mission.tasks.length;
  const progressPct = Math.round((completedTasksCount / totalTasks) * 100);

  const handleToggleTask = (taskId: string) => {
    const updatedTasks = mission.tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    const allDone = updatedTasks.every((t) => t.completed);
    const updatedMission: SkillMissionDef = {
      ...mission,
      tasks: updatedTasks,
      status: allDone ? "Submitted" : "In progress",
    };
    setMission(updatedMission);
    localStorage.setItem(`careeros_mission_${skill.name}`, JSON.stringify(updatedMission));
    act(`Task updated: ${completedTasksCount + 1}/${totalTasks} completed`, 10);
  };

  const handleStartMission = () => {
    const updated: SkillMissionDef = { ...mission, status: "In progress" };
    setMission(updated);
    localStorage.setItem(`careeros_mission_${skill.name}`, JSON.stringify(updated));
    act(`Skill mission for ${skill.name} started successfully.`, 20);
  };

  const handleSubmitMission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await careerApi.completeSkillMission(skill.name);
    } catch {
      // Local fallback
    }

    const newProficiency = Math.min(100, skill.value + 22);
    const newStatus = newProficiency >= 75 ? "mastered" : "progress";

    const completedMission: SkillMissionDef = {
      ...mission,
      status: "Completed",
      repoUrl,
      decisionNotes,
      tasks: mission.tasks.map((t) => ({ ...t, completed: true })),
    };

    setMission(completedMission);
    localStorage.setItem(`careeros_mission_${skill.name}`, JSON.stringify(completedMission));

    setIsSubmitting(false);
    act(`Skill mission for ${skill.name} completed! (+150 XP, +3 Readiness)`, 150);
    onComplete(skill.name, newProficiency, newStatus);
  };

  return (
    <div className="profileModalOverlay" onClick={onClose}>
      <div
        className="profileModal"
        style={{ width: "min(680px, calc(100vw - 32px))", maxHeight: "90vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="profileModalHeader" style={{ borderBottom: "1px solid #2c3344", paddingBottom: 14 }}>
          <div>
            <p className="eyebrow" style={{ color: "#a597ff" }}>
              SKILL MISSION · {mission.difficulty.toUpperCase()} · {mission.duration}
            </p>
            <h2 style={{ fontSize: 22, margin: "4px 0 0", color: "#f0edff" }}>{mission.missionTitle}</h2>
          </div>
          <button type="button" className="icon" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: "16px 0" }}>
          {/* Why it Matters Banner */}
          <div
            style={{
              background: "#181b28",
              border: "1px solid #333b52",
              borderRadius: 10,
              padding: "12px 16px",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <b style={{ color: "#8fe3b6", fontSize: 11, letterSpacing: "0.5px" }}>
                ✓ WHY THIS SKILL MATTERS
              </b>
              <span
                className={`pill ${
                  mission.status === "Completed"
                    ? "green"
                    : mission.status === "In progress"
                    ? "orange"
                    : "purple"
                }`}
                style={{ fontSize: 9 }}
              >
                {mission.status}
              </span>
            </div>
            <p style={{ fontSize: 12.5, color: "#cbd2e4", margin: "6px 0 0", lineHeight: 1.5 }}>
              {mission.whyItMatters}
            </p>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
              <span style={{ color: "#9aa2b5", fontWeight: 600 }}>
                Mission Tasks ({completedTasksCount}/{totalTasks} Completed)
              </span>
              <b style={{ color: "#a899ff" }}>{progressPct}%</b>
            </div>
            <div
              style={{
                height: 8,
                background: "#252b3d",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPct}%`,
                  background: "linear-gradient(90deg, #7b6be2, #47d692)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          {/* Interactive Tasks Checklist */}
          <div style={{ marginBottom: 18 }}>
            <h4 style={{ margin: "0 0 10px", fontSize: 13, color: "#eeeaff" }}>Required Milestones:</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {mission.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "10px 14px",
                    background: task.completed ? "rgba(22, 60, 42, 0.35)" : "#161924",
                    border: `1px solid ${task.completed ? "#2d694b" : "#2a3043"}`,
                    borderRadius: 9,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      border: `1px solid ${task.completed ? "#4dbd83" : "#4f576d"}`,
                      background: task.completed ? "#1b4d35" : "transparent",
                      display: "grid",
                      placeItems: "center",
                      marginTop: 2,
                      flexShrink: 0,
                    }}
                  >
                    {task.completed && <Check size={13} color="#75e2a7" />}
                  </div>
                  <span
                    style={{
                      fontSize: 12.5,
                      color: task.completed ? "#9fe0bc" : "#e0e3ed",
                      textDecoration: task.completed ? "line-through" : "none",
                      lineHeight: 1.45,
                    }}
                  >
                    {task.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Resources */}
          {mission.learningResources && mission.learningResources.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#eeeaff" }}>Recommended Prep Resources:</h4>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {mission.learningResources.map((res, i) => (
                  <button
                    key={i}
                    type="button"
                    className="secondary"
                    style={{ fontSize: 11, padding: "7px 12px", background: "#1a1e2d" }}
                    onClick={() => {
                      if (go && res.page) {
                        onClose();
                        go(res.page);
                      } else {
                        act(`Opened resource: ${res.title}`);
                      }
                    }}
                  >
                    <BookOpen size={13} style={{ marginRight: 4 }} />
                    {res.title} ({res.type})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Artifact submission fields */}
          <form onSubmit={handleSubmitMission}>
            <div className="profileFields" style={{ marginBottom: 18 }}>
              <label className="profileField">
                <span>Proof of Work / GitHub Repository Link</span>
                <input
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/your-username/project-repo"
                />
              </label>
              <label className="profileField">
                <span>Technical Decisions & Complexity Notes</span>
                <input
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  placeholder="Explain trade-offs, algorithms used, and edge cases handled..."
                />
              </label>
            </div>

            <div className="profileActions" style={{ marginTop: 14 }}>
              <button type="button" className="secondary" onClick={onClose}>
                Close
              </button>
              {mission.status === "Not started" ? (
                <button type="button" className="primary" onClick={handleStartMission}>
                  <Sparkles size={14} /> Start Mission
                </button>
              ) : mission.status === "Completed" ? (
                <button type="button" className="primary" disabled style={{ background: "#275a41", color: "#86e5b1" }}>
                  <Check size={14} /> Mission Completed (+150 XP)
                </button>
              ) : (
                <button type="submit" className="primary" disabled={isSubmitting}>
                  <Trophy size={14} /> {isSubmitting ? "Submitting..." : "Submit Mission (+150 XP)"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function SkillTree({ selected, setSelected, act, go }: any) {
  const [nodes, setNodes] = useState<any[]>(() => {
    const saved = localStorage.getItem("careeros_skill_nodes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [
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
  });

  const [activeMissionSkill, setActiveMissionSkill] = useState<{
    name: string;
    value: number;
    status: string;
  } | null>(null);

  const handleOpenMission = (skillItem: any) => {
    setActiveMissionSkill(skillItem);
    act(`Starting skill mission for ${skillItem.name}...`);
  };

  const handleMissionComplete = (skillName: string, newProficiency: number, newStatus: string) => {
    const updatedNodes = nodes.map((n) =>
      n[0] === skillName ? [n[0], newProficiency, newStatus, n[3]] : n
    );
    setNodes(updatedNodes);
    localStorage.setItem("careeros_skill_nodes", JSON.stringify(updatedNodes));

    if (selected && selected.name === skillName) {
      setSelected({ name: skillName, value: newProficiency, status: newStatus });
    }
    setActiveMissionSkill(null);
  };

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
                <li>Review conceptual architecture patterns</li>
                <li>Solve hands-on practice problems</li>
                <li>Submit code artifact and automated tests</li>
              </ul>
              <div className="reward">
                <Trophy size={18} />
                <span>
                  Complete mission <b>+150 XP</b>
                </span>
              </div>
              <button
                className="primary full"
                onClick={() => handleOpenMission(selected)}
              >
                <Sparkles size={14} style={{ marginRight: 6 }} /> Start skill mission
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

      {activeMissionSkill && (
        <SkillMissionModal
          skill={activeMissionSkill}
          onClose={() => setActiveMissionSkill(null)}
          onComplete={handleMissionComplete}
          act={act}
          go={go}
        />
      )}
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
  const [lessons, setLessons] = useState<any[]>([
    {
      id: "lesson-fe-1",
      title: "JavaScript Async Patterns & Promises in Depth",
      skill: "JavaScript / TypeScript",
      duration: "20 min",
      xpReward: 50,
      completed: true,
      content:
        "Mastering the JavaScript Event Loop: Microtasks (Promises, queueMicrotask) take strict priority over Macrotasks (setTimeout, setInterval). When building asynchronous frontend interfaces, always handle errors with try/catch blocks and use Promise.allSettled() when fetching parallel resources where partial success is acceptable.",
      exercise: {
        question: "Which Promise static method waits for all promises to settle regardless of outcome?",
        options: ["Promise.race()", "Promise.allSettled()", "Promise.any()"],
        correctIndex: 1,
        explanation: "Promise.allSettled() returns outcome objects with status 'fulfilled' or 'rejected' for every promise without short-circuiting.",
      },
    },
    {
      id: "lesson-fe-2",
      title: "React Render Optimization & Memoization",
      skill: "React.js",
      duration: "25 min",
      xpReward: 50,
      completed: false,
      content:
        "React re-renders components whenever state or parent props change. To prevent expensive tree recalculations: (1) Use React.memo for pure display components, (2) Wrap heavy transformations in useMemo with proper dependency arrays, and (3) Use useCallback for stable function handler references passed to memoized children.",
      exercise: {
        question: "What is the primary purpose of the useCallback hook in React?",
        options: [
          "To cache expensive calculation return values",
          "To preserve function reference identity across component renders",
          "To fetch data automatically on mount",
        ],
        correctIndex: 1,
        explanation: "useCallback caches function definitions between renders, ensuring child components relying on reference equality do not re-render unnecessarily.",
      },
    },
    {
      id: "lesson-fe-3",
      title: "Automated Component Testing with Vitest & React Testing Library",
      skill: "Testing & Vitest",
      duration: "30 min",
      xpReward: 75,
      completed: false,
      content:
        "Test behavior rather than implementation details. Use getByRole to find elements the way screen readers do, mock network endpoints using MSW or vi.fn(), and assert expected visual feedback across loading, error, and success states.",
      exercise: {
        question: "Which RTL query is the recommended standard for selecting interactive buttons?",
        options: ['getByRole("button", { name: /submit/i })', 'getByTestId("submit-btn")', 'querySelector("button")'],
        correctIndex: 0,
        explanation: "getByRole aligns with accessibility trees and encourages accessible semantic HTML structure.",
      },
    },
  ]);

  const [activeLesson, setActiveLesson] = useState<any | null>(null);
  const [selectedExerciseOption, setSelectedExerciseOption] = useState<number | null>(null);
  const [exerciseFeedback, setExerciseFeedback] = useState<{ correct: boolean; text: string } | null>(null);

  const completedCount = lessons.filter((l) => l.completed).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  const handleOpenLesson = (lesson: any) => {
    setActiveLesson(lesson);
    setSelectedExerciseOption(null);
    setExerciseFeedback(null);
    act(`Opened lesson: ${lesson.title}`);
  };

  const handleVerifyExercise = () => {
    if (selectedExerciseOption === null || !activeLesson) return;
    const isCorrect = selectedExerciseOption === activeLesson.exercise.correctIndex;
    setExerciseFeedback({
      correct: isCorrect,
      text: isCorrect
        ? `✓ Correct! ${activeLesson.exercise.explanation}`
        : `✗ Not quite. ${activeLesson.exercise.explanation}`,
    });
  };

  const handleCompleteLesson = async (lessonId: string) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === lessonId ? { ...l, completed: true } : l)),
    );
    act(`Lesson completed! (+50 XP)`, 50);
    setActiveLesson(null);

    try {
      await careerApi.completeLearningLesson(lessonId);
    } catch {
      // Local fallback
    }
  };

  return (
    <>
      <div className="titleRow">
        <div>
          <p className="eyebrow">LEARNING HUB</p>
          <h1>Target Role Mastery & Skill Bridging</h1>
          <p className="muted">
            Interactive modular lessons mapped directly to your diagnostic gaps and employer requirements.
          </p>
        </div>
        <Pill tone={progressPercent >= 70 ? "green" : "orange"}>
          {progressPercent}% Path Progress ({completedCount}/{lessons.length} Completed)
        </Pill>
      </div>

      <div className="flow" style={{ marginBottom: 20 }}>
        <b>1. DIAGNOSTIC GAPS</b>
        <ChevronRight />
        <b>2. CONCEPT LESSONS</b>
        <ChevronRight />
        <b>3. CODE EXERCISES</b>
        <ChevronRight />
        <b>4. PROJECT APPLICATION</b>
      </div>

      <h2 className="sectionTitle">Role-Specific Curriculum Modules</h2>
      <div className="resourceGrid" style={{ marginBottom: 24 }}>
        {lessons.map((lesson, idx) => (
          <Card key={lesson.id} style={{ background: lesson.completed ? "rgba(134,229,177,0.05)" : "#131520", border: lesson.completed ? "1px solid #334d42" : "1px solid #282f42" }}>
            <div className="cardTop">
              <span className="pill purple" style={{ fontSize: 9 }}>{lesson.skill}</span>
              {lesson.completed ? (
                <span className="pill green" style={{ fontSize: 9 }}><Check size={10} /> COMPLETED</span>
              ) : (
                <span className="pill orange" style={{ fontSize: 9 }}>+{lesson.xpReward} XP</span>
              )}
            </div>

            <h3 style={{ fontSize: 15, margin: "8px 0 4px" }}>{lesson.title}</h3>
            <p style={{ fontSize: 11, color: "#8e96a8", marginBottom: 12 }}>
              {lesson.duration} · Self-paced conceptual deep-dive & quiz
            </p>

            <button
              className={lesson.completed ? "secondary full" : "primary full"}
              style={{ fontSize: 11 }}
              onClick={() => handleOpenLesson(lesson)}
            >
              {lesson.completed ? "Review Lesson & Notes" : "Start Interactive Lesson"} <ArrowRight size={12} />
            </button>
          </Card>
        ))}
      </div>

      {/* LESSON READER MODAL */}
      {activeLesson && (
        <div className="profileModalOverlay" onClick={() => setActiveLesson(null)}>
          <div className="profileModal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <div className="profileModalHeader">
              <div>
                <p className="eyebrow">LEARNING HUB INTERACTIVE MODULE</p>
                <h2 style={{ fontSize: 18, margin: "4px 0" }}>{activeLesson.title}</h2>
                <small style={{ color: "#a89bff" }}>Skill Focus: <b>{activeLesson.skill}</b></small>
              </div>
              <button className="icon" onClick={() => setActiveLesson(null)}>
                <X size={16} />
              </button>
            </div>

            {/* Concept Content */}
            <div style={{ background: "#111422", padding: 14, borderRadius: 8, margin: "14px 0", fontSize: 12, lineHeight: 1.6, border: "1px solid #232a3e" }}>
              <b style={{ color: "#f0edff", display: "block", marginBottom: 6 }}>Key Concept Breakdown:</b>
              <p style={{ margin: 0, color: "#c6cbde" }}>{activeLesson.content}</p>
            </div>

            {/* Practice Exercise */}
            <div style={{ background: "#151828", padding: 14, borderRadius: 8, marginBottom: 14, border: "1px solid #2c334d" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <b style={{ fontSize: 12, color: "#f0edff" }}>Check Your Understanding:</b>
                <span className="pill orange" style={{ fontSize: 9 }}>Knowledge Check</span>
              </div>
              <p style={{ fontSize: 11, margin: "0 0 10px", color: "#d2d6e6" }}>
                {activeLesson.exercise.question}
              </p>

              <div style={{ display: "grid", gap: 6, marginBottom: 10 }}>
                {activeLesson.exercise.options.map((opt: string, idx: number) => (
                  <label
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: selectedExerciseOption === idx ? "rgba(139,124,255,0.15)" : "#1a1d2e",
                      border: selectedExerciseOption === idx ? "1px solid #8777f2" : "1px solid #282f42",
                      padding: "7px 10px",
                      borderRadius: 6,
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="exercise"
                      checked={selectedExerciseOption === idx}
                      onChange={() => {
                        setSelectedExerciseOption(idx);
                        setExerciseFeedback(null);
                      }}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  type="button"
                  className="secondary"
                  style={{ fontSize: 11, padding: "5px 12px" }}
                  onClick={handleVerifyExercise}
                  disabled={selectedExerciseOption === null}
                >
                  Verify Answer
                </button>
                {exerciseFeedback && (
                  <span style={{ fontSize: 11, color: exerciseFeedback.correct ? "#86e5b1" : "#ffd175" }}>
                    {exerciseFeedback.text}
                  </span>
                )}
              </div>
            </div>

            <div className="profileActions">
              <button type="button" className="secondary" onClick={() => setActiveLesson(null)}>
                Close
              </button>
              <button
                type="button"
                className="primary"
                onClick={() => handleCompleteLesson(activeLesson.id)}
                disabled={activeLesson.completed}
              >
                {activeLesson.completed ? "Already Completed ✓" : "Mark Complete & Claim 50 XP"} <CheckCircle2 size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
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
