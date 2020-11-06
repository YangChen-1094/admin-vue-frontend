<template>
    <div>
        <div class="crumbs">
            <el-row>
                <el-col :span="18">
                    <div class="grid-content bg-purple">
                        <div class="crumbs">
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item>
                                    <i class="el-icon-lx-cascades"></i> 邮件配置
                                </el-breadcrumb-item>
                                <el-breadcrumb-item>邮件列表</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <router-link to="/mailEdit" class="router-btn">
                            <el-button type="primary">添加邮件</el-button>
                        </router-link>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.title" placeholder="邮件标题" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            </div>
            <el-table
                :data="table_data"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="mailid" label="ID" width="55" align="center">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column label="邮件类型" align="center">
                    <template slot-scope="scope">{{scope.row.type_text}}</template>
                </el-table-column>
                <el-table-column label="邮件子类型">
                    <template slot-scope="scope">{{scope.row.subtype_text}}</template>
                </el-table-column>
                <el-table-column prop="title" label="标题"  width="200px">
                    <template slot-scope="scope">{{scope.row.title}}</template>
                </el-table-column>
                <el-table-column label="用户uid列表"  width="350px">
                    <template slot-scope="scope">{{scope.row.uid_list}}</template>
                </el-table-column>
                <el-table-column prop="add_time" label="添加时间"></el-table-column>
                <el-table-column prop="start_time" label="开始时间"></el-table-column>
                <el-table-column prop="end_time" label="结束时间"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-s-order"
                            @click="handleDetail(scope.$index, scope.row)"
                        >详情</el-button><br>
                        <el-button
                            type="text"
                            icon="el-icon-s-order"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑有效期</el-button><br>
                        <el-button
                            type="text"
                            icon="el-icon-s-order"
                            @click="handlePush(scope.$index, scope.row)"
                        >推送</el-button>
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
        <!-- 邮件详情 -->
        <el-dialog title="" top="5vh" :visible.sync="dialogVisible" width="60%" :data="mail_detail">
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">邮件类型：</div></el-col>
                <el-col :span="16">
                    <div class="grid-content bg-purple-light">
                        <el-tag :type="mail_detail.type_tag" >{{mail_detail.type_text}}</el-tag>
                    </div>
                </el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">邮件子类型：</div></el-col>
                <el-col :span="16">
                    <div class="grid-content bg-purple-light">
                        <el-tag :type="mail_detail.subtype_tag" >{{mail_detail.subtype_text}}</el-tag>
                    </div>
                </el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>

            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">图标：</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{mail_detail.icon}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">渠道：</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{mail_detail.channel}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">区域：</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{mail_detail.area}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">用户uid_list：</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{mail_detail.uid_list}} </div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">标题：</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{mail_detail.title}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">内容：</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{mail_detail.content}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">链接地址：</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{mail_detail.link_url}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">创建时间</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{mail_detail.add_time}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">开始时间</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{mail_detail.start_time}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">截止时间</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{mail_detail.end_time}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            
        </el-dialog>


         
    </div>
</template>

<script>
import request from '../../../utils/request';
let moment = require('moment');
export default {
    name: 'Mailtable',
    data() {
        return {
            query: {
                title:"",
                getCount:0,
                page: 1,    //当前页
                pageNum: 15 //每页显示的数量
            },
            table_data: [],
            mail_detail: [],
            page_total: 0,
            dialogVisible: false
        };
    },
    created() {
        this.getData(1);
    },
    methods: {
        mailType(type){
            let type_tag  = '', type_text = '';
            switch (type) {
                case 1:
                    type_tag = 'all';
                    type_text = '全推邮件';
                    break;
                case 2:
                    type_tag = 'batch';
                    type_text = '批量邮件';
                    break;
            }
            return [type_tag,type_text];
        },
        mailSubType(subtype){
            let type_tag  = '',
                type_text = '';
            switch (subtype) {
                case 1:
                    type_tag = 'notice';
                    type_text = '公告邮件';
                    break;
                case 2:
                    type_tag = 'compensation';
                    type_text = '补偿邮件';
                    break;
                case 3:
                    type_tag = 'investigation';
                    type_text = '调查问卷';
                    break;
                case 4:
                    type_tag = 'others';
                    type_text = '其它';
                    break;
            }
            return [type_tag,type_text];
        },
        getData(getCount) {
            let that = this;
            if (getCount ==1){
                this.query.getCount = 1;
            }
            request.post('./getMailList',this.query).then(res => {
                if(res.code==200){
                    let list = res.data.list;
                    list.forEach(function (v,k) {
                        let [type_tag,type_text] = that.mailType(v.type);
                        let [subtype_tag,subtype_text] = that.mailSubType(v.subtype);
    
                        list[k]['type_text'] = type_text;
                        list[k]['type_tag']  = type_tag;
                        list[k]['subtype_text'] = subtype_text;
                        list[k]['subtype_tag']  = subtype_tag;
                       
                    });
                    this.table_data = list;
                    this.page_total = res.data.count;
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
            request.post('./mailInfo',{mailid:row.mailid}).then(res => {
                let item = res.data.data;
                let [type_tag,type_text] = that.mailType(item.type);
                let [subtype_tag,subtype_text] = that.mailSubType(item.subtype);

                item.type_text = type_text;
                item.type_tag  = type_tag;
                item.subtype_text = subtype_text;
                item.subtype_tag  = subtype_tag;
                this.mail_detail = item;
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
             this.$router.push({ path: 'mailEdit', query: { id: row.mailid }})
        },
        handlePush(index, row){
            let query={ mailId: row.mailid };
            request.post('./pushMail',query).then(res => {
                    if(res.code==200){
                        this.$message({message: '操作成功',type: 'success'});
                    }else{
                        this.$message.error(res.msg);
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
.el-table .cell{text-align: left;}
</style>
