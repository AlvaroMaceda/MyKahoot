import type { Question } from '../../types/quiz'
import PreviewOption from './QuizOption'

interface QuizQuestionProps {
  question: Question
}

function QuizQuestion({ question }: QuizQuestionProps) {
  return (
    <div className='quizpreview-question'>
      <div className='quizpreview-question-text'>{question.text}</div>
      <div className='quizpreview-options'>
        {question.options.map((option, index) => (
          <PreviewOption key={index} text={option} />
        ))}
      </div>
    </div>
  )
}

export default QuizQuestion
