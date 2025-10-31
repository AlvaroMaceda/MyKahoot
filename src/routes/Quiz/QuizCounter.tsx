
import React from 'react';
import './QuizCounter.css';

interface QuizCounterProps {
  totalRight: number;
  totalWrong: number;
  totalQuestions: number;
}

const QuizCounter: React.FC<QuizCounterProps> = ({ totalRight, totalWrong, totalQuestions }) => {
  return (
    <div className="quiz-counter">
      <span className="quiz-counter__right">✔️ Bien: {totalRight}</span>
      <span className="quiz-counter__wrong">❌ Mal: {totalWrong}</span>
      <span className="quiz-counter__total">Total: {totalQuestions}</span>
    </div>
  );
};

export default QuizCounter;
