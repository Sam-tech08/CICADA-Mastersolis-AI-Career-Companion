import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

interface Milestone {
  _id: string;
  year: string;
  title: string;
  description: string;
}

const About: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate AI team members
    const aiTeam: TeamMember[] = [
      {
        id: '1',
        name: 'Sarah Chen',
        role: 'Chief AI Officer',
        bio: 'Leading AI innovation with 10+ years in machine learning and NLP.',
        avatar: '👩‍💼'
      },
      {
        id: '2',
        name: 'Marcus Johnson',
        role: 'Head of Product',
        bio: 'Building user-centric solutions that empower career growth.',
        avatar: '👨‍💻'
      },
      {
        id: '3',
        name: 'Priya Sharma',
        role: 'Lead Engineer',
        bio: 'Architecting scalable systems for millions of users worldwide.',
        avatar: '👩‍🔬'
      },
      {
        id: '4',
        name: 'Alex Rivera',
        role: 'UX Designer',
        bio: 'Crafting intuitive experiences that make career building effortless.',
        avatar: '🎨'
      }
    ];
    setTeamMembers(aiTeam);

    // Fetch milestones from MongoDB (placeholder - replace with actual API call)
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/milestones');
      // const data = await response.json();
      
      // Mock data for now
      const mockMilestones: Milestone[] = [
        {
          _id: '1',
          year: '2020',
          title: 'Company Founded',
          description: 'Started with a vision to revolutionize career development through AI.'
        },
        {
          _id: '2',
          year: '2021',
          title: 'First AI Model Launch',
          description: 'Released our first resume optimization AI, helping 10,000+ users.'
        },
        {
          _id: '3',
          year: '2022',
          title: 'Series A Funding',
          description: 'Raised $5M to expand our AI capabilities and team.'
        },
        {
          _id: '4',
          year: '2023',
          title: '1M Users Milestone',
          description: 'Reached 1 million users across 50 countries.'
        },
        {
          _id: '5',
          year: '2024',
          title: 'AI Avatar Integration',
          description: 'Launched interactive AI avatar for personalized career coaching.'
        }
      ];
      
      setMilestones(mockMilestones);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching milestones:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        {/* Mission, Vision, Values */}
        <section style={{ padding: '60px 24px', background: '#ffffff', color: '#111827' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 40, textAlign: 'center' }}>About Mastersolis</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            <div style={{ background: '#ffffff', padding: 24, borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>🎯 Mission</h2>
              <p style={{ fontSize: 16, lineHeight: 1.6 }}>
                To empower every professional with AI-driven tools that unlock their full career potential and accelerate their journey to success.
              </p>
            </div>
            
            <div style={{ background: '#ffffff', padding: 24, borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>🔭 Vision</h2>
              <p style={{ fontSize: 16, lineHeight: 1.6 }}>
                A world where career advancement is accessible to everyone, powered by intelligent technology that understands and adapts to individual needs.
              </p>
            </div>
            
            <div style={{ background: '#ffffff', padding: 24, borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>💎 Values</h2>
              <ul style={{ fontSize: 16, lineHeight: 1.8, paddingLeft: 20 }}>
                <li>Innovation First</li>
                <li>User-Centric Design</li>
                <li>Ethical AI</li>
                <li>Continuous Learning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Generated Team Cards */}
      <section style={{ padding: '60px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 40, textAlign: 'center', color: '#111827' }}>Meet Our Team</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
          {teamMembers.map((member) => (
            <div key={member.id} style={{ 
              background: '#fff', 
              padding: 24, 
              borderRadius: 16, 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: 64, marginBottom: 16 }}>{member.avatar}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#111827' }}>{member.name}</h3>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#667eea', marginBottom: 12 }}>{member.role}</p>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline of Milestones */}
      <section style={{ padding: '60px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 40, textAlign: 'center', color: '#111827' }}>Our Journey</h2>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <p style={{ fontSize: 18, color: '#6b7280' }}>Loading milestones...</p>
            </div>
          ) : (
            <div style={{ position: 'relative', paddingLeft: 40 }}>
              {/* Timeline line */}
              <div style={{ 
                position: 'absolute', 
                left: 15, 
                top: 0, 
                bottom: 0, 
                width: 2, 
                background: 'linear-gradient(180deg, #d1d5db 0%, #9ca3af 100%)' 
              }} />
              
              {milestones.map((milestone, index) => (
                <div key={milestone._id} style={{ 
                  position: 'relative', 
                  marginBottom: 40,
                  paddingLeft: 20
                }}>
                  {/* Timeline dot */}
                  <div style={{ 
                    position: 'absolute', 
                    left: -33, 
                    top: 8,
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    background: '#6b7280',
                    border: '3px solid #fff',
                    boxShadow: '0 0 0 3px #6b728033'
                  }} />
                  
                  <div style={{ 
                    background: '#f9fafb', 
                    padding: 20, 
                    borderRadius: 12,
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
                      {milestone.year}
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#111827' }}>
                      {milestone.title}
                    </h3>
                    <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.6 }}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
