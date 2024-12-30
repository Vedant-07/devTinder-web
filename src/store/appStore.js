import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../utils/userSlice"
import feedReducer from "../utils/feedSlice"

const appStore =configureStore({
    reducer:{
        user:UserReducer,
        feed:feedReducer
    }
})

export default appStore
