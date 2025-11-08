import React, { useState } from 'react';
import InteractiveProductCard from '../components/common/InteractiveProductCard';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizTopic {
  id: string;
  name: string;
  icon: string;
  questions: Question[];
}

const Quiz: React.FC = () => {
  const topics: QuizTopic[] = [
    {
      id: 'js',
      name: 'JavaScript',
      icon: '📜',
      questions: [
        {
          id: 1,
          question: 'What is the output of: typeof null?',
          options: ['null', 'undefined', 'object', 'number'],
          correctAnswer: 2
        },
        {
          id: 2,
          question: 'Which method adds elements to the end of an array?',
          options: ['push()', 'pop()', 'shift()', 'unshift()'],
          correctAnswer: 0
        },
        {
          id: 3,
          question: 'What does "===" check in JavaScript?',
          options: ['Value only', 'Type only', 'Both value and type', 'Neither'],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'react',
      name: 'React',
      icon: '⚛️',
      questions: [
        {
          id: 1,
          question: 'What is JSX?',
          options: ['A JavaScript library', 'A syntax extension', 'A framework', 'A database'],
          correctAnswer: 1
        },
        {
          id: 2,
          question: 'Which hook is used for side effects?',
          options: ['useState', 'useEffect', 'useContext', 'useReducer'],
          correctAnswer: 1
        },
        {
          id: 3,
          question: 'What does React.memo do?',
          options: ['Stores data', 'Optimizes re-renders', 'Handles routing', 'Manages state'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'ml',
      name: 'Machine Learning',
      icon: '🤖',
      questions: [
        {
          id: 1,
          question: 'What is supervised learning?',
          options: ['Learning with labeled data', 'Learning without data', 'Unsupervised clustering', 'Reinforcement learning'],
          correctAnswer: 0
        },
        {
          id: 2,
          question: 'Which algorithm is used for classification?',
          options: ['K-means', 'Linear Regression', 'Decision Tree', 'PCA'],
          correctAnswer: 2
        },
        {
          id: 3,
          question: 'What is overfitting?',
          options: ['Model too simple', 'Model too complex', 'Perfect model', 'No training'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'python',
      name: 'Python',
      icon: '🐍',
      questions: [
        {
          id: 1,
          question: 'What is a list comprehension?',
          options: ['A loop', 'A concise way to create lists', 'A function', 'A class'],
          correctAnswer: 1
        },
        {
          id: 2,
          question: 'Which keyword is used for exception handling?',
          options: ['catch', 'except', 'error', 'handle'],
          correctAnswer: 1
        },
        {
          id: 3,
          question: 'What does "self" represent in Python classes?',
          options: ['The class itself', 'The instance', 'A variable', 'A method'],
          correctAnswer: 1
        }
      ]
    }
  ];

  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const startQuiz = (topic: QuizTopic) => {
    setSelectedTopic(topic);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions([]);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answeredQuestions.includes(currentQuestionIndex)) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = selectedTopic!.questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);

    if (currentQuestionIndex < selectedTopic!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const getBadge = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return { name: '🏆 Master', color: '#fbbf24' };
    if (percentage >= 70) return { name: '🥈 Expert', color: '#9ca3af' };
    if (percentage >= 50) return { name: '🥉 Proficient', color: '#cd7f32' };
    return { name: '📚 Learner', color: '#6b7280' };
  };

  const resetQuiz = () => {
    setSelectedTopic(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions([]);
    setSelectedAnswer(null);
  };

  return (
      <div style={{ minHeight: '100vh', padding: '60px 24px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#111827', marginBottom: 16, textAlign: 'center' }}>
          Skill Assessment Quiz
        </h1>
        <p style={{ fontSize: 16, color: '#6b7280', marginBottom: 40, textAlign: 'center' }}>
          Test your knowledge and earn badges to showcase on your profile
        </p>

        {!selectedTopic ? (
          /* Topic Selection */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {topics.map((topic) => (
              <InteractiveProductCard
                key={topic.id}
                title={topic.name}
                description={`${topic.questions.length} Questions`}
                imageUrl={topic.icon}
                onClick={() => startQuiz(topic)}
                onActionClick={() => startQuiz(topic)}
              />
            ))}
          </div>
        ) : !showResult ? (
          /* Quiz Interface */
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            {/* Progress */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#6b7280' }}>
                  Question {currentQuestionIndex + 1} of {selectedTopic.questions.length}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#667eea' }}>
                  {selectedTopic.icon} {selectedTopic.name}
                </span>
              </div>
              <div style={{ 
                width: '100%', 
                height: 8, 
                background: '#e5e7eb', 
                borderRadius: 4,
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${((currentQuestionIndex + 1) / selectedTopic.questions.length) * 100}%`, 
                  height: '100%', 
                  background: '#667eea',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Question */}
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 24, lineHeight: 1.4 }}>
                {selectedTopic.questions[currentQuestionIndex].question}
              </h2>

              {/* Options */}
              <div style={{ display: 'grid', gap: 12 }}>
                {selectedTopic.questions[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={answeredQuestions.includes(currentQuestionIndex)}
                    style={{
                      padding: '16px 20px',
                      background: selectedAnswer === index ? '#667eea' : '#f9fafb',
                      color: selectedAnswer === index ? '#fff' : '#111827',
                      border: `2px solid ${selectedAnswer === index ? '#667eea' : '#e5e7eb'}`,
                      borderRadius: 12,
                      fontSize: 16,
                      fontWeight: 500,
                      cursor: answeredQuestions.includes(currentQuestionIndex) ? 'not-allowed' : 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!answeredQuestions.includes(currentQuestionIndex) && selectedAnswer !== index) {
                        e.currentTarget.style.borderColor = '#667eea';
                        e.currentTarget.style.background = '#f3f4f6';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedAnswer !== index) {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.background = '#f9fafb';
                      }
                    }}
                  >
                    <span style={{ fontWeight: 700, marginRight: 12 }}>{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              style={{
                width: '100%',
                padding: '14px 24px',
                background: selectedAnswer === null ? '#e5e7eb' : '#667eea',
                color: selectedAnswer === null ? '#9ca3af' : '#fff',
                border: 'none',
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 700,
                cursor: selectedAnswer === null ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedAnswer !== null) {
                  e.currentTarget.style.background = '#5568d3';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedAnswer !== null) {
                  e.currentTarget.style.background = '#667eea';
                }
              }}
            >
              {currentQuestionIndex < selectedTopic.questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
            </button>
          </div>
        ) : (
          /* Results */
          <div style={{ background: '#fff', borderRadius: 16, padding: 48, boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: 72, marginBottom: 24 }}>
              {getBadge(score, selectedTopic.questions.length).name.split(' ')[0]}
            </div>
            
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#111827', marginBottom: 16 }}>
              Quiz Complete!
            </h2>
            
            <div style={{ 
              fontSize: 48, 
              fontWeight: 800, 
              color: getBadge(score, selectedTopic.questions.length).color,
              marginBottom: 16
            }}>
              {score} / {selectedTopic.questions.length}
            </div>
            
            <div style={{ 
              display: 'inline-block',
              padding: '12px 24px',
              background: getBadge(score, selectedTopic.questions.length).color + '22',
              color: getBadge(score, selectedTopic.questions.length).color,
              borderRadius: 24,
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 32
            }}>
              {getBadge(score, selectedTopic.questions.length).name}
            </div>

            <p style={{ fontSize: 16, color: '#6b7280', marginBottom: 32, lineHeight: 1.6 }}>
              You scored {Math.round((score / selectedTopic.questions.length) * 100)}% on the {selectedTopic.name} quiz.
              {score === selectedTopic.questions.length && ' Perfect score! 🎉'}
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={resetQuiz}
                style={{
                  padding: '12px 24px',
                  background: '#f3f4f6',
                  color: '#111827',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Try Another Topic
              </button>
              <button
                onClick={() => {
                  setShowResult(false);
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setAnsweredQuestions([]);
                  setSelectedAnswer(null);
                }}
                style={{
                  padding: '12px 24px',
                  background: '#667eea',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
  );
};

export default Quiz;
