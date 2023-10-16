import { configureStore } from '@reduxjs/toolkit'

import problemReducer from './reducers/problemReducer'
import problemDetailReducer from './reducers/problemDetailReducer'
import submissionReducer from './reducers/submissionReducer'

const store = configureStore({
  reducer: {
    problem: problemReducer.reducer,
    problemDetail: problemDetailReducer.reducer,
    submission: submissionReducer.reducer,
  },
})

export default store
