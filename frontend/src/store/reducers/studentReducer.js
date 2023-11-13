import { createSlice } from '@reduxjs/toolkit'
import * as student from '../actions/studentAction'
import { toast } from 'react-toastify'

const studentSlice = createSlice({
    name: 'student',
    initialState: student.init,
    reducers: {
        setStatusIdle: student.setStatusIdle,
    },
    extraReducers: (builder) => {
        // Get student
        builder.addCase(student.getStudents.pending, (state) => {
            state.status = 'loading'
        })
        
        builder.addCase(student.getStudents.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'success'
        })

        builder.addCase(student.getStudents.rejected, (state, action) => {
            state.status = 'error'
            console.log("fetch students failed")
        })

        // Get users
        builder.addCase(student.getUsers.pending, (state) => {
            state.status = 'loading'
        })
        
        builder.addCase(student.getUsers.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'success'
        })

        builder.addCase(student.getUsers.rejected, (state, action) => {
            state.status = 'error'
            console.log("fetch users failed")
        })
    }
})

export default studentSlice

export const {
    setStatusIdle
} = studentSlice.actions

// Lý do bạn không cần phải thêm getProblems vào phần export của problemSlice.actions 
// là vì getProblems đã được tạo ra bởi createAsyncThunk và nó không cần được export ra bên ngoài slice.

// createAsyncThunk tự động tạo ra action creators với các tên như fulfilled, rejected, và pending 
// dựa trên tên bạn cung cấp cho createAsyncThunk. Trong trường hợp này, 
// nó đã tạo ra action creators như getProblems/fulfilled, getProblems/rejected, và getProblems/pending 
// mà bạn có thể sử dụng để dispatch các action từ một tệp khác.

// Khi bạn đã sử dụng createAsyncThunk để tạo ra các action creators như vậy, 
// bạn không cần phải thêm chúng vào phần export của problemSlice.actions. 
// Bạn chỉ cần sử dụng getProblems/fulfilled trong việc dispatch action như bạn đã làm:
