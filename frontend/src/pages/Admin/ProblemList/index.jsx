import { useState } from "react";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteProblems,
  getProblems,
} from "../../../store/actions/problemAction";
import { formatResponseTime } from "../../../utils/time";
import ErrorData from "../../ErrorData";
import TableFrameDetail from "../../../components/TableFrame/TableFrameDetail";
import { useMemo } from "react";
import { IconButton } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import {
  addProblem,
  updateProblemByUser,
} from "../../../store/actions/problemDetailAction";

import { VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProblemUpdateFormDialog from "../../Teacher/ProblemsTeacher/ProblemUpdateFormDialog";
import ProblemCreateFormDialog from "../../Teacher/ProblemsTeacher/ProblemCreateFormDialog";
import AddTestDialog from "../../Teacher/ProblemsTeacher/ProblemTest/AddTestDialog";
import UpdateTestDialog from "../../Teacher/ProblemsTeacher/ProblemTest/UpdateTestDialog";
import { getColorDifficulty } from "../../../utils/status";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import MoveToAssignment from "../../Teacher/ProblemsTeacher/MoveToAssignment";
import { moveToAssignment } from "../../../store/actions/assignmentAction";
import { getCourses, getCoursesAll } from "../../../store/actions/courseAction";

export const problemsTableHeaders = [
  {
    id: "id",
    label: "ID",
    numeric: false,
    disablePadding: false,
    renderFn: (problem) => problem.id,
    descComparatorFn: (a, b) => {
      if (b.id < a.id) {
        return -1;
      }
      if (b.id > a.id) {
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
    renderFn: (problem) => problem.title,
    descComparatorFn: (a, b) => {
      if (b.title < a.title) {
        return -1;
      }
      if (b.title > a.title) {
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
    renderFn: (problem) => (
      <div
        dangerouslySetInnerHTML={{
          __html: getColorDifficulty(problem.difficulty),
        }}
      />
    ),
    descComparatorFn: (a, b) => {
      if (b.difficulty < a.difficulty) {
        return -1;
      }
      if (b.difficulty > a.difficulty) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "problem_type",
    label: "Problem Type",
    numeric: false,
    disablePadding: false,
    renderFn: (problem) => problem.problem_type,
    descComparatorFn: (a, b) => {
      if (b.problem_type < a.problem_type) {
        return -1;
      }
      if (b.problem_type > a.problem_type) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: "submission",
    label: "Submissions",
    numeric: true,
    disablePadding: false,
    renderFn: (problem) => problem.submissions.length,
  },
  {
    id: "author",
    label: "Author",
    numeric: false,
    disablePadding: false,
    renderFn: (problem) => problem.user.fullname,
  },
];

const ProblemList = () => {
  const navigate = useNavigate();
  const [isShowCreateDialog, setIsShowCreateDialog] = useState(false);
  const [editingProblem, setEditingProblem] = useState();
  const [fetchingParams, setFetchingParams] = useState({
    offset: 0,
    limit: 10,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProblems(fetchingParams));
    dispatch(getCoursesAll());
  }, [fetchingParams]);

  const data = useSelector((reducers) => reducers.problem.data);
  const status = useSelector((reducers) => reducers.problem.status);
  console.log(status);
  console.log(data);

  const courses = useSelector((reducers) => reducers.course.data);
  console.log(courses);

  const filteredCourses = [];
  if (courses?.data) {
    courses?.data.forEach((course) => {
      filteredCourses.push({
        value: course.id,
        label: `${course.course_name} - ${course.course_time}`,
      });
    });
  }
  console.log(filteredCourses);

  //Search
  const problemSearchFields = [
    { id: "id", title: "ID" },
    { id: "title", title: "Title" },
  ];
  //Search

  const difficultyOptions = [
    { value: "EASY", label: "Dễ" },
    { value: "MEDIUM", label: "Trung bình" },
    { value: "DIFFICULT", label: "Khó" },
  ];

  //Filter
  // lọc theo problem type
  const uniqueProblemTypes = new Set();
  if (data?.data) {
    data.data.forEach((item) => {
      uniqueProblemTypes.add(item.problem_type);
    });
  }
  const problemTypeOptions = [...uniqueProblemTypes].map((value) => ({
    value: value,
    label: value,
  }));

  //lọc theo author

  const authorOptions = [];
  const userMap = {};
  if (data?.data) {
    data?.data.forEach((item) => {
      const user = item.user;

      if (!userMap[user.id]) {
        authorOptions.push({
          value: user.id,
          label: user.fullname,
        });
        userMap[user.id] = true;
      }
    });
  }

  const filterOptions = [
    {
      id: "filter_difficultys",
      title: "Difficulty",
      placeholder: "Select difficulty...",
      values: "",
      options: difficultyOptions,
      multipleValues: true,
    },
    {
      id: "filter_problem_types",
      title: "Problem Type",
      placeholder: "Select problem type...",
      values: "",
      options: problemTypeOptions.sort(
        (a, b) =>
          -b.label[0].toUpperCase().localeCompare(a.label[0].toUpperCase())
      ),
      groupByFn: (option) => option.label[0].toUpperCase(),
      multipleValues: true,
    },
    {
      id: "filter_authors",
      title: "Author",
      placeholder: "Select author...",
      values: "",
      options: authorOptions.sort(
        (a, b) => -b.label.toUpperCase().localeCompare(a.label.toUpperCase())
      ),
      groupByFn: (option) => option.label[0].toUpperCase(),
      multipleValues: true,
    },
  ];
  //Filter

  const handleProblemSearch = (searchOptions) => {
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

  const handleProblemFilter = (filters) => {
    setFetchingParams({
      ...fetchingParams,
      offset: 0,
      ...filters,
    });
  };

  const handlePagination = (pageNumber, numberRowsPerPage) => {
    setFetchingParams({
      ...fetchingParams,
      offset: pageNumber * numberRowsPerPage,
      limit: numberRowsPerPage,
    });
  };

  const handleCreateProblem = async (values) => {
    console.log(values);

    await dispatch(addProblem(values));
    dispatch(getProblems(fetchingParams));
  };

  const handleUpdateProblem = async (values) => {
    console.log(values);
    await dispatch(updateProblemByUser(values));
    dispatch(getProblems(fetchingParams));
  };

  const handleProblemDeleteRows = async (ids) => {
    console.log(ids);
    await dispatch(deleteProblems(ids));
    dispatch(getProblems(fetchingParams));
  };

  const handleMoveAssignment = async (values) => {
    console.log(values);
    await dispatch(moveToAssignment(values));
    navigate(`/admin/courses/${values.course_id}`);
    dispatch(getProblems(fetchingParams));
  };

  const isEditing = editingProblem !== undefined;

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
    dispatch(getProblems(fetchingParams));
  };

  //Move to assignment
  const [isMoveAssignment, setIsMoveAssignment] = useState(false);
  const [problemAssignment, setProblemAssignmen] = useState();

  const handleClickModeAssignment = (problemID) => {
    console.log(problemID);
    setProblemAssignmen(problemID);
    setIsMoveAssignment(true);
  };

  const updatedHeadProblems = useMemo(() => {
    return [
      ...problemsTableHeaders,
      {
        id: "test",
        label: "Tests",
        numeric: false,
        disablePadding: false,
        renderFn: (problem) => {
          return problem.tests.length === 0 ? (
            <Button
              color="error"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                handleClickOpen(problem.id);
              }}
            >
              Thêm Test
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                XemTest(problem.tests, problem.id);
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
      {
        id: "row-actions",
        label: "Actions",
        numeric: false,
        disablePadding: false,
        renderFn: (problem) => (
          <ButtonGroup
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Tooltip title="View problem">
              <IconButton
                aria-label="view"
                color="primary"
                onClick={() => {
                  navigate(`${problem.id}`);
                }}
              >
                <VisibilityOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Update Problem">
              <IconButton
                color="warning"
                aria-label="edit problem"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingProblem(problem);
                }}
              >
                <ModeEditOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Move to Assignment">
              <IconButton
                color="error"
                aria-label="Move to Assignment"
                onClick={(e) => {
                  e.stopPropagation();
                  // setEditingProblem(problem);
                  handleClickModeAssignment(problem.id);
                }}
              >
                <DriveFileMoveIcon />
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
        <ProblemCreateFormDialog
          open={isShowCreateDialog}
          onSave={handleCreateProblem}
          onClose={() => setIsShowCreateDialog(false)}
        />
      )}

      {isEditing && (
        <ProblemUpdateFormDialog
          row={editingProblem}
          open={isEditing}
          onSave={handleUpdateProblem}
          onClose={() => {
            setEditingProblem(undefined);
          }}
          initialFn={(problem) => ({
            id: problem.id,
            user_id: problem.user_id,
            title: problem.title,
            difficulty: problem.difficulty ?? "",
            problem_type: problem.problem_type ?? "",
            max_memory_limit: problem.max_memory_limit ?? "",
            max_execution_time: problem.max_execution_time ?? "",
            description: problem.description ?? "",
          })}
        />
      )}
      {status !== "error" && (
        <TableFrameDetail
          title="Table Problems"
          data={data?.data ?? []}
          isLoading={status === "loading"}
          total={data?.total ?? 0}
          searchFields={problemSearchFields}
          filterOptions={filterOptions}
          numOfColumnsInFilter={4}
          headCells={updatedHeadProblems}
          onPagination={handlePagination}
          showCheckbox={true}
          onSearch={handleProblemSearch}
          onFilter={handleProblemFilter}
          handleNewClick={() => {
            setIsShowCreateDialog(true);
          }}
          onDeleteRows={handleProblemDeleteRows}
        />
      )}

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

      <MoveToAssignment
        open={isMoveAssignment}
        onClose={() => setIsMoveAssignment(false)}
        problemAssignment={problemAssignment}
        filteredCourses={filteredCourses}
        onSave={handleMoveAssignment}
      />
    </>
  );
};

export default ProblemList;
