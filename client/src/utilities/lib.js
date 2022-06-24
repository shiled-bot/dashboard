import store from "redux/store"
import axios from "axios";
import { handleUnauthorizedError, onDownloadProgress } from "./handlers"
import { changeProgress, changeLoadingState } from "redux/slices/appSlice"


export class ApiRequest {
    constructor(baseURL, basicConfig = {}, trackProgress = false) {
        this.baseURL = baseURL
        this.basicConfig = basicConfig
        this.trackProgress = trackProgress

        if (trackProgress) {
            store.dispatch(changeProgress(0))
            store.dispatch(changeLoadingState(false));
            this.basicConfig = {
                ...this.basicConfig,
                onDownloadProgress
            }
        }
    }

    async get(apiRoute, config = {}, navigate = null) {
        if (this.trackProgress) {
            store.dispatch(changeLoadingState(true));
            // added timeout so it animates on initialization
            setTimeout(() => store.dispatch(changeProgress(15)), 150)
        }


        try {
            const res = await axios.get(
                this.baseURL + apiRoute,
                { ...this.basicConfig, ...config }
            )

            return res
        } catch (err) {
            store.dispatch(changeLoadingState(false))

            if (navigate !== null) {
                handleUnauthorizedError(err, navigate)
            }

            return err;
        }
    }
}



