import './Quiz.css'

import { useState } from 'react'
import type { QuestionWithAnswer, QuizData } from "../../types/quiz"
import { useNavigate } from 'react-router'

import QuizQuestion from './QuizQuestion'

type QuizProps = {
  quiz: QuizData
}

function randomizeQuestions(questions: QuizData['questions']): QuizData['questions'] {
  // Simple Fisher-Yates shuffle
  const shuffled = [...questions]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function randomizeOptions(options: string[], correctOptionIndex: number): { options: string[], newCorrectOptionIndex: number } {
  const optionPairs = options.map((option, index) => ({ option, index }))
  // Shuffle options
  for (let i = optionPairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[optionPairs[i], optionPairs[j]] = [optionPairs[j], optionPairs[i]]
  }
  const newOptions = optionPairs.map(pair => pair.option)
  const newCorrectOptionIndex = optionPairs.findIndex(pair => pair.index === correctOptionIndex)
  return { options: newOptions, newCorrectOptionIndex }
}

function prepareQuestions(quiz: QuizData): QuestionWithAnswer[] {
  const questionsWithRandomOptions = quiz.questions.map(question => {
    const { options, newCorrectOptionIndex } = randomizeOptions(question.options, question.correctOption)
    return {
      ...question,
      options,
      correctOption: newCorrectOptionIndex,
      answer: undefined
    }
  })

  const randomizedQuestions = randomizeQuestions(questionsWithRandomOptions)
  return randomizedQuestions
}


function Quiz({ quiz }: QuizProps) {
  const navigate = useNavigate()

  const [currentIndex, setCurrentIndex] = useState(0)
  // const [questions, setQuestions] = useState<QuestionWithAnswer[]>(quiz.questions.map(q => ({ ...q, answer: undefined })))
  const [questions, setQuestions] = useState<QuestionWithAnswer[]>(prepareQuestions(quiz))

  const currentQuestion = questions[currentIndex]

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  function previousQuestion() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  function finishQuiz() {
    navigate(`/`)
  }

  function questionAnswered(questionIndex: number, answerIndex: number) {

    const question = questions[questionIndex]
    if(!question) return
    if(question.answer !== undefined) return // already answered

    questions[questionIndex].answer = answerIndex
    setQuestions([...questions])
  }

  const atFirstQuestion = currentIndex === 0
  const atLastQuestion = currentIndex >= quiz.questions.length - 1

  return (
    <div className='quiz-container'>

      <h1 className='quiz-name'>{quiz.name}</h1>

      <div className='quiz-content'>
        {currentQuestion && // Only render if currentQuestion is defined
          <QuizQuestion
            index={currentIndex}
            question={questions[currentIndex]}
            onAnswer={questionAnswered}
          />
        }
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
