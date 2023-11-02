import { createAsyncThunk } from "@reduxjs/toolkit"
import * as courseStudentApi from '../services/courseStudentApi'


export const init = {
    data: {},
    status: 'idle',
    error: null,
}

export const setStatusIdle = (state) => {
    state.status = 'idle'
}

export const getCourseStudent = createAsyncThunk(
    "getCourseStudent",
    async (params) => {
        try {
            return await courseStudentApi.fetchCourseStudent(params)
        } catch (error) {
            throw new Error("Failed to fetch course student");
        }
    }
)

export const addCourseStudentByTeacher = createAsyncThunk(
    "addCourseStudent",
    async (course_student) => {
        try {
            return await courseStudentApi.addCourseStudent(course_student)
        } catch (error) {
            throw new Error(error.message);

        }
    }
)

export const deleteCourseStudent = createAsyncThunk(
    "deleteCourseStudent",
    async (ids) => {
        try {
            return await courseStudentApi.deleteCourseStudent(ids)
        } catch (error) {
            throw new Error(error.message);
        }
    }
)
