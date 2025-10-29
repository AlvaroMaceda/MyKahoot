import type { Question } from "../../types/quiz"
import PreviewOption from "./PreviewOption"

function PreviewQuestion({ question }: { question: Question }) {
  return (
    <div className="quizpreview-question">
      <div className="quizpreview-question-text">{question.text}</div>
      <div className="quizpreview-options">
        {question.options.map((option, index) => <PreviewOption key={index} text={option} correct={index === question.correctOption} />)}
      </div>
    </div>
  )
}

export default PreviewQuestion
