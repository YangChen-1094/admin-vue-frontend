<template>
    <div>
        <el-row>
            <el-col :span="18">
                <div class="grid-content bg-purple">
                    <div class="crumbs">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item>
                                <i class="el-icon-lx-cascades"></i> 基础配置
                            </el-breadcrumb-item>
                            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <el-button type="primary" @click="handleAdd">添加商品</el-button>
                    <el-button type="success" @click="redisStatus">更新至缓存</el-button>
                    <el-button type="info" @click="redisLog">缓存日志</el-button>
                </div>
            </el-col>
        </el-row>
        <div class="container">
            <el-table
                :data="table_data"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="ID" width="50" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column prop="product_id" label="商品id" width="150" align="center">
                    <template slot-scope="scope">{{scope.row.product_id}}</template>
                </el-table-column>
                <el-table-column prop="name" label="商品名称" width="150" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column prop="price" label="价格" width="150" align="center">
                    <template slot-scope="scope">{{scope.row.price/100}}</template>
                </el-table-column>
                <el-table-column prop="rebate" label="返利比例" width="150" align="center">
                    <template slot-scope="scope">{{scope.row.rebate}}%</template>
                </el-table-column>
                <el-table-column prop="resource" label="资源列表" width="300" align="center">
                    <template slot-scope="scope">{{scope.row.resource}}</template>
                </el-table-column>
                <el-table-column prop="prop" label="道具列表" width="300" align="center">
                    <template slot-scope="scope">{{scope.row.prop}}</template>
                </el-table-column>

                <el-table-column prop="status" label="状态" width="100" align="center"
                                 :filters="[{ text: '在售', value: 0 }, { text: '下架', value: 1}]"
                                 :filter-method="filterStatus"
                filter-placement="bottom-end">
                    <template slot-scope="scope">{{aStatus[scope.row.status]}}</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >修改</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete-solid"
                                @click="handleStatus(scope.$index, scope.row, 0)"
                        >上架</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete-solid"
                                @click="handleStatus(scope.$index, scope.row, 1)"
                        >下架</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="upStatus"
            width="30%">
            <span>确认要 上架/下架 ？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="upStatus = false">取 消</el-button>
            <el-button type="primary" @click="confirmUpOrDown">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
                title="警告"
                :visible.sync="rollStatus"
                width="30%">
            <span>确认要回滚 【id:{{rollId}}】中的“旧数据” 至 缓存吗？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="rollStatus = false">取 消</el-button>
            <el-button type="primary" @click="rollback(rollId)">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="rStatus"
                width="30%">
            将会影响当前环境，确认要把当前配置<span style="color:red;">更新至缓存</span>？
            <span slot="footer" class="dialog-footer">
            <el-button @click="rStatus = false">取 消</el-button>
            <el-button type="primary" @click="setRedis">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
                title="编辑商品"
                top="5vh"
                :visible.sync="editVisible"
                width="40%">
            <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item label="中台商品id">
                    <el-input v-model="editData.id"  v-show="false"></el-input>
                    <el-col :span="10">
                        <el-input v-model="editData.product_id" placeholder="请输入中台商品id"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-col :span="10">
                        <el-input v-model="editData.name" placeholder="请输入商品名称"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-col :span="10">
                        <el-input v-model="editData.price" placeholder="请输入价格，分为单位"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="返利比例">
                    <el-col :span="10">
                        <el-input v-model="editData.rebate" placeholder="请输入返利比例"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="商品类型">
                    <el-col :span="20">
                        <el-col :span="10">
                            <el-select placeholder="请选择" v-model="editData.type">
                                <el-option v-for="(val, type) in aType" :label="val"
                                           :key="type" :value="type">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-col>
                </el-form-item>
                <el-form-item label="状态">
                    <el-col :span="20">
                        <el-col :span="10">
                            <el-select placeholder="请选择" v-model="editData.status">
                                <el-option v-for="(val, status) in aStatus" :label="val"
                                           :key="status" :value="status">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-col>
                </el-form-item>
                <el-form-item label="资源列表">
                    <el-col class="lk-toolbar" :span="70" v-for = "(item, key) in editData.resource" :key="key" >
                        <el-col :span="10">
                            <el-select  :name="resource['id']" placeholder="请选择" clearable v-model="item.id">
                                <el-option v-for="thisItem in baseData.resource" :label="('【' + thisItem.id + '】' + thisItem.name)"
                                        :key="thisItem.id" :value="thisItem.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5"><el-input v-model="item.num" :name="resource['num']"  placeholder="数量"></el-input></el-col>
                        <el-col :span="25"><el-button type="primary" round @click="addResource">增加</el-button><el-button type="danger" round  @click="delResource(key)">删除</el-button></el-col>
                    </el-col>
                </el-form-item>
                <el-form-item label="道具列表">
                    <el-col class="lk-toolbar" :span="70" v-for = "(item, key) in editData.prop" :key="key">
                        <el-col :span="10">
                            <el-select  :name="prop['id']" placeholder="请选择" clearable v-model="item.id">
                                <el-option v-for="thisItem in baseData.item" :label="('【' + thisItem.id + '】' + thisItem.name)"
                                           :key="thisItem.id" :value="thisItem.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5"><el-input v-model="item.num" :name="prop['num']"  placeholder="数量"></el-input></el-col>
                        <el-col :span="25"><el-button type="primary" round @click="addProp">增加</el-button><el-button type="danger" round  @click="delProp(key)">删除</el-button></el-col>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="缓存日志" top="5vh"
                :visible.sync="redisLogVisible" width="85%">
                <el-table :data="redisLogData" height="650" border style="width: 100%">
                    <el-table-column prop="id" label="ID" width="50"></el-table-column>
                    <el-table-column prop="Ymd" label="日期" width="80"></el-table-column>
                    <el-table-column prop="His" label="时间" width="65"></el-table-column>
                    <el-table-column prop="editor" label="操作人" width="60"></el-table-column>
                    <el-table-column prop="old_data" label="旧数据" width="550"></el-table-column>
                    <el-table-column prop="new_data" label="新数据" width="550"></el-table-column>
                    <el-table-column label="回滚" width="100" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    type="danger" round
                                    @click="rollbackStatus(scope.row.id)"
                            >回滚此项</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="redisLogVisible = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import request from '../../../utils/request';
export default {
    name: 'productList',
    data() {
        return {
            labelPosition: 'left',
            baseData : [],
            table_data: [],
            id: "",
            product_id: "",
            name: "",
            price: 0,
            rebate: 0,
            type: 0,
            resource: [],
            prop: [],
            status: -1,
            aStatus : { 0 :"在售", 1:'下架'},
            aType : { 0 :"钻石", 1:'其他'},
            upStatus : false,
            rStatus : false,
            rollStatus: false,
            rollId: 0,

            editVisible: false,
            redisLogVisible: false,
            redisLogData: [],
            editData: [],

            addDialogVisible: false,
            delDialogVisible: false,
            row: [],
            resource_index : 0,
            prop_index : 0,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        filterStatus(value, row){
            return row.status == value;
        },
        addResource() {
            this.editData.resource.push({id: '', num: ''})
        },
        delResource(key) {
            if(this.editData.resource.length <= 1){
                this.$message.error('必须保留一个元素');
                return false;
            }
            this.editData.resource.splice(key, 1)
        },
        addProp() {
            this.editData.prop.push({id: '', num: ''})
        },
        delProp(key) {
            if(this.editData.prop.length <= 1){
                this.$message.error('必须保留一个元素');
                return false;
            }
            this.editData.prop.splice(key, 1)
        },
        getData() {
            request.post('./getProductList',{status: this.status}).then(res => {
                this.table_data = res.data;
            });
            request.post('./getResPropList').then(res => {
                this.baseData = res.data;
            });
        },
        confirmUpOrDown() {
            request.post('./setProductStatus',{product_id:this.row.product_id, status: this.status}).then(res => {
                let sourceStatus = parseInt(this.row.status);
                if(sourceStatus === this.status){
                    this.$message.error('状态无变化');
                    this.upStatus = false;
                    return false;
                }
                if(res.code==200){
                    this.$message({message: '操作状态成功',type: 'success'});
                    this.status = -1;
                    this.getData();
                }else{
                    this.$message.error('删除失败');
                }
                this.upStatus = false;
            })
        },
        handleAdd(){
            this.editData = {
                prop : [{id:'', num:''}],
                resource : [{id:'', num:''}],
            };
            this.editVisible = true
        },
        handleEdit(index, row){
            this.editData = {
                id : row.id,
                name : row.name,
                product_id : row.product_id,
                price : row.price,
                rebate : row.rebate,
                type : row.type,
                status : row.status,
                prop : row.prop.length ? row.prop : [{id:'', num:''}],
                resource : row.resource.length ? row.resource : [{id:'', num:''}],
            };
            this.editVisible = true
        },
        rollbackStatus(id){
            this.rollStatus = true;
            this.rollId = id;
        },
        rollback(rollId){
            request.post('./rollbackRedis',{id: rollId, action:'product'}).then(res => {
                if(res.code==200){
                    this.$message({message: res.msg,type: 'success'});
                    this.redisLog();
                }else{
                    this.$message({message: res.msg,type: 'fail'});
                }
                this.rollStatus = false;
            })
        },
        confirmEdit(){
            let post = this.editData;
            request.post('./editProduct', post).then(res => {
                if(res.code==200){
                    this.$message({message: '操作成功',type: 'success'});
                    this.status = -1;
                    this.getData();
                }else{
                    this.$message.error('操作失败');
                }
                this.upStatus = false;
            });
            this.editVisible = false
        },
        //上下架
        handleStatus(index, row, status) {
            this.upStatus = true;
            this.status = status;
            this.row = row;
        },
        redisStatus(){
          this.rStatus = true;
        },
        setRedis(){
            request.post('./setRedis',{action:'product'}).then(res => {
                if(res.code==200){
                    this.$message({message: '更新成功',type: 'success'});
                }else if(res.code==201){
                    this.$message.error({message: '数据没变化,不需要重复更新',type: 'success'});
                }else{
                    this.$message.error('更新失败');
                }
                this.rStatus = false;
            })
        },
        redisLog(){
            request.post('./getRedisLog',{action:'product'}).then(res => {
                let data = res.data;
                if(data.length >= 0){
                    this.redisLogVisible = true;
                    this.redisLogData = data;
                }else{
                    this.$message.error('暂无日志');
                }
            })
        }
    }
};
</script>
