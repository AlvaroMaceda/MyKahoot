
import { type IDBPDatabase } from 'idb'
import type { Quiz } from '../types/quiz'

export function upgrade(db: IDBPDatabase, oldVersion: number, _newVersion: number | null, _transaction: IDBPDatabase['transaction']) {
  if (oldVersion < 1) {
    db.createObjectStore('quizzes', { keyPath: 'id' })
  }
}

export class QuizRepository {
  private db: IDBPDatabase | null = null
  private dbPromise: Promise<IDBPDatabase>

  constructor(dbPromise: Promise<IDBPDatabase>) {
    this.dbPromise = dbPromise
    this.initDb()
  }

  private async initDb() {
    this.db = await this.dbPromise
  }

  private async getDb(): Promise<IDBPDatabase> {
    if (!this.db) {
      this.db = await this.dbPromise
    }
    return this.db
  }

  async add(quiz: Quiz) {
    const db = await this.getDb()
    await db.put('quizzes', quiz)
  }

  async getAll(): Promise<Quiz[]> {
    const db = await this.getDb()
    return db.getAll('quizzes')
  }

  async getById(id: string): Promise<Quiz | undefined> {
    const db = await this.getDb()
    return db.get('quizzes', id)
  }

  async delete(id: string) {
    const db = await this.getDb()
    await db.delete('quizzes', id)
  }
}

