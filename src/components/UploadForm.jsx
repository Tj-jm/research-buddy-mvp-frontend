import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadPDF } from '../utils/api';

const UploadForm = ({ onResult,SelectedModel, onFileSelect }) => {

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selected = event.target.files[0];
    setFile(event.target.files[0]);
    setError('');
    if (onFileSelect) onFileSelect(selected); 
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF file first.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const response = await uploadPDF(file, SelectedModel);
      onResult(response.data); // This will pass data to the parent component
    } catch (err) {
      console.error(err);
      setError('Failed to upload or process the PDF.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Upload Research Paper PDF
      </Typography>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ marginBottom: '1rem' }}
      />

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? <CircularProgress size={20} /> : 'Upload & Predict'}
        </Button>
      </Box>
    </Paper>
  );
};

export default UploadForm;
