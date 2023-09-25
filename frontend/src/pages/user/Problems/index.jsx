import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#d8d8d8", // Màu nền đỏ
  color: "#272525", // Màu chữ trắng
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "& td, & th": {
    borderRight: "2px solid #ccc", // Thêm border bên phải cho tất cả các ô
    fontSize: 16,
  },
  "& th a:hover": {
    color: "red", // Thêm border bên phải cho tất cả các ô
    cursor: "pointer",
  },
}));
function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Fat (g)",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Carbs (g)",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{ fontFamily: "Poppins" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState([0, 3]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          margin: "30px 80px",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "73%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />

                <TableBody>
                  {visibleRows.map((row) => (
                    <StyledTableRow key={row.name} hover>
                      <TableCell component="th" scope="row">
                        <a>{row.name}</a>
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
        <Box sx={{ width: "calc(100% - 75%)" }}>
          <Paper
            elevation={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                backgroundColor: "black",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">Tìm kiếm bài tập</Typography>
              <SearchIcon fontSize="large" />
            </Box>
            <TextField
              id="outlined-basic"
              label="Tìm bài ..."
              variant="outlined"
              size="small"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Có lời giải"
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6">Mức độ</Typography>
              <TextField
                id="outlined-select-currency"
                select
                defaultValue="EUR"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6">Dạng bài</Typography>
              <TextField id="outlined-select-currency" select defaultValue="">
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Khoảng điểm</Typography>
                {/* <Slider
  aria-label="Temperature"
  defaultValue={3}
  valueLabelDisplay="on"
  step={0.5}
  marks
  min={0}
  max={3}

/> */}
                <Slider
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  step={0.5}
                  valueLabelDisplay="on"
                  marks
                  min={0}
                  max={3}
                />
                {/* <Divider /> */}
                <Button variant="contained">Tìm</Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
