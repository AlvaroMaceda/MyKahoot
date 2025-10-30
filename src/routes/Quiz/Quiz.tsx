import './Quiz.css'

import { useParams } from 'react-router-dom'

function Quiz() {
  const { id, question } = useParams<{ id: string; question?: string }>()

  return (
    <div className='quiz-container'>
      <h1>Quiz Page for quiz ID: {id}</h1>
      <h2>Question: {question ? question : 'Quiz start'}</h2>
    </div>
  )
}

export default Quiz
