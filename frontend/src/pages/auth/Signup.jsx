import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import NeuCode from "../../assets/brand/NeuCode.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Signup = () => {
  const paperStyle = {
    height: "750px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    width: "400px",
    "@media screen and (max-width: 400px)": {
      height: "100%",
      width: "100%",
    },
  };
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Formik
      initialValues={{
        id: "",
        fullname: "",
        email: "",
        password: "",
        role: "student",
      }}
      validationSchema={Yup.object().shape({
        id: Yup.string().max(255).required("Mã không được để trống"),
        fullname: Yup.string()
          .max(255)
          .required("Họ và tên không được để trống")
          .min(4, "Bắt buộc phải hơn 4 kí tự"),
        email: Yup.string()
          .max(255)
          .required("Email không được để trống")
          .matches(
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Hãy nhập đúng định dạng abc@gmail.com"
          ),
        password: Yup.string()
          .max(255)
          .required("Mật khẩu không được để trống"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          console.log(values);
          setSubmitting(true);
          const response = await fetch(`${process.env.REACT_APP_URL}/api/users`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
          });
          setSubmitting(false);
      
          if (!response.ok) {
            setStatus({ success: false });
            setErrors({
            submit: "Đăng kí không thành công. Hãy thử lại",
          });
            toast.error("Đăng ký không thành công. Hãy thử lại");
          } else {
            setStatus({ success: true });
            toast.success("Đăng ký thành công. Bạn có thể đăng nhập");
            setTimeout(() => {
              navigate(`/login`);
            }, 2000);
          }
        } catch (error) {
          setStatus({ success: false });
          setErrors({
            submit: "Tài khoản đã tồn tại. Bạn hãy thay đổi mã và mật khẩu",
          });
          toast.error("Tài khoản đã tồn tại. Bạn hãy thay đổi mã và mật khẩu");
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
        <Paper elevation={10} sx={paperStyle}>
          <Grid align="center">
            <img
              src={NeuCode}
              alt="Logo"
              style={{ height: "75px", cursor: "pointer" }}
            />
            <Typography variant="h5" mb={2}>
              Đăng ký tài khoản mới
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
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-fullname">
                      Họ và tên
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-fullname"
                      type="fullname"
                      value={values.fullname}
                      name="fullname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên "
                      fullWidth
                      error={Boolean(touched.fullname && errors.fullname)}
                      label="Họ và tên"
                    />
                    {touched.fullname && errors.fullname && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-fullname"
                      >
                        {errors.fullname}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập email "
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      label="Email"
                    />
                    {touched.email && errors.email && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email"
                      >
                        {errors.email}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      Bạn là ?
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      value={values.role}
                      onChange={handleChange}
                      style={{ display: "initial" }}
                      name="role"
                    >
                      <FormControlLabel
                        value="student"
                        control={<Radio />}
                        label="Sinh viên"
                      />
                      <FormControlLabel
                        value="teacher"
                        control={<Radio />}
                        label="Giảng viên"
                        sx={{ marginLeft: "50px" }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: "-10px" }}>
                <Stack spacing={1}>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-id">
                      {values.role === "student"
                        ? "Mã sinh viên"
                        : "Mã giảng viên"}
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-id"
                      type="id"
                      value={values.id}
                      name="id"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={
                        values.role === "student"
                          ? "Nhập mã sinh viên"
                          : "Nhập mã giảng viên"
                      }
                      fullWidth
                      error={Boolean(touched.id && errors.id)}
                      label={
                        values.role === "student"
                          ? "Mã sinh viên"
                          : "Mã giảng viên"
                      }
                    />
                    {touched.id && errors.id && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-id-login"
                      >
                        {errors.id}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Mật khẩu
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Mật khẩu"
                    />
                    {touched.password && errors.password && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-password-login"
                      >
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    type="submit"
                    size="large"
                    variant="contained"
                  >
                    Đăng ký
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Typography mt={10}>
                    {" "}
                    Bạn đã có tài khoản ? <Link to={"/login"}>Đăng nhập</Link>
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </Formik>
  );
};

export default Signup;
