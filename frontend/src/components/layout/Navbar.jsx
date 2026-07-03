import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

const Navbar = () => (
  <AppBar
    position="sticky"
    elevation={0}
    sx={{
      background: 'linear-gradient(90deg, #4F46E5 0%, #6366F1 100%)',
    }}
  >
    <Toolbar sx={{ gap: 1.5 }}>
      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.18)' }}>
        <GroupsRoundedIcon />
      </Avatar>
      <Box>
        <Typography variant="h6" component="div" sx={{ lineHeight: 1.2 }}>
          User Management Dashboard
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.85 }}>
          Manage your organization&apos;s people, all in one place
        </Typography>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
