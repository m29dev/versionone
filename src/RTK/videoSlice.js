import { createSlice } from '@reduxjs/toolkit'
import {
    clearVideoInfo,
    getVideoInfo,
    setVideoInfo,
} from '../Services/localStorageService'

const initialState = {
    video: getVideoInfo(),
}

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        setVideo: (state, action) => {
            state.video = action.payload
            setVideoInfo(action.payload)
        },
        clearVideo(state, action) {
            state.video = null
            clearVideoInfo()
        },
    },
})

export const { setVideo, clearVideo } = videoSlice.actions
export default videoSlice.reducer
