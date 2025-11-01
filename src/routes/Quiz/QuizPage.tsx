import './QuizPage.css'

import { db } from '../../repository/db'
import { QuizRepository } from '../../repository/quizRepository'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { QuizData, TestId } from '../../types/quiz'

import Loading from '../../components/Loading'
import { setError } from '../../redux/quizSlice'
import Quiz from './Quiz'

const quizRepository = new QuizRepository(db)

function QuizPage() {
  const { id } = useParams<{ id: string; question?: string }>()

  const [quiz, setQuiz] = useState<QuizData | null>(null)
  const [loading, setLoading] = useState(true)
  const [found, setFound] = useState(true)

  useEffect(() => {
    async function fetchQuiz() {
      try {
        setError(null)
        setLoading(true)
        const data = await quizRepository.getById(id as TestId)
        if (!data) {
          setLoading(false)
          setFound(false)
          setError('Quiz not found')
          return
        }
        setFound(true)
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
    <>
      <Loading visible={loading} />

      {!loading && quiz && <Quiz quiz={quiz} />}

      {!loading && !found &&
        <div className='quizpage-notfound'>
          Quiz not found
        </div>
      }
    </>
  )

}

export default QuizPage
