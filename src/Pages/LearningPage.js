import { useState, useEffect, useRef, useCallback } from 'react'
import VideoPlayer from '../Components/VideoPlayer'
import { useNavigate, useParams } from 'react-router-dom'
import NavbarLearningMode from '../Components/NavbarLearningMode'
import './LearningPage.css'
import { supabase } from '../supabaseClient'
import { useSelector } from 'react-redux'

const LearningPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { id } = useParams()
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) return navigate('/signin')
    }, [user, navigate])

    // UPDATE lastAccessed
    useEffect(() => {
        // UPDATE USERDATA ONCE TRIGGERED
        const update = async (fetchedData) => {
            const UserDataClone = structuredClone(fetchedData?.[0])
            let dataToUpdate = UserDataClone?.courses

            const today = new Date().toISOString().split('T')[0]
            dataToUpdate[id].lastAccessed = today

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
    }, [id, user])

    const translateId = {
        javascript: 1,
        python: 2,
        java: 3,
    }

    const course_id = translateId[id]
    const [videos, setVideos] = useState([])

    const fetchVideoData = useCallback(async () => {
        if (!course_id) return navigate('/404')

        const { data, error } = await supabase
            .from('VideosData')
            .select('*')
            .eq('course_data_id', course_id)

        if (error) {
            console.error('Fetch error:', error.message)
        } else {
            setVideos([...data, { id: 'test' }])
        }
    }, [course_id, setVideos, navigate])

    useEffect(() => {
        fetchVideoData()
    }, [fetchVideoData])

    // current video
    const [activeIndex, setActiveIndex] = useState(0)

    // to mute / unmute video sound
    const [isMuted, setIsMuted] = useState(true)

    const containerRef = useRef(null)

    // block scroll if scrolling already
    const isWheelScrolling = useRef(false)

    // block swpie if swiping already
    const isTouchScrolling = useRef(false)

    // swipe ref
    const isSwiping = useRef(false)

    // start vector for touch
    const touchStartX = useRef(0)
    const touchStartY = useRef(0)

    const scrollTimeout = useRef(null)

    // detect if mobile ref
    const isTouchDevice = useRef(
        typeof window !== 'undefined' &&
            ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    )

    const updateActiveIndex = useCallback(() => {
        if (containerRef.current) {
            const scrollY = containerRef.current.scrollTop
            const windowHeight = window.innerHeight

            const newIndex = Math.round(scrollY / windowHeight)
            if (newIndex !== activeIndex) {
                setActiveIndex(newIndex)
            }
        }
    }, [activeIndex])

    const handleVideoClick = useCallback(() => {
        setIsMuted((prev) => !prev)
    }, [])

    // desktop scroll
    const handleWheel = useCallback(
        (event) => {
            event.preventDefault()

            if (isWheelScrolling.current) {
                return
            }

            const direction = event.deltaY > 0 ? 1 : -1
            let newIndex = activeIndex + direction

            if (newIndex >= 0 && newIndex < videos.length) {
                setActiveIndex(newIndex)
                isWheelScrolling.current = true

                setTimeout(() => {
                    isWheelScrolling.current = false
                }, 600)
            }
        },
        [activeIndex, videos.length]
    )

    // mobile swipe
    const handleTouchStart = useCallback(
        (e) => {
            touchStartX.current = e.touches[0].clientX
            touchStartY.current = e.touches[0].clientY
            isSwiping.current = false

            if (isTouchScrolling.current || isWheelScrolling.current) {
                e.preventDefault()
            }
        },
        [isTouchScrolling, isWheelScrolling]
    )

    const handleTouchMove = useCallback(
        (e) => {
            if (isTouchScrolling.current || isWheelScrolling.current) {
                e.preventDefault()
                return
            }

            const currentX = e.touches[0].clientX
            const currentY = e.touches[0].clientY
            const deltaX = Math.abs(currentX - touchStartX.current)
            const deltaY = Math.abs(currentY - touchStartY.current)

            const movementThreshold = 10

            if (deltaY > movementThreshold || deltaX > movementThreshold) {
                isSwiping.current = true
                e.preventDefault()
            }
        },
        [isTouchScrolling, isWheelScrolling]
    )

    const handleTouchEnd = useCallback(
        (e) => {
            if (isTouchScrolling.current) return

            if (isSwiping.current) {
                const touchEndY = e.changedTouches[0].clientY
                const deltaY = touchEndY - touchStartY.current
                const swipeThreshold = 50

                if (deltaY < -swipeThreshold) {
                    if (activeIndex < videos.length - 1) {
                        setActiveIndex((prevIndex) => prevIndex + 1)
                        isTouchScrolling.current = true
                        setTimeout(() => {
                            isTouchScrolling.current = false
                        }, 600)
                    }
                } else if (deltaY > swipeThreshold) {
                    if (activeIndex > 0) {
                        setActiveIndex((prevIndex) => prevIndex - 1)
                        isTouchScrolling.current = true
                        setTimeout(() => {
                            isTouchScrolling.current = false
                        }, 600)
                    }
                }
                isSwiping.current = false
            } else {
                handleVideoClick()
            }
        },
        [
            activeIndex,
            videos.length,
            handleVideoClick,
            isTouchScrolling,
            isSwiping,
        ]
    )

    const handleScroll = useCallback(() => {
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current)
        }

        scrollTimeout.current = setTimeout(() => {
            updateActiveIndex()
        }, 150)
    }, [updateActiveIndex])

    // move container after scroll / swipe
    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.scrollTo({
                top: activeIndex * window.innerHeight,
                behavior: 'smooth',
            })
        }
    }, [activeIndex])

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.addEventListener('scroll', handleScroll, {
                passive: true,
            })

            if (isTouchDevice.current) {
                container.removeEventListener('wheel', handleWheel)

                container.addEventListener('touchstart', handleTouchStart, {
                    passive: false,
                })
                container.addEventListener('touchmove', handleTouchMove, {
                    passive: false,
                })
                container.addEventListener('touchend', handleTouchEnd, {
                    passive: false,
                })
            } else {
                container.addEventListener('wheel', handleWheel, {
                    passive: false,
                })
            }

            // clear listeners on unmount
            return () => {
                container.removeEventListener('scroll', handleScroll)
                container.removeEventListener('wheel', handleWheel)
                container.removeEventListener('touchstart', handleTouchStart)
                container.removeEventListener('touchmove', handleTouchMove)
                container.removeEventListener('touchend', handleTouchEnd)
            }
        }
    }, [
        handleWheel,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleScroll,
    ])

    return (
        <div
            ref={containerRef}
            className="
        w-screen h-screen
        overflow-y-scroll
        snap-y snap-mandatory
        hide-scrollbar
        font-inter
      "
        >
            <NavbarLearningMode title={id} />
            <main
                className={`flex-grow overflow-hidden mx-auto max-w-3xl bg-gradient-to-r ${
                    id === 'javascript'
                        ? 'from-yellow-300 to-yellow-400'
                        : id === 'python'
                        ? 'from-green-300 to-green-400'
                        : 'from-orange-300 to-orange-400'
                }`}
            >
                {videos &&
                    videos.map((video, index) => (
                        <VideoPlayer
                            key={video.id}
                            videoData={video}
                            isActive={index === activeIndex}
                            isMuted={isMuted}
                        />
                    ))}
            </main>
        </div>
    )
}

export default LearningPage
