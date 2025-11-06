import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    Paper,
    Grid,

    Chip,
} from '@mui/material';
import { extractKeywordsKeybert, extractKeywordsGemini } from '../utils/api';

const KeywordSection = ({ abstract, onUpdate }) => {
    const [keybertKeywords, setKeybertKeywords] = useState([]);
    const [geminiKeywords, setGeminiKeywords] = useState([]);
    const [loadingKeybert, setLoadingKeybert] = useState(false);
    const [loadingGemini, setLoadingGemini] = useState(false);
    const [errorKeybert, setErrorKeybert] = useState('');
    const [errorGemini, setErrorGemini] = useState('');

    useEffect(() => {
        setKeybertKeywords([]);
        setGeminiKeywords([]);
        setErrorKeybert('');
        setErrorGemini('');
        setLoadingKeybert(false);
        setLoadingGemini(false);
    }, [abstract]);

    const handleKeybertExtract = async () => {
        setLoadingKeybert(true);
        setErrorKeybert('');
        try {
            const res = await extractKeywordsKeybert(abstract);
            setKeybertKeywords(res.data.keywords);
            onUpdate?.({ keybert: res.data.keywords, gemini: geminiKeywords });
        } catch (err) {
            setErrorKeybert(' KeyBERT failed to extract keywords.');
        } finally {
            setLoadingKeybert(false);
        }
    };

    const handleGeminiExtract = async () => {
        setLoadingGemini(true);
        setErrorGemini('');
        try {
            const res = await extractKeywordsGemini(abstract);
            setGeminiKeywords(res.data.keywords);
            onUpdate?.({ keybert: keybertKeywords, gemini: res.data.keywords });
        } catch (err) {
            setErrorGemini(' Gemini failed to extract keywords.');
        } finally {
            setLoadingGemini(false);
        }
    };

    return (
        <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" textAlign='center'>
                Keyword Extraction
            </Typography>

            <Box display="flex" gap={2} mb={3} justifyContent='center'>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleKeybertExtract}
                    disabled={loadingKeybert}
                >
                    {loadingKeybert ? <CircularProgress size={20} /> : 'Extract with KeyBERT'}
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleGeminiExtract}
                    disabled={loadingGemini}
                >
                    {loadingGemini ? <CircularProgress size={20} /> : 'Extract with Gemini'}
                </Button>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>

                    {errorKeybert && (
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                KeyBERT Keywords
                            </Typography>

                            <Typography color="error" variant="body2">
                                {errorKeybert}
                            </Typography>
                        </Box>
                    )}
                    {loadingKeybert && <CircularProgress />}
                    {!loadingKeybert && keybertKeywords.length > 0 && (
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                KeyBERT Keywords
                            </Typography>
                             <Box display="flex" flexWrap="wrap" gap={1}>
                                 {keybertKeywords.map((kw, index) => (
                                <Chip label={kw} key={index} variant="outlined" sx={{ typography: 'body1' }} />
                            ))}
                             </Box>
                           
                        </Box>
                    )}
                </Grid>

                <Grid item xs={12} md={6}>

                    {errorGemini && (
                        <Typography color="error" variant="body2">
                            {errorGemini}
                        </Typography>
                    )}
                    {loadingGemini && <CircularProgress />}
                    {!loadingGemini && geminiKeywords.length > 0 && (
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Gemini Keywords
                            </Typography>
                            <Box display="flex" flexWrap="wrap" gap={1}>

                                {geminiKeywords.map((kw, index) => (
                                    <Chip label={kw} key={index} variant="outlined" color="secondary" sx={{ typography: 'body1' }} />
                                ))}
                            </Box>

                        </Box>

                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default KeywordSection;
