<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 系统功能
                </el-breadcrumb-item>
                <el-breadcrumb-item>PHP执行</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
                <el-row>
                    <el-col :span="2">php代码：</el-col>
                </el-row>
                <el-row>
                    <el-col :span="30"><textarea v-model="code" rows="15" cols="200"></textarea></el-col>
                </el-row>
                <el-row>
                    <el-col :span="2"><el-button @click="doPHPRun">执行</el-button></el-col>
                </el-row><br/><br/>
            </div>
            <div class="handle-box">
                <el-col :span="1"> 返回：</el-col><br/><br/>
                <span style="background: #E0E0E0; color:green;">执行时间：{{runTime}} 秒</span><br/>
                <span style="background: #E0E0E0; " v-html="runRet"></span><br/>
            </div>
        </div>
        <div class="container">
            <div class="handle-box">
                <div class="block">
                    <span class="demonstration">查询日志：</span>
                    <el-date-picker
                            v-model="logYmd"
                            type="daterange"
                            align="left"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                    <el-button @click="getLogData()">查询</el-button>
                </div>
            </div>
            <el-table
                    :data="table_data"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
            >
                <el-table-column label="日期" align="center" width="150px">
                    <template slot-scope="scope">{{scope.row.Ymd}}</template>
                </el-table-column>
                <el-table-column label="时间" align="center" width="150px">
                    <template slot-scope="scope">{{scope.row.His}}</template>
                </el-table-column>
                <el-table-column label="操作者ip" align="center" width="150px">
                    <template slot-scope="scope">{{scope.row.ip}}</template>
                </el-table-column>
                <el-table-column label="执行内容" align="center">
                    <template slot-scope="scope">{{scope.row.code}}</template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.page_index"
                        :page-size="query.page_size"
                        :total="page_total"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import request from '../../../utils/request';
    let moment = require('moment');

    function GMTToYmd(time){
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if(month < 10){
            month = "0" + month;
        }
        if(day < 10){
            day = "0" + day;
        }
        let Str = year+month+day;
        return Str;
    }
    export default {
        name: 'logList',
        data() {
            return {
                query: {
                    page_index: 1,
                    page_size: 20,
                    operator: '',
                },
                page_total: 0,
                table_data : [],
                code : '',
                logYmd: '',
                runTime : 0,//毫秒
                runRet : "",
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            };
        },
        created() {
            this.getLogData();
        },
        methods: {
            getLogData() {

                let logYmd = [GMTToYmd(this.logYmd[0]),GMTToYmd(this.logYmd[1])];
                request.post('./phpLogList', {logYmd : logYmd}).then(res => {
                    let len = res.data.length;
                    if(res.code==200 && len){
                        this.table_data = res.data;
                    }
                })
            },
            doPHPRun(){
                let code = this.code;
                code = code.trim();
                if(!code){
                    this.$message.error('操作失败,请勿输入空代码！');
                    return false;
                }
                request.post('./phpRunCode', {code : this.code}).then(res => {
                    if(res){
                        let data = res.data;
                        if (res.code && res.code != 200){
                            this.$message({message: res.msg,type: 'warning'});
                        }else if(res.code && res.code == 200){
                            this.$message({message: '操作成功',type: 'success'});
                            this.runRet = res.data.info;
                            this.runTime = res.data.runtime;
                        }else{
                            this.$message({message: '可能语法错误，请仔细检查',type: 'warning'});
                        }
                    }else{
                        this.$message.error('操作失败,请仔细检查代码');
                    }

                })
            },
            handleSearch() {
                this.getLogData();
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'page_index', val);
                this.getData();
            },
        }
    };
</script>
