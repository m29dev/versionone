import { useState } from 'react'
import { Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NavbarLearningMode = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <nav className="bg-transparent fixed w-full z-20 top-0 left-0 ">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center  p-[1rem] md:p-[2rem] lg:p-[2rem]">
                {/* go back btn */}
                <div className="flex items-center justify-self-left">
                    <button
                        className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full border border-blue-300 hover:border-blue-500 cursor-pointer
"
                        onClick={() => navigate('/courses')}
                    >
                        C
                    </button>
                </div>

                <div className="flex items-center justify-self-center">
                    <span className="text-light font-bold text-xl">
                        learning id
                    </span>
                </div>
            </div>
        </nav>
    )
}

export default NavbarLearningMode
