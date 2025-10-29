
import type { IDBPDatabase } from 'idb'
import type { Question, Quiz, QuizDetails } from '../types/quiz'

export function upgrade(db: IDBPDatabase, oldVersion: number, _newVersion: number | null, _transaction: IDBPDatabase['transaction']) {
  if (oldVersion < 1) {
    db.createObjectStore('quizzes', { keyPath: 'id' })
    db.createObjectStore('questions', { keyPath: ['quizId', 'id'] }).createIndex('quizId', 'quizId', { unique: false })
  }
}

export class QuizRepository {
  private db: IDBPDatabase

  constructor(db: IDBPDatabase) {
    this.db = db
  }

  private getTransaction() {
    const tx = this.db.transaction(['quizzes', 'questions'], 'readwrite')
    const quizzesStore = tx.objectStore('quizzes')
    const questionsStore = tx.objectStore('questions')
    return {
      tx,
      quizzesStore,
      questionsStore
    }
  }

  async add(quiz: QuizDetails) {
    const { tx, quizzesStore, questionsStore } = this.getTransaction()
    await quizzesStore.put(quiz)

    for (const question of quiz.questions) {
      questionsStore.put(question)
    }

    await tx.done
  }

  async getById(quizId: string): Promise<QuizDetails | undefined> {
    return this.db.transaction(['quizzes', 'questions']).objectStore('quizzes').get(quizId).then(async (quiz) => {
      if (!quiz) return undefined

      const questions = await this.db.transaction('questions').objectStore('questions').getAll()
      return { ...quiz, questions }
    })
  }

  async getAll(): Promise<Quiz[]> {
    const quizzes = await this.db.getAll('quizzes')
    const response: QuizDetails[] = []

    for (const quiz of quizzes) {
      const questions: Question[] = await this.db.getAllFromIndex('questions', 'quizId', quiz.id)

      quiz.questions = questions
      response.push(quiz as QuizDetails)
    }
    return response
  }

  async delete(quizId: string) {
    const { tx, quizzesStore, questionsStore } = this.getTransaction()
    await quizzesStore.delete(quizId)

    const questions = await questionsStore.index('quizId').getAllKeys(quizId)
    for (const key of questions) {
      await questionsStore.delete(key)
    }

    await tx.done
  }
}

