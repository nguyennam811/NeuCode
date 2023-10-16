import { createAsyncThunk } from "@reduxjs/toolkit"
import * as submissionApi from '../services/submissionApi'


export const init = {
    data: {},
    status: 'idle',
    error: null,
}

export const setStatusIdle = (state) => {
    state.status = 'idle'
}

export const addSubmissionByUser = createAsyncThunk(
    "addSubmission",
    async (submission) => {
        try {
            return await submissionApi.addSubmission(submission)
        } catch (error) {
            // console.log(error.message)
            throw new Error("Failed to add submission: " + error.message);
        }
    }
)
