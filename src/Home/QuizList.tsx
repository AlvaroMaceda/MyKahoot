import { useSelector } from "react-redux"
import QuizListItem from "./QuizListItem"
import { selectQuizzes } from "../redux/quizSlice"

function QuizList() {
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
