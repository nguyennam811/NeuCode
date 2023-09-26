import { createSlice } from '@reduxjs/toolkit'

import * as problem from '../actions/problemAction'

const problemSlice = createSlice({
    name: 'problem',
    initialState: problem.init,
    reducers: {
        resetStatusCode: problem.resetStatusCode,
    },
    extraReducers: (builder) => {
        // Get Problem
        builder.addCase(problem.getProblems.pending, (state) => {
            state.status = 'loading'
        })
        
        builder.addCase(problem.getProblems.fulfilled, (state, action) => {
            state.status = 'success'
            console.log(state.status)
            state.data = action.payload

            console.log('Fetch problem is success')
        })

        builder.addCase(problem.getProblems.rejected, (state) => {
            console.log('Fetch problem is error')
        })
    }
})

export default problemSlice

export const {
    resetStatusCode,
} = problemSlice.actions
