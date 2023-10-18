import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import React from "react";
import { formatTimeSubmit } from "../../../../utils/time";
import { mapLanguageSubmission } from "../../../../utils/mapLanguage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTestResult } from "../../../../store/actions/testResultAction";
import { useState } from "react";

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

  const dispatch = useDispatch()

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "& td, & th": {
      border: "1px solid #a19797",
    },
  }));
  const submission = useSelector((reducers) => reducers.submission.data);
  console.log(submission);
  useEffect(()=> {
    dispatch(getTestResult(submission.id))
  }, [submission.id])
  const test_result = useSelector((reducers) => reducers.test_result.data)
  console.log(test_result)

  // useEffect(() => {
  //   if (test_result.length > 0) {
  //     setShouldProceed(true);
  //   } else{
  //     setShouldProceed(false);
  //   }
  // }, [test_result]);

  
  return (
    <>
    {test_result.length > 0  ? 
    (<TableContainer component={Paper}>
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
              <TableCell>{test.status_data}</TableCell>
              <TableCell>{test.time}</TableCell>
              <TableCell>{test.memory}</TableCell>
              <TableCell>
                {mapLanguageSubmission(submission.language)}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>) : 
    <CircularProgress />
  }
    </>
  );
}

export default SubmissionResult;
