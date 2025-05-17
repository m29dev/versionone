import React from 'react'

import Navbar from '../Components/Navbar'
import HeroSection from '../Components/HeroSection'
import FeaturesSection from '../Components/FeaturesSection'
import CommunitySection from '../Components/CommunitySection'
import CtaSection from '../Components/CtaSection'
import Footer from '../Components/Footer'

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <HeroSection />
                <FeaturesSection />
                <CommunitySection />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}

export default HomePage
