
import { openDB } from 'idb'
import { upgrade } from './quizRepository'

const DB_VERSION = 1

// Initialize DB
export const db = await openDB('myKahootDB', DB_VERSION, {
  async upgrade(db) {
    await upgrade(db, 0, DB_VERSION, db.transaction)
  },
})
