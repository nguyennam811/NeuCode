import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TablePagination } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "& td, & th": {
    borderRight: "2px solid #ccc", // Thêm border bên phải cho tất cả các ô
  },
  "& th a:hover": {
    color: "red", // Thêm border bên phải cho tất cả các ô
    cursor: "pointer",
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    "Frozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurtFrozen yoghurt",
    159,
    6.0,
    24,
    4.0
  ),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  
];

export default function CustomizedTables() {
  const [page, pagechange] = React.useState(0);
  const [rowperpage, rowperpagechange] = React.useState(5);
  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  return (
    <>
      <Box sx={{ margin: "30px 80px" }}>
        <Box sx={{ width: "70%" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                  <StyledTableCell align="center">Calories</StyledTableCell>
                  <StyledTableCell align="center">Fat&nbsp;(g)</StyledTableCell>
                  <StyledTableCell align="center">
                    Carbs&nbsp;(g)
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Protein&nbsp;(g)
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ borderRight: " 1px solid red" }}
                    >
                      <a>{row.name}</a>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.fat}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.carbs}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.protein}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              rowsPerPage={rowperpage}
              page={page}
              count={rows.length}
              component="div"
              onPageChange={handlechangepage}
              onRowsPerPageChange={handleRowsPerPage}
            ></TablePagination>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
