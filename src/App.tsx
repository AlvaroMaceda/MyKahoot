import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './redux/store'

import Home from './routes/Home/Home'
import Quiz from './routes/Quiz/Quiz'
import QuizPreview from './routes/Preview/QuizPreview'

const appRoutes = [
  { path: '/', element: <Home /> },
  { path: '/quiz/:id/:question?', element: <Quiz /> },
  { path: '/preview', element: <QuizPreview /> },
]

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {appRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </Provider>
  )
}


export default App
