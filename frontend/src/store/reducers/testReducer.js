import { createSlice } from '@reduxjs/toolkit'
import * as test from '../actions/testAction'
import { toast } from 'react-toastify'

const testSlice = createSlice({
    name: 'test',
    initialState: test.init,
    reducers: {
        setStatusIdle: test.setStatusIdle,
    },
    extraReducers: (builder) => {
        // Get Problem
        builder.addCase(test.addTestForProblem.pending, (state) => {
            state.status = 'loading'
        })
        
        builder.addCase(test.addTestForProblem.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'success'
            toast.success("Test For Problem Successfully");
        })

        builder.addCase(test.addTestForProblem.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message;
            toast.error(`Test For Problem is Error: ${state.error}`);
        })
    }
})

export default testSlice

export const {
    setStatusIdle
} = testSlice.actions

// Lý do bạn không cần phải thêm getProblems vào phần export của problemSlice.actions 
// là vì getProblems đã được tạo ra bởi createAsyncThunk và nó không cần được export ra bên ngoài slice.

// createAsyncThunk tự động tạo ra action creators với các tên như fulfilled, rejected, và pending 
// dựa trên tên bạn cung cấp cho createAsyncThunk. Trong trường hợp này, 
// nó đã tạo ra action creators như getProblems/fulfilled, getProblems/rejected, và getProblems/pending 
// mà bạn có thể sử dụng để dispatch các action từ một tệp khác.

// Khi bạn đã sử dụng createAsyncThunk để tạo ra các action creators như vậy, 
// bạn không cần phải thêm chúng vào phần export của problemSlice.actions. 
// Bạn chỉ cần sử dụng getProblems/fulfilled trong việc dispatch action như bạn đã làm:
