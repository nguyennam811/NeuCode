import { createAsyncThunk } from "@reduxjs/toolkit"
import * as testResultApi from '../services/testResultApi'


export const init = {
    data: [],
    status: 'idle',
    error: null,
}

export const setStatusIdle = (state) => {
    state.status = 'idle'
}

export const getTestResult = createAsyncThunk(
    "getTest_Result",
    async (id_submission) => {
        try {
            return await testResultApi.fetchTestResult(id_submission)
        } catch (error) {
            // console.log(error.message)
            throw new Error("Failed to fetch test_result");
        }
    }
)

