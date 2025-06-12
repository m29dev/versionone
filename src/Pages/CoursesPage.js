import { Star } from 'lucide-react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const courses = [
    {
        id: 1,
        title: 'JavaScript',
        description:
            'Learn the fundamentals of web development with JavaScript. From basics to advanced concepts including ES6+, DOM manipulation, and modern frameworks.',
        duration: '8 weeks',
        students: '12,450',
        rating: '4.9',
        level: 'Beginner to Advanced',
        color: 'from-yellow-300 to-yellow-400',
        colorLearn: 'bg-yellow-300',
        features: [
            'Interactive coding exercises',
            'Real-world projects',
            'ES6+ features',
            'Async programming',
        ],
    },
    {
        id: 2,
        title: 'Python',
        description:
            'Master Python programming from scratch. Cover data structures, algorithms, automation scripts, web development with Django/Flask, and data science basics.',
        duration: '10 weeks',
        students: '18,320',
        rating: '4.8',
        level: 'Beginner to Advanced',
        color: 'from-green-300 to-green-400',
        colorLearn: 'bg-green-300',
        features: [
            'Data structures & algorithms',
            'Web development',
            'Data science basics',
            'Automation scripts',
        ],
    },
    {
        id: 3,
        title: 'Java',
        description:
            'Comprehensive Java course covering OOP principles, Spring framework, database integration, and enterprise application development.',
        duration: '12 weeks',
        students: '9,870',
        rating: '4.7',
        level: 'Beginner to Advanced',
        color: 'from-orange-300 to-orange-400',
        colorLearn: 'bg-orange-300',
        features: [
            'Object-oriented programming',
            'Spring framework',
            'Database integration',
            'Enterprise apps',
        ],
    },
]

const CoursesPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-40">
                <section className="hero-gradient py-16">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            Choose Your Coding Journey
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Start your programming career with our comprehensive
                            courses. Learn at your own pace with hands-on
                            projects and community support.
                        </p>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden rounded-xl"
                                >
                                    <div
                                        className={`h-2 bg-gradient-to-r ${course.color}`}
                                    ></div>

                                    <div className="pb-4 p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            {/* <BookOpen className="h-8 w-8 text-primary" /> */}

                                            <h4 className="font-semibold text-gray-800 mb-3 justify-self-start">
                                                {course.title}
                                            </h4>

                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                {course.rating}
                                            </div>
                                        </div>

                                        <div className="text-gray-600 text-left leading-relaxed justify-self-start">
                                            {course.description}
                                        </div>
                                    </div>

                                    <div className="space-y-6 p-3">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-3 justify-self-start">
                                                What you'll learn:
                                            </h4>

                                            <ul className="space-y-2 p-0 justify-self-start">
                                                {course.features.map(
                                                    (feature, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center gap-2 text-sm text-gray-600"
                                                        >
                                                            <div
                                                                className={`w-1.5 h-1.5 ${course.colorLearn} rounded-full`}
                                                            ></div>
                                                            {feature}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>

                                        <div className="justify-self-start">
                                            <div
                                                className={`text-gray-600 text-left leading-relaxed justify-self-start`}
                                            >
                                                {course.level}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        // className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-base font-medium"
                                        className={`bg-gradient-to-r ${course.color} w-full bg-primary hover:bg-primary/90 text-white py-3 text-base font-medium`}
                                        onClick={() =>
                                            navigate(
                                                `/courses/${course.title.toLowerCase()}`
                                            )
                                        }
                                    >
                                        Start Learning
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Can't decide which course to start with?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Take our quick quiz to find the perfect programming
                            language for your goals and interests.
                        </p>

                        <button
                            className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full border border-blue-300 hover:border-blue-500 cursor-pointer"
                            onClick={() => {
                                navigate('/quiz')
                            }}
                        >
                            Take the Quiz
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default CoursesPage
