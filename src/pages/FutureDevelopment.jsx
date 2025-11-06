import React from 'react';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';
import { AutoStories, Chat, AccountCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.25, 0.8, 0.25, 1],
    },
  }),
};

const features = [
  {
    icon: <AutoStories fontSize="large" color="primary" />,
    title: 'Summarizer Section',
    description:
      'A neural summarizer using Transformer-based models (like DistilBART) to generate compact summaries of uploaded papers.',
  },
  {
    icon: <Chat fontSize="large" color="secondary" />,
    title: 'LLM Chat Assistant',
    description:
      'Integrated large language model API to interactively ask questions and explore the uploaded research paper in plain English.',
  },
  {
    icon: <AccountCircle fontSize="large" color="success" />,
    title: 'Authentication + Database',
    description:
      'Enable account creation, user-based data storage, and CRUD operations to manage previously analyzed papers.',
  },
];

const FutureDevelopment = () => {
  return (
    <Box px={3} py={6} maxWidth="lg" mx="auto">
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        Future Development Plans
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={5}>
        There are several powerful features that can transform this into a full-fledged research assistant. However, due to resource constraints and by design, this project currently serves as a proof of concept.
      </Typography>

      <Grid container spacing={4}>
        {features.map((item, i) => (
          <Grid item xs={12} md={4} key={item.title}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={i}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  {item.icon}
                  <Typography variant="h6" fontWeight="bold" ml={2}>
                    {item.title}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  {item.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FutureDevelopment;
