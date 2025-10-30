export type TestId = string

export type Quiz = {
  id: TestId
  name: string
}

export type Question = {
  id: TestId
  text: string
  options: string[]
  correctOption: number
}

export type QuizDetails = {
  id: TestId
  name: string
  questions: Question[]
}
