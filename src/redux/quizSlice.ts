// Example slice (replace with your own)
import { createSlice } from '@reduxjs/toolkit'
import type { Quiz } from '../types/quiz'
import { dbPromise } from '../repository/db'
import { QuizRepository } from '../repository/quizRepository'

export type AppState = {
  quizzes: Quiz[]
}

const quizRepository = new QuizRepository(dbPromise)

const INITIAL_STATE: AppState = {
  quizzes: [
    { id: '1', name: 'General Knowledge' },
    { id: '2', name: 'Science Quiz' },
    { id: '3', name: 'History Quiz' },
  ],
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: INITIAL_STATE,
  reducers: {
  },
})


export const selectQuizzes = (state: { quiz: AppState }) => state.quiz.quizzes
