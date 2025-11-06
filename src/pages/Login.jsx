import React, { useState, useContext } from "react";
import { login } from "../utils/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await login(email, password); // sets cookie server-side
      setUser({ email }); // optimistic update (backend session verified in AuthProvider later)
      setMessage({ success: true, text: "Logged in successfully!" });

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMessage({
        success: false,
        text: "Login failed: " + (err.response?.data?.detail || err.message),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 6, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      {message && (
        <Alert severity={message.success ? "success" : "error"}>
          {message.text}
        </Alert>
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
        onClick={handleLogin}
        disabled={loading}
        fullWidth
        sx={{ mt: 2 }}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </Paper>
  );
};

export default Login;
