
import React, { useState } from "react";
import { MenuList } from "../data/data";
import Layout from "../components/Layout/Layout";
import {
  Box,
  // Card,
  // CardActionArea,
  // CardContent,
  // CardMedia,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

const Problems = () => {
  const columns = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "email", name: "Email" },
    { id: "phone", name: "Phone" },
  ];

  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  // const [rows, rowchange] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);
  return (
    <Layout>
      {/* <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {MenuList.map((menu) => (
          <Card sx={{ maxWidth: "390px", display: "flex", m: 2 }}>
            <CardActionArea>
              <CardMedia
                sx={{ minHeight: "400px" }}
                component={"img"}
                src={menu.image}
                alt={menu.name}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom component={"div"}>
                  {menu.name}
                </Typography>
                <Typography variant="body2">{menu.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box> */}
      <Box sx={{ textAlign: "center", marginBottom: "10px" }}>
        <Typography variant="h3">Danh Sách Bài</Typography>
        <Box sx={{ margin: " 0 5%" }}>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        style={{ backgroundColor: "black", color: "white" }}
                        key={column.id}
                      >
                        {column.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MenuList &&
                    MenuList.slice(
                      page * rowperpage,
                      page * rowperpage + rowperpage
                    ).map((row, i) => {
                      return (
                        <TableRow key={i}>
                          {columns &&
                            columns.map((column, i) => {
                              let value = row[column.id];
                              return <TableCell key={value}>{value}</TableCell>;
                            })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              rowsPerPage={rowperpage}
              page={page}
              count={MenuList.length}
              component="div"
              onPageChange={handlechangepage}
              onRowsPerPageChange={handleRowsPerPage}
            ></TablePagination>
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
};

export default Problems;
