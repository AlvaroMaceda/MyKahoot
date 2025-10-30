import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './redux/store'

import Layout from './components/Layout'
import Home from './routes/Home/Home'
import QuizPage from './routes/Quiz/QuizPage'
import QuizPreview from './routes/Preview/QuizPreview'

const appRoutes = [
  { path: '/', element: <Home /> },
  { path: '/quiz/:id/:question?', element: <QuizPage /> },
  { path: '/preview', element: <QuizPreview /> },
]

function App() {

  return (
    <Provider store={store}>
      <Layout>
      <Router>
        <Routes>
          {appRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
      </Layout>
    </Provider>
  )
}


export default App
