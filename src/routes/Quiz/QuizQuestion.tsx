import type { QuestionWithAnswer } from '../../types/quiz'
import QuizOption from './QuizOption'

interface QuizQuestionProps {
  index: number
  question: QuestionWithAnswer
  onAnswer?: (questionIndex: number, answerIndex: number) => void
}

function QuizQuestion({ index, question, onAnswer }: QuizQuestionProps) {

  const correctOption = question.correctOption
  const userAnswer = question.answer

  return (
    <div className='quiz-question'>
      <div className='quiz-question-text'>{question.text}</div>
      <div className='quiz-options'>
        {question.options.map((option, answerIndex) => (
          <QuizOption
            key={answerIndex}
            text={option}
            correct={answerIndex === correctOption}
            showAnswer={userAnswer == answerIndex}
            onClick={() => onAnswer?.(index, answerIndex)}
          />
        ))}
      </div>
    </div>
  )
}

export default QuizQuestion
