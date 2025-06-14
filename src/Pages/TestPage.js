import React from 'react'
import Footer from '../Components/Footer'
import TestComponent from '../Components/TestComponent'
import { useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const TestPage = () => {
    const { id } = useParams()

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <TestComponent courseId={id} />
            </main>
            <Footer />
        </div>
    )
}

export default TestPage
