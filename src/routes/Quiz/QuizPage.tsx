import './QuizPage.css'

import { db } from '../../repository/db'
import { QuizRepository } from '../../repository/quizRepository'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { QuizDetails, TestId } from '../../types/quiz'

import Loading from '../../components/Loading'
import { setError } from '../../redux/quizSlice'
import Quiz from './Quiz'

const quizRepository = new QuizRepository(db)


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function QuizPage() {
  const { id } = useParams<{ id: string; question?: string }>()

  const [quiz, setQuiz] = useState<QuizDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuiz() {
      try {
        setError(null)
        setLoading(true)
        const data = await quizRepository.getById(id as TestId)
        if (!data) {
          setLoading(false)
          setError('Quiz not found')
          return
        }
        await delay(3000) // Simulate network delay
        setQuiz(data)

      } catch (_error) {
        setError('Failed to fetch quiz')
      } finally {
        setLoading(false)
      }
    }
    fetchQuiz()
  }, [id])

  return (
    <div className='quiz-container'>
      <Loading visible={loading} />

      {!loading && quiz && <Quiz quiz={quiz} />}
    </div>
  )

}

export default QuizPage
