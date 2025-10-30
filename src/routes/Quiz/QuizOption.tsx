interface QuizOptionProps {
  text: string
}

function QuizOption({ text }: QuizOptionProps) {
  return (
    <div className={`quiz-option`}>
      {text}
    </div>
  )
}

export default QuizOption
