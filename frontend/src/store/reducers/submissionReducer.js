import { createSlice } from '@reduxjs/toolkit'
import * as submission from '../actions/submissionAction'

const submissionSlice = createSlice({
    name: 'problem',
    initialState: submission.init,
    reducers: {
        setStatusIdle: submission.setStatusIdle,
    },
    extraReducers: (builder) => {
        // Get Submission
        builder.addCase(submission.addSubmissionByUser.pending, (state) => {
            state.status = 'loading'
        })
        
        builder.addCase(submission.addSubmissionByUser.fulfilled, (state, action) => {
            state.data = action.payload
            console.log(action.payload)
            state.status = 'success'
            console.log('add submission is success')
        })

        builder.addCase(submission.addSubmissionByUser.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message;
            console.log('add submission is error')
        })
    }
})

export default submissionSlice

export const {
    setStatusIdle
} = submissionSlice.actions

// Lý do bạn không cần phải thêm getProblems vào phần export của problemSlice.actions 
// là vì getProblems đã được tạo ra bởi createAsyncThunk và nó không cần được export ra bên ngoài slice.

// createAsyncThunk tự động tạo ra action creators với các tên như fulfilled, rejected, và pending 
// dựa trên tên bạn cung cấp cho createAsyncThunk. Trong trường hợp này, 
// nó đã tạo ra action creators như getProblems/fulfilled, getProblems/rejected, và getProblems/pending 
// mà bạn có thể sử dụng để dispatch các action từ một tệp khác.

// Khi bạn đã sử dụng createAsyncThunk để tạo ra các action creators như vậy, 
// bạn không cần phải thêm chúng vào phần export của problemSlice.actions. 
// Bạn chỉ cần sử dụng getProblems/fulfilled trong việc dispatch action như bạn đã làm: