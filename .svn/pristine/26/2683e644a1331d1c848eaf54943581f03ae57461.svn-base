<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 常用工具
                </el-breadcrumb-item>
                <el-breadcrumb-item>用户数据管理</el-breadcrumb-item>
                <el-breadcrumb-item>数据解密</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
                <el-row>
                    <el-col :span="3"><div class="grid-content bg-purple">加密字符串</div></el-col>
                    <el-col :span="10"><el-input type="textarea" rows="8" v-model="query.encStr"></el-input></el-col>
                </el-row>
                <div style="margin: 10px 0px;"></div>
                <el-row>
                    <el-col :span="3"><div class="grid-content bg-purple">解密字符串</div></el-col>
                    <el-col :span="10"><el-input type="textarea" rows="8" v-model="decodeMsg"></el-input></el-col>
                </el-row>
                <div style="margin: 10px 0px;"></div>
                <el-button type="primary" icon="el-icon-search" @click="decode">解密</el-button>
            </div>
        </div>

    </div>
</template>

<script>
import request from '../../../utils/request';
var moment = require('moment');
export default {
    name: 'toolDecode',
    data() {
        return {
            query: {
                encStr: ''
            },
            decodeMsg : "",
        };
    },
    created() {

    },
    methods: {
        decode() {
            if(this.query.encStr=='') {
                this.$message.error('请输入需要解密的字符串');
                return;
            }

            request.post('./toolDecode', {encStr: this.query.encStr}).then(res => {
                if(res.code==200){
                    this.decodeMsg = res.data;
                }else{
                    this.$message.error('解密失败:' + res.msg);
                }
            })
        },
    }
};
</script>
