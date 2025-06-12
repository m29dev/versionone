// import React, { useEffect, useRef, useState } from 'react'

import { ArrowDownUp, Volume, Volume2 } from 'lucide-react'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import InstructionToast from './InstructionToast'

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
const VideoPlayer = ({ videoData, isActive, isMuted }) => {
    const videoRef = useRef(null)
    const containerRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const video = videoRef?.current
                if (entry.isIntersecting) {
                    video?.play()
                    setIsPlaying(true)
                } else {
                    video?.pause()

                    if (video) {
                        video.currentTime = 0
                    }

                    setIsPlaying(false)
                }
            },
            { threshold: 0.7 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current)
            }
        }
    }, [])

    // const [isMuted, setIsMuted] = useState(true)
    // const [displayUnmute, setDisplayUnmute] = useState(false)
    // const [displayMute, setDisplayMute] = useState(false)
    // const [displayInstruction, setDisplayInstruction] = useState(true)

    // const handleVideoClick = () => {
    //     // any action hides instruction
    //     setDisplayInstruction(false)

    //     setIsMuted(!isMuted)
    //     console.log('Video isMuted set to = ', !isMuted)

    //     if (!isMuted) {
    //         setDisplayUnmute(false)
    //         setDisplayMute(true)

    //         setTimeout(() => {
    //             setDisplayMute(false)
    //         }, 1000)
    //     } else {
    //         setDisplayMute(false)
    //         setDisplayUnmute(true)

    //         setTimeout(() => {
    //             setDisplayUnmute(false)
    //         }, 1000)
    //     }
    // }

    return (
        <div
            ref={containerRef}
            // onClick={handleVideoClick}
            // onTouchStart={handleVideoClick}
            className={`
        w-full h-screen
        flex items-center justify-center
        text-white text-3xl font-bold
        relative
        ${isActive ? 'bg-black' : 'bg-gray-800'}
        snap-start
      `}
        >
            <video
                src={videoData.videoUrl}
                ref={videoRef}
                // src="https://yifcxhnhkmklkxiodfvh.supabase.co/storage/v1/object/sign/videos/Chart%20Your%20JavaScript%20Mastery%20Embark%20on%20a%20Transformative%20Roadmap%20to%20Success!.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZGI4YmYxMC0wMmI4LTQzNmQtOThiZS00N2I3ZjQwZmE5ZGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MvQ2hhcnQgWW91ciBKYXZhU2NyaXB0IE1hc3RlcnkgRW1iYXJrIG9uIGEgVHJhbnNmb3JtYXRpdmUgUm9hZG1hcCB0byBTdWNjZXNzIS5tcDQiLCJpYXQiOjE3NDk1NTc2MjUsImV4cCI6MzE3MTA5NTU3NjI1fQ.3Jvr2jIr5YKclW1hAdO0woeiXeXCodceoSf6-VLd6sM"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full"
            />

            <p className="absolute bottom-4 left-4 text-sm text-gray-400">
                #{videoData.id} - {videoData.description}
            </p>
            {/* 
            {displayUnmute && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Volume2 className="w-32 h-32" />
                </div>
            )}

            {displayMute && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Volume className="w-32 h-32" />
                </div>
            )}

            {displayInstruction && (
                // <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                //     <ArrowDownUp />

                //     <p>Swipe Up / Down</p>

                //     <p>Tap to Mute / Unmute</p>
                // </div>

                <InstructionToast />
            )} */}
        </div>
    )
}

export default VideoPlayer
