import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Plus,
  Building,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  User,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';
import {
  ApplicationStage,
  JobApplication,
  sampleApplicationsData,
} from '../../data/rejectionIntelligenceData';
import { careerApi } from '../../api';

interface ApplicationTrackerViewProps {
  onSelectApplication: (app: JobApplication) => void;
  act: (msg: string, inc?: number) => void;
}

export const ApplicationTrackerView: React.FC<ApplicationTrackerViewProps> = ({
  onSelectApplication,
  act,
}) => {
  const [applications, setApplications] = useState<JobApplication[]>(sampleApplicationsData);
  const [stageFilter, setStageFilter] = useState<string>('ALL');
  const [outcomeFilter, setOutcomeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Form State for Add Application
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('Junior Frontend Engineer');
  const [newLocation, setNewLocation] = useState('Bengaluru, India');
  const [newMode, setNewMode] = useState<'Remote' | 'Hybrid' | 'On-site'>('Hybrid');
  const [newSource, setNewSource] = useState<'Campus Placement' | 'Career Network Referral' | 'LinkedIn' | 'Company Portal'>('LinkedIn');
  const [newResume, setNewResume] = useState('ATS_Software_Dev_Resume_v3.pdf');
  const [newReferral, setNewReferral] = useState('');
  const [newStage, setNewStage] = useState<ApplicationStage>('Applied');
  const [newNotes, setNewNotes] = useState('');

  const filteredApplications = applications.filter((app) => {
    if (stageFilter !== 'ALL' && app.currentStage !== stageFilter) return false;
    if (outcomeFilter !== 'ALL' && app.outcome !== outcomeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        app.company.toLowerCase().includes(q) ||
        app.role.toLowerCase().includes(q) ||
        app.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim()) return;

    const newApp: JobApplication = {
      id: 'app-' + Date.now(),
      company: newCompany,
      logo: newCompany.slice(0, 2).toUpperCase(),
      role: newRole,
      applicationDate: 'Today',
      location: newLocation,
      workMode: newMode,
      source: newSource,
      resumeVersion: newResume,
      referralUsed: newReferral || undefined,
      currentStage: newStage,
      outcome: 'Active',
      studentNotes: newNotes,
    };

    careerApi
      .createJobApplication({
        companyName: newCompany,
        role: newRole,
        location: newLocation,
        workMode: newMode,
        source: newSource,
        resumeVersion: newResume,
        referralUsed: newReferral || 'No',
        currentStage: newStage,
        studentNotes: newNotes,
      })
      .catch(() => {});

    setApplications([newApp, ...applications]);
    setAddModalOpen(false);
    setNewCompany('');
    setNewNotes('');
    act(`Logged application to ${newCompany}! (+20 XP)`, 20);
  };

  const getStageTone = (stage: ApplicationStage, outcome: string) => {
    if (outcome === 'Rejected') return 'orange';
    if (outcome === 'Offer') return 'green';
    switch (stage) {
      case 'Assessment':
      case 'Technical interview':
      case 'Behavioral interview':
      case 'Final interview':
        return 'purple';
      case 'Applied':
      case 'Resume review':
        return 'green';
      default:
        return '';
    }
  };

  return (
    <div className="applicationTrackerSection">
      {/* Title */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">APPLICATION LOG & PIPELINE</p>
          <h1>Application Tracker ({applications.length})</h1>
          <p className="muted">
            Track all submitted job applications, interview stages, and employer feedback across your active job search.
          </p>
        </div>

        <button className="primary" onClick={() => setAddModalOpen(true)}>
          <Plus size={15} /> Log New Application
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="card filterToolbar" style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            className="filterSelect"
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
          >
            <option value="ALL">All Application Stages</option>
            <option value="Applied">Applied</option>
            <option value="Resume review">Resume Review</option>
            <option value="Assessment">Assessment</option>
            <option value="Technical interview">Technical Interview</option>
            <option value="Behavioral interview">Behavioral Interview</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            className="filterSelect"
            value={outcomeFilter}
            onChange={(e) => setOutcomeFilter(e.target.value)}
          >
            <option value="ALL">All Outcomes</option>
            <option value="Active">Active Pipeline</option>
            <option value="Rejected">Recorded Rejections</option>
          </select>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 220 }}>
            <Search size={14} color="#888fa0" />
            <input
              className="filterSearchInput"
              style={{ width: '100%' }}
              placeholder="Search company, role, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Applications List Table / Cards */}
      <div style={{ display: 'grid', gap: 10 }}>
        {filteredApplications.map((app) => (
          <div
            key={app.id}
            className="card applicationRowCard"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#161926',
              padding: '12px 16px',
              borderRadius: 10,
              border: '1px solid #282f42',
              flexWrap: 'wrap',
              gap: 12,
              cursor: 'pointer',
            }}
            onClick={() => onSelectApplication(app)}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className="avatar" style={{ width: 34, height: 34, fontSize: 12 }}>
                {app.logo}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                  <b style={{ fontSize: 13, color: '#f0edff' }}>{app.company}</b>
                  <span className="pill" style={{ fontSize: 8 }}>{app.role}</span>
                  {app.referralUsed && (
                    <span className="pill green" style={{ fontSize: 8 }}>
                      👥 Referral
                    </span>
                  )}
                </div>
                <small style={{ color: '#8e96a8', fontSize: 10, display: 'block', marginTop: 2 }}>
                  📍 {app.location} ({app.workMode}) · Applied: {app.applicationDate} · Source: {app.source}
                </small>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span className={`pill ${getStageTone(app.currentStage, app.outcome)}`} style={{ fontSize: 9 }}>
                {app.currentStage}
              </span>

              {app.rejectionReasonType && (
                <span className="pill" style={{ fontSize: 8, opacity: 0.8 }}>
                  {app.rejectionReasonType === 'CONFIRMED' ? '✓ Confirmed Feedback' : app.rejectionReasonType === 'PROBABLE' ? '⚡ Pattern Inferred' : '❓ Unknown'}
                </span>
              )}

              <span style={{ fontSize: 11, color: '#8777f2' }}>
                Inspect <ArrowRight size={12} style={{ verticalAlign: 'middle' }} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Application Modal */}
      {addModalOpen && (
        <div className="profileModalOverlay" onClick={() => setAddModalOpen(false)}>
          <div className="profileModal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 580 }}>
            <div className="profileModalHeader">
              <div>
                <p className="eyebrow">APPLICATION LOG ENTRY</p>
                <h2>Log New Job Application</h2>
              </div>
              <button className="icon" onClick={() => setAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddApplication}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div className="profileField">
                  <span>Company Name</span>
                  <input
                    placeholder="e.g. Swiggy, Cred, Microsoft"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    required
                  />
                </div>
                <div className="profileField">
                  <span>Target Role</span>
                  <input
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div className="profileField">
                  <span>Location</span>
                  <input
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                  />
                </div>
                <div className="profileField">
                  <span>Work Mode</span>
                  <select
                    className="filterSelect"
                    value={newMode}
                    onChange={(e: any) => setNewMode(e.target.value)}
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div className="profileField">
                  <span>Application Source</span>
                  <select
                    className="filterSelect"
                    value={newSource}
                    onChange={(e: any) => setNewSource(e.target.value)}
                  >
                    <option value="Campus Placement">Campus Placement</option>
                    <option value="Career Network Referral">Career Network Referral</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Company Portal">Company Portal</option>
                  </select>
                </div>
                <div className="profileField">
                  <span>Current Stage</span>
                  <select
                    className="filterSelect"
                    value={newStage}
                    onChange={(e: any) => setNewStage(e.target.value)}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Resume review">Resume Review</option>
                    <option value="Assessment">Online Assessment</option>
                    <option value="Technical interview">Technical Interview</option>
                  </select>
                </div>
              </div>

              <div className="profileField" style={{ marginBottom: 12 }}>
                <span>Resume Version Used</span>
                <select
                  className="filterSelect"
                  value={newResume}
                  onChange={(e) => setNewResume(e.target.value)}
                >
                  <option value="ATS_Software_Dev_Resume_v3.pdf">ATS_Software_Dev_Resume_v3.pdf (Score: 88%)</option>
                  <option value="ATS_Software_Dev_Resume_v2.pdf">ATS_Software_Dev_Resume_v2.pdf (Score: 82%)</option>
                </select>
              </div>

              <div className="profileField" style={{ marginBottom: 14 }}>
                <span>Student Notes / Job Link</span>
                <textarea
                  className="workplaceTextarea"
                  rows={2}
                  placeholder="Paste job link, referral contact, or prep notes..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                />
              </div>

              <div className="profileActions">
                <button type="button" className="secondary" onClick={() => setAddModalOpen(false)}>
                  Cancel
                </button>
                <button className="primary" type="submit">
                  Save Application (+20 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
