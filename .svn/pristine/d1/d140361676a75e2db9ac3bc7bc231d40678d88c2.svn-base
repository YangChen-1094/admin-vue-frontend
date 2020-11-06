<template>
    <div>
        <div class="crumbs">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <div class="crumbs">
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item>
                                    <i class="el-icon-lx-cascades"></i> 邮件配置
                                </el-breadcrumb-item>
                                <el-breadcrumb-item>已收邮件查询</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
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
               
                <el-table-column label="用户UID" width="150px">
                    <template slot-scope="scope">{{scope.row.uid}}</template>
                </el-table-column>
                <el-table-column prop="title" label="标题"  width="300px">
                    <template slot-scope="scope">{{scope.row.title}}</template>
                </el-table-column>
                <el-table-column label="领取资源"  width="450px">
                    <template slot-scope="scope">
                        {{scope.row.resource_list}}<br>
                        {{scope.row.props_list}}<br>
                        {{scope.row.hero_list}}
                    </template>
                </el-table-column>
                <el-table-column prop="received_time" label="领取时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-s-order"
                            @click="handleDetail(scope.$index, scope.row)"
                        >邮件详情</el-button>
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
                <el-col :span="8"><div class="grid-content bg-purple">用户openid_list：</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{mail_detail.openid_list}} </div></el-col>
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
            request.post('./getUserMailList',this.query).then(res => {
                if(res.code==200){
                    this.table_data = res.data.list;
                    this.page_total = res.data.count;
                }
            })
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'page', 0);
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
                // console.log(item);
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
.cell{text-align: left;}
</style>
