<template>
    <div>
        <el-row>
            <el-col :span="22">
                <div class="grid-content bg-purple">
                    <div class="crumbs">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item>
                                <i class="el-icon-lx-cascades"></i> 常用工具
                            </el-breadcrumb-item>
                            <el-breadcrumb-item>API接口测试</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
            </el-col>
        </el-row>

        <div class="container">
            <el-form ref="form" label-width="120px">
                <el-form-item label="API接口列表">
                    <el-select filterable v-model="api"  placeholder="请选择API接口" @change="apiCheck">
                        <el-option
                                v-for="(item,index) in api_select"
                                :key="index"
                                :label="item.api+item.val"
                                :value="item.api+item.param">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="请求方式">
                    <el-select filterable v-model="request_type"  placeholder="请选择请求方式">
                        <el-option
                                v-for="(item,index) in request_type_select"
                                :key="index"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="参数内容">
                    <el-col :span="16">
                        <el-input type="textarea" v-model="content" rows="10"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="confirm">确 定</el-button>
                </el-form-item>
                <el-form-item>
                    <div v-html="apiResponse"></div>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
import request from '../../../utils/request';
import Qs from 'qs'
let axios = require('axios');
export default {
    name: 'apiTest',
    data() {
        return {
            id: "",
            request_type: "POST",
            api_select: [],
            request_type_select: ['POST','GET'],
            api: "",
            content: "",
            apiResponse:""
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            request.post('./system/apitest').then(res => {
                this.api_select = res.data;
            })
        },
        apiCheck(val) {
            let params = val.split('{');
            this.api = params[0];
            this.content = '{'+params[1];
        },
        confirm(){
            let that = this;
            if(!that.content){
                return false;
            }
            let req = JSON.parse(that.content);
            axios({
                method: that.request_type,
                url: request.serverBaseUrl+this.api,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: [function (data) {
                    return Qs.stringify(data)
                }],
                data: req,
            }).then(function(response) {
                that.apiResponse = response.data;
            });
        }
    }
};
</script>
