<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 系统功能
                </el-breadcrumb-item>
                <el-breadcrumb-item>操作日志查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
                <el-row>
                    <el-col :span="3"><div class="grid-content bg-purple">操作者账号</div></el-col>
                    <el-col :span="10"><el-input v-model="query.operator" placeholder="输入操作人的账号id"></el-input></el-col>
                </el-row>
                <div style="margin: 10px 0px;"></div>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            </div>
        </div>

        <div class="container">
            <el-table
                :data="table_data"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="id" align="center" width="100px">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="操作人" align="center" width="100px">
                    <template slot-scope="scope">{{scope.row.operator}}</template>
                </el-table-column>
                <el-table-column label="模块" align="center">
                    <template slot-scope="scope">{{scope.row.module}}</template>
                </el-table-column>
                <el-table-column label="内容" align="center">
                    <template slot-scope="scope">{{scope.row.log}}</template>
                </el-table-column>
                <el-table-column label="操作者ip" align="center">
                    <template slot-scope="scope">{{scope.row.ip}}</template>
                </el-table-column>
                <el-table-column label="操作时间" align="center">
                    <template slot-scope="scope">{{scope.row.update_time}}</template>
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
var moment = require('moment');
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
            table_data : []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            request.post('./logList', this.query).then(res => {
                if(res.code==200){
                    res.data.list.forEach(function (v,k) {
                        res.data.list[k]['update_time'] = moment(v.add_time*1000).format('YYYY-MM-DD HH:mm:ss');
                    });
                    this.table_data = res.data.list;
                    this.page_total = parseInt(res.data.page_total);
                }
            })
        },
        handleSearch() {
            this.getData();
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'page_index', val);
            this.getData();
        }
    }
};
</script>
