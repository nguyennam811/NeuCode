import { Box, Tab } from "@mui/material";
import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { setTabValue } from "../../../../store/reducers/submissionReducer";
import Description from "./Description";
import SubmissionResult from "./SubmissionResult";
import Discussions from "./Discussions";
import { memo } from "react";
function ProblemDetailDescription() {
  console.log("ProblemDetailDescription");

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

  const value = useSelector((reducers) => reducers.submission.tabs);

  const handleChange = (event, newValue) => {
    dispatch(setTabValue(newValue));
  };

  // const [test_result, setTestResult] = useState([]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Gọi API ở đây
  //     fetch("http://localhost:8000/api/test_result", {
  //     headers: { submission: 'c256e5bc-5d3f-484e-bf0b-3276a884f93c' },
  //   }).then((response) => response.json())
  //   .then((res) => {
  //   console.log(res)
  //     if (res.status_data === 'đã chấm') {
  //       clearInterval(interval); // Dừng setInterval khi status là 'đã chấm'
  //     }
  //     setTestResult(res);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //   });
  //   }, 1000); // Gọi API mỗi giây

  //   // Xoá interval khi component unmount
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

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
              <Tab
                label="Discussions"
                value="3"
                sx={value === "3" ? tabStyle : { textTransform: "capitalize" }}
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
            <SubmissionResult />
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
