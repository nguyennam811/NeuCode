import { createAsyncThunk } from "@reduxjs/toolkit"
import * as studentApi from '../services/studentApi'

export const init = {
    data: {},
    status: 'idle',
    error: null,
}

export const setStatusIdle = (state) => {
    state.status = 'idle'
}


export const getUsers = createAsyncThunk(
    "getUsers",
    async () => {
        try {
            return await studentApi.fetchUser()
        } catch (error) {
            // return error.message
            throw new Error("Failed to fetch Users");
        }
    }
)

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

export const getUserDetail = createAsyncThunk(
    "getUserDetail",
    async (id) => {
        try {
            return await studentApi.fetchUserDetail(id)
        } catch (error) {
            // console.log(error.message)
            throw new Error("Failed to fetch User Detail");
        }
    }
)

export const addUser = createAsyncThunk(
    "addUser",
    async (user) => {
        try {
            return await studentApi.addUser(user)
        } catch (error) {
            // console.log(error.message)
            throw new Error(error.message);

        }
    }
)

export const updateUser = createAsyncThunk(
    "updateUser",
    async (user) => {
        try {
            return await studentApi.updateUser(user)
        } catch (error) {
            // console.log(error.message)
            throw new Error(error.message);

        }
    }
)


export const deleteUsers = createAsyncThunk(
    "deleteUsers",
    async (ids) => {
        try {
            return await studentApi.deleteUser(ids)
        } catch (error) {
            // console.log(error.message)
            // return error.message
            throw new Error(error.message);
        }
    }
)