import React from 'react';

const ResumeBuilder: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '60px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#111827', marginBottom: 16 }}>
          Resume Builder
        </h1>
        <p style={{ fontSize: 16, color: '#6b7280', marginBottom: 40 }}>
          Build your professional resume (Protected Route)
        </p>
        <div style={{
          background: '#fff',
          padding: 48,
          borderRadius: 16,
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>📄</div>
          <p style={{ fontSize: 18, color: '#6b7280' }}>
            Resume builder functionality coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
