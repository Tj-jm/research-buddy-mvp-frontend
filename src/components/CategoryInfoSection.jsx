import React from 'react';
import { Box, Typography, Grid, Paper, Chip, useTheme } from '@mui/material';
import { LaptopChromebook, Language, CameraAlt, Android, Functions } from '@mui/icons-material';

const categoryInfo = {
  'cs.LG': {
    name: 'Machine Learning',
    description: 'Covers ML algorithms, neural networks, and learning theory.',
    icon: <LaptopChromebook color="success" />,
  },
  'cs.CL': {
    name: 'Natural Language Processing',
    description: 'Works on text, language modeling, and LLMs.',
    icon: <Language color="secondary" />,
  },
  'cs.CV': {
    name: 'Computer Vision',
    description: 'Focuses on image recognition, object detection, segmentation, etc.',
    icon: <CameraAlt color="primary" />,
  },
  'cs.RO': {
    name: 'Robotics',
    description: 'Involves motion planning, control systems, and automation.',
    icon: <Android color="error" />,
  },
  'cs.IT math.IT': {
    name: 'Information Theory',
    description: 'Focuses on data compression, coding theory, and signal processing.',
    icon: <Functions color="warning" />,
  },
};

const CategoryInfoSection = ({ categories }) => {
   
  const theme = useTheme();
  const uniqueLabels = Array.from(new Set(categories || Object.keys(categoryInfo)));

  return (
    <Box mt={5} alignItems='center'>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        What the Categories Mean
      </Typography>

      <Grid container spacing={3}>
        {uniqueLabels.map((label) => {
          const info = categoryInfo[label];
          if (!info) return null;

          return (
            <Grid item xs={12} sm={6} md={4} key={label} display="flex">
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: '100%',
                  backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
                }}
              >
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <Box display="flex" alignItems="center">
                    {info.icon}
                    <Typography variant="subtitle1" fontWeight="bold" ml={1}>
                      {info.name}
                    </Typography>
                  </Box>
                  <Chip
                    label={label}
                    color="primary"
                    size="small"
                    sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" mt={1}>
                  {info.description}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CategoryInfoSection;
