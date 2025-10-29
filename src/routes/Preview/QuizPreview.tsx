import './QuizPreview.css'
import PreviewQuestion from './PreviewQuestion'
import type { Question } from '../../types/quiz'

function QuizPreview() {
  const questions: Question[] = [
    {
      id: "1",
      text: "What is the largest country in the world by area?",
      correctOption: 0,
      options: [
        "Russia, covering more than 17 million square kilometers",
        "Canada, with an area of about 10 million square kilometers",
        "China, spanning approximately 9.6 million square kilometers",
        "United States, with a total area of around 9.8 million square kilometers"
      ],
    },
    {
      id: "2",
      text: "Which planet in our solar system is known for its prominent ring system?",
      correctOption: 2,
      options: [
        "Saturn, famous for its extensive and bright rings made of ice and rock",
        "Jupiter, which has faint rings mostly composed of dust particles",
        "Uranus, with narrow and dark rings that are difficult to see",
        "Neptune, whose rings are faint and consist mainly of dust",
      ],
    },
    {
      id: "3",
      text: "What is the process by which plants convert sunlight into chemical energy?",
      correctOption: 1,
      options: [
        "Photosynthesis, where plants use sunlight to produce glucose and oxygen from carbon dioxide and water",
        "Respiration, the process of breaking down food to release energy",
        "Transpiration, the evaporation of water from plant leaves",
        "Fermentation, the conversion of sugars into alcohol or acids by microorganisms",
      ],
    },
  ]


  return (
    <div className="quizpreview-preview">
      <h1>Quiz preview</h1>
      <div className="quizpreview-name">Geography & Science Quiz</div>
      <div className="quizpreview-questions">
        {questions.map((question, index) => <PreviewQuestion key={index} question={question} />)}


        <div className="buttons">
          <button className="quizpreview-confirm-btn">Confirmar</button>
          <button className="quizpreview-cancel-btn">Cancelar</button>
        </div>

      </div>

    </div>
  )
}

export default QuizPreview
