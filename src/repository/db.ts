
import { openDB } from 'idb'

const DB_VERSION = 1

// Initialize DB
export const db = await openDB('myKahootDB', DB_VERSION, {
  upgrade(db) {
    db.createObjectStore('quizzes', { keyPath: 'id' })
  },
})
