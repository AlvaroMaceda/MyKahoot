
import type { IDBPDatabase } from 'idb'
import type { QuizId, QuizData } from '../types/quiz'

export async function upgrade(db: IDBPDatabase, oldVersion: number, _newVersion: number | null, _transaction: IDBPDatabase['transaction']) {
  console.log(`Current DB version: ${oldVersion}`)
  if (oldVersion < 1) {
    console.log('Upgrading database to version 1')
    db.createObjectStore('quizzes', { keyPath: 'id' })
  }
  // Migration: assign 'order' property to all quizzes if missing
  const tx = db.transaction('quizzes', 'readwrite')
  const store = tx.objectStore('quizzes')
  const allQuizzes = await store.getAll()
  let changed = false
  allQuizzes.forEach((quiz: QuizData, idx: number) => {
    if (typeof quiz.order !== 'number') {
      quiz.order = allQuizzes.length - idx
      store.put(quiz)
      changed = true
    }
  })
  if (changed) {
    await tx.done
    console.log('Migrated quizzes to add order property')
  }
// ...existing code...
}

export class QuizRepository {
  private db: IDBPDatabase

  constructor(db: IDBPDatabase) {
    this.db = db
  }

  async add(quiz: QuizData) {
    // Get all quizzes to determine the highest order
    const quizzes: QuizData[] = await this.db.getAll('quizzes')
    const maxOrder = quizzes.length > 0 ? Math.max(...quizzes.map(q => q.order ?? 0)) : 0
    const quizToSave = { ...quiz, order: maxOrder + 1 }
    await this.db.put('quizzes', quizToSave)
  }

  async getById(quizId: string): Promise<QuizData | undefined> {
    return this.db.get('quizzes', quizId)
  }

  async getAll(): Promise<QuizId[]> {
    const quizzes: QuizData[] = await this.db.getAll('quizzes')
    // Sort by order descending
    quizzes.sort((a, b) => (b.order ?? 0) - (a.order ?? 0))
    return quizzes.map((quiz) => ({
      id: quiz.id,
      name: quiz.name,
      order: quiz.order ?? 0
    }))
  }

  async delete(quizId: string) {
    await this.db.delete('quizzes', quizId)
  }

  // Reorder quizzes: move quiz with quizId to new position (0-based)
  async reorder(quizId: string, newPosition: number) {
    const quizzes: QuizData[] = await this.db.getAll('quizzes')
    // Sort by order descending
    quizzes.sort((a, b) => (b.order ?? 0) - (a.order ?? 0))
    const idx = quizzes.findIndex(q => q.id === quizId)
    if (idx === -1 || newPosition < 0 || newPosition >= quizzes.length) return
    const [moved] = quizzes.splice(idx, 1)
    quizzes.splice(newPosition, 0, moved)
    // Reassign order: highest order for first
    quizzes.forEach((quiz, i) => {
      quiz.order = quizzes.length - i
      this.db.put('quizzes', quiz)
    })
  }
}

