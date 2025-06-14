import { Volume, Volume2 } from 'lucide-react'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setVideo } from '../RTK/videoSlice'
import { supabase } from '../supabaseClient'
import { useParams } from 'react-router-dom'

const VideoPlayer = ({ videoData, isActive }) => {
    const videoRef = useRef(null)
    const containerRef = useRef(null)
    const { video } = useSelector((state) => state.video)

    const dispatch = useDispatch()

    useEffect(() => {
        const containerRefClone = containerRef.current
        const observer = new IntersectionObserver(
            ([entry]) => {
                const videoData = videoRef?.current
                if (entry.isIntersecting) {
                    videoData?.play()
                } else {
                    videoData?.pause()

                    if (videoData) {
                        videoData.currentTime = 0
                    }
                }
            },
            { threshold: 0.7 }
        )

        if (containerRefClone) {
            observer.observe(containerRefClone)
        }

        return () => {
            if (containerRefClone) {
                observer.unobserve(containerRefClone)
            }
        }
    }, [])

    const [displayUnmute, setDisplayUnmute] = useState(false)
    const [displayMute, setDisplayMute] = useState(false)

    const handleVideoClick = () => {
        dispatch(setVideo({ isMuted: !video?.isMuted }))

        if (!video?.isMuted) {
            setDisplayUnmute(false)
            setDisplayMute(true)

            setTimeout(() => {
                setDisplayMute(false)
            }, 1000)
        } else {
            setDisplayMute(false)
            setDisplayUnmute(true)

            setTimeout(() => {
                setDisplayUnmute(false)
            }, 1000)
        }
    }

    useEffect(() => {
        dispatch(setVideo({ isMuted: true, instructionState: true }))
    }, [dispatch])

    const { id } = useParams()
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        const currentVideo = videoRef.current

        const handleVideoEnd = () => {
            currentVideo.currentTime = 0
            currentVideo?.play()

            // UPDATE USERDATA ONCE TRIGGERED
            const update = async (fetchedData) => {
                if (
                    fetchedData?.[0]?.courses?.[id]?.completedLessons?.includes(
                        videoData?.id
                    )
                ) {
                    return
                }

                const UserDataClone = structuredClone(fetchedData?.[0])
                let dataToUpdate = UserDataClone?.courses
                const currentCompletedLessons =
                    dataToUpdate[id]?.completedLessons

                dataToUpdate[id].completedLessons = [
                    ...currentCompletedLessons,
                    videoData?.id,
                ]

                const { data, error } = await supabase
                    .from('UserData')
                    .update({ courses: dataToUpdate })
                    .eq('user_UID', user?.id)

                if (error) {
                    console.error('Update error:', error.message)
                }

                if (!data) {
                    return
                }
            }

            // FETCH CURRENT USERDATA
            const fetchUserData = async () => {
                const { data, error } = await supabase
                    .from('UserData')
                    .select('*')
                    .eq('user_UID', user?.id)

                if (error) {
                    console.error('Fetch error:', error.message)
                } else {
                    update(data)
                }
            }
            fetchUserData()
        }

        if (currentVideo) {
            currentVideo.addEventListener('ended', handleVideoEnd)
        }

        return () => {
            if (currentVideo) {
                currentVideo.removeEventListener('ended', handleVideoEnd)
            }
        }
    }, [videoData, id, user])

    return (
        <div
            ref={containerRef}
            onClick={handleVideoClick}
            className={`
        w-full h-screen
        flex items-center justify-center
        text-white text-3xl font-bold
        relative
        ${isActive ? 'bg-black' : 'bg-gray-800'}
        snap-start
      `}
        >
            {videoData?.videoUrl && (
                <video
                    src={videoData?.videoUrl}
                    ref={videoRef}
                    autoPlay
                    muted={video?.isMuted}
                    // loop
                    playsInline
                    className="w-full h-full object-cover"
                />
            )}

            {!videoData?.videoUrl && <div>Video URL error</div>}

            <p className="absolute bottom-4 left-4 text-sm text-gray-400">
                {videoData?.description}
            </p>

            {videoData?.videoUrl && displayUnmute && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/50 rounded-full md:py-5 md:px-6">
                    <Volume2 className="w-32 h-32" />
                </div>
            )}

            {videoData?.videoUrl && displayMute && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/50 rounded-full md:py-5 md:px-6">
                    <Volume className="w-32 h-32" />
                </div>
            )}

            {videoData?.videoUrl && video?.instructionState && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/50 rounded-full md:py-5 md:px-6">
                    <p>Tap to Mute / Unmute</p>
                </div>
            )}
        </div>
    )
}

export default VideoPlayer
