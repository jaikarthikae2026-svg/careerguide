import React, { useState } from 'react';
import {
  Layers,
  Users,
  Target,
  Globe,
  Compass,
  Briefcase,
  LayoutDashboard,
} from 'lucide-react';
import { NetworkOverview } from './NetworkOverview';
import { CareerPods } from './CareerPods';
import { MentorsAlumni } from './MentorsAlumni';
import { Opportunities } from './Opportunities';
import { CareerPlaybook } from './CareerPlaybook';
import { Showcase } from './Showcase';
import { MicroInternships } from '../MicroInternships/MicroInternships';
import {
  careerPodsData,
  CareerPod,
  employerOpportunitiesData,
  EmployerOpportunity,
  mentorsData,
  Mentor,
  playbookSimulationsData,
  PlaybookSimulation,
  sampleVerifiedProjects,
} from '../../data/networkData';

interface CareerNetworkProps {
  go: (page: any) => void;
  act: (msg: string, inc?: number) => void;
}

export const CareerNetwork: React.FC<CareerNetworkProps> = ({ go, act }) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'pods' | 'mentors' | 'micro-internships' | 'opportunities' | 'playbook' | 'showcase'
  >('overview');

  const [pods, setPods] = useState<CareerPod[]>(careerPodsData);
  const [myPod, setMyPod] = useState<CareerPod | null>(careerPodsData[0]);
  const [selectedPlaybookSim, setSelectedPlaybookSim] = useState<PlaybookSimulation | null>(null);

  const topMentor = mentorsData[0];
  const recommendedPod = careerPodsData[0];
  const topOpportunity = employerOpportunitiesData[0];
  const upcomingOfficeHour = employerOpportunitiesData[3];
  const recommendedPlaybook = playbookSimulationsData[0];

  const handleJoinPod = (pod: CareerPod) => {
    setMyPod(pod);
  };

  const handleSelectPodFromOverview = (pod: CareerPod) => {
    setActiveTab('pods');
  };

  const handleSelectOppFromOverview = (opp: EmployerOpportunity) => {
    setActiveTab('opportunities');
  };

  const handleSelectPlaybookFromOverview = (sim: PlaybookSimulation) => {
    setSelectedPlaybookSim(sim);
    setActiveTab('playbook');
  };

  const handleRequestMentorFromOverview = (mentor: Mentor) => {
    setActiveTab('mentors');
  };

  return (
    <div className="careerNetworkContainer">
      {/* Top Segmented Tab Navigation */}
      <div className="networkTopTabsBar">
        {[
          { key: 'overview', label: 'Overview', icon: LayoutDashboard },
          { key: 'pods', label: 'Career Pods', icon: Target },
          { key: 'mentors', label: 'Mentors & Alumni', icon: Users },
          { key: 'micro-internships', label: 'Micro-Internships', icon: Briefcase },
          { key: 'opportunities', label: 'Employer Challenges', icon: Layers },
          { key: 'playbook', label: 'Career Playbook', icon: Compass },
          { key: 'showcase', label: 'Showcase', icon: Globe },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`networkTabBtn ${activeTab === key ? 'networkTabActive' : ''}`}
            onClick={() => {
              setActiveTab(key as any);
              act(`Career Network: Switched to ${label}`, 5);
            }}
          >
            <Icon size={15} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      <div className="networkTabContent">
        {activeTab === 'overview' && (
          <NetworkOverview
            onNavigateTab={(tab) => setActiveTab(tab as any)}
            onRequestMentor={handleRequestMentorFromOverview}
            onSelectPod={handleSelectPodFromOverview}
            onSelectOpportunity={handleSelectOppFromOverview}
            onSelectPlaybook={handleSelectPlaybookFromOverview}
            topMentor={topMentor}
            recommendedPod={recommendedPod}
            topOpportunity={topOpportunity}
            upcomingOfficeHour={upcomingOfficeHour}
            recommendedPlaybook={recommendedPlaybook}
            act={act}
          />
        )}

        {activeTab === 'pods' && (
          <CareerPods
            pods={pods}
            myPod={myPod}
            onJoinPod={handleJoinPod}
            act={act}
          />
        )}

        {activeTab === 'mentors' && (
          <MentorsAlumni
            mentors={mentorsData}
            onRequestGuidance={handleRequestMentorFromOverview}
            onJumpToFeature={(feature) => go(feature)}
            act={act}
          />
        )}

        {activeTab === 'micro-internships' && (
          <MicroInternships go={go} act={act} />
        )}

        {activeTab === 'opportunities' && (
          <Opportunities
            opportunities={employerOpportunitiesData}
            act={act}
          />
        )}

        {activeTab === 'playbook' && (
          <CareerPlaybook
            simulations={playbookSimulationsData}
            selectedSimulation={selectedPlaybookSim}
            onSelectSimulation={(sim) => setSelectedPlaybookSim(sim)}
            act={act}
          />
        )}

        {activeTab === 'showcase' && (
          <Showcase
            studentName="Divya"
            projects={sampleVerifiedProjects}
            act={act}
          />
        )}
      </div>
    </div>
  );
};
