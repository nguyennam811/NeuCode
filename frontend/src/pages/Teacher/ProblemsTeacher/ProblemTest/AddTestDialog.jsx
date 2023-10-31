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
import { addTestForProblem } from "../../../../store/actions/testAction";
import { useDispatch } from "react-redux";

function AddTestDialog({ open, setOpen, testCases, selectedProblemId, onSubmit }) {
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const removeTestCase = (index) => {
    if (formik.values.testCases.length > 1) {
      formik.setFieldValue(
        "testCases",
        formik.values.testCases.filter((_, i) => i !== index)
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      testCases: testCases,
    },
    validationSchema: Yup.object().shape({
      testCases: Yup.array().of(
        Yup.object().shape({
          input: Yup.string().required("Input is required"),
          output: Yup.string().required("Output is required"),
        })
      ),
    }),
    onSubmit: async (values) => {
      console.log(values.testCases);
      console.log(selectedProblemId);
      // handleSubmit(values.testCases);
      await dispatch(addTestForProblem(values.testCases))
      handleClose();
      onSubmit()
    },
  });

  const addTestCase = () => {
    const updatedTestCases = [...formik.values.testCases];
    updatedTestCases.push({
      problem_id: selectedProblemId,
      input: "",
      output: "",
    });
    formik.setFieldValue("testCases", updatedTestCases);
  };

  // console.log(formik.values.testCases[0].input.replace(/[(){}[\]\s]+/g, "\n"));
  // console.log(formik.values.testCases[0].output.replace(/[(){}[\]\s]+/g, "\n"));

  useEffect(() => {
    formik.setValues({ testCases });
  }, [testCases]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add Test
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
        <form onSubmit={formik.handleSubmit}>
          {formik.values.testCases.map((testCase, index) => (
            <Box key={index} sx={{ flexGrow: 1 }}>
              <Grid container spacing={3} marginBottom={3}>
                <Grid item xs={5}>
                  <TextField
                    label="Input"
                    multiline
                    rows={2}
                    variant="outlined"
                    name={`testCases[${index}].input`}
                    value={testCase.input}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.testCases &&
                    formik.touched.testCases[index] &&
                    formik.errors.testCases &&
                    formik.errors.testCases[index]?.input && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-id-login"
                      >
                        {formik.errors.testCases[index]?.input}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    label="Output"
                    multiline
                    rows={2}
                    variant="outlined"
                    name={`testCases[${index}].output`}
                    value={testCase.output}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.testCases &&
                    formik.touched.testCases[index] &&
                    formik.errors.testCases &&
                    formik.errors.testCases[index]?.output && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-id-login"
                      >
                        {formik.errors.testCases[index]?.output}
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
          Số test: {formik.values.testCases.length}
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

export default AddTestDialog;