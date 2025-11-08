import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

interface Service {
  id: string;
  icon: string;
  name: string;
  description: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      icon: '📝',
      name: 'AI Resume Builder',
      description: 'Create professional resumes tailored to your target job with AI-powered suggestions and formatting.'
    },
    {
      id: '2',
      icon: '🎯',
      name: 'Job Description Matching',
      description: 'Automatically optimize your resume to match specific job descriptions and increase your chances.'
    },
    {
      id: '3',
      icon: '💼',
      name: 'Career Path Analysis',
      description: 'Get personalized career recommendations based on your skills, experience, and market trends.'
    },
    {
      id: '4',
      icon: '🤖',
      name: 'AI Interview Prep',
      description: 'Practice with our AI interviewer and get real-time feedback on your answers and body language.'
    },
    {
      id: '5',
      icon: '📊',
      name: 'Skill Gap Analysis',
      description: 'Identify missing skills for your dream job and get personalized learning recommendations.'
    },
    {
      id: '6',
      icon: '✨',
      name: 'Profile Optimization',
      description: 'Enhance your LinkedIn and professional profiles with AI-generated content and keywords.'
    }
  ]);

  const [generatingFor, setGeneratingFor] = useState<string | null>(null);

  const generateAIDescription = async (serviceId: string) => {
    setGeneratingFor(serviceId);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const aiDescriptions: { [key: string]: string } = {
      '1': 'Leverage cutting-edge natural language processing to craft compelling resumes that highlight your unique value proposition. Our AI analyzes thousands of successful resumes to provide data-driven recommendations.',
      '2': 'Utilize advanced semantic matching algorithms to align your resume with job requirements. Our system identifies key phrases and skills that recruiters are looking for, increasing your visibility by up to 300%.',
      '3': 'Harness predictive analytics and labor market intelligence to map your optimal career trajectory. Our AI considers your strengths, interests, and emerging industry trends to suggest high-growth opportunities.',
      '4': 'Experience realistic interview simulations powered by conversational AI. Get instant feedback on communication skills, answer quality, and confidence levels with our advanced speech and sentiment analysis.',
      '5': 'Deploy machine learning models to benchmark your skills against industry standards. Receive actionable insights on which competencies to develop for maximum career impact and salary growth.',
      '6': 'Apply AI-driven content generation to create magnetic professional profiles. Our system optimizes for search algorithms and human readers, ensuring you stand out in competitive talent pools.'
    };

    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, description: aiDescriptions[serviceId] || service.description }
        : service
    ));
    
    setGeneratingFor(null);
  };

  return (
    <div>
      <Navbar />
      <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '60px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: '#111827', marginBottom: 16 }}>
            Our Services
          </h1>
          <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 600, margin: '0 auto' }}>
            Comprehensive AI-powered tools to accelerate your career journey from resume to interview success.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: 24 
        }}>
          {services.map((service) => (
            <div 
              key={service.id}
              style={{
                background: '#fff',
                padding: 36,
                borderRadius: 20,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
                border: '1px solid #f3f4f6',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = '#f3f4f6';
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16, textAlign: 'center' }}>
                {service.icon}
              </div>
              
              <h3 style={{ 
                fontSize: 22, 
                fontWeight: 700, 
                color: '#111827', 
                marginBottom: 12,
                textAlign: 'center'
              }}>
                {service.name}
              </h3>
              
              <p style={{ 
                fontSize: 15, 
                color: '#6b7280', 
                lineHeight: 1.7,
                marginBottom: 20,
                minHeight: 80
              }}>
                {service.description}
              </p>

              <button
                onClick={() => generateAIDescription(service.id)}
                disabled={generatingFor === service.id}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  background: generatingFor === service.id ? '#d1d5db' : '#000000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: generatingFor === service.id ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: generatingFor === service.id ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (generatingFor !== service.id) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {generatingFor === service.id ? '✨ Generating...' : '🤖 AI-Generated Description'}
              </button>
            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: 60, 
          padding: '48px 40px', 
          background: '#f3f4f6',
          borderRadius: 20,
          textAlign: 'center',
          color: '#111827',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16, letterSpacing: '-0.5px' }}>
            Ready to Transform Your Career?
          </h2>
          <p style={{ fontSize: 17, marginBottom: 32, color: '#6b7280', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 32px' }}>
            Start with our AI Resume Builder and unlock your full potential.
          </p>
          <button style={{
            padding: '16px 40px',
            background: '#000000',
            color: '#ffffff',
            border: 'none',
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          >
            Get Started Now →
          </button>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
