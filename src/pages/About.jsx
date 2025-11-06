import React from 'react';
import { Box, Typography, Container, Paper, Divider, List, ListItem, ListItemText, Chip } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          About Research Buddy
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Research Buddy</strong> is an AI-powered academic assistant that classifies research paper abstracts into subject domains with high accuracy. This project was developed as a modular, proof-of-concept system demonstrating how machine learning can be integrated into research workflows for faster insights.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom color='secondary'>
           System Architecture
        </Typography>
         <Box component="ul" sx={{ pl: 3, mt: 1 }}>
          <li>
            <Typography variant="body1">
              <strong style={{color:'yellow'}}>Frontend:</strong> Built using React.js with MUI for design, Framer Motion for subtle animations, and Chart.js for rich data visualization.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong style={{color:'yellow'}}>Backend:</strong> Developed with FastAPI. Models are served via modular endpoints, abstract parsing is handled securely, and response validation uses Pydantic.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong style={{color:'yellow'}}>ML Models:</strong> To ensure robust performance across modeling paradigms, this project includes a diverse suite of models trained on a curated subset of the arXiv dataset using TF-IDF for feature extraction. The implemented models include Logistic Regression, Multinomial Naive Bayes (MNB), Support Vector Machine (SVM), Random Forest, AdaBoost, K-Nearest Neighbors (KNN), a Feedforward Neural Network (built with Keras), XGBoost, BiLSTM, and BERT. This ensemble enables both lightweight experimentation and high-capacity inference, offering a comprehensive perspective on academic abstract classification.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong style={{color:'yellow'}}>Deployment:</strong> Designed to be hosted on a lightweight VPS like AWS Lightsail for optimal cost-performance balance.
            </Typography>
          </li>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" color='secondary' gutterBottom>
           Trained Categories
        </Typography>
       <Typography variant="body1" sx={{ mb: 2 }}>
          As the original arXiv dataset is huge and requires significant resources to train and deploy, this prototype uses a handpicked subset of categories for efficient experimentation.
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          <Chip label="cs.LG — Machine Learning" color="success" />
          <Chip label="cs.CL — NLP" color="secondary" />
          <Chip label="cs.CV — Computer Vision" color="primary" />
          <Chip label="cs.RO — Robotics" color="error" />
          <Chip label="cs.IT / math.IT — Information Theory" color="warning" />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          This project is open for future development and experimentation. Built by <strong>Turjo Jaman</strong>. Visit{' '}
          <a href="https://turjo-jaman.com" target="_blank" style={{color:'cyan'}} rel="noopener noreferrer">turjo-jaman.com</a> for more.
        </Typography>
      </Paper>
    </Container>
  );
}

export default About