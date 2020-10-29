<template>
    <div>
        <div class="crumbs">
            <el-row>
                <el-col :span="18">
                    <div class="grid-content bg-purple">
                        <div class="crumbs">
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item>
                                    <i class="el-icon-lx-cascades"></i> 公告配置
                                </el-breadcrumb-item>
                                <el-breadcrumb-item>公告列表</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <router-link to="/noticeEdit" class="router-btn">
                            <el-button type="primary">添加公告</el-button>
                        </router-link>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.title" placeholder="公告标题" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            </div>
            <el-table :data="table_data" border class="table" ref="multipleTable" header-cell-class-name="table-header"
>
                <el-table-column prop="id" label="ID" width="55" align="center">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column label="公告类型" align="center">
                    <template slot-scope="scope">{{scope.row.type_text}}</template>
                </el-table-column>
                <el-table-column label="渠道">
                    <template slot-scope="scope">{{scope.row.channel}}</template>
                </el-table-column>
                <el-table-column label="地区">
                    <template slot-scope="scope">{{scope.row.area}}</template>
                </el-table-column>
                <el-table-column prop="title" label="标题"  width="300px">
                    <template slot-scope="scope">{{scope.row.title}}</template>
                </el-table-column>
                <el-table-column prop="content" label="内容"  width="450px">
                    <template slot-scope="scope">{{scope.row.content | ellipsis}}</template>
                </el-table-column>
                <el-table-column prop="content" label="状态" >
                    <template slot-scope="scope">{{scope.row.isopen_text}}</template>
                </el-table-column>
                <el-table-column prop="start_time" label="开始时间"></el-table-column>
                <el-table-column prop="end_time" label="结束时间"></el-table-column>

                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-s-order" @click="handleDetail(scope.$index, scope.row)">详情</el-button><br>
                        <el-button v-if="scope.row.isopen == 0" type="text" icon="el-icon-s-order" @click="handleUpdateOpen(scope.$index, scope.row, 1)">打开</el-button>
                        <el-button v-if="scope.row.isopen == 1" type="text" icon="el-icon-s-order" @click="handleUpdateOpen(scope.$index, scope.row, 0)">关闭</el-button><br>
                        <el-button type="text" icon="el-icon-s-order" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
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
        
        <el-dialog title="" top="5vh" :visible.sync="dialogVisible" width="60%" :data="notice_detail">
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">公告类型：</div></el-col>
                <el-col :span="16">
                    <div class="grid-content bg-purple-light">
                        <el-tag :type="notice_detail.type_tag" >{{notice_detail.type_text}}</el-tag>
                    </div>
                </el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>

            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">渠道：</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{notice_detail.channel}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">区域：</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{notice_detail.area}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">标题：</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{notice_detail.title}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">内容：</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{notice_detail.content}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">状态：</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{notice_detail.isopen_text}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">创建时间</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{notice_detail.add_time}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">更新时间</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{notice_detail.update_time}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            
        </el-dialog>


         
    </div>
</template>

<script>
import request from '../../../utils/request';
let moment = require('moment');
export default {
    name: 'Noticetable',
    filters:{
        //超过20位显示...
        ellipsis: function(value) {
            if (!value) return "";
            if (value.length > 30) {
                return value.slice(0, 30) + "...";
            }
            return value;
        }
    },
    data() {
        return {
            query: {
                title:"",
                getCount:0,
                page: 1,    //当前页
                pageNum: 15 //每页显示的数量
            },
            table_data: [],
            notice_detail: [],
            page_total: 0,
            dialogVisible: false
        };
    },
    created() {
        this.getData(1);
    },
    methods: {
        noticeType(type){
            let type_tag  = '', type_text = '';
            switch (type) {
                case 1:
                    type_tag = 'stop_server';
                    type_text = '停服公告';
                    break;
                case 2:
                    type_tag = 'notice';
                    type_text = '游戏内公告';
                    break;
            }
            return [type_tag,type_text];
        },
        getData(getCount) {
            let that = this;
            if (getCount ==1){
                this.query.getCount = 1;
            }
            request.post('./getNoticeList',this.query).then(res => {
                if(res.code==200){
                    let list = res.data.list;
                    list.forEach(function (v,k) {
                        
                        let [type_tag,type_text] = that.noticeType(parseInt(v.type));
                        list[k]['type_text'] = type_text;
                        list[k]['type_tag']  = type_tag;
                        list[k]['id'] = parseInt(v.id);

                        if (list[k]['isopen'] ==1){
                            list[k]['isopen_text'] = "打开"
                        }else{
                            list[k]['isopen_text'] = "关闭"
                        }
                       
                    });
                    this.table_data = list;
                }
                if (res.data.count != null){
                    this.page_total = parseInt(res.data.count);
                }
            })
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'page', 1);
            this.getData();
        },
        // 查看详情操作
        handleDetail(index, row) {
            this.dialogVisible = true;
            let that = this;
            request.post('./noticeInfo',{noticeId:row.id}).then(res => {
                if(res.code==200){
                    let item = res.data.data;
                    let [type_tag,type_text] = that.noticeType(parseInt(item.type));
    
                    item.type_text = type_text;
                    item.type_tag  = type_tag;
                    if (item.isopen ==1){
                        item.isopen_text = "打开"
                    }else{
                        item.isopen_text = "关闭"
                    }

                    // console.log(item);
                    that.notice_detail = item;
                }else{
                    that.$message({dangerouslyUseHTMLString:true, message:res.msg, type:'error'});
                }
            })
        },

        // 分页导航
        handlePageChange(val) {
            this.query.getCount = 0;
            this.$set(this.query, 'page', val);
            this.getData();
        },

        //编辑
        handleEdit(index, row) {
             this.$router.push({ path: 'noticeEdit', query: { id: row.id }});
        },
        //更改打开状态
        handleUpdateOpen(index, row, val) {
            let that = this;
            let param = {
                id:     row.id,
                state: val,
            };
            request.post('./updateState',param).then(res => {
                if(res.code==200){
                    that.table_data.forEach(function (v,k) {
                        if(v.id == row.id){
                            that.table_data[k]['isopen'] = val;
                        }
                        if (that.table_data[k]['isopen'] ==1){
                            that.table_data[k]['isopen_text'] = "打开"
                        }else{
                            that.table_data[k]['isopen_text'] = "关闭"
                        }
                       
                    });
                }else{
                    that.$message({dangerouslyUseHTMLString:true, message:res.msg, type:'error'});
                }
                
            })
        }
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
    font-size: 12px;
}

.mr10 {
    margin-right: 10px;
}
.el-divider--horizontal{display:block;height:1px;width:100%;margin:12px 0}
</style>
