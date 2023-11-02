import { createSlice } from "@reduxjs/toolkit";
import * as courseStudent from "../actions/courseStudentAction";
import { toast } from "react-toastify";

const courseStudentSlice = createSlice({
  name: "courseStudent",
  initialState: courseStudent.init,
  reducers: {
    setStatusIdle: courseStudent.setStatusIdle,
  },
  extraReducers: (builder) => {
    // Get Course_Student
    builder.addCase(courseStudent.getCourseStudent.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(courseStudent.getCourseStudent.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
      console.log("Fetch Course_Student is success");
    });

    builder.addCase(courseStudent.getCourseStudent.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      console.log("Fetch Course_Student is error");
    });

    // Add Course_Student
    builder.addCase(courseStudent.addCourseStudentByTeacher.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(courseStudent.addCourseStudentByTeacher.fulfilled, (state, action) => {
      state.data.data.concat(action.payload);
      state.status = "success";
      toast.success("Add Course Student Successfully");
    });

    builder.addCase(courseStudent.addCourseStudentByTeacher.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      toast.error(`Add Course Student is Error: ${state.error}`);
    });

    // delete Course Student
    builder.addCase(courseStudent.deleteCourseStudent.pending, (state) => {
        state.status = 'loading'
    })
    
    builder.addCase(courseStudent.deleteCourseStudent.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success'
        toast.success("Delete Course Student Successfully");
    })

    builder.addCase(courseStudent.deleteCourseStudent.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message;
        toast.error(`Delete Course Student is Error: ${state.error}`);
    })
  },
});

export default courseStudentSlice;

export const { setStatusIdle } = courseStudentSlice.actions;

