<template>
    <div>
        <el-row>
            <el-col :span="20">
                <div class="grid-content bg-purple">
                    <div class="crumbs">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item>
                                <i class="el-icon-lx-cascades"></i> 管理员账号管理
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">
                    <el-button type="primary" @click="handleAdd">添加账号</el-button>
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
                <el-table-column prop="index" label="序号" align="center">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column label="用户名" align="center">
                    <template slot-scope="scope">{{scope.row.username}}</template>
                </el-table-column>
                <el-table-column label="角色名称" align="center">
                    <template slot-scope="scope"><el-tag type="success" class="role-name" v-for="item in scope.row.role_name">{{item}}</el-tag></template>
                </el-table-column>
                <el-table-column label="邮箱" align="center">
                    <template slot-scope="scope">{{scope.row.email}}</template>
                </el-table-column>
                <el-table-column label="备注" align="center">
                    <template slot-scope="scope">{{scope.row.remark}}</template>
                </el-table-column>
                <el-table-column label="创建时间" align="center">
                    <template slot-scope="scope">{{scope.row.create_time}}</template>
                </el-table-column>
                <el-table-column label="更新时间" align="center">
                    <template slot-scope="scope">{{scope.row.update_time}}</template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >修改</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete-solid"
                                @click="handleDel(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
                title=""
                :visible.sync="addDialogVisible"
                width="40%">
            <el-form ref="form" label-width="120px">
                <el-form-item label="用户账号">
                    <el-col :span="20">
                        <el-input placeholder="请输入用户账号" v-model="form.username"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-col :span="20">
                        <el-input placeholder="请输入用户密码" v-model="form.password"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="确认用户密码">
                    <el-col :span="20">
                        <el-input placeholder="请输入确认用户密码" v-model="form.repassword"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="用户邮箱">
                    <el-col :span="20">
                        <el-input placeholder="请输入用户邮箱" v-model="form.email"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="用户备注">
                    <el-col :span="20">
                        <el-input placeholder="请输入用户备注" v-model="form.remark"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="用户角色">
                    <el-col :span="20">
                        <el-checkbox-group v-model="checkRole">
                            <el-checkbox v-for="(item,index) in role_list" :label="item.id">{{item.role_name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio label="0" v-model="form.locked">正常</el-radio>
                    <el-radio label="1" v-model="form.locked">锁定</el-radio>
                </el-form-item>
                <el-form-item label="操作">
                    <el-col :span="20">
                        <el-button @click="addDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="confirmEdit">确 定</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="delDialogVisible"
            width="30%">
            <span>确认删除？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="delDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmDel">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import request from '../../../utils/request';
let moment = require('moment');
export default {
    name: 'managerList',
    data() {
        return {
            table_data: [],
            role_list: [],
            id:'',
            checkRole:[],
            form:{
                id: "",
                username: "",
                password: "",
                repassword: "",
                email: "",
                remark: "",
                locked: "0",
            },

            delDialogVisible: false,
            addDialogVisible: false,
        };
    },
    created() {
        this.getRoleList();
    },
    methods: {
        //roleList
        getRoleList(){
            request.post('./roleList').then(res => {
                this.role_list = res.data;
                this.getData();
            })
        },
        getData() {
            let that = this;
            that.table_data = [];
            request.post('./managerList',this.query).then(res => {
                res.data.forEach(function (v,k) {
                    let create_time = moment(v.create_time*1000).format('YYYY-MM-DD HH:mm:ss');
                    let update_time = moment(v.update_time*1000).format('YYYY-MM-DD HH:mm:ss');
                    let id = v.id;
                    let username = v.username;
                    let email = v.email;
                    let remark = v.remark;
                    let locked = v.locked;
                    let role_id = v.role_id.split('#');
                    let role_name = [];
                    role_id.forEach(function (v,k) {
                        that.role_list.forEach(function (vv,kk) {
                            if(v==vv.id){
                                role_name.push(vv.role_name);
                            }
                        })
                    })
                    that.table_data.push({
                        id:id,
                        username:username,
                        create_time:create_time,
                        update_time:update_time,
                        role_id:role_id,
                        role_name:role_name,
                        email:email,
                        remark:remark,
                        locked:locked,
                    });
                });
            })
        },
        // 删除
        handleDel(index, row) {
            this.delDialogVisible = true;
            this.id = row.id;
        },
        confirmDel() {
            request.post('./managerDel',{id:this.id}).then(res => {
                this.delDialogVisible = false;
                if(res.code==200){
                    this.$message({message: '删除成功',type: 'success'});
                    this.getData();
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        confirmEdit() {
            this.form.checkRole = this.checkRole;
            request.post('./managerEdit',this.form).then(res => {
                if(res.code==200){
                    this.addDialogVisible = false;
                    this.$message({message:res.msg,type: 'success'});
                    this.getData();
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        handleAdd(){
            this.form = {};
            this.checkRole = [];
            this.addDialogVisible=true;
        },
        //编辑
        handleEdit(index, row) {
            let that = this;
            this.form = row;
            that.checkRole = [];
            row.role_id.forEach(function (v,k) {
                that.checkRole.push(v);
            })
            this.addDialogVisible = true;
        },
    }
};
</script>
<style scoped>
    .role-name{
        margin: 5px;
    }
</style>
