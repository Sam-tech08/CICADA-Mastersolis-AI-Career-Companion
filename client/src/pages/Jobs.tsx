import React, { useState, useRef } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import InteractiveProductCard from '../components/common/InteractiveProductCard';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  posted: string;
}

const Jobs: React.FC = () => {
  const [jobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $160k',
      description: 'We are looking for an experienced Frontend Developer to join our dynamic team...',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'UI/UX design skills'],
      posted: '2 days ago'
    },
    {
      id: '2',
      title: 'Machine Learning Engineer',
      company: 'AI Solutions Ltd.',
      location: 'Remote',
      type: 'Full-time',
      salary: '$140k - $180k',
      description: 'Join our AI team to build cutting-edge machine learning models...',
      requirements: ['Python & TensorFlow', 'ML algorithms expertise', 'PhD preferred'],
      posted: '1 week ago'
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$100k - $130k',
      description: 'Build scalable web applications using modern tech stack...',
      requirements: ['Node.js & React', '3+ years experience', 'AWS knowledge'],
      posted: '3 days ago'
    }
  ]);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyMode, setApplyMode] = useState<'manual' | 'smart' | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [modifiedResume, setModifiedResume] = useState('');
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [selectedPreviewText, setSelectedPreviewText] = useState('');

  const handlePreviewMouseUp = () => {
    try {
      const sel = window.getSelection && window.getSelection();
      if (!sel || sel.rangeCount === 0) {
        setSelectedPreviewText('');
        return;
      }
      const range = sel.getRangeAt(0);
      const previewEl = previewRef.current;
      if (!previewEl) {
        setSelectedPreviewText('');
        return;
      }
      const container = range.commonAncestorContainer;
      if (previewEl.contains(container as Node)) {
        setSelectedPreviewText(sel.toString().trim());
        return;
      }
      setSelectedPreviewText('');
    } catch (err) {
      setSelectedPreviewText('');
    }
  };

  const handleManualApply = () => {
    setApplyMode('manual');
  };

  const handleSmartApply = () => {
    setApplyMode('smart');
    // Simulate AI modification of resume
    setTimeout(() => {
      setModifiedResume(`Modified Resume for ${selectedJob?.title}

OPTIMIZED SUMMARY:
Results-driven professional with expertise in ${selectedJob?.requirements[0]} and ${selectedJob?.requirements[1]}. Proven track record of delivering high-impact solutions.

KEY SKILLS MATCHED TO JOB:
${selectedJob?.requirements.map((req, idx) => `${idx + 1}. ${req}`).join('\n')}

EXPERIENCE:
- Led development of enterprise-scale applications
- Implemented best practices and modern architecture
- Collaborated with cross-functional teams

This resume has been optimized to match the job description with 95% compatibility score.`);
      setShowPreview(true);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const submitApplication = () => {
    alert(`Application submitted for ${selectedJob?.title}!`);
    setSelectedJob(null);
    setApplyMode(null);
    setShowPreview(false);
    setResumeFile(null);
    setSelectedPreviewText('');
  };

  return (
    <div>
      <Navbar />
        <div style={{ minHeight: '100vh', padding: '60px 24px', backgroundColor: '#f9fafb' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#111827', marginBottom: 16, textAlign: 'center' }}>
          Job Opportunities
        </h1>
        <p style={{ fontSize: 16, color: '#6b7280', marginBottom: 40, textAlign: 'center' }}>
          Find your dream job and apply with AI-powered resume optimization
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: selectedJob ? '1fr 1fr' : '1fr', gap: 32 }}>
          {/* Job Listings */}
          <div>
            <div style={{ display: 'grid', gap: 20 }}>
              {jobs.map((job) => (
                <InteractiveProductCard
                  key={job.id}
                  title={job.title}
                  description={`${job.company} • ${job.location} • ${job.salary}\n\n${job.description}`}
                  imageUrl={'💼'}
                  className={selectedJob?.id === job.id ? 'selected-job-card' : ''}
                  onClick={() => setSelectedJob(job)}
                  onActionClick={() => setSelectedJob(job)}
                />
              ))}
            </div>
          </div>

          {/* Application Panel */}
          {selectedJob && (
            <div style={{
              background: '#fff',
              padding: 32,
              borderRadius: 12,
              border: '2px solid #e5e7eb',
              position: 'sticky',
              top: 24,
              height: 'fit-content'
            }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>
                Apply for {selectedJob.title}
              </h2>

              <div style={{ marginBottom: 24 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>
                  Requirements:
                </h4>
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {!applyMode && (
                <div style={{ display: 'grid', gap: 12 }}>
                  <button
                    onClick={handleManualApply}
                    style={{
                      padding: '14px 24px',
                      background: '#f3f4f6',
                      color: '#111827',
                      border: '2px solid #e5e7eb',
                      borderRadius: 8,
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#000000';
                      e.currentTarget.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.background = '#f3f4f6';
                    }}
                  >
                    📄 Manual Apply
                  </button>

                  <button
                    onClick={handleSmartApply}
                    style={{
                      padding: '14px 24px',
                      background: '#000000',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    🤖 Smart Apply (AI-Optimized)
                  </button>
                </div>
              )}

              {applyMode === 'manual' && (
                <div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: 8
                    }}>
                      Upload Resume
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px dashed #e5e7eb',
                        borderRadius: 8,
                        fontSize: 14,
                        cursor: 'pointer'
                      }}
                    />
                    {resumeFile && (
                      <p style={{ fontSize: 12, color: '#10b981', marginTop: 8 }}>
                        ✓ {resumeFile.name}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'grid', gap: 8 }}>
                    <button
                      onClick={submitApplication}
                      disabled={!resumeFile}
                      style={{
                        width: '100%',
                        padding: '14px 24px',
                        background: resumeFile ? '#000000' : '#e5e7eb',
                        color: resumeFile ? '#fff' : '#9ca3af',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: resumeFile ? 'pointer' : 'not-allowed'
                      }}
                    >
                      Submit Application
                    </button>

                    <button
                      onClick={() => {
                        setApplyMode(null);
                        setResumeFile(null);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 24px',
                        background: '#f3f4f6',
                        color: '#6b7280',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {applyMode === 'smart' && !showPreview && (
                <div style={{ textAlign: 'center', padding: 32 }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🤖</div>
                  <p style={{ fontSize: 16, color: '#6b7280' }}>
                    AI is optimizing your resume...
                  </p>
                </div>
              )}

              {applyMode === 'smart' && showPreview && (
                <div>
                  <div ref={previewRef} onMouseUp={handlePreviewMouseUp} style={{
                  padding: 16,
                  background: '#f9fafb',
                  borderRadius: 8,
                  marginBottom: 20,
                  maxHeight: 300,
                  overflowY: 'auto',
                  border: '1px solid #e5e7eb'
                  }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#000000', marginBottom: 12 }}>
                    AI-OPTIMIZED RESUME PREVIEW
                  </div>
                  <pre style={{
                    fontSize: 12,
                    color: '#374151',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    margin: 0,
                    fontFamily: 'inherit'
                  }}>
                    {modifiedResume}
                  </pre>
                  </div>

                  <div style={{ display: 'grid', gap: 12 }}>
                  <button
                    onClick={async () => {
                      try {
                        // Prefer the captured selection inside the preview (captured on mouseup).
                        const resumeToSend = (selectedPreviewText && selectedPreviewText.length > 0) ? selectedPreviewText : modifiedResume;

                        const url = 'http://localhost:5000/api/applications';
                        // Debug logs to help trace the request
                        console.log('[Jobs] Submitting application to', url);
                        console.log('[Jobs] resumeToSend preview:', resumeToSend ? resumeToSend.slice(0, 300) : '<empty>');

                        const res = await fetch(url, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            jobId: selectedJob?.id,
                            jobTitle: selectedJob?.title,
                            company: selectedJob?.company,
                            appliedAt: new Date().toISOString(),
                            mode: 'smart',
                            resume: resumeToSend
                          })
                        });
                        let parsed: any = null;
                        try {
                          parsed = await res.json();
                        } catch (e) {
                          // response may be empty or not JSON
                        }

                        console.log('[Jobs] server response status:', res.status, 'body:', parsed);

                        if (!res.ok) {
                          let msg = 'Failed to submit application. Please try again.';
                          if (parsed && parsed.message) msg = parsed.message;
                          alert(msg);
                          return;
                        }

                        // Continue with existing submission flow (clears UI)
                        submitApplication();
                        alert(parsed?.message ? parsed.message : 'Optimized resume saved and application submitted.');
                      } catch (err) {
                        console.error('Failed to save optimized resume:', err);
                        alert('Failed to submit application. Please try again.');
                      }
                    }}
                    style={{
                      padding: '14px 24px',
                      background: '#000000',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    ✓ Submit Optimized Resume
                  </button>
                  <button
                    onClick={() => {
                    setApplyMode(null);
                    setShowPreview(false);
                    }}
                    style={{
                    padding: '12px 24px',
                    background: '#f3f4f6',
                    color: '#6b7280',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default Jobs;
