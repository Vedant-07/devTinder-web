import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../utils/userSlice"
import feedReducer from "../utils/feedSlice"
import requestReducer from "../utils/requestSlice"

const appStore =configureStore({
    reducer:{
        user:UserReducer,
        feed:feedReducer,
        requests:requestReducer
    }
})

export default appStore
