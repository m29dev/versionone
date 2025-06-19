import { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../RTK/userSlice'
import { supabase } from '../supabaseClient'

const SignInPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorDisplay, setErrorDisplay] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)

    const handleSignIn = async () => {
        try {
            setErrorDisplay(null)

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) {
                console.error('Login error:', error.message)
                setErrorDisplay(error.message)
            } else {
                fetchUserData(data?.user)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const fetchUserData = async (sign_in_user) => {
        const { data, error } = await supabase
            .from('UserData')
            .select('*')
            .eq('user_UID', sign_in_user?.id)
            .single()

        if (error) {
            console.error('Fetch error:', error.message)
        } else {
            dispatch(
                setUser({
                    id: sign_in_user?.id,
                    email: sign_in_user?.email,
                    created: sign_in_user?.created_at,
                    courses: data?.courses,
                    accessed_at: data?.accessed_at,
                    access_strike: data?.access_strike,
                })
            )

            updateUserData(
                sign_in_user?.id,
                data?.accessed_at,
                data?.access_strike
            )
        }
    }

    // update strike
    const updateUserData = async (userId, accessed_at, access_strike) => {
        const now = new Date()
        const today = now.toLocaleString('pl-PL', {
            timeZone: 'Europe/Warsaw',
            dateStyle: 'short',
        })

        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        const yesterday = oneDayAgo.toLocaleString('pl-PL', {
            timeZone: 'Europe/Warsaw',
            dateStyle: 'short',
        })

        // accessed_at === today => nothing
        if (accessed_at === today) return

        const runUpdate = async (acc_at, acc_str) => {
            const { data, error } = await supabase
                .from('UserData')
                .update({
                    accessed_at: acc_at,
                    access_strike: acc_str,
                })
                .eq('user_UID', userId)
                .select()
                .single()

            if (error) {
                console.error('Update error:', error.message)
            } else {
                if (data) {
                    dispatch(
                        setUser({
                            id: data?.user_UID,
                            email: data?.user_email,
                            created: data?.created_at,
                            courses: data?.courses,
                            accessed_at: data?.accessed_at,
                            access_strike: data?.access_strike,
                        })
                    )
                }
            }
        }

        // accessed_at === yesterday => update accessed_at = today, update access_strike += access_strike
        if (accessed_at === yesterday) {
            runUpdate(today, access_strike + 1)
        }

        // accessed_at !== yesterday => update accessed_at = today, update access_strike = 0
        if (accessed_at !== yesterday) {
            runUpdate(today, 0)
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
                            Sign In
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

                            <div className="flex justify-center">
                                <button
                                    className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full border border-blue-300 hover:border-blue-500 cursor-pointer"
                                    onClick={handleSignIn}
                                >
                                    Sign In
                                </button>
                            </div>

                            <p
                                className="mt-10 text-center text-sm/6 text-gray-500 cursor-pointer"
                                onClick={() => navigate('/signup')}
                            >
                                Not a member? Sign Up
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default SignInPage
