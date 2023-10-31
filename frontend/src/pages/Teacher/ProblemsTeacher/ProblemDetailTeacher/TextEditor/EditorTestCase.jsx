import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import "../../../../../styles/globals.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { mapLanguage } from "../../../../../utils/mapLanguage";
// import { getCurrentUser } from "../../../../../utils/auth";

function EditorTestCase(props) {
  const current_user = useLoaderData();
  // const current_user = getCurrentUser();
  const { code, languages } = props;
  const [value, setValue] = useState("1");
  const [testCase, setTestCase] = useState([]);
  const [loading, setLoading] = useState(true);

  const data = useSelector((reducers) => reducers.problemDetail.data);
  console.log(data);

  const submission = {
    language: mapLanguage(languages),
    code: code,
    user_id: current_user.sub,
    problem_id: data.id,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const execute_test_case = async () => {
    try {
      setLoading(false); // Bắt đầu tải dữ liệu
      const { user_id, ...submissionWithoutUserId } = submission;

      const res = await fetch(`${process.env.REACT_APP_URL}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionWithoutUserId),
      })
        .then((result) => result.json())
        .catch((error) => {
          toast.error("Lỗi xảy ra trong quá trình biên dịch.");
        });
      setTestCase(res);
    } catch (error) {
      toast.error("Lỗi xảy ra trong quá trình biên dịch.");
    } finally {
      setLoading(true); // Kết thúc tải dữ liệu
    }
  };

  console.log(testCase);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box
        sx={{
          backgroundColor: "#f8f9fa",
          border: "1px solid #c2c7d0",
          borderLeft: "none",
          borderTop: "none",
          height: "100%",
        }}
      >
        <Box
          sx={{ width: "100%", typography: "body2", height: "100%" }}
          display="flex"
          flexDirection="column"
        >
          {data && data.tests ? (
            <TabContext value={value}>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                height="40px"
                alignItems="center"
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{ height: "100%", padding: "3px" , paddingLeft: '0'}}
                >
                  {data.tests.slice(0, 3).map((test, index) => (
                    <Tab
                      key={index}
                      label={`Case ${index + 1}`}
                      value={(index + 1).toString()}
                      sx={
                        testCase.some(
                          (test_case) =>
                            test_case.test_id === test.id &&
                            test_case.status_data.includes("AC")
                        )
                          ? {
                              fontSize: "12px",
                              marginTop: "1px",
                              backgroundColor: "#6bbe71",
                              color: "white",
                              border: "1px solid gray",
                            }
                          : {
                              fontSize: "12px",
                            }
                      }
                    />
                  ))}
                </TabList>

                <Box
                  className="button-container"
                  width="150px"
                  textAlign="end"
                  padding="5px"
                  mr={2}
                >
                    <Grid container spacing={2}>
                      <Grid item xs={10}>
                        <Button
                          variant="outlined"
                          onClick={execute_test_case}
                          size="small"
                          disabled={code === ""}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#179fff",
                              color: "#ffffff",
                            },
                          }}
                        >
                          Run
                        </Button>
                      </Grid>
                    </Grid>
                </Box>
              </Box>

              <div
                style={{
                  overflowX: "auto",
                  overflowWrap: "break-word",
                  height: "100%",
                }}
              >
                {data.tests.slice(0, 3).map((test, index) => (
                  <TabPanel key={index} value={(index + 1).toString()}>
                    {loading ? (
                      <Box width="100%" height="100%">
                        {testCase.map((test_case, index) => {
                          if (
                            test_case.test_id === test.id &&
                            test_case.status_data.includes("AC")
                          ) {
                            return (
                              <Typography
                                variant="h6"
                                key={index}
                                color="green"
                              >
                                Your code passed this test case.
                              </Typography>
                            );
                          } else if (test_case.test_id === test.id) {
                            return (
                              <Typography variant="h6" key={index} color="red">
                                Your code did not pass this test case.
                              </Typography>
                            );
                          }
                          return null;
                        })}
                        <Typography>Input</Typography>
                        <Box
                          border="1px solid gray"
                          p={1}
                          sx={{ backgroundColor: "white" }}
                          overflow="auto"
                        >
                          <pre>{test.input}</pre>
                        </Box>

                        <Typography mt={1}>Expected Output</Typography>
                        <Box
                          border="1px solid gray"
                          p={1}
                          sx={{ backgroundColor: "white" }}
                          overflow="auto"
                        >
                          <pre>{test.output}</pre>
                        </Box>

                        {testCase.map((test_case, index) => {
                          if (test_case.test_id === test.id) {
                            return (
                              <Box key={index}>
                                <Typography mt={1}>Your Output</Typography>
                                <Box
                                  border="1px solid gray"
                                  p={1}
                                  sx={{ backgroundColor: "white" }}
                                  overflow="auto"
                                >
                                  <Box>
                                    <pre>{test_case.output}</pre>
                                  </Box>
                                </Box>

                                <Typography mt={1}>Compiler Message</Typography>
                                <Box
                                  border="1px solid gray"
                                  p={1}
                                  sx={{ backgroundColor: "white" }}
                                  overflow="auto"
                                >
                                  <pre>{test_case.status_data}</pre>
                                </Box>
                              </Box>
                            );
                          }
                          return null;
                        })}
                      </Box>
                    ) : (
                      <Box sx={{ width: "100%" }}>
                        <LinearProgress />
                      </Box>
                    )}
                  </TabPanel>
                ))}
              </div>
            </TabContext>
          ) : (
            <Box
              sx={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default EditorTestCase;
