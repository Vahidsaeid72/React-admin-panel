import axios from "axios";
import config from "./config.json";

const httpServices = (url , method , params=null) => {

    const tokenInfo = JSON.parse(localStorage.getItem('loginToken'))
    return axios({
        url :config.onlineApi+url,
        method,
        params,
        headers: {
            Authorization: tokenInfo ? `Bearer  ${tokenInfo.token}` : null,
            "content-type": "application/json"
        }
    })
}

export default httpServices;
