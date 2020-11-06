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
                    <router-link to="/roleEdit" class="router-btn">
                        <el-button type="primary">添加角色</el-button>
                    </router-link>
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
                <el-table-column label="角色ID" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="角色名称" align="center">
                    <template slot-scope="scope"><el-tag type="success">{{scope.row.role_name}}</el-tag></template>
                </el-table-column>
                <el-table-column label="备注" align="center">
                    <template slot-scope="scope">{{scope.row.remark}}</template>
                </el-table-column>
                <el-table-column label="创建时间" align="center">
                    <template slot-scope="scope">{{scope.row.create_time}}</template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                                :disabled="scope.row.role_name=='超级管理员'"
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >修改</el-button>
                        <el-button
                                :disabled="scope.row.role_name=='超级管理员'"
                                type="text"
                                icon="el-icon-delete-solid"
                                @click="handleDel(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
    name: 'role',
    data() {
        return {
            table_data: [],
            id: "",
            delDialogVisible: false,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            request.post('./roleList',this.query).then(res => {
                res.data.forEach(function (v,k) {
                    res.data[k]['create_time'] = moment(v.create_time*1000).format('YYYY-MM-DD HH:mm:ss');
                });
                this.table_data = res.data;
            })
        },
        // 删除
        handleDel(index, row) {
            this.delDialogVisible = true;
            this.id = row.id;
        },
        confirmDel() {
            request.post('./roleDel',{id:this.id}).then(res => {
                this.delDialogVisible = false;
                if(res.code==200){
                    this.$message({message: '删除成功',type: 'success'});
                    this.getData();
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        //编辑
        handleEdit(index, row) {
            this.$router.push({ path: 'roleEdit', query: { id: row.id }})
        },
    }
};
</script>
