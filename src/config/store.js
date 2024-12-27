import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../Store/userSlice"

const appStore =configureStore({
    reducer:{
        user:UserReducer,
    }
})

export default appStore
