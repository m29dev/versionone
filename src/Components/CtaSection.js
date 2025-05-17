import { useNavigate } from 'react-router-dom'

const CtaSection = () => {
    const navigate = useNavigate()
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:flex ">
                        <div className="p-8 md:p-12 lg:p-16 md:w-3/5 flex flex-col items-center">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Ready to Start Your Coding Journey?
                            </h2>

                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow cursor-pointer
"
                                onClick={() => navigate('/signup')}
                            >
                                Browse Courses
                            </button>
                        </div>

                        <div className="md:w-2/5 bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center p-8 md:p-0">
                            <div className="text-white max-w-xs">
                                <h2 className="text-3xl font-bold mb-4">
                                    Contact Us
                                </h2>

                                <div className="mb-4 text-blue-100">
                                    versionone@gmail.com
                                    versiononebusiness@gmail.com
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CtaSection
