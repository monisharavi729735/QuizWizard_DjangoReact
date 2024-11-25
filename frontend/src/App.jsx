import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import NotFoundPage from './pages/NotFoundPage'
import LoginSignUpPage from './pages/LoginSignUpPage'
import AllQuizzes from './pages/AllQuizzes'
import CreateQuiz from './pages/CreateQuiz'
import AnswerQuiz from './pages/AnswerQuiz'
import StartQuiz from './pages/StartQuiz'
import ErrorPage from './pages/ErrorPage'
import PrivateRoute from './components/PrivateRoute'; 

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
        {/* Protect the /start-quiz/:id route with PrivateRoute */}
        <Route
          path="/start-quiz/:id"
          element={
            <PrivateRoute>
              <StartQuiz />
            </PrivateRoute>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />
}


export default App
