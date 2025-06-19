import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, Settings, User, Trophy, Flame } from 'lucide-react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { useSelector } from 'react-redux'
import { supabase } from '../supabaseClient'

const UserPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const navigate = useNavigate()
    const { pathname: url } = useLocation()
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        if (!user) return navigate('/signin')
    }, [user, navigate])

    const courses = useMemo(() => ['javascript', 'python', 'java'], [])

    const [learningState, setLearningState] = useState({})

    const fetchUserData = useCallback(async () => {
        const { data, error } = await supabase
            .from('UserData')
            .select('*')
            .eq('user_UID', user?.id)

        if (error) {
            console.error('Fetch error:', error.message)
        } else {
            setLearningState(data[0].courses)
        }
    }, [user])

    useEffect(() => {
        fetchUserData()
    }, [fetchUserData])

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errorResponseDisplay, setErrorResponseDisplay] = useState(false)
    const [errorDisplay, setErrorDisplay] = useState(false)
    const [successDisplay, setSuccessDisplay] = useState(false)

    const handleChangePassword = async () => {
        try {
            setErrorDisplay(false)
            setErrorResponseDisplay(false)
            setSuccessDisplay(false)

            if (password !== confirmPassword) return setErrorDisplay(true)

            const { data, error } = await supabase.auth.updateUser({
                password,
            })

            if (error) {
                setErrorResponseDisplay(error.message)
            } else {
                if (data) {
                    setSuccessDisplay('Password changed successfully')
                    setPassword('')
                    setConfirmPassword('')
                }
            }
        } catch (err) {
            setErrorResponseDisplay('Server error')
        }
    }

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow mt-[110px] md:mt-[168px]">
                <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 max-w-7xl mx-auto px-4 md:px-6">
                    <div className="max-w-7xl mx-auto ">
                        <div className="space-y-6">
                            <div className="grid w-full grid-cols-3 max-w-md bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow px-1">
                                <div>
                                    <div
                                        className={`block py-2 pl-3 pr-4 md:p-0 flex justify-center items-center gap-2 cursor-pointer text-bold  ${
                                            url === '/user/overview'
                                                ? 'text-blue-500'
                                                : 'text-gray-700'
                                        }`}
                                        onClick={() => {
                                            navigate('/user/overview')
                                        }}
                                    >
                                        <User className="w-4 h-4" />
                                        Overview
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className={`block py-2 pl-3 pr-4 md:p-0 flex justify-center items-center gap-2 cursor-pointer  ${
                                            url === '/user/courses'
                                                ? 'text-blue-500'
                                                : 'text-gray-700'
                                        }`}
                                        onClick={() =>
                                            navigate('/user/courses')
                                        }
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        Courses
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className={`block py-2 pl-3 pr-4 md:p-0 flex justify-center items-center gap-2 cursor-pointer ${
                                            url === '/user/settings'
                                                ? 'text-blue-500'
                                                : 'text-gray-700'
                                        }`}
                                        onClick={() =>
                                            navigate('/user/settings')
                                        }
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`space-y-6 ${
                                    url === '/user/overview'
                                        ? 'block'
                                        : 'hidden'
                                }`}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-6">
                                        <div>
                                            <h3 className="flex items-center gap-2 font-medium font-bold">
                                                Profile Information
                                            </h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">
                                                    Email
                                                </label>
                                                <p className="text-lg">
                                                    {user?.email}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">
                                                    Member Since
                                                </label>
                                                <p className="text-lg">
                                                    {user?.created?.slice(
                                                        0,
                                                        10
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="bg-white w-full h-full">
                                            <div>
                                                <h3 className="flex items-center gap-2 font-medium font-bold">
                                                    Certificates
                                                </h3>

                                                <label className="text-sm font-medium text-gray-600">
                                                    Courses Completed with
                                                    certificate
                                                </label>
                                            </div>
                                            <div className="space-y-4 mt-6">
                                                <div className="flex items-center">
                                                    <div className="text-lg text-primary flex-col items-center text-gray-900">
                                                        {learningState
                                                            ?.javascript
                                                            ?.certificationTest && (
                                                            <div>
                                                                JavaScript
                                                                certificate:{' '}
                                                                {
                                                                    learningState
                                                                        ?.javascript
                                                                        ?.certificationTest
                                                                }
                                                                %
                                                            </div>
                                                        )}

                                                        {learningState?.python
                                                            ?.certificationTest && (
                                                            <div>
                                                                Python
                                                                certificate:{' '}
                                                                {
                                                                    learningState
                                                                        ?.python
                                                                        ?.certificationTest
                                                                }
                                                                %
                                                            </div>
                                                        )}

                                                        {learningState?.java
                                                            ?.certificationTest && (
                                                            <div>
                                                                Java
                                                                certificate:{' '}
                                                                {
                                                                    learningState
                                                                        ?.java
                                                                        ?.certificationTest
                                                                }
                                                                %
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <Trophy className="w-10 h-10 absolute top-5 right-3 text-sky-500" />
                                        </div>
                                    </div>

                                    <div className="relative bg-white p-[2.7px] rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-400 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="bg-white rounded-xl space-y-6 p-2 w-full h-full">
                                            <div>
                                                <h3 className="flex items-center gap-2 font-medium font-bold">
                                                    Strike
                                                </h3>

                                                <label className="text-sm font-medium text-gray-600">
                                                    Your current strike of daily
                                                    Sign In's
                                                </label>
                                            </div>
                                            <div className="mx-auto">
                                                <div className="flex items-center px-1 py-1">
                                                    <p className="text-lg text-primary flex items-center text-gray-900">
                                                        {user?.access_strike ===
                                                        0
                                                            ? `${user?.access_strike} days strike`
                                                            : user?.access_strike ===
                                                              1
                                                            ? `${user?.access_strike} day strike`
                                                            : `${user?.access_strike} days strike`}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <Flame className="w-10 h-10 absolute top-5 right-3 text-sky-500" />
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-6    ">
                                    <div>
                                        <h3 className="flex items-center gap-2 font-medium font-bold">
                                            Recent Course Activity
                                        </h3>

                                        <label className="text-sm font-medium text-gray-600">
                                            Your progress in active courses
                                        </label>
                                    </div>
                                    <div>
                                        <div className="space-y-4">
                                            {courses?.map((course) => (
                                                <div
                                                    key={course}
                                                    className="flex items-center justify-between p-4 border rounded-lg"
                                                >
                                                    <div className="flex-1">
                                                        <h3 className="font-medium">
                                                            {
                                                                learningState[
                                                                    course
                                                                ]?.name
                                                            }
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            {
                                                                learningState[
                                                                    course
                                                                ]
                                                                    ?.completedLessons
                                                                    ?.length
                                                            }{' '}
                                                            of{' '}
                                                            {
                                                                learningState[
                                                                    course
                                                                ]?.totalLessons
                                                            }{' '}
                                                            lessons completed
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/courses/${course}`
                                                            )
                                                        }
                                                        className="ml-4"
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`space-y-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${
                                    url === '/user/courses' ? 'block' : 'hidden'
                                }`}
                            >
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="flex items-center gap-2 font-medium font-bold">
                                            All Courses
                                        </h3>

                                        <label className="text-sm font-medium text-gray-600">
                                            Track your progress across all
                                            courses
                                        </label>
                                    </div>
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {courses.map((course) => (
                                                <div
                                                    key={course}
                                                    className="relative bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                                                >
                                                    <div>
                                                        <div className="flex items-start justify-between items-center">
                                                            <h3 className="flex items-center gap-2 font-medium font-bold">
                                                                {
                                                                    learningState[
                                                                        course
                                                                    ]?.name
                                                                }
                                                            </h3>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div>
                                                            <div className="flex justify-between text-sm mb-2">
                                                                <label className="text-sm font-medium text-gray-600">
                                                                    Progress
                                                                </label>
                                                                <span>
                                                                    {learningState[
                                                                        course
                                                                    ]
                                                                        ?.totalLessons *
                                                                        learningState[
                                                                            course
                                                                        ]
                                                                            ?.completedLessons
                                                                            ?.length}
                                                                    %
                                                                </span>
                                                            </div>

                                                            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-blue-600 transition-all duration-300"
                                                                    style={{
                                                                        width: `${
                                                                            learningState[
                                                                                course
                                                                            ]
                                                                                ?.totalLessons *
                                                                            learningState[
                                                                                course
                                                                            ]
                                                                                ?.completedLessons
                                                                                ?.length
                                                                        }%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="text-sm text-gray-600">
                                                            <p>
                                                                {
                                                                    learningState[
                                                                        course
                                                                    ]
                                                                        ?.completedLessons
                                                                        ?.length
                                                                }{' '}
                                                                of{' '}
                                                                {
                                                                    learningState[
                                                                        course
                                                                    ]
                                                                        ?.totalLessons
                                                                }{' '}
                                                                lessons
                                                            </p>
                                                            <p>
                                                                Last accessed:{' '}
                                                                {learningState[
                                                                    course
                                                                ]?.lastAccessed?.slice(
                                                                    0,
                                                                    10
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`space-y-6 ${
                                    url === '/user/settings'
                                        ? 'block'
                                        : 'hidden'
                                }`}
                            >
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-6">
                                    <div>
                                        <h3 className="flex items-center gap-2 font-medium font-bold">
                                            Account Information
                                        </h3>

                                        <label className="text-sm font-medium text-gray-600">
                                            Your account details
                                        </label>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm/6 font-medium text-gray-900 justify-self-start">
                                                User ID
                                            </label>

                                            <div className="bg-white py-2 px-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                                {user?.id}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm/6 font-medium text-gray-900 justify-self-start">
                                                Email Address
                                            </label>

                                            <div className="bg-white py-2 px-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                                {user?.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div>
                                        <h3 className="flex items-center gap-2 font-medium font-bold">
                                            Change Password
                                        </h3>

                                        <label className="text-sm font-medium text-gray-600">
                                            Update your account password
                                        </label>
                                    </div>

                                    <div className="mt-10">
                                        <div className="space-y-6">
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <label
                                                        htmlFor="password"
                                                        className="block text-sm/6 font-medium text-gray-900"
                                                    >
                                                        New Password
                                                    </label>

                                                    {errorDisplay && (
                                                        <div className="text-sm">
                                                            <p className="font-semibold text-yellow-600 m-0">
                                                                Passwords are
                                                                not the same
                                                            </p>
                                                        </div>
                                                    )}

                                                    {errorResponseDisplay && (
                                                        <div className="text-sm">
                                                            <p className="font-semibold text-yellow-600 m-0">
                                                                {
                                                                    errorResponseDisplay
                                                                }
                                                            </p>
                                                        </div>
                                                    )}
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
                                                            setPassword(
                                                                e.target.value
                                                            )
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

                                                    {successDisplay && (
                                                        <div className="text-sm">
                                                            <p className="font-semibold text-green-300 m-0">
                                                                {successDisplay}
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
                                                            setConfirmPassword(
                                                                e.target.value
                                                            )
                                                        }}
                                                        className="block w-full rounded-full  bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-blue-300"
                                                    />
                                                </div>
                                            </div>

                                            <div className="">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow cursor-pointer"
                                                    onClick={
                                                        handleChangePassword
                                                    }
                                                >
                                                    Change
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default UserPage
