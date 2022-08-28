import axios from "axios";
import { Alert } from "../utils/alert";
import config from "./config.json";

axios.interceptors.response.use((res)=>{
    if (res.status != 200 && res.status != 201) {
        Alert("مشکل...!", res.data.message, "warning");
    }
    return res
},(error)=>{
    Alert(error.response.status, "مشکلی رخ داده است", "error");
    return Promise.reject(error)
})

const httpServices = (url , method , data=null) => {

    const tokenInfo = JSON.parse(localStorage.getItem('loginToken'))
    return axios({
        url :config.onlineApi+url,
        method,
        data,
        headers: {
            Authorization: tokenInfo ? `Bearer  ${tokenInfo.token}` : null,
            "content-type": "application/json"
        }
    })
}

export default httpServices;
