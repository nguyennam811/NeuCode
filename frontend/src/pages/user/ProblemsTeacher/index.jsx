import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  styled,
} from "@mui/material";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getProblems } from "../../../store/actions/problemAction";
import { formatResponseTime } from "../../../utils/time";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function ProblemsTeacher() {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "& td, & th": {
      border: "1px solid #a19797",
    },
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProblems());
  }, [dispatch]);

  const problems = useSelector((reducers) => reducers.problem.data);
  console.log(problems);

  const sortedProblems = [...problems].sort((a, b) => b.created - a.created);
  console.log(sortedProblems);

  const [open, setOpen] = React.useState(false);

  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [testCases, setTestCases] = useState([]);

  const handleClickOpen = (problemId) => {
    console.log(problemId);
    setSelectedProblemId(problemId);
    const newTestCases = [
      {
        problem_id: problemId,
        input: "",
        output: "",
      },
    ];
    setTestCases(newTestCases);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      { problem_id: selectedProblemId, input: "", output: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const handleSubmit = () => {
    // Gửi dữ liệu testCases lên máy chủ hoặc thực hiện xử lý dữ liệu ở đây
    console.log(testCases);
    setOpen(false);
  };

  const removeTestCase = (index) => {
    const updatedTestCases = [...testCases];
    updatedTestCases.splice(index, 1); // Xóa bộ test tại chỉ mục (index)
    setTestCases(updatedTestCases);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#cdd0d3" }}>
          <StyledTableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell>Problem Type</TableCell>
            <TableCell>Max Time</TableCell>
            <TableCell>Max Memory</TableCell>
            <TableCell>Test</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>updated</TableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {sortedProblems.map((problem) => (
            <StyledTableRow key={problem.id}>
              <TableCell>{problem.id}</TableCell>
              <TableCell>{problem.title}</TableCell>
              <TableCell>{problem.difficulty}</TableCell>
              <TableCell>{problem.problem_type}</TableCell>
              <TableCell>{problem.max_execution_time} s</TableCell>
              <TableCell>{problem.max_memory_limit}</TableCell>
              <TableCell>
                {problem.tests.length === 0 ? (
                  <Button onClick={() => handleClickOpen(problem.id)}>
                    Thêm Test
                  </Button>
                ) : (
                  <p>Đã có test.</p>
                )}
              </TableCell>
              <TableCell>{problem.user.fullname}</TableCell>

              <TableCell>{formatResponseTime(problem.created)}</TableCell>
              <TableCell>{formatResponseTime(problem.updated)}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
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
          <div>
            {testCases.map((testCase, index) => (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} marginBottom={3}>
                  <Grid item xs={5}>
                    <TextField
                      label="Input"
                      multiline
                      rows={2}
                      variant="outlined"
                      value={testCase.input}
                      onChange={(e) =>
                        handleInputChange(index, "input", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="Output"
                      multiline
                      rows={2}
                      variant="outlined"
                      value={testCase.output}
                      onChange={(e) =>
                        handleInputChange(index, "output", e.target.value)
                      }
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <Box>
                      <IconButton
                        aria-label="delete"
                        onClick={() => removeTestCase(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={addTestCase}>
            Thêm Test
          </Button>
          <Button variant="contained" autoFocus onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export default ProblemsTeacher;
