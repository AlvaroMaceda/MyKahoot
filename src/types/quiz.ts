export type Quiz = {
  id: string
  name: string
}

export type Question = {
  id: string
  text: string
  options: string[]
  correctOption: number
}

export type QuizDetails = {
  id: string
  name: string
  questions: Question[]
}
