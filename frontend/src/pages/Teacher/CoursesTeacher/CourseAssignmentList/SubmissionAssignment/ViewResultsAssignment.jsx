import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { formatTimeSubmissions, formatTimeSubmit } from "../../../../../utils/time";
import { getCellColor } from "../../../../../utils/status";
import Editor from "@monaco-editor/react";
import { mapLanguageSubmission } from "../../../../../utils/mapLanguage";
function ViewResultsAssignment({ isSubmission, setIsSubmission, viewResult }) {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "& td, & th": {
      border: "1px solid #a19797",
    },
  }));
  const handleClose = () => {
    setIsSubmission(false);
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isSubmission}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Results Test & Code
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Table>
          <TableHead sx={{ backgroundColor: "#cdd0d3" }}>
            <StyledTableRow>
              <TableCell>Time Submitted</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Runtime</TableCell>
              <TableCell>Memory</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {viewResult?.tests_result.map((test) => (
              <StyledTableRow key={test.id}>
                <TableCell>{formatTimeSubmissions(test.created)}</TableCell>
                <TableCell sx={{ color: getCellColor(test.status_data) }}>
                  <Typography>{test.status_data}</Typography>
                </TableCell>
                <TableCell>{test.time.toFixed(2)} s</TableCell>
                <TableCell>{test.memory.toFixed(2)} MB</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          mt={4}
        >
          <Typography variant="h6">Code</Typography>
          <Typography variant="h6">
            Language: {mapLanguageSubmission(viewResult?.language)}
          </Typography>
        </Box>
        <Paper elevation={3}>
          <Editor
            height="460px"
            width="100%"
            theme={"vs-dark"}
            loading="Loading..."
            language={viewResult?.language}
            value={viewResult?.code}
            options={{
              fontSize: `20px`,
              readOnly: true,
            }}
          />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewResultsAssignment;
