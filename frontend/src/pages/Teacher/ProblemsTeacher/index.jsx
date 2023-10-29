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

// function ProblemsTeacher() {
//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "& td, & th": {
//       border: "1px solid #a19797",
//     },
//   }));
//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   dispatch(getProblems());
//   // }, [dispatch]);

//   // const problems = useSelector((reducers) => reducers.problem.data);
//   // console.log(problems);

//   // // const sortedProblems = [...problems].sort((a, b) => b.created - a.created);
//   // // console.log(sortedProblems);
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

//   const [open, setOpen] = React.useState(false);

//   const [selectedProblemId, setSelectedProblemId] = useState(null);
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
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const addTestCase = () => {
//     setTestCases([
//       ...testCases,
//       { problem_id: selectedProblemId, input: "", output: "" },
//     ]);
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedTestCases = [...testCases];
//     updatedTestCases[index][field] = value;
//     setTestCases(updatedTestCases);
//   };

//   const handleSubmit = () => {
//     // Gửi dữ liệu testCases lên máy chủ hoặc thực hiện xử lý dữ liệu ở đây
//     console.log(testCases);
//     dispatch(addTestForProblem(testCases))
//     setOpen(false);
//   };

//   const removeTestCase = (index) => {
//     const updatedTestCases = [...testCases];
//     updatedTestCases.splice(index, 1); // Xóa bộ test tại chỉ mục (index)
//     setTestCases(updatedTestCases);
//   };

//   return (
//     <Box p={6}>
//       <TableContainer component={Paper}>
//       <Table>
//         <TableHead sx={{ backgroundColor: "#cdd0d3" }}>
//           <StyledTableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Title</TableCell>
//             <TableCell>Difficulty</TableCell>
//             <TableCell>Problem Type</TableCell>
//             <TableCell>Max Time</TableCell>
//             <TableCell>Max Memory</TableCell>
//             <TableCell>Test</TableCell>
//             <TableCell>Author</TableCell>
//             <TableCell>Created</TableCell>
//             <TableCell>updated</TableCell>
//           </StyledTableRow>
//         </TableHead>
//         <TableBody>
//           {data?.data?.map((problem) => (
//             <StyledTableRow key={problem.id}>
//               <TableCell>{problem.id}</TableCell>
//               <TableCell>{problem.title}</TableCell>
//               <TableCell>{problem.difficulty}</TableCell>
//               <TableCell>{problem.problem_type}</TableCell>
//               <TableCell>{problem.max_execution_time} s</TableCell>
//               <TableCell>{problem.max_memory_limit} MB</TableCell>
//               <TableCell>
//                 {problem.tests.length === 0 ? (
//                   <Button onClick={() => handleClickOpen(problem.id)}>
//                     Thêm Test
//                   </Button>
//                 ) : (
//                   <p>Đã có test.</p>
//                 )}
//               </TableCell>
//               <TableCell>{problem.user.fullname}</TableCell>

//               <TableCell>{formatResponseTime(problem.created)}</TableCell>
//               <TableCell>{formatResponseTime(problem.updated)}</TableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <Dialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//           Modal title
//         </DialogTitle>
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent dividers>
//           <div>
//             {testCases.map((testCase, index) => (
//               <Box sx={{ flexGrow: 1 }}>
//                 <Grid container spacing={3} marginBottom={3}>
//                   <Grid item xs={5}>
//                     <TextField
//                       label="Input"
//                       multiline
//                       rows={2}
//                       variant="outlined"
//                       value={testCase.input}
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
//                       value={testCase.output}
//                       onChange={(e) =>
//                         handleInputChange(index, "output", e.target.value)
//                       }
//                     />
//                   </Grid>

//                   <Grid item xs={2}>
//                     <Box>
//                       <IconButton
//                         aria-label="delete"
//                         onClick={() => removeTestCase(index)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Box>
//             ))}
//           </div>
//         </DialogContent>
//         <DialogActions>
//         <Typography marginRight={5}>Số test: {testCases.length}</Typography>
//           <Button variant="contained" autoFocus onClick={addTestCase}>
//             Thêm Test
//           </Button>
//           <Button variant="contained" autoFocus onClick={handleSubmit}>
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </TableContainer>
//     </Box>
//   );
// }

// export default ProblemsTeacher;

import TableFrame from "../../../components/TableFrame";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProblems } from "../../../store/actions/problemAction";
import { formatResponseTime } from "../../../utils/time";
import ErrorData from "../../ErrorData";
import { getCurrentUser } from "../../../utils/auth";
import TableFrameDetail from "../../../components/TableFrame/TableFrameDetail";
import { useMemo } from "react";
import { IconButton } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ProblemCreateFormDialog from "./ProblemCreateFormDialog"
import { addProblem } from "../../../store/actions/problemDetailAction";
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
    renderFn: (problem) => problem.difficulty,
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
  }
];



const ProblemsPage = () => {
  const current_user = getCurrentUser();
  const [isShowCreateDialog, setIsShowCreateDialog] = useState(false);
  const [editingDevice, setEditingDevice] = useState();
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

  const handleProblemSearch = (searchOptions) => {
    let keys = Object.keys(searchOptions[0]);
    console.log(keys)
    let values = Object.values(searchOptions[0]);
    console.log(values)
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

  const handleCreateDevice = async (values) => {
    console.log(values)
    // dispatch(addProblem(values));
  };

  // const isEditing = editingDevice !== undefined;

  const updatedHeadProblems = useMemo(() => {
    return [
      ...problemsTableHeaders,
      {
        id: 'test',
        label: 'Tests',
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
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn sự kiện click lan truyền lên phần tử cha
                  console.log('object');
                  // Thêm mã xử lý tại đây để thực hiện hành động khi click vào nút "Thêm Test"
                }}
              >
                Thêm Test
              </Button>
            ) : (
              <p>Đã có test.</p>
            );
          } else {
            // return <p>Chưa có test.</p>;
            return problem.tests.length === 0 ? (
              <p>Chưa có test.</p>
            ) : (
              <p><Button
              onClick={(e) => {
                e.stopPropagation(); // Ngăn sự kiện click lan truyền lên phần tử cha
                console.log('object');
                // Thêm mã xử lý tại đây để thực hiện hành động khi click vào nút "Thêm Test"
              }}
            >
              Xem Test
            </Button></p>
            );
          }
        }
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
        renderFn: (problem) => {
          // Kiểm tra xem `problem.user_id` có trùng với `current_sub` không
          if (problem.user_id === current_user.sub) {
            return (
              <IconButton
                color="warning"
                aria-label="edit problem"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingDevice(problem);
                }}
              >
                <ModeEditOutlinedIcon />
              </IconButton>
            );
          }
          return null; // Trả về null nếu không trùng khớp
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {status === "error" && <ErrorData />}

        {/* {!isEditing && ( */}
          <ProblemCreateFormDialog
          open={isShowCreateDialog}
          onSave={handleCreateDevice}
          onClose={() => setIsShowCreateDialog(false)}
        />
        {/* )} */}

      <Box p={8} pt={2}>
        {status !== "error" && (
          <TableFrameDetail
            title="Table Problems"
            data={data?.data ?? []}
            isLoading={status === "loading"}
            total={data?.total ?? 0}
            numOfColumnsInFilter={4}
            headCells={updatedHeadProblems}
            onPagination={handlePagination}
            showCheckbox={true}
            onSearch={handleProblemSearch}
            onFilter={handleProblemFilter}
            handleNewClick={() => {
              setIsShowCreateDialog(true);
            }}
          />
        )}
      </Box>
    </>
  );
};

export default ProblemsPage;
