import { createSlice } from "@reduxjs/toolkit";
import * as course from "../actions/courseAction";
import { toast } from "react-toastify";

const courseSlice = createSlice({
  name: "course",
  initialState: course.init,
  reducers: {
    setStatusIdle: course.setStatusIdle,
  },
  extraReducers: (builder) => {
    // Get Course
    builder.addCase(course.getCourses.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(course.getCourses.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
      console.log("Fetch Courses is success");
    });

    builder.addCase(course.getCourses.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      console.log("Fetch Courses is error");
    });

    // Add Course
    builder.addCase(course.addCourse.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(course.addCourse.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
      toast.success("Add Course Successfully");
    });

    builder.addCase(course.addCourse.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      toast.error(`Add Course is Error: ${state.error}`);
    });

    // Update Course 
    builder.addCase(course.updateCourse.pending, (state) => {
      state.status = 'loading'
  })
  
  builder.addCase(course.updateCourse.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
      toast.success("Update Course Successfully");

  })

  builder.addCase(course.updateCourse.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.error.message;
      toast.error(`Update Course is Error: ${state.error}`);
  })

    // delete Course
    builder.addCase(course.deleteCourses.pending, (state) => {
        state.status = 'loading'
    })
    
    builder.addCase(course.deleteCourses.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success'
        toast.success("Delete Course Successfully");
    })

    builder.addCase(course.deleteCourses.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message;
        toast.error(`Delete Course is Error: ${state.error}`);
    })
  },
});

export default courseSlice;

export const { setStatusIdle } = courseSlice.actions;

