import React from "react";
import {
  Box,
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addCourse,
  deleteCourses,
  getCourses,
  updateCourse,
} from "../../../store/actions/courseAction";
import TableFrameDetail from "../../../components/TableFrame/TableFrameDetail";
import { useMemo } from "react";
import { formatResponseTime } from "../../../utils/time";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import CourseCreateFormDialog from "./CourseCreateFormDialog";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import ErrorData from "../../ErrorData";
import CourseUpdateFormDialog from "./CourseUpdateFormDialog";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupsIcon from "@mui/icons-material/Groups";

export const coursesTableHeaders = [
  {
    id: "course_name",
    label: "Course Name",
    numeric: false,
    disablePadding: false,
    renderFn: (course) => course.course_name,
    descComparatorFn: (a, b) => {
      if (b.course_name < a.course_name) {
        return -1;
      }
      if (b.course_name > a.course_name) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "course_time",
    label: "Course Time",
    numeric: false,
    disablePadding: false,
    renderFn: (course) => course.course_time,
    descComparatorFn: (a, b) => {
      if (b.course_time < a.course_time) {
        return -1;
      }
      if (b.course_time > a.course_time) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "course_description",
    label: "Description",
    numeric: false,
    disablePadding: false,
    renderFn: (course) => course.course_description,
    descComparatorFn: (a, b) => {
      if (b.course_description < a.course_description) {
        return -1;
      }
      if (b.course_description > a.course_description) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "author",
    label: "Author",
    numeric: false,
    disablePadding: false,
    renderFn: (course) => course.user.fullname,
  },
  {
    id: "students",
    label: "Students",
    numeric: true,
    disablePadding: false,
    renderFn: (course) => course.student_course.length,
  },
];

const CoursesTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const current_user = useLoaderData();
  const [isShowCreateDialog, setIsShowCreateDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState();
  const [fetchingParams, setFetchingParams] = useState({
    offset: 0,
    limit: 10,
    teacher_id: current_user.sub,
  });
  useEffect(() => {
    dispatch(getCourses(fetchingParams));
  }, [fetchingParams]);

  const data = useSelector((reducers) => reducers.course.data);
  const status = useSelector((reducers) => reducers.course.status);
  console.log(status);
  console.log(data);

  //Search
  const courseSearchFields = [
    { id: "course_name", title: "Course Name" },
    { id: "course_time", title: "Course Time" },
  ];

  const handleCourseSearch = (searchOptions) => {
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

  const handleCreateCourse = async (values) => {
    console.log(values);
    await dispatch(addCourse(values));
    dispatch(getCourses(fetchingParams));
  };

  const handleUpdateCourse = async (values) => {
    console.log(values);
    await dispatch(updateCourse(values));
    dispatch(getCourses(fetchingParams));
  };

  const handleCourseDeleteRows = async (ids) => {
    console.log(ids);
    await dispatch(deleteCourses(ids));
    dispatch(getCourses(fetchingParams));
  };

  const isEditing = editingCourse !== undefined;

  const updatedHeadCourses = useMemo(() => {
    return [
      ...coursesTableHeaders,
      {
        id: "created",
        label: "Created",
        numeric: false,
        disablePadding: false,
        renderFn: (course) => formatResponseTime(course.created),
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
        renderFn: (course) => formatResponseTime(course.updated),
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
      {
        id: "row-actions",
        label: "Actions",
        numeric: false,
        disablePadding: false,
        renderFn: (course) => (
          <ButtonGroup
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Tooltip title="Update Course">
              <IconButton
                color="warning"
                aria-label="edit course"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingCourse(course);
                }}
              >
                <ModeEditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Problems List">
              <IconButton
                aria-label="view"
                color="info"
                onClick={() => {
                  navigate(`${course.id}`);
                }}
              >
                <ListAltIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Student List">
              <IconButton
                aria-label="view"
                color="error"
                onClick={() => {
                  navigate(`${course.id}/students`);
                }}
              >
                <GroupsIcon />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        ),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {status === "error" && <ErrorData />}
      {!isEditing && (
        <CourseCreateFormDialog
          open={isShowCreateDialog}
          onSave={handleCreateCourse}
          onClose={() => setIsShowCreateDialog(false)}
        />
      )}
      {isEditing && (
        <CourseUpdateFormDialog
          row={editingCourse}
          open={isEditing}
          onSave={handleUpdateCourse}
          onClose={() => {
            setEditingCourse(undefined);
          }}
          initialFn={(course) => ({
            id: course.id,
            teacher_id: course.teacher_id,
            course_name: course.course_name,
            course_time: course.course_time,
            course_description: course.course_description ?? "",
          })}
        />
      )}
      <Box p={8} pt={2}>
        {status !== "error" && (
          <TableFrameDetail
            title="Table Courses"
            data={data?.data ?? []}
            isLoading={status === "loading"}
            total={data?.total ?? 0}
            searchFields={courseSearchFields}
            // filterOptions={filterOptions}
            numOfColumnsInFilter={4}
            headCells={updatedHeadCourses}
            onPagination={handlePagination}
            showCheckbox={true}
            onSearch={handleCourseSearch}
            // onFilter={handleProblemFilter}
            handleNewClick={() => {
              setIsShowCreateDialog(true);
            }}
            onDeleteRows={handleCourseDeleteRows}
          />
        )}
      </Box>
    </>
  );
};

export default CoursesTeacher;
