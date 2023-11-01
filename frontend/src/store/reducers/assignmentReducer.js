import { createSlice } from "@reduxjs/toolkit";
import * as assignment from "../actions/assignmentAction";
import { toast } from "react-toastify";

const assignmentSlice = createSlice({
  name: "assignment",
  initialState: assignment.init,
  reducers: {
    setStatusIdle: assignment.setStatusIdle,
  },
  extraReducers: (builder) => {
    // Get Assignment
    builder.addCase(assignment.getAssignments.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(assignment.getAssignments.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
      console.log("Fetch Assignments is success");
    });

    builder.addCase(assignment.getAssignments.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      console.log("Fetch Assignments is error");
    });

    // Add Assignment
    builder.addCase(assignment.addAssignment.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(assignment.addAssignment.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
      toast.success("Add Assignment Successfully");
    });

    builder.addCase(assignment.addAssignment.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      toast.error(`Add Assignment is Error: ${state.error}`);
    });

  //   // Update Course 
  //   builder.addCase(course.updateCourse.pending, (state) => {
  //     state.status = 'loading'
  // })
  
  // builder.addCase(course.updateCourse.fulfilled, (state, action) => {
  //     state.data = action.payload
  //     state.status = 'success'
  //     toast.success("Update Course Successfully");

  // })

  // builder.addCase(course.updateCourse.rejected, (state, action) => {
  //     state.status = 'error'
  //     state.error = action.error.message;
  //     toast.error(`Update Course is Error: ${state.error}`);
  // })

  //   // delete Course
  //   builder.addCase(course.deleteCourses.pending, (state) => {
  //       state.status = 'loading'
  //   })
    
  //   builder.addCase(course.deleteCourses.fulfilled, (state, action) => {
  //       state.data = action.payload;
  //       state.status = 'success'
  //       toast.success("Delete Course Successfully");
  //   })

  //   builder.addCase(course.deleteCourses.rejected, (state, action) => {
  //       state.status = 'error'
  //       state.error = action.error.message;
  //       toast.error(`Delete Course is Error: ${state.error}`);
  //   })
  },
});

export default assignmentSlice;

export const { setStatusIdle } = assignmentSlice.actions;

