import type { Question } from '../../types/quiz'
import QuizOption from './QuizOption'

interface QuizQuestionProps {
  question: Question
  onNext?: () => void
}

function QuizQuestion({ question, onNext }: QuizQuestionProps) {

  const correctOption = question.correctOption

  function handleOptionClick(selectedIndex: number) {
  }

  return (
    <div className='quiz-question'>
      <div className='quiz-question-text'>{question.text}</div>
      <div className='quiz-options'>
        {question.options.map((option, index) => (
          <QuizOption key={index} text={option} onClick={() => handleOptionClick(index)} />
        ))}
      </div>
    </div>
  )
}

export default QuizQuestion
