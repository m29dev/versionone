import React, { useEffect, useRef, useState } from 'react'

const VideoPlayer = ({ src }) => {
    const videoRef = useRef(null)
    const containerRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const video = videoRef.current
                if (entry.isIntersecting) {
                    video?.play()
                    setIsPlaying(true)
                } else {
                    video?.pause()
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

    return (
        <div
            ref={containerRef}
            className="h-screen snap-start flex items-center justify-center"
        >
            <video
                ref={videoRef}
                src={src.videoUrl}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
            />
        </div>
    )
}

export default VideoPlayer
