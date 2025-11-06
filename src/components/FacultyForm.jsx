import React from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

export default function FacultyForm({
  url,
  setUrl,
  mode,
  setMode,
  maxVisits,
  setMaxVisits,
  onSubmit,
  loading,
}) {
  return (
    <div>
      <TextField
        fullWidth
        label="Faculty Directory URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      <Select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        style={{ marginRight: 20 }}
      >
        <MenuItem value="scrape">Quick Scrape</MenuItem>
        <MenuItem value="deep_scrape">Deep Scrape</MenuItem>
      </Select>

      {/* Show only when deep scrape selected */}
      {mode === "deep_scrape" && (
        <TextField
          type="number"
          label="Max Profiles to Scrape"
          value={maxVisits || ""}
          onChange={(e) => setMaxVisits(Number(e.target.value))}
          style={{ marginRight: 20, width: 200 }}
          inputProps={{ min: 1 }}
        />
      )}

      <Button
        variant="contained"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? <CircularProgress size={20} /> : "Scrape"}
      </Button>
    </div>
  );
}
