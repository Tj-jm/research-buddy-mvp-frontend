import React from "react";
import { Typography, Button, Card, CardContent } from "@mui/material";

export default function FacultyStats({ stats, onDownload }) {
  return (
    <Card style={{ marginBottom: 20 }}>
      <CardContent>
        <Typography>Total: {stats.total}</Typography>
        <Typography>With Email: {stats.with_email}</Typography>
        <Typography>With Profile URL: {stats.with_profile_url}</Typography>
        <Button
          variant="outlined"
          onClick={onDownload}
          style={{ marginTop: 10 }}
        >
          Download Excel
        </Button>
      </CardContent>
    </Card>
  );
}
