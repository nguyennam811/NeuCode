import { configureStore } from '@reduxjs/toolkit'

import problemReducer from './reducers/problemReducer'
import problemDetailReducer from './reducers/problemDetailReducer'

const store = configureStore({
  reducer: {
    problem: problemReducer.reducer,
    problemDetail: problemDetailReducer.reducer
  },
})

export default store
