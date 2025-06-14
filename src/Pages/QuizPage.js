import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { supabase } from '../supabaseClient'

const QuizPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState([])
    const [result, setResult] = useState(null)
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([])

    const handleAnswer = (option) => {
        setAnswers([...answers, option.points])

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            calculateResult([...answers, option.points])
        }
    }

    const calculateResult = (pointsList) => {
        const total = { javascript: 0, python: 0, java: 0 }

        pointsList.forEach((points) => {
            total.javascript += points.javascript
            total.python += points.python
            total.java += points.java
        })

        const best = Object.entries(total).sort((a, b) => b[1] - a[1])[0][0]

        setResult({
            recommendation:
                best === 'javascript'
                    ? 'JavaScript'
                    : best === 'python'
                    ? 'Python'
                    : 'Java',
        })
    }

    const restartQuiz = () => {
        setCurrentQuestion(0)
        setAnswers([])
        setResult(null)
    }

    const fetchQuizData = useCallback(async () => {
        const { data, error } = await supabase.from('QuizData').select('*')

        if (error) {
            console.error('Fetch error:', error.message)
        } else {
            setQuestions(data)
        }
    }, [])

    useEffect(() => {
        fetchQuizData()
    }, [fetchQuizData])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <div className="min-h-screen flex items-center justify-center p-6">
                    <div className="rounded-xl w-full  max-w-7xl p-8">
                        {!result ? (
                            <>
                                <h2 className="text-2xl font-semibold mb-4">
                                    Question {currentQuestion + 1} of{' '}
                                    {questions?.length}
                                </h2>
                                <p className="text-lg mb-6">
                                    {questions?.[currentQuestion]?.question}
                                </p>
                                <div className="space-y-4">
                                    {questions?.[
                                        currentQuestion
                                    ]?.options?.data?.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(option)}
                                            className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-blue-100 transition"
                                        >
                                            {option.text}
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <p className="font-bold text-lg text-gray-600 text-xl md:text-2xl lg:text-2xl pt-4 text-center">
                                    Based on the quiz, our recommendation is{' '}
                                    <span className="font-bold bg-gradient-to-r from-sky-500 to-fuchsia-400 bg-clip-text text-transparent text-center">
                                        {result.recommendation}
                                    </span>{' '}
                                </p>

                                <div className="flex justify-center items-center md:flex-row md:items-center md:space-x-4 pt-4 flex-col mx-auto space-y-6 md:space-y-0">
                                    <button
                                        className="bg-transparent text-blue-500 font-semibold px-6 py-3 rounded-full border border-blue-300 hover:border-blue-500 cursor-pointer"
                                        onClick={restartQuiz}
                                    >
                                        Restart Quiz
                                    </button>

                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow cursor-pointer
"
                                        onClick={() => navigate('/courses')}
                                    >
                                        Courses
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default QuizPage
