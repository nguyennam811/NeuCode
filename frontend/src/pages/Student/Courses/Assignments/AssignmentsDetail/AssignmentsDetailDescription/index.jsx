import { Box, Tab } from "@mui/material";
import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import Description from "./Description";
import SubmissionResult from "./SubmissionResult";
import { memo } from "react";
function AssignmentDetailDescription({value, setValue, historyAssignment, SetHistoryAssignment}) {
  console.log("AssignmentDetailDescription");

  const dispatch = useDispatch();
  const tabStyle = {
    height: "58px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #c2c7d0",
    borderLeft: "1px solid #c2c7d0",
    borderBottom: "none",
    borderRadius: "7px 7px 0 0",
    textTransform: "capitalize",
  };

  // const value = useSelector((reducers) => reducers.assignment.tabs);
  // console.log(value)

  // const handleChange = (event, newValue) => {
  //   dispatch(setTabValue(newValue));
  // };
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    SetHistoryAssignment(true)
  };

  console.log('value', value)
  return (
    <Box sx={{ width: "100%" }} display="flex" flexDirection="column">
      <TabContext value={value}>
        <Box
          sx={{
            backgroundColor: "#f8f9fa",
            border: "1px solid #c2c7d0",
            borderLeft: "none",
          }}
        >
          <Box height="57px" textTransform="capitalize">
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="Description"
                value="1"
                sx={value === "1" ? tabStyle : { textTransform: "capitalize" }}
              />
              <Tab
                label="Submissions"
                value="2"
                sx={value === "2" ? tabStyle : { textTransform: "capitalize" }}
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
            <Description />
          </TabPanel>
          <TabPanel value="2">
            <SubmissionResult historyAssignment={historyAssignment}/>
          </TabPanel>
          
        </div>
      </TabContext>
    </Box>
  );
}

export default memo(AssignmentDetailDescription);
