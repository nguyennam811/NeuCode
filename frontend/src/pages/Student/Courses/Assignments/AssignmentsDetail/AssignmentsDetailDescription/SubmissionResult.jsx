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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { memo } from "react";
import { getTestResult } from "../../../../../../store/actions/testResultAction";
import {
  getSubmissionById,
  getSubmissions,
} from "../../../../../../store/actions/submissionAction";
import { formatTimeSubmissions, formatTimeSubmit } from "../../../../../../utils/time";
import { getCellColor } from "../../../../../../utils/status";
import { mapLanguageSubmission } from "../../../../../../utils/mapLanguage";
import HistoryAssignment from "./HistoryAssignment";
import { useLoaderData, useParams } from "react-router-dom";
import { setDetailSubmission } from "../../../../../../store/reducers/submissionReducer";
import ErrorData from "../../../../../ErrorData";
import { setTestResult } from "../../../../../../store/reducers/testResultReducer";

function SubmissionResult({ historyAssignment }) {
  const dispatch = useDispatch();
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "& td, & th": {
      border: "1px solid #a19797",
    },
  }));
  const [reloadCounter, setReloadCounter] = useState(0);

  // const current_user = useLoaderData();
  // const assignment = useParams();
  // const [fetchingParams, setFetchingParams] = useState({
  //   offset: 0,
  //   limit: 10,
  //   submiter_id: current_user.sub,
  //   assignment_id: assignment.id,
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

  const assignment = useParams();
  const current_user = useLoaderData();
  useEffect(() => {
    if (historyAssignment === true) {
      dispatch(setDetailSubmission({}));
      dispatch(setTestResult([]));
      dispatch(
        getSubmissions({
          offset: 0,
          limit: 10,
          submiter_id: current_user.sub,
          assignment_id: assignment.id,
        })
      );
    } else if (Object.keys(submission).length > 0) {
      dispatch(getTestResult(submission.id));
      dispatch(getSubmissionById(submission.id));
    }
  }, [historyAssignment, submission.id, reloadCounter]);

  const test_result = useSelector((reducers) => reducers.test_result.data);
  console.log(test_result);

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
      {historyAssignment === false ? (
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
                      <TableCell>{formatTimeSubmissions(test.created)}</TableCell>
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
            <HistoryAssignment data={data?.data ?? []} />
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

// import {
//   Box,
//   CircularProgress,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   styled,
// } from "@mui/material";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useState } from "react";
// import { memo } from "react";
// import { getTestResult } from "../../../../../../store/actions/testResultAction";
// import { getSubmissionById } from "../../../../../../store/actions/submissionAction";
// import { formatTimeSubmit } from "../../../../../../utils/time";
// import { getCellColor } from "../../../../../../utils/status";
// import { mapLanguageSubmission } from "../../../../../../utils/mapLanguage";
// import HistoryAssignment from "./HistoryAssignment";

// function SubmissionResult({ historyAssignment }) {
//   // const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   //   "& td, & th": {
//   //     border: "1px solid #a19797",
//   //   },
//   // }));
//   // const submission = useSelector((reducers) => reducers.submission.data);
//   // const test_result = useSelector((reducers) => reducers.test_result.data)
//   // console.log(test_result)
//   // const [shouldProceed, setShouldProceed] = useState(false);

//   const dispatch = useDispatch();

//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "& td, & th": {
//       border: "1px solid #a19797",
//     },
//   }));

//   const [reloadCounter, setReloadCounter] = useState(0);

//   const submission = useSelector((reducers) => reducers.submission.detail);
//   console.log(submission);

//   useEffect(() => {
//     if (Object.keys(submission).length > 0) {
//       dispatch(getTestResult(submission.id));
//       dispatch(getSubmissionById(submission.id));
//     }
//   }, [submission.id, reloadCounter]);

//   const test_result = useSelector((reducers) => reducers.test_result.data);
//   console.log(test_result);

//   // const submission_id = useSelector((reducers) => reducers.submission.data);
//   // console.log('submission_id', submission_id);

//   useEffect(() => {
//     if (Object.keys(submission).length > 0 && test_result.length === 0) {
//       const intervalId = setInterval(() => {
//         setReloadCounter((prevCounter) => prevCounter + 1);
//       }, 1000);
//       return () => {
//         clearInterval(intervalId);
//       };
//     }
//   }, [test_result, dispatch, submission]);

//   // useEffect(() => {
//   //   if (test_result.length > 0) {
//   //     setShouldProceed(true);
//   //   } else{
//   //     setShouldProceed(false);
//   //   }
//   // }, [test_result]);
//   console.log("historyAssignment", historyAssignment);

//   return (
//     <>
//       {historyAssignment === false ? (
//         <>
//           {Object.keys(submission).length === 0 ? (
//             "Hãy submit đi nhé"
//           ) : test_result.length > 0 ? (
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead sx={{ backgroundColor: "#cdd0d3" }}>
//                   <StyledTableRow>
//                     <TableCell>Time Submitted</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell>Runtime</TableCell>
//                     <TableCell>Memory</TableCell>
//                     <TableCell>Language</TableCell>
//                   </StyledTableRow>
//                 </TableHead>
//                 <TableBody>
//                   {test_result.map((test) => (
//                     <StyledTableRow key={test.id}>
//                       <TableCell>{formatTimeSubmit(test.created)}</TableCell>
//                       <TableCell sx={{ color: getCellColor(test.status_data) }}>
//                         <Typography>{test.status_data}</Typography>
//                       </TableCell>
//                       <TableCell>{test.time.toFixed(2)} s</TableCell>
//                       <TableCell>{test.memory.toFixed(2)} MB</TableCell>
//                       <TableCell>
//                         {mapLanguageSubmission(submission.language)}
//                       </TableCell>
//                     </StyledTableRow>
//                   ))}
//                 </TableBody>
//               </Table>

//               {/* <ScoreSubmission /> */}
//               <TableCell>
//                 <Box>
//                   <Typography fontSize={20}>
//                     Điểm của bạn: {submission.score}
//                   </Typography>
//                 </Box>
//               </TableCell>
//             </TableContainer>
//           ) : (
//             <CircularProgress />
//           )}
//         </>
//       ) : (
//         <>
//           <h1>hihi lichj suwr</h1>
//           <HistoryAssignment />
//         </>
//       )}
//     </>
//   );
// }

// export default memo(SubmissionResult);
