import { Box, MenuItem, Tab, TextField, styled, tableCellClasses } from "@mui/material";
import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getTestResult } from "../../../../store/actions/testResultAction";
import { formatResponseTime, formatTimeSubmit } from "../../../../utils/time";
import { mapLanguageSubmission } from "../../../../utils/mapLanguage";
import { setTabValue } from "../../../../store/reducers/submissionReducer";
function ProblemDetailDescription() {
  const dispatch = useDispatch()

  const tabStyle = {
    height: "58px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #c2c7d0",
    borderLeft: "1px solid #c2c7d0",
    borderBottom: 'none',
    borderRadius: "7px 7px 0 0",
    textTransform:'capitalize',

  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "& td, & th": {
      border: "1px solid #a19797"
    }
  }));

  const data = useSelector((reducers) => reducers.submission.data);
  const value = useSelector((reducers) => reducers.submission.tabs);

  const handleChange = (event, newValue) => {
    dispatch(setTabValue(newValue));
  };
  
  console.log(data);

  useEffect(()=> {
    dispatch(getTestResult(data.id))
  }, [data.id])

  const test_result = useSelector((reducers) => reducers.test_result.data)
  console.log(test_result)
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
            <TabList onChange={handleChange} aria-label="lab API tabs example">
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
                <TableHead sx={{backgroundColor:'#cdd0d3'}}>
                  <StyledTableRow>
                    <TableCell>Time Submitted</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Runtime</TableCell>
                    <TableCell>Memory</TableCell>
                    <TableCell>Language</TableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {test_result.map((test) => (
                    <StyledTableRow key={test.id}>
                      <TableCell>{formatTimeSubmit(test.created)}</TableCell>
                      <TableCell>{test.status_data}</TableCell>
                      <TableCell>{test.time}</TableCell>
                      <TableCell>{test.memory}</TableCell>
                      <TableCell>{mapLanguageSubmission(data.language)}</TableCell>
                    </StyledTableRow>
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
