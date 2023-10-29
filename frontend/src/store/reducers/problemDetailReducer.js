import { createSlice } from '@reduxjs/toolkit'
import * as problemDetail from '../actions/problemDetailAction'
import { toast } from 'react-toastify'

const problemDetailSlice = createSlice({
    name: 'problemDetail',
    initialState: problemDetail.init,
    reducers: {
        setStatusIdle: problemDetail.setStatusIdle,
    },
    extraReducers: (builder) => {
        // Get Problem Detail
        builder.addCase(problemDetail.getProblemDetail.pending, (state) => {
            state.status = 'loading'
        })
        
        builder.addCase(problemDetail.getProblemDetail.fulfilled, (state, action) => {
            state.data = action.payload
            console.log(action.payload)
            state.status = 'success'
            console.log('Fetch Problem Detail is success')
        })

        builder.addCase(problemDetail.getProblemDetail.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message;
            console.log('Fetch Problem Detail is error')
        })


        // Add Problem 
        builder.addCase(problemDetail.addProblem.pending, (state) => {
            state.status = 'loading'
        })
        
        builder.addCase(problemDetail.addProblem.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'success'
            toast.success("Add Problem Successfully");
        })

        builder.addCase(problemDetail.addProblem.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message;
            toast.error(`Add Problem is Error: ${state.error}`);

        })

        // Update Problem 
        builder.addCase(problemDetail.updateProblemByUser.pending, (state) => {
            state.status = 'loading'
        })
        
        builder.addCase(problemDetail.updateProblemByUser.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'success'
            toast.success("Update Problem Successfully");

        })

        builder.addCase(problemDetail.updateProblemByUser.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message;
            toast.error(`Update Problem is Error: ${state.error}`);
        })
    }
})

export default problemDetailSlice

export const {
    setStatusIdle
} = problemDetailSlice.actions

// Lý do bạn không cần phải thêm getProblems vào phần export của problemSlice.actions 
// là vì getProblems đã được tạo ra bởi createAsyncThunk và nó không cần được export ra bên ngoài slice.

// createAsyncThunk tự động tạo ra action creators với các tên như fulfilled, rejected, và pending 
// dựa trên tên bạn cung cấp cho createAsyncThunk. Trong trường hợp này, 
// nó đã tạo ra action creators như getProblems/fulfilled, getProblems/rejected, và getProblems/pending 
// mà bạn có thể sử dụng để dispatch các action từ một tệp khác.

// Khi bạn đã sử dụng createAsyncThunk để tạo ra các action creators như vậy, 
// bạn không cần phải thêm chúng vào phần export của problemSlice.actions. 
// Bạn chỉ cần sử dụng getProblems/fulfilled trong việc dispatch action như bạn đã làm:
