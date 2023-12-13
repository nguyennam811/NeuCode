// import TableFrame from "../../../components/TableFrame";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { formatResponseTime, formatTimeSubmit } from "../../../utils/time";
import ErrorData from "../../ErrorData";
import { calculateOverallStatus, getTotalMemory, getTotalTime } from "../../../utils/status";
import { Link } from "react-router-dom";
import { deleteSubmissions, getSubmissions } from "../../../store/actions/submissionAction";
import { mapLanguageSubmission } from "../../../utils/mapLanguage";
// import FilterSubmissions from "./FilterSubmissions";
import TableFrameDetail from "../../../components/TableFrame/TableFrameDetail";
import { useMemo } from "react";
import ViewResultsAssignment from "../../Teacher/CoursesTeacher/CourseAssignmentList/SubmissionAssignment/ViewResultsAssignment";

export const submissionsTableHeaders = [
  {
    id: "title",
    label: "Title",
    numeric: false,
    disablePadding: false,
    renderFn: (submission) => (
      <Link
        to={`/admin/problems/${submission.problem_id}`}
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
    label: "Submitter",
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
    id: "course_name",
    label: "Course",
    numeric: false,
    disablePadding: false,
    renderFn: (submission) => {
      if (submission.assignment && submission.assignment.courses) {
        return submission.assignment.courses.course_name;
      }
      return null;
    },
  },
  // {
  //   id: "created",
  //   label: "Created",
  //   numeric: false,
  //   disablePadding: false,
  //   renderFn: (submission) => formatResponseTime(submission.created),
  //   descComparatorFn: (a, b) => {
  //     if (b.created < a.created) {
  //       return -1;
  //     }
  //     if (b.created > a.created) {
  //       return 1;
  //     }
  //     return 0;
  //   },
  // },
];

const SubmissionList = () => {
  const [fetchingParams, setFetchingParams] = useState({
    offset: 0,
    limit: 10,
  });

  const dispatch = useDispatch();
  const [isSubmission, setIsSubmission] = useState(false);
    const [viewResult, setViewReult] = useState();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submissionSearchFields = [
    { id: "title", title: "Title Problem" },
    { id: "fullname", title: "Full Name" },
  ];
  const handleSubmissionSearch = (searchOptions) => {
    let keys = Object.keys(searchOptions[0]);
    console.log(keys);
    let values = Object.values(searchOptions[0]);
    console.log(values);
    setFetchingParams({
      ...fetchingParams,
      offset: 0,
      search_key: keys[0],
      search_value: values[0],
    });
  };

  const handleSubmissionDeleteRows = async (ids) => {
    console.log(ids);
    await dispatch(deleteSubmissions(ids));
    dispatch(getSubmissions(fetchingParams));
  };

  return (
    <>
      {status === "error" && <ErrorData />}
        {status !== "error" && (
          <TableFrameDetail
          title="Table Submissions"
                  data={data?.data ?? []}
                  isLoading={status === "loading"}
                  total={data?.total ?? 0}
                  numOfColumnsInFilter={4}
                  headCells={updatedHeadAssignments}
                  onPagination={handlePagination}
                  showCheckbox={true}
                  searchFields={submissionSearchFields}
                  onSearch={handleSubmissionSearch}
                  onDeleteRows={handleSubmissionDeleteRows}
                />
              
        )}

<ViewResultsAssignment
        isSubmission={isSubmission}
        setIsSubmission={setIsSubmission}
        viewResult={viewResult}
      />
    </>
  );
};

export default SubmissionList;

