import React from 'react';
import { Box, Typography } from '@mui/material';

const ChocolateLoader: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* Minimalist Loading Bar */}
      <Box
        sx={{
          width: '200px',
          height: '3px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '40%',
            background: 'linear-gradient(90deg, transparent, #C83F12, transparent)',
            animation: 'slide 1.5s ease-in-out infinite',
            '@keyframes slide': {
              '0%': {
                transform: 'translateX(-100%)',
              },
              '100%': {
                transform: 'translateX(350%)',
              },
            },
          }}
        />
      </Box>

      {/* Loading Text */}
      <Typography
        variant="h6"
        sx={{
          color: '#FFF',
          fontWeight: 400,
          letterSpacing: '2px',
          fontSize: '14px',
        }}
      >
        MASTCAM-Z
      </Typography>
    </Box>
  );
};

export default ChocolateLoader;
