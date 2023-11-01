import { createAsyncThunk } from "@reduxjs/toolkit"
import * as assignmentApi from '../services/assignmentApi'


export const init = {
    data: {},
    status: 'idle',
    error: null,
}

export const setStatusIdle = (state) => {
    state.status = 'idle'
}

export const getAssignments = createAsyncThunk(
    "getAssignments",
    async (params) => {
        try {
            return await assignmentApi.fetchAssignments(params)
        } catch (error) {
            // return error.message
            throw new Error("Failed to fetch assignments");
        }
    }
)

export const addAssignment = createAsyncThunk(
    "addAssignment",
    async (assignment) => {
        try {
            return await assignmentApi.addAssignment(assignment)
        } catch (error) {
            // console.log(error.message)
            throw new Error(error.message);

        }
    }
)

// export const updateCourse = createAsyncThunk(
//     "updateCourse",
//     async (course) => {
//         try {
//             return await courseApi.updateCourse(course)
//         } catch (error) {
//             // console.log(error.message)
//             throw new Error(error.message);

//         }
//     }
// )


// export const deleteCourses = createAsyncThunk(
//     "deleteCourses",
//     async (ids) => {
//         try {
//             return await courseApi.deleteCourse(ids)
//         } catch (error) {
//             // console.log(error.message)
//             // return error.message
//             throw new Error(error.message);
//         }
//     }
// )
