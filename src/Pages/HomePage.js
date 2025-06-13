import { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import HeroSection from '../Components/HeroSection'
import FeaturesSection from '../Components/FeaturesSection'
import CtaSection from '../Components/CtaSection'
import Footer from '../Components/Footer'

const HomePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <HeroSection />
                <FeaturesSection />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}

export default HomePage
