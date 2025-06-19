import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { supabase } from '../supabaseClient'
import { useSelector } from 'react-redux'

const TestComponent = ({ courseId }) => {
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)
    const { id } = useParams()

    useEffect(() => {
        const translateId = {
            javascript: 'JavascriptTest',
            python: 'PythonTest',
            java: 'JavaTest',
        }

        const fetchTestData = async () => {
            const { data, error } = await supabase
                .from(translateId[id])
                .select('*')

            if (error) {
                console.error('Fetch error:', error.message)
            } else {
                setQuestions(data)
            }
        }

        fetchTestData()
    }, [id])

    const handleAnswerClick = (selected) => {
        const newAnswers = [...answers]
        newAnswers[currentQuestion] = selected
        setAnswers(newAnswers)

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            calculateScore(newAnswers)
        }
    }

    const { user } = useSelector((state) => state.user)
    const calculateScore = (allAnswers) => {
        const correct = allAnswers.filter(
            (ans, idx) => ans === questions[idx].correctAnswer
        ).length
        const finalScore = Math.round((correct / questions.length) * 100)
        setScore(finalScore)
        setShowResults(true)

        if (finalScore < 75) return

        // save results to UserData
        // UPDATE USERDATA ONCE TRIGGERED
        const update = async (fetchedData) => {
            const userDataClone = structuredClone(fetchedData?.[0])
            const userCoursesUpdate = userDataClone?.courses
            userCoursesUpdate[courseId].certificationTest = finalScore

            const { data, error } = await supabase
                .from('UserData')
                .update({ courses: userCoursesUpdate })
                .eq('user_UID', user?.id)

            if (error) {
                console.error('Update error:', error.message)
            }

            if (!data) {
                return
            }
        }

        // FETCH CURRENT USERDATA
        const fetchUserData = async () => {
            const { data, error } = await supabase
                .from('UserData')
                .select('*')
                .eq('user_UID', user?.id)

            if (error) {
                console.error('Fetch error:', error.message)
            } else {
                update(data)
            }
        }
        fetchUserData()
    }

    const handleResetTest = () => {
        setCurrentQuestion(0)
        setAnswers([])
        setShowResults(false)
        setScore(0)
    }

    if (questions.length === 0) return <div>No test available</div>

    if (showResults) {
        return (
            <div className="p-6 text-center space-y-6">
                {score >= 75 && (
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                )}

                <h2 className="text-2xl font-semibold mb-2">Test Complete!</h2>
                <p className="text-4xl font-bold">{score}%</p>
                <p className="text-gray-600">
                    {
                        answers.filter(
                            (a, i) => a === questions[i].correctAnswer
                        ).length
                    }{' '}
                    of {questions.length} correct
                </p>

                {score < 75 && (
                    <div className="space-y-6">
                        {' '}
                        <p>
                            To receive certificate, you need to get at least 70%
                        </p>
                        <button
                            className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full border border-blue-300 hover:border-blue-500 cursor-pointer"
                            onClick={handleResetTest}
                        >
                            Try again
                        </button>
                    </div>
                )}

                {score >= 75 && (
                    <div>
                        {' '}
                        <p>You've received certificate!</p>
                        <button
                            className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full border border-blue-300 hover:border-blue-500 cursor-pointer"
                            onClick={() => {
                                navigate('/courses')
                            }}
                        >
                            Courses
                        </button>
                    </div>
                )}
            </div>
        )
    }

    const currentQ = questions[currentQuestion]
    return (
        <div className="pt-[88px] max-w-2xl w-full">
            <div className="m-4">
                <div className="mb-4 flex justify-between items-center">
                    <span>
                        Question {currentQuestion + 1} / {questions.length}
                    </span>
                    <div />
                </div>
                <h2 className="text-xl font-semibold mb-6">
                    {currentQ.question}
                </h2>
                <div className="space-y-4">
                    {currentQ.options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleAnswerClick(index)}
                            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
                        >
                            <span className="font-medium mr-2">
                                {String.fromCharCode(65 + index)}.
                            </span>
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TestComponent
