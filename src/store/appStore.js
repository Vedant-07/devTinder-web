import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../utils/userSlice"

const appStore =configureStore({
    reducer:{
        user:UserReducer,
    }
})

export default appStore
