import * as Yup from "yup";
import { Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import NeuCode from "../../assets/brand/NeuCode.png";
import { writeAuthToken } from "../../utils/auth";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignupForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [checked, setChecked] = useState(false);
  return (
    <Formik
      initialValues={{
        id: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        id: Yup.string().max(255).required("Mã tài khoản không được để trống"),
        password: Yup.string()
          .max(255)
          .required("Mật khẩu không được để trống"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          console.log(values);
          setSubmitting(true);
          // const response = await fetch(`http://127.0.0.1:8000/login`, {
          const response = await fetch(`${process.env.REACT_APP_URL}/login`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
          });
          console.log(response);
          setSubmitting(false);

          if (!response.ok) {
            const errorData = await response.json();
            setStatus({ success: false });
            setErrors({
              submit: errorData.detail,
            });
            toast.error(errorData.detail);
          } else {
            const data = await response.json();
            const { access_token: accessToken, expires_in: expiresIn } = data;
            const decodedToken = jwt_decode(data.access_token);
            writeAuthToken(accessToken, expiresIn, decodedToken);
            setStatus({ success: true });
            toast.success("Đăng nhập thành công.");
            navigate(`/${decodedToken.role}`);
          }
        } catch (error) {
          setStatus({ success: false });
          setErrors({
            submit: "Mã tài khoản hoặc mật khẩu không đúng. Hãy thử lại",
          });
          toast.error("Đăng nhập không thành công. Hãy thử lại");
        }
      }}
    >
      {({
        errors, //Một đối tượng chứa các lỗi hiện tại của các trường trong biểu mẫu
        handleBlur, // Một hàm để xử lý sự kiện "blur" (khi người dùng rời khỏi trường nhập liệu).
        // Nó thường được gắn với mỗi trường để kiểm tra và xác định xem trường đó đã được chạm vào (touched) hay chưa.
        handleChange,
        handleSubmit,
        isSubmitting, //Một biến boolean để xác định xem biểu mẫu đang được gửi đi (true) hay không (false).
        touched, //Một đối tượng chứa thông tin về việc người dùng đã chạm vào (touched) các trường của biểu mẫu hay chưa.
        values,
      }) => (
        <Paper
          elevation={10}
          sx={{
            height: "600px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            width: "400px",
            "@media screen and (max-width: 400px)": {
              height: "100%",
              widthL: "100%",
            },
          }}
        >
          <Grid align="center">
            <img
              src={NeuCode}
              alt="Logo"
              style={{ height: "75px", cursor: "pointer" }}
            />
            <Typography variant="h5" mb={3}>
              Đăng nhập
            </Typography>
          </Grid>
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="id-login">Mã tài khoản</InputLabel>
                  <OutlinedInput
                    id="id-login"
                    type="id"
                    value={values.id}
                    name="id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập mã tài khoản"
                    fullWidth
                    error={Boolean(touched.id && errors.id)}
                  />
                  {touched.id && errors.id && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-id-login"
                    >
                      {errors.id}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Mật khẩu</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                          edge="end"
                          size="medium"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Nhập mật khẩu"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-login"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography>Ghi nhớ</Typography>}
                  />
                  <Link to="" style={{ textDecoration: "none" }}>
                    <Typography sx={{ "&:hover": { color: "#eb5959" } }}>
                      Quên mật khẩu
                    </Typography>
                  </Link>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Đăng nhập
                </Button>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Typography>
                  {" "}
                  Bạn chưa có tài khoản ? <Link to={"/register"}>Đăng ký</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </Formik>
  );
};

export default SignupForm;
