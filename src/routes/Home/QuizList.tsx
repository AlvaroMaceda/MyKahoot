import './QuizList.css'

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'

import QuizListItem from "./QuizListItem"
import { selectQuizzes, selectLoading, selectError } from "../../redux/quizSlice"
import { loadQuizzesThunk } from "../../redux/loadQuizzesThunk"
import type { AppDispatch } from "../../redux/store"

import Loading from "../../components/Loading"

function QuizList() {
  const dispatch = useDispatch<AppDispatch>() // <-- Use typed dispatch

  useEffect(() => {

    async function loadQuizzes() {
      dispatch(loadQuizzesThunk())
    }

    loadQuizzes()
  }, [dispatch])


  const quizzes = useSelector(selectQuizzes)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  return (
    <>
      { quizzes.length === 0 && !loading && !error && <div>No quizzes available</div>}

      { quizzes.length > 0 &&  (
      <div>
        <h3 className="existing-tests-label">Haz uno de los tests ya existentes</h3>
        <div className="tests-list">
          {quizzes.map(test => <QuizListItem key={test.id} id={test.id} name={test.name} />)}
        </div>
      </div>
      )}

      <Loading visible={!!loading} />
      { error && <div className="error-message">{error}</div> }
    </>
  )
}


export default QuizList
