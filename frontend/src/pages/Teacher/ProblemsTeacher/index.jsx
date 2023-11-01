// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   styled,
// } from "@mui/material";
// import React from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

// import { getProblems } from "../../../store/actions/problemAction";
// import { formatResponseTime } from "../../../utils/time";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import { useState } from "react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { addTestForProblem } from "../../../store/actions/testAction";
// import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
// import { v4 as uuidv4 } from 'uuid';

// function ProblemsTeacher() {
//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "& td, & th": {
//       border: "1px solid #a19797",
//     },
//   }));
//   const dispatch = useDispatch();

//   const [fetchingParams, setFetchingParams] = useState({
//     offset: 0,
//     limit: 10,
//     // filter_authors: [`${current_user.sub}`],
//   });

//   useEffect(() => {
//     dispatch(getProblems(fetchingParams));
//   }, [fetchingParams]);

//   const data = useSelector((reducers) => reducers.problem.data);
//   const status = useSelector((reducers) => reducers.problem.status);
//   console.log(status);
//   console.log(data);

//   const [selectedProblemId, setSelectedProblemId] = useState(null);
//   const [viewTestCases, setViewTestCases] = useState(false);
//   const [selectedProblemTests, setSelectedProblemTests] = useState([]);
//   const [disabled, setDisabled] = useState(true);

//   const addTestCase = () => {
//     setSelectedProblemTests([
//       ...selectedProblemTests,
//       { problem_id: selectedProblemId, input: "", output: "", id: uuidv4()},
//     ]);
//   };

//   const handleInputChange = (index, field, value) => {
//     setSelectedProblemTests((prevTests) => {
//       return prevTests.map((test, testIndex) => {
//         if (testIndex === index) {
//           return { ...test, [field]: value };
//         } else {
//           return test;
//         }
//       });
//     });
//   };

//   const XemTest = (tests, problem_id) => {
//     const selectedFields = tests.map((test) => ({
//       problem_id: test.problem_id,
//       input: test.input,
//       output: test.output,
//       id: test.id,
//     }));
//     setSelectedProblemTests(selectedFields);
//     setSelectedProblemId(problem_id);
//     setViewTestCases(true);
//   };
//   const closeTestCases = () => {
//     setViewTestCases(false);
//     setDisabled(true);
//   };

//   const handleSubmit = () => {
//     // Gửi dữ liệu testCases lên máy chủ hoặc thực hiện xử lý dữ liệu ở đây
//     console.log(selectedProblemTests);
//     // dispatch(addTestForProblem(testCases))
//     setViewTestCases(false);
//     setDisabled(true);
//   };

//   const removeTestCase = (index) => {
//     const updatedTestCases = [...selectedProblemTests];
//     updatedTestCases.splice(index, 1); // Xóa bộ test tại chỉ mục (index)
//     setSelectedProblemTests(updatedTestCases);
//   };

//   return (
//     <Box p={6}>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#cdd0d3" }}>
//             <StyledTableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Title</TableCell>
//               <TableCell>Difficulty</TableCell>
//               <TableCell>Problem Type</TableCell>
//               <TableCell>Max Time</TableCell>
//               <TableCell>Max Memory</TableCell>
//               <TableCell>Test</TableCell>
//               <TableCell>Author</TableCell>
//               <TableCell>Created</TableCell>
//               <TableCell>updated</TableCell>
//             </StyledTableRow>
//           </TableHead>
//           <TableBody>
//             {data?.data?.map((problem) => (
//               <StyledTableRow key={problem.id}>
//                 <TableCell>{problem.id}</TableCell>
//                 <TableCell>{problem.title}</TableCell>
//                 <TableCell>{problem.difficulty}</TableCell>
//                 <TableCell>{problem.problem_type}</TableCell>
//                 <TableCell>{problem.max_execution_time} s</TableCell>
//                 <TableCell>{problem.max_memory_limit} MB</TableCell>
//                 <TableCell>
//                   {problem.tests.length === 0 ? (
//                     <p>Thêm Test</p>
//                   ) : (
//                     <Button onClick={() => XemTest(problem.tests, problem.id)}>
//                       Xem Test
//                     </Button>
//                   )}
//                 </TableCell>
//                 <TableCell>{problem.user.fullname}</TableCell>

//                 <TableCell>{formatResponseTime(problem.created)}</TableCell>
//                 <TableCell>{formatResponseTime(problem.updated)}</TableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>

//         <Dialog
//           onClose={closeTestCases}
//           aria-labelledby="customized-dialog-title"
//           open={viewTestCases}
//         >
//           <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//             Danh sách bộ Test
//           </DialogTitle>
//           <IconButton
//             color={disabled === true ? "success" : "error"}
//             sx={{
//               position: "absolute",
//               right: 60,
//               top: 8,
//             }}
//             aria-label="edit device type"
//             onClick={() => setDisabled((preState) => !preState)}
//           >
//             <ModeEditOutlinedIcon />
//           </IconButton>
//           <IconButton
//             aria-label="close"
//             onClick={closeTestCases}
//             sx={{
//               position: "absolute",
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//           <DialogContent dividers>
//             {selectedProblemTests.map((test, index) => (
//               <Box sx={{ flexGrow: 1 }}>
//                 <Grid container spacing={3} marginBottom={3}>
//                   <Grid item xs={5}>
//                     <TextField
//                       label="Input"
//                       multiline
//                       rows={2}
//                       variant="outlined"
//                       value={test.input}
//                       disabled={disabled}
//                       onChange={(e) =>
//                         handleInputChange(index, "input", e.target.value)
//                       }
//                     />
//                   </Grid>
//                   <Grid item xs={5}>
//                     <TextField
//                       label="Output"
//                       multiline
//                       rows={2}
//                       variant="outlined"
//                       value={test.output}
//                       disabled={disabled}
//                       onChange={(e) =>
//                         handleInputChange(index, "output", e.target.value)
//                       }
//                     />
//                   </Grid>

//                   <Grid item xs={2}>
//                     <Box>

//                       <IconButton
//                         aria-label="view"
//                         color="primary"
//                         // onClick={() => {
//                         //   navigate(`${deviceType.id}`);
//                         // }}
//                         onClick={() => removeTestCase(index)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Box>
//             ))}
//           </DialogContent>
//           <DialogActions>
//             <DialogActions>
//               <Typography marginRight={5}>
//                 Số test: {selectedProblemTests.length}
//               </Typography>
//               <Button variant="contained" autoFocus onClick={addTestCase}>
//                 Thêm Test
//               </Button>
//               <Button variant="contained" autoFocus onClick={handleSubmit}>
//                 Submit
//               </Button>
//             </DialogActions>
//           </DialogActions>
//         </Dialog>
//       </TableContainer>
//     </Box>
//   );
// }

// export default ProblemsTeacher;

// import {
//   Box,
//   Button,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   styled,
// } from "@mui/material";
// import React from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

// import { getProblems } from "../../../store/actions/problemAction";
// import { formatResponseTime } from "../../../utils/time";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import { useState } from "react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { addTestForProblem } from "../../../store/actions/testAction";
// import AddTestDialog from "./ProblemTest/AddTestDialog";
// import UpdateTestDialog from "./ProblemTest/UpdateTestDialog";

// function ProblemsTeacher() {
//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "& td, & th": {
//       border: "1px solid #a19797",
//     },
//   }));
//   const dispatch = useDispatch();

//   const [fetchingParams, setFetchingParams] = useState({
//     offset: 0,
//     limit: 10,
//     // filter_authors: [`${current_user.sub}`],
//   });

//   useEffect(() => {
//     dispatch(getProblems(fetchingParams));
//   }, [fetchingParams]);

//   const data = useSelector((reducers) => reducers.problem.data);
//   const status = useSelector((reducers) => reducers.problem.status);
//   console.log(status);
//   console.log(data);

//   const [selectedProblemId, setSelectedProblemId] = useState(null);

//   const [open, setOpen] = useState(false);
//   const [testCases, setTestCases] = useState([]);
//   const handleClickOpen = (problemId) => {
//     console.log(problemId);
//     setSelectedProblemId(problemId);
//     const newTestCases = [
//       {
//         problem_id: problemId,
//         input: "",
//         output: "",
//       },
//     ];
//     setTestCases(newTestCases);
//     setOpen(true);
//   };

//   const [openUpdateTestCases, setOpenUpdateTestCases] = useState(false);
//   const [selectedProblemTests, setSelectedProblemTests] = useState([]);

//   const XemTest = (tests, problem_id) => {
//     const selectedFields = tests.map((test) => ({
//       problem_id: test.problem_id,
//       input: test.input,
//       output: test.output,
//       // id: test.id,
//     }));
//     setSelectedProblemTests(selectedFields);
//     setSelectedProblemId(problem_id);
//     setOpenUpdateTestCases(true);
//   };

//   const handleSubmitAddTest = () => {
//     dispatch(getProblems(fetchingParams));
//   };

//   return (
//     <Box p={6}>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#cdd0d3" }}>
//             <StyledTableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Title</TableCell>
//               <TableCell>Difficulty</TableCell>
//               <TableCell>Problem Type</TableCell>
//               <TableCell>Max Time</TableCell>
//               <TableCell>Max Memory</TableCell>
//               <TableCell>Test</TableCell>
//               <TableCell>Author</TableCell>
//               <TableCell>Created</TableCell>
//               <TableCell>updated</TableCell>
//             </StyledTableRow>
//           </TableHead>
//           <TableBody>
//             {data?.data?.map((problem) => (
//               <StyledTableRow key={problem.id}>
//                 <TableCell>{problem.id}</TableCell>
//                 <TableCell>{problem.title}</TableCell>
//                 <TableCell>{problem.difficulty}</TableCell>
//                 <TableCell>{problem.problem_type}</TableCell>
//                 <TableCell>{problem.max_execution_time} s</TableCell>
//                 <TableCell>{problem.max_memory_limit} MB</TableCell>
//                 <TableCell>
//                   {problem.tests.length === 0 ? (
//                     <Button onClick={() => handleClickOpen(problem.id)}>
//                       Thêm Test
//                     </Button>
//                   ) : (
//                     // <p>Đã có test.</p>
//                     <Button onClick={() => XemTest(problem.tests, problem.id)}>
//                       Xem Test
//                     </Button>
//                   )}
//                 </TableCell>
//                 <TableCell>{problem.user.fullname}</TableCell>

//                 <TableCell>{formatResponseTime(problem.created)}</TableCell>
//                 <TableCell>{formatResponseTime(problem.updated)}</TableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>

//       </TableContainer>

//       <AddTestDialog
//           open={open}
//           setOpen={setOpen}
//           testCases={testCases}
//           selectedProblemId={selectedProblemId}
//           onSubmit= {handleSubmitAddTest}
//         />

//        <UpdateTestDialog
//        openUpdateTestCases = {openUpdateTestCases}
//        setOpenUpdateTestCases = {setOpenUpdateTestCases}
//         selectedProblemTests = {selectedProblemTests}
//         selectedProblemId={selectedProblemId}
//         onSubmit= {handleSubmitAddTest}
//        />

//     </Box>

//   );
// }

// export default ProblemsTeacher;

import { useState } from "react";
import { Box, Button, ButtonGroup, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteProblems,
  getProblems,
} from "../../../store/actions/problemAction";
import { formatResponseTime } from "../../../utils/time";
import ErrorData from "../../ErrorData";
import { getCurrentUser } from "../../../utils/auth";
import TableFrameDetail from "../../../components/TableFrame/TableFrameDetail";
import { useMemo } from "react";
import { IconButton } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ProblemCreateFormDialog from "./ProblemCreateFormDialog";
import {
  addProblem,
  updateProblemByUser,
} from "../../../store/actions/problemDetailAction";
import ProblemUpdateFormDialog from "./ProblemUpdateFormDialog";
import AddTestDialog from "./ProblemTest/AddTestDialog";
import UpdateTestDialog from "./ProblemTest/UpdateTestDialog";
import { VisibilityOutlined } from "@mui/icons-material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getColorDifficulty } from "../../../utils/status";

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
    renderFn: (problem) => <div dangerouslySetInnerHTML={{ __html: getColorDifficulty(problem.difficulty) }} />,

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

const ProblemsPage = () => {
  const navigate = useNavigate();
  const current_user = getCurrentUser();
  // const current_user = useLoaderData();
  const [isShowCreateDialog, setIsShowCreateDialog] = useState(false);
  const [editingProblem, setEditingProblem] = useState();
  const [fetchingParams, setFetchingParams] = useState({
    offset: 0,
    limit: 10,
    // filter_authors: [`${current_user.sub}`],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProblems(fetchingParams));
  }, [fetchingParams]);

  const data = useSelector((reducers) => reducers.problem.data);
  const status = useSelector((reducers) => reducers.problem.status);
  console.log(status);
  console.log(data);

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
    // let keys = Object.keys(filters);
    // let values = Object.values(filters);
    setFetchingParams({
      ...fetchingParams,
      offset: 0,
      ...filters,
      // ...keys.reduce((pre, cur, index) => {
      //   return {
      //     ...pre,
      //     [cur]: values[index],
      //   };
      // }, {}),
      // rd: Math.floor(Math.random() * 100),
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

  const updatedHeadProblems = useMemo(() => {
    return [
      ...problemsTableHeaders,
      {
        id: "test",
        label: "Tests",
        numeric: false,
        disablePadding: false,
        // renderFn: (problem) => {
        //   return problem.tests.length === 0 ? (
        //     <Button onClick={(e) => {
        //       e.stopPropagation(); // Ngăn sự kiện click lan truyền lên phần tử cha
        //       console.log('object');
        //       // Thêm mã xử lý tại đây để thực hiện hành động khi click vào nút "Thêm Test"
        //     }}>
        //       Thêm Test
        //     </Button>
        //   ) : (
        //     <p>Đã có test.</p>
        //   );
        // },
        renderFn: (problem) => {
          if (problem.user_id === current_user.sub) {
            return problem.tests.length === 0 ? (
              <Button
                color="error"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn sự kiện click lan truyền lên phần tử cha
                  handleClickOpen(problem.id);
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
                  XemTest(problem.tests, problem.id);
                  // Thêm mã xử lý tại đây để thực hiện hành động khi click vào nút "Thêm Test"
                }}
              >
                Xem Test
              </Button>
            );
          } else {
            return problem.tests.length === 0 ? (
              <p>CHƯA CÓ TEST</p>
            ) : (
              <p>ĐÃ CÓ TEST</p>
            );
          }
        },
      },
      {
        id: "created",
        label: "Created",
        numeric: false,
        disablePadding: false,
        renderFn: (problem) => formatResponseTime(problem.created),
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
        renderFn: (problem) => formatResponseTime(problem.updated),
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
        // renderFn: (problem) => (
        //   <IconButton
        //     color="warning"
        //     aria-label="edit problem"
        //     onClick={(e) => {
        //       e.stopPropagation();
        //       setEditingDevice(problem);
        //     }}
        //   >
        //     <ModeEditOutlinedIcon />
        //   </IconButton>
        // ),
        // renderFn: (problem) => {
        //   // Kiểm tra xem `problem.user_id` có trùng với `current_sub` không
        //   if (problem.user_id === current_user.sub) {
        //     return (
        //       <IconButton
        //         color="warning"
        //         aria-label="edit problem"
        //         onClick={(e) => {
        //           e.stopPropagation();
        //           setEditingDevice(problem);
        //         }}
        //       >
        //         <ModeEditOutlinedIcon />
        //       </IconButton>
        //     );
        //   }
        //   return null; // Trả về null nếu không trùng khớp
        // },
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
            {
            problem.user_id === current_user.sub && 
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
            }
          </ButtonGroup>
        )
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
      <Box p={8} pt={2}>
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
    </>
  );
};

export default ProblemsPage;
