import { createSlice } from "@reduxjs/toolkit";

const usercheck = JSON.parse(localStorage.getItem("push"))

export const userSlice = createSlice({
    name: "user",
    initialState:{
        user: usercheck?usercheck: null
    },
    reducers: {
        login: (state,action) => {
            state.user = action.payload;
            localStorage.setItem("push",JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.user =null;
            localStorage.removeItem("push")

        },
    },
}); 
export const {login, logout} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;