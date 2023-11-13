import React from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { formatTimeSubmit } from "../../../../../../utils/time";
import {
  calculateOverallStatus,
  getCellColor,
  getTotalMemory,
  getTotalTime,
} from "../../../../../../utils/status";
import { mapLanguageSubmission } from "../../../../../../utils/mapLanguage";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Editor from "@monaco-editor/react";

function HistoryAssignment({ data }) {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "& td, & th": {
      border: "1px solid #a19797",
    },
  }));

  const [activeAssignmentId, setActiveAssignmentId] = useState(null);

  const handleClickOpen = (assignmentId) => {
    setActiveAssignmentId(assignmentId);
  };

  const handleClose = () => {
    setActiveAssignmentId(null);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#cdd0d3" }}>
            <StyledTableRow>
              <TableCell>Time Submitted</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Runtime</TableCell>
              <TableCell>Memory</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Actions</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.map((assignment) => (
              <StyledTableRow key={assignment.id}>
                <TableCell>{formatTimeSubmit(assignment.created)}</TableCell>
                <TableCell>
                  {calculateOverallStatus(assignment.tests_result)}
                </TableCell>
                <TableCell>
                  {`${assignment.score} / ${assignment.tests_result.length}`}
                </TableCell>
                <TableCell>{getTotalTime(assignment.tests_result)}</TableCell>
                <TableCell>
                  {getTotalMemory(assignment.tests_result)} MB
                </TableCell>
                <TableCell>
                  {mapLanguageSubmission(assignment.language)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleClickOpen(assignment.id)}
                  >
                    View Results
                  </Button>

                  <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={activeAssignmentId === assignment.id}
                  >
                    <DialogTitle
                      sx={{ m: 0, p: 2 }}
                      id="customized-dialog-title"
                    >
                      Results Test
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
                      {/* //detail test */}
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
                          {assignment.tests_result.map((test) => (
                            <StyledTableRow key={test.id}>
                              <TableCell>
                                {formatTimeSubmit(test.created)}
                              </TableCell>
                              <TableCell
                                sx={{ color: getCellColor(test.status_data) }}
                              >
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
                          Language:{" "}
                          {mapLanguageSubmission(assignment?.language)}
                        </Typography>
                      </Box>
                      <Paper elevation={3}>
                        <Editor
                          height="460px"
                          width="100%"
                          theme={"vs-dark"}
                          loading="Loading..."
                          language={assignment?.language}
                          value={assignment?.code}
                          options={{
                            fontSize: `20px`,
                            readOnly: true,
                          }}
                        />
                      </Paper>
                      {/* detail test */}
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleClose}>
                        CANCEL
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default HistoryAssignment;
