import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function FacultyTable({ rows }) {
  if (!rows || rows.length === 0) return null;

  // ✅ Remove image_url from visible keys
  const keys = Object.keys(rows[0]).filter((k) => k !== "image_url");

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {keys.map((key) => (
              <TableCell key={key}>
                <Typography variant="body1" fontWeight="bold">
                  {key.toUpperCase()}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {keys.map((key) => (
                <TableCell key={key}>
                  {/* profile_url → clickable link */}
                  {key === "profile_url" && row[key] ? (
                    <Typography variant="body1">
                      <a
                        href={row[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#1976d2" }}
                      >
                        View Profile
                      </a>
                    </Typography>
                  ) : key === "email" && row[key] ? (
                    // email → copy button
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          maxWidth: 180,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          marginRight: 8,
                        }}
                      >
                        {row[key]}
                      </Typography>
                      <Tooltip title="Copy email">
                        <IconButton
                          size="small"
                          onClick={() => handleCopy(row[key])}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  ) : (
                    <Typography variant="body1">{row[key]}</Typography>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
