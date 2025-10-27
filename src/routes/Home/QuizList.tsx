import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'

import QuizListItem from "./QuizListItem"
import { selectQuizzes } from "../../redux/quizSlice"
import { loadQuizzesThunk } from "../../redux/loadQuizzesThunk"
import type { AppDispatch } from "../../redux/store"

function QuizList() {
  const dispatch = useDispatch<AppDispatch>() // <-- Use typed dispatch

  useEffect(() => {

    async function loadQuizzes() {
      dispatch(loadQuizzesThunk())
    }

    loadQuizzes()
  }, [dispatch])


  const quizzes = useSelector(selectQuizzes)

  return (
    <div>
      <h3 className="existing-tests-label">Haz uno de los tests ya existentes</h3>
      <div className="tests-list">
        {quizzes.map(test => <QuizListItem key={test.id} id={test.id} name={test.name} />)}
      </div>
    </div>
  )
}


export default QuizList
