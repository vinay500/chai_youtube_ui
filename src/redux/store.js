import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter.js"
import updateLoginInfo from "./slices/logInInfo.js"


export const store = configureStore({
    reducer: {
        counter: counterSlice, 
        logInInfo: updateLoginInfo
    },
});