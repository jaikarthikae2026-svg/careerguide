import React, { useState } from 'react';
import {
  Briefcase,
  Layers,
  Zap,
  FileCheck,
  Building,
  ShieldCheck,
  LayoutDashboard,
  Award,
} from 'lucide-react';
import { MicroOverview } from './MicroOverview';
import { MicroListings } from './MicroListings';
import { MicroDetailModal } from './MicroDetailModal';
import { ApplicationModal } from './ApplicationModal';
import { ActiveWorkspace } from './ActiveWorkspace';
import { EmployerReviewModal } from './EmployerReviewModal';
import { EmployerPortalDemo } from './EmployerPortalDemo';
import { AccessNetworkResources } from './AccessNetworkResources';
import {
  microInternshipsData,
  MicroInternship,
  sampleApplications,
  StudentApplication,
  sampleActiveProjects,
  sampleEmployerReviews,
} from '../../data/microInternshipData';

interface MicroInternshipsProps {
  go: (page: any) => void;
  act: (msg: string, inc?: number) => void;
}

export const MicroInternships: React.FC<MicroInternshipsProps> = ({ go, act }) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'listings' | 'workspace' | 'applications' | 'employer-portal' | 'access'
  >('overview');

  const [internships, setInternships] = useState<MicroInternship[]>(microInternshipsData);
  const [applications, setApplications] = useState<StudentApplication[]>(sampleApplications);
  const [selectedDetailInternship, setSelectedDetailInternship] = useState<MicroInternship | null>(null);
  const [selectedApplyInternship, setSelectedApplyInternship] = useState<MicroInternship | null>(null);
  const [employerReviewOpen, setEmployerReviewOpen] = useState(false);

  const handleApplySuccess = (newApp: StudentApplication) => {
    setApplications([newApp, ...applications]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Accepted':
      case 'Completed':
      case 'Verified':
        return 'green';
      case 'Under review':
      case 'Submitted':
      case 'Assessment required':
      case 'Shortlisted':
        return 'orange';
      case 'Declined':
      case 'Withdrawn':
        return 'red';
      default:
        return 'purple';
    }
  };

  return (
    <div className="microInternshipsContainer">
      {/* Top Segmented Navigation */}
      <div className="networkTopTabsBar">
        {[
          { key: 'overview', label: 'Overview', icon: LayoutDashboard },
          { key: 'listings', label: 'Explore Projects (10)', icon: Briefcase },
          { key: 'workspace', label: 'Active Workspace (1)', icon: Zap },
          { key: 'applications', label: `My Applications (${applications.length})`, icon: FileCheck },
          { key: 'employer-portal', label: 'Employer Portal Demo', icon: Building },
          { key: 'access', label: 'Access Network Support', icon: ShieldCheck },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`networkTabBtn ${activeTab === key ? 'networkTabActive' : ''}`}
            onClick={() => {
              setActiveTab(key as any);
              act(`Micro-Internships: Switched to ${label}`, 5);
            }}
          >
            <Icon size={15} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      <div className="microTabContent">
        {activeTab === 'overview' && (
          <MicroOverview
            onNavigateTab={(tab) => setActiveTab(tab as any)}
            onSelectInternship={(item) => setSelectedDetailInternship(item)}
            recommendedInternships={internships.slice(0, 3)}
            activeProject={sampleActiveProjects[0]}
            act={act}
          />
        )}

        {activeTab === 'listings' && (
          <MicroListings
            internships={internships}
            onSelectInternship={(item) => setSelectedDetailInternship(item)}
            onApplyDirect={(item) => setSelectedApplyInternship(item)}
            act={act}
          />
        )}

        {activeTab === 'workspace' && (
          <ActiveWorkspace
            project={sampleActiveProjects[0]}
            onOpenEmployerReview={() => setEmployerReviewOpen(true)}
            onJumpToFeature={(feature) => go(feature)}
            act={act}
          />
        )}

        {activeTab === 'applications' && (
          <div className="myApplicationsSection">
            <div className="titleRow" style={{ marginBottom: 16 }}>
              <div>
                <p className="eyebrow">APPLICATION TRACKER</p>
                <h1>My Micro-Internship Applications & Status</h1>
                <p className="muted">
                  Track your project proposals, employer feedback decisions, and verified completions.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="card applicationItemCard"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#161926',
                    padding: '14px 18px',
                    borderRadius: 10,
                    border: '1px solid #282f42',
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div className="avatar" style={{ width: 36, height: 36, fontSize: 13 }}>
                      {app.organizationName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <b style={{ fontSize: 14 }}>{app.internshipTitle}</b>
                        <span className={`pill ${getStatusColor(app.status)}`} style={{ fontSize: 9 }}>
                          {app.status}
                        </span>
                      </div>
                      <small style={{ color: '#8e96a8', fontSize: 11 }}>
                        🏢 {app.organizationName} · Target: <b>{app.targetRole}</b> · Applied: {app.appliedDate} · Stipend: <span style={{ color: '#ffd175' }}>{app.stipendAmount}</span>
                      </small>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                      <small style={{ color: '#888fa0', display: 'block', fontSize: 10 }}>Expected Response</small>
                      <b style={{ fontSize: 11, color: '#c4bbff' }}>{app.expectedResponseDate}</b>
                    </div>

                    {app.status === 'Active' && (
                      <button
                        className="primary"
                        style={{ fontSize: 11, padding: '6px 12px' }}
                        onClick={() => setActiveTab('workspace')}
                      >
                        Open Workspace
                      </button>
                    )}
                    {app.status === 'Completed' && (
                      <button
                        className="secondary"
                        style={{ fontSize: 11, padding: '6px 12px' }}
                        onClick={() => setEmployerReviewOpen(true)}
                      >
                        View Employer Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'employer-portal' && (
          <EmployerPortalDemo act={act} />
        )}

        {activeTab === 'access' && (
          <AccessNetworkResources act={act} />
        )}
      </div>

      {/* DETAIL MODAL */}
      {selectedDetailInternship && (
        <MicroDetailModal
          internship={selectedDetailInternship}
          onClose={() => setSelectedDetailInternship(null)}
          onApply={(item) => {
            setSelectedDetailInternship(null);
            setSelectedApplyInternship(item);
          }}
          onJumpToFeature={(feature) => go(feature)}
          act={act}
        />
      )}

      {/* APPLICATION MODAL */}
      {selectedApplyInternship && (
        <ApplicationModal
          internship={selectedApplyInternship}
          onClose={() => setSelectedApplyInternship(null)}
          onSubmitSuccess={handleApplySuccess}
          onJumpToFeature={(feature) => go(feature)}
          act={act}
        />
      )}

      {/* EMPLOYER REVIEW MODAL */}
      {employerReviewOpen && (
        <EmployerReviewModal
          review={sampleEmployerReviews[0]}
          onClose={() => setEmployerReviewOpen(false)}
          onJumpToFeature={(feature) => go(feature)}
          act={act}
        />
      )}
    </div>
  );
};
