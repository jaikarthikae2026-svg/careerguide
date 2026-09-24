import React, { useState } from 'react';
import {
  Briefcase,
  Layers,
  TrendingUp,
  Users,
  Award,
  LayoutDashboard,
  Play,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { WorkReadyOverview } from './WorkReadyOverview';
import { SimulationWorkspace } from './SimulationWorkspace';
import { ScenariosCatalog } from './ScenariosCatalog';
import { WorkplaceSkills } from './WorkplaceSkills';
import { PodRoleplay } from './PodRoleplay';
import { WorkReadyReport } from './WorkReadyReport';
import {
  workplaceScenariosData,
  WorkplaceScenario,
  workplaceSkillsData,
  initialWorkReadyReport,
} from '../../data/workReadyData';

interface WorkReadyProps {
  go: (page: any) => void;
  act: (msg: string, inc?: number) => void;
}

export const WorkReady: React.FC<WorkReadyProps> = ({ go, act }) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'simulator' | 'catalog' | 'skills' | 'roleplay' | 'report'
  >('overview');

  const [activeScenario, setActiveScenario] = useState<WorkplaceScenario>(
    workplaceScenariosData[0]
  );
  const [scenarios, setScenarios] = useState<WorkplaceScenario[]>(workplaceScenariosData);

  const handleLaunchScenario = (sc: WorkplaceScenario) => {
    setActiveScenario(sc);
    setActiveTab('simulator');
  };

  const handleScenarioCompleted = (scenarioId: string, score: number) => {
    setScenarios((prev) =>
      prev.map((s) =>
        s.id === scenarioId ? { ...s, isCompleted: true, scoreEarned: score } : s
      )
    );
  };

  return (
    <div className="workReadyContainer">
      {/* Top Segmented Tabs Navigation */}
      <div className="networkTopTabsBar">
        {[
          { key: 'overview', label: 'Overview', icon: LayoutDashboard },
          { key: 'simulator', label: 'Workplace Simulator', icon: Briefcase },
          { key: 'catalog', label: 'Scenario Catalog (30)', icon: Layers },
          { key: 'skills', label: 'Workplace Skills', icon: TrendingUp },
          { key: 'roleplay', label: 'Pod Peer Roleplay', icon: Users },
          { key: 'report', label: '90-Day Transition Report', icon: Award },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`networkTabBtn ${activeTab === key ? 'networkTabActive' : ''}`}
            onClick={() => {
              setActiveTab(key as any);
              act(`WorkReady: Switched to ${label}`, 5);
            }}
          >
            <Icon size={15} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      <div className="workReadyTabContent">
        {activeTab === 'overview' && (
          <WorkReadyOverview
            onNavigateTab={(tab) => setActiveTab(tab as any)}
            onLaunchScenario={handleLaunchScenario}
            nextRecommendedScenario={scenarios[0]}
            act={act}
          />
        )}

        {activeTab === 'simulator' && (
          <SimulationWorkspace
            scenario={activeScenario}
            onScenarioCompleted={handleScenarioCompleted}
            act={act}
          />
        )}

        {activeTab === 'catalog' && (
          <ScenariosCatalog
            scenarios={scenarios}
            onSelectScenario={handleLaunchScenario}
            act={act}
          />
        )}

        {activeTab === 'skills' && (
          <WorkplaceSkills
            skills={workplaceSkillsData}
            onJumpToFeature={(feature) => go(feature)}
            act={act}
          />
        )}

        {activeTab === 'roleplay' && (
          <PodRoleplay
            act={act}
          />
        )}

        {activeTab === 'report' && (
          <WorkReadyReport
            report={initialWorkReadyReport}
            act={act}
          />
        )}
      </div>
    </div>
  );
};
