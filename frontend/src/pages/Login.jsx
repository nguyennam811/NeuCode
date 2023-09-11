// import React from 'react'
// import { Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';

// const Login=()=>{
//     const paperStyle={padding :20, width:280}
//     const avatarStyle={backgroundColor:'#1bbd7e'}
//     const btnstyle={margin:'8px 0'}
//     return(
//         <Grid>
//             <Paper elevation={10} sx={{position: 'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)', padding:'20px', width:'25%'}}>
//                 <Grid align='center'>
//                      <Avatar style={avatarStyle}></Avatar>
//                     <h2>Sign In</h2>
//                 </Grid>
//                 <TextField label='Username' placeholder='Enter username' fullWidth required/>
//                 <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
//                 <FormControlLabel
//                     control={
//                     <Checkbox
//                         name="checkedB"
//                         color="primary"
//                     />
//                     }
//                     label="Remember me"
//                  />
//                 <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
//                 <Typography >
//                      <Link href="#" >
//                         Forgot password ?
//                 </Link>
//                 </Typography>
//                 <Typography > Do you have an account ?
//                      <Link href="#" >
//                         Sign Up 
//                 </Link>
//                 </Typography>
//             </Paper>
//         </Grid>
//     )
// }

// export default Login

import { useFormik } from "formik";
import * as Yup from "yup";

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      confirmedPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(4, "must be 4 characters or more"),
      email: Yup.string()
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "ko match nhập lại"),
      password: Yup.string()
        .required("Required")
        // .matches(
        //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        //   "password ko đúng định dạng, 8 kí tự trở lên, có kí tự đặc biệt và có chữ viết hoa"
        // )
        ,
      confirmedPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "ko giống password"),
      phone: Yup.string()
        .required("Required")
        // .matches(
        //   /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, //9-10 số ko phải chữ cái
        //   "Must be a valid phone number"
        // )
        ,

      //required: ko để trống
      //min: độ dài tối thiếu
      //matches: có đúng định dạng ko
      //oneOf - ref : chỉ dựa trên 1 thằng password
    }),
    onSubmit: (values) => {
        window.alert("Form submission")
      console.log(values);
    },
  });

  console.log(formik.errors.email);

  return (
    <>
      <div className="hihi">
        <header> Sign up </header>
      </div>
      <section>
        <form className="infoform" onSubmit={formik.handleSubmit}>
          <label> Your name </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="enter your name"
          />
            {formik.errors.name &&(
                <p className="errorMsg">{formik.errors.name}</p>
            )}
          <label> Email address </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="enter your email"
          />
            {formik.errors.email &&(
                <p className="errorMsg">{formik.errors.email}</p>
            )}
          <label> Password </label>
          <input
            type="text"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="enter your password"
          />
          {formik.errors.password &&(
            <p className="errorMsg">{formik.errors.password}</p>
        )}
          <label> Confirm password </label>
          <input
            type="text"
            id="confirmedPassword"
            name="confirmedPassword"
            value={formik.values.confirmedPassword} //tên giống vs id vs name mới đc nhé
            onChange={formik.handleChange}
            placeholder="enter your confirmedPassword"
          />
            {formik.errors.confirmedPassword &&(
            <p className="errorMsg">{formik.errors.confirmedPassword}</p>
        )}
          
          <label> Phone number </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder="enter your phone"
          />
          {formik.errors.phone &&(
            <p className="errorMsg">{formik.errors.phone}</p>
        )}

          <button type="submit">Continue</button>
        </form>
      </section>
    </>
  );
};

export default SignupForm;
