import {createSlice} from '@reduxjs/toolkit'

const initialState={
    value:null
}

export const userStore=createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.value=action.payload
        },
        removeUser:(state)=>{
            state.value=null
        }
    }
})

export const {addUser,removeUser}=userStore.actions

export default userStore.reducer