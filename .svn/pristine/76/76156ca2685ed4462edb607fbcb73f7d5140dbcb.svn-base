<template>
    <div>
        <div class="crumbs">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <div class="crumbs">
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item>
                                    <i class="el-icon-lx-cascades"></i> 用户查询
                                </el-breadcrumb-item>
                                <el-breadcrumb-item>装备列表</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                    </div>
                </el-col>
                
            </el-row>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-row>
                    <el-col :span="2"><div class="grid-content bg-purple" style="line-height:32px;">用户ID：</div></el-col>
                    <el-col :span="4"><el-input v-model="query.uid" placeholder="用户ID,如：usog5G0IhG"></el-input></el-col>
                    <el-col :span="2"><div class="grid-content bg-purple" style="margin-left: 30px;line-height:32px;">用户昵称：</div></el-col>
                    <el-col :span="4"><el-input v-model="query.userName" placeholder="用户昵称"></el-input></el-col>
                    <el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="handleSearch">查询</el-button>
                </el-row>
                
            </div>
            <el-table :data="table_data" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="55" align="center">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column label="装备ID" align="center">
                    <template slot-scope="scope">{{scope.row.troopid}}</template>
                </el-table-column>
                <el-table-column label="装备唯一ID" align="center">
                    <template slot-scope="scope">{{scope.row.tuid}}</template>
                </el-table-column>
                <el-table-column label="装备名称">
                    <template slot-scope="scope">{{scope.row.itemName}}</template>
                </el-table-column>
                <el-table-column label="经验">
                    <template slot-scope="scope">{{scope.row.exp}}</template>
                </el-table-column>
                <el-table-column label="等级">
                    <template slot-scope="scope">{{scope.row.level}}</template>
                </el-table-column>
                <el-table-column label="属性类型">
                    <template slot-scope="scope">{{scope.row.propType}}</template>
                </el-table-column>
                <el-table-column label="属性等级">
                    <template slot-scope="scope">{{scope.row.propLevel}}</template>
                </el-table-column>
                <el-table-column label="最后更新时间">
                     <template slot-scope="scope">{{scope.row.updatetime}}</template>
                </el-table-column>

            </el-table>
            
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.page"
                    :page-size="query.pageNum"
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
export default {
    name: 'proptable',
   
    data() {
        return {
            query: {
                uid:"",
                userName:"",
                getCount:0,
                page: 1,    //当前页
                pageNum: 15 //每页显示的数量
            },
            table_data: [],
            page_total: 0,
        };
    },
    created() {
        if (this.$route.query.uid != null){
             this.query.uid = this.$route.query.uid;
            this.handleSearch();
        }
        this.getData(1);
    },
    methods: {
        getData(getCount) {
            let that = this;
            if (getCount ==1){
                this.query.getCount = 1;
            }
            request.post('./troopQuery',this.query).then(res => {
                that.table_data = res.data.list;
                // console.log(list);
                if (res.data.count != null){
                    that.page_total = parseInt(res.data.count);
                }
            })
        },
        // 触发搜索按钮
        handleSearch() {
            if (this.query.uid == "" && this.query.userName == ""){
                this.$message.error("查询参数不能为空!");
                return;
            }
            this.$set(this.query, 'page', 1);
            this.getData();
        },


        // 分页导航
        handlePageChange(val) {
            this.query.getCount = 0;
            this.$set(this.query, 'page', val);
            this.getData();
        },

    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}

.mr10 {
    margin-right: 10px;
}
.el-divider--horizontal{display:block;height:1px;width:100%;margin:12px 0}
</style>
