// const CommunitySection = () => {
//     const milestones = [
//         {
//             user: 'Sarah M.',
//             initials: 'SM',
//             achievement: 'Completed the JavaScript course.',
//             time: '2 days ago',
//             likes: 124,
//         },
//         {
//             user: 'Tomasz L.',
//             initials: 'TL',
//             achievement:
//                 'Reached new milestone - 30% of the Cyber Security course.',
//             time: '3 days ago',
//             likes: 67,
//         },
//         {
//             user: 'Lee K.',
//             initials: 'LK',
//             achievement:
//                 'Reached new milestone - 30% of the Cyber Security course.',
//             time: '1 week ago',
//             likes: 101,
//         },
//     ]

//     return (
//         <section id="community" className="bg-transparent py-20">
//             <div className="max-w-7xl mx-auto px-4 md:px-6">
//                 <div className="text-center mb-16">
//                     <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//                         Our Thriving Community
//                     </h2>
//                     <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                         celebrate milestones, and connect with fellow learners
//                         from around the world.
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     {milestones.map((milestone, index) => (
//                         <div
//                             key={index}
//                             className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
//                         >
//                             <div className="pt-6">
//                                 <div className="flex">
//                                     <div className="h-10 p-1 rounded-full w-10 border-2 border-primary/20">
//                                         <div className="bg-primary/10 text-primary">
//                                             {milestone.initials}
//                                         </div>
//                                     </div>

//                                     <div className="flex-1">
//                                         <div className="flex justify-between">
//                                             <h4 className="font-semibold text-gray-800">
//                                                 {milestone.user}
//                                             </h4>
//                                             <span className="text-gray-400 text-sm">
//                                                 {milestone.time}
//                                             </span>
//                                         </div>

//                                         <p className="mt-2 text-gray-600">
//                                             {milestone.achievement}
//                                         </p>
//                                         <div className="mt-4 flex items-center">
//                                             <button className="flex items-center text-sm text-gray-500 hover:text-primary">
//                                                 <svg
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     className="h-5 w-5 mr-1"
//                                                     fill="none"
//                                                     viewBox="0 0 24 24"
//                                                     stroke="currentColor"
//                                                 >
//                                                     <path
//                                                         strokeLinecap="round"
//                                                         strokeLinejoin="round"
//                                                         strokeWidth={2}
//                                                         d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
//                                                     />
//                                                 </svg>
//                                                 {milestone.likes}
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="mt-12 text-center">
//                     <a href="#1" className="blue-button">
//                         Join the Community
//                     </a>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default CommunitySection
