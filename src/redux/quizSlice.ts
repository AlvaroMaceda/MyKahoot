// Example slice (replace with your own)
import { createSlice } from '@reduxjs/toolkit'
import type { Question, Quiz, QuizDetails } from '../types/quiz'
import { loadQuizzesExtraReducers } from './loadQuizzesThunk'


  const PREVIEW_QUESTIONS: Question[] = [
    {
      id: "1",
      text: "What is the largest country in the world by area?",
      correctOption: 0,
      options: [
        "Russia, covering more than 17 million square kilometers",
        "Canada, with an area of about 10 million square kilometers",
        "China, spanning approximately 9.6 million square kilometers",
        "United States, with a total area of around 9.8 million square kilometers"
      ],
    },
    {
      id: "2",
      text: "Which planet in our solar system is known for its prominent ring system?",
      correctOption: 2,
      options: [
        "Saturn, famous for its extensive and bright rings made of ice and rock",
        "Jupiter, which has faint rings mostly composed of dust particles",
        "Uranus, with narrow and dark rings that are difficult to see",
        "Neptune, whose rings are faint and consist mainly of dust",
      ],
    },
    {
      id: "3",
      text: "What is the process by which plants convert sunlight into chemical energy?",
      correctOption: 1,
      options: [
        "Photosynthesis, where plants use sunlight to produce glucose and oxygen from carbon dioxide and water",
        "Respiration, the process of breaking down food to release energy",
        "Transpiration, the evaporation of water from plant leaves",
        "Fermentation, the conversion of sugars into alcohol or acids by microorganisms",
      ],
    },
  ]
const PREVIEW_QUIZ: QuizDetails = {
  id: 'preview',
  name: 'Geography & Science Quiz',
  questions: PREVIEW_QUESTIONS,
}


export type AppState = {
  quizzes: Quiz[]
  loading?: boolean
  error?: string | null
  previewQuiz?: QuizDetails
}

const INITIAL_STATE: AppState = {
  quizzes: [],
  previewQuiz: PREVIEW_QUIZ,
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
