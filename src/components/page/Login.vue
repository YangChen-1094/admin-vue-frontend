<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="请输入用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.password"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="vcode">
                    <el-col :span="16">
                    <el-input placeholder="请输入验证码" v-model="param.vcode">
                    </el-input>
                    </el-col>
                    <div :span="8" @click="getVCode(true)">
                         <img :src="identifycode" class="vcode-content"/>
                    </div>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import request from '../../utils/request';
import cookie from 'vue-cookie'
import axios from 'axios'
Vue.prototype.$axios = cookie;
import {AES} from '../../utils/AES' //aes加密
import {Functions} from '../../utils/Functions' //自己封装的方法
import Vue from "vue";
export default {
    data: function() {
        return {
            captchaId:'',//验证码
            identifycode:'',//验证码图片
            param: {
                username: '',
                password: '',
                vcode: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                vcode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
            },
        };
    },
    created() {
        this.getVCode(false)
    },
    methods: {
        submitForm() {
            let enPass = AES.encrypt(this.param.password);
            request.defaults.withCredentials = true;
            request.post('./user/login',{'username':this.param.username,'password':enPass,'vcode':this.param.vcode, 'captchaId' : this.captchaId}).then(res => {
                if(res.code == 200){
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_id', res.data.id);
                    localStorage.setItem('ms_username', this.param.username);

                    let baseParam = {};
                    baseParam.id = res.data.id
                    baseParam.username = res.data.username
                    baseParam.token = res.data.token
                    Functions.setBaseParam(baseParam)
                    this.$router.push('/');//跳转到根目录主页 route/index.js
                }else{
                    this.getVCode(true)
                    this.$message.error(res.msg);
                }
            })
        },
        toTreeNode(data){
            let cloneData = data;
            return cloneData.filter(father=>{
                let branchArr = cloneData.filter(child=>{
                    return father.id == child.pid;
                })
                branchArr.length>0 ? father.children = branchArr : '';
                return father.pid==0;
            });
        },
        getVCode() {
            request.post('./user/captchaId', {}).then(res => {
                let code = res.code
                let data = res.data
                if(code == 200){
                    this.captchaId = data.captchaId;
                    this.identifycode = request.serverBaseUrl + '/webadmins/user/codeImg?captchaId='+this.captchaId;
                }else{
                    this.captchaId = '';
                }
            })
        },
        getVCode1(refresh) {
            // this.identifycode = request.get("./user/vcode")
            this.identifycode = request.serverBaseUrl + '/webadmins/user/vcode';
            if (refresh) {
                this.identifycode = request.serverBaseUrl + '/webadmins/user/vcode?id=' + Math.random();
            }
        }
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background:#607D8B;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #409eff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;width: 400px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}

.vcode-content {
    vertical-align: middle;
    display: inline-block;
    /*margin-left: 5px;*/
    height: 45px;
}
</style>