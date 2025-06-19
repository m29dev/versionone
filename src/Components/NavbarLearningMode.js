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
        <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full w-screen z-20 max-w-3xl m-auto flex items-center justify-center">
            <ul className="flex items-center justify-between bg-transparent cursor-pointer font-medium text-center p-4 w-full">
                <li>
                    <div
                        className="w-14 h-14 shadow rounded-full p-3"
                        onClick={() => navigate('/courses')}
                    >
                        <ArrowLeft className="w-full h-full text-white" />
                    </div>
                </li>

                <li>
                    <div className="text-white shadow flex justify-center items-center rounded-full px-6 h-[56px]">
                        {titleName}
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default NavbarLearningMode
