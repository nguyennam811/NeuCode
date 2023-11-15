import TableFrame from "../../../components/TableFrame";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProblems } from "../../../store/actions/problemAction";
import { formatResponseTime } from "../../../utils/time";
import ErrorData from "../../ErrorData";
// import FilterProblems from "./FilterProblems";
import { getColorDifficulty } from "../../../utils/status";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../../utils/auth";
import { getCourseStudent } from "../../../store/actions/courseStudentAction";
import FilterCourses from "./FilterCourses";

export const courseStudentTableHeaders = [
  {
    id: "course_name",
    label: "Course Name",
    numeric: false,
    disablePadding: false,
    renderFn: (courseStudent) => (
      <Link
        to={`${courseStudent.course_id}/assignments`}
        style={{
          color: "black",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.target.style.color = "red")}
        onMouseLeave={(e) => (e.target.style.color = "black")}
      >
        {courseStudent.courses.course_name}
      </Link>
    ),
  },
  {
    id: "course_time",
    label: "Course Time",
    numeric: false,
    disablePadding: false,
    renderFn: (courseStudent) => courseStudent.courses.course_time,
  },
  {
    id: "course_description",
    label: "Course Description",
    numeric: false,
    disablePadding: false,
    renderFn: (courseStudent) => courseStudent.courses.course_description,
  },
  
  {
    id: "teacher",
    label: "Teacher",
    numeric: false,
    disablePadding: false,
    renderFn: (courseStudent) => (
      <Link
        to={`/user/${courseStudent.courses.teacher_id}/`}
        style={{
          color: "black",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.target.style.color = "red")}
        onMouseLeave={(e) => (e.target.style.color = "black")}
      >
        {courseStudent.courses.user.fullname}
      </Link>
    ),
  },
  {
    id: "created",
    label: "Created",
    numeric: false,
    disablePadding: false,
    renderFn: (courseStudent) => formatResponseTime(courseStudent.created),
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
    renderFn: (courseStudent) => formatResponseTime(courseStudent.updated),
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

const Courses = () => {
  const current_user = getCurrentUser()
  const [fetchingParams, setFetchingParams] = useState({
    offset: 0,
    limit: 10,
    student_id: current_user.sub,
  });
  useEffect(() => {
    dispatch(getCourseStudent(fetchingParams));
  }, [fetchingParams]);

  const dispatch = useDispatch();

  const data = useSelector((reducers) => reducers.course_student.data);
  const status = useSelector((reducers) => reducers.course_student.status);
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
               List Courses
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
                  headCells={courseStudentTableHeaders}
                  onPagination={handlePagination}
                  showCheckbox={false}
                />
              </Box>
              <FilterCourses
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

export default Courses;
