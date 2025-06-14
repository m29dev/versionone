import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NavbarLearningMode = ({ title }) => {
    const navigate = useNavigate()
    const titleObject = {
        javascript: 'Java Script',
        python: 'Python',
        java: 'Java',
    }
    const titleName = titleObject[title]

    return (
        <nav className="bg-transparent fixed w-full z-20 top-0 left-0 ">
            <div className="max-w-7xl m-auto flex flex-wrap items-center justify-center pt-[1rem] md:p-[2rem] lg:p-[2rem]">
                <div
                    className={`w-full block w-auto bg-white/50 rounded-full md:py-5 md:px-6`}
                >
                    <ul className="md:p-0 font-medium cursor-pointer md:space-x-8 md:mt-0 m-0 text-center flex items-center justify-center text-white">
                        <button
                            className="text-white font-semibold rounded-full cursor-pointer"
                            onClick={() => navigate('/courses')}
                        >
                            <ArrowLeft className="w-10 h-10" />
                        </button>

                        <li>{titleName}</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavbarLearningMode
