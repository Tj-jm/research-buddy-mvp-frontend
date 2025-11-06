import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  IconButton,
  CircularProgress,
  Stack,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getPaperById, downloadPaper } from "../utils/api";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PaperPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await getPaperById(id);
        setPaper(res.data);
      } catch (err) {
        console.error("Error fetching paper:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPaper();
  }, [id]);

  const handleDownload = async () => {
    try {
      await downloadPaper(id);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!paper) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography color="error">Paper not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", mt: 6 }}>
      {/*  Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        
        sx={{ mb: 2, color: "black", background: "#00E5FF", "&:hover": { background: "#17a84d", color:'white' } }}
      >
        Back
      </Button>

      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "white",
        }}
      >
        {/* Title + Download */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" fontWeight="bold">
            {paper.title}
          </Typography>
          <IconButton color="inherit" onClick={handleDownload}>
            <CloudDownloadIcon fontSize="large" />
          </IconButton>
        </Stack>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.2)" }} />

        {/* Abstract */}
        <Typography color='primary' variant="h6" gutterBottom>
          Abstract
        </Typography>
        <Typography  variant="body1" sx={{ mb: 3, color: "#d0d0d0" }}>
          {paper.abstract}
        </Typography>

        {/* Summary */}
        <Typography color='primary' variant="h6" gutterBottom>
          Summary
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "#d0d0d0" }}>
          {paper.summary || "No summary available"}
        </Typography>

        {/* Keywords */}
        <Typography color='primary' variant="h6" gutterBottom>
          Keywords
        </Typography>
        <Box sx={{ mb: 3 }}>
          {Array.isArray(paper.keywords) && paper.keywords.length > 0 ? (
            paper.keywords.map((kw, idx) => (
              <Chip
                key={idx}
                label={kw.trim()}
                sx={{ mr: 1, mb: 1, background: "#1db954", color: "white" }}
              />
            ))
          ) : (
            <Typography variant="body2" sx={{ color: "#bbb" }}>
              No keywords
            </Typography>
          )}
        </Box>

        {/* Upload Date */}
        {paper.createdAt && (
          <Typography variant="body2" sx={{ color: "#aaa" }}>
            Uploaded on: {new Date(paper.createdAt).toLocaleString()}
          </Typography>
        )}
      </Paper>

      {/* Reserved LLM Chat Section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 4,
          mt: 4,
          background: "linear-gradient(135deg, #232526, #414345)",
          color: "white",
        }}
      >
        <Typography color='secondary' variant="h5" gutterBottom>
          Research Assistant Chat (Coming Soon )
        </Typography>
        <Typography variant="body2" sx={{ color: "#bbb" }}>
          Here you’ll be able to chat with your paper using an integrated and fine-tuned LLM.
        </Typography>
      </Paper>
    </Box>
  );
};

export default PaperPage;
