<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">欢迎登录冒险与谜题管理系统</div>
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
                         <img :src="identifycode" class="vcode-content"></img>
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
Vue.prototype.$axios = cookie;
import { JSEncrypt } from 'jsencrypt'
import Vue from "vue";
export default {
    data: function() {
        return {
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
            publicKey:'-----BEGIN PUBLIC KEY-----\n' +
                    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoH64T5xm5KTs31rR0I0Pqgzfx\n' +
                    'spiB9bmTGShXVk1e668haV4cJTwZL2KP9/GxwXFdjXkaEblK9ee8Jagt+54qqyzj\n' +
                    'b+cJQ79YQoGmEgOdrQm5j7ygssmo/mWe9ilQLSSIMbejTe50aTcoJWRWXoof0J2W\n' +
                    'tx6kfnlNBh/ox5sAnwIDAQAB\n' +
                    '-----END PUBLIC KEY-----'
        };
    },
    created() {
        this.getVCode(false)
    },
    methods: {
        submitForm() {
            let enpassword = this.encryptedData(this.param.password);
            request.defaults.withCredentials = true;
            console.log('login:', document.cookie);
            request.post('./user/login',{'username':this.param.username,'password':enpassword,'vcode':this.param.vcode}).then(res => {
                if(res.code == 200){
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    //let treeNode = this.toTreeNode(res.data.role_info);
                    //console.log('树形结构',res.data.role_info,treeNode);
                    this.$router.push('/');
                }else{
                    this.getVCode(true)
                    this.$message.error(res.msg);
                }
            })
        },
        //  加密
        encryptedData(data) {
            let encryptor = new JSEncrypt();
            encryptor.setPublicKey(this.publicKey);
            return encryptor.encrypt(data);
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
        getVCode(refresh) {
            // this.identifycode = request.get("./user/vcode")
            this.identifycode = request.serverBaseUrl + '/webadmins/user/vcode';
            if (refresh) {
                this.identifycode = request.serverBaseUrl + '/webadmins/user/vcode?id=' + Math.random();
                console.log('刷新vcode1:', document.cookie);
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
    top: 50%;
    width: 400px;
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