import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import NotFoundPage from './pages/NotFoundPage'
import LoginSignUpPage from './pages/LoginSignUpPage'
import AllQuizzes from './pages/AllQuizzes'
import CreateQuiz from './pages/CreateQuiz'
import AnswerQuiz from './pages/AnswerQuiz'
import ErrorPage from './pages/ErrorPage'

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
        <Route path='/error' element={<ErrorPage />} />
        <Route path='/auth' element={<LoginSignUpPage />} />
        <Route path='/quizzes' element={<AllQuizzes />} />
        <Route path="add-quiz" element={<CreateQuiz />} />
        <Route path="/answer-quiz" element={<AnswerQuiz />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />
}


export default App
