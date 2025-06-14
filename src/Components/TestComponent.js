import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { supabase } from '../supabaseClient'
import { useSelector } from 'react-redux'

const courseTests = {
    javascript: [
        {
            id: 1,
            question:
                'Which of the following is NOT a primitive data type in JavaScript?',
            options: ['string', 'number', 'array', 'boolean'],
            correctAnswer: 2,
            videoTitle: 'Variables and Data Types',
        },
        {
            id: 2,
            question:
                'What is the correct way to declare a function in JavaScript?',
            options: [
                'function myFunc() {}',
                'def myFunc():',
                'func myFunc() {}',
                'function: myFunc() {}',
            ],
            correctAnswer: 0,
            videoTitle: 'Functions Basics',
        },
        {
            id: 3,
            question:
                "How do you access the first element of an array named 'arr'?",
            options: ['arr(0)', 'arr[1]', 'arr[0]', 'arr.first()'],
            correctAnswer: 2,
            videoTitle: 'Arrays and Objects',
        },
        {
            id: 4,
            question: 'Which loop is best for iterating over an array?',
            options: [
                'while loop',
                'do-while loop',
                'for loop',
                'all are equally good',
            ],
            correctAnswer: 2,
            videoTitle: 'Loops and Conditionals',
        },
        {
            id: 5,
            question:
                'Which method is used to select an element by its ID in the DOM?',
            options: [
                'document.querySelector()',
                'document.getElementById()',
                'document.getElement()',
                'document.findById()',
            ],
            correctAnswer: 1,
            videoTitle: 'DOM Manipulation',
        },
    ],
    python: [
        {
            id: 1,
            question: 'Which symbol is used to start a comment in Python?',
            options: ['//', '/*', '#', '--'],
            correctAnswer: 2,
            videoTitle: 'Python Syntax Basics',
        },
        {
            id: 2,
            question: 'How do you add an item to the end of a list in Python?',
            options: [
                'list.add()',
                'list.append()',
                'list.insert()',
                'list.push()',
            ],
            correctAnswer: 1,
            videoTitle: 'Lists and Dictionaries',
        },
        {
            id: 3,
            question: 'What keyword is used to define a function in Python?',
            options: ['function', 'def', 'func', 'define'],
            correctAnswer: 1,
            videoTitle: 'Functions in Python',
        },
        {
            id: 4,
            question: 'Which mode opens a file for reading in Python?',
            options: ["'w'", "'r'", "'a'", "'x'"],
            correctAnswer: 1,
            videoTitle: 'File Handling',
        },
    ],
    java: [
        {
            id: 1,
            question: 'What is the correct way to declare a class in Java?',
            options: [
                'class MyClass {}',
                'Class MyClass {}',
                'public class MyClass {}',
                'new class MyClass {}',
            ],
            correctAnswer: 2,
            videoTitle: 'Java Class Structure',
        },
        {
            id: 2,
            question: 'Which of these is NOT a primitive data type in Java?',
            options: ['int', 'String', 'boolean', 'double'],
            correctAnswer: 1,
            videoTitle: 'Variables and Types',
        },
        {
            id: 3,
            question:
                'What keyword is used to inherit from a parent class in Java?',
            options: ['inherits', 'extends', 'implements', 'super'],
            correctAnswer: 1,
            videoTitle: 'Inheritance Basics',
        },
    ],
}

const TestComponent = ({ courseId }) => {
    const questions = courseTests[courseId] || []
    const navigate = useNavigate()

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)

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
            <div className="p-6 text-center pt-64 space-y-6">
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
                            To receive certificate, you need to get 75% or more
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
        <div className="pt-64 max-w-xl mx-auto">
            <div className="mb-4 flex justify-between items-center">
                <span>
                    Question {currentQuestion + 1} / {questions.length}
                </span>
                <div />
            </div>
            <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>
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
    )
}

export default TestComponent
