<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 订单查询
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.status" placeholder="订单状态" class="handle-select mr10">
                    <el-option :key="-1" label="全部" :value="-1"></el-option>
                    <el-option :key="0" label="支付中..." :value="0"></el-option>
                    <el-option :key="1" label="支付成功" :value="1"></el-option>
                    <el-option :key="2" label="发货成功" :value="2"></el-option>
                    <el-option :key="3" label="超时取消" :value="3"></el-option>
                    <el-option :key="4" label="用户取消" :value="4"></el-option>
                </el-select>
                <el-input v-model="query.orderId" placeholder="订单号" class="handle-input mr10"></el-input>
                <el-input v-model="query.uid" placeholder="用户id" class="handle-input mr10"></el-input>
                <el-input v-model="query.ymd" placeholder="年月日 如：200601,表示2020年6月1日" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            </div>
            <el-table
                :data="table_data"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column width="170" label="订单id"><template slot-scope="scope">{{scope.row.orderId}}</template></el-table-column>
                <el-table-column width="150" label="用户id"><template slot-scope="scope">{{scope.row.uid}}</template></el-table-column>
                <el-table-column width="100" label="appId"><template slot-scope="scope">{{scope.row.appId}}</template></el-table-column>
                <el-table-column width="130" label="实际支付/元"><template slot-scope="scope">{{scope.row.payAmount}}</template></el-table-column>
                <el-table-column width="130" label="订单总金额/元"><template slot-scope="scope">{{scope.row.totalAmount}}</template></el-table-column>
                <el-table-column width="100" label="支付币种"><template slot-scope="scope">{{scope.row.payCurrency}}</template></el-table-column>
                <el-table-column width="170" label="下单时间"><template slot-scope="scope">{{scope.row.createTime}}</template></el-table-column>
                <el-table-column width="170" label="发货时间"><template slot-scope="scope">{{scope.row.sendTime}}</template></el-table-column>
                <el-table-column width="100" label="状态"><template slot-scope="scope"><el-tag :type="scope.row.order_status_tag">{{scope.row.order_status_text}}</el-tag></template></el-table-column>
                <el-table-column width="230" label="中台订单号"><template slot-scope="scope">{{scope.row.payOrderNo}}</template></el-table-column>
                <el-table-column width="120" label="操作" align="center"><template slot-scope="scope"><el-button type="text" icon="el-icon-s-order" @click="orderDetail(scope.$index, scope.row)" >详情</el-button></template></el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="query.page_index"
                    :page-sizes="[10, 20, 50]"
                    :page-size="query.page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page_total">
            </el-pagination>
        </div>
        <el-dialog
                title=""
                top="5vh"
                :visible.sync="dialogVisible"
                width="5·0%">
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">订单id</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{order_detail.orderId}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">用户uid</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{order_detail.uid}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">appId</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{order_detail.appId}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">乐逗openId</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{order_detail.openId}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">购买点</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{order_detail.productId}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">订单金额</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{order_detail.totalAmount/100}} 元</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">实际支付</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{order_detail.payAmount/100}} 元</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">支付币种</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{order_detail.payCurrency}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">下单时间</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{order_detail.createTime}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">支付时间</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{order_detail.payTime}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">发货时间</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{order_detail.sendTime}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">更新时间</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">{{order_detail.updateTime}}</div></el-col>
            </el-row>
            <el-divider content-position="center"></el-divider>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">订单状态</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light">
                    <el-tag
                            :type="order_detail.order_status_tag"
                    >{{order_detail.order_status_text}}</el-tag>
                </div></el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import request from '../../../utils/request';
let moment = require('moment');
export default {
    name: 'Ordertable',
    data() {
        return {
            query: {
                uid:"",
                orderId:"",
                status: -1,
                ymd:"",
                page_index: 1,
                page_size: 10,
            },
            table_data: [],
            order_detail: [],
            page_total: 0,
            dialogVisible: false
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
            this.query.page_size = size;
            this.getData();
        },
        handleCurrentChange: function(currentPage){
            this.query.page_pre = this.query.page_index;//上一次的页数
            this.query.page_index = currentPage;
            this.getData();
        },
        orderstatus(order_status){
            let order_status_tag  = '',
                order_status_text = '';
            switch (order_status) {
                case "0":
                    order_status_tag = 'info';
                    order_status_text = '支付中...';
                    break;
                case "1":
                    order_status_tag = '';
                    order_status_text = '支付成功';
                    break;
                case "2":
                    order_status_tag = 'success';
                    order_status_text = '发货成功';
                    break;
                case "3":
                    order_status_tag = 'warning';
                    order_status_text = '超时取消';
                    break;
                case "4":
                    order_status_tag = 'warning';
                    order_status_text = '用户取消';
                    break;
                case '-1':
                    order_status_tag = 'info';
                    order_status_text = '全部';
                    break;
            }
            return [order_status_tag,order_status_text];
        },
        getData() {
            let that = this;
            request.post('./orderGetList',this.query).then(res => {
                if(res.code != 0){
                    this.$message({message: res.msg,type: 'fail'});
                    this.query.page_index = this.query.page_pre;
                    return false;
                }
                let list = res.data.list;
                if(list && list.length > 0){
                    list.forEach(function (v,k) {
                        let [order_status_tag,order_status_text] = that.orderstatus(v.status+'');
                        list[k]['order_status_text'] = order_status_text;
                        list[k]['order_status_tag']  = order_status_tag;
                        list[k]['payAmount'] = v.payAmount/100;
                        list[k]['totalAmount'] = v.totalAmount/100;
                        list[k]['createTime'] = v.createTime ? moment(v.createTime*1000).format('YYYY-MM-DD HH:mm:ss') : '';
                        list[k]['sendTime'] = v.sendTime > 0 ? moment(v.sendTime*1000).format('YYYY-MM-DD HH:mm:ss') : '';
                    });
                }

                this.table_data = list;
                this.page_total = res.data.count;
            });

        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'page_index', 1);
            this.getData();
        },
        // 查看详情操作
        orderDetail(index, row) {
            let that = this;
            request.post('./orderGetDetail',{orderId:row.orderId}).then(res => {
                if(res.data){
                    this.dialogVisible = true;
                    res.data.createTime = res.data.createTime > 0 ? moment(res.data.createTime*1000).format('YYYY-MM-DD HH:mm:ss') : '';
                    res.data.payTime = res.data.payTime > 0 ? moment(res.data.payTime*1000).format('YYYY-MM-DD HH:mm:ss'): '无';
                    res.data.sendTime = res.data.sendTime > 0 ? moment(res.data.sendTime*1000).format('YYYY-MM-DD HH:mm:ss'): '无';
                    res.data.updateTime = res.data.updateTime > 0 ? moment(res.data.updateTime*1000).format('YYYY-MM-DD HH:mm:ss'): '无';
                    let [order_status_tag,order_status_text] = that.orderstatus(res.data.status+'');
                    res.data.order_status_text = order_status_text;
                    res.data.order_status_tag  = order_status_tag;
                    this.order_detail = res.data;
                }
            })
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
</style>
