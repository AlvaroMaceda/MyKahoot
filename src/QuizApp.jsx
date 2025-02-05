import React, { useState, useEffect } from "react"
import Card from './Card.jsx'
import CardContent from './CardContent.jsx'
import Button from './components/Button.jsx'

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
    console.log('CLICK')
    const correctAnswers = questions[currentQuestionIndex].correctAnswers
    const isAnswerCorrect = correctAnswers.includes(index + 1)
    setIsCorrect(isAnswerCorrect)
    setSelectedAnswers((prev) => [...prev, index + 1])

    console.log('Setting timeout for', DELAY, 'milliseconds')
    setTimeout(() => {
      console.log('TIMEOUT')
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
      } else {
        setQuizCompleted(true)
      }
      setIsCorrect(null)
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
    <div className="p-4 max-w-xl mx-auto">
      {!quizCompleted ? (
        questions.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-4">
                {questions[currentQuestionIndex].question}
              </h2>
              <div className="space-y-2">
                {questions[currentQuestionIndex].answers.map((answer, index) => (
                  <Button
                    key={index}
                    className="w-full"
                    onClick={() => handleAnswerClick(index)}
                  >
                    {answer}
                  </Button>
                ))}
              </div>
              {isCorrect !== null && (
                <>
                  <p className={`mt-4 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {isCorrect ? '¡Respuesta correcta!' : 'Respuesta incorrecta'}
                  </p>
                  <Button className="mt-4 w-full" onClick={handleNextQuestion}>
                    Siguiente pregunta
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )
      ) : (
        <h2 className="text-xl font-bold text-center">Quiz completado!</h2>
      )}
    </div>
  )
}

export default QuizApp
