import React from "react";
import { deleteCourseStudent, getCourseStudent } from "../../../../store/actions/courseStudentAction";
import ErrorData from "../../../ErrorData";
import { Box } from "@mui/material";
import TableFrameDetail from "../../../../components/TableFrame/TableFrameDetail";
import { formatTimeSubmit } from "../../../../utils/time";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StudentListCreateFormDialog from "./StudentListCreateFormDialog";
import { getStudents } from "../../../../store/actions/studentAction";

export const courseStudentTableHeaders = [
  {
    id: "course_name",
    label: "Course Name",
    numeric: false,
    disablePadding: false,
    renderFn: (courseStudent) => courseStudent.courses.course_name,
  },
  {
    id: "student_id",
    label: "Student ID",
    numeric: false,
    disablePadding: false,
    renderFn: (courseStudent) => courseStudent.student_id,
    descComparatorFn: (a, b) => {
      if (b.student_id < a.student_id) {
        return -1;
      }
      if (b.student_id > a.student_id) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "fullname",
    label: "Full Name",
    numeric: false,
    disablePadding: false,
    renderFn: (courseStudent) => courseStudent.user.fullname,
  },
  {
    id: "email",
    label: "Email",
    numeric: false,
    disablePadding: false,
    renderFn: (courseStudent) => courseStudent.user.email,
  },
  {
    id: "role",
    label: "Role",
    numeric: false,
    disablePadding: false,
    renderFn: (courseStudent) => courseStudent.user.role,
  },
  {
    id: "created",
    label: "Date Extra",
    numeric: false,
    disablePadding: false,
    renderFn: (course) => formatTimeSubmit(course.created),
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

function StudentList() {
  const dispatch = useDispatch();
  const courseId = useParams();
  const [isShowCreateDialog, setIsShowCreateDialog] = useState(false);
  const [fetchingParams, setFetchingParams] = useState({
    offset: 0,
    limit: 10,
    course_id: courseId.id,
  });
  useEffect(() => {
    dispatch(getCourseStudent(fetchingParams));
    dispatch(getStudents("student"));
  }, [fetchingParams]);

  const data = useSelector((reducers) => reducers.course_student.data);
  const status = useSelector((reducers) => reducers.course_student.status);
  console.log(status);
  console.log(data);

  const students = useSelector((reducers) => reducers.student.data);
  console.log(students);

  //filter students by course_student
  let studentOptions = []
  if (data?.data) {
    const studentIdsInClass = data.data.map((item) => item.student_id);
    const studentsNotInClass = students.filter(
      (student) => !studentIdsInClass.includes(student.id)
    );
    studentOptions = studentsNotInClass.map((user) => ({
      value: user.id,
      label: `${user.fullname} - ${user.id}`,
    }));

  }
  console.log(studentOptions);

  //Search
  const courseStudentSearchFields = [{ id: "student_id", title: "Student ID" }];

  const handleCourseStudentSearch = (searchOptions) => {
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
  //Search

  const handlePagination = (pageNumber, numberRowsPerPage) => {
    setFetchingParams({
      ...fetchingParams,
      offset: pageNumber * numberRowsPerPage,
      limit: numberRowsPerPage,
    });
  };

  const handleCreateCourseStudent = () => {
    dispatch(getCourseStudent(fetchingParams));
  };

  const handleCourseStudentDeleteRows = async (ids) => {
    console.log(ids);
    await dispatch(deleteCourseStudent(ids));
    dispatch(getCourseStudent(fetchingParams));
  };

  return (
    <>
      {status === "error" && <ErrorData />}

      <StudentListCreateFormDialog
        open={isShowCreateDialog}
        onSave={handleCreateCourseStudent}
        onClose={() => setIsShowCreateDialog(false)}
        studentOptions={studentOptions}
      />

      <Box p={8} pt={2}>
        {status !== "error" && (
          <TableFrameDetail
            title="List Course Students"
            data={data?.data ?? []}
            isLoading={status === "loading"}
            total={data?.total ?? 0}
            searchFields={courseStudentSearchFields}
            numOfColumnsInFilter={4}
            headCells={courseStudentTableHeaders}
            onPagination={handlePagination}
            showCheckbox={true}
            onSearch={handleCourseStudentSearch}
            handleNewClick={() => {
              setIsShowCreateDialog(true);
            }}
            onDeleteRows={handleCourseStudentDeleteRows}
          />
        )}
      </Box>
    </>
  );
}

export default StudentList;
