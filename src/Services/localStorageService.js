// user
export const setUserInfo = (userObject) => {
    localStorage.setItem('userInfo', JSON.stringify(userObject))
}
export const clearUserInfo = () => {
    localStorage.removeItem('userInfo')
}
export const getUserInfo = () => {
    const user = localStorage.getItem('userInfo')
    if (!user) return null
    return JSON.parse(localStorage.getItem('userInfo'))
}

// video
export const setVideoInfo = (videoObject) => {
    localStorage.setItem('videoInfo', JSON.stringify(videoObject))
}
export const clearVideoInfo = () => {
    localStorage.removeItem('videoInfo')
}
export const getVideoInfo = () => {
    const video = localStorage.getItem('videoInfo')
    if (!video) return null
    return JSON.parse(localStorage.getItem('videoInfo'))
}
