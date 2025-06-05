// import React, { useEffect, useRef, useState } from 'react'
// import Navbar from '../Components/Navbar'
// import Footer from '../Components/Footer'
// import VideoPlayer from '../Components/VideoPlayer'
// import { useParams } from 'react-router-dom'

// // const videos = [
// //     'https://www.w3schools.com/html/movie.mp4',
// //     'https://www.w3schools.com/html/movie.mp4',
// //     'https://www.w3schools.com/html/movie.mp4',
// //     'https://www.w3schools.com/html/movie.mp4',
// // ]

// const videosLearning = {
//     javascript: [
//         {
//             id: 1,
//             title: 'Variables and Data Types',
//             description:
//                 'Learn about JavaScript variables, strings, numbers, and booleans in just 2 minutes!',
//             duration: '2:15',
//             thumbnail: '/placeholder.svg',
//             videoUrl: 'https://www.w3schools.com/html/movie.mp4',
//         },
//         {
//             id: 2,
//             title: 'Functions Basics',
//             description:
//                 'Understanding how to create and use functions in JavaScript.',
//             duration: '1:45',
//             thumbnail: '/placeholder.svg',
//             videoUrl: 'https://www.w3schools.com/html/movie.mp4',
//         },
//         {
//             id: 3,
//             title: 'Arrays and Objects',
//             description:
//                 'Quick guide to working with arrays and objects in JavaScript.',
//             duration: '2:30',
//             thumbnail: '/placeholder.svg',
//             videoUrl: 'https://www.w3schools.com/html/movie.mp4',
//         },
//         {
//             id: 4,
//             title: 'Loops and Conditionals',
//             description: 'Master if statements, for loops, and while loops.',
//             duration: '2:00',
//             thumbnail: '/placeholder.svg',
//             videoUrl: 'https://www.w3schools.com/html/movie.mp4',
//         },
//         {
//             id: 5,
//             title: 'DOM Manipulation',
//             description:
//                 'Learn how to interact with HTML elements using JavaScript.',
//             duration: '2:45',
//             thumbnail: '/placeholder.svg',
//             videoUrl: 'https://www.w3schools.com/html/movie.mp4',
//         },
//     ],
//     python: [
//         {
//             id: 1,
//             title: 'Python Syntax Basics',
//             description: 'Get started with Python syntax and basic concepts.',
//             duration: '2:20',
//             thumbnail: '/placeholder.svg',
//             videoUrl: 'https://www.w3schools.com/html/movie.mp4',
//         },
//         {
//             id: 2,
//             title: 'Lists and Dictionaries',
//             description:
//                 "Working with Python's most important data structures.",
//             duration: '1:55',
//             thumbnail: '/placeholder.svg',
//             videoUrl: 'https://www.w3schools.com/html/movie.mp4',
//         },
//         {
//             id: 3,
//             title: 'Functions in Python',
//             description: 'Creating reusable code with Python functions.',
//             duration: '2:10',
//             thumbnail: '/placeholder.svg',
//             videoUrl: 'https://www.w3schools.com/html/movie.mp4',
//         },
//         {
//             id: 4,
//             title: 'File Handling',
//             description: 'Read and write files in Python easily.',
//             duration: '2:35',
//             thumbnail: '/placeholder.svg',
//             videoUrl: 'https://www.w3schools.com/html/movie.mp4',
//         },
//     ],
//     java: [
//         {
//             id: 1,
//             title: 'Java Class Structure',
//             description: 'Understanding classes, objects, and methods in Java.',
//             duration: '2:40',
//             thumbnail: '/placeholder.svg',
//             videoUrl: 'https://www.w3schools.com/html/movie.mp4',
//         },
//         {
//             id: 2,
//             title: 'Variables and Types',
//             description: 'Java data types and variable declarations.',
//             duration: '1:50',
//             thumbnail: '/placeholder.svg',
//             videoUrl: 'https://www.w3schools.com/html/movie.mp4',
//         },
//         {
//             id: 3,
//             title: 'Inheritance Basics',
//             description: 'Learn object-oriented programming with inheritance.',
//             duration: '2:25',
//             thumbnail: '/placeholder.svg',
//             videoUrl: 'https://www.w3schools.com/html/movie.mp4',
//         },
//     ],
// }

// const LearningPage = () => {
//     const containerRef = useRef(null)
//     const sectionRefs = useRef([])
//     const currentIndex = useRef(0)
//     const [activeIndex, setActiveIndex] = useState(0)
//     const { id } = useParams()
//     // const [videos, setVideos] = useState(videosLearning[id])
//     const videos = videosLearning[id]

//     useEffect(() => {
//         const container = containerRef.current
//         if (!container) return

//         // Scroll to top on page load
//         container.scrollTo({ top: 0, behavior: 'auto' })

//         let isScrolling = false

//         const scrollToIndex = (index) => {
//             const clampedIndex = Math.min(Math.max(index, 0), videos.length - 1)
//             const target = sectionRefs.current[clampedIndex]
//             if (target) {
//                 isScrolling = true
//                 target.scrollIntoView({ behavior: 'smooth' })
//                 currentIndex.current = clampedIndex
//                 setActiveIndex(clampedIndex)
//                 setTimeout(() => {
//                     isScrolling = false
//                 }, 800)
//             }
//         }

//         const handleWheel = (e) => {
//             if (isScrolling) return
//             e.preventDefault()
//             const direction = e.deltaY > 0 ? 1 : -1
//             scrollToIndex(currentIndex.current + direction)
//         }

//         let touchStartY = null
//         let touchEndY = null

//         const handleTouchStart = (e) => {
//             if (e.touches.length === 1) {
//                 touchStartY = e.touches[0].clientY
//             }
//         }

//         const handleTouchMove = (e) => {
//             if (e.touches.length === 1) {
//                 touchEndY = e.touches[0].clientY
//             }
//         }

//         const handleTouchEnd = () => {
//             if (touchStartY !== null && touchEndY !== null && !isScrolling) {
//                 const diffY = touchStartY - touchEndY
//                 if (Math.abs(diffY) > 50) {
//                     const direction = diffY > 0 ? 1 : -1
//                     scrollToIndex(currentIndex.current + direction)
//                 }
//             }
//             touchStartY = null
//             touchEndY = null
//         }

//         container.addEventListener('wheel', handleWheel, { passive: false })
//         container.addEventListener('touchstart', handleTouchStart, {
//             passive: true,
//         })
//         container.addEventListener('touchmove', handleTouchMove, {
//             passive: true,
//         })
//         container.addEventListener('touchend', handleTouchEnd)

//         return () => {
//             container.removeEventListener('wheel', handleWheel)
//             container.removeEventListener('touchstart', handleTouchStart)
//             container.removeEventListener('touchmove', handleTouchMove)
//             container.removeEventListener('touchend', handleTouchEnd)
//         }
//     }, [])

//     return (
//         <div className="min-h-screen flex flex-col relative" ref={containerRef}>
//             <Navbar />
//             <main className="flex-grow overflow-hidden mx-auto max-w-7xl p-[0rem] md:p-[2rem] lg:p-[2rem]">
//                 <div className="h-full overflow-hidden touch-none relative">
//                     {videos?.map((item) => (
//                         <div
//                             key={item.id}
//                             ref={(el) => (sectionRefs.current[item.id] = el)}
//                             className="h-screen snap-start"
//                         >
//                             <VideoPlayer src={item} />
//                         </div>
//                     ))}
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     )
// }

// export default LearningPage
import React, { useState, useEffect, useRef, useCallback } from 'react'
import VideoPlayer from '../Components/VideoPlayer'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom'
import NavbarLearningMode from '../Components/NavbarLearningMode'

const LearningPage = () => {
    const videosLearning = {
        javascript: [
            {
                id: 1,
                title: 'Variables and Data Types',
                description:
                    'Learn about JavaScript variables, strings, numbers, and booleans in just 2 minutes!',
                duration: '2:15',
                thumbnail: '/placeholder.svg',
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
            },
            {
                id: 2,
                title: 'Functions Basics',
                description:
                    'Understanding how to create and use functions in JavaScript.',
                duration: '1:45',
                thumbnail: '/placeholder.svg',
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
            },
            {
                id: 3,
                title: 'Arrays and Objects',
                description:
                    'Quick guide to working with arrays and objects in JavaScript.',
                duration: '2:30',
                thumbnail: '/placeholder.svg',
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
            },
            {
                id: 4,
                title: 'Loops and Conditionals',
                description:
                    'Master if statements, for loops, and while loops.',
                duration: '2:00',
                thumbnail: '/placeholder.svg',
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
            },
            {
                id: 5,
                title: 'DOM Manipulation',
                description:
                    'Learn how to interact with HTML elements using JavaScript.',
                duration: '2:45',
                thumbnail: '/placeholder.svg',
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
            },
        ],
        python: [
            {
                id: 1,
                title: 'Python Syntax Basics',
                description:
                    'Get started with Python syntax and basic concepts.',
                duration: '2:20',
                thumbnail: '/placeholder.svg',
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
            },
            {
                id: 2,
                title: 'Lists and Dictionaries',
                description:
                    "Working with Python's most important data structures.",
                duration: '1:55',
                thumbnail: '/placeholder.svg',
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
            },
            {
                id: 3,
                title: 'Functions in Python',
                description: 'Creating reusable code with Python functions.',
                duration: '2:10',
                thumbnail: '/placeholder.svg',
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
            },
            {
                id: 4,
                title: 'File Handling',
                description: 'Read and write files in Python easily.',
                duration: '2:35',
                thumbnail: '/placeholder.svg',
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
            },
        ],
        java: [
            {
                id: 1,
                title: 'Java Class Structure',
                description:
                    'Understanding classes, objects, and methods in Java.',
                duration: '2:40',
                thumbnail: '/placeholder.svg',
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
            },
            {
                id: 2,
                title: 'Variables and Types',
                description: 'Java data types and variable declarations.',
                duration: '1:50',
                thumbnail: '/placeholder.svg',
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
            },
            {
                id: 3,
                title: 'Inheritance Basics',
                description:
                    'Learn object-oriented programming with inheritance.',
                duration: '2:25',
                thumbnail: '/placeholder.svg',
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
            },
        ],
    }

    // Przykładowe dane filmików
    const videos11 = [
        {
            id: 1,
            title: 'Urocze Kotki',
            description: 'Kompilacja uroczych kotków!',
        },
        {
            id: 2,
            title: 'Niesamowite Krajobrazy',
            description: 'Zapierające dech w piersiach widoki z całego świata.',
        },
        {
            id: 3,
            title: 'Kuchenne Triki',
            description: 'Proste sztuczki dla Twojej kuchni.',
        },
        {
            id: 4,
            title: 'Motywacja Fitness',
            description: 'Wstań i ruszaj się!',
        },
        {
            id: 5,
            title: 'Vlog Podróżniczy: Japonia',
            description: 'Odkrywanie piękna Tokio.',
        },
    ]

    const { id } = useParams()
    const videos = videosLearning[id]

    // Stan przechowujący indeks aktualnie aktywnego (widocznego) filmiku
    const [activeIndex, setActiveIndex] = useState(0)
    // Ref do elementu DOM, który będzie naszym przewijanym kontenerem
    const containerRef = useRef(null)
    // Ref do blokowania przewijania kółkiem myszy, gdy animacja trwa, aby uniknąć "skakania"
    const isWheelScrolling = useRef(false)

    // Ref do śledzenia timeoutu dla zdarzenia 'scroll'
    const scrollTimeout = useRef(null)

    // Funkcja pomocnicza do aktualizacji activeIndex na podstawie pozycji scrolla
    // Wywoływana po zakończeniu natywnego przewijania (swipe)
    const updateActiveIndex = useCallback(() => {
        if (containerRef.current) {
            const scrollY = containerRef.current.scrollTop
            const windowHeight = window.innerHeight
            // Obliczanie najbliższego indeksu na podstawie pozycji scrolla
            const newIndex = Math.round(scrollY / windowHeight)
            if (newIndex !== activeIndex) {
                setActiveIndex(newIndex)
            }
        }
    }, [activeIndex])

    // Obsługa zdarzenia przewijania kółkiem myszy
    const handleWheel = useCallback(
        (event) => {
            // Jeśli animacja przewijania kółkiem myszy trwa, ignoruj kolejne zdarzenia
            if (isWheelScrolling.current) {
                event.preventDefault() // Zapobiegaj domyślnemu przewijaniu przeglądarki
                return
            }

            const direction = event.deltaY > 0 ? 1 : -1 // 1 dla w dół (deltaY > 0), -1 dla w górę (deltaY < 0)
            let newIndex = activeIndex + direction

            // Sprawdź, czy nowy indeks jest w granicach dostępnych filmików
            if (newIndex >= 0 && newIndex < videos.length) {
                setActiveIndex(newIndex) // Ustaw nowy aktywny indeks
                isWheelScrolling.current = true // Zablokuj przewijanie kółkiem myszy

                // Odblokuj przewijanie po zakończeniu animacji (około 600ms dla 'smooth' behavior)
                setTimeout(() => {
                    isWheelScrolling.current = false
                }, 600)
            }
            event.preventDefault() // Zawsze zapobiegaj domyślnemu przewijaniu przeglądarki przy kółku myszy
        },
        [activeIndex, videos.length]
    ) // Zależności dla useCallback

    // Obsługa zdarzenia 'scroll' (reaguje na natywne przewijanie, w tym swipe)
    const handleScroll = useCallback(() => {
        // Wyczyść poprzedni timeout, jeśli istnieje
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current)
        }

        // Ustaw timeout, który wywoła updateActiveIndex po krótkiej przerwie (gdy przewijanie się zatrzyma)
        scrollTimeout.current = setTimeout(() => {
            updateActiveIndex()
        }, 150) // Krótka zwłoka, aby upewnić się, że scroll-snap zakończył działanie
    }, [updateActiveIndex])

    // Efekt do przewijania kontenera, gdy zmieni się activeIndex
    // Ten efekt jest wywoływany zarówno przez handleWheel (desktop), jak i przez updateActiveIndex (mobile/swipe)
    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.scrollTo({
                top: activeIndex * window.innerHeight, // Przewiń do pozycji aktywnego filmiku
                behavior: 'smooth', // Klucz do płynnej animacji przewijania
            })
        }
    }, [activeIndex]) // Ten efekt uruchamia się, gdy activeIndex się zmieni

    // Efekt do dodawania i usuwania event listenerów
    useEffect(() => {
        const container = containerRef.current
        if (container) {
            // Dodaj listener dla kółka myszy
            container.addEventListener('wheel', handleWheel, { passive: false }) // passive: false pozwala na event.preventDefault()

            // Dodaj listener dla zdarzenia 'scroll' (dla swipe'ów i natywnego scrolla)
            container.addEventListener('scroll', handleScroll, {
                passive: true,
            }) // passive: true dla lepszej wydajności scrolla

            // Funkcja czyszcząca: usuń listenery, gdy komponent zostanie odmontowany
            return () => {
                container.removeEventListener('wheel', handleWheel)
                container.removeEventListener('scroll', handleScroll)
            }
        }
    }, [handleWheel, handleScroll]) // Zależności: referencje do funkcji obsługujących zdarzenia

    return (
        <div
            ref={containerRef} // Przypisz ref do kontenera
            className="
        w-screen h-screen
        overflow-y-scroll
        snap-y snap-mandatory
        hide-scrollbar
        font-inter
      "
        >
            <NavbarLearningMode />
            <main className="flex-grow overflow-hidden mx-auto max-w-7xl p-[0rem] md:p-[2rem] lg:p-[2rem]">
                {videos.map((video, index) => (
                    <VideoPlayer
                        key={video.id}
                        videoData={video}
                        isActive={index === activeIndex} // Przekaż informację, czy filmik jest aktywny
                    />
                ))}
                {/* Mały wskaźnik aktualnego filmiku (do debugowania) */}
                <div className="absolute top-4 right-4 bg-white text-black p-2 rounded-md z-10">
                    Aktualny filmik: {activeIndex + 1}/{videos.length}
                </div>
            </main>
        </div>
    )
}

export default LearningPage
