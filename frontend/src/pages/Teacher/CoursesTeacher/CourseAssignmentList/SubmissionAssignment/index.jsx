// import React from "react";
// import { Box, Typography } from "@mui/material";

// const SubmissionAssignment = () => {
//   return (
//     <>
//       <Box
//         sx={{
//           my: 15,
//           textAlign: "center",
//           p: 2,
//           "& h4": {
//             fontWeight: "bold",
//             my: 2,
//             fontSize: "2rem",
//           },
//           "& p": {
//             textAlign: "justify",
//           },
//           "@media (max-width:600px)": {
//             mt: 0,
//             "& h4 ": {
//               fontSize: "1.5rem",
//             },
//           },
//         }}
//       >
//         <Typography variant="h4">Welcome To Neu Code</Typography>
//         <p>
//           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat quod,
//           suscipit, aperiam totam autem culpa cum eveniet dolorum quasi est
//           perspiciatis laborum. Nam recusandae nihil quia odio voluptatibus
//           facere omnis facilis rerum? Ab eum beatae nobis reiciendis, qui
//           temporibus aliquid, nesciunt velit sed quam recusandae necessitatibus,
//           tempora maxime. Repellendus incidunt, maxime labore dolorum eos
//           aperiam unde? At veritatis nesciunt eos quas cupiditate blanditiis est
//           quam maiores, amet, soluta exercitationem voluptatum, veniam
//           assumenda? Ratione perferendis officiis deserunt nostrum aspernatur
//           sed asperiores! Earum sunt placeat ducimus sint, deleniti amet esse
//           saepe voluptatem commodi laudantium quibusdam repellat nobis libero at
//           consectetur adipisci ipsa.
//         </p>
//         <br />
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
//           deserunt libero reprehenderit cum sint fugit cumque temporibus modi
//           facere eveniet amet obcaecati ducimus harum velit maxime vel qui
//           voluptatibus quam odio corrupti saepe, voluptas dolorum quidem
//           tempore? Esse sapiente molestias minus enim quisquam dolorum eum culpa
//           ullam impedit velit quo, corporis ducimus numquam dignissimos
//           inventore maiores. Nam deleniti itaque nostrum neque dolorum dolores,
//           aliquam, voluptatum sapiente doloribus laborum perspiciatis ipsam, quo
//           ut nisi distinctio sunt nihil est blanditiis perferendis eveniet
//           nesciunt! Nostrum, voluptatum eveniet repellat vel officia deleniti
//           tempore voluptatibus perferendis esse eaque temporibus porro?
//           Aspernatur beatae deleniti illo autem!
//         </p>
//       </Box>
//     </>
//   );
// };

// export default SubmissionAssignment;

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorData from "../../../../ErrorData";
import { getSubmissions } from "../../../../../store/actions/submissionAction";
import { calculateOverallStatus, getTotalMemory, getTotalTime } from "../../../../../utils/status";
import { formatResponseTime, formatTimeSubmit } from "../../../../../utils/time";
import { mapLanguageSubmission } from "../../../../../utils/mapLanguage";
import TableFrame from "../../../../../components/TableFrame";
import FilterSubmissions from "./FilterSubmissions";

export const submissionsTableHeaders = [
  {
    id: "title",
    label: "Title",
    numeric: false,
    disablePadding: false,
    renderFn: (submission) => (
      <Link
        to={`/teacher/problems/${submission.problem_id}`}
        style={{
          color: "black",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.target.style.color = "red")}
        onMouseLeave={(e) => (e.target.style.color = "black")}
      >
        {submission.problems.title}
      </Link>
    ),
  },
  {
    id: "submiter",
    label: "Student",
    numeric: false,
    disablePadding: false,
    renderFn: (submission) => submission.submiter.fullname,
  },
  {
    id: "language",
    label: "Language",
    numeric: false,
    disablePadding: false,
    renderFn: (submission) => mapLanguageSubmission(submission.language),
    descComparatorFn: (a, b) => {
      if (b.language < a.language) {
        return -1;
      }
      if (b.language > a.language) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "score",
    label: "Score",
    numeric: false,
    disablePadding: false,
    renderFn: (submission) => `${submission.score} / ${submission.tests_result.length}`,
    descComparatorFn: (a, b) => {
      if (b.score < a.score) {
        return -1;
      }
      if (b.score > a.score) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "status",
    label: "Status",
    numeric: false,
    disablePadding: false,
    renderFn: (submission) => calculateOverallStatus(submission.tests_result),
  },
  {
    id: "time",
    label: "Time",
    numeric: false,
    disablePadding: false,
    renderFn: (submission) => getTotalTime(submission.tests_result),
  },
  {
    id: "memory",
    label: "Memory",
    numeric: false,
    disablePadding: false,
    renderFn: (submission) => getTotalMemory(submission.tests_result),
  },
  {
    id: "created",
    label: "Created",
    numeric: false,
    disablePadding: false,
    renderFn: (submission) => formatTimeSubmit(submission.created),
    descComparatorFn: (a, b) => {
      if (b.created < a.created) {
        return -1;
      }
      if (b.created > a.created) {
        return 1;
      }
      return 0;
    },
  },
];

const SubmissionAssignment = () => {
    const assignment = useParams();
  const [fetchingParams, setFetchingParams] = useState({
    offset: 0,
    limit: 10,
    assignment_id: assignment.id,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubmissions(fetchingParams));
  }, [fetchingParams]);

  const data = useSelector((reducers) => reducers.submission.data);
  const status = useSelector((reducers) => reducers.submission.status);
  console.log(status);
  console.log(data);

  const handlePagination = (pageNumber, numberRowsPerPage) => {
    setFetchingParams({
      ...fetchingParams,
      offset: pageNumber * numberRowsPerPage,
      limit: numberRowsPerPage,
    });
  };

  const handleDeviceSearchAndFilter = (searchAndFilter) => {
    console.log(searchAndFilter);
    setFetchingParams({
      ...fetchingParams,
      offset: 0,
      ...searchAndFilter,
    });
  };

  return (
    <>
      {status === "error" && <ErrorData />}
      <Box p={5} pt={2}>
        {status !== "error" && (
          <>
            <Typography variant="h5" gutterBottom>
            Submissions Assignment
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              width="100%"
              justifyContent="space-between"
            >
              <Box width="72%">
                <TableFrame
                  data={data?.data ?? []}
                  isLoading={status === "loading"}
                  total={data?.total ?? 0}
                  numOfColumnsInFilter={4}
                  headCells={submissionsTableHeaders}
                  onPagination={handlePagination}
                  showCheckbox={false}
                />
              </Box>
              <FilterSubmissions
                onSearchFilter={handleDeviceSearchAndFilter}
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default SubmissionAssignment;