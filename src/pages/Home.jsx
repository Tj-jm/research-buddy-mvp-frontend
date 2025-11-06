import React, { useContext, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import UploadForm from '../components/UploadForm';
import PredictionResult from '../components/PredictionResult';
import { modelOptions } from '../utils/const';
import KeywordSection from '../components/KeywordSection';
import AlternateProjectPromo from '../components/AlternateProjectPromo';
import SummarySection from '../components/SummarySection';
import SavePaperModal

from '../components/SavePaperModal';
import { AuthContext } from '../context/AuthContext';
const revealAnimation = {
  hidden: {
    opacity: 0,
    clipPath: 'inset(0% 50% 0% 50%)',
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.9,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

const Home = () => {
  const {user} = useContext(AuthContext)
  const [result, setResult] = useState(null);
  const [selectedModel, setSelectedModel] = useState('ALL');
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

    // Lifted states for summaries and keywords
  const [summaries, setSummaries] = useState({ transformer: '', gemini: '' });
  const [keywords, setKeywords] = useState({ keybert: [], gemini: [] });

  return (
    <Container maxWidth="lg">
      <motion.div variants={revealAnimation} initial="hidden" animate="visible">
        <Typography variant="h3" color="primary" textAlign='center' gutterBottom>
          Research Buddy: AI-Powered Insights
        </Typography>

        <Box my={5}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Research Paper Classifier
          </Typography>

          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Upload a PDF and let our models predict its research domain.
          </Typography>
        </Box>

        {/* Model selection */}
        <Box mb={4}>
          <FormControl fullWidth>
            <InputLabel id="model-select-label">Select Model</InputLabel>
            <Select
              labelId="model-select-label"
              value={selectedModel}
              label="Select Model"
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {modelOptions.map((model) => (
                <MenuItem key={model} value={model}>
                  {model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Divider />

        <UploadForm onResult={setResult} SelectedModel={selectedModel} onFileSelect={setUploadedFile} />
      
        {result && (
          <>
            <Divider sx={{ my: 4 }} />
            {/* <p>{result?.result.predicted_label}</p>
            <p>{result?.result.confidence}</p>
            <p>{extractAbstractSection(result?.abstract)}</p> */}

            <PredictionResult data={result} />
            <KeywordSection abstract={result.abstract}  onUpdate={(kw) => setKeywords(kw)} />
             <SummarySection abstract={result.abstract} onUpdate={(sm) => setSummaries(sm)} />
             {
              user && 
                <Box mt={3} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenSaveModal(true)}
              >
                Save Paper
              </Button>
            </Box>
             }
 
          </>
        )}

          <AlternateProjectPromo />
        
      </motion.div>
         {result && (
        <SavePaperModal
          open={openSaveModal}
          onClose={() => setOpenSaveModal(false)}
          result={result}
          file={uploadedFile}
          summaries={summaries}
          keywords={keywords}
        />
      )}
      
    </Container>
  );
};

export default Home;
