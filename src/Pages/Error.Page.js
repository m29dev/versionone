import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="text-center max-w-md bg-white shadow-lg rounded-2xl p-10">
                <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Page Not Found
                </h2>
                <p className="text-gray-600 mb-6">
                    The page you are looking for doesn't exist or has been
                    moved.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    )
}

export default ErrorPage
