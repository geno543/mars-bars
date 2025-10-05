import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel, Card, CardContent, LinearProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomeIcon from '@mui/icons-material/Home';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "How can we leverage Mastcam-Z and what can we use it for?",
    options: [
      "To capture high-resolution panoramic and 3D images that guide regolith and rock collection in Jezero Crater.",
      "To process Martian soil into bricks for construction directly.",
      "To electrolyze water into hydrogen and oxygen.",
      "To filter CO₂ from the Martian atmosphere."
    ],
    correctAnswer: "A",
    explanation: "Mastcam-Z is primarily a zoomable imaging system used for geological analysis and mission navigation."
  },
  {
    id: 2,
    question: "Why Jezero Crater specifically?",
    options: [
      "It contains abundant liquid water sources.",
      "It has sedimentary rocks and mineral-rich regolith ideal for oxygen extraction and brick formation.",
      "It's the flattest area on Mars.",
      "It's closest to Earth in distance."
    ],
    correctAnswer: "B",
    explanation: "Jezero Crater is chosen because of its ancient delta system rich in carbonates, clays, and basaltic sands — perfect for ISRU and construction."
  },
  {
    id: 3,
    question: "How can we work with the bricks and soil?",
    options: [
      "Mix regolith with hydrogen to produce methane fuel.",
      "Compact and sinter the regolith using solar or microwave energy to create durable structural bricks.",
      "Freeze regolith for storage and future chemical processing.",
      "Convert soil into fertilizer for crops directly."
    ],
    correctAnswer: "B",
    explanation: "The process involves compressing, molding, and solar/microwave sintering to make strong, reusable bricks."
  },
  {
    id: 4,
    question: "How can we recycle the bricks, soil, and carbon in Jezero Crater?",
    options: [
      "Reuse crushed bricks as feedstock for new construction or melt them for sintering new structures.",
      "Mix the materials with water for hydroponic farming.",
      "Burn carbon to generate methane directly.",
      "Ship the carbon back to Earth."
    ],
    correctAnswer: "A",
    explanation: "Recycled materials are reprocessed into new bricks or used as filler in sintering; carbon can feed into the Sabatier reaction loop for methane production."
  },
  {
    id: 5,
    question: "What powerful action can we reintroduce to our system?",
    options: [
      "Electrolysis of water ice to split H₂O into H₂ and O₂ for fuel and hydration.",
      "Importing oxygen from Earth for consumption.",
      "Using pure carbon dioxide as drinking water.",
      "Cooling Martian soil to make it breathable."
    ],
    correctAnswer: "A",
    explanation: "Electrolysis is the key regenerative step — creating a sustainable loop of H₂ and O₂ production for water, fuel, and life support."
  },
  {
    id: 6,
    question: "Are we able to achieve sustainability in the ways we transform the system's inputs into outputs?",
    options: [
      "Yes, by combining ISRU oxygen (from MOXIE) with hydrogen (from water ice) to produce H₂O and methane fuel in closed recycling loops.",
      "No, because all resources must be imported from Earth.",
      "Yes, but only if oxygen is transformed directly into water.",
      "No, since CO₂ can't be reused."
    ],
    correctAnswer: "A",
    explanation: "The mission achieves sustainability by reusing CO₂, H₂O, and waste byproducts within a regenerative cycle."
  },
  {
    id: 7,
    question: "What are our future plans?",
    options: [
      "To establish a temporary outpost and return all waste to Earth.",
      "To build a long-term, self-sustaining Martian settlement using Jezero's local materials and a complete waste management infrastructure.",
      "To abandon Jezero Crater after extracting oxygen.",
      "To focus only on producing methane fuel for rockets."
    ],
    correctAnswer: "B",
    explanation: "Mars Bars aims for a permanent, circular infrastructure system — not a one-time mission — ensuring life and construction sustainability in Jezero Crater."
  },
  {
    id: 8,
    question: "What best describes the Mars Bars team?",
    options: [
      "A temporary mission group studying Mars rocks.",
      "A team building a high-tech waste management infrastructure to help rebuild and sustain life in Jezero Crater.",
      "A crew focusing only on methane fuel production.",
      "A team that collects Martian souvenirs."
    ],
    correctAnswer: "B",
    explanation: "Mars Bars' goal is to create a long-term, technologically advanced waste management system to make Jezero Crater a livable and sustainable zone."
  },
  {
    id: 9,
    question: "What are the main categories involved in the Mars Bars mission?",
    options: [
      "Spacecraft Design, Rocket Propulsion, Hydroponics, and Communication Systems.",
      "Residence Renovations, Cosmic Celebrations, Daring Discoveries, Life Support Systems, and Research Equipment.",
      "Robotics, Medicine, Astrophysics, and Thermal Engineering.",
      "Astronomy, Geology, Navigation, and Transport."
    ],
    correctAnswer: "B",
    explanation: "These five categories structure the mission's innovation areas — from habitat reuse to scientific research tools."
  }
];

const getScoreTitle = (score: number, total: number): { title: string; description: string; color: string } => {
  const percentage = (score / total) * 100;
  
  if (percentage === 100) {
    return {
      title: "🏆 Mars Pioneer",
      description: "Perfect score! You're ready to lead the Mars mission!",
      color: "#FFD700"
    };
  } else if (percentage >= 80) {
    return {
      title: "🚀 Mars Expert",
      description: "Excellent work! You have deep knowledge of the mission!",
      color: "#FFF287"
    };
  } else if (percentage >= 60) {
    return {
      title: "🌟 Mars Specialist",
      description: "Good job! You understand the core concepts well!",
      color: "#C83F12"
    };
  } else if (percentage >= 40) {
    return {
      title: "🔧 Mars Trainee",
      description: "You're learning! Review the journey to improve!",
      color: "#FF6B6B"
    };
  } else {
    return {
      title: "🌱 Mars Beginner",
      description: "Keep exploring! Revisit the journey to learn more!",
      color: "#8A0000"
    };
  }
};

const ExamPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      const userAnswer = selectedAnswers[index];
      const correctAnswerIndex = q.correctAnswer.charCodeAt(0) - 65; // A=0, B=1, etc.
      if (userAnswer === q.options[correctAnswerIndex]) {
        correct++;
      }
    });
    return correct;
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();
  const scoreInfo = getScoreTitle(score, questions.length);
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #3B060A 0%, #8A0000 50%, #C83F12 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
        }}
      >
        <Card
          sx={{
            maxWidth: '800px',
            width: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 242, 135, 0.3)',
            borderRadius: '24px',
            padding: 4,
          }}
        >
          <CardContent>
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
              <EmojiEventsIcon sx={{ fontSize: '80px', color: scoreInfo.color, marginBottom: 2 }} />
              <Typography
                sx={{
                  fontSize: '42px',
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${scoreInfo.color} 0%, #FFF 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: 1,
                }}
              >
                {scoreInfo.title}
              </Typography>
              <Typography sx={{ fontSize: '18px', color: '#FFF287', marginBottom: 3 }}>
                {scoreInfo.description}
              </Typography>
              <Typography sx={{ fontSize: '48px', fontWeight: 700, color: '#FFF', marginBottom: 1 }}>
                {score} / {questions.length}
              </Typography>
              <Typography sx={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)' }}>
                {Math.round((score / questions.length) * 100)}% Correct
              </Typography>
            </Box>

            <Box sx={{ marginBottom: 4 }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#FFF287', marginBottom: 2 }}>
                Your Answers:
              </Typography>
              {questions.map((q, index) => {
                const userAnswer = selectedAnswers[index];
                const correctAnswerIndex = q.correctAnswer.charCodeAt(0) - 65;
                const isCorrect = userAnswer === q.options[correctAnswerIndex];
                
                return (
                  <Box
                    key={q.id}
                    sx={{
                      padding: 2,
                      marginBottom: 2,
                      background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      border: `1px solid ${isCorrect ? '#10B981' : '#EF4444'}`,
                      borderRadius: '12px',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                      {isCorrect ? (
                        <CheckCircleIcon sx={{ color: '#10B981', fontSize: '24px' }} />
                      ) : (
                        <CancelIcon sx={{ color: '#EF4444', fontSize: '24px' }} />
                      )}
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
                        Question {index + 1}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: 1 }}>
                      {q.question}
                    </Typography>
                    {!isCorrect && (
                      <Typography sx={{ fontSize: '12px', color: '#10B981', marginTop: 1 }}>
                        ✓ Correct answer: {q.options[correctAnswerIndex]}
                      </Typography>
                    )}
                    <Typography sx={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', marginTop: 1, fontStyle: 'italic' }}>
                      {q.explanation}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                startIcon={<RestartAltIcon />}
                onClick={handleRestart}
                sx={{
                  background: 'linear-gradient(135deg, #C83F12 0%, #8A0000 100%)',
                  color: '#FFF',
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: 600,
                  borderRadius: '50px',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #8A0000 0%, #C83F12 100%)',
                  },
                }}
              >
                Retake Exam
              </Button>
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/')}
                sx={{
                  borderColor: '#FFF287',
                  color: '#FFF287',
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: 600,
                  borderRadius: '50px',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#FFF',
                    background: 'rgba(255, 242, 135, 0.1)',
                  },
                }}
              >
                Back to Home
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #3B060A 0%, #8A0000 50%, #C83F12 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 2, md: 4 },
      }}
    >
      <Card
        sx={{
          maxWidth: '900px',
          width: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 242, 135, 0.3)',
          borderRadius: '24px',
        }}
      >
        <CardContent sx={{ padding: { xs: 3, md: 4 } }}>
          {/* Progress Bar */}
          <Box sx={{ marginBottom: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
              <Typography sx={{ fontSize: '14px', color: '#FFF287', fontWeight: 600 }}>
                Question {currentQuestion + 1} of {questions.length}
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#FFF287', fontWeight: 600 }}>
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                background: 'rgba(255, 242, 135, 0.2)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #FFF287 0%, #C83F12 100%)',
                  borderRadius: 4,
                },
              }}
            />
          </Box>

          {/* Question */}
          <Typography
            sx={{
              fontSize: { xs: '20px', md: '26px' },
              fontWeight: 700,
              color: '#FFF',
              marginBottom: 4,
              lineHeight: 1.4,
            }}
          >
            {currentQ.question}
          </Typography>

          {/* Options */}
          <RadioGroup value={selectedAnswer || ''} onChange={(e) => handleAnswerSelect(e.target.value)}>
            {currentQ.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={
                  <Radio
                    sx={{
                      color: 'rgba(255, 242, 135, 0.5)',
                      '&.Mui-checked': {
                        color: '#FFF287',
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#FFF287',
                        minWidth: '30px',
                      }}
                    >
                      {String.fromCharCode(65 + index)}.
                    </Typography>
                    <Typography sx={{ fontSize: '15px', color: '#FFF', lineHeight: 1.6 }}>
                      {option}
                    </Typography>
                  </Box>
                }
                sx={{
                  padding: 2,
                  marginBottom: 2,
                  border: selectedAnswer === option ? '2px solid #FFF287' : '2px solid rgba(255, 242, 135, 0.2)',
                  borderRadius: '12px',
                  background: selectedAnswer === option ? 'rgba(255, 242, 135, 0.1)' : 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 242, 135, 0.05)',
                    borderColor: 'rgba(255, 242, 135, 0.5)',
                  },
                }}
              />
            ))}
          </RadioGroup>

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              sx={{
                borderColor: 'rgba(255, 242, 135, 0.5)',
                color: '#FFF287',
                padding: '12px 32px',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '50px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#FFF287',
                  background: 'rgba(255, 242, 135, 0.1)',
                },
                '&:disabled': {
                  borderColor: 'rgba(255, 242, 135, 0.2)',
                  color: 'rgba(255, 242, 135, 0.3)',
                },
              }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!selectedAnswer}
              sx={{
                background: selectedAnswer ? 'linear-gradient(135deg, #FFF287 0%, #C83F12 100%)' : 'rgba(255, 242, 135, 0.2)',
                color: selectedAnswer ? '#3B060A' : 'rgba(255, 255, 255, 0.3)',
                padding: '12px 32px',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '50px',
                textTransform: 'none',
                '&:hover': {
                  background: selectedAnswer ? 'linear-gradient(135deg, #C83F12 0%, #FFF287 100%)' : 'rgba(255, 242, 135, 0.2)',
                },
                '&:disabled': {
                  background: 'rgba(255, 242, 135, 0.2)',
                },
              }}
            >
              {currentQuestion === questions.length - 1 ? 'Finish Exam' : 'Next Question'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExamPage;
