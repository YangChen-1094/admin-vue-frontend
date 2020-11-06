import axios from 'axios';
import Qs from 'qs'
import router from '../router';
import Vue from "vue";
let serverBaseUrl = Vue.prototype.baseUrl;
let that = this;

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
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.data.code==401) {
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
