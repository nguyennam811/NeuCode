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
      toast.error(
        `Add Assignment is Error: ${state.error} Or ID Problem Already Exists.`
      );
    });

    // Update Assignment
    builder.addCase(assignment.updateAssignment.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(assignment.updateAssignment.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
      toast.success("Update Assignment Successfully");
    });

    builder.addCase(assignment.updateAssignment.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      toast.error(`Update Assignment is Error: ${state.error}`);
    });

    // delete Assignment
    builder.addCase(assignment.deleteAssignments.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(assignment.deleteAssignments.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
      toast.success("Delete Assignment Successfully");
    });

    builder.addCase(assignment.deleteAssignments.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      toast.error(`Delete Assignment is Error: ${state.error}`);
    });

    // Get Assignment Detail
    builder.addCase(assignment.getAssignmentDetail.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(
      assignment.getAssignmentDetail.fulfilled,
      (state, action) => {
        state.data = action.payload;
        state.status = "success";
        console.log("Fetch Assignment Detail is success");
      }
    );

    builder.addCase(
      assignment.getAssignmentDetail.rejected,
      (state, action) => {
        state.status = "error";
        state.error = action.error.message;
        console.log("Fetch Assignment Detail is error");
      }
    );
  },
});

export default assignmentSlice;

export const { setStatusIdle } = assignmentSlice.actions;
