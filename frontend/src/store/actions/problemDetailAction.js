import { createAsyncThunk } from "@reduxjs/toolkit"
import * as problemDetailApi from '../services/problemDetailApi'


export const init = {
    data: {},
    status: 'idle',
    error: null,
}

export const setStatusIdle = (state) => {
    state.status = 'idle'
}

export const getProblemDetail = createAsyncThunk(
    "getProblemDetail",
    async (id) => {
        try {
            return await problemDetailApi.fetchProblemDetail(id)
        } catch (error) {
            // console.log(error.message)
            throw new Error("Failed to fetch Problem Detail");
        }
    }
)

export const addProblem = createAsyncThunk(
    "addProblem",
    async (problem) => {
        try {
            return await problemDetailApi.addProblem(problem)
        } catch (error) {
            // console.log(error.message)
            throw new Error("Failed to add Problem");
        }
    }
)


export const updateProblemByUser = createAsyncThunk(
    "updateProblem",
    async (problem) => {
        try {
            return await problemDetailApi.updateProblem(problem)
        } catch (error) {
            // console.log(error.message)
            throw new Error("Failed to update Problem");
        }
    }
)

