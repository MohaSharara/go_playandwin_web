import axios from "axios";
import Tools from "./Tools";

const delay_fn = (n) => new Promise(r => setTimeout(r, n));

async function getDeviceId() {
    let device_id = localStorage.getItem('device-id')
    if (device_id == null) {
        device_id = Tools.setBrowserFingerprint()
        if (!device_id) {
            await delay_fn(1000);
            device_id = localStorage.getItem('device-id')
        }
        if (!device_id) {
            device_id = localStorage.getItem('device-id')
            // location.reload();
        }
    }
    return device_id
}

const headers = {
    'app-version': 1,
    'device-type': "web",
    'device-id':await getDeviceId(),
    'operator-auth-token': Tools.getInitialOperatorCode(),
    'auth-token': sessionStorage.getItem('auth-token'),
}

let CurrentOperator = Tools.getInitialOperatorCode();
let baseURL = "https://apis.goplayandwin.com/api/" + CurrentOperator
// let baseURL = process.env.BaseUrl + CurrentOperator

const Request = axios.create({
    baseURL: baseURL,
    timeout: 60000,
    headers: headers,
});


Request.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default Request;