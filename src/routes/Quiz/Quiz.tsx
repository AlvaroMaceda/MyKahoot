import './Quiz.css'

import { useState } from 'react';
import type { QuizDetails } from "../../types/quiz";

import QuizQuestion from './QuizQuestion';

type QuizProps = {
  quiz: QuizDetails;
};

function Quiz({ quiz }: QuizProps) {

  const [currentQuestion, setCurrentQuestion] = useState(0)

  function nextQuestion() {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }
  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const atFirstQuestion = currentQuestion === 0
  const atLastQuestion = currentQuestion >= quiz.questions.length - 1

  return (
    <div className='quiz-container'>
      <h1 className='quiz-name'>{quiz.name}</h1>
      <div className='quiz-content'>
        <QuizQuestion question={quiz.questions[currentQuestion]} onNext={nextQuestion} />
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
        <button className='quiz-btn quiz-finishbutton'>Finish</button>
      </div>
    </div>
  );
}

export default Quiz
