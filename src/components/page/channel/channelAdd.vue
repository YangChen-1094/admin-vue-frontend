<template>
    <div>
        <el-row>
            <el-col :span="22">
                <div class="grid-content bg-purple">
                    <div class="crumbs">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item>
                                <i class="el-icon-lx-cascades"></i> 添加邮件
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple-light">
                    <el-button type="primary" @click="$router.go(-1)">返回上一页</el-button>
                </div>
            </el-col>
        </el-row>

        <div class="container">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="文件">
                    <el-col :span="5">
                        <input type="file" @change="handleFileChange">
                    </el-col>
                </el-form-item>
                <el-form-item label="操作">
                    <el-button type="primary" @click="goUpload">确认上传</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import request from '../../../utils/request';
let axios = require('axios');
export default {
    name: 'channelAdd',
    data() {
        return {
            formData:{},
            form:{

            }
        };
    },
    created() {
        this.formData = new FormData();
    },
    methods: {
        handleFileChange(e){
            this.formData.append('channelFile',e.target.files[0]);
        },
        goUpload(){
            let that = this;
            let baseParam = localStorage.getItem("baseParam");
            let token = ""
            if(baseParam){//要带上jwt，不然验证不通过
                token = JSON.parse(baseParam).token
            }
            axios({
                method: 'post',
                url: request.serverBaseUrl+'/webadmins/channel/import',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'multipart/form-data',
                    'token' : token
                },
                data: that.formData,
            }).then(function(res) {
                if(res.data.code==200){
                    that.$message({message: res.data.msg,type: 'success'});
                }else{
                    that.$message.error(res.data.msg);
                }
            });
        },

    }
};
</script>
<style scoped>

</style>
