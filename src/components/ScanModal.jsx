import React, { useState } from 'react';
import {
  ScanLine,
  Upload,
  Camera,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  FileSearch
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEGAL_TERMS, getTermBySlug } from '../data/legalData';

// Realistic sample legal documents for testing scanning feature
const SAMPLE_DOCUMENTS = [
  {
    id: 'contract-sample',
    title: 'Commercial Software Licensing & Service Agreement',
    type: 'Contract',
    excerpt: `Section 8.2: The Vendor shall provide complete INDEMNITY and hold harmless the Client against any claims resulting from intellectual property infringement. In the event of an unforeseen pandemic or natural disaster, either party may invoke FORCE MAJEURE without incurring LIQUIDATED DAMAGES or committing an actionable BREACH OF CONTRACT.`,
    expectedTerms: ['indemnity', 'force-majeure', 'liquidated-damages', 'breach-of-contract', 'contract']
  },
  {
    id: 'criminal-sample',
    title: 'Police Investigation & Magistrate Notice',
    type: 'Court Order',
    excerpt: `Pursuant to the registration of the FIR under Section 302 for a COGNIZABLE OFFENCE, the accused was taken into POLICE CUSTODY following the execution of an ARREST WARRANT. The defense counsel moved an urgent application for BAIL before the sessions court.`,
    expectedTerms: ['fir', 'cognizable-offence', 'custody', 'warrant', 'arrest', 'bail']
  },
  {
    id: 'property-sample',
    title: 'Deed of Conveyance and Real Estate Title Transfer',
    type: 'Property Deed',
    excerpt: `The Vendor hereby conveys full FREEHOLD ownership to the Purchaser as recorded in the official TITLE DEED, subject to a designated EASEMENT OF WAY across the northern boundary parcel, confirming no claims under ADVERSE POSSESSION exist.`,
    expectedTerms: ['freehold', 'title-deed', 'easement', 'adverse-possession', 'leasehold']
  }
];

export default function ScanModal() {
  const { isScanModalOpen, closeScanModal, navigate, addToast } = useApp();

  const [activeTab, setActiveTab] = useState('samples'); // 'samples' | 'upload' | 'camera'
  const [selectedSample, setSelectedSample] = useState(SAMPLE_DOCUMENTS[0]);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedText, setUploadedText] = useState('');
  const [scanStatus, setScanStatus] = useState('idle'); // 'idle' | 'scanning' | 'success' | 'empty' | 'error'
  const [detectedTerms, setDetectedTerms] = useState([]);
  const [customInputText, setCustomInputText] = useState('');

  // Reset state when modal closes
  const handleClose = () => {
    setScanStatus('idle');
    setDetectedTerms([]);
    setUploadedFileName('');
    setUploadedText('');
    closeScanModal();
  };

  const handleStartScan = (textToScan, termsList = null) => {
    setScanStatus('scanning');
    setDetectedTerms([]);

    setTimeout(() => {
      let foundTerms = [];

      if (termsList && termsList.length > 0) {
        foundTerms = termsList.map((slug) => getTermBySlug(slug)).filter(Boolean);
      } else {
        // Scan text against all legal terms
        const lower = textToScan.toLowerCase();
        foundTerms = LEGAL_TERMS.filter((t) => {
          return lower.includes(t.term.toLowerCase()) || lower.includes(t.slug.replace(/-/g, ' '));
        });
      }

      if (foundTerms.length > 0) {
        setDetectedTerms(foundTerms);
        setScanStatus('success');
      } else {
        setScanStatus('empty');
      }
    }, 1800); // 1.8s scanning animation
  };

  const handleSampleScan = () => {
    handleStartScan(selectedSample.excerpt, selectedSample.expectedTerms);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();

    if (file.type.includes('image')) {
      // Simulate image OCR
      const simulatedText = `Agreement regarding NEGLIGENCE, TORT liabilities, and DAMAGES claim filed by the PLAINTIFF against DEFENDANT.`;
      setUploadedText(simulatedText);
      handleStartScan(simulatedText, ['negligence', 'tort', 'damages', 'plaintiff', 'defendant']);
    } else {
      reader.onload = (event) => {
        const text = event.target?.result || '';
        setUploadedText(text);
        handleStartScan(text);
      };
      reader.readAsText(file);
    }
  };

  const handleCameraSimulation = () => {
    const cameraText = `Judicial review petition regarding HABEAS CORPUS, MANDAMUS, and FUNDAMENTAL RIGHTS under constitutional authority.`;
    setUploadedFileName('Camera Snapshot_01.jpg');
    setUploadedText(cameraText);
    handleStartScan(cameraText, ['habeas-corpus', 'mandamus', 'fundamental-rights', 'judicial-review']);
  };

  const handleSelectTerm = (slug) => {
    handleClose();
    navigate(`/term/${slug}`);
    addToast(`Opened legal definition`, 'success');
  };

  if (!isScanModalOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="scan-modal-title"
      >
        <div className="modal-header">
          <h2 id="scan-modal-title" className="modal-title">
            <ScanLine size={22} style={{ color: 'var(--brand-primary)' }} />
            Scan & Detect Legal Terms
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="btn-icon"
            aria-label="Close document scanner"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <button
              type="button"
              onClick={() => { setActiveTab('samples'); setScanStatus('idle'); }}
              className={`filter-pill ${activeTab === 'samples' ? 'active' : ''}`}
            >
              <FileSearch size={14} style={{ marginRight: '4px' }} />
              Sample Legal Docs
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('upload'); setScanStatus('idle'); }}
              className={`filter-pill ${activeTab === 'upload' ? 'active' : ''}`}
            >
              <Upload size={14} style={{ marginRight: '4px' }} />
              Upload Doc / Photo
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('camera'); setScanStatus('idle'); }}
              className={`filter-pill ${activeTab === 'camera' ? 'active' : ''}`}
            >
              <Camera size={14} style={{ marginRight: '4px' }} />
              Take Photo
            </button>
          </div>

          {/* Scanner Viewport */}
          <div className="scan-viewport">
            {scanStatus === 'scanning' ? (
              <>
                <div className="scan-laser-line" />
                <div style={{ zIndex: 12 }}>
                  <Sparkles size={32} style={{ color: 'var(--brand-primary)', margin: '0 auto 0.75rem', animation: 'spin 3s linear infinite' }} />
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    Scanning document for legal terminology...
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Extracting clauses, latin maxims, and statutory terms
                  </p>
                </div>
              </>
            ) : scanStatus === 'success' ? (
              <div style={{ textAlign: 'left', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <CheckCircle2 size={20} style={{ color: '#10B981' }} />
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>
                    {detectedTerms.length} Legal Terms Detected!
                  </span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Click any detected term below to view its simple meaning and legal breakdown:
                </p>
                <div className="detected-terms-list">
                  {detectedTerms.map((term) => (
                    <button
                      key={term.slug}
                      type="button"
                      onClick={() => handleSelectTerm(term.slug)}
                      className="detected-term-chip"
                    >
                      <Sparkles size={13} />
                      <span>{term.term}</span>
                      <ArrowRight size={12} />
                    </button>
                  ))}
                </div>
              </div>
            ) : scanStatus === 'empty' ? (
              <div>
                <AlertCircle size={32} style={{ color: '#F59E0B', margin: '0 auto 0.5rem' }} />
                <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  No recognizable legal terms found
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Try scanning another legal notice, agreement, or select a sample document.
                </p>
              </div>
            ) : activeTab === 'samples' ? (
              <div style={{ textAlign: 'left', width: '100%' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Document Preview ({selectedSample.type}):
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.5, background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  "{selectedSample.excerpt}"
                </p>
              </div>
            ) : activeTab === 'upload' ? (
              <div>
                <Upload size={32} style={{ color: 'var(--brand-primary)', margin: '0 auto 0.5rem' }} />
                <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  Upload a Legal Contract, Notice, or Photo
                </p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Supported formats: PNG, JPG, PDF, TXT
                </p>
                <input
                  type="file"
                  id="scan-file-input"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  accept=".pdf,.txt,.doc,.docx,image/*"
                />
                <label
                  htmlFor="scan-file-input"
                  className="btn btn-secondary"
                  style={{ marginTop: '0.85rem', display: 'inline-flex', cursor: 'pointer' }}
                >
                  <FileText size={16} /> Choose File
                </label>
              </div>
            ) : (
              <div>
                <Camera size={36} style={{ color: 'var(--brand-primary)', margin: '0 auto 0.5rem' }} />
                <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  Take a photo of a document
                </p>
                <button
                  type="button"
                  onClick={handleCameraSimulation}
                  className="btn btn-primary"
                  style={{ marginTop: '0.75rem' }}
                >
                  <Camera size={16} /> Capture Photo & Scan
                </button>
              </div>
            )}
          </div>

          {/* Sample Switcher (when on samples tab) */}
          {activeTab === 'samples' && scanStatus !== 'scanning' && (
            <div style={{ marginTop: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Select a sample document:
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.4rem' }}>
                {SAMPLE_DOCUMENTS.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => { setSelectedSample(doc); setScanStatus('idle'); }}
                    style={{
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${selectedSample.id === doc.id ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                      backgroundColor: selectedSample.id === doc.id ? 'var(--brand-primary-subtle)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)'
                    }}
                  >
                    <span>{doc.title}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {scanStatus === 'success' || scanStatus === 'empty' ? (
            <button
              type="button"
              onClick={() => setScanStatus('idle')}
              className="btn btn-secondary"
            >
              <RefreshCw size={15} /> Scan Another
            </button>
          ) : null}

          <button
            type="button"
            onClick={handleClose}
            className="btn btn-ghost"
          >
            Close
          </button>

          {activeTab === 'samples' && scanStatus !== 'scanning' && scanStatus !== 'success' && (
            <button
              type="button"
              onClick={handleSampleScan}
              className="btn btn-primary"
            >
              <ScanLine size={16} /> Run Scanner
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
