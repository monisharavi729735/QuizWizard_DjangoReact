import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import NotFoundPage from './pages/NotFoundPage'
import LoginSignUpPage from './pages/LoginSignUpPage'
import CreateQuiz from './pages/CreateQuiz'
import AnswerQuiz from './pages/AnswerQuiz'

import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/auth' element={<LoginSignUpPage />} />
        <Route path="add-quiz" element={<CreateQuiz />} />
        <Route path="/answer-quiz" element={<AnswerQuiz />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />
}


export default App
