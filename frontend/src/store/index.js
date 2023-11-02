import { configureStore } from '@reduxjs/toolkit'

import problemReducer from './reducers/problemReducer'
import problemDetailReducer from './reducers/problemDetailReducer'
import submissionReducer from './reducers/submissionReducer'
import testResultReducer from './reducers/testResultReducer'
import testReducer from './reducers/testReducer'
import courseReducer from './reducers/courseReducer'
import assignmentReducer from './reducers/assignmentReducer'
import courseStudentReducer from './reducers/courseStudentReducer'
import studentReducer from './reducers/studentReducer'

const store = configureStore({
  reducer: {
    student: studentReducer.reducer,
    problem: problemReducer.reducer,
    course: courseReducer.reducer,
    course_student: courseStudentReducer.reducer,
    assignment: assignmentReducer.reducer,
    problemDetail: problemDetailReducer.reducer,
    submission: submissionReducer.reducer,
    test_result: testResultReducer.reducer,
    test: testReducer.reducer,

  },
})

export default store
