import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../RTK/userSlice'

const Navbar = () => {
    const navigate = useNavigate()
    const { pathname: url } = useLocation()
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleSignOut = () => {
        dispatch(clearUser())
    }

    return (
        <nav className="fixed z-20 top-0 left-0 w-full flex items-center justify-center cursor-pointer">
            {/* desktop */}
            <ul className="hidden md:flex items-center justify-center bg-white font-medium text-center rounded-full shadow md:space-x-8 p-4 md:px-5 mt-5 md:mt-10">
                <li>
                    <div className="flex items-center cursor-pointer">
                        <img
                            className="bg-white rounded-full flex items-center w-14 h-14"
                            alt="logo"
                            src="https://yifcxhnhkmklkxiodfvh.supabase.co/storage/v1/object/sign/images/versionone_logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZGI4YmYxMC0wMmI4LTQzNmQtOThiZS00N2I3ZjQwZmE5ZGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvdmVyc2lvbm9uZV9sb2dvLnBuZyIsImlhdCI6MTc0OTg2MjY3NiwiZXhwIjoxODM2MjYyNjc2fQ.cm9PnWa5_Qv2mXISUjanJACBT2G4H0F8Wof-O0RC9bY"
                        ></img>
                    </div>
                </li>

                <li>
                    <div
                        className={`block py-2 pl-3 pr-4 md:p-0 text-bold flex items-center justify-center ${
                            url === '/' ? 'text-blue-500' : 'text-gray-700'
                        }`}
                        onClick={() => navigate('/')}
                    >
                        Home
                    </div>
                </li>
                <li>
                    <div
                        className={`block py-2 pl-3 pr-4 md:p-0 ${
                            url === '/courses'
                                ? 'text-blue-500'
                                : 'text-gray-700'
                        }`}
                        onClick={() => navigate('/courses')}
                    >
                        Courses
                    </div>
                </li>
                <li>
                    <div
                        className={`block py-2 pl-3 pr-4 md:p-0 ${
                            url === '/quiz' ? 'text-blue-500' : 'text-gray-700'
                        }`}
                        onClick={() => navigate('/quiz')}
                    >
                        Quiz
                    </div>
                </li>

                {!user && (
                    <li className="flex md:items-center md:space-x-4 ml-0">
                        <button
                            className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full border border-blue-300 hover:border-blue-500 cursor-pointer
"
                            onClick={() => navigate('/signin')}
                        >
                            Sign In
                        </button>

                        <button
                            className="hidden md:flex bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full items-center gap-2 shadow cursor-pointer
"
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </button>
                    </li>
                )}

                {user && (
                    <div className="flex md:items-center md:space-x-4">
                        <div className="relative inline-block text-left">
                            <button
                                className="bg-white hover:bg-white-600 text-blue-500 font-semibold px-6 py-4 rounded-full flex items-center gap-2 shadow cursor-pointer"
                                onClick={toggleDropdown}
                            >
                                {user.email.slice(0, 1).toUpperCase()}
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 flex-col justify-center align-center text-center">
                                    <button
                                        className="px-4 py-2 text-center hover:bg-gray-100"
                                        onClick={() =>
                                            navigate('/user/overview')
                                        }
                                    >
                                        User
                                    </button>

                                    <button
                                        className="px-4 py-2 text-center hover:bg-gray-100"
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </ul>

            {/* mobile */}
            <ul className="md:hidden flex flex-wrap items-center justify-between bg-white font-medium text-center rounded-b-[45px]  shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] p-4 w-full">
                <li>
                    <div className="flex items-center cursor-pointer">
                        <img
                            className="bg-white rounded-full flex items-center w-14 h-14"
                            alt="logo"
                            src="https://yifcxhnhkmklkxiodfvh.supabase.co/storage/v1/object/sign/images/versionone_logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZGI4YmYxMC0wMmI4LTQzNmQtOThiZS00N2I3ZjQwZmE5ZGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvdmVyc2lvbm9uZV9sb2dvLnBuZyIsImlhdCI6MTc0OTg2MjY3NiwiZXhwIjoxODM2MjYyNjc2fQ.cm9PnWa5_Qv2mXISUjanJACBT2G4H0F8Wof-O0RC9bY"
                        ></img>
                    </div>
                </li>

                <li>
                    <div
                        className={`block py-2 pl-3 pr-4 md:p-0 text-bold flex items-center justify-center ${
                            url === '/' ? 'text-blue-500' : 'text-gray-700'
                        }`}
                        onClick={() => navigate('/')}
                    >
                        Home
                    </div>
                </li>
                <li>
                    <div
                        className={`block py-2 pl-3 pr-4 md:p-0 ${
                            url === '/courses'
                                ? 'text-blue-500'
                                : 'text-gray-700'
                        }`}
                        onClick={() => navigate('/courses')}
                    >
                        Courses
                    </div>
                </li>
                {user && (
                    <li>
                        <div
                            className={`block py-2 pl-3 pr-4 md:p-0 ${
                                url === '/quiz'
                                    ? 'text-blue-500'
                                    : 'text-gray-700'
                            }`}
                            onClick={() => navigate('/quiz')}
                        >
                            Quiz
                        </div>
                    </li>
                )}

                {!user && (
                    <li className="flex md:items-center md:space-x-4 ml-0">
                        <button
                            className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full border border-blue-300 hover:border-blue-500 cursor-pointer
"
                            onClick={() => navigate('/signin')}
                        >
                            Sign In
                        </button>

                        <button
                            className="hidden md:flex bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full items-center gap-2 shadow cursor-pointer
"
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </button>
                    </li>
                )}

                {user && (
                    <div className="flex md:items-center md:space-x-4">
                        <div className="relative inline-block text-left">
                            <button
                                className="bg-white hover:bg-white-600 text-blue-500 font-semibold px-6 py-4 rounded-full flex items-center gap-2 shadow cursor-pointer"
                                onClick={toggleDropdown}
                            >
                                {user.email.slice(0, 1).toUpperCase()}
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 flex-col justify-center align-center text-center">
                                    <button
                                        className="px-4 py-2 text-center hover:bg-gray-100"
                                        onClick={() =>
                                            navigate('/user/overview')
                                        }
                                    >
                                        User
                                    </button>

                                    <button
                                        className="px-4 py-2 text-center hover:bg-gray-100"
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
