import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './Home/Home'
import Quiz from './Quiz/Quiz'

const appRoutes = [
  { path: '/', element: <Home /> },
  { path: '/quiz/:id/:question?', element: <Quiz /> },
]

function App() {

  return (
    <Router>
      <Routes>
        {appRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  )
}


export default App
