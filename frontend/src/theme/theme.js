import { createTheme } from '@mui/material/styles';

/**
 * Central design system for the dashboard. Kept in one file so every
 * component pulls consistent colors, spacing, and typography instead of
 * hard-coding one-off styles.
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4F46E5', // indigo
      light: '#818CF8',
      dark: '#3730A3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0EA5A4', // teal accent
    },
    background: {
      default: '#F5F6FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E1B2E',
      secondary: '#6B7280',
    },
    error: { main: '#DC2626' },
    success: { main: '#16A34A' },
    warning: { main: '#D97706' },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 18,
        },
        containedPrimary: {
          boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.35)',
          '&:hover': {
            boxShadow: '0 6px 18px 0 rgba(79, 70, 229, 0.45)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          backgroundColor: '#F9FAFB',
          color: '#374151',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 16 },
      },
    },
  },
});

export default theme;
