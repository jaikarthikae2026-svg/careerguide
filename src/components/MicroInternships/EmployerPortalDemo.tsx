import React, { useState } from 'react';
import {
  Building,
  Plus,
  Users,
  CheckCircle2,
  Clock,
  Star,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles,
  FileText,
  DollarSign,
} from 'lucide-react';
import {
  sampleOrganizations,
} from '../../data/microInternshipData';

interface EmployerPortalDemoProps {
  act: (msg: string, inc?: number) => void;
}

export const EmployerPortalDemo: React.FC<EmployerPortalDemoProps> = ({ act }) => {
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('Build a Customer Churn Alert Webhook');
  const [newStipend, setNewStipend] = useState('₹4,000');
  const [newDuration, setNewDuration] = useState('10 days');
  const [newRole, setNewRole] = useState('Junior Backend Developer');

  const [applicants, setApplicants] = useState([
    { id: 'app-101', name: 'Divya', match: 88, role: 'Junior Frontend Developer', status: 'Shortlisted', resumeScore: 88 },
    { id: 'app-102', name: 'Rohan Sharma', match: 78, role: 'Data Analyst', status: 'Applied', resumeScore: 81 },
    { id: 'app-103', name: 'Aditi Rao', match: 84, role: 'Junior Backend Developer', status: 'Interview Invited', resumeScore: 85 },
  ]);

  const handlePostOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    setPostModalOpen(false);
    act(`Posted new micro-internship: '${newTitle}' with ${newStipend} stipend! (+30 XP)`, 30);
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    act(`Applicant status updated to: ${newStatus}`, 10);
  };

  return (
    <div className="employerPortalSection">
      {/* Title */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">EMPLOYER & RECRUITER PARTNER VIEW</p>
          <h1>Employer Management Portal</h1>
          <p className="muted">
            Fictional demo portal showcasing how verified companies post short projects, evaluate applicant proof, and invite top performers to hiring rooms.
          </p>
        </div>

        <button className="primary" onClick={() => setPostModalOpen(true)}>
          <Plus size={15} /> Post New Micro-Internship
        </button>
      </div>

      {/* Overview Cards */}
      <div className="networkStatsGrid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="card statCard">
          <div>
            <small>Active Postings</small>
            <b>3</b>
            <span className="statSub">In Review</span>
          </div>
        </div>
        <div className="card statCard">
          <div>
            <small>Total Applicants</small>
            <b style={{ color: '#86e5b1' }}>18</b>
            <span className="statSub">Verified Students</span>
          </div>
        </div>
        <div className="card statCard">
          <div>
            <small>Deliverables Signed Off</small>
            <b>38</b>
            <span className="statSub">100% On-Time</span>
          </div>
        </div>
        <div className="card statCard">
          <div>
            <small>Hiring Room Invites</small>
            <b style={{ color: '#ffd175' }}>12</b>
            <span className="statSub">Fast-Tracked</span>
          </div>
        </div>
      </div>

      {/* Applicant Evaluation Pipeline */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="cardTop" style={{ marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Candidate Applications Pipeline</h3>
          <span className="pill green">High-Signal Proof</span>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          {applicants.map((a) => (
            <div
              key={a.id}
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
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div className="avatar" style={{ width: 34, height: 34, fontSize: 12 }}>
                  {a.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <b style={{ fontSize: 13 }}>{a.name}</b>
                    <span className="pill green" style={{ fontSize: 9 }}>{a.match}% Match</span>
                    <span className="pill" style={{ fontSize: 9 }}>Resume: {a.resumeScore}%</span>
                  </div>
                  <small style={{ color: '#8e96a8', fontSize: 11 }}>{a.role} · Attached 2 Verified Projects</small>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="pill purple" style={{ fontSize: 10 }}>{a.status}</span>
                {a.status !== 'Shortlisted' && (
                  <button
                    className="secondary"
                    style={{ fontSize: 10, padding: '4px 8px', height: 'auto' }}
                    onClick={() => handleUpdateStatus(a.id, 'Shortlisted')}
                  >
                    Shortlist
                  </button>
                )}
                {a.status !== 'Interview Invited' && (
                  <button
                    className="primary"
                    style={{ fontSize: 10, padding: '4px 8px', height: 'auto' }}
                    onClick={() => handleUpdateStatus(a.id, 'Interview Invited')}
                  >
                    Invite to Hiring Room <ArrowRight size={11} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Modal */}
      {postModalOpen && (
        <div className="profileModalOverlay" onClick={() => setPostModalOpen(false)}>
          <div className="profileModal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <div className="profileModalHeader">
              <div>
                <p className="eyebrow">EMPLOYER PROJECT CREATOR</p>
                <h2>Post a Micro-Internship</h2>
              </div>
              <button className="icon" onClick={() => setPostModalOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handlePostOpportunity}>
              <div className="profileField" style={{ marginBottom: 12 }}>
                <span>Project Title</span>
                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              </div>

              <div className="profileField" style={{ marginBottom: 12 }}>
                <span>Target Role</span>
                <input value={newRole} onChange={(e) => setNewRole(e.target.value)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                <div className="profileField">
                  <span>Stipend Amount (INR)</span>
                  <input value={newStipend} onChange={(e) => setNewStipend(e.target.value)} />
                </div>
                <div className="profileField">
                  <span>Project Duration</span>
                  <input value={newDuration} onChange={(e) => setNewDuration(e.target.value)} />
                </div>
              </div>

              <div className="profileActions">
                <button type="button" className="secondary" onClick={() => setPostModalOpen(false)}>
                  Cancel
                </button>
                <button className="primary" type="submit">
                  Publish to Student Network (+30 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
