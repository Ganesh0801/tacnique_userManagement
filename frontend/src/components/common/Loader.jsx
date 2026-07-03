import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loader = ({ label = 'Loading...' }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    gap={1.5}
    py={6}
  >
    <CircularProgress size={36} thickness={4} />
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Box>
);

export default Loader;
