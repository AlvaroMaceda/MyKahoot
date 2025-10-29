import './QuizPreview.css'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectPreviewQuiz } from '../../redux/quizSlice'
import PreviewQuestion from './PreviewQuestion'
import type { Question, QuizDetails } from '../../types/quiz'
import { db } from '../../repository/db'
import saveQuiz from '../../lib/save_quiz'

function QuizPreview() {
  const navigate = useNavigate()

  const previewQuiz: QuizDetails | undefined = useSelector(selectPreviewQuiz)
  if (!previewQuiz) {
    return <div>No preview quiz available</div>
  }

  const quiz: QuizDetails = previewQuiz
  function handleSave() {
    saveQuiz(db, quiz)
    console.log('Quiz guardado')
  }

  function handleCancel() {
    navigate('/') // Navega a la página principal
  }

  const questions: Question[] = previewQuiz ? previewQuiz.questions : []

  return (
    <div className='quizpreview-preview'>
      <h1>Quiz preview</h1>
      <div className='quizpreview-name'>{previewQuiz.name}</div>
      <div className='quizpreview-questions'>
        {questions.map((question, index) => <PreviewQuestion key={index} question={question} />)}


        <div className='buttons'>
          <button className='quizpreview-confirm-btn' onClick={handleSave}>Confirmar</button>
          <button className='quizpreview-cancel-btn' onClick={handleCancel}>Cancelar</button>
        </div>

      </div>

    </div>
  )
}

export default QuizPreview
