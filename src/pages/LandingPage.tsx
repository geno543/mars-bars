import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Menu, MenuItem } from '@mui/material';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ExploreIcon from '@mui/icons-material/Explore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScienceIcon from '@mui/icons-material/Science';
import ChocolateLoader from '../components/ChocolateLoader';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      animateEntrance();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const animateEntrance = () => {
    const tl = gsap.timeline();

    // Badge animation
    tl.from(badgeRef.current, {
      opacity: 0,
      y: -50,
      scale: 0.5,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    });

    // Title animation
    tl.from(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 1,
        ease: 'back.out(1.7)',
      },
      '-=0.5'
    );

    // Subtitle animation
    tl.from(
      subtitleRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.3'
    );

    // Buttons animation with stagger
    tl.from(
      buttonsRef.current?.children || [],
      {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      },
      '-=0.2'
    );

    // Add floating animation to badge
    gsap.to(badgeRef.current, {
      y: -10,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });
  };

  const handleNavigateToJourney = () => {
    setIsTransitioning(true);
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        navigate('/journey');
      },
    });
  };

  const handleSystemMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateToGeneralSystem = () => {
    handleMenuClose();
    navigate('/system');
  };

  const handleNavigateToSpecificSolutions = () => {
    handleMenuClose();
    navigate('/specific-solutions');
  };

  if (loading) {
    return <ChocolateLoader />;
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      {/* Spline 3D Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'scale(1.5)',
          transformOrigin: 'center center',
          zIndex: 1,
          '& canvas': {
            width: '100%',
            height: '100%',
          },
        }}
      >
        <Spline scene="https://prod.spline.design/vfNyO3S11Uul5UZ0/scene.splinecode" />
      </Box>

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(circle at center, rgba(59, 6, 10, 0.3) 0%, rgba(59, 6, 10, 0.7) 100%)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10000,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: '20px', md: '40px' },
          textAlign: 'center',
        }}
      >
        {/* Floating Brand Badge */}
        <Box
          ref={badgeRef}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            padding: '12px 24px',
            borderRadius: '50px',
            background: 'rgba(255, 242, 135, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 242, 135, 0.3)',
            marginBottom: { xs: 3, md: 4 },
            boxShadow:
              '0 8px 32px rgba(200, 63, 18, 0.3), 0 0 20px rgba(255, 242, 135, 0.2)',
          }}
        >
          <RocketLaunchIcon sx={{ color: '#FFF287', fontSize: 24 }} />
          <Typography
            sx={{
              fontSize: { xs: '14px', md: '16px' },
              fontWeight: 600,
              color: '#FFF287',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            MARS BARS
          </Typography>
        </Box>

        {/* Main Title */}
        <Typography
          ref={titleRef}
          sx={{
            fontSize: { xs: '48px', sm: '64px', md: '80px', lg: '96px' },
            fontWeight: 800,
            background: 'linear-gradient(135deg, #FFF287 0%, #C83F12 50%, #8A0000 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(255, 242, 135, 0.3)',
            marginBottom: 2,
            lineHeight: 1.1,
          }}
        >
          Welcome to Mastcam-Z
        </Typography>

        {/* Subtitle */}
        <Typography
          ref={subtitleRef}
          sx={{
            fontSize: { xs: '16px', sm: '18px', md: '22px', lg: '24px' },
            fontWeight: 400,
            color: '#FFFFFF',
            maxWidth: '800px',
            marginBottom: { xs: 4, md: 6 },
            lineHeight: 1.6,
            textShadow:
              '0 2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(200, 63, 18, 0.4)',
          }}
        >
          A sustainable waste infrastructure system to turn trash into treasure on Jezero Crater ( Your new habitat : Mars )
        </Typography>

        {/* Buttons */}
        <Box
          ref={buttonsRef}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, md: 3 },
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {/* Go to System Button with Dropdown */}
          <Box sx={{ position: 'relative' }}>
            <Button
              variant="contained"
              onClick={handleSystemMenuClick}
              startIcon={<RocketLaunchIcon sx={{ fontSize: '26px !important' }} />}
              endIcon={<ArrowDropDownIcon sx={{ fontSize: '28px !important' }} />}
              sx={{
                minWidth: { xs: '300px', md: '260px' },
                padding: { xs: '18px 40px', md: '20px 50px' },
                fontSize: { xs: '16px', md: '18px' },
                fontWeight: 700,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #C83F12 0%, #8A0000 100%)',
                color: '#FFFFFF',
                textTransform: 'none',
                boxShadow:
                  '0 8px 32px rgba(200, 63, 18, 0.5), 0 0 40px rgba(200, 63, 18, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 242, 135, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #FFF287 0%, #C83F12 100%)',
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow:
                    '0 12px 48px rgba(200, 63, 18, 0.7), 0 0 60px rgba(255, 242, 135, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                },
                '&:active': {
                  transform: 'translateY(-2px) scale(1.01)',
                },
              }}
            >
              Go to System
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              slotProps={{
                root: {
                  sx: {
                    zIndex: 100000,
                  },
                },
              }}
              PaperProps={{
                sx: {
                  background: 'linear-gradient(135deg, #1a1e3e 0%, #2a1e3e 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 242, 135, 0.2)',
                  borderRadius: '16px',
                  mt: 1,
                  minWidth: { xs: '300px', md: '260px' },
                  boxShadow: '0 8px 32px rgba(200, 63, 18, 0.5)',
                },
              }}
            >
              <MenuItem
                onClick={handleNavigateToGeneralSystem}
                sx={{
                  py: 2,
                  px: 3,
                  color: '#FFF',
                  fontSize: '16px',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(200, 63, 18, 0.3) 0%, rgba(138, 0, 0, 0.3) 100%)',
                    color: '#FFF287',
                  },
                }}
              >
                <DashboardIcon sx={{ mr: 2, fontSize: '24px' }} />
                General System
              </MenuItem>
              <MenuItem
                onClick={handleNavigateToSpecificSolutions}
                sx={{
                  py: 2,
                  px: 3,
                  color: '#FFF',
                  fontSize: '16px',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(200, 63, 18, 0.3) 0%, rgba(138, 0, 0, 0.3) 100%)',
                    color: '#FFF287',
                  },
                }}
              >
                <ScienceIcon sx={{ mr: 2, fontSize: '24px' }} />
                Specific Solutions
              </MenuItem>
            </Menu>
          </Box>

          {/* Journey to Discover Button */}
          <Button
            variant="outlined"
            onClick={handleNavigateToJourney}
            startIcon={<ExploreIcon sx={{ fontSize: '26px !important' }} />}
            sx={{
              minWidth: { xs: '300px', md: '260px' },
              padding: { xs: '18px 40px', md: '20px 50px' },
              fontSize: { xs: '16px', md: '18px' },
              fontWeight: 700,
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '2px solid #FFFFFF',
              color: '#FFFFFF',
              textTransform: 'none',
              boxShadow:
                '0 8px 32px rgba(255, 255, 255, 0.2), 0 0 40px rgba(255, 242, 135, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: 'rgba(255, 242, 135, 0.2)',
                border: '2px solid #FFF287',
                color: '#FFF287',
                transform: 'translateY(-4px) scale(1.02)',
                boxShadow:
                  '0 12px 48px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 242, 135, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              },
              '&:active': {
                transform: 'translateY(-2px) scale(1.01)',
              },
            }}
          >
            Journey to Discover
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
