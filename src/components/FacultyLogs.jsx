import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";

export default function FacultyLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/api/logs");
    ws.onmessage = (e) => {
      setLogs((prev) => [...prev, e.data]);
    };
    ws.onclose = () => console.log("Log socket closed");
    return () => ws.close();
  }, []);

  return (
    <Paper
      sx={{
        backgroundColor: "#111",
        color: "#0f0",
        padding: 2,
        height: 300,
        overflowY: "auto",
        fontFamily: "monospace",
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Scraper Logs
      </Typography>
      {logs.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </Paper>
  );
}
