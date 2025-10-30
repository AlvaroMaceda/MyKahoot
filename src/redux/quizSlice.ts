// Example slice (replace with your own)
import { createSlice } from '@reduxjs/toolkit'
import type { QuizId, QuizData } from '../types/quiz'
import { loadQuizzesExtraReducers } from './loadQuizzesThunk'

export type AppState = {
  quizzes: QuizId[]
  loading?: boolean
  error?: string | null
  previewQuiz?: QuizData
}

const INITIAL_STATE: AppState = {
  quizzes: [],
  previewQuiz: undefined,
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: INITIAL_STATE,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    setPreviewQuiz(state, action) {
      state.previewQuiz = action.payload
    }
  },
  extraReducers: (builder) => {
    loadQuizzesExtraReducers(builder)
  }
})

export const {
  setLoading,
  setError,
  setPreviewQuiz
} = quizSlice.actions

export const selectQuizzes = (state: { quiz: AppState }) => state.quiz.quizzes
export const selectLoading = (state: { quiz: AppState }) => state.quiz.loading
export const selectError = (state: { quiz: AppState }) => state.quiz.error
export const selectPreviewQuiz = (state: { quiz: AppState }) => state.quiz.previewQuiz
