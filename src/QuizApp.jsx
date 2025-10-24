import { useState, useEffect } from "react"
import Card from './Card.jsx'
import CardContent from './CardContent.jsx'
import Button from './components/Button.jsx'
import './QuizApp.css' // Import the custom CSS file

// Función para parsear una fila CSV teniendo en cuenta las comas dentro de campos entre comillas
function parseCSVRow(row) {
  const regex = /"(.*?)"|([^",\n]+)(?=\s*,|\s*$)/g
  const result = []
  let match

  // Busca todos los valores entre comillas o los valores sin comillas
  while ((match = regex.exec(row)) !== null) {
    result.push(match[1] ? match[1] : match[2])
  }

  return result
}


const DELAY = 3000

const QuizApp = () => {

  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/clima.csv")
      const data = await response.text()
      const rows = data.split("\n").filter(row => row.trim() !== "").map(parseCSVRow)
      const parsedQuestions = rows.slice(1).map((row) => {
        return ({
          question: row[0],
          answers: row.slice(1, 5),
          timeLimit: parseInt(row[5], 10),
          correctAnswers: row[6].split(",").map(Number),
        })
      })
      setQuestions(parsedQuestions)
    }

    fetchQuestions()
  }, [])

  const handleAnswerClick = (index) => {
    // if(isAnswered) return

    const correctAnswers = questions[currentQuestionIndex].correctAnswers
    const isAnswerCorrect = correctAnswers.includes(index + 1)
    setIsCorrect(isAnswerCorrect)
    setSelectedAnswers((prev) => [...prev, index + 1])
    setIsAnswered(true)

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
      } else {
        setQuizCompleted(true)
      }
      setIsCorrect(null)
      setIsAnswered(false)
    }, DELAY)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setQuizCompleted(true)
    }
    setIsCorrect(null)
  }


  return (
    <div className="quiz-container">
      {!quizCompleted ? (
        questions.length > 0 && (
          <Card>
            <CardContent className="card-content">
              <h2 className="question-title">
                {questions[currentQuestionIndex].question}
              </h2>
              <div className="answers-grid">
                {questions[currentQuestionIndex].answers.map((answer, index) => {
                  const isCorrect = questions[currentQuestionIndex].correctAnswers.includes(index + 1)
                  const isSelectedAnswer = selectedAnswers[currentQuestionIndex] === index + 1
                  const classToApply = isSelectedAnswer ? (isCorrect ? 'correct' : 'incorrect') : ''
                  return (
                      <Button
                        key={index}
                        className={"answer-button " + classToApply}
                        onClick={() => handleAnswerClick(index)}
                      >
                        {answer} {selectedAnswers[currentQuestionIndex] == index +1}
                      </Button>
                   )
                  })
                }
              </div>
              {isCorrect !== null && (
                <>
                  <p className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '¡Respuesta correcta!' : 'Respuesta incorrecta'}
                  </p>
                  <Button className="next-button" onClick={handleNextQuestion}>
                    Siguiente pregunta
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )
      ) : (
        <h2 className="quiz-completed">Quiz completado!</h2>
      )}
    </div>
  )
}

export default QuizApp
