import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import cookie from 'vue-cookie'
Vue.prototype.$axios = cookie;
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
     //localStorage.setItem('ms_username','test');
    const role = localStorage.getItem('ms_username');
    if(to.path == '/login' && role){
        next('/dashboard');
    } else if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});
axios.defaults.withCredentials=true;//让ajax携带cookie
Vue.prototype.$axios = axios;
function getServerConfig () {
    return new Promise ((resolve, reject) => {
        axios.get('./serverConfig.json').then((result) => {
            //console.log(result)  // 看打印出来的结果
            let config = result.data;
            for (let key in config) {
                Vue.prototype[key] = config[key];
            }
            //console.log(Vue.prototype.baseUrl);  // 验证是否已经把属性挂在了Vue上
            resolve();
        }).catch((error) => {
            console.log(error);
            reject()
        })
    })
}

//
// new Vue({
//     router,
//     i18n,
//     render: h => h(App)
// }).$mount('#app');

async function init() {
    await getServerConfig();
    new Vue({
        router,
        i18n,
        render: h => h(App)  //指向App.vue
    }).$mount('#app');
}

init();


//=== 以下是测试代码======
// function read(content) {
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             resolve(content) //content作为then的成功参数传递，如下的data
//         }, 1000)
//     })
// }
//
// let result = Promise.all([read(1), read(2)]);
// result.then((data) => {
//     console.log(data) //[ 1, 2 ]
// })

// axios.post("/webadmins/user/getSessionInfo", {"session" : "1231312"}).then(function (res) {
//     console.log("success", res)
// }).catch(function (err) {
//     console.log("failed", err)
// });


function read(content) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if(content>4){
                resolve(content)
            }else{
                reject(content)
            }
        }, 1000*content)
    })
}

let result = Promise.all([read(3), read(5), read(2)]);
result.then((data) => {
    console.log('成功'+data)
},(err)=>{
    console.log('失败'+err) //失败2, 如果有一个失败了，就都失败了，返回失败的数据
})