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
                            <el-breadcrumb-item>渠道列表</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <el-button type="primary" @click="addChannel">添加渠道</el-button>
                    <router-link to="/channelAdd" class="router-btn">
                        <el-button type="primary">批量导入</el-button>
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
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="名称" align="center"></el-table-column>
                <el-table-column prop="channel_id" label="渠道ID" align="center"></el-table-column>
                <el-table-column prop="datetime" label="修改时间" align="center"></el-table-column>
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

        <el-dialog
                title="编辑渠道"
                top="5vh"
                :visible.sync="dialogVisible"
                width="30%">
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">渠道ID</div></el-col>
                <el-col :span="20"><el-input v-model="channelId" placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">名称</div></el-col>
                <el-col :span="20"><el-input v-model="name" placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="添加配置"
                top="5vh"
                :visible.sync="addDialogVisible"
                width="30%">
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">名称</div></el-col>
                <el-col :span="20"><el-input v-model="nameAdd" placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">渠道ID</div></el-col>
                <el-col :span="20"><el-input v-model="channelIdAdd" placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import service from "../../../utils/request";
export default {
    name: 'channelList',
    data() {
        return {
            table_data: [],
            id: "",
            channelId: "",
            channelIdAdd: "",
            name: "",
            nameAdd: "",
            dialogVisible: false,
            addDialogVisible: false,
            delDialogVisible: false
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            service.post('./channel/list').then(res => {
                let alist = res.data.list
                this.table_data = alist;
            })
        },
        // 删除
        handleDel(index, row) {
            this.delDialogVisible = true;
            this.id = row.id;
        },
        confirmDel() {
            service.post('./channel/del',{id:this.id}).then(res => {
                this.delDialogVisible = false;
                if(res.code==200){
                    this.$message({message: '删除成功',type: 'success'});
                    this.getData();
                }else{
                    this.$message.error('删除失败');
                }
            })
        },
        //编辑
        handleEdit(index, row) {
            this.dialogVisible = true;
            this.channelId = row.channel_id;
            this.name = row.name;
            this.id = row.id;
        },
        confirmEdit() {
            service.post('./channel/modify',{id:this.id,name:this.name,channel_id:this.channelId}).then(res => {
                this.dialogVisible = false;
                if(res.code==200){
                    this.$message({message: '修改成功',type: 'success'});
                    this.getData();
                }else{
                    this.$message.error('修改失败');
                }
            })
        },
        addChannel() {
            this.channelIdAdd = "";
            this.nameAdd = "";
            this.addDialogVisible = true;
        },
        confirmAdd() {
            service.post('./channel/add',{name:this.nameAdd,channel_id:this.channelIdAdd}).then(res => {
                this.addDialogVisible = false;
                if(res.code==200){
                    this.$message({message: '添加成功',type: 'success'});
                    this.getData();
                }else{
                    this.$message.error('添加失败');
                }
            })
        },
    }
};
</script>
