import axios from 'axios';
import Qs from 'qs'
import router from '../router';
import Vue from "vue";

let that = this;
const getHost = function () {
    let host = window.location.host;
    let protocol = window.location.protocol;
    return protocol+'//'+host;
}
//let serverBaseUrl = 'http://10.72.17.71:9999';
//let serverBaseUrl = 'http://10.72.17.71:8888';
//let serverBaseUrl = 'http://10.100.0.83:6899';
//let serverBaseUrl = 'http://10.72.17.162:93';
//let serverBaseUrl = 'http://192.168.106.61:8080';
let serverBaseUrl = getHost();
// let serverBaseUrl = Vue.prototype.baseUrl;
const service = axios.create({
    //process.env.NODE_ENV === 'development',
    'Access-Control-Allow-Credentials':true,
    withCredentials:true,
    method: 'post',
    baseURL: serverBaseUrl+'/webadmins/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // "Set-Cookie": "SameSite=None; Secure"
    },
    transformRequest: [function (data) {
        return Qs.stringify(data)
    }],
});
service.interceptors.request.use(
    config => {
        let baseParam = localStorage.getItem("baseParam");
        if(baseParam){
            config.headers.token = JSON.parse(baseParam).token
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.data.code==1001) {
            localStorage.removeItem('ms_id');
            localStorage.removeItem('ms_username');
            router.replace({
                path: 'login',
                query: {redirect: router.currentRoute.fullPath}
            })
        }

        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);
service.serverBaseUrl = serverBaseUrl;
export default service;
