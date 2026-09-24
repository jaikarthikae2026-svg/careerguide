import React, { useState } from 'react';
import {
  TrendingUp,
  Layers,
  Sparkles,
  Award,
  FileCheck,
  LayoutDashboard,
} from 'lucide-react';
import { AnalyticsOverview } from './AnalyticsOverview';
import { ApplicationFunnelView } from './ApplicationFunnelView';
import { RejectionIntelligenceView } from './RejectionIntelligenceView';
import { ImprovementPlanView } from './ImprovementPlanView';
import { ApplicationTrackerView } from './ApplicationTrackerView';
import { ApplicationDetailModal } from './ApplicationDetailModal';
import {
  JobApplication,
  sampleApplicationsData,
} from '../../data/rejectionIntelligenceData';

interface ReadinessAnalyticsProps {
  readiness?: number;
  initialTab?: 'overview' | 'funnel' | 'rejection-intelligence' | 'plan' | 'tracker';
  go: (page: any) => void;
  act: (msg: string, inc?: number) => void;
}

export const ReadinessAnalytics: React.FC<ReadinessAnalyticsProps> = ({
  readiness = 69,
  initialTab = 'overview',
  go,
  act,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'funnel' | 'rejection-intelligence' | 'plan' | 'tracker'
  >(initialTab);

  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  return (
    <div className="readinessAnalyticsContainer">
      {/* Top Segmented Tabs Navigation */}
      <div className="networkTopTabsBar">
        {[
          { key: 'overview', label: 'Overview', icon: LayoutDashboard },
          { key: 'funnel', label: 'Application Funnel', icon: Layers },
          { key: 'rejection-intelligence', label: 'Rejection Intelligence', icon: Sparkles },
          { key: 'plan', label: 'Improvement Plan', icon: Award },
          { key: 'tracker', label: 'Application Tracker (18)', icon: FileCheck },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`networkTabBtn ${activeTab === key ? 'networkTabActive' : ''}`}
            onClick={() => {
              setActiveTab(key as any);
              act(`Readiness Analytics: Switched to ${label}`, 5);
            }}
          >
            <Icon size={15} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      <div className="analyticsTabContent">
        {activeTab === 'overview' && (
          <AnalyticsOverview
            readiness={readiness}
            onNavigateTab={(tab) => setActiveTab(tab as any)}
            act={act}
          />
        )}

        {activeTab === 'funnel' && (
          <ApplicationFunnelView
            onSelectApplication={(app) => setSelectedApplication(app)}
            act={act}
          />
        )}

        {activeTab === 'rejection-intelligence' && (
          <RejectionIntelligenceView
            onStartImprovementPlan={() => setActiveTab('plan')}
            onOpenAddApplication={() => setActiveTab('tracker')}
            onJumpToFeature={(feature) => go(feature)}
            act={act}
          />
        )}

        {activeTab === 'plan' && (
          <ImprovementPlanView
            onJumpToFeature={(feature) => go(feature)}
            act={act}
          />
        )}

        {activeTab === 'tracker' && (
          <ApplicationTrackerView
            onSelectApplication={(app) => setSelectedApplication(app)}
            act={act}
          />
        )}
      </div>

      {/* Application Post-Mortem Detail Modal */}
      {selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onStartImprovementPlan={() => {
            setSelectedApplication(null);
            setActiveTab('plan');
          }}
          onJumpToFeature={(feature) => go(feature)}
          act={act}
        />
      )}
    </div>
  );
};
