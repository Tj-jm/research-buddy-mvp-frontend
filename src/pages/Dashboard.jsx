import React, { useEffect, useState, useContext } from "react";
import { Container, Typography, Box, Divider, CircularProgress } from "@mui/material";
import { getUserDetails, getPapers, deletePaper,toggleFavorite } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import UserDetailsCard from "../components/UserDetailsCard";
import PaperCard from "../components/PaperCard";
import ConfirmDialog from "../components/ConfirmDialog";
import PaperFilters from "../components/PaperFilters";
import { Pagination } from "@mui/material";
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  // for pagination searching and sorting

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [favoriteOnly, setFavoriteOnly] = useState(false);

 
  const handleToggleFavorite = async (id, newValue) => {
  try {
    await toggleFavorite(id, newValue);
    setPapers((prev) =>
      prev.map((p) => (p._id === id ? { ...p, favorite: newValue } : p))
    );
  } catch (err) {
    console.error("Toggle favorite failed:", err);
  }
};

  // debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput); // update real search only after 500ms pause
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserDetails();
        const res = await getPapers({
          page,
          limit,
          sort_by: sortBy,
          sort_order: sortOrder,
          search,
          favorite_only: favoriteOnly,
        });
        setPapers(res.data.results);
        setTotal(res.data.total);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit, sortBy, sortOrder, search, favoriteOnly,]);

  const handleDeleteRequest = (id) => {
    setSelectedPaper(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePaper(selectedPaper);
      setPapers((prev) => prev.filter((p) => p._id !== selectedPaper));
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setConfirmOpen(false);
      setSelectedPaper(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      {/* User details */}
      <UserDetailsCard email={user?.email} />

      <Divider sx={{ mb: 3 }} />

      {/* Papers list */}
      <Typography variant="h5" color='primary' gutterBottom>
        Your Papers
      </Typography>
      <PaperFilters
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        favoriteOnly={favoriteOnly}
        setFavoriteOnly={setFavoriteOnly}
      />


      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : papers.length === 0 ? (
        <Typography>No papers uploaded yet.</Typography>
      ) : (
        <Box
          sx={{
            alignContent: 'center'
          }}>
          <Box>
            {papers.map((paper, idx) => (
              <PaperCard
                key={paper._id}
                paper={paper}
                idx={idx}
                onDelete={handleDeleteRequest}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </Box>
          <Pagination
            count={Math.ceil(total / limit)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>

      )}

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Paper"
        message="Are you sure you want to delete this paper? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </Container>
  );
};

export default Dashboard;
