import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import App from './App.tsx';
import './index.css';
import { SnackProvider } from './contexts/SnackContext.tsx';

createRoot(document.getElementById('root')!).render(
  <SnackProvider>
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
  </SnackProvider>

);