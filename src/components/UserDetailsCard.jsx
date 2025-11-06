import React from "react";
import { Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";

const UserDetailsCard = ({ email }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: "16px",
          background: "linear-gradient(135deg, #1f1c2c, #928dab)",
          color: "#fff",
        }}
      >
        <Typography variant="h5" color='primary' gutterBottom>
          Welcome back, {email || "Researcher"}
        </Typography>
        <Typography >
          Manage your research papers and insights here.
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default UserDetailsCard;
