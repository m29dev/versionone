import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate = useNavigate()

    return (
        <section className="min-h-[90vh] flex items-center pt-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="flex items-center">
                    <div className="flex flex-col items-center space-y-6">
                        <h1 className="text-3xl md:text-6xl lg:text-9xl font-bold text-gray-800 leading-tight pt-4 text-center">
                            Become{' '}
                            <span className="font-bold bg-gradient-to-r from-sky-500 via-fuchsia-400 to-sky-500 bg-clip-text text-transparent text-center">
                                the best version
                            </span>{' '}
                            of yourself.
                        </h1>

                        {/* <h1 className="text-5xl font-bold bg-gradient-to-r from-sky-500 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent text-center">
                            Clarity. Focus. Impact.
                        </h1> */}

                        <p className="font-bold text-lg text-gray-600 max-w-lg text-xl md:text-2xl lg:text-2xl pt-4 text-center">
                            Master coding skills through short video courses,
                            knowledge tests, and a supportive community ready to
                            celebrate your milestones.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                className="bg-transparent text-blue-600 font-semibold px-6 py-3 rounded-full border flex items-center gap-2 border-blue-300 hover:border-blue-600 cursor-pointer"
                                onClick={() => navigate('/signin')}
                            >
                                Start Learning <ArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
