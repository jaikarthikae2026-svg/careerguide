import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Award,
  Layers,
  ArrowRight,
  Wifi,
  Laptop,
  Cloud,
  Check,
} from 'lucide-react';
import {
  AccessResource,
  accessNetworkResourcesData,
} from '../../data/microInternshipData';

interface AccessNetworkResourcesProps {
  resources?: AccessResource[];
  act: (msg: string, inc?: number) => void;
}

export const AccessNetworkResources: React.FC<AccessNetworkResourcesProps> = ({
  resources = accessNetworkResourcesData,
  act,
}) => {
  const [resourceList, setResourceList] = useState<AccessResource[]>(resources);

  const handleToggleActivate = (id: string) => {
    setResourceList((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const newActive = !r.isActivated;
          act(
            newActive
              ? `Activated Access Resource: ${r.name}!`
              : `Deactivated Access Resource: ${r.name}`,
            15
          );
          return { ...r, isActivated: newActive };
        }
        return r;
      })
    );
  };

  return (
    <div className="accessNetworkResourcesSection">
      {/* Title */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">ACCESS NETWORK INFRASTRUCTURE SUPPORT</p>
          <h1>Tools, Software & Workspace Credits</h1>
          <p className="muted">
            Eliminate financial and resource barriers. Activate free professional software licenses, high-speed Wi-Fi co-working spaces, and cloud credits for your micro-internships.
          </p>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="podCardsGrid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {resourceList.map((res) => (
          <div className="card accessResourceCard" key={res.id}>
            <div className="cardTop">
              <span className="pill purple">{res.category}</span>
              {res.isActivated ? (
                <span className="pill green" style={{ fontSize: 9 }}>
                  <CheckCircle2 size={11} style={{ marginRight: 2 }} /> Active
                </span>
              ) : (
                <span className="pill" style={{ fontSize: 9, opacity: 0.7 }}>Available</span>
              )}
            </div>

            <h3 style={{ fontSize: 16, margin: '10px 0 4px', color: '#f0edff' }}>{res.name}</h3>
            <small style={{ color: '#86e5b1', display: 'block', marginBottom: 8, fontSize: 11 }}>
              Provided by <b>{res.provider}</b>
            </small>

            <p style={{ fontSize: 12, color: '#c7cbde', lineHeight: 1.5, minHeight: 40, margin: '0 0 10px' }}>
              {res.description}
            </p>

            <div style={{ background: '#131520', padding: '6px 10px', borderRadius: 6, fontSize: 10, color: '#ffd175', marginBottom: 12 }}>
              <b>Benefit:</b> {res.valueDescription}
            </div>

            <div className="buttonRow" style={{ margin: 0 }}>
              <button
                className={res.isActivated ? 'secondary full' : 'primary full'}
                onClick={() => handleToggleActivate(res.id)}
              >
                {res.isActivated ? '✓ Resource Activated (Ready to Use)' : 'Activate Free Access Support'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
