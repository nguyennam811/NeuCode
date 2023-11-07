import TableFrame from "../../../components/TableFrame";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { formatResponseTime } from "../../../utils/time";
import ErrorData from "../../ErrorData";
import { calculateOverallStatus, getTotalMemory, getTotalTime } from "../../../utils/status";
import { Link } from "react-router-dom";
import { getSubmissions } from "../../../store/actions/submissionAction";
import { mapLanguageSubmission } from "../../../utils/mapLanguage";
import FilterSubmissions from "./FilterSubmissions";

export const submissionsTableHeaders = [
  {
    id: "title",
    label: "Title",
    numeric: false,
    disablePadding: false,
    renderFn: (submission) => (
      <Link
        to={`/student/problems/${submission.problem_id}`}
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
];

const SubmissionsPage = () => {
  const [fetchingParams, setFetchingParams] = useState({
    offset: 0,
    limit: 10,
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
    setFetchingParams({
      ...fetchingParams,
      offset: 0,
      ...searchAndFilter,
    });
  };

  return (
    <>
      {status === "error" && <ErrorData />}
      <Box p={5} pt={2}>
        {status !== "error" && (
          <>
            <Typography variant="h5" gutterBottom>
            All Submissions
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
                  headCells={submissionsTableHeaders}
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
    </>
  );
};

export default SubmissionsPage;


// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Box, TablePagination } from "@mui/material";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "& td, & th": {
//     borderRight: "2px solid #ccc", // Thêm border bên phải cho tất cả các ô
//   },
//   "& th a:hover": {
//     color: "red", // Thêm border bên phải cho tất cả các ô
//     cursor: "pointer",
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData(
//     "Frozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurt",
//     159,
//     6.0,
//     24,
//     4.0
//   ),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
  
// ];

// export default function CustomizedTables() {
//   const [page, pagechange] = React.useState(0);
//   const [rowperpage, rowperpagechange] = React.useState(5);
//   const handlechangepage = (event, newpage) => {
//     pagechange(newpage);
//   };
//   const handleRowsPerPage = (event) => {
//     rowperpagechange(+event.target.value);
//     pagechange(0);
//   };

//   return (
//     <>
//       <Box sx={{ margin: "30px 80px" }}>
//         <Box sx={{ width: "70%" }}>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 700 }} aria-label="customized table">
//               <TableHead>
//                 <StyledTableRow>
//                   <StyledTableCell>Dessert (100g serving)</StyledTableCell>
//                   <StyledTableCell align="center">Calories</StyledTableCell>
//                   <StyledTableCell align="center">Fat&nbsp;(g)</StyledTableCell>
//                   <StyledTableCell align="center">
//                     Carbs&nbsp;(g)
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     Protein&nbsp;(g)
//                   </StyledTableCell>
//                 </StyledTableRow>
//               </TableHead>
//               <TableBody>
//                 {rows.map((row) => (
//                   <StyledTableRow key={row.name}>
//                     <StyledTableCell
//                       component="th"
//                       scope="row"
//                       sx={{ borderRight: " 1px solid red" }}
//                     >
//                       <a>{row.name}</a>
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       {row.calories}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">{row.fat}</StyledTableCell>
//                     <StyledTableCell align="center">
//                       {row.carbs}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       {row.protein}
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               rowsPerPage={rowperpage}
//               page={page}
//               count={rows.length}
//               component="div"
//               onPageChange={handlechangepage}
//               onRowsPerPageChange={handleRowsPerPage}
//             ></TablePagination>
//           </TableContainer>
//         </Box>
//       </Box>
//     </>
//   );
// }
