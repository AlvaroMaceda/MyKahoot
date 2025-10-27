import './Home.css'

import QuizList from './QuizList'
import UploadQuiz from './UploadQuiz'

function Home() {
  return (
    <div className="container">
      <UploadQuiz />
      <QuizList />
    </div>
  )
}

export default Home
