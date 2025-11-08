import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Blog: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: '100vh', padding: '60px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: '#111827', marginBottom: 16 }}>
          Blog
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 40 }}>
          Insights on hiring, AI trends, and career growth.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: 24 
        }}>
          {/* Blog posts will go here */}
          <div style={{
            background: '#fff',
            padding: 24,
            borderRadius: 12,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Coming Soon</h3>
            <p style={{ color: '#6b7280' }}>Blog posts will be available soon.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
