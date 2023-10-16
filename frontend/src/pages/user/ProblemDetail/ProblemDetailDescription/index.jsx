import { Box, MenuItem, Tab, TextField } from "@mui/material";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
function ProblemDetailDescription() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabStyle = {
    height: "58px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #c2c7d0",
    borderLeft: "1px solid #c2c7d0",
    borderBottom: 'none',
    borderRadius: "7px 7px 0 0",
    textTransform:'capitalize',

  };

  const rows = [
    { id: 1, name: "John Doe", age: 30, city: "New York" },
    { id: 2, name: "Jane Smith", age: 25, city: "Los Angeles" },
    { id: 3, name: "Bob Johnson", age: 35, city: "Chicago" },
  ];
  return (
    <Box
      sx={{ width: "100%" }}
      display="flex"
      flexDirection="column"
    >
      <TabContext value={value}>
        <Box
          sx={{
            backgroundColor: "#f8f9fa",
            border: "1px solid #c2c7d0",
            borderLeft: "none",
          }}
        >
          <Box height="57px" textTransform='capitalize'>
            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{textTransform:'capitalize'}}>
              <Tab
                label="Description"
                value="1"
                sx={value === "1" ? tabStyle : {textTransform:'capitalize'}}
              />
              <Tab
                label="Submissions"
                value="2"
                sx={value === "2" ? tabStyle : {textTransform:'capitalize'}}
              />
              <Tab
                label="Discussions"
                value="3"
                sx={value === "3" ? tabStyle : {textTransform:'capitalize'}}
              />
            </TabList>
          </Box>
        </Box>
        <div
          style={{
            height: "100%",
            overflowX: "auto",
            overflowWrap: "break-word",
            padding: "10px",
          }}
        >
          <TabPanel value="1">
          
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
            <h1>
              hihidfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
            </h1>
          </TabPanel>
          <TabPanel value="2"><TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time Submitted</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Runtime</TableCell>
                    <TableCell>Memory</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>{row.city}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </div>
      </TabContext>
    </Box>
  );
}

export default ProblemDetailDescription;
