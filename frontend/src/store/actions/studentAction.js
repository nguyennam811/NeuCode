import { createAsyncThunk } from "@reduxjs/toolkit"
import * as studentApi from '../services/studentApi'

export const init = {
    data: [],
    status: 'idle',
}

export const setStatusIdle = (state) => {
    state.status = 'idle'
}

export const getStudents = createAsyncThunk(
    "getStudents",
    async (role) => {
        try {
            return await studentApi.fetchStudent(role)
        } catch (error) {
            // return error.message
            throw new Error("Failed to fetch Students");
        }
    }
)