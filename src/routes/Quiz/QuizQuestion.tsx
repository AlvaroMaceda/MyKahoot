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
        {question.options.map((option, answerIndex) => {

          const answered = userAnswer !== undefined
          const isCorrect = answerIndex === correctOption
          const isUserAnswer = userAnswer === answerIndex
          const showAnswer = answered && (isCorrect || isUserAnswer)

          return (
            <QuizOption
              key={answerIndex}
              text={option}
              correct={isCorrect}
              showAnswer={showAnswer}
              isUserAnswer={isUserAnswer}
              onClick={() => onAnswer?.(index, answerIndex)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default QuizQuestion
