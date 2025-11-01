import './QuizCounter.css'

// Icono correcto SVG
const CorrectIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle' }}>
    <circle cx="10" cy="10" r="10" fill="#2ecc40" />
    <path d="M6 10.5L9 13.5L14 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Icono incorrecto SVG
const WrongIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle' }}>
    <circle cx="10" cy="10" r="10" fill="#ff4136" />
    <path d="M7 7L13 13M13 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
)


interface QuizCounterProps {
  totalRight: number
  totalWrong: number
  totalQuestions: number
  currentQuestion: number
}

function QuizCounter({ totalRight, totalWrong, totalQuestions, currentQuestion }: QuizCounterProps) {
  return (
    <div className="quiz-counter">
      <span className="quiz-counter__right"><CorrectIcon /> <span className="quiz-counter__right-text">Bien</span>: {totalRight}</span>
      <span className="quiz-counter__wrong"><WrongIcon /> <span className="quiz-counter__wrong-text">Mal</span>: {totalWrong}</span>
      <span className="quiz-counter__total">{currentQuestion + 1} de {totalQuestions}</span>
    </div>
  )
}

export default QuizCounter
