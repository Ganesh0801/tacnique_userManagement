import React from 'react';
import { Container } from '@mui/material';

const PageContainer = ({ children }) => (
  <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 } }}>
    {children}
  </Container>
);

export default PageContainer;
