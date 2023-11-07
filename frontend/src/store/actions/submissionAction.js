import { createAsyncThunk } from "@reduxjs/toolkit"
import * as submissionApi from '../services/submissionApi'


export const init = {
    data: {},
    status: 'idle',
    error: null,
    tabs: '1'
}

export const setStatusIdle = (state) => {
    state.status = 'idle'
}

export const setTabValue = (state, action) => {
    state.tabs = action.payload
}

export const getSubmissions = createAsyncThunk(
    "getSubmissions",
    async (params) => {
        try {
            return await submissionApi.fetchSubmissionsAll(params)
        } catch (error) {
            // return error.message
            throw new Error("Failed to fetch submissions");
        }
    }
)

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

export const getSubmissionById = createAsyncThunk(
    "getSubmission",
    async (submission_id) => {
        try {
            return await submissionApi.fetchSubmission(submission_id)
        } catch (error) {
            // console.log(error.message)
            throw new Error("Failed to get submission ID: " + error.message);
        }
    }
)

