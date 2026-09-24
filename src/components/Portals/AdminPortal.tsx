import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Users,
  Building,
  Briefcase,
  FileCheck,
  ArrowRight,
  Sparkles,
  Lock,
  Eye,
  Check,
  X,
} from 'lucide-react';

interface AdminPortalProps {
  act: (msg: string, inc?: number) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ act }) => {
  const [pendingUsers, setPendingUsers] = useState([
    { id: 'usr-1', name: 'Rohan Sharma', email: 'rohan@college.edu', role: 'Student', college: 'IIT Madras', status: 'Pending Verification' },
    { id: 'usr-2', name: 'Dr. Ananya Sen', email: 'ananya@fintech.io', role: 'Mentor', organization: 'FinPulse Systems', status: 'Pending Verification' },
    { id: 'usr-3', name: 'Kunal Deshmukh', email: 'kunal@growthscale.com', role: 'Recruiter', organization: 'GrowthScale Labs', status: 'Pending Verification' },
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 'log-1', user: 'divya@careeros.demo', action: 'SUBMIT_PROJECT_EVIDENCE', entity: 'Merchant Checkout Flow', ip: '192.168.1.45', time: '10 mins ago' },
    { id: 'log-2', user: 'sneha.roy@careeros.demo', action: 'APPROVE_MENTOR_REVIEW', entity: 'Placement Dashboard Review', ip: '172.16.0.12', time: '1 hour ago' },
    { id: 'log-3', user: 'recruiter@technova.demo', action: 'INVITE_TO_HIRING_ROOM', entity: 'Junior Frontend Candidate', ip: '49.204.12.88', time: '3 hours ago' },
    { id: 'log-4', user: 'system_security', action: 'DATABASE_BACKUP_SNAPSHOT', entity: 'PostgreSQL Automated Snapshot', ip: '10.0.0.1', time: '6 hours ago' },
  ]);

  const handleVerifyUser = (id: string, name: string) => {
    setPendingUsers((prev) => prev.filter((u) => u.id !== id));
    act(`Verified identity and credentials for ${name}! (+50 Admin XP)`, 50);
  };

  return (
    <div className="adminPortalSection">
      {/* Header */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">PLATFORM GOVERNANCE & SECURITY OPERATIONS</p>
          <h1>Administrator Operations & Moderation</h1>
          <p className="muted">
            Manage institutional verification, employer opportunity quality assurance, student safety, and audit logs.
          </p>
        </div>
        <span className="pill orange">🛡️ Super Admin Access</span>
      </div>

      {/* 4 Overview Metric Cards */}
      <div className="networkStatsGrid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        <div className="card statCard">
          <div>
            <small>Active Students</small>
            <b style={{ color: '#86e5b1' }}>1,420</b>
            <span className="statSub">Verified Campus Profiles</span>
          </div>
        </div>
        <div className="card statCard">
          <div>
            <small>Verified Mentors</small>
            <b style={{ color: '#ffd175' }}>148</b>
            <span className="statSub">Across Tier-1 Employers</span>
          </div>
        </div>
        <div className="card statCard">
          <div>
            <small>Active Micro-Internships</small>
            <b style={{ color: '#c4bbff' }}>42</b>
            <span className="statSub">100% Quality Vetted</span>
          </div>
        </div>
        <div className="card statCard">
          <div>
            <small>Average Placement Rate</small>
            <b style={{ color: '#86e5b1' }}>78%</b>
            <span className="statSub">Ready Candidates</span>
          </div>
        </div>
      </div>

      {/* User Verification Queue */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="cardTop" style={{ marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Pending Identity & Academic Verifications</h3>
          <span className="pill orange">{pendingUsers.length} In Queue</span>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          {pendingUsers.map((u) => (
            <div
              key={u.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#131520',
                padding: '12px 14px',
                borderRadius: 8,
                border: '1px solid #272d40',
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <b style={{ fontSize: 13 }}>{u.name}</b>
                  <span className="pill purple" style={{ fontSize: 8 }}>{u.role}</span>
                </div>
                <small style={{ color: '#8e96a8', fontSize: 11 }}>
                  {u.email} · {u.college || u.organization}
                </small>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="primary"
                  style={{ fontSize: 11, padding: '5px 12px', height: 'auto' }}
                  onClick={() => handleVerifyUser(u.id, u.name)}
                >
                  <Check size={12} /> Approve Verification
                </button>
              </div>
            </div>
          ))}

          {pendingUsers.length === 0 && (
            <div style={{ textAlign: 'center', padding: 20, color: '#86e5b1', fontSize: 12 }}>
              ✓ All user and mentor verifications are up to date!
            </div>
          )}
        </div>
      </div>

      {/* Security & Audit Logs */}
      <div className="card">
        <div className="cardTop" style={{ marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Security Audit & Activity Logs</h3>
          <span className="pill green">Real-Time Event Stream</span>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          {auditLogs.map((log) => (
            <div
              key={log.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#131520',
                padding: '10px 14px',
                borderRadius: 6,
                border: '1px solid #23283a',
                fontSize: 11,
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <ShieldCheck size={14} color="#86e5b1" />
                <div>
                  <b style={{ color: '#f0edff' }}>{log.action}</b>
                  <span style={{ color: '#8e96a8', marginLeft: 6 }}>({log.entity})</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ color: '#c4bbff' }}>User: {log.user}</span>
                <span style={{ color: '#888fa0' }}>IP: {log.ip}</span>
                <span style={{ color: '#ffd175' }}>{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
