import React, { useState } from 'react';
import {
  BookOpen,
  Compass,
  CheckCircle2,
  Sparkles,
  Award,
  ChevronRight,
  ArrowRight,
  Check,
  AlertTriangle,
  RotateCcw,
  FileText,
  Copy,
} from 'lucide-react';
import {
  PlaybookOption,
  PlaybookSimulation,
  playbookSimulationsData,
} from '../../data/networkData';

interface CareerPlaybookProps {
  simulations?: PlaybookSimulation[];
  selectedSimulation?: PlaybookSimulation | null;
  onSelectSimulation?: (sim: PlaybookSimulation) => void;
  act: (msg: string, inc?: number) => void;
}

export const CareerPlaybook: React.FC<CareerPlaybookProps> = ({
  simulations = playbookSimulationsData,
  selectedSimulation,
  act,
}) => {
  const [activeSim, setActiveSim] = useState<PlaybookSimulation>(
    selectedSimulation || simulations[0]
  );
  const [selectedOption, setSelectedOption] = useState<PlaybookOption | null>(null);
  const [completedSimIds, setCompletedSimIds] = useState<string[]>(['pb-1', 'pb-2']);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const completedCount = completedSimIds.length;
  const progressPercent = Math.round((completedCount / simulations.length) * 100);

  const handleSelectSim = (sim: PlaybookSimulation) => {
    setActiveSim(sim);
    setSelectedOption(null);
    setCopiedTemplate(false);
  };

  const handleChooseOption = (option: PlaybookOption) => {
    setSelectedOption(option);
    if (option.score === 'EXCELLENT' && !completedSimIds.includes(activeSim.id)) {
      setCompletedSimIds([...completedSimIds, activeSim.id]);
      act(`Simulation Mastered: ${activeSim.badgeUnlock}!`, 50);
    } else {
      act('Feedback evaluated');
    }
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(activeSim.idealTemplate);
    setCopiedTemplate(true);
    act('Ideal template copied to clipboard');
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="careerPlaybookSection">
      {/* Title */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">THE UNWRITTEN RULES OF TECH CAREERS</p>
          <h1>Career Playbook Simulations</h1>
          <p className="muted">
            Master the professional nuances, cold outreach, and referral etiquette usually learned through elite Tier-1 networks.
          </p>
        </div>

        {/* Progress Card */}
        <div className="card statCard" style={{ padding: '10px 18px', background: '#1c2438' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Award size={22} color="#ffd175" />
            <div>
              <small>Playbook Mastery</small>
              <b style={{ fontSize: 14 }}>{completedCount} of {simulations.length} Mastered ({progressPercent}%)</b>
              <div className="miniProgress" style={{ width: 140, marginTop: 4 }}>
                <i style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Simulation Selector (Left) & Active Simulator (Right) */}
      <div className="playbookLayout">
        {/* Left: Simulation List */}
        <div className="simListColumn">
          <div className="card" style={{ padding: 14 }}>
            <h4 style={{ margin: '0 0 10px', fontSize: 13, color: '#a2aabf' }}>10 Practical Modules</h4>
            <div className="simMenuList">
              {simulations.map((sim, i) => {
                const isSelected = activeSim.id === sim.id;
                const isDone = completedSimIds.includes(sim.id);
                return (
                  <button
                    key={sim.id}
                    className={`simMenuItem ${isSelected ? 'simMenuActive' : ''}`}
                    onClick={() => handleSelectSim(sim)}
                  >
                    <div className="simMenuNum">
                      {isDone ? <Check size={12} color="#86e5b1" /> : i + 1}
                    </div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <span className="simMenuCategory">{sim.category}</span>
                      <b className="simMenuTitle">{sim.title}</b>
                    </div>
                    <ChevronRight size={14} color="#888fa0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Active Simulation Runner */}
        <div className="simRunnerColumn">
          <div className="card simRunnerCard">
            <div className="cardTop">
              <div>
                <span className="pill purple">{activeSim.category}</span>
                <span className="pill" style={{ marginLeft: 6 }}>⏱️ {activeSim.estimatedMinutes} min</span>
              </div>

              {completedSimIds.includes(activeSim.id) && (
                <span className="pill green">
                  <Check size={11} style={{ marginRight: 4 }} /> Mastered · Badge Earned
                </span>
              )}
            </div>

            <h2 style={{ fontSize: 21, margin: '14px 0 8px' }}>{activeSim.title}</h2>

            <div className="simContextBox">
              <Compass size={16} color="#9d8cff" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: 12, margin: 0, color: '#d1d6e6', lineHeight: 1.5 }}>
                <b>Context & Hidden Rule:</b> {activeSim.context}
              </p>
            </div>

            <div className="scenarioBox">
              <h4 style={{ margin: '0 0 6px', color: '#ffd175', fontSize: 12 }}>SCENARIO:</h4>
              <p style={{ fontSize: 13, color: '#fff', margin: 0, fontWeight: 600 }}>
                {activeSim.scenario}
              </p>
            </div>

            {/* Options Selection */}
            <h4 style={{ margin: '18px 0 10px', fontSize: 13 }}>Choose the highest-signal approach:</h4>

            <div className="optionsList">
              {activeSim.options.map((opt, i) => {
                const isPicked = selectedOption?.id === opt.id;
                return (
                  <div
                    key={opt.id}
                    className={`optionCard ${isPicked ? (opt.score === 'EXCELLENT' ? 'optionExcellent' : opt.score === 'POOR' ? 'optionPoor' : 'optionSuboptimal') : ''}`}
                    onClick={() => handleChooseOption(opt)}
                  >
                    <div className="optionLetter">{['A', 'B', 'C'][i]}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, margin: 0, color: '#e7ecf8' }}>{opt.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Immediate Evaluation & Feedback */}
            {selectedOption && (
              <div className={`feedbackBox ${selectedOption.score === 'EXCELLENT' ? 'feedbackGood' : selectedOption.score === 'POOR' ? 'feedbackBad' : 'feedbackWarn'}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  {selectedOption.score === 'EXCELLENT' ? (
                    <CheckCircle2 size={16} color="#86e5b1" />
                  ) : (
                    <AlertTriangle size={16} color="#ffd175" />
                  )}
                  <b>
                    {selectedOption.score === 'EXCELLENT'
                      ? 'Exemplary Choice! (+50 XP)'
                      : selectedOption.score === 'POOR'
                      ? 'Suboptimal — High risk of being ignored'
                      : 'Needs Refinement'}
                  </b>
                </div>
                <p style={{ fontSize: 12, margin: 0, lineHeight: 1.5 }}>
                  {selectedOption.feedback}
                </p>
              </div>
            )}

            {/* World-Class Ideal Template */}
            <div className="idealTemplateCard">
              <div className="cardTop" style={{ marginBottom: 8 }}>
                <h4 style={{ margin: 0, color: '#c4b8ff', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Sparkles size={14} /> World-Class Reference Template
                </h4>
                <button className="secondary" style={{ fontSize: 10, padding: '3px 8px', height: 'auto' }} onClick={handleCopyTemplate}>
                  <Copy size={11} /> {copiedTemplate ? 'Copied!' : 'Copy Template'}
                </button>
              </div>

              <pre className="templatePre">{activeSim.idealTemplate}</pre>
            </div>

            {/* Real World Action Checklist */}
            <div className="checklistCard">
              <h4 style={{ margin: '0 0 8px', fontSize: 12, color: '#86e5b1' }}>✓ Real-World Action Checklist</h4>
              <div style={{ display: 'grid', gap: 6, fontSize: 12, color: '#c7cbe0' }}>
                {activeSim.realWorldActionChecklist.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#1c382b', color: '#86e5b1', display: 'grid', placeItems: 'center', fontSize: 9 }}>✓</div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unlocked Badge Banner */}
            <div className="badgeUnlockBanner">
              <Award size={18} color="#ffd175" />
              <span>
                <b>Mastery Badge:</b> {activeSim.badgeUnlock} {completedSimIds.includes(activeSim.id) ? ' (Unlocked & Added to Profile)' : ' (Complete module with excellent score to earn)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
