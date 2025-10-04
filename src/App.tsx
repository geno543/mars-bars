import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LandingPage from './pages/LandingPage';
import JourneyPage from './pages/JourneyPage';
import SystemPage from './pages/SystemPage';
import SpecificSolutionsPage from './pages/SpecificSolutionsPage';

// Create custom Mars theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#C83F12',
      light: '#FFF287',
      dark: '#8A0000',
    },
    secondary: {
      main: '#FFF287',
    },
    background: {
      default: '#3B060A',
      paper: '#8A0000',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFF287',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 20,
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/system" element={<SystemPage />} />
          <Route path="/specific-solutions" element={<SpecificSolutionsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
