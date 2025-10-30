interface QuizOptionProps {
  text: string
  correct?: boolean
  showAnswer?: boolean
  isUserAnswer?: boolean
  onClick?: () => void
}

function QuizOption({ text, correct, showAnswer, isUserAnswer, onClick }: QuizOptionProps) {

  const optionClass = showAnswer
    ? correct
      ? 'correct'
      : 'incorrect'
    : ''

  const userAnswerClass = isUserAnswer ? 'user-answer' : ''

  return (
    <div className={`quiz-option ${optionClass} ${userAnswerClass}`} onClick={onClick}>
      {text}
    </div>
  )
}

export default QuizOption
