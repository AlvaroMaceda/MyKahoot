import type { Question, QuizData } from "../types/quiz"

function quizToCSV(quiz: QuizData): string {

  const content: string[] = []
  content.push(quiz.name)

  quiz.questions.forEach((question: Question) => {
    const line: string[] = []
    line.push(question.text)

    // Put correct option first, then the rest (excluding correct)
    line.push(question.options[question.correctOption])
    question.options.forEach((option: string, idx: number) => {
      if (idx !== question.correctOption) {
        line.push(option)
      }
    })
    content.push(line.join(','))
  })


  return content.join('\n')
}

export { quizToCSV }
