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
                    <el-button type="primary" @click="handleAdd">新建菜单</el-button>
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
                <el-table-column prop="index" label="ID" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="父级菜单ID" align="center">
                    <template slot-scope="scope">{{scope.row.pid}}</template>
                </el-table-column>
                <el-table-column label="菜单名称" align="center">
                    <template slot-scope="scope"><div v-html="scope.row.name"></div></template>
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
                <el-form-item label="父级菜单名称">
                    <el-col :span="20">
                        <el-select v-model="checkParentMenu" @change="handleNodeClick" placeholder="请选择父级菜单">
                            <el-option
                                    v-for="item in menu_select"
                                    :key="item.id"
                                    v-html="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="菜单名称">
                    <el-col :span="20">
                        <el-input placeholder="请输入菜单名称" v-model="form.name"></el-input>
                    </el-col>
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
    name: 'menuList',
    data() {
        return {
            table_data: [],
            role_list: [],
            id:'',
            checkParentMenu:'',
            form:{
                id: "",
                pid: "",
                name: "",
            },
            menu_select: [],
            delDialogVisible: false,
            addDialogVisible: false,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let that = this;
            that.table_data = [];
            request.post('./menuList',this.query).then(res => {
                res.data.forEach(function (v,k) {
                    res.data[k]['oldname'] = v.name;
                    res.data[k]['name'] = that.topString(v.level)+v.name;
                })
                that.menu_select = res.data;
                that.table_data = res.data;
            })
        },
        /**
         * 缩进
         */
        topString(level) {
            let str = '';
            for (let i=0; i<level; i++) {
                str += "&nbsp;&nbsp;&nbsp;&nbsp;";
                //str += "|----";
            }
            return str;
        },

        // 删除
        handleDel(index, row) {
            this.delDialogVisible = true;
            this.id = row.id;
        },
        confirmDel() {
            request.post('./menuDel',{id:this.id}).then(res => {
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
            request.post('./menuEdit',this.form).then(res => {
                if(res.code==200){
                    this.addDialogVisible = false;
                    this.$message({message: '添加成功',type: 'success'});
                    this.getData();
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        handleAdd(){
            this.form = {};
            this.checkParentMenu = '';
            this.addDialogVisible=true;
        },
        //编辑
        handleEdit(index, row) {
            this.form = row;
            this.checkParentMenu = row.id;
            this.addDialogVisible = true;
        },
        handleNodeClick(e){
            let that = this;
            this.menu_select.forEach(function (v,k) {
                if(v.id==e){
                    that.checkParentMenu = v.oldname;
                    that.form.pid = v.id;
                }
            })
        }
    }
};
</script>
<style scoped>
    .role-name{
        margin: 5px;
    }
</style>
