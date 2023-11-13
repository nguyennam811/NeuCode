import React from "react";
import { Box, Button, ButtonGroup, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  addAssignment,
  deleteAssignments,
  getAssignments,
  updateAssignment,
} from "../../../../store/actions/assignmentAction";
import ErrorData from "../../../ErrorData";
import TableFrameDetail from "../../../../components/TableFrame/TableFrameDetail";
import { formatResponseTime, formatTimeSubmit } from "../../../../utils/time";
import { useMemo } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { VisibilityOutlined } from "@mui/icons-material";
import { getColorDifficulty } from "../../../../utils/status";
import AssignmentCreateFormDialog from "./AssignmentCreateFormDialog";
import AddTestDialog from "../../ProblemsTeacher/ProblemTest/AddTestDialog";
import UpdateTestDialog from "../../ProblemsTeacher/ProblemTest/UpdateTestDialog";
import AssignmentUpdateFormDialog from "./AssignmentUpdateFormDialog";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssignmentSubmission from "./AssignmentSubmission";
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
    renderFn: (assignment) => assignment.problem_id,
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
    renderFn: (assignment) => assignment.problems.title,
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
    id: "submission",
    label: "Submissions",
    numeric: true,
    disablePadding: false,
    renderFn: (assignment) => assignment.problems.submissions.length,
  },
];

const CoursesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courseId = useParams();
  const [isShowCreateDialog, setIsShowCreateDialog] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState();
  // const [isSubmission, setIsSubmission] = useState(false);

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

  //Search
  const assignmentSearchFields = [
    { id: "problem_id", title: "ID Problem" },
    { id: "title", title: "Title Problem" },
    { id: "difficulty", title: "Difficulty" },
    { id: "problem_type", title: "Type Problem" },
  ];
  const handleAssignmentSearch = (searchOptions) => {
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

  const handleCreateAssignment = async (values) => {
    const modifiedValues = {
      ...values,
      course_id: courseId.id,
    };
    console.log(modifiedValues);
    await dispatch(addAssignment(modifiedValues));
    dispatch(getAssignments(fetchingParams));
  };

  const handleUpdateAssignment = async (values) => {
    const modifiedValues = {
      ...values,
      course_id: courseId.id,
    };
    console.log(modifiedValues);
    await dispatch(updateAssignment(modifiedValues));
    dispatch(getAssignments(fetchingParams));
  };

  const handleAssignmentDeleteRows = async (ids) => {
    console.log(ids);
    await dispatch(deleteAssignments(ids));
    dispatch(getAssignments(fetchingParams));
  };

  const isEditing = editingAssignment !== undefined;

  //TEST
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  const [open, setOpen] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const handleClickOpen = (problemId) => {
    console.log(problemId);
    setSelectedProblemId(problemId);
    const newTestCases = [
      {
        problem_id: problemId,
        input: "",
        output: "",
      },
    ];
    setTestCases(newTestCases);
    setOpen(true);
  };

  const [openUpdateTestCases, setOpenUpdateTestCases] = useState(false);
  const [selectedProblemTests, setSelectedProblemTests] = useState([]);

  const XemTest = (tests, problem_id) => {
    const selectedFields = tests.map((test) => ({
      problem_id: test.problem_id,
      input: test.input,
      output: test.output,
      // id: test.id,
    }));
    setSelectedProblemTests(selectedFields);
    setSelectedProblemId(problem_id);
    setOpenUpdateTestCases(true);
  };

  const handleSubmitTest = () => {
    dispatch(getAssignments(fetchingParams));
  };

  const updatedHeadAssignments = useMemo(() => {
    return [
      ...assignmentsTableHeaders,
      {
        id: "test",
        label: "Tests",
        numeric: false,
        disablePadding: false,
        renderFn: (assignment) => {
          return assignment.problems.tests.length === 0 ? (
            <Button
              color="error"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation(); // Ngăn sự kiện click lan truyền lên phần tử cha
                handleClickOpen(assignment.problem_id);
                // Thêm mã xử lý tại đây để thực hiện hành động khi click vào nút "Thêm Test"
              }}
            >
              Thêm Test
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation(); // Ngăn sự kiện click lan truyền lên phần tử cha
                XemTest(assignment.problems.tests, assignment.problem_id);
                // Thêm mã xử lý tại đây để thực hiện hành động khi click vào nút "Thêm Test"
              }}
            >
              Xem Test
            </Button>
          );
        },
      },
      {
        id: "created",
        label: "Created",
        numeric: false,
        disablePadding: false,
        renderFn: (assignment) => formatResponseTime(assignment.created),
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
        renderFn: (assignment) => formatResponseTime(assignment.updated),
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
        renderFn: (assignment) => (
          <ButtonGroup
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Tooltip title="Update Assignment">
              <IconButton
                color="warning"
                aria-label="edit device type"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingAssignment(assignment);
                }}
              >
                <ModeEditOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Submission">
              <IconButton
                color="inherit"
                aria-label="submission student"
                // onClick={(e) => {
                //   e.stopPropagation();
                //   setIsSubmission(true);
                // }}
                onClick={() => {
                  navigate(`/teacher/courses/assignment/${assignment.id}/submissions`);
                }}
              >
                <AssignmentIndIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="View Assignment">
              <IconButton
                aria-label="view"
                color="primary"
                onClick={() => {
                  navigate(`/teacher/problems/${assignment.problem_id}`);
                }}
              >
                <VisibilityOutlined />
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
        <AssignmentCreateFormDialog
          open={isShowCreateDialog}
          onSave={handleCreateAssignment}
          onClose={() => setIsShowCreateDialog(false)}
        />
      )}

      {isEditing && (
        <AssignmentUpdateFormDialog
          row={editingAssignment}
          open={isEditing}
          onSave={handleUpdateAssignment}
          onClose={() => {
            setEditingAssignment(undefined);
          }}
          initialFn={(assignment) => ({
            id: assignment.problems.id,
            user_id: assignment.problems.user_id,
            title: assignment.problems.title,
            difficulty: assignment.problems.difficulty ?? "",
            problem_type: assignment.problems.problem_type ?? "",
            max_memory_limit: assignment.problems.max_memory_limit ?? "",
            max_execution_time: assignment.problems.max_execution_time ?? "",
            description: assignment.problems.description ?? "",
            deadline: assignment.deadline,
            is_public: assignment.is_public,
          })}
        />
      )}

      <Box p={8} pt={2}>
        {status !== "error" && (
          <TableFrameDetail
            title="List Assignments"
            data={data?.data ?? []}
            isLoading={status === "loading"}
            total={data?.total ?? 0}
            searchFields={assignmentSearchFields}
            numOfColumnsInFilter={4}
            headCells={updatedHeadAssignments}
            onPagination={handlePagination}
            showCheckbox={true}
            onSearch={handleAssignmentSearch}
            handleNewClick={() => {
              setIsShowCreateDialog(true);
            }}
            onDeleteRows={handleAssignmentDeleteRows}
          />
        )}
      </Box>

      <AddTestDialog
        open={open}
        setOpen={setOpen}
        testCases={testCases}
        selectedProblemId={selectedProblemId}
        onSubmit={handleSubmitTest}
      />

      <UpdateTestDialog
        openUpdateTestCases={openUpdateTestCases}
        setOpenUpdateTestCases={setOpenUpdateTestCases}
        selectedProblemTests={selectedProblemTests}
        selectedProblemId={selectedProblemId}
        onSubmit={handleSubmitTest}
      />

      {/* <AssignmentSubmission
        isSubmission={isSubmission}
        setIsSubmission={setIsSubmission}
      /> */}
    </>
  );
};

export default CoursesList;
