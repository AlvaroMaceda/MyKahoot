
import type { IDBPDatabase } from 'idb'
import type { QuizId, QuizData } from '../types/quiz'

export function upgrade(db: IDBPDatabase, oldVersion: number, _newVersion: number | null, _transaction: IDBPDatabase['transaction']) {
  console.log(`Current DB version: ${oldVersion}`)
  if (oldVersion < 1) {
    console.log('Upgrading database to version 1')
    db.createObjectStore('quizzes', { keyPath: 'id' })
  }
}

export class QuizRepository {
  private db: IDBPDatabase

  constructor(db: IDBPDatabase) {
    this.db = db
  }

  async add(quiz: QuizData) {
    this.db.put('quizzes', quiz)
  }

  async getById(quizId: string): Promise<QuizData | undefined> {
    return this.db.get('quizzes', quizId)
  }

  async getAll(): Promise<QuizId[]> {
    const quizzes = await this.db.getAll('quizzes')
    return quizzes.map((quiz) => ({
      id: quiz.id,
      name: quiz.name
    }))
  }

  async delete(quizId: string) {
    this.db.delete('quizzes', quizId)
  }
}

