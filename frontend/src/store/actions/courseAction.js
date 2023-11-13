import { createAsyncThunk } from "@reduxjs/toolkit"
import * as courseApi from '../services/courseApi'


export const init = {
    data: {},
    status: 'idle',
    error: null,
}

export const setStatusIdle = (state) => {
    state.status = 'idle'
}

export const getCoursesAll = createAsyncThunk(
    "getCoursesAll",
    async () => {
        try {
            return await courseApi.fetchCoursesAll()
        } catch (error) {
            // return error.message
            throw new Error("Failed to fetch all courses");
        }
    }
)

export const getCourses = createAsyncThunk(
    "getCourses",
    async (params) => {
        try {
            return await courseApi.fetchCourses(params)
        } catch (error) {
            // return error.message
            throw new Error("Failed to fetch courses");
        }
    }
)

export const addCourse = createAsyncThunk(
    "addCourse",
    async (course) => {
        try {
            return await courseApi.addCourse(course)
        } catch (error) {
            // console.log(error.message)
            throw new Error(error.message);

        }
    }
)

export const updateCourse = createAsyncThunk(
    "updateCourse",
    async (course) => {
        try {
            return await courseApi.updateCourse(course)
        } catch (error) {
            // console.log(error.message)
            throw new Error(error.message);

        }
    }
)


export const deleteCourses = createAsyncThunk(
    "deleteCourses",
    async (ids) => {
        try {
            return await courseApi.deleteCourse(ids)
        } catch (error) {
            // console.log(error.message)
            // return error.message
            throw new Error(error.message);
        }
    }
)
