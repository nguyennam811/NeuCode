import { Box, Tab } from "@mui/material";
import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Description from "./Description";
import SubmissionResult from "./SubmissionResult";
import Discussions from "./Discussions";
import { memo } from "react";
function ProblemDetailDescription({value, setValue, historyProblem, setHistoryProblem}) {

  const tabStyle = {
    height: "58px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #c2c7d0",
    borderLeft: "1px solid #c2c7d0",
    borderBottom: "none",
    borderRadius: "7px 7px 0 0",
    textTransform: "capitalize",
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setHistoryProblem(true)
  };

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
              {/* <Tab
                label="Discussions"
                value="3"
                sx={value === "3" ? tabStyle : { textTransform: "capitalize" }}
              /> */}
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
            <SubmissionResult historyProblem={historyProblem}/>
          </TabPanel>
          <TabPanel value="3">
            <Discussions />
          </TabPanel>
        </div>
      </TabContext>
    </Box>
  );
}

export default memo(ProblemDetailDescription);
