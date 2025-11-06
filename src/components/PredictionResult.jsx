import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { extractAbstractSection } from '../utils/extractAbstract';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { categoryInfo } from '../utils/categoryInfo';
import CategoryInfoSection from './CategoryInfoSection';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

ChartJS.register(ChartDataLabels);


const slitVariant = {
  hidden: { opacity: 0, clipPath: 'inset(0% 50% 0% 50%)' },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] }
  },
};

const PredictionResult = ({ data }) => {
  const result = data?.result;
  const abstract = data?.abstract;

  const uniqueLabels = Array.from(
  new Set(Object.values(result?.predictions || {}).map((r) => r.label))
);


  return (
    <motion.div initial="hidden" animate="visible" variants={slitVariant}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mt: 3 }}>
        <Typography variant="h5" color='primary' gutterBottom fontWeight="bold">
          Prediction Result
        </Typography>

        {result?.predicted_label ? (
          // Single Model Output
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" fontWeight="medium">
                <strong>Predicted Label:</strong> {result.predicted_label}
              </Typography>
              {categoryInfo[result.predicted_label] && (
                <Box display="flex" alignItems="center" mt={2}>
                  {categoryInfo[result.predicted_label].icon}
                  <Box ml={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {categoryInfo[result.predicted_label].name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {categoryInfo[result.predicted_label].description}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Typography variant="body1" fontWeight="medium">
                <strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="secondary">
                <strong>Extracted Abstract:</strong>
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {extractAbstractSection(abstract) || 'Abstract not found.'}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          // Multiple Models Output
          <Box>
            <Typography variant="body1" gutterBottom>
              Predictions from all models
            </Typography>

            <Bar
              data={{
                labels: Object.keys(result?.predictions),
                datasets: [
                  {
                    label: 'Confidence',
                    data: Object.values(result?.predictions).map((r) =>
                      typeof r.confidence === 'number' ? r.confidence : 0
                    ),
                    backgroundColor: 'rgba(33, 150, 243, 0.6)',
                    borderColor: 'rgba(33, 150, 243, 1)',
                    borderWidth: 1
                  }
                ]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (ctx) => `${(ctx.raw * 100).toFixed(2)}%`
                    }
                  },
                  datalabels: {
                    display: true,
                    color: '#ffffff',
                    font: { weight: 'bold', size: 11 },
                    anchor: 'end',
                    align: 'start',
                    formatter: (value, context) => {
                      const label = Object.values(result?.predictions)[context.dataIndex]?.label || '';
                      return label;
                    }
                  }
                },
                scales: {
                  x: {
                    ticks: {
                      font: { size: 12 },
                      maxRotation: 30,
                      minRotation: 30,
                      color: '#fff'
                    }
                  },
                  y: {
                    beginAtZero: true,
                    max: 1,
                    ticks: {
                      color: '#fff',
                      callback: (value) => `${(value * 100).toFixed(0)}%`
                    }
                  }
                }
              }}
            />

            <Box>
              <Typography variant="subtitle1" color="secondary">
                <strong>Extracted Abstract:</strong>
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {extractAbstractSection(abstract) || 'Abstract not found.'}
              </Typography>
            </Box>

         <CategoryInfoSection categories={uniqueLabels} />


          </Box>
        )}
      </Paper>
    </motion.div>
  );
};

export default PredictionResult;
