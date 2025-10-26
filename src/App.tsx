import './App.css'
import QuizList from './Home/QuizList'
import UploadQuiz from './Home/UploadQuiz'

function App() {

  return (
    <div className="container">

      <UploadQuiz />
      <QuizList />

    </div>
  )
}


export default App
