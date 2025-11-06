import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Science, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] },
  },
};

const AlternateProjectPromo = () => {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
      <Paper
        elevation={3}
        sx={{
          mt: 5,
          p: 3,
          borderRadius: 3,
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Box display="flex" alignItems="center" mb={1}>
          <Science sx={{ mr: 1 }} color="secondary" />
          <Typography variant="h6" fontWeight="bold">
            Try Another AI Tool
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Looking for fast predictions directly from just the abstract? I’ve built a mini tool using Streamlit and a lightweight model trained on dummy data to do just that.
        </Typography>

        <Button
          variant="contained"
          endIcon={<ArrowForward />}
          href="https://sci-check.turjo-jaman.com/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 1 }}
        >
          Try Sci-Check Now
        </Button>
      </Paper>
    </motion.div>
  );
};

export default AlternateProjectPromo;
