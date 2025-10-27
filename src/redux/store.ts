import { configureStore } from '@reduxjs/toolkit'

import { quizSlice } from './quizSlice'


// export const {  } = quizSlice.actions

export const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer,
  },
})

// Types for use in components
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
