import { Star } from 'lucide-react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const CoursesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const navigate = useNavigate()

    const [courses, setCourses] = useState([])

    const fetchCoursesData = useCallback(async () => {
        const { data, error } = await supabase.from('CourseData').select('*')

        if (error) {
            console.error('Fetch error:', error.message)
        } else {
            setCourses(data)
        }
    }, [])

    useEffect(() => {
        fetchCoursesData()
    }, [fetchCoursesData])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-40">
                <section className="hero-gradient md:py-16">
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
                            {courses?.map((course) => (
                                <div
                                    key={course?.id}
                                    className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden rounded-xl"
                                >
                                    <div
                                        className={`h-2 bg-gradient-to-r ${course?.color}`}
                                    ></div>

                                    <div className="pb-4 p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-gray-800 mb-3 justify-self-start">
                                                {course?.title}
                                            </h4>

                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                {course?.rating}
                                            </div>
                                        </div>

                                        <div className="text-gray-600 text-left leading-relaxed justify-self-start">
                                            {course?.description}
                                        </div>
                                    </div>

                                    <div className="space-y-6 p-3">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-3 justify-self-start">
                                                What you'll learn:
                                            </h4>

                                            <ul className="space-y-2 p-0 justify-self-start">
                                                {course?.features?.data.map(
                                                    (feature, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center gap-2 text-sm text-gray-600"
                                                        >
                                                            <div
                                                                className={`w-1.5 h-1.5 ${course?.colorLearn} rounded-full`}
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
                                                {course?.level}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        className={`bg-gradient-to-r ${course?.color} w-full bg-primary hover:bg-primary/90 text-white py-3 text-base font-medium`}
                                        onClick={() =>
                                            navigate(
                                                `/courses/${course?.title.toLowerCase()}`
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
