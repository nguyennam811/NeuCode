import { createSlice } from '@reduxjs/toolkit'
import * as testResult from '../actions/testResultAction'

const testResultSlice = createSlice({
    name: 'test_result',
    initialState: testResult.init,
    reducers: {
        setStatusIdle: testResult.setStatusIdle,
        setTestResult: testResult.setTestResult
    },
    extraReducers: (builder) => {
        // Get test result
        builder.addCase(testResult.getTestResult.pending, (state) => {
            state.status = 'loading'
            state.data = []
        })
        
        builder.addCase(testResult.getTestResult.fulfilled, (state, action) => {
            state.data = action.payload
            console.log(action.payload)
            state.status = 'success'
            console.log('Fetch testResult is success')
        })

        builder.addCase(testResult.getTestResult.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message;
            console.log('Fetch testResult is error')
        })
    }
})

export default testResultSlice

export const {
    setStatusIdle,
    setTestResult
} = testResultSlice.actions

// Lý do bạn không cần phải thêm getProblems vào phần export của problemSlice.actions 
// là vì getProblems đã được tạo ra bởi createAsyncThunk và nó không cần được export ra bên ngoài slice.

// createAsyncThunk tự động tạo ra action creators với các tên như fulfilled, rejected, và pending 
// dựa trên tên bạn cung cấp cho createAsyncThunk. Trong trường hợp này, 
// nó đã tạo ra action creators như getProblems/fulfilled, getProblems/rejected, và getProblems/pending 
// mà bạn có thể sử dụng để dispatch các action từ một tệp khác.

// Khi bạn đã sử dụng createAsyncThunk để tạo ra các action creators như vậy, 
// bạn không cần phải thêm chúng vào phần export của problemSlice.actions. 
// Bạn chỉ cần sử dụng getProblems/fulfilled trong việc dispatch action như bạn đã làm:
