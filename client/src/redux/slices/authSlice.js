import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    avatarImageValid: false
}

export const checkIsUserAuth = createAsyncThunk("auth/checkIsUserAuth", async (token) => {
    if (!token) return {}

    const res = await axios.get(
        process.env.REACT_APP_API_URL + "/users",
        { headers: { "x-access-token": token } }
    )

    return res.data
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        changeAvatarImageValid(state, action) {
            state.avatarImageValid = action.payload
        },
        changeToken(state, action) {
            state.token = action.payload
            localStorage.setItem("token", action.payload);
        },
        removeToken(state) {
            localStorage.removeItem("token");
            state.token = ""
            state.user = null
            state.avatarImageValid = false
        }
    },
    extraReducers: {
        [checkIsUserAuth.fulfilled]: (state, action) => {
            if (action.payload.isLoggedIn) {
                state.user = action.payload.user;
                state.avatarImageValid = action.payload.user.avatar
            }
        }
    }
})


export default authSlice.reducer;
export const { changeAvatarImageValid, changeToken, removeToken } = authSlice.actions