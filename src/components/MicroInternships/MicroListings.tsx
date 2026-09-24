import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Award,
  DollarSign,
  Building,
  User,
  Layers,
  MapPin,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import {
  CompensationType,
  MicroInternship,
  microInternshipsData,
} from '../../data/microInternshipData';

interface MicroListingsProps {
  internships?: MicroInternship[];
  onSelectInternship: (internship: MicroInternship) => void;
  onApplyDirect: (internship: MicroInternship) => void;
  act: (msg: string, inc?: number) => void;
}

export const MicroListings: React.FC<MicroListingsProps> = ({
  internships = microInternshipsData,
  onSelectInternship,
  onApplyDirect,
  act,
}) => {
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [compensationFilter, setCompensationFilter] = useState<string>('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('ALL');
  const [workModeFilter, setWorkModeFilter] = useState<string>('ALL');
  const [beginnerOnly, setBeginnerOnly] = useState<boolean>(false);
  const [interviewOnly, setInterviewOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredListings = internships.filter((item) => {
    if (roleFilter !== 'ALL' && item.targetRole !== roleFilter) return false;
    if (compensationFilter !== 'ALL' && item.compensationType !== compensationFilter) return false;
    if (difficultyFilter !== 'ALL' && item.difficulty !== difficultyFilter) return false;
    if (workModeFilter !== 'ALL' && item.workMode !== workModeFilter) return false;
    if (beginnerOnly && !item.isBeginnerFriendly) return false;
    if (interviewOnly && !item.offersInterviewConsideration) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.organization.name.toLowerCase().includes(q) ||
        item.targetRole.toLowerCase().includes(q) ||
        item.requiredSkills.some((s) => s.name.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="microListingsSection">
      {/* Title */}
      <div className="titleRow" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow">EMPLOYER-REVIEWED OPPORTUNITIES</p>
          <h1>Explore Verified Micro-Internships</h1>
          <p className="muted">
            Filter short, high-signal business deliverables. All projects include supervisor feedback and verified Career Passport credentials.
          </p>
        </div>

        <div className="trustBadgeBanner">
          <ShieldCheck size={14} color="#86e5b1" />
          <span style={{ fontSize: 11, color: '#d8fae8' }}>
            <b>100% Verified Employers</b> · No application fees · Guaranteed review
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="card filterToolbar" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            className="filterSelect"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="ALL">All Target Roles</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Junior Frontend Developer">Junior Frontend Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Digital Marketing Associate">Digital Marketing Associate</option>
          </select>

          <select
            className="filterSelect"
            value={compensationFilter}
            onChange={(e) => setCompensationFilter(e.target.value)}
          >
            <option value="ALL">All Compensation Types</option>
            <option value="Paid">Paid Stipend</option>
            <option value="Sponsored">Sponsored Grant</option>
            <option value="Certificate only">Certificate Only</option>
          </select>

          <select
            className="filterSelect"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="ALL">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            className="filterSelect"
            value={workModeFilter}
            onChange={(e) => setWorkModeFilter(e.target.value)}
          >
            <option value="ALL">All Work Modes</option>
            <option value="Remote">Remote Only</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#c7cbde', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={beginnerOnly}
                onChange={(e) => setBeginnerOnly(e.target.checked)}
              />
              Beginner Friendly
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#c7cbde', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={interviewOnly}
                onChange={(e) => setInterviewOnly(e.target.checked)}
              />
              Interview Consideration
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 220 }}>
            <Search size={14} color="#888fa0" />
            <input
              className="filterSearchInput"
              style={{ width: '100%' }}
              placeholder="Search by title, skill, or organization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="opportunitiesGrid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        {filteredListings.map((internship) => (
          <div className="card opportunityCard microCard" key={internship.id}>
            <div className="cardTop" style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span className="pill green" style={{ fontSize: 9 }}>
                  {internship.studentMatchPercentage}% Match
                </span>
                <span className="pill purple" style={{ fontSize: 9 }}>
                  {internship.targetRole}
                </span>
              </div>
              <span className="pill orange" style={{ fontSize: 9, fontWeight: 700 }}>
                {internship.stipendAmount}
              </span>
            </div>

            <h3 style={{ fontSize: 17, margin: '6px 0', color: '#f0edff', lineHeight: 1.35 }}>
              {internship.title}
            </h3>

            {/* Organization row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '6px 0 10px' }}>
              <div className="avatar" style={{ width: 26, height: 26, fontSize: 10 }}>
                {internship.organization.logo}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <b style={{ fontSize: 12 }}>{internship.organization.name}</b>
                  {internship.organization.isVerified && (
                    <span className="pill green" style={{ fontSize: 8, padding: '1px 5px' }}>
                      <ShieldCheck size={10} style={{ marginRight: 2 }} /> Verified
                    </span>
                  )}
                </div>
                <small style={{ color: '#8e96a8', fontSize: 10 }}>
                  {internship.organization.location} · {internship.organization.industry}
                </small>
              </div>
            </div>

            <p style={{ fontSize: 12, color: '#c7cbde', lineHeight: 1.5, margin: '8px 0 12px', minHeight: 42 }}>
              {internship.description}
            </p>

            {/* Meta Tags Row */}
            <div className="opportunityMetaGrid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 11, color: '#a2aabf', background: '#131622', padding: 10, borderRadius: 8, marginBottom: 12 }}>
              <div>⏱️ <b>Duration:</b> {internship.durationLabel} ({internship.weeklyTimeCommitment})</div>
              <div>📍 <b>Mode:</b> {internship.workMode}</div>
              <div>👥 <b>Seats:</b> {internship.availableSeats} available</div>
              <div>⏰ <b>Deadline:</b> {internship.deadline}</div>
            </div>

            {/* Required Skills */}
            <div className="podTags" style={{ marginBottom: 14 }}>
              {internship.requiredSkills.map((s) => (
                <span key={s.name} className="pill" style={{ fontSize: 9 }}>
                  {s.name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="buttonRow" style={{ margin: 0 }}>
              <button
                className="secondary"
                style={{ flex: 1 }}
                onClick={() => {
                  onSelectInternship(internship);
                  act(`Opened detail view for ${internship.title}`);
                }}
              >
                View Details
              </button>
              <button
                className="primary"
                style={{ flex: 1.2 }}
                onClick={() => {
                  onApplyDirect(internship);
                  act(`Started application for ${internship.title}`, 15);
                }}
              >
                Apply for Project <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
