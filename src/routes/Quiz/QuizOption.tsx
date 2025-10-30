interface QuizOptionProps {
  text: string
  correct?: boolean
  showAnswer?: boolean
  onClick?: () => void
}

function QuizOption({ text, correct, showAnswer, onClick }: QuizOptionProps) {

  const optionClass = showAnswer
    ? correct
      ? 'quiz-option-correct'
      : 'quiz-option-incorrect'
    : ''

  return (
    <div className={`quiz-option ${optionClass}`} onClick={onClick}>
      {text}
    </div>
  )
}

export default QuizOption
