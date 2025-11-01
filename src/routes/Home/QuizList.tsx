import './QuizList.css'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import QuizListItem from './QuizListItem'
import { selectQuizzes, selectLoading, selectError } from '../../redux/quizSlice'
import { loadQuizzesThunk } from '../../redux/loadQuizzesThunk'
import type { AppDispatch } from '../../redux/store'

import Loading from '../../components/Loading'
import type { TestId } from '../../types/quiz'
import { QuizRepository } from '../../repository/quizRepository'
import { db } from '../../repository/db'
import { quizToCSV } from '../../lib/download_quiz'

const quizRepository = new QuizRepository(db)

function QuizList() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {

    async function loadQuizzes() {
      dispatch(loadQuizzesThunk())
    }

    loadQuizzes()
  }, [dispatch])


  const quizzes = useSelector(selectQuizzes)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  function startTest(id: TestId) {
    navigate(`/quiz/${id}`)
  }

  function deleteTest(id: TestId) {
    if (!window.confirm('¿Seguro que quieres eliminar este test?')) return
    quizRepository.delete(id)
    dispatch(loadQuizzesThunk())
  }

  async function downloadTest(id: TestId) {
    const quiz = await quizRepository.getById(id)
    if (!quiz) return

    const downloadData = quizToCSV(quiz)
    // Create a Blob and trigger download
    const blob = new Blob([downloadData], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${quiz.name}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {quizzes.length === 0 && !loading && !error && <div>No hay tests disponibles</div>}

      {quizzes.length > 0 && (
        <div>
          <h3 className='existing-tests-label'>Haz uno de los tests ya existentes</h3>
          <div className='tests-list'>
            {quizzes.map(test => (
              <QuizListItem key={test.id}
                id={test.id}
                name={test.name}
                onDelete={deleteTest}
                onDownload={downloadTest}
                onStart={startTest}
              />
            ))}
          </div>
        </div>
      )}

      <Loading visible={!!loading} />
      {error && <div className='error-message'>{error}</div>}
    </>
  )
}


export default QuizList
