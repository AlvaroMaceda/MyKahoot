import './Quiz.css'

import { useState } from 'react'
import type { QuestionWithAnswer, QuizData } from "../../types/quiz"

import QuizQuestion from './QuizQuestion'

type QuizProps = {
  quiz: QuizData
}




function Quiz({ quiz }: QuizProps) {

  const [currentIndex, setCurrentIndex] = useState(0)
  const questions: QuestionWithAnswer[] = quiz.questions.map(q => ({ ...q, answer: undefined }))
  const currentQuestion = questions[currentIndex]
  console.log('Rendering Quiz')
  console.log(currentQuestion)

  function nextQuestion() {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  function previousQuestion() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  function finishQuiz() {
    console.log('Quiz finished', questions)
  }

  function questionAnswered(questionIndex: number, answerIndex: number) {
    questions[questionIndex].answer = answerIndex
  }

  const atFirstQuestion = currentIndex === 0
  const atLastQuestion = currentIndex >= quiz.questions.length - 1

  return (
    <div className='quiz-container'>

      <h1 className='quiz-name'>{quiz.name}</h1>

      <div className='quiz-content'>
        <QuizQuestion
          index={currentIndex}
          question={questions[currentIndex]}
          onAnswer={questionAnswered}
        />
      </div>

      <div className='quiz-buttons'>

        <div className='quiz-movementbuttons'>
          <button className='quiz-btn quiz-previousbutton'
            disabled={atFirstQuestion} onClick={previousQuestion}>
            Previous
          </button>
          <button className='quiz-btn quiz-nextbutton'
            disabled={atLastQuestion} onClick={nextQuestion}>
            Next
          </button>
        </div>

        <button className='quiz-btn quiz-finishbutton'
            onClick={finishQuiz}>
            Finish
        </button>

      </div>

    </div>
  )
}

export default Quiz
