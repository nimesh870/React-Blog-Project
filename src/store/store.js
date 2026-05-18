import { configureStore } from "@reduxjs/toolkit";
import authReduer from '../features/authSlice'

export const store = configureStore({
    reducer : {
        auth : authReduer
    }
})