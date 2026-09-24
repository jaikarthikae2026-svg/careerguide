import React from 'react';
import {
  User,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Building,
  LogOut,
  ChevronDown,
  Sparkles,
  Award,
} from 'lucide-react';
import { UserProfile, UserRole } from '../../api';

interface RoleSwitcherBarProps {
  currentUser: UserProfile;
  onSwitchRole: (role: UserRole) => void;
  onOpenAuthModal: () => void;
  onOpenOnboarding: () => void;
  onLogout: () => void;
  act: (msg: string, inc?: number) => void;
}

export const RoleSwitcherBar: React.FC<RoleSwitcherBarProps> = ({
  currentUser,
  onSwitchRole,
  onOpenAuthModal,
  onOpenOnboarding,
  onLogout,
  act,
}) => {
  const getRoleTone = (role: UserRole) => {
    switch (role) {
      case 'platform_admin':
        return 'orange';
      case 'recruiter':
      case 'employer_admin':
        return 'purple';
      case 'mentor':
      case 'alumni':
        return 'green';
      default:
        return 'green';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'platform_admin':
        return ShieldCheck;
      case 'recruiter':
      case 'employer_admin':
        return Building;
      case 'mentor':
      case 'alumni':
        return Briefcase;
      default:
        return GraduationCap;
    }
  };

  const RoleIcon = getRoleIcon(currentUser.role);

  return (
    <div
      className="roleSwitcherHeaderBar"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#121420',
        borderBottom: '1px solid #23283a',
        padding: '6px 20px',
        fontSize: 11,
        color: '#c7cbde',
        flexWrap: 'wrap',
        gap: 8,
      }}
    >
      {/* Left: User Context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="avatar" style={{ width: 26, height: 26, fontSize: 10, background: '#252044', color: '#a89bff' }}>
          {currentUser.fullName.slice(0, 2).toUpperCase()}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <b style={{ color: '#f0edff', fontSize: 12 }}>{currentUser.fullName}</b>
          <span className={`pill ${getRoleTone(currentUser.role)}`} style={{ fontSize: 9 }}>
            <RoleIcon size={10} style={{ marginRight: 3 }} />
            {currentUser.role.toUpperCase()}
          </span>
          {currentUser.studentProfile && (
            <span className="pill purple" style={{ fontSize: 9 }}>
              Level {currentUser.studentProfile.currentLevel} · {currentUser.studentProfile.xp} XP
            </span>
          )}
        </div>
      </div>

      {/* Right: Quick Role Switcher Dropdown & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#888fa0', fontSize: 10 }}>Active Persona:</span>
        <select
          className="filterSelect"
          style={{ fontSize: 10, padding: '3px 8px', height: 'auto', background: '#171a28' }}
          value={currentUser.role}
          onChange={(e: any) => {
            onSwitchRole(e.target.value);
            act(`Switched context to ${e.target.value} persona`, 5);
          }}
        >
          <option value="student">🎓 Student (Divya)</option>
          <option value="mentor">💼 Mentor (Sneha Roy - MSFT)</option>
          <option value="recruiter">🏢 Recruiter (Vikram - TechNova)</option>
          <option value="platform_admin">🛡️ Platform Administrator</option>
        </select>

        {currentUser.role === 'student' && (
          <button
            type="button"
            className="secondary"
            style={{ fontSize: 10, padding: '3px 8px', height: 'auto' }}
            onClick={onOpenOnboarding}
          >
            <Sparkles size={11} /> Recalibrate Diagnostic
          </button>
        )}

        <button
          type="button"
          className="secondary"
          style={{ fontSize: 10, padding: '3px 8px', height: 'auto' }}
          onClick={onOpenAuthModal}
        >
          Switch User / Sign In
        </button>
      </div>
    </div>
  );
};
