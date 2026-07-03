import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { AppSnackbarProvider } from './context/SnackbarContext';
import Navbar from './components/layout/Navbar';
import UserListPage from './pages/UserListPage';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppSnackbarProvider>
      <Navbar />
      <UserListPage />
    </AppSnackbarProvider>
  </ThemeProvider>
);

export default App;
