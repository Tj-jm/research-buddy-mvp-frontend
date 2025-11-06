import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { savePaper } from "../utils/api";
import { extractAbstractSection } from "../utils/extractAbstract";

const SavePaperModal = ({ open, onClose, result, file, summaries, keywords }) => {
  const [title, setTitle] = useState("");
  const [summaryChoice, setSummaryChoice] = useState("transformer");
  const [keywordChoice, setKeywordChoice] = useState("keybert");
  const [cleanAbstract, setCleanAbstract] = useState("");

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  useEffect(() => {
    if (result?.abstract) {
      const extracted = extractAbstractSection(result.abstract);
      setCleanAbstract(extracted || "");

      if (extracted) {
        const first30 = result?.abstract.split(" ").slice(0, 30).join(" ");
        setTitle(first30);
      }
    }
  }, [result]);

  const handleSave = async () => {
    try {
      if (!file) {
        setSnackbar({ open: true, message: "File is missing! Cannot save.", severity: "error" });
        return;
      }

      const formData = new FormData();
      formData.append("title", title || "Untitled Paper");
      formData.append("abstract", cleanAbstract || "");

      const chosenSummary =
        summaryChoice === "transformer" ? summaries?.transformer : summaries?.gemini;
      formData.append("summary", chosenSummary || "");

      const chosenKeywords =
        keywordChoice === "keybert" ? keywords?.keybert : keywords?.gemini;
      formData.append(
        "keywords",
        chosenKeywords && chosenKeywords.length > 0 ? chosenKeywords.join(",") : ""
      );

      formData.append("file", file);

      await savePaper(formData);
      setSnackbar({ open: true, message: "Paper saved successfully!", severity: "success" });

      // wait a bit, then go to dashboard
      setTimeout(() => {
        onClose();
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to save paper", severity: "error" });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Save Paper</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title (auto from first 30 words)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            multiline
            margin="normal"
          />
          <TextField
            fullWidth
            label="Abstract"
            value={cleanAbstract}
            multiline
            rows={3}
            margin="normal"
          />

          <Typography variant="subtitle1" mt={2}>
            Choose Summary
          </Typography>
          <RadioGroup value={summaryChoice} onChange={(e) => setSummaryChoice(e.target.value)}>
            <FormControlLabel value="transformer" control={<Radio />} label="Transformer Summary" />
            <FormControlLabel value="gemini" control={<Radio />} label="Gemini Summary" />
          </RadioGroup>

          <Typography variant="subtitle1" mt={2}>
            Choose Keywords
          </Typography>
          <RadioGroup value={keywordChoice} onChange={(e) => setKeywordChoice(e.target.value)}>
            <FormControlLabel value="keybert" control={<Radio />} label="KeyBERT Keywords" />
            <FormControlLabel value="gemini" control={<Radio />} label="Gemini Keywords" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SavePaperModal;
