import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import InteractiveProductCard from '../components/common/InteractiveProductCard';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  aiSummary?: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'AI Resume Optimizer',
      description: 'Machine learning model that analyzes and optimizes resumes for ATS systems.',
      image: '🎯',
      tags: ['AI', 'NLP', 'Machine Learning']
    },
    {
      id: '2',
      title: 'Career Path Predictor',
      description: 'Predictive analytics tool for career trajectory planning and skill recommendations.',
      image: '📈',
      tags: ['Data Science', 'Analytics', 'Career']
    },
    {
      id: '3',
      title: 'Interview Simulator',
      description: 'Virtual interview platform with real-time feedback and performance analytics.',
      image: '🎤',
      tags: ['AI', 'Video', 'Interview']
    },
    {
      id: '4',
      title: 'Skill Gap Analyzer',
      description: 'Identifies skill gaps and provides personalized learning paths.',
      image: '📊',
      tags: ['Analytics', 'Learning', 'Career']
    },
    {
      id: '5',
      title: 'LinkedIn Profile Enhancer',
      description: 'AI-powered tool to optimize LinkedIn profiles for maximum visibility.',
      image: '💼',
      tags: ['AI', 'Social Media', 'Optimization']
    },
    {
      id: '6',
      title: 'Job Match Engine',
      description: 'Semantic search engine matching candidates with ideal job opportunities.',
      image: '🔍',
      tags: ['Search', 'Matching', 'AI']
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [generatingSummaryFor, setGeneratingSummaryFor] = useState<string | null>(null);

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => project.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const generateAISummary = async (projectId: string) => {
    setGeneratingSummaryFor(projectId);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const summaries: { [key: string]: string } = {
      '1': 'This project leverages advanced NLP algorithms to parse resume content, identify key achievements, and restructure information for optimal ATS compatibility. Our model has been trained on 100K+ successful resumes and achieves 94% accuracy in predicting interview callbacks.',
      '2': 'Using ensemble machine learning models and labor market data, this tool predicts career trajectories with 87% accuracy. It analyzes skill trends, salary growth patterns, and industry shifts to provide actionable career guidance backed by data from 50+ industries.',
      '3': 'Built with real-time video processing and sentiment analysis, this platform simulates realistic interview scenarios. Our AI evaluator provides instant feedback on communication skills, body language, and answer quality, helping users improve by an average of 40%.',
      '4': 'This analytics engine compares user skills against job market demands using real-time data from 1M+ job postings. It identifies critical skill gaps and generates personalized learning paths, reducing time-to-hire by an average of 3 months.',
      '5': 'Powered by GPT-based language models, this tool generates compelling profile content optimized for LinkedIn\'s algorithm. Users see an average 250% increase in profile views and 180% more connection requests within the first month.',
      '6': 'Our semantic search engine uses transformer models to understand job requirements beyond keywords. It matches candidates based on transferable skills and potential, achieving 3x higher satisfaction rates compared to traditional keyword matching.'
    };

    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, aiSummary: summaries[projectId] }
        : project
    ));
    
    setGeneratingSummaryFor(null);
  };

  return (
    <div>
      <Navbar />
        <div style={{ minHeight: '100vh', padding: '60px 24px', backgroundColor: '#f9fafb' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: '#111827', marginBottom: 16 }}>
            Our Projects
          </h1>
          <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 600, margin: '0 auto' }}>
            Innovative solutions powered by AI and data science to revolutionize career development.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: 24 }}>
          <input
            type="text"
            placeholder="🔍 Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 20px',
              fontSize: 16,
              border: '2px solid #e5e7eb',
              borderRadius: 12,
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
          />
        </div>

        {/* Tag Filters */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>
            Filter by tags:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '8px 16px',
                  background: selectedTags.includes(tag) ? '#000000' : '#fff',
                  color: selectedTags.includes(tag) ? '#fff' : '#000000',
                  border: `2px solid ${selectedTags.includes(tag) ? '#000000' : '#e5e7eb'}`,
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!selectedTags.includes(tag)) {
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.background = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedTags.includes(tag)) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.background = '#fff';
                  }
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#6b7280' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 18 }}>No projects found matching your criteria.</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: 24 
          }}>
            {filteredProjects.map((project) => (
              <div key={project.id}>
                <InteractiveProductCard
                  title={project.title}
                  description={project.description}
                  imageUrl={project.image}
                  className="project-card"
                  onActionClick={() => generateAISummary(project.id)}
                />

                {project.aiSummary && (
                  <div style={{
                    padding: 16,
                    background: '#f9fafb',
                    borderRadius: 8,
                    marginTop: 12,
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#667eea', marginBottom: 8 }}>
                      🤖 AI Summary
                    </div>
                    <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
                      {project.aiSummary}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default Projects;
