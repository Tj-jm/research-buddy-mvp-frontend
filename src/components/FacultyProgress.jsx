import { useEffect, useState } from "react";
import { LinearProgress, Typography, Box } from "@mui/material";

export default function FacultyProgress({ active }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;
    const evtSource = new EventSource("http://localhost:8000/api/faculty/progress?task_id=scrape");
    evtSource.onmessage = (event) => {
      setProgress(parseInt(event.data));
      if (parseInt(event.data) >= 100) evtSource.close();
    };
    return () => evtSource.close();
  }, [active]);

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="body2">Scraping progress: {progress}%</Typography>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
