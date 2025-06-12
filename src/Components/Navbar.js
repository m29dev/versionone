import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()
    const { pathname: url } = useLocation()
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        console.log('test')
        console.log(url.pathname)
    }, [url])

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <nav className="bg-transparent backdrop-sm fixed w-full z-20 top-0 left-0 ">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-[1rem] md:p-[2rem] lg:p-[2rem]">
                <div className="flex items-center">
                    <span className="text-primary font-bold cursor-pointer text-xl">
                        version one
                    </span>
                </div>

                <div className="flex md:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                    >
                        <Menu />
                    </button>
                </div>

                <div
                    className={`${
                        mobileMenuOpen ? 'block' : 'hidden'
                    } w-full md:block md:w-auto bg-[#ffffff] rounded-full`}
                >
                    <ul className="flex flex-col p-4  px-5 md:p-0 font-medium cursor-pointer md:flex-row md:space-x-8 md:mt-0 m-0">
                        <li>
                            <div
                                className={`block py-2 pl-3 pr-4 md:p-0 ${
                                    url === '/'
                                        ? 'text-primary'
                                        : 'text-gray-700'
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
                                        ? 'text-primary'
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
                                    url === '/quiz'
                                        ? 'text-primary'
                                        : 'text-gray-700'
                                }`}
                                onClick={() => navigate('/quiz')}
                            >
                                Quiz
                            </div>
                        </li>
                    </ul>
                </div>

                {user && (
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow cursor-pointer
"
                            onClick={() => navigate('/user')}
                        >
                            {user.email.slice(0, 1).toUpperCase()}
                        </button>
                    </div>
                )}

                {!user && (
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <button
                            className="bg-transparent text-blue-500 font-semibold px-6 py-3 rounded-full border border-blue-300 hover:border-blue-500 cursor-pointer
"
                            onClick={() => navigate('/signin')}
                        >
                            Sign In
                        </button>

                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow cursor-pointer
"
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
