import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { careerApi, UserRole, UserProfile } from '../../api';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  onOpenOnboarding: () => void;
  act: (msg: string, inc?: number) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  onLoginSuccess,
  onOpenOnboarding,
  act,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await careerApi.login(email, password);
        onLoginSuccess(res.user);
        act(`Welcome back, ${res.user.fullName}!`, 10);
        onClose();
      } else {
        const res = await careerApi.register({
          name,
          email,
          password,
          role: selectedRole,
        });
        onLoginSuccess(res.user);
        act(`Account created successfully for ${res.user.fullName}!`, 30);
        onClose();
        if (selectedRole === 'student') {
          onOpenOnboarding();
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role: UserRole) => {
    setLoading(true);
    try {
      const res = await careerApi.loginDemo(role);
      onLoginSuccess(res.user);
      act(`Logged in as ${res.user.fullName} (${role})`, 10);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profileModalOverlay" onClick={onClose}>
      <div
        className="profileModal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 520 }}
      >
        <div className="profileModalHeader">
          <div>
            <p className="eyebrow">CAREEROS IDENTITY & AUTHENTICATION</p>
            <h2 style={{ fontSize: 20, margin: 0 }}>
              {mode === 'login' ? 'Sign in to CareerOS' : 'Create Student Account'}
            </h2>
          </div>
          <button className="icon" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: 10, margin: '14px 0', borderBottom: '1px solid #282f42', paddingBottom: 10 }}>
          <button
            type="button"
            className={mode === 'login' ? 'primary' : 'secondary'}
            style={{ fontSize: 12, padding: '6px 14px' }}
            onClick={() => {
              setMode('login');
              setError('');
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'primary' : 'secondary'}
            style={{ fontSize: 12, padding: '6px 14px' }}
            onClick={() => {
              setMode('register');
              setError('');
            }}
          >
            Create New Account
          </button>
        </div>

        {error && (
          <div style={{ background: '#401f26', border: '1px solid #b7424d', padding: '8px 12px', borderRadius: 8, color: '#ffd1d5', fontSize: 12, marginBottom: 12 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              <div className="profileField" style={{ marginBottom: 10 }}>
                <span>Full Name</span>
                <input
                  placeholder="e.g. Divya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="profileField" style={{ marginBottom: 10 }}>
                <span>Account Role</span>
                <select
                  className="filterSelect"
                  value={selectedRole}
                  onChange={(e: any) => setSelectedRole(e.target.value)}
                >
                  <option value="student">Student / Placement Candidate</option>
                  <option value="mentor">Industry Mentor</option>
                  <option value="alumni">College Alumni</option>
                  <option value="recruiter">Employer / Recruiter</option>
                  <option value="platform_admin">Platform Administrator</option>
                </select>
              </div>
            </>
          )}

          <div className="profileField" style={{ marginBottom: 10 }}>
            <span>Email Address</span>
            <input
              type="email"
              placeholder="e.g. divya@careeros.demo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="profileField" style={{ marginBottom: 14 }}>
            <span>Password</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="profileActions" style={{ marginBottom: 16 }}>
            <button type="button" className="secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="primary" type="submit" disabled={loading}>
              {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In' : 'Register & Start Onboarding'}
            </button>
          </div>
        </form>

        {/* Quick Demo Logins Bar */}
        <div style={{ borderTop: '1px solid #282f42', paddingTop: 12 }}>
          <small style={{ color: '#8e96a8', display: 'block', marginBottom: 8, fontSize: 11 }}>
            ⚡ Instant Role Preview Logins (Click to switch context):
          </small>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="secondary"
              style={{ fontSize: 10, padding: '4px 8px' }}
              onClick={() => handleQuickDemo('student')}
            >
              🎓 Student (Divya)
            </button>
            <button
              type="button"
              className="secondary"
              style={{ fontSize: 10, padding: '4px 8px' }}
              onClick={() => handleQuickDemo('mentor')}
            >
              💼 Mentor (Sneha Roy)
            </button>
            <button
              type="button"
              className="secondary"
              style={{ fontSize: 10, padding: '4px 8px' }}
              onClick={() => handleQuickDemo('recruiter')}
            >
              🏢 Recruiter (Vikram)
            </button>
            <button
              type="button"
              className="secondary"
              style={{ fontSize: 10, padding: '4px 8px' }}
              onClick={() => handleQuickDemo('platform_admin')}
            >
              🛡️ Admin (Platform)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
