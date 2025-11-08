import React, { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string[];
  education: string[];
}

const AIResumeBuilder: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! Let\'s build your professional resume. Tell me about your skills and achievements.'
    }
  ]);
  const [input, setInput] = useState('');
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: '',
    email: '',
    phone: '',
    skills: [],
    experience: [],
    education: []
  });
  const [progress, setProgress] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [userName, setUserName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(true);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: input }
    ];

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
      updateResumeData(input);
      updateProgress();
    }, 1000);

    setMessages(newMessages);
    setInput('');
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      'Great! Can you tell me more about your work experience?',
      'Excellent! What are your key technical skills?',
      'That sounds impressive! What about your education background?',
      'Perfect! Can you describe your most significant achievement?',
      'Wonderful! What kind of role are you targeting?',
      'That\'s valuable experience! Any certifications or awards?'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const updateResumeData = (userInput: string) => {
    // Simple keyword detection for demo
    if (userInput.toLowerCase().includes('skill')) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, userInput]
      }));
    } else if (userInput.toLowerCase().includes('work') || userInput.toLowerCase().includes('experience')) {
      setResumeData(prev => ({
        ...prev,
        experience: [...prev.experience, userInput]
      }));
    } else if (userInput.toLowerCase().includes('education') || userInput.toLowerCase().includes('degree')) {
      setResumeData(prev => ({
        ...prev,
        education: [...prev.education, userInput]
      }));
    }
  };

  const updateProgress = () => {
    const totalFields = 6;
    const filledFields = [
      resumeData.name,
      resumeData.email,
      resumeData.skills.length > 0,
      resumeData.experience.length > 0,
      resumeData.education.length > 0,
      resumeData.phone
    ].filter(Boolean).length;
    
    setProgress((filledFields / totalFields) * 100);
  };

  const handleStartChat = () => {
    if (userName.trim()) {
      setShowNamePrompt(false);
      setResumeData(prev => ({ ...prev, name: userName }));
      setMessages([
        {
          role: 'assistant',
          content: `Hi ${userName}, let's build your professional resume. Tell me about your skills and achievements.`
        }
      ]);
    }
  };

  const downloadPDF = () => {
    alert('PDF download feature would be implemented with react-pdf or html2canvas');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#111827', marginBottom: 32, textAlign: 'center' }}>
          AI Resume Builder
        </h1>

        {/* Progress Bar */}
        <div style={{ marginBottom: 32, maxWidth: 800, margin: '0 auto 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#6b7280' }}>Progress</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#000000' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ 
            width: '100%', 
            height: 12, 
            background: '#e5e7eb', 
            borderRadius: 6,
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: `${progress}%`, 
              height: '100%', 
              background: '#000000',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Left Panel - Chat Interface */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            {/* HeyGen Avatar Placeholder */}
            <div style={{ 
              background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
              borderRadius: 12,
              padding: 40,
              marginBottom: 24,
              textAlign: 'center',
              color: '#fff',
              position: 'relative',
              minHeight: 200
            }}>
              <div style={{ fontSize: 64, marginBottom: 12 }}>🤖</div>
              <p style={{ fontSize: 14, opacity: 0.9 }}>
                HeyGen Avatar Integration
              </p>
              <p style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
                (iframe/API would be embedded here)
              </p>
            </div>

            {showNamePrompt ? (
              <div style={{ textAlign: 'center', padding: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#111827' }}>
                  What's your name?
                </h3>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleStartChat()}
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 16,
                    border: '2px solid #e5e7eb',
                    borderRadius: 8,
                    marginBottom: 16,
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleStartChat}
                  style={{
                    padding: '12px 32px',
                    background: '#000000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Start Building
                </button>
              </div>
            ) : (
              <>
                {/* Chat Messages */}
                <div style={{ 
                  height: 400, 
                  overflowY: 'auto', 
                  marginBottom: 16,
                  padding: 16,
                  background: '#f9fafb',
                  borderRadius: 8
                }}>
                  {messages.map((msg, idx) => (
                    <div 
                      key={idx}
                      style={{
                        marginBottom: 16,
                        display: 'flex',
                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div style={{
                        maxWidth: '70%',
                        padding: '12px 16px',
                        borderRadius: 12,
                        background: msg.role === 'user' ? '#000000' : '#fff',
                        color: msg.role === 'user' ? '#fff' : '#111827',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your response..."
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      fontSize: 14,
                      border: '2px solid #e5e7eb',
                      borderRadius: 8,
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    style={{
                      padding: '12px 24px',
                      background: '#000000',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Send
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right Panel - Live Preview */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>Live Preview</h3>
              <button
                onClick={downloadPDF}
                style={{
                  padding: '8px 16px',
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                📥 Download PDF
              </button>
            </div>

            {/* Template Selector */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>
                Choose Template:
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {[1, 2, 3].map(template => (
                  <button
                    key={template}
                    onClick={() => setSelectedTemplate(template)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: selectedTemplate === template ? '#000000' : '#f3f4f6',
                      color: selectedTemplate === template ? '#fff' : '#6b7280',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Template {template}
                  </button>
                ))}
              </div>
            </div>

            {/* Resume Preview */}
            <div style={{ 
              border: '2px solid #e5e7eb', 
              borderRadius: 12, 
              padding: 24,
              minHeight: 500,
              background: '#fafafa'
            }}>
              <div style={{ marginBottom: 24 }}>
                <input
                  type="text"
                  value={resumeData.name}
                  onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
                  placeholder="Your Name"
                  style={{
                    width: '100%',
                    fontSize: 24,
                    fontWeight: 700,
                    border: 'none',
                    background: 'transparent',
                    marginBottom: 8,
                    outline: 'none'
                  }}
                />
                <input
                  type="email"
                  value={resumeData.email}
                  onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                  placeholder="email@example.com"
                  style={{
                    width: '100%',
                    fontSize: 14,
                    border: 'none',
                    background: 'transparent',
                    marginBottom: 4,
                    outline: 'none'
                  }}
                />
                <input
                  type="tel"
                  value={resumeData.phone}
                  onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                  placeholder="Phone Number"
                  style={{
                    width: '100%',
                    fontSize: 14,
                    border: 'none',
                    background: 'transparent',
                    outline: 'none'
                  }}
                />
              </div>

              {resumeData.skills.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#111827' }}>Skills</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {resumeData.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        style={{
                          padding: '6px 12px',
                          background: '#000000',
                          color: '#fff',
                          borderRadius: 16,
                          fontSize: 12,
                          fontWeight: 600
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {resumeData.experience.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#111827' }}>Experience</h4>
                  {resumeData.experience.map((exp, idx) => (
                    <p key={idx} style={{ fontSize: 14, color: '#6b7280', marginBottom: 8, lineHeight: 1.6 }}>
                      • {exp}
                    </p>
                  ))}
                </div>
              )}

              {resumeData.education.length > 0 && (
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#111827' }}>Education</h4>
                  {resumeData.education.map((edu, idx) => (
                    <p key={idx} style={{ fontSize: 14, color: '#6b7280', marginBottom: 8, lineHeight: 1.6 }}>
                      • {edu}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResumeBuilder;
