import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import videoSlice from './videoSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        video: videoSlice,
    },
})
