import { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../RTK/userSlice'
import { supabase } from '../supabaseClient'

const SignUpPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [errorDisplay, setErrorDisplay] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)

    const handleSignUp = async () => {
        try {
            setErrorDisplay(null)
            setPasswordError(false)
            if (password !== confirmPassword) return setPasswordError(true)

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            })
            if (error) {
                console.error('Login error:', error.message)
                setErrorDisplay(error.message)
            } else {
                handleCreateUserData(data?.user)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleCreateUserData = async (sign_up_user) => {
        try {
            const { data, error } = await supabase
                .from('UserData')
                .insert([
                    {
                        user_UID: sign_up_user?.id,
                        user_email: sign_up_user?.email,
                        courses: { javascript: 1, python: 2, java: 3 },
                    },
                ])
                .select()

            if (error) {
                console.error('Insert error:', error.message)
            } else {
                if (data) {
                    dispatch(
                        setUser({
                            id: sign_up_user?.id,
                            email: sign_up_user?.email,
                            created: sign_up_user?.created_at,
                            courses: {
                                javascript: {
                                    id: 'javascript',
                                    name: 'JavaScript',
                                    totalLessons: 10,
                                    completedLessons: 0,
                                    lastAccessed: null,
                                },
                                python: {
                                    id: 'python',
                                    name: 'Python',
                                    totalLessons: 10,
                                    completedLessons: 0,
                                    lastAccessed: null,
                                },
                                java: {
                                    id: 'java',
                                    name: 'Java',
                                    totalLessons: 10,
                                    completedLessons: 0,
                                    lastAccessed: null,
                                },
                            },
                        })
                    )
                }
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow flex ">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Sign Up
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6">
                            <div className="flex-col">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm/6 font-medium text-gray-900 justify-self-start"
                                    >
                                        Email address
                                    </label>

                                    {errorDisplay && (
                                        <div className="text-sm">
                                            <p className="font-semibold text-yellow-600 hover:text-indigo-500 m-0">
                                                {errorDisplay}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        className="block w-full rounded-full  bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-blue-300"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm/6 font-medium text-gray-900"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        className="block w-full rounded-full  bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-blue-300"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password0"
                                        className="block text-sm/6 font-medium text-gray-900"
                                    >
                                        Confirm Password
                                    </label>

                                    {passwordError && (
                                        <div className="text-sm">
                                            <p className="font-semibold text-yellow-600 m-0">
                                                Passwords are not the same!
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password1"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value)
                                        }}
                                        className="block w-full rounded-full  bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-blue-300"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow cursor-pointer"
                                    onClick={handleSignUp}
                                >
                                    Sign Up
                                </button>
                            </div>

                            <p
                                className="mt-10 text-center text-sm/6 text-gray-500 cursor-pointer"
                                onClick={() => navigate('/signin')}
                            >
                                Already a member? Sign In
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default SignUpPage
