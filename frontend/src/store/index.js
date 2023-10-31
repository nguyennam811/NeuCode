import { configureStore } from '@reduxjs/toolkit'

import problemReducer from './reducers/problemReducer'
import problemDetailReducer from './reducers/problemDetailReducer'
import submissionReducer from './reducers/submissionReducer'
import testResultReducer from './reducers/testResultReducer'
import testReducer from './reducers/testReducer'
import courseReducer from './reducers/courseReducer'

const store = configureStore({
  reducer: {
    problem: problemReducer.reducer,
    course: courseReducer.reducer,
    problemDetail: problemDetailReducer.reducer,
    submission: submissionReducer.reducer,
    test_result: testResultReducer.reducer,
    test: testReducer.reducer,
  },
})

export default store
