// Example slice (replace with your own)
import { createSlice } from '@reduxjs/toolkit'
import type { Quiz } from '../types/quiz'
import { loadQuizzesExtraReducers } from './loadQuizzesThunk'

export type AppState = {
  quizzes: Quiz[]
  loading?: boolean
  error?: string | null
}

const INITIAL_STATE: AppState = {
  quizzes: [],
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: INITIAL_STATE,
  reducers: {
  },
  extraReducers: (builder) => {
    loadQuizzesExtraReducers(builder)
  }
})


export const selectQuizzes = (state: { quiz: AppState }) => state.quiz.quizzes
export const selectLoading = (state: { quiz: AppState }) => state.quiz.loading
export const selectError = (state: { quiz: AppState }) => state.quiz.error
