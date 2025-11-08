import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{ textAlign: 'center', maxWidth: 600 }}>
        <div style={{ fontSize: 120, fontWeight: 800, color: '#667eea', marginBottom: 24 }}>
          404
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#111827', marginBottom: 16 }}>
          Page Not Found
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 32, lineHeight: 1.6 }}>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '14px 32px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
