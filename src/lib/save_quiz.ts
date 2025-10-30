
import type { IDBPDatabase } from 'idb'
import type { QuizData } from '../types/quiz'

import { QuizRepository } from '../repository/quizRepository'

export default async function saveQuiz(db: IDBPDatabase, quiz: QuizData): Promise<void> {
  const quizRepository = new QuizRepository(db)

  return quizRepository.add(quiz)
}
