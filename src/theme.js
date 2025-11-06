// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00E5FF', // neon cyan
    },
    secondary: {
      main: '#D500F9', // electric violet
    },
    background: {
      default: '#121212',
      paper: '#1F1B24',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto Mono", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: 1.5,
    },
    body1: {
      fontFamily: '"Roboto Mono", monospace',
    },
  },
});

export default theme;
