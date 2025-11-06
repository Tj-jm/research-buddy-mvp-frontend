import React from 'react';
import { Box, Typography } from '@mui/material';

const Copyright = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 2,
        textAlign: 'center',
        borderTop: '1px solid #ddd',
        color: 'text.secondary',
        fontSize: 14,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} <strong>Turjo Jaman</strong>. All rights reserved.
        &nbsp;|&nbsp;
        <a href="https://turjo-jaman.com" target="_blank" rel="noopener noreferrer" style={{ color:'yellow', textDecoration: 'underline', fontWeight: 500 }}>
          turjo-jaman.com
        </a>
      </Typography>
    </Box>
  );
};

export default Copyright;
