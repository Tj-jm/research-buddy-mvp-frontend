import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { listFacultyScrapes, deleteFacultyScrape } from "../utils/api";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SavedScraperList() {
  const [scrapes, setScrapes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const fetchData = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await listFacultyScrapes({ page: pageNum, limit: 25 });
      setScrapes(res.data.items || []);
      setTotalPages(res.data.total_pages || 1);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteFacultyScrape(deleteId);
      setScrapes((prev) => prev.filter((s) => s.id !== deleteId));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
    setConfirmOpen(false);
    setDeleteId(null);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" color="secondary" gutterBottom fontWeight="bold">
        Saved Faculty Scrapes
      </Typography>

      <Stack spacing={2}>
        {scrapes.map((scrape) => (
          <Card
            key={scrape.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-2px)",
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ wordBreak: "break-all" }}
              >
                {scrape.url}
              </Typography>
            </CardContent>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                color="primary"
                size="large"
                onClick={() => navigate(`/faculty-scrapper/${scrape.id}`)}
                sx={{
                  bgcolor: "primary.light",
                  color: "white",
                  "&:hover": {
                    bgcolor: "primary.main",
                  },
                }}
              >
                <ArrowForwardIcon />
              </IconButton>

              <IconButton
                color="error"
                size="large"
                onClick={() => handleDeleteClick(scrape.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Stack>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      {/* Delete confirmation modal */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this scrape? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
