import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'

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

const TestComponent = ({ courseId, onTestComplete, onBack }) => {
    const navigate = useNavigate()

    const questions = courseTests[courseId] || []
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)

    const handleAnswerSelect = (value) => {
        setSelectedAnswer(parseInt(value))
    }

    const handleNext = () => {
        if (selectedAnswer === null) return

        const newAnswers = [...answers]
        newAnswers[currentQuestion] = selectedAnswer
        setAnswers(newAnswers)

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setSelectedAnswer(newAnswers[currentQuestion + 1] ?? null)
        } else {
            calculateScore(newAnswers)
        }
    }

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
            setSelectedAnswer(answers[currentQuestion - 1] ?? null)
        }
    }

    const calculateScore = (allAnswers) => {
        let correct = 0
        allAnswers.forEach((answer, index) => {
            if (answer === questions[index].correctAnswer) {
                correct++
            }
        })

        const finalScore = Math.round((correct / questions.length) * 100)
        setScore(finalScore)
        setShowResults(true)
        onTestComplete(finalScore)
    }

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600'
        if (score >= 60) return 'text-yellow-600'
        return 'text-red-600'
    }

    const getScoreMessage = (score) => {
        if (score >= 80) return "Excellent work! You've mastered this course."
        if (score >= 60)
            return 'Good job! You might want to review some topics.'
        return 'Keep studying! Consider rewatching some videos.'
    }

    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="text-center p-6">
                        <h2 className="text-xl font-bold mb-4">
                            No test available
                        </h2>
                        <button onClick={onBack}>Go Back</button>
                    </div>
                </div>
            </div>
        )
    }

    if (showResults) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    <div className="text-center">
                        <div className="mx-auto mb-4">
                            <CheckCircle className="w-16 h-16 text-green-500" />
                        </div>
                        <div className="text-2xl">Test Complete!</div>
                    </div>
                    <div className="text-center space-y-6">
                        <div>
                            <p
                                className={`text-4xl font-bold ${getScoreColor(
                                    score
                                )}`}
                            >
                                {score}%
                            </p>
                            <p className="text-lg text-gray-600 mt-2">
                                {
                                    answers.filter(
                                        (answer, index) =>
                                            answer ===
                                            questions[index].correctAnswer
                                    ).length
                                }{' '}
                                out of {questions.length} correct
                            </p>
                        </div>

                        <p className="text-lg">{getScoreMessage(score)}</p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/courses')}
                                className="bg-primary hover:bg-primary/90"
                            >
                                Browse More Courses
                            </button>
                            <button variant="outline" onClick={onBack}>
                                Back to Course
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const progress = ((currentQuestion + 1) / questions.length) * 100
    const currentQ = questions[currentQuestion]

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <button
                            variant="ghost"
                            size="icon"
                            onClick={
                                currentQuestion === 0 ? onBack : handleBack
                            }
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="capitalize">{courseId} Course Test</div>
                        <div className="w-10" />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>
                                Question {currentQuestion + 1} of{' '}
                                {questions.length}
                            </span>
                            <span>{Math.round(progress)}% Complete</span>
                        </div>
                        <div value={progress} className="h-2" />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-2">
                            Based on: {currentQ.videoTitle}
                        </p>
                        <h2 className="text-xl font-semibold mb-6">
                            {currentQ.question}
                        </h2>
                    </div>

                    <div
                        value={selectedAnswer?.toString() || ''}
                        onValueChange={handleAnswerSelect}
                        className="space-y-3"
                    >
                        {currentQ.options.map((option, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                            >
                                <div
                                    value={index.toString()}
                                    id={`option-${index}`}
                                />
                                <label
                                    htmlFor={`option-${index}`}
                                    className="flex-1 cursor-pointer"
                                >
                                    <span className="font-medium mr-2">
                                        {String.fromCharCode(65 + index)}.
                                    </span>
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleNext}
                            disabled={selectedAnswer === null}
                            className="bg-primary hover:bg-primary/90"
                        >
                            {currentQuestion === questions.length - 1
                                ? 'Finish Test'
                                : 'Next Question'}
                            {currentQuestion < questions.length - 1 && (
                                <ArrowRight className="w-4 h-4 ml-2" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestComponent
