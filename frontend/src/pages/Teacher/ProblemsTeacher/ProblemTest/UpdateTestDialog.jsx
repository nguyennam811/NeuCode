import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useDispatch } from "react-redux";
import { addTestForProblem } from "../../../../store/actions/testAction";

function UpdateTestDialog({
  openUpdateTestCases,
  setOpenUpdateTestCases,
  selectedProblemTests,
  selectedProblemId,
  onSubmit
}) {
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const closeTestCases = () => {
    setOpenUpdateTestCases(false);
    setDisabled(true);
  };
  const formik = useFormik({
    initialValues: {
      selectedProblemTests: selectedProblemTests,
    },
    validationSchema: Yup.object().shape({
      selectedProblemTests: Yup.array().of(
        Yup.object().shape({
          input: Yup.string().required("Input is required"),
          output: Yup.string().required("Output is required"),
        })
      ),
    }),
    onSubmit: async (values) => {
      console.log(values.selectedProblemTests);
      console.log(selectedProblemId);
      // handleSubmit(values.testCases);
      await dispatch(addTestForProblem(values.selectedProblemTests))
      closeTestCases();
      onSubmit()
    },
  });

  const removeTestCase = (index) => {
    if (formik.values.selectedProblemTests.length > 1) {
      formik.setFieldValue(
        "selectedProblemTests",
        formik.values.selectedProblemTests.filter((_, i) => i !== index)
      );
    }
  };

  const addTestCase = () => {
    const updatedTestCases = [...formik.values.selectedProblemTests];
    updatedTestCases.push({
      problem_id: selectedProblemId,
      input: "",
      output: "",
    });
    formik.setFieldValue("selectedProblemTests", updatedTestCases);
  };

  useEffect(() => {
    formik.setValues({ selectedProblemTests });
  }, [selectedProblemTests]);

  return (
    <Dialog
      onClose={closeTestCases}
      aria-labelledby="customized-dialog-title"
      open={openUpdateTestCases}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Update Test
      </DialogTitle>
      <IconButton
        color={disabled === true ? "success" : "error"}
        sx={{
          position: "absolute",
          right: 60,
          top: 8,
        }}
        aria-label="edit device type"
        onClick={() => setDisabled((preState) => !preState)}
      >
        <ModeEditOutlinedIcon />
      </IconButton>
      <IconButton
        aria-label="close"
        onClick={closeTestCases}
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
        <form onSubmit={formik.handleSubmit}>
          {formik.values.selectedProblemTests?.map((ProblemTest, index) => (
            <Box key={index} sx={{ flexGrow: 1 }}>
              <Grid container spacing={3} marginBottom={3}>
                <Grid item xs={5}>
                  <TextField
                    label="Input"
                    multiline
                    rows={2}
                    variant="outlined"
                    name={`selectedProblemTests[${index}].input`}
                    value={ProblemTest.input}
                    disabled={disabled}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.selectedProblemTests &&
                    formik.touched.selectedProblemTests[index] &&
                    formik.errors.selectedProblemTests &&
                    formik.errors.selectedProblemTests[index]?.input && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-id-login"
                      >
                        {formik.errors.selectedProblemTests[index]?.input}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    label="Output"
                    multiline
                    rows={2}
                    variant="outlined"
                    name={`selectedProblemTests[${index}].output`}
                    value={ProblemTest.output}
                    disabled={disabled}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.selectedProblemTests &&
                    formik.touched.selectedProblemTests[index] &&
                    formik.errors.selectedProblemTests &&
                    formik.errors.selectedProblemTests[index]?.output && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-id-login"
                      >
                        {formik.errors.selectedProblemTests[index]?.output}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={2}>
                  <Box>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        removeTestCase(index);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </form>
      </DialogContent>
      <DialogActions>
        <Typography marginRight={5}>
          Số test: {formik.values.selectedProblemTests?.length}
        </Typography>
        <Button variant="contained" type="button" onClick={addTestCase}>
          Thêm Test
        </Button>
        <Button variant="contained" onClick={() => formik.handleSubmit()}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateTestDialog;
