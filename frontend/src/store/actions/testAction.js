import { createAsyncThunk } from "@reduxjs/toolkit"
import * as testApi from '../services/testApi'


export const init = {
    data: [],
    status: 'idle',
    error: null,
}

export const setStatusIdle = (state) => {
    state.status = 'idle'
}

export const addTestForProblem = createAsyncThunk(
    "addTestForProblem",
    async (formTest) => {
        try {
            return await testApi.addTest(formTest)
        } catch (error) {
            // console.log(error.message)
            throw new Error("Failed to add test for problem");
        }
    }
)

