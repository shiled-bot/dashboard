import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: null,
    avatarImageValid: false,
    isLoggedIn: false
}

export const checkIsUserAuth = createAsyncThunk("auth/checkIsUserAuth", async () => {
    const res = await axios.get(
        process.env.REACT_APP_API_URL + "/users",
        { withCredentials: true }
    )

    return res.data
})

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    await axios.get(
        process.env.REACT_APP_API_URL + "/users/logout",
        { withCredentials: true }
    )

    return;
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        changeAvatarImageValid(state, action) {
            state.avatarImageValid = action.payload
        },
        storeUser(state, { payload }) {
            state.isLoggedIn = true
            state.user = payload;
            state.avatarImageValid = payload.avatar
        },
        resetUser(state) {
            state.user = null
            state.isLoggedIn = false
            state.avatarImageValid = false
        }
    },
    extraReducers: {
        [checkIsUserAuth.fulfilled]: (state, action) => {
            if (action.payload.isLoggedIn) {
                state.isLoggedIn = true
                state.user = action.payload.user;
                state.avatarImageValid = action.payload.user.avatar
            }
        },
        [checkIsUserAuth.rejected]: state => {
            state.user = null
            state.isLoggedIn = false
        },
        [logoutUser.fulfilled]: state => {
            state.user = null
            state.isLoggedIn = false
            state.avatarImageValid = false
        }
    }
})


export default authSlice.reducer;
export const { changeAvatarImageValid, storeUser, resetUser } = authSlice.actions