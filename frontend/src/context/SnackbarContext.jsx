import React, { createContext, useContext, useMemo } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

const NotifyContext = createContext(null);

/**
 * Thin wrapper around notistack so the rest of the app can call
 * `notify.success('Saved!')` / `notify.error('Failed')` without importing
 * notistack directly everywhere.
 */
const NotifyBridge = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const notify = useMemo(
    () => ({
      success: (message) => enqueueSnackbar(message, { variant: 'success' }),
      error: (message) => enqueueSnackbar(message, { variant: 'error' }),
      info: (message) => enqueueSnackbar(message, { variant: 'info' }),
    }),
    [enqueueSnackbar]
  );

  return <NotifyContext.Provider value={notify}>{children}</NotifyContext.Provider>;
};

export const AppSnackbarProvider = ({ children }) => (
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    autoHideDuration={3500}
  >
    <NotifyBridge>{children}</NotifyBridge>
  </SnackbarProvider>
);

export const useNotify = () => {
  const ctx = useContext(NotifyContext);
  if (!ctx) throw new Error('useNotify must be used within AppSnackbarProvider');
  return ctx;
};
