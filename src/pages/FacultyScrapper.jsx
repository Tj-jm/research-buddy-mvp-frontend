import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  scrapeFaculty,
  downloadFacultyFile,
  saveFacultyScrape,
} from "../utils/api";
import FacultyForm from "../components/FacultyForm";
import FacultyStats from "../components/FacultyStats";
import FacultyTable from "../components/FacultyTable";
import FacultyProgress from "../components/FacultyProgress";

export default function FacultyScraper() {
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState("scrape");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [maxVisits, setMaxVisits] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await scrapeFaculty({
        url,
        mode,
        use_selenium: true,
        filetype: "xlsx",
        max_profile_visits: maxVisits,
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
      setDialogMessage("Scrape failed. Please try again.");
      setDialogOpen(true);
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (data?.files?.xlsx) {
      downloadFacultyFile(data.files.xlsx);
    }
  };

  const handleSave = async () => {
    try {
      await saveFacultyScrape({
        url,
        rows: data.rows,
        stats: data.stats,
        files: data.files,
        filetype: "xlsx",
      });
      setDialogMessage("Scrape saved successfully!");
      setDialogOpen(true);
    } catch (err) {
      console.error(err);
      setDialogMessage("Failed to save. Please try again.");
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    if (dialogMessage.includes("successfully")) {
      navigate("/faculty-scrapper-list");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Faculty Scraper
      </Typography>

      <Card style={{ marginBottom: 20 }}>
        <CardContent>
          <FacultyForm
            url={url}
            setUrl={setUrl}
            mode={mode}
            setMode={setMode}
            maxVisits={maxVisits}
            setMaxVisits={setMaxVisits}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </CardContent>
      </Card>

      {loading && <FacultyProgress active={loading} />}

      {data && (
        <>
          <FacultyStats stats={data.stats} onDownload={handleDownload} />
          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
            sx={{ mr: 2, mt: 2, mb:5 }}
          >
            Save
          </Button>
          <FacultyTable rows={data.rows} />
        </>
      )}

      {/* Modal */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
