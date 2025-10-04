import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Chip, IconButton, Tooltip } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ScienceIcon from '@mui/icons-material/Science';
import RecyclingIcon from '@mui/icons-material/Recycling';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PublicIcon from '@mui/icons-material/Public';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

interface Chapter {
  badge: string;
  title: string;
  text: string;
  video?: string;
  icon?: any;
  highlights?: string[];
}

const chapters: Chapter[] = [
  {
    badge: 'Chapter 1: The Vision',
    title: 'Eyes to Discover Mars',
    text: "It can seem strange but what if these eyes present in our life? Mastcam-Z, the high-resolution, stereo color camera system on NASA's Mars 2020 Perseverance rover. The camera system that seeks for signs of ancient life and advances NASA's quest to explore the past habitability of Mars, it's all about Mastcam-Z and how it shapes a new life to discover this mysterious planet!",
    video: '/videos/mastcam.mp4',
    icon: RemoveRedEyeIcon,
    highlights: ['High-Resolution Camera', 'Stereo Color System', 'Ancient Life Detection'],
  },
  {
    badge: 'Chapter 2: The Location',
    title: 'Why Jezero Crater?',
    text: "Why Jezero Crater, not another place in Mars? As scientists think it could hold evidence of ancient microbial life. We, as \"Mars Bars\" believe how it's a large impact crater on Mars, and for its impact it was chosen due to its ancient lakebed environment containing a river delta rich in clay and carbonate minerals, indicating past freshwater conditions.",
    video: '/videos/jazero.mp4',
    icon: PublicIcon,
    highlights: ['Ancient Lake Bed', 'River Delta', 'Clay & Carbonate Minerals'],
  },
  {
    badge: 'Chapter 3: The Challenge',
    title: 'Understanding Mars Environment',
    text: "Mars presents extreme challenges: temperatures ranging from -125°C to 20°C, a thin atmosphere that's 95% carbon dioxide, intense radiation exposure, and massive dust storms that can engulf the entire planet. Understanding these conditions is crucial for any sustainable human presence and waste management system.",
    video: '/videos/mars-environment.mp4',
    icon: ScienceIcon,
    highlights: ['Extreme Temperatures', 'Thin Atmosphere', 'Radiation Exposure'],
  },
  {
    badge: 'Chapter 4: The Innovation',
    title: 'Trash into Treasure',
    text: "It's not about thinking recycling or reimaging but how to make trash into treasure on Mars with a few conditions as how can we make sure to be sustainable enough and beneficial extremely while minimizing the usage of water, energy input and microplastics not only that but have you ever imagined to turn your useless wastes into a new life on a planet you only want to discover? Or even some rocks around you to a great construction for a new life?",
    video: '/videos/waste.mp4',
    icon: RecyclingIcon,
    highlights: ['Zero Waste Goal', 'Resource Optimization', 'Sustainable Systems'],
  },
  {
    badge: 'Chapter 5: The Solution',
    title: 'Sustainable Water & Energy',
    text: "Water is life, even on Mars. Our innovative system extracts water from Martian ice and recycles every drop through advanced filtration. Solar panels combined with nuclear power ensure continuous energy supply. Smart sensors monitor resource usage in real-time, optimizing efficiency while minimizing environmental impact.",
    video: '/videos/water.mp4',
    icon: WaterDropIcon,
    highlights: ['Water Recycling', 'Solar & Nuclear Power', 'Smart Monitoring'],
  },
  {
    badge: 'Chapter 6: The Future',
    title: 'Building a New Life',
    text: "Imagine constructing habitats from Martian regolith, growing food in controlled environments, and creating a self-sustaining colony. Every piece of waste becomes a building block. Every challenge becomes an opportunity for innovation. This is not just about surviving on Mars—it's about thriving and creating a new chapter in human history.",
    video: '/videos/future.mp4',
    icon: RocketLaunchIcon,
    highlights: ['Martian Construction', 'Food Production', 'Self-Sustaining Colony'],
  },
];

const JourneyPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Trigger animation on chapter change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [currentChapter]);

  const handleNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const currentChapterData = chapters[currentChapter];
  const isFirstChapter = currentChapter === 0;
  const isLastChapter = currentChapter === chapters.length - 1;

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: currentChapterData.video ? '#000000' : 'linear-gradient(180deg, #3B060A 0%, #8A0000 50%, #C83F12 100%)',
      }}
    >
      {/* Background Video (if available) */}
      {currentChapterData.video && (
        <Box
          key={currentChapter}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            overflow: 'hidden',
            opacity: isAnimating ? 0 : 1,
            transition: 'opacity 0.8s ease-in-out',
          }}
        >
          <video
            key={currentChapterData.video}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src={currentChapterData.video} type="video/mp4" />
          </video>
        </Box>
      )}

      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        {/* Particle Background */}
        {[...Array(30)].map((_, i) => (
          <Box
            key={i}
            className="animate-drift"
            sx={{
              position: 'absolute',
              width: { xs: '2px', md: '3px' },
              height: { xs: '2px', md: '3px' },
              borderRadius: '50%',
              background: 'rgba(255, 242, 135, 0.5)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}

        {/* Glowing Orbs */}
        <Box
          className="animate-pulse-slow"
          sx={{
            position: 'absolute',
            width: { xs: '150px', md: '250px' },
            height: { xs: '150px', md: '250px' },
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(200, 63, 18, 0.3) 0%, rgba(200, 63, 18, 0) 70%)',
            top: '10%',
            left: '10%',
            filter: 'blur(40px)',
          }}
        />

        <Box
          className="animate-pulse-slow"
          sx={{
            position: 'absolute',
            width: { xs: '200px', md: '300px' },
            height: { xs: '200px', md: '300px' },
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(138, 0, 0, 0.3) 0%, rgba(138, 0, 0, 0) 70%)',
            bottom: '15%',
            right: '10%',
            filter: 'blur(50px)',
            animationDelay: '1s',
          }}
        />

        <Box
          className="animate-pulse-slow"
          sx={{
            position: 'absolute',
            width: { xs: '180px', md: '280px' },
            height: { xs: '180px', md: '280px' },
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255, 242, 135, 0.2) 0%, rgba(255, 242, 135, 0) 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(60px)',
            animationDelay: '2s',
          }}
        />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 100,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: '20px 15px', md: '30px 40px' },
          transform: 'scale(0.85)',
          transformOrigin: 'center center',
        }}
      >
        {/* Back Button */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 20, md: 30 },
            left: { xs: 20, md: 30 },
          }}
        >
          <Tooltip title="Back to Home" arrow>
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 242, 135, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(200, 63, 18, 0.4)',
                  borderColor: '#FFF287',
                  transform: 'translateX(-4px) scale(1.1)',
                },
              }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Chapter Icon */}
        {currentChapterData.icon && (
          <Box
            className="animate-ripple"
            sx={{
              marginBottom: { xs: 2, md: 3 },
              width: { xs: '70px', md: '100px' },
              height: { xs: '70px', md: '100px' },
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'radial-gradient(circle, rgba(200, 63, 18, 0.3) 0%, rgba(200, 63, 18, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 242, 135, 0.3)',
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'scale(0.5) rotate(-180deg)' : 'scale(1) rotate(0deg)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {currentChapterData.icon && React.createElement(currentChapterData.icon, {
              sx: {
                fontSize: { xs: '35px', md: '50px' },
                color: '#FFF287',
              },
            })}
          </Box>
        )}

        {/* Content Container */}
        <Box
          ref={contentRef}
          sx={{
            maxWidth: '900px',
            width: '100%',
            textAlign: 'center',
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateY(30px)' : 'translateY(0)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Badge */}
          <Box
            sx={{
              display: 'inline-block',
              padding: '8px 20px',
              borderRadius: '50px',
              background: 'rgba(255, 242, 135, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 242, 135, 0.3)',
              marginBottom: { xs: 1.5, md: 2 },
              boxShadow: '0 8px 32px rgba(200, 63, 18, 0.2)',
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'translateX(-50px)' : 'translateX(0)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '10px', md: '12px' },
                fontWeight: 500,
                color: '#FFF287',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {currentChapterData.badge}
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            sx={{
              fontSize: { xs: '28px', sm: '36px', md: '48px' },
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FFF287 0%, #C83F12 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: { xs: 1.5, md: 2.5 },
              lineHeight: 1.2,
              textShadow: '0 0 40px rgba(255, 242, 135, 0.3)',
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'scale(0.9)' : 'scale(1)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            }}
          >
            {currentChapterData.title}
          </Typography>

          {/* Text */}
          <Typography
            sx={{
              fontSize: { xs: '13px', sm: '14px', md: '16px' },
              fontWeight: 400,
              color: '#FFFFFF',
              lineHeight: 1.6,
              marginBottom: { xs: 2, md: 3 },
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'translateY(20px)' : 'translateY(0)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
            }}
          >
            {currentChapterData.text}
          </Typography>

          {/* Highlights Section */}
          {currentChapterData.highlights && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                justifyContent: 'center',
                marginBottom: { xs: 2, md: 3 },
              }}
            >
              {currentChapterData.highlights.map((highlight, index) => (
                <Chip
                  key={index}
                  label={highlight}
                  sx={{
                    fontSize: { xs: '11px', md: '13px' },
                    fontWeight: 600,
                    padding: { xs: '16px 12px', md: '18px 14px' },
                    background: 'rgba(255, 242, 135, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 242, 135, 0.4)',
                    color: '#FFF287',
                    boxShadow: '0 4px 16px rgba(200, 63, 18, 0.2)',
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? 'translateY(20px) scale(0.8)' : 'translateY(0) scale(1)',
                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.4 + index * 0.1}s`,
                    '&:hover': {
                      background: 'rgba(255, 242, 135, 0.25)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 24px rgba(255, 242, 135, 0.4)',
                    },
                  }}
                />
              ))}
            </Box>
          )}

          {/* Navigation Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1.5,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: { xs: 2, md: 3 },
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'translateY(30px)' : 'translateY(0)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
            }}
          >
            {/* Back Button */}
            {!isFirstChapter && (
              <Button
                variant="outlined"
                onClick={() => setCurrentChapter(currentChapter - 1)}
                startIcon={<ArrowBackIcon />}
                sx={{
                  minWidth: { xs: '140px', md: '160px' },
                  padding: { xs: '14px 28px', md: '16px 32px' },
                  fontSize: { xs: '15px', md: '16px' },
                  fontWeight: 600,
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 24px rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                Previous
              </Button>
            )}

            {/* Next Button */}
            {!isLastChapter && (
              <Button
                variant="contained"
                onClick={handleNextChapter}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  minWidth: { xs: '280px', md: '240px' },
                  padding: { xs: '16px 36px', md: '18px 40px' },
                  fontSize: { xs: '16px', md: '18px' },
                  fontWeight: 700,
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #C83F12 0%, #8A0000 100%)',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  boxShadow:
                    '0 8px 32px rgba(200, 63, 18, 0.5), 0 0 40px rgba(200, 63, 18, 0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FFF287 0%, #C83F12 100%)',
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow:
                      '0 12px 48px rgba(200, 63, 18, 0.7), 0 0 60px rgba(255, 242, 135, 0.5)',
                  },
                }}
              >
                Continue Journey
              </Button>
            )}

            {/* Final Button */}
            {isLastChapter && (
              <Button
                variant="contained"
                endIcon={<RocketLaunchIcon />}
                sx={{
                  minWidth: { xs: '280px', md: '240px' },
                  padding: { xs: '16px 36px', md: '18px 40px' },
                  fontSize: { xs: '16px', md: '18px' },
                  fontWeight: 700,
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #FFF287 0%, #C83F12 100%)',
                  color: '#3B060A',
                  textTransform: 'none',
                  boxShadow:
                    '0 8px 32px rgba(255, 242, 135, 0.5), 0 0 40px rgba(255, 242, 135, 0.4)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FFF287 0%, #FFFFFF 100%)',
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow:
                      '0 12px 48px rgba(255, 242, 135, 0.7), 0 0 60px rgba(255, 242, 135, 0.6)',
                  },
                }}
              >
                Complete Journey
              </Button>
            )}
          </Box>

          {/* Progress Dots */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isAnimating ? 0 : 1,
              transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.6s',
            }}
          >
            {chapters.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentChapter(index)}
                sx={{
                  width: currentChapter === index ? '40px' : '12px',
                  height: '12px',
                  borderRadius: '6px',
                  background:
                    currentChapter === index
                      ? 'linear-gradient(90deg, #FFF287 0%, #C83F12 100%)'
                      : 'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow:
                    currentChapter === index
                      ? '0 4px 16px rgba(255, 242, 135, 0.5)'
                      : 'none',
                  '&:hover': {
                    background:
                      currentChapter === index
                        ? 'linear-gradient(90deg, #FFF287 0%, #C83F12 100%)'
                        : 'rgba(255, 255, 255, 0.5)',
                    transform: 'scale(1.1)',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JourneyPage;
