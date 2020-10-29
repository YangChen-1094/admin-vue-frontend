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
                                <el-breadcrumb-item>城建列表</el-breadcrumb-item>
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
                <el-table-column label="建筑ID" align="center">
                    <template slot-scope="scope">{{scope.row.landid}}</template>
                </el-table-column>
                <el-table-column label="建筑类型">
                    <template slot-scope="scope">{{scope.row.itemName}}</template>
                </el-table-column>
                <el-table-column label="等级">
                    <template slot-scope="scope">{{scope.row.level}}</template>
                </el-table-column>
                <el-table-column label="是否在升级">
                    <template slot-scope="scope">{{scope.row.upgrade}}</template>
                </el-table-column>
                <el-table-column label="资源1可收集信息">
                    <template slot-scope="scope">{{scope.row.resourcenum1}}</template>
                </el-table-column>
                <el-table-column label="资源1类型">
                    <template slot-scope="scope">{{scope.row.resourcetype1}}</template>
                </el-table-column>
                <el-table-column label="资源2可收集信息">
                    <template slot-scope="scope">{{scope.row.resourcenum2}}</template>
                </el-table-column>
                <el-table-column label="资源2类型">
                    <template slot-scope="scope">{{scope.row.resourcetype2}}</template>
                </el-table-column>
                <el-table-column label="升级截止时间" width="160px">
                     <template slot-scope="scope">{{scope.row.upgradefinishtime}}</template>
                </el-table-column>
                <el-table-column label="最近收集时间" width="160px">
                     <template slot-scope="scope">{{scope.row.recentcollecttime}}</template>
                </el-table-column>
                <el-table-column label="用户最近收集时间" width="160px">
                     <template slot-scope="scope">{{scope.row.userlastcollecttime}}</template>
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

            request.post('./townQuery',this.query).then(res => {
                if(res.code==200){
                    let list = res.data.list;
                    list.forEach(function (v,k) {
                        if (list[k]['upgrade']== 1){
                            list[k]['upgrade'] = '是';
                        }else{
                            list[k]['upgrade'] = '否';
                        }
                    });
                    that.table_data = list;
                }
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
