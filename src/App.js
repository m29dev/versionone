import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './Pages/HomePage'
import SignInPage from './Pages/SignInPage'
import SignUpPage from './Pages/SignUpPage'
import CoursesPage from './Pages/CoursesPage'
import LearningPage from './Pages/LearningPage'
import QuizPage from './Pages/QuizPage'
import UserPage from './Pages/UserPage'
import TestPage from './Pages/TestPage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/user/:id" element={<UserPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<LearningPage />} />
                <Route path="/courses/:id/test" element={<TestPage />} />
                <Route path="/quiz" element={<QuizPage />} />
            </Routes>
        </Router>
    )
}

export default App
