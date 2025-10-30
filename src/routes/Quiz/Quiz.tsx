import './Quiz.css'

import type { QuizDetails } from "../../types/quiz";

type QuizProps = {
  quiz: QuizDetails;
};

function Quiz({ quiz }: QuizProps) {
  return (
    <div className='quiz-container'>
      <h1>Quiz Page for quiz ID: {quiz.id}</h1>
      <div>
        <h2>{quiz.name}</h2>
      </div>
    </div>
  );
}

export default Quiz
