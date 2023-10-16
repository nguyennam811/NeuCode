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
  Typography,
} from "@mui/material";
import "../../../../styles/globals.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../../utils/auth";
import { mapLanguage } from "../../../../utils/mapLanguage";
import { addSubmissionByUser } from "../../../../store/actions/submissionAction";

function EditorTestCase(props) {
  const dispatch = useDispatch()
  const current_user = getCurrentUser();
  const { code, languages, executeCode } = props;
  const [value, setValue] = useState("1");

  const data = useSelector((reducers) => reducers.problemDetail.data);
  console.log(data);
  
  const submission = {
    language: mapLanguage(languages),
    code: code,
    user_id: current_user.sub,
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

  const input = "3\n2";

  
  const submitCode = (submission) => {
    dispatch(addSubmissionByUser(submission))
  };

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
                sx={{ height: "100%", padding: "3px" }}
              >
                <Tab label="Case 1" value="1" sx={{ fontSize: "12px" }} />
                <Tab label="Case 2" value="2" sx={{ fontSize: "12px" }} />
                <Tab label="Case 3" value="3" sx={{ fontSize: "12px" }} />
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
                        onClick={executeCode}
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
                        onClick={() => 
                        {
                          submitCode(submission);
                        }}
                      >
                        Submit
                      </Button>
                      {/* <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog> */}
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

            {data && data.tests ? (
              <div
                style={{
                  overflowX: "auto",
                  overflowWrap: "break-word",
                  height: "100%", // Thay đổi giá trị maxHeight theo nhu cầu
                }}
              >
                {data.tests.map((test, index) => (
                  <TabPanel key={index} value={(index + 1).toString()}>
                    {test.input}
                    <pre>{input}</pre>
                    <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
                  </TabPanel>
                ))}
              </div>
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
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
}

export default EditorTestCase;
