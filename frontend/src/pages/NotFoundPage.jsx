import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const NotFoundPage = () => (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh" gap={2}>
    <Typography variant="h3" fontWeight={700}>
      404
    </Typography>
    <Typography color="text.secondary">The page you're looking for doesn't exist.</Typography>
    <Button variant="contained" href="/">
      Go Home
    </Button>
  </Box>
);

export default NotFoundPage;
