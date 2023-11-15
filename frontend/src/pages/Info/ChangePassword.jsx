import React from "react";
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
function ChangePassword() {
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      id: id,
      password: "",
      newPassword: "",
      confirmedPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
      newPassword: Yup.string().required("New Password is required"),
      confirmedPassword: Yup.string()
        .required("Confirmed Password is Required")
        .oneOf([Yup.ref("newPassword"), null], "Not the same as New Password"),
    }),
    onSubmit: async (values, {setErrors, setStatus, setSubmitting, resetForm}) => {
      try {
        console.log(values);
        setSubmitting(true);
        const response = await fetch(`${process.env.REACT_APP_URL}/changepassword`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        setSubmitting(false);

        if (!response.ok) {
          const errorData = await response.json();
          setStatus({ success: false });
          setErrors({
            submit: errorData.detail,
          });
          toast.error(errorData.detail);
        } else {
          setStatus({ success: true });
          toast.success("Changed Password Successfully.");
          resetForm();
        }
      } catch (error) {
        setStatus({ success: false });
        setErrors({
          submit: "Password change failed",
        });
        toast.error("Password change failed");
      }
    },
  });

  const changepass = [
    {
      id: "password",
      name: "password",
      label: "Password",
    },
    {
      id: "newPassword",
      name: "newPassword",
      label: "New Password",
    },
    {
      id: "confirmedPassword",
      name: "confirmedPassword",
      label: "Confirm Password",
    },
  ];

  return (
    <>
      <Typography variant="h4" color={"primary"}>
        Change Password
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {formik.errors.submit && (
          <Grid item xs={12}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Grid>
        )}
        {changepass.map((pass) => (
          <Box
            display={"flex"}
            width={"78%"}
            flexDirection={"row"}
            mt={3}
            key={pass.id}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography mt={1.2}>{pass.label}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Box>
                  <TextField
                    id="outlined-password-input"
                    label={pass.label}
                    name={pass.name}
                    type="password"
                    value={formik.values[pass.id]}
                    onChange={formik.handleChange}
                    autoComplete="current-password"
                    size="small"
                    fullWidth
                  />
                  {formik.errors[pass.id] && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-fullname"
                    >
                      {formik.errors[pass.id]}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}

        <Box mt={8} ml={8}>
          <Button variant="contained" size="large" type="submit">
            change
          </Button>
        </Box>
      </form>
    </>
  );
}

export default ChangePassword;
