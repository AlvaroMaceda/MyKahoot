export type TestId = string

export type QuizId = {
  id: TestId
  name: string
}

export type Question = {
  id: TestId
  text: string
  options: string[]
  correctOption: number
}

export type QuestionWithAnswer = Question & {
  answer?: number
}

export type QuizData = {
  id: TestId
  name: string
  questions: Question[]
}
