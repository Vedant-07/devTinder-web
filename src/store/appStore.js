import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../utils/userSlice"
import feedReducer from "../utils/feedSlice"
import requestReducer from "../utils/requestSlice"
import connectionReducer from "../utils/connectionSlice"

const appStore =configureStore({
    reducer:{
        user:UserReducer,
        feed:feedReducer,
        requests:requestReducer,
        connections:connectionReducer
    }
})

export default appStore
