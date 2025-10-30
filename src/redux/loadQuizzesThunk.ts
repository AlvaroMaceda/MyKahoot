import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { QuizRepository } from '../repository/quizRepository'
import { db } from '../repository/db'
import type { AppState } from './quizSlice'
import type { QuizId } from '../types/quiz'

const quizRepository = new QuizRepository(db)

export const loadQuizzesThunk = createAsyncThunk(
  'quiz/loadQuizzes',
  async (_: void, { rejectWithValue }) => {
    try {
      const quizzes = await quizRepository.getAll()
      return quizzes

    } catch (error: unknown) {
      let message = 'Failed to load quizzes'
      if (error instanceof Error) message = error.message
      return rejectWithValue(message)
    }
  }
)


// To be used in quizSlice
export const loadQuizzesExtraReducers = (builder: ActionReducerMapBuilder<AppState>) => {
  builder
    .addCase(loadQuizzesThunk.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(loadQuizzesThunk.fulfilled, (state, action) => {
      state.loading = false
      const quizzes = action.payload as QuizId[]
      state.quizzes = quizzes
    })
    .addCase(loadQuizzesThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string || 'Failed to load quizzes'
    })
}
