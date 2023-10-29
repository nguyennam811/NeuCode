import { createSlice } from '@reduxjs/toolkit'
import * as problem from '../actions/problemAction'
import { toast } from 'react-toastify'

const problemSlice = createSlice({
    name: 'problem',
    initialState: problem.init,
    reducers: {
        setStatusIdle: problem.setStatusIdle,
    },
    extraReducers: (builder) => {
        // Get Problem
        builder.addCase(problem.getProblems.pending, (state) => {
            state.status = 'loading'
        })
        
        builder.addCase(problem.getProblems.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'success'
        })

        builder.addCase(problem.getProblems.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message;
        })

        // delete Problem
        builder.addCase(problem.deleteProblems.pending, (state) => {
            state.status = 'loading'
        })
        
        builder.addCase(problem.deleteProblems.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'success'
            toast.success("Delete Problem Successfully");
        })

        builder.addCase(problem.deleteProblems.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message;
            toast.error(`Delete Problem is Error: ${state.error}`);
        })
    }
})

export default problemSlice

export const {
    setStatusIdle
} = problemSlice.actions

// Lý do bạn không cần phải thêm getProblems vào phần export của problemSlice.actions 
// là vì getProblems đã được tạo ra bởi createAsyncThunk và nó không cần được export ra bên ngoài slice.

// createAsyncThunk tự động tạo ra action creators với các tên như fulfilled, rejected, và pending 
// dựa trên tên bạn cung cấp cho createAsyncThunk. Trong trường hợp này, 
// nó đã tạo ra action creators như getProblems/fulfilled, getProblems/rejected, và getProblems/pending 
// mà bạn có thể sử dụng để dispatch các action từ một tệp khác.

// Khi bạn đã sử dụng createAsyncThunk để tạo ra các action creators như vậy, 
// bạn không cần phải thêm chúng vào phần export của problemSlice.actions. 
// Bạn chỉ cần sử dụng getProblems/fulfilled trong việc dispatch action như bạn đã làm:
