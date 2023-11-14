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

        // Add User
    builder.addCase(student.addUser.pending, (state) => {
        state.status = "loading";
      });
  
      builder.addCase(student.addUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
        toast.success("Add User Successfully");
      });
  
      builder.addCase(student.addUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
        toast.error(`Add User is Error: ${state.error}`);
      });
  
      // Update User 
      builder.addCase(student.updateUser.pending, (state) => {
        state.status = 'loading'
    })
    
    builder.addCase(student.updateUser.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = 'success'
        toast.success("Update User Successfully");
  
    })
  
    builder.addCase(student.updateUser.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message;
        toast.error(`Update User is Error: ${state.error}`);
    })

    // delete Users
    builder.addCase(student.deleteUsers.pending, (state) => {
        state.status = 'loading'
    })
    
    builder.addCase(student.deleteUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success'
        toast.success("Delete Users Successfully");
    })

    builder.addCase(student.deleteUsers.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message;
        toast.error(`Delete Users is Error: ${state.error}`);
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
