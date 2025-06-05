// import React, { useEffect, useRef, useState } from 'react'

// const VideoPlayer = ({ src }) => {
//     const videoRef = useRef(null)
//     const containerRef = useRef(null)
//     const [isPlaying, setIsPlaying] = useState(false)

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 const video = videoRef.current
//                 if (entry.isIntersecting) {
//                     video?.play()
//                     setIsPlaying(true)
//                 } else {
//                     video?.pause()
//                     setIsPlaying(false)
//                 }
//             },
//             { threshold: 0.7 }
//         )

//         if (containerRef.current) {
//             observer.observe(containerRef.current)
//         }

//         return () => {
//             if (containerRef.current) {
//                 observer.unobserve(containerRef.current)
//             }
//         }
//     }, [])

//     return (
//         <div
//             ref={containerRef}
//             className="h-screen snap-start flex items-center justify-center"
//         >
//             <video
//                 ref={videoRef}
//                 src={src.videoUrl}
//                 muted
//                 loop
//                 playsInline
//                 className="w-full h-full object-cover"
//             />
//         </div>
//     )
// }

// export default VideoPlayer
const VideoPlayer = ({ videoData, isActive }) => {
    return (
        <div
            className={`
        w-full h-screen
        flex items-center justify-center
        text-white text-3xl font-bold
        relative
        ${isActive ? 'bg-black' : 'bg-gray-800'}
        snap-start
      `}
            // Styl scroll-snap-align: start jest kluczowy dla prawidłowego działania scroll-snap
            // Mówi przeglądarce, aby przyciągała ten element do początku obszaru przewijania
        >
            {/* Tutaj w prawdziwej aplikacji byłby odtwarzacz wideo, np. <video src={videoData.url} autoPlay loop muted /> */}
            <p>{videoData.title}</p>
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">
                #{videoData.id} - {videoData.description}
            </p>
        </div>
    )
}

export default VideoPlayer
