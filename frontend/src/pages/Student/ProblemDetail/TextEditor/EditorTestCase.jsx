import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import "../../../../styles/globals.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CloseIcon from "@mui/icons-material/Close";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../../utils/auth";
import { mapLanguage } from "../../../../utils/mapLanguage";
import { addSubmissionByUser } from "../../../../store/actions/submissionAction";
import { setTabValue } from "../../../../store/reducers/submissionReducer";
import { getTestResult } from "../../../../store/actions/testResultAction";
import { toast } from "react-toastify";
import PhoneIcon from "@mui/icons-material/Phone";

function EditorTestCase(props) {
  const dispatch = useDispatch();
  const current_user = useLoaderData();
  const { code, languages, setHistoryProblem, setValueDescription } = props;
  const [value, setValue] = useState("1");
  const [testCase, setTestCase] = useState([]);
  const [loading, setLoading] = useState(true);

  const data = useSelector((reducers) => reducers.problemDetail.data);
  console.log(data);

  const submission = {
    language: mapLanguage(languages),
    code: code,
    submiter_id: current_user.sub,
    problem_id: data.id,
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const submitCode = (submission) => {
    // dispatch(addSubmissionByUser(submission));
    // dispatch(setTabValue("2"));
    // setOpen(false);
    dispatch(addSubmissionByUser(submission));
    setValueDescription("2");
    setOpen(false);
    setHistoryProblem(false);
  };

  const execute_test_case = async () => {
    try {
      setLoading(false); 
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
      setLoading(true); 
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
          {/* Object.keys(data).length !== 0 */}
          {data && data.tests && data.tests.length > 0 ? (
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
                  sx={{ height: "100%", padding: "3px", paddingLeft: "0" }}
                >
                  {/* {data.tests.slice(0, 3).map((test, index) => (
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
                          // ? {
                          //     fontSize: "12px",
                          //     marginTop: "1px",
                          //     backgroundColor: "#6bbe71",
                          //     color: "white",
                          //     border: "1px solid gray",
                          //   }
                          // : {
                          //     fontSize: "12px",
                          //   }
                          ? {
                            fontSize: "12px",
                            marginTop: "1px",
                            backgroundColor: "#6bbe71",
                            color: "white",
                            border: "1px solid gray",
                          }
                        : {
                            fontSize: "12px",
                            backgroundColor:
                              testCase.some(
                                (test_case) =>
                                  test_case.test_id === test.id &&
                                  !test_case.status_data.includes("AC: Accepted (Kết quả đúng)")
                              )
                                ? "red"
                                : "inherit",
                          }
                      }
                    />
                  ))} */}
                  {data.tests.slice(0, 3).map((test, index) => {
                    const hasAC = testCase.some(
                      (test_case) =>
                        test_case.test_id === test.id &&
                        test_case.status_data.includes(
                          "AC: Accepted (Kết quả đúng)"
                        )
                    );
                    const hasNonAC = testCase.some(
                      (test_case) =>
                        test_case.test_id === test.id &&
                        !test_case.status_data.includes(
                          "AC: Accepted (Kết quả đúng)"
                        )
                    );

                    return (
                      <Tab
                        key={index}
                        label={`Case ${index + 1}`}
                        value={(index + 1).toString()}
                        sx={{
                          fontSize: "12px",
                          marginTop: "1px",
                          backgroundColor: hasAC
                            ? "#6bbe71"
                            : hasNonAC
                            ? "#ea4e4e"
                            : undefined,
                          color: hasAC
                            ? "white"
                            : hasNonAC
                            ? "white"
                            : undefined,
                          border: hasAC
                            ? "1px solid gray"
                            : hasNonAC
                            ? "1px solid gray"
                            : undefined,
                        }}
                      />
                    );
                  })}
                </TabList>

                <Box
                  className="button-container"
                  width="150px"
                  textAlign="end"
                  padding="5px"
                  mr={2}
                >
                  {code !== "" ? (
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          onClick={execute_test_case}
                          size="small"
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
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={handleClickOpen}
                        >
                          Submit
                        </Button>

                        <Dialog
                          onClose={handleClose}
                          aria-labelledby="customized-dialog-title"
                          open={open}
                        >
                          <DialogTitle
                            sx={{ m: 0, p: 2 }}
                            id="customized-dialog-title"
                          >
                            Confirm Submission
                          </DialogTitle>
                          <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                              position: "absolute",
                              right: 8,
                              top: 8,
                              color: (theme) => theme.palette.grey[500],
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                          <DialogContent dividers>
                            <Typography gutterBottom fontSize={20}>
                              Are you sure you want to submit this code?
                            </Typography>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              autoFocus
                              variant="outlined"
                              onClick={handleClose}
                            >
                              No, do not submit
                            </Button>

                            <Button
                              autoFocus
                              onClick={() => {
                                submitCode(submission);
                              }}
                              variant="contained"
                              color="success"
                            >
                              Yes, submit my code
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Button disabled variant="outlined" size="small">
                          Run
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button disabled variant="contained" size="small">
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  )}
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
              <Typography variant="h5">No Test yet</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default EditorTestCase;
