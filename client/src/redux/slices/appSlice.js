import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    progress: 0
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        changeLoadingState(state, action) {
            state.loading = action.payload
        },
        changeProgress(state, { payload: progress }) {
            state.progress = progress
        }
    }
})

export default appSlice.reducer
export const { changeLoadingState, changeProgress } = appSlice.actions