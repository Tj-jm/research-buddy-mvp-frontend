import React from "react";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Star, StarBorder } from "@mui/icons-material";
const PaperCard = ({ paper, idx, onDelete, onToggleFavorite }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      key={paper._id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 3,
          mb: 2,
          borderRadius: "14px",
          background: paper.favorite?
          "linear-gradient(135deg, #D500F9, #414345)":"linear-gradient(135deg, #232526, #414345)",
          color: "#fff",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {paper.title}
        </Typography>

        <Box display="flex" justifyContent="flex-end" gap={1}>
          <IconButton onClick={() => onToggleFavorite(paper._id, !paper.favorite)}>
            {paper.favorite ? <Star color="warning" /> : <StarBorder />}
          </IconButton>
          <IconButton
            color="error"
            onClick={() => onDelete(paper._id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => navigate(`/paper/${paper._id}`)}
          >
            <PrecisionManufacturingIcon />
          </IconButton>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default PaperCard;
