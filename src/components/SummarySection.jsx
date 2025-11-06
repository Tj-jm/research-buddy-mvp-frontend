import React, { useState } from 'react';
import {
    Paper, Typography, Button, Box, CircularProgress, Grid,
} from '@mui/material';
import { extractSummaryTransformer, extractSummaryGemini } from '../utils/api';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SummarySection = ({ abstract, onUpdate }) => {
    const [transformerSummary, setTransformerSummary] = useState('');
    const [geminiSummary, setGeminiSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSummary = async (source) => {
        setLoading(true);
        setError('');
        try {
            const res =
                source === 'transformer'
                    ? await extractSummaryTransformer(abstract)
                    : await extractSummaryGemini(abstract);
             if (source === 'transformer') {
                setTransformerSummary(res.data.summary);
                onUpdate?.({ transformer: res.data.summary, gemini: geminiSummary });
            } else {
                setGeminiSummary(res.data.summary);
                onUpdate?.({ transformer: transformerSummary, gemini: res.data.summary });
            }
            // source === 'transformer'
            //     ? setTransformerSummary(res.data.summary)
            //     : setGeminiSummary(res.data.summary);
        } catch (err) {
            setError(`Failed to summarize using ${source}.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={4} sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Summary Generator
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <Box display="flex" gap={2} mb={3}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleSummary('transformer')}
                    disabled={loading}
                >
                    Generate with Transformer
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleSummary('gemini')}
                    disabled={loading}
                >
                    Generate with Gemini
                </Button>
            </Box>

            {loading && (
                <Box textAlign="center">
                    <CircularProgress />
                </Box>
            )}

            <Grid container spacing={3}>
                {transformerSummary.split('*').filter(Boolean).map((point, idx) => (
                    <Box key={idx} display="flex" alignItems="flex-start" gap={1} mb={1}>
                        <CheckCircleOutlineIcon fontSize="small" color="primary" sx={{ mt: '3px' }} />
                        <Typography variant="body1">{point.trim()}</Typography>
                    </Box>
                ))}

                {geminiSummary && (
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                            Gemini Summary
                        </Typography>
                        {geminiSummary.split('*').filter(Boolean).map((point, idx) => (
                           
                           <Typography variant="body1" key={idx} sx={{ mb: 1 }}>
                                {point.trim()}
                            </Typography>
                        ))}

                    </Grid>
                )}
            </Grid>
        </Paper>
    );
};

export default SummarySection;
