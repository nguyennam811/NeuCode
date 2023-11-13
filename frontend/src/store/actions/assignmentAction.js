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

export const moveToAssignment = createAsyncThunk(
    "moveToAssignment",
    async (assignment) => {
        try {
            return await assignmentApi.moveToAssignment(assignment)
        } catch (error) {
            // console.log(error.message)
            throw new Error(error.message);

        }
    }
)

export const updateAssignment = createAsyncThunk(
    "updateAssignment",
    async (assignment) => {
        try {
            return await assignmentApi.updateAssignment(assignment)
        } catch (error) {
            // console.log(error.message)
            throw new Error(error.message);

        }
    }
)


export const deleteAssignments = createAsyncThunk(
    "deleteAssignments",
    async (ids) => {
        try {
            return await assignmentApi.deleteAssignment(ids)
        } catch (error) {
            // console.log(error.message)
            // return error.message
            throw new Error(error.message);
        }
    }
)

export const getAssignmentDetail = createAsyncThunk(
    "getAssignmentDetail",
    async (id) => {
        try {
            return await assignmentApi.fetchAssignmentDetail(id)
        } catch (error) {
            throw new Error("Failed to fetch assignments detail");
        }
    }
)