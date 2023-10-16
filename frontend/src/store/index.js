import { configureStore } from '@reduxjs/toolkit'

import problemReducer from './reducers/problemReducer'
import problemDetailReducer from './reducers/problemDetailReducer'
import submissionReducer from './reducers/submissionReducer'
import testResultReducer from './reducers/testResultReducer'

const store = configureStore({
  reducer: {
    problem: problemReducer.reducer,
    problemDetail: problemDetailReducer.reducer,
    submission: submissionReducer.reducer,
    test_result: testResultReducer.reducer,
  },
})

export default store
