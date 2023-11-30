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
import {
  getSubmissionById,
  getSubmissions,
} from "../../../../store/actions/submissionAction";
import { useLoaderData, useParams } from "react-router-dom";
import { setDetailSubmission } from "../../../../store/reducers/submissionReducer";
import { setTestResult } from "../../../../store/reducers/testResultReducer";
import ErrorData from "../../../ErrorData";
import HistoryProblem from "./HistoryProblem";

function SubmissionResult({ historyProblem }) {
  const dispatch = useDispatch();
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "& td, & th": {
      border: "1px solid #a19797",
    },
  }));

  const [reloadCounter, setReloadCounter] = useState(0);
  // const current_user = useLoaderData();
  // const problem = useParams();
  // const [fetchingParams, setFetchingParams] = useState({
  //   offset: 0,
  //   limit: 10,
  //   submiter_id: current_user.sub,
  //   problem_id: problem.id,
  // });

  // useEffect(() => {
  //   dispatch(getSubmissions(fetchingParams));
  // }, [fetchingParams]);

  const data = useSelector((reducers) => reducers.submission.data);
  const status = useSelector((reducers) => reducers.submission.status);
  console.log(status);
  console.log(data);

  const submission = useSelector((reducers) => reducers.submission.detail);
  console.log(submission);

  // useEffect(() => {
  //   if (Object.keys(submission).length > 0) {
  //     dispatch(getTestResult(submission.id));
  //     dispatch(getSubmissionById(submission.id));
  //   }
  // }, [submission.id, reloadCounter]);
  const problemId = useParams();
  const current_user = useLoaderData();

  useEffect(() => {
    if (historyProblem === true) {
      dispatch(setDetailSubmission({}));
      dispatch(setTestResult([]));
      dispatch(
        getSubmissions({
          offset: 0,
          limit: 10,
          submiter_id: current_user.sub,
          problem_id: problemId.id,
        })
      );
    } else if (Object.keys(submission).length > 0) {
      dispatch(getTestResult(submission.id));
      dispatch(getSubmissionById(submission.id));
    }
  }, [historyProblem, submission.id, reloadCounter]);

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

  return (
    <>
      {historyProblem === false ? (
        <>
          {test_result.length > 0 ? (
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
                      <TableCell sx={{ color: getCellColor(test.status_data) }}>
                        <Typography>{test.status_data}</Typography>
                      </TableCell>
                      <TableCell>{test.time.toFixed(2)} s</TableCell>
                      <TableCell>{test.memory.toFixed(2)} MB</TableCell>
                      <TableCell>
                        {mapLanguageSubmission(submission.language)}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>

              <TableCell>
                <Box>
                  <Typography fontSize={20}>
                    Your score: {submission.score}
                  </Typography>
                </Box>
              </TableCell>
            </TableContainer>
          ) : (
            <CircularProgress />
          )}
        </>
      ) : (
        <>
          {status === "loading" && <CircularProgress />}
          {status === "error" && <ErrorData />}

          {status === "success" && data?.data.length > 0 ? (
            <HistoryProblem data={data?.data ?? []} />
          ) : (
            <Typography variant="h5" mt={5}>
              You have not made any submissions
            </Typography>
          )}
        </>
      )}
    </>
  );
}

export default memo(SubmissionResult);
