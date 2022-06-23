import store from "redux/store.js"
import { resetUser } from "../redux/slices/authSlice"


export const handleUnauthorizedError = (err, navigate, callback) => {
    if (err.response.status !== 401) return;

    store.dispatch(resetUser())
    navigate("/")
    if (callback) callback(err)
}
