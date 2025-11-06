import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getFacultyScrapeById, downloadFacultyFile } from "../utils/api";
import FacultyStats from "../components/FacultyStats";
import FacultyTable from "../components/FacultyTable";

export default function SavedScraperDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [scrape, setScrape] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getFacultyScrapeById(id);
        setScrape(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!scrape) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h6">No scrape data found</Typography>
      </Box>
    );
  }

  const handleDownload = () => {
    if (scrape.files?.xlsx) {
      downloadFacultyFile(scrape.files.xlsx);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Faculty Scrape Details
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
            <strong>URL:</strong> {scrape.url}
          </Typography>
          <FacultyStats stats={scrape.stats} onDownload={handleDownload} />
        </CardContent>
      </Card>

      <FacultyTable rows={scrape.rows} />

      <Box sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/faculty-scrapper-list")}
        >
          Back to List
        </Button>
      </Box>
    </Box>
  );
}
