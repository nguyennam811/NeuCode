import {
  Box,
  CircularProgress,
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
import React from "react";
import { formatTimeSubmit } from "../../../../utils/time";
import { mapLanguageSubmission } from "../../../../utils/mapLanguage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTestResult } from "../../../../store/actions/testResultAction";
import { useState } from "react";
import { memo } from "react";
import { getCellColor } from "../../../../utils/status";
import ScoreSubmission from "./ScoreSubmission";
import { getSubmissionById } from "../../../../store/actions/submissionAction";

function SubmissionResult() {
  // const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   "& td, & th": {
  //     border: "1px solid #a19797",
  //   },
  // }));
  // const submission = useSelector((reducers) => reducers.submission.data);
  // const test_result = useSelector((reducers) => reducers.test_result.data)
  // console.log(test_result)
  // const [shouldProceed, setShouldProceed] = useState(false);

  const dispatch = useDispatch();

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "& td, & th": {
      border: "1px solid #a19797",
    },
  }));

  const [reloadCounter, setReloadCounter] = useState(0);

  const submission = useSelector((reducers) => reducers.submission.data);
  console.log(submission);

  useEffect(() => {
    if (Object.keys(submission).length > 0) { 
      dispatch(getTestResult(submission.id));
      dispatch(getSubmissionById(submission.id));
    }
  }, [submission.id, reloadCounter]);

  const test_result = useSelector((reducers) => reducers.test_result.data);
  console.log(test_result);

  // const submission_id = useSelector((reducers) => reducers.submission.data);
  // console.log('submission_id', submission_id);

  useEffect(() => {
    if (Object.keys(submission).length > 0 && test_result.length === 0) { 
      const intervalId = setInterval(() => {
        setReloadCounter((prevCounter) => prevCounter + 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [test_result, dispatch, submission]);

  // useEffect(() => {
  //   if (test_result.length > 0) {
  //     setShouldProceed(true);
  //   } else{
  //     setShouldProceed(false);
  //   }
  // }, [test_result]);

  return (
    <>
      {Object.keys(submission).length === 0 ? (
        "Hãy submit đi nhé"
      ) : test_result.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#cdd0d3" }}>
              <StyledTableRow>
                <TableCell>Time Submitted</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Runtime</TableCell>
                <TableCell>Memory</TableCell>
                <TableCell>Language</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {test_result.map((test) => (
                <StyledTableRow key={test.id}>
                  <TableCell>{formatTimeSubmit(test.created)}</TableCell>
                  <TableCell sx={{color: getCellColor(test.status_data)}}><Typography>{test.status_data}</Typography></TableCell>
                  <TableCell>{test.time.toFixed(2)} s</TableCell>
                  <TableCell>{test.memory.toFixed(2)} MB</TableCell>
                  <TableCell>
                    {mapLanguageSubmission(submission.language)}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          
                    {/* <ScoreSubmission /> */}
                    <TableCell>
    <Box>
      <Typography fontSize={20}>Điểm của bạn: {submission.score}</Typography>
    </Box>
    </TableCell>
                  
        </TableContainer>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default memo(SubmissionResult);
