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
import { useParams } from 'react-router-dom'
import NavbarLearningMode from '../Components/NavbarLearningMode'
import './LearningPage.css'

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

    const { id } = useParams()
    const videos = videosLearning[id]
    // const [activeIndex, setActiveIndex] = useState(0)
    // const containerRef = useRef(null)
    // const isWheelScrolling = useRef(false)
    // const scrollTimeout = useRef(null)

    // const updateActiveIndex = useCallback(() => {
    //     if (containerRef.current) {
    //         const scrollY = containerRef.current.scrollTop
    //         const windowHeight = window.innerHeight

    //         const newIndex = Math.round(scrollY / windowHeight)
    //         if (newIndex !== activeIndex) {
    //             setActiveIndex(newIndex)
    //         }
    //     }
    // }, [activeIndex])

    // const handleWheel = useCallback(
    //     (event) => {
    //         if (isWheelScrolling.current) {
    //             event.preventDefault()
    //             return
    //         }

    //         const direction = event.deltaY > 0 ? 1 : -1
    //         let newIndex = activeIndex + direction

    //         if (newIndex >= 0 && newIndex < videos.length) {
    //             setActiveIndex(newIndex)
    //             isWheelScrolling.current = true

    //             setTimeout(() => {
    //                 isWheelScrolling.current = false
    //             }, 600)
    //         }
    //         event.preventDefault()
    //     },
    //     [activeIndex, videos.length]
    // )

    // const handleScroll = useCallback(() => {
    //     if (scrollTimeout.current) {
    //         clearTimeout(scrollTimeout.current)
    //     }

    //     scrollTimeout.current = setTimeout(() => {
    //         updateActiveIndex()
    //     }, 150)
    // }, [updateActiveIndex])

    // useEffect(() => {
    //     const container = containerRef.current
    //     if (container) {
    //         container.scrollTo({
    //             top: activeIndex * window.innerHeight,
    //             behavior: 'smooth',
    //         })
    //     }
    // }, [activeIndex])

    // useEffect(() => {
    //     const container = containerRef.current
    //     if (container) {
    //         container.addEventListener('wheel', handleWheel, { passive: false })

    //         container.addEventListener('scroll', handleScroll, {
    //             passive: true,
    //         })

    //         return () => {
    //             container.removeEventListener('wheel', handleWheel)
    //             container.removeEventListener('scroll', handleScroll)
    //         }
    //     }
    // }, [handleWheel, handleScroll])

    // Stan przechowujacy indeks aktualnie aktywnego (widocznego) filmiku
    const [activeIndex, setActiveIndex] = useState(0)
    // Stan przechowujacy informaje, czy wideo jest wyciszone (domyslnie wyciszone dla autoodtwarzania)
    const [isMuted, setIsMuted] = useState(true)
    // Ref do elementu DOM, ktory bedzie naszym przewijanym kontenerem
    const containerRef = useRef(null)
    // Ref do blokowania przewijania kolkiem myszy, gdy animacja trwa, aby uniknac "skakania"
    const isWheelScrolling = useRef(false)
    // Ref do blokowania przewijania dotykiem, gdy animacja trwa
    const isTouchScrolling = useRef(false)
    // NOWO DODANE: Ref do flagi wskazujacej, czy wykryto gest swipe (ruch, a nie tap)
    const isSwiping = useRef(false)

    // NOWO DODANE: Refy do sledzenia poczatkowych wspolrzednych dotyku
    const touchStartX = useRef(0)
    const touchStartY = useRef(0)

    // Ref do sledzenia timeoutu dla zdarzenia 'scroll' (do synchronizacji activeIndex)
    const scrollTimeout = useRef(null)

    // Ref do wykrywania, czy urzadzenie jest dotykowe (mobilne)
    const isTouchDevice = useRef(
        typeof window !== 'undefined' &&
            ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    )

    // Funkcja pomocnicza do aktualizacji activeIndex na podstawie pozycji scrolla
    // Wywolywana po zakonczeniu natywnego przewijania (swipe/scroll-snap)
    const updateActiveIndex = useCallback(() => {
        if (containerRef.current) {
            const scrollY = containerRef.current.scrollTop
            const windowHeight = window.innerHeight
            // Obliczanie najblizszego indeksu na podstawie pozycji scrolla
            const newIndex = Math.round(scrollY / windowHeight)
            if (newIndex !== activeIndex) {
                setActiveIndex(newIndex)
            }
        }
    }, [activeIndex])

    // Funkcja wywolywana po kliknieciu na obszar wideo, aby przelaczyc wyciszenie
    const handleVideoClick = useCallback(() => {
        console.log('Video Click')
        setIsMuted((prev) => !prev)
    }, [])

    // Obsluga zdarzenia przewijania kolkiem myszy (TYLKO DLA DESKTOPU)
    const handleWheel = useCallback(
        (event) => {
            // Zawsze zapobiegaj domyslnemu przewijaniu przegladarki przy kolku myszy
            event.preventDefault()

            // Jesli animacja przewijania kolkiem myszy trwa, ignoruj kolejne zdarzenia
            if (isWheelScrolling.current) {
                return
            }

            const direction = event.deltaY > 0 ? 1 : -1 // 1 dla w dol, -1 dla w gore
            let newIndex = activeIndex + direction

            // Sprawdz, czy nowy indeks jest w granicach dostepnych filmikow
            if (newIndex >= 0 && newIndex < videos.length) {
                setActiveIndex(newIndex) // Ustaw nowy aktywny indeks
                isWheelScrolling.current = true // Zablokuj przewijanie kolkiem myszy

                // Odblokuj przewijanie po zakonczeniu animacji (okolo 600ms dla 'smooth' behavior)
                setTimeout(() => {
                    isWheelScrolling.current = false
                }, 600)
            }
        },
        [activeIndex, videos.length]
    ) // Zaleznosci dla useCallback

    // Obsluga dotyku (TYLKO DLA URZADZEN MOBILNYCH)
    // ZMIENIONE: Obsluga zdarzenia rozpoczecia dotyku
    const handleTouchStart = useCallback(
        (e) => {
            // NIE preventDefault() tutaj, aby potencjalnie pozwolil na klikniecie
            touchStartX.current = e.touches[0].clientX
            touchStartY.current = e.touches[0].clientY
            isSwiping.current = false // Resetuj flage swipe dla nowego dotyku

            // Jesli jakas animacja przewijania jest juz w toku, zablokuj domyslne zachowanie
            if (isTouchScrolling.current || isWheelScrolling.current) {
                e.preventDefault()
            }
        },
        [isTouchScrolling, isWheelScrolling]
    )

    // ZMIENIONE: Obsluga zdarzenia ruchu dotyku (kluczowe do zablokowania natywnego scrolla)
    const handleTouchMove = useCallback(
        (e) => {
            // Jesli animacja przewijania jest juz w toku, zablokuj domyslne zachowanie
            if (isTouchScrolling.current || isWheelScrolling.current) {
                e.preventDefault()
                return
            }

            const currentX = e.touches[0].clientX
            const currentY = e.touches[0].clientY
            const deltaX = Math.abs(currentX - touchStartX.current)
            const deltaY = Math.abs(currentY - touchStartY.current)

            const movementThreshold = 10 // Piksele, aby uznac ruch za swipe/przeciagniecie

            if (deltaY > movementThreshold || deltaX > movementThreshold) {
                // Jesli znaczny ruch
                isSwiping.current = true // Oznacz jako potencjalny swipe
                e.preventDefault() // Zablokuj domyslne przewijanie/zoom przegladarki
            }
        },
        [isTouchScrolling, isWheelScrolling]
    )

    // ZMIENIONE: Obsluga zdarzenia zakonczenia dotyku (do wykrywania swipe'a LUB tapniecia)
    const handleTouchEnd = useCallback(
        (e) => {
            if (isTouchScrolling.current) return // Jesli animacja przewijania jest w toku, ignoruj

            if (isSwiping.current) {
                // To byl swipe, wiec wykonaj logike przewijania
                const touchEndY = e.changedTouches[0].clientY
                const deltaY = touchEndY - touchStartY.current
                const swipeThreshold = 50 // Minimalna odleglosc swipe'a do aktywacji

                if (deltaY < -swipeThreshold) {
                    // Swipe w gore (przewijanie w dol)
                    if (activeIndex < videos.length - 1) {
                        setActiveIndex((prevIndex) => prevIndex + 1)
                        isTouchScrolling.current = true
                        setTimeout(() => {
                            isTouchScrolling.current = false
                        }, 600)
                    }
                } else if (deltaY > swipeThreshold) {
                    // Swipe w dol (przewijanie w gore)
                    if (activeIndex > 0) {
                        setActiveIndex((prevIndex) => prevIndex - 1)
                        isTouchScrolling.current = true
                        setTimeout(() => {
                            isTouchScrolling.current = false
                        }, 600)
                    }
                }
                isSwiping.current = false // Zresetuj flage swipe na koniec interakcji
            } else {
                // Jesli nie wykryto swipe'a, to bylo tapniecie/klikniecie
                handleVideoClick() // Wywolaj funkcje obslugujaca klikniecie wideo
            }
        },
        [
            activeIndex,
            videos.length,
            handleVideoClick,
            isTouchScrolling,
            isSwiping,
        ]
    ) // Zaleznosci dla useCallback

    // Obsluga zdarzenia 'scroll' (reaguje na natywne przewijanie, w tym scroll-snap po scrollTo)
    const handleScroll = useCallback(() => {
        // Wyczysc poprzedni timeout, jesli istnieje
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current)
        }

        // Ustaw timeout, ktory wywola updateActiveIndex po krotkiej przerwie (gdy przewijanie sie zatrzyma)
        scrollTimeout.current = setTimeout(() => {
            updateActiveIndex()
        }, 150) // Krotka zwloka, aby upewnic sie, ze scroll-snap zakonczyl dzialanie
    }, [updateActiveIndex])

    // Efekt do przewijania kontenera, gdy zmieni sie activeIndex
    // Ten efekt jest wywolywany zarowno przez handleWheel (desktop), jak i przez handleTouchEnd (mobile/swipe)
    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.scrollTo({
                top: activeIndex * window.innerHeight, // Przewin do pozycji aktywnego filmiku
                behavior: 'smooth', // Klucz do plynnej animacji przewijania
            })
        }
        // Zresetuj stan wyciszenia, gdy zmienia sie aktywny filmik,
        // aby kolejny filmik startowal wyciszony (jak w TikToku)
        setIsMuted(true)
    }, [activeIndex]) // Ten efekt uruchamia sie, gdy activeIndex sie zmieni

    // ZMIENIONE: Efekt do dodawania i usuwania event listenerow w zaleznosci od typu urzadzenia
    useEffect(() => {
        const container = containerRef.current
        if (container) {
            // Zawsze dodaj listener 'scroll' do synchronizacji activeIndex z faktyczna pozycja przewijania
            container.addEventListener('scroll', handleScroll, {
                passive: true,
            })

            if (isTouchDevice.current) {
                // Urzadzenia mobilne: Obsluga tylko dotykiem
                // Usun listener kolka myszy, aby uniknac konfliktow
                container.removeEventListener('wheel', handleWheel)
                // Dodaj listenery dla zdarzen dotykowych
                container.addEventListener('touchstart', handleTouchStart, {
                    passive: false,
                })
                container.addEventListener('touchmove', handleTouchMove, {
                    passive: false,
                }) // WAŻNE: zapobiega natywnemu scrollowi
                container.addEventListener('touchend', handleTouchEnd, {
                    passive: false,
                })
            } else {
                // Urzadzenia stacjonarne: Obsluga tylko kolkiem myszy
                // Usun listenery dotykowe, aby uniknac konfliktow
                // container.removeEventListener('touchstart', handleTouchStart)
                // container.removeEventListener('touchmove', handleTouchMove)
                // container.removeEventListener('touchend', handleTouchEnd)
                // Dodaj listener kolka myszy
                container.addEventListener('wheel', handleWheel, {
                    passive: false,
                })
            }

            // Funkcja czyszczaca: usun wszystkie listenery, gdy komponent zostanie odmontowany
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
    ]) // Zaleznosci: referencje do funkcji obslugujacych zdarzenia

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
            <main className="flex-grow overflow-hidden mx-auto max-w-7xl p-[0rem] md:p-[0rem] lg:p-[0rem]">
                {videos.map((video, index) => (
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
