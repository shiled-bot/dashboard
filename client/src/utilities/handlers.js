import store from "redux/store.js"
import { resetUser } from "../redux/slices/authSlice"
import { changeLoadingState, changeProgress } from "redux/slices/appSlice";

export const handleUnauthorizedError = (err, navigate, callback) => {
    if (!err || !err.response) return;
    if (err.response.status !== 401) return;

    store.dispatch(resetUser())
    navigate("/")
    if (callback) callback(err)
}

export const onDownloadProgress = (progressEvent) => {
    const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
    );

    store.dispatch(changeProgress(percentage))

    if (percentage === 100) {
        setTimeout(() => {
            store.dispatch(changeProgress(0))
            store.dispatch(changeLoadingState(false));
        }, 400);
    }
}