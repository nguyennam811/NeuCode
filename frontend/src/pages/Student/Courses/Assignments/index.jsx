import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import FilterAssignments from "./FilterAssignments";
import { Link, useParams } from "react-router-dom";
import { getAssignments } from "../../../../store/actions/assignmentAction";
import { getColorDifficulty } from "../../../../utils/status";
import { formatResponseTime, formatTimeSubmit } from "../../../../utils/time";
import ErrorData from "../../../ErrorData";
import TableFrame from "../../../../components/TableFrame";

export const assignmentsTableHeaders = [
  {
    id: "course_name",
    label: "Course Name",
    numeric: false,
    disablePadding: false,
    renderFn: (assignment) => assignment.courses.course_name,
  },
  {
    id: "problem_id",
    label: "ID Problem",
    numeric: false,
    disablePadding: false,
    // renderFn: (assignment) => assignment.problem_id,

    renderFn: (assignment) => (
      <Link
        to={`/student/courses/assignments/${assignment.id}`}
        style={{
          color: "black",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.target.style.color = "red")}
        onMouseLeave={(e) => (e.target.style.color = "black")}
      >
        {assignment.problem_id}
      </Link>
    ),
    descComparatorFn: (a, b) => {
      if (b.problem_id < a.problem_id) {
        return -1;
      }
      if (b.problem_id > a.problem_id) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "title",
    label: "Title",
    numeric: false,
    disablePadding: false,
    // renderFn: (assignment) => assignment.problems.title,
    renderFn: (assignment) => (
      <Link
        to={`/student/courses/assignments/${assignment.id}`}
        style={{
          color: "black",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.target.style.color = "red")}
        onMouseLeave={(e) => (e.target.style.color = "black")}
      >
        {assignment.problems.title}
      </Link>
    ),
  },
  {
    id: "deadline",
    label: "Deadline",
    numeric: false,
    disablePadding: false,
    renderFn: (assignment) => formatTimeSubmit(assignment.deadline),
    descComparatorFn: (a, b) => {
      if (b.deadline < a.deadline) {
        return -1;
      }
      if (b.deadline > a.deadline) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "difficulty",
    label: "Difficulty",
    numeric: false,
    disablePadding: false,
    renderFn: (assignment) => (
      <div
        dangerouslySetInnerHTML={{
          __html: getColorDifficulty(assignment.problems.difficulty),
        }}
      />
    ),
  },
  {
    id: "problem_type",
    label: "Problem Type",
    numeric: false,
    disablePadding: false,
    renderFn: (assignment) => assignment.problems.problem_type,
  },
  {
    id: "created",
    label: "Created",
    numeric: false,
    disablePadding: false,
    renderFn: (device) => formatResponseTime(device.created),
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
  {
    id: "updated",
    label: "Updated",
    numeric: false,
    disablePadding: false,
    renderFn: (device) => formatResponseTime(device.updated),
    descComparatorFn: (a, b) => {
      if (!a.updated || !b.updated) return 0;

      if (b.updated < a.updated) {
        return -1;
      }

      if (b.updated > a.updated) {
        return 1;
      }
      return 0;
    },
  },
];

const AssignmentsPage = () => {
  const courseId = useParams();
  const dispatch = useDispatch();
  const [fetchingParams, setFetchingParams] = useState({
    offset: 0,
    limit: 10,
    course_id: courseId.id,
  });
  useEffect(() => {
    dispatch(getAssignments(fetchingParams));
  }, [fetchingParams]);

  const data = useSelector((reducers) => reducers.assignment.data);
  const status = useSelector((reducers) => reducers.assignment.status);
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
    // let keys = Object.keys(searchAndFilter);
    // console.log('keto', keys)
    // let values = Object.values(searchAndFilter);
    // console.log('value', values)
    setFetchingParams({
      ...fetchingParams,
      offset: 0,
      ...searchAndFilter,
      //   ...keys.reduce((pre, cur, index) => {
      //     return {
      //       ...pre,
      //       [cur]: values[index],
      //     };
      //   }, {}),
    });
  };

  return (
    <>
      {status === "error" && <ErrorData />}
      <Box p={5} pt={2}>
        {status !== "error" && (
          <>
            <Typography variant="h5" gutterBottom>
              Assignment List
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              width="100%"
              justifyContent="space-between"
            >
              <Box width="72%">
                <TableFrame
                  // title="Table Devices"
                  data={data?.data ?? []}
                  isLoading={status === "loading"}
                  total={data?.total ?? 0}
                  numOfColumnsInFilter={4}
                  headCells={assignmentsTableHeaders}
                  onPagination={handlePagination}
                  showCheckbox={false}
                />
              </Box>
              <FilterAssignments
                data={data?.data ?? []}
                onSearchFilter={handleDeviceSearchAndFilter}
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default AssignmentsPage;
