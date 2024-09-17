import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logInInfo: {
        isUserLoggedIn: false,
        username: ""
    } 
}

export const logInSlice = createSlice({
    name: "logInInfo",
    initialState,
    reducers: {
        updateLogInInfo: (state, action) => {
            console.log("action.payload: ",action.payload);
            const { isUserLoggedIn, username } = action.payload;
            console.log("isUserLoggedIn: ",isUserLoggedIn);
            console.log("username: ",username);
            state.logInInfo.isUserLoggedIn = isUserLoggedIn;
            state.logInInfo.username = username; 
            console.log("state.logInInfo: ",state.logInInfo)
        }
    }
})


export const { updateLogInInfo } = logInSlice.actions;
export default logInSlice.reducer;