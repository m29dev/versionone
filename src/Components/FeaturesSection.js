import { BookOpen, Code, Users } from 'lucide-react'

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
            icon: <Users className="h-10 w-10 text-primary" />,
            title: 'Community Support',
            description:
                'Join a thriving community of learners and mentors who will support you throughout your coding journey and celebrate your milestones.',
        },
    ]

    return (
        <section id="courses" className="feature-gradient py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Everything You Need to Succeed
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our platform combines engaging content, practical
                        challenges, and a supportive community.
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
            </div>
        </section>
    )
}

export default FeaturesSection
