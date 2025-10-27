
import { openDB } from 'idb'

const DB_VERSION = 1

// Initialize DB
export const dbPromise = openDB('myKahootDB', DB_VERSION, {
  upgrade(db) {
    db.createObjectStore('quizzes', { keyPath: 'id' })
  },
})
