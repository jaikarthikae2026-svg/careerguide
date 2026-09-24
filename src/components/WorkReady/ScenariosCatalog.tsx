import React, { useState } from 'react';
import {
  Briefcase,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Layers,
  Sparkles,
  Calendar,
  AlertTriangle,
  User,
  Building,
} from 'lucide-react';
import {
  RoleTrack,
  ScenarioCategory,
  SimulationPhase,
  WorkplaceScenario,
  workplaceScenariosData,
} from '../../data/workReadyData';

interface ScenariosCatalogProps {
  scenarios?: WorkplaceScenario[];
  onSelectScenario: (scenario: WorkplaceScenario) => void;
  act: (msg: string, inc?: number) => void;
}

export const ScenariosCatalog: React.FC<ScenariosCatalogProps> = ({
  scenarios = workplaceScenariosData,
  onSelectScenario,
  act,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedPhase, setSelectedPhase] = useState<string>('ALL');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { key: string; label: string }[] = [
    { key: 'ALL', label: 'All 9 Categories' },
    { key: 'First Day & Onboarding', label: '👋 Onboarding & Norms' },
    { key: 'Communication', label: '💬 Communication' },
    { key: 'Task Ownership', label: '🎯 Task Ownership' },
    { key: 'Feedback', label: '🔄 Feedback & Reviews' },
    { key: 'Teamwork', label: '🤝 Teamwork & Alignment' },
    { key: 'Meetings', label: '🎙️ Standups & Demos' },
    { key: 'Mistakes & Problem-Solving', label: '🚨 Incident Response' },
    { key: 'Prioritization', label: '⚖️ Prioritization' },
    { key: 'Remote & Hybrid Work', label: '🌐 Async Remote' },
  ];

  const filteredScenarios = scenarios.filter((sc) => {
    if (selectedCategory !== 'ALL' && sc.category !== selectedCategory) return false;
    if (selectedPhase !== 'ALL' && sc.phase !== selectedPhase) return false;
    if (selectedRole !== 'ALL' && sc.roleTrack !== selectedRole) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        sc.title.toLowerCase().includes(q) ||
        sc.context.toLowerCase().includes(q) ||
        sc.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="scenariosCatalogSection">
      {/* Title */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">WORKPLACE DECISION SIMULATIONS</p>
          <h1>Interactive Scenarios Catalog</h1>
          <p className="muted">
            30 real-world workplace scenarios designed to build instinctual communication, task ownership, and leadership habits.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="filterToolbar card" style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            className="filterSelect"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>

          <select
            className="filterSelect"
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
          >
            <option value="ALL">All 30-60-90 Day Phases</option>
            <option value="Days 1–30: Adapt">Days 1–30: Adapt</option>
            <option value="Days 31–60: Contribute">Days 31–60: Contribute</option>
            <option value="Days 61–90: Demonstrate Ownership">Days 61–90: Demonstrate Ownership</option>
          </select>

          <select
            className="filterSelect"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="ALL">All Role Tracks</option>
            <option value="Junior Software Developer">Junior Software Developer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Product Management Intern">Product Management Intern</option>
          </select>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 200 }}>
            <Search size={14} color="#888fa0" />
            <input
              className="filterSearchInput"
              style={{ width: '100%' }}
              placeholder="Search scenarios (e.g. deadline, standup, PR feedback)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="podCardsGrid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {filteredScenarios.map((sc) => (
          <div className="card scenarioCatalogCard" key={sc.id}>
            <div className="cardTop">
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span className="pill purple">{sc.category}</span>
                <span className="pill" style={{ fontSize: 9 }}>Day {sc.simulatedDay}</span>
              </div>
              {sc.isCompleted ? (
                <span className="pill green" style={{ fontSize: 9 }}>
                  <CheckCircle2 size={11} style={{ marginRight: 2 }} /> Completed ({sc.scoreEarned}%)
                </span>
              ) : (
                <span className="pill orange" style={{ fontSize: 9 }}>
                  ⏱️ {sc.durationMinutes} mins · {sc.difficulty}
                </span>
              )}
            </div>

            <h3 style={{ fontSize: 16, margin: '12px 0 6px', color: '#f0edff' }}>{sc.title}</h3>
            <p className="muted" style={{ fontSize: 12, lineHeight: 1.5, minHeight: 48 }}>
              {sc.context}
            </p>

            <div className="scenarioMetaBar">
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 11, color: '#9fa7ba' }}>
                <Building size={12} />
                <span>{sc.companyName}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 11, color: '#9fa7ba' }}>
                <User size={12} />
                <span>{sc.roleTrack}</span>
              </div>
            </div>

            <div className="charactersRow">
              <small style={{ color: '#888fa0', marginRight: 6 }}>Characters:</small>
              {sc.charactersInvolved.map((c) => (
                <span key={c.name} className="charTag">
                  👤 {c.name} ({c.role})
                </span>
              ))}
            </div>

            <div className="buttonRow" style={{ margin: '14px 0 0' }}>
              <button
                className="primary full"
                onClick={() => {
                  onSelectScenario(sc);
                  act(`Launched scenario: ${sc.title}`, 15);
                }}
              >
                {sc.isCompleted ? 'Replay Simulation' : 'Launch Simulation'} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
