import { createAsyncThunk } from "@reduxjs/toolkit"
// import { fetchProblems } from "../services/problemApi"


// init
export const init = {
    statusCode: 200,
    data: [],
    status: 'success',
}

export const resetStatusCode = (state) => {
    state.statusCode = 200
}


export const getProblems = createAsyncThunk(
    "getProblems",
    async () => {
        const res = await fetch('http://127.0.0.1:8000/api/problems/');
        const data = await res.json();
        console.log(data)
        return data;
    }
)

