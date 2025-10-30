
import type { QuizData } from "../types/quiz";
import { v4 as uuidv4 } from 'uuid';


export default function parseCSVQuiz(csvContent: string): QuizData {
  const lines = csvContent.split('\n').map(line => line.trim()).filter(line => line.length > 0)
  if (lines.length < 2) {
    throw new Error('CSV content is too short. Must have at least a title and one question.')
  }

  const quizTitle = lines[0]
  const questions = lines.slice(1).map((line, index) => {
    const parts = line.split(',').map(part => part.trim().replace(/^'|'$/g, ''))
    if (parts.length < 3) {
      throw new Error(`Invalid question format on line ${index + 2}. Each question must have at least one correct and one incorrect answer.`)
    }
    const questionText = parts[0]
    const correctAnswer = parts[1]
    const incorrectAnswers = parts.slice(2)

    const options = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5)
    const correctOptionIndex = options.indexOf(correctAnswer)

    return {
      id: (index + 1).toString(),
      text: questionText,
      correctOption: correctOptionIndex,
      options: options,
    }
  })

  return {
    id: uuidv4(),
    name: quizTitle,
    questions: questions,
  }
}
