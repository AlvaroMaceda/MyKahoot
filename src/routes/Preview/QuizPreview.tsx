import './QuizPreview.css'

import { useSelector } from 'react-redux'
import { selectPreviewQuiz } from '../../redux/quizSlice'
import PreviewQuestion from './PreviewQuestion'
import type { Question } from '../../types/quiz'

function QuizPreview() {
  const previewQuiz = useSelector(selectPreviewQuiz)
  if (!previewQuiz) {
    return <div>No preview quiz available</div>
  }

  const questions: Question[] = previewQuiz ? previewQuiz.questions : []

  return (
    <div className="quizpreview-preview">
      <h1>Quiz preview</h1>
      <div className="quizpreview-name">{previewQuiz.name}</div>
      <div className="quizpreview-questions">
        {questions.map((question, index) => <PreviewQuestion key={index} question={question} />)}


        <div className="buttons">
          <button className="quizpreview-confirm-btn">Confirmar</button>
          <button className="quizpreview-cancel-btn">Cancelar</button>
        </div>

      </div>

    </div>
  )
}

export default QuizPreview
