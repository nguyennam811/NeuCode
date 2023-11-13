import { createSlice } from "@reduxjs/toolkit";
import * as submission from "../actions/submissionAction";
import { toast } from "react-toastify";

const submissionSlice = createSlice({
  name: "submission",
  initialState: submission.init,
  reducers: {
    setStatusIdle: submission.setStatusIdle,
    setDetailSubmission: submission.setDetailSubmission
  },
  extraReducers: (builder) => {
    // Get Submission
    builder.addCase(submission.getSubmissions.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(submission.getSubmissions.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
      console.log("Fetch Submission is success");
    });

    builder.addCase(submission.getSubmissions.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      console.log("Fetch Submission is error");
    });

    // // post Submission
    // builder.addCase(submission.addSubmissionByUser.pending, (state) => {
    //   state.status = "loading";
    // });

    // builder.addCase(
    //   submission.addSubmissionByUser.fulfilled,
    //   (state, action) => {
    //     state.data = action.payload;
    //     console.log(action.payload);
    //     state.status = "success";
    //     console.log("add submission is success");
    //   }
    // );

    // builder.addCase(
    //   submission.addSubmissionByUser.rejected,
    //   (state, action) => {
    //     state.status = "error";
    //     state.error = action.error.message;
    //     console.log("add submission is error");
    //   }
    // );

    // post Submission
    builder.addCase(submission.addSubmissionByUser.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(
      submission.addSubmissionByUser.fulfilled,
      (state, action) => {
        state.detail = action.payload;
        console.log(action.payload);
        state.status = "success";
        console.log("add submission is success");
      }
    );

    builder.addCase(
      submission.addSubmissionByUser.rejected,
      (state, action) => {
        state.status = "error";
        state.error = action.error.message;
        console.log("add submission is error");
      }
    );

    // get Submission_id
    builder.addCase(submission.getSubmissionById.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(submission.getSubmissionById.fulfilled, (state, action) => {
      // state.data = action.payload;
      state.detail = action.payload;
      console.log(action.payload);
      state.status = "success";
      console.log("get submission ID is success");
    });

    builder.addCase(submission.getSubmissionById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      console.log("get submission ID is error");
    });

    // delete Submission
    builder.addCase(submission.deleteSubmissions.pending, (state) => {
      state.status = 'loading'
  })
  
  builder.addCase(submission.deleteSubmissions.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success'
      toast.success("Delete Submission Successfully");
  })

  builder.addCase(submission.deleteSubmissions.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.error.message;
      toast.error(`Delete Submission is Error: ${state.error}`);
  })
  },
});

export default submissionSlice;

export const { setStatusIdle, setDetailSubmission } = submissionSlice.actions;

// Lý do bạn không cần phải thêm getProblems vào phần export của problemSlice.actions
// là vì getProblems đã được tạo ra bởi createAsyncThunk và nó không cần được export ra bên ngoài slice.

// createAsyncThunk tự động tạo ra action creators với các tên như fulfilled, rejected, và pending
// dựa trên tên bạn cung cấp cho createAsyncThunk. Trong trường hợp này,
// nó đã tạo ra action creators như getProblems/fulfilled, getProblems/rejected, và getProblems/pending
// mà bạn có thể sử dụng để dispatch các action từ một tệp khác.

// Khi bạn đã sử dụng createAsyncThunk để tạo ra các action creators như vậy,
// bạn không cần phải thêm chúng vào phần export của problemSlice.actions.
// Bạn chỉ cần sử dụng getProblems/fulfilled trong việc dispatch action như bạn đã làm:
