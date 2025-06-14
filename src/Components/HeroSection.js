import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate = useNavigate()

    return (
        <section className="md:min-h-[100vh] flex items-center pt-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="flex items-center">
                    <div className="flex flex-col items-center space-y-6">
                        <h1 className="hidden md:block text-6xl md:text-6xl lg:text-9xl font-bold text-gray-800 leading-tight pt-4 text-center">
                            Become{' '}
                            <span className="font-bold bg-gradient-to-r from-sky-500 via-fuchsia-400 to-sky-500 bg-clip-text text-transparent text-center">
                                the best version
                            </span>{' '}
                            of yourself.
                        </h1>

                        <div className="block md:hidden flex-col ">
                            <h1 className="block md:hidden text-5xl md:text-6xl lg:text-9xl font-bold text-gray-800 leading-tight pt-4 text-center">
                                Become{' '}
                            </h1>
                            <h1 className="block md:hidden text-5xl md:text-6xl lg:text-9xl font-bold text-gray-800 leading-tight pt-4 text-center">
                                <span className="font-bold bg-gradient-to-r from-sky-500 via-fuchsia-400 to-sky-500 bg-clip-text text-transparent text-center">
                                    the best version
                                </span>
                            </h1>
                            <h1 className="block md:hidden text-5xl md:text-6xl lg:text-9xl font-bold text-gray-800 leading-tight pt-4 text-center">
                                of yourself.
                            </h1>
                        </div>

                        <p className="font-bold text-gray-600 max-w-lg text-[16px] md:text-2xl lg:text-2xl pt-4 text-center">
                            Master coding skills through short video courses,
                            knowledge tests, and a supportive community ready to
                            celebrate your milestones.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                className="bg-transparent text-blue-600 font-semibold px-6 py-3 rounded-full border flex items-center gap-2 border-blue-300 hover:border-blue-600 cursor-pointer"
                                onClick={() => navigate('/courses')}
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
