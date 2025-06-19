import React, { useEffect } from 'react'
import Footer from '../Components/Footer'
import TestComponent from '../Components/TestComponent'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { useSelector } from 'react-redux'

const TestPage = () => {
    const { id } = useParams()
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) return navigate('/signin')
    }, [user, navigate])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow flex justify-center items-center">
                <TestComponent courseId={id} />
            </main>
            <Footer />
        </div>
    )
}

export default TestPage
