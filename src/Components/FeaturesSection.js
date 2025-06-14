import { BookOpen, Code, Trophy } from 'lucide-react'
import CtaSection from './CtaSection'

const FeaturesSection = () => {
    const features = [
        {
            icon: <BookOpen className="h-10 w-10 text-primary" />,
            title: 'Video Courses',
            description:
                'Learn at your own pace with our comprehensive library of video courses, covering everything from basic to advanced topics.',
        },
        {
            icon: <Code className="h-10 w-10 text-primary" />,
            title: 'Coding Tests',
            description:
                'Reinforce your knowledge with interactive coding challenges and tests designed to help you master key programming concepts.',
        },
        {
            icon: <Trophy className="w-10 h-10 text-primary" />,
            title: 'Statistics',
            description:
                'Be on track with your coding journey, check your progress, certifications, awards and more.',
        },
    ]

    return (
        <section className="md:min-h-[100vh] flex justify-center items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Everything You Need to Succeed
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our platform combines engaging content, practical
                        challenges, and statistics.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="pb-2">
                                <div className="mb-4 flex justify-center">
                                    {feature.icon}
                                </div>
                                <div className="text-xl font-bold text-center">
                                    {feature.title}
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-600 text-center">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <CtaSection />
            </div>
        </section>
    )
}

export default FeaturesSection
