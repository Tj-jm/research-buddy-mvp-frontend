import React, { useState } from "react";
import { signup } from "../utils/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setMessage("");
    setIsSuccess(false);
    try {
      await signup(email, password);
      setMessage("Account created successfully. Please login.");
      setIsSuccess(true);
    } catch (err) {
      setMessage("Signup failed: " + (err.response?.data?.detail || err.message));
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 6, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>

      {message && (
        <Alert severity={isSuccess ? "success" : "error"}>{message}</Alert>
      )}

      <Box mt={2}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSignup}
        disabled={loading}
        fullWidth
        sx={{ mt: 2 }}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
    </Paper>
  );
};

export default Signup;
