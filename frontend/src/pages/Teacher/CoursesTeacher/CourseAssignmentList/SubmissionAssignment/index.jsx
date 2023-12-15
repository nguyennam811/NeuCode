import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorData from "../../../../ErrorData";
import { getSubmissions } from "../../../../../store/actions/submissionAction";
import { calculateOverallStatus, getTotalMemory, getTotalTime } from "../../../../../utils/status";
import { formatTimeSubmissions, formatTimeSubmit } from "../../../../../utils/time";
import { mapLanguageSubmission } from "../../../../../utils/mapLanguage";
import TableFrame from "../../../../../components/TableFrame";
import FilterSubmissions from "./FilterSubmissions";
import { useMemo } from "react";
import ViewResultsAssignment from "./ViewResultsAssignment";

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
  
];

const SubmissionAssignment = () => {
    const assignment = useParams();
    const [isSubmission, setIsSubmission] = useState(false);
    const [viewResult, setViewReult] = useState();
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

  const handleClickOpen = (results) => {
    console.log(results)
    setViewReult(results);
    setIsSubmission(true);
  };

  const updatedHeadAssignments = useMemo(() => {
    return [
      ...submissionsTableHeaders,
      {
        id: "row-actions",
        label: "Actions",
        numeric: false,
        disablePadding: false,
        renderFn: (submission) => (
          <Button
              variant="outlined"
              size="small"
              onClick={(e) => {
                e.stopPropagation(); 
                handleClickOpen(submission);

              }}
            >
              View Results
            </Button>
        ),
      },
      {
        id: "created",
        label: "Created",
        numeric: false,
        disablePadding: false,
        renderFn: (submission) => formatTimeSubmissions(submission.created),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  headCells={updatedHeadAssignments}
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

      <ViewResultsAssignment
        isSubmission={isSubmission}
        setIsSubmission={setIsSubmission}
        viewResult={viewResult}
      />
    </>
  );
};

export default SubmissionAssignment;