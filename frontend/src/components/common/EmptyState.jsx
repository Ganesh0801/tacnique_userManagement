import React from 'react';
import { Box, Typography } from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const EmptyState = ({ title = 'No users found', subtitle = 'Try adjusting your search or filters.' }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    gap={1}
    py={8}
    color="text.secondary"
  >
    <PeopleOutlineIcon sx={{ fontSize: 56, opacity: 0.4 }} />
    <Typography variant="h6" color="text.primary">
      {title}
    </Typography>
    <Typography variant="body2">{subtitle}</Typography>
  </Box>
);

export default EmptyState;
