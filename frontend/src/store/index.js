import { configureStore } from '@reduxjs/toolkit'

import problemReducer from './reducers/problemReducer'

const store = configureStore({
  reducer: {
    problem: problemReducer.reducer,
  },
})

export default store
