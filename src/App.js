import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import ClassPage from './Pages/ClassPage'
import HomePage from './Pages/HomePage'
import AuthPage from './Pages/AuthPage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/class" element={<ClassPage />} />
            </Routes>
        </Router>
    )
}

export default App
