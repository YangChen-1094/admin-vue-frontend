<template>
    <div>
        <el-row>
            <el-col :span="20">
                <div class="grid-content bg-purple">
                    <div class="crumbs">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item>
                                <i class="el-icon-lx-cascades"></i> 角色管理
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">
                    <el-button type="primary" @click="handleAdd">添加权限节点</el-button>
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
                <el-table-column label="权限节点ID" align="center" width="100">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="控制器名称" align="center">
                    <template slot-scope="scope"><el-tag>{{scope.row.controller}}</el-tag></template>
                </el-table-column>
                <el-table-column label="操作方法名称" align="center">
                    <template slot-scope="scope"><el-tag type="success">{{scope.row.action}}</el-tag></template>
                </el-table-column>
                <el-table-column label="操作节点名称" align="center">
                    <template slot-scope="scope">{{scope.row.node_name}}</template>
                </el-table-column>
                <el-table-column label="创建时间" align="center">
                    <template slot-scope="scope">{{scope.row.create_time}}</template>
                </el-table-column>
                <el-table-column label="更新时间" align="center">
                    <template slot-scope="scope">{{scope.row.update_time}}</template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="80">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                    title=""
                    :visible.sync="addDialogVisible"
                    width="60%">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="控制器名称">
                        <el-col :span="12">
                            <el-input placeholder="请输入控制器名称" v-model="form.controller"></el-input>
                        </el-col>
                        <span class="grid-content bg-purple text-tips">* 例如：PermissionController</span>
                    </el-form-item>
                    <el-form-item label="操作方法名称">
                        <el-col :span="12">
                            <el-input placeholder="请输入操作方法名称" v-model="form.action"></el-input>
                        </el-col>
                        <span class="grid-content bg-purple text-tips">* 例如：roleUpdate</span>
                    </el-form-item>
                    <el-form-item label="权限节点名称">
                        <el-col :span="12">
                            <el-input placeholder="请输入权限节点名称" v-model="form.node_name"></el-input>
                        </el-col>
                        <span class="grid-content bg-purple text-tips">* 例如：删除文章</span>
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-col :span="12">
                            <el-button @click="addDialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="confirmEdit">确 定</el-button>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import request from '../../../utils/request';
let moment = require('moment');
export default {
    name: 'permissionNode',//权限节点编辑
    data() {
        return {
            id: "",
            table_data: [],
            addDialogVisible: false,
            form:{
                controller:'',
                action:'',
                node_name:''
            },
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            request.post('./permissionNodeList',this.query).then(res => {
                res.data.forEach(function (v,k) {
                    res.data[k]['create_time'] = moment(v.create_time*1000).format('YYYY-MM-DD HH:mm:ss');
                    res.data[k]['update_time'] = moment(v.update_time*1000).format('YYYY-MM-DD HH:mm:ss');
                });
                this.table_data = res.data;
            })
        },
        //添加
        handleAdd(index, row) {
            this.form.id = '';
            this.form.controller = '';
            this.form.action = '';
            this.form.node_name = '';
            this.addDialogVisible = true;
        },
        //编辑
        handleEdit(index, row) {
            this.form.id = row.id;
            this.form.controller = row.controller;
            this.form.action = row.action;
            this.form.node_name = row.node_name;
            this.addDialogVisible = true;
        },
        confirmEdit() {
            request.post('./permissionNodeUpdate',this.form).then(res => {
                if(res.code==200){
                    this.addDialogVisible = false;
                    this.$message({message: '操作成功',type: 'success'});
                    this.getData();
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
    }
};
</script>
