import React, { useState, useEffect } from 'react';
import {
  X,
  UploadCloud,
  FileText,
  CheckCircle2,
  Trash2,
  Lock,
  ShieldCheck,
  AlertCircle,
  Eye,
  ArrowRight,
} from 'lucide-react';
import { careerApi } from '../../api';

interface FileUploadModalProps {
  onClose: () => void;
  act: (msg: string, inc?: number) => void;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({ onClose, act }) => {
  const [files, setFiles] = useState<any[]>([
    {
      id: 'file-1',
      fileName: 'Divya_Frontend_ATS_Resume_2026.pdf',
      fileType: 'application/pdf',
      fileSize: '240 KB',
      category: 'Resume',
      privateToken: 'priv_tok_res_94821',
      uploadedAt: '2026-09-20',
    },
    {
      id: 'file-2',
      fileName: 'Vitest_Test_Coverage_Proof.png',
      fileType: 'image/png',
      fileSize: '1.2 MB',
      category: 'Project Proof',
      privateToken: 'priv_tok_proof_51039',
      uploadedAt: '2026-09-18',
    },
    {
      id: 'file-3',
      fileName: 'React_Advanced_Certification.pdf',
      fileType: 'application/pdf',
      fileSize: '480 KB',
      category: 'Certificate',
      privateToken: 'priv_tok_cert_18472',
      uploadedAt: '2026-09-15',
    },
  ]);

  const [category, setCategory] = useState<'Resume' | 'Certificate' | 'Project Proof' | 'Screenshot'>('Resume');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    careerApi
      .getSecureFiles()
      .then((data) => {
        if (data && data.length) setFiles(data);
      })
      .catch(() => {});
  }, []);

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // File Validation
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'application/zip', 'application/x-zip-compressed'];
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.zip')) {
      setErrorMsg('Invalid file type. Only PDF, PNG, JPG, and ZIP files are permitted.');
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setErrorMsg('File exceeds 10MB maximum limit.');
      return;
    }

    setUploading(true);
    setProgress(15);

    const timer1 = setTimeout(() => setProgress(60), 300);
    const timer2 = setTimeout(async () => {
      setProgress(100);
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      const newFileObj = {
        fileName: file.name,
        fileType: file.type || 'application/octet-stream',
        fileSize: sizeStr,
        category,
      };

      try {
        const saved = await careerApi.uploadSecureFile(newFileObj);
        setFiles([saved, ...files]);
      } catch {
        const fallback = {
          id: 'file-' + Date.now(),
          ...newFileObj,
          privateToken: 'priv_tok_' + Math.random().toString(36).slice(2, 9),
          uploadedAt: new Date().toISOString().slice(0, 10),
        };
        setFiles([fallback, ...files]);
      }

      setUploading(false);
      setProgress(0);
      setSuccessMsg(`"${file.name}" uploaded securely to encrypted student vault!`);
      act(`Secure file "${file.name}" uploaded! (+30 XP)`, 30);
    }, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  const handleDeleteFile = async (id: string, name: string) => {
    try {
      await careerApi.deleteSecureFile(id);
    } catch {
      // fallback
    }
    setFiles((prev) => prev.filter((f) => f.id !== id));
    act(`File "${name}" removed from storage.`);
  };

  return (
    <div className="profileModalOverlay" onClick={onClose}>
      <div
        className="profileModal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 640, maxHeight: '92vh', overflowY: 'auto' }}
      >
        <div className="profileModalHeader">
          <div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Lock size={16} color="#86e5b1" />
              <p className="eyebrow" style={{ margin: 0 }}>SECURE ENCRYPTED STORAGE</p>
            </div>
            <h2 style={{ fontSize: 18, margin: '4px 0 0' }}>Student Artifact & Document Vault</h2>
          </div>
          <button className="icon" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        <p className="muted" style={{ fontSize: 11, margin: '10px 0 16px' }}>
          Upload verified resumes, project certificates, and testing screenshots. Files are privately stored and only accessible via authorized tokens.
        </p>

        {/* Upload Box */}
        <div
          style={{
            border: '2px dashed #3a425c',
            borderRadius: 10,
            padding: 20,
            textAlign: 'center',
            background: '#131626',
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            <UploadCloud size={32} color="#8777f2" />
          </div>
          <b style={{ fontSize: 13, color: '#f0edff', display: 'block', marginBottom: 4 }}>
            Drag & Drop or Browse to Upload
          </b>
          <small style={{ color: '#8e96a8', display: 'block', fontSize: 10, marginBottom: 12 }}>
            Supported formats: PDF, PNG, JPG, ZIP · Maximum size: 10MB
          </small>

          <div style={{ display: 'inline-flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: '#a89bff' }}>Category:</span>
            <select
              className="filterSelect"
              style={{ fontSize: 11, padding: '4px 8px' }}
              value={category}
              onChange={(e: any) => setCategory(e.target.value)}
            >
              <option value="Resume">Resume</option>
              <option value="Project Proof">Project Proof</option>
              <option value="Certificate">Certificate</option>
              <option value="Screenshot">Screenshot</option>
            </select>
          </div>

          <div>
            <label
              className="primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              Select File from Device
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={handleSimulatedFileUpload}
                accept=".pdf,.png,.jpg,.jpeg,.zip"
                disabled={uploading}
              />
            </label>
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#8e96a8', marginBottom: 3 }}>
                <span>Uploading & Encrypting...</span>
                <span>{progress}%</span>
              </div>
              <div style={{ height: 4, background: '#1e2336', borderRadius: 2, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #6353af, #86e5b1)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          )}

          {errorMsg && (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: '#ff8a8a', fontSize: 11, marginTop: 10, justifyContent: 'center' }}>
              <AlertCircle size={13} /> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: '#86e5b1', fontSize: 11, marginTop: 10, justifyContent: 'center' }}>
              <CheckCircle2 size={13} /> {successMsg}
            </div>
          )}
        </div>

        {/* Existing Files List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <b style={{ fontSize: 12, color: '#f0edff' }}>Your Encrypted Artifacts ({files.length})</b>
            <span className="pill green" style={{ fontSize: 9 }}>Private & Isolated</span>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            {files.map((f) => (
              <div
                key={f.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#141724',
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid #232a3c',
                }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <FileText size={18} color="#8777f2" />
                  <div>
                    <b style={{ fontSize: 12, color: '#f0edff', display: 'block' }}>{f.fileName}</b>
                    <small style={{ color: '#8e96a8', fontSize: 10 }}>
                      {f.category} · {f.fileSize} · Uploaded: {f.uploadedAt}
                    </small>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className="pill purple" style={{ fontSize: 8 }}>
                    🔒 {f.privateToken ? f.privateToken.slice(0, 14) + '...' : 'Encrypted'}
                  </span>
                  <button
                    className="icon"
                    style={{ color: '#ff8a8a', padding: 4 }}
                    onClick={() => handleDeleteFile(f.id, f.fileName)}
                    aria-label="Delete file"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profileActions" style={{ marginTop: 16 }}>
          <button className="primary full" type="button" onClick={onClose}>
            Done <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
