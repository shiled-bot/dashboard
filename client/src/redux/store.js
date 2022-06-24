import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import appSlice from "./slices/appSlice"

export default configureStore({
    reducer: {
        auth: authReducer,
        app: appSlice
    }
})