import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice'
import toastReducer from '../features/toastSlice'
import postReducer from '../features/postSlice'

export const store = configureStore({
    reducer : {
        auth : authReducer,
        toast : toastReducer,
        post : postReducer,
    }
})