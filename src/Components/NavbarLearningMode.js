import { useEffect, useState } from 'react'
import { Menu, ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

const NavbarLearningMode = ({ title }) => {
    const navigate = useNavigate()
    const titleObject = {
        javascript: 'Java Script',
        python: 'Python',
        java: 'Java',
    }
    const titleName = titleObject[title]

    useEffect(() => {
        console.log(titleName)
    }, [titleName])

    return (
        <nav className="bg-transparent fixed w-full z-20 top-0 left-0 ">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between  p-[1rem] md:p-[2rem] lg:p-[2rem]">
                <div className="flex items-center">
                    <button
                        className="bg-white text-blue-500 font-semibold px-3 py-3 rounded-full border border-blue-300 hover:border-blue-500 cursor-pointer"
                        onClick={() => navigate('/courses')}
                    >
                        <ArrowLeft />
                    </button>
                </div>

                <div className="flex items-center">
                    <span className="text-light font-bold text-xl">
                        {titleName}
                    </span>
                </div>
            </div>
        </nav>
    )
}

export default NavbarLearningMode
