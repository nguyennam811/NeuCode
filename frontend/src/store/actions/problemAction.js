import { createAsyncThunk } from "@reduxjs/toolkit"
import * as problemApi from '../services/problemApi'


export const init = {
    data: [],
    status: 'idle',
    error: null,
}

export const setStatusIdle = (state) => {
    state.status = 'idle'
}

export const getProblems = createAsyncThunk(
    "getProblems",
    async (params) => {
        try {
            return await problemApi.fetchProblems(params)
        } catch (error) {
            // console.log(error.message)
            throw new Error("Failed to fetch problems");
        }
    }
)

