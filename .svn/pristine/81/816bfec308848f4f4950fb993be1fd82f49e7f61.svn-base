<template>
    <div>
        <el-row>
            <el-col :span="22">
                <div class="grid-content bg-purple">
                    <div class="crumbs">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item>
                                <i class="el-icon-lx-cascades"></i> {{title}}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple-light">
                    <el-button type="primary" @click="$router.go(-1)">返回上一页</el-button>
                </div>
            </el-col>
        </el-row>
        <div class="container">
            <el-form ref="form" label-width="120px">
                <el-form-item label="角色名称">
                    <el-col :span="10">
                        <el-input placeholder="请输入角色名称" v-model="form.role_name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注">
                    <el-col :span="10">
                        <el-input placeholder="请输入角色备注" v-model="form.remark"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="操作">
                    <el-col :span="10">
                        <el-button @click="addDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="confirmEdit">确 定</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item label="">
                    <div class="grid-content bg-purple text-tips">需要选择菜单权限-用于展示菜单项</div>
<!--                    <div class="grid-content bg-purple text-tips">需要选择操作节点权限-用于判断操作权限</div>-->
                </el-form-item>
            </el-form>
        </div>
<!--        <div class="container">
            <el-form ref="form2" label-width="120px">
                <el-form-item label="筛选过滤">
                    <el-col :span="5">
                        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="菜单权限">
                    <el-tree
                            class="filter-tree"
                            :data="tree_data"
                            show-checkbox
                            node-key="id"
                            default-expand-all
                            :props="default_props"
                            :default-checked-keys="default_select"
                            :filter-node-method="filterNode"
                            ref="tree">
                    </el-tree>
                </el-form-item>
            </el-form>
        </div>-->
        <el-divider></el-divider>
        <el-table
                :data="table_data"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
        >
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column label="节点ID" align="center" width="100">
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
        </el-table>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <span>角色添加成功</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import request from '../../../utils/request';
let moment = require('moment');
export default {
    name: 'roleEdit',
    data() {
        return {
            title: "",
            filterText: '',
            id: "",
            dialogVisible:false,
            table_data: [],
            form:{
                id:'',
                role_name: "",
                remark: "",
                checked_node: [],
            },
            multipleSelection: [],
            checkList:[],
            menu_list:[],
            default_select:[],
            default_props: {
                children: 'children',
                label: 'name'
            },
            tree_data: []
        };
    },
    created() {
        this.id = this.$route.query.id;
        this.form.id = this.$route.query.id;
        this.title = this.id?'角色编辑':'角色添加';
        this.getRoleInfo();
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        getRoleInfo() {
            let that = this;
            request.post('./roleInfo',{id:this.id}).then(res => {
                let data = res.data;
                this.table_data = data.list;
                this.form.role_name = data.info.role_name;
                this.form.remark = data.info.remark;
                let permision_node_id = data.info.permision_node_id.split('#');
                that.checkList = [];
                this.table_data.forEach(function (v,k) {
                    permision_node_id.forEach(function (vv,kk) {
                        if(v.id==vv){
                            that.checkList.push({key:k,val:v.id})
                        }
                    })
                })
                this.$nextTick(function(e){
                    this.checkList.forEach(function (v,k) {
                        that.checked(v.key);
                    })
                })
                this.multipleSelection = permision_node_id;
/*                if(data.menu){
                    that.tree_data = that.toTreeNode(data.menu);
                }*/
                //默认菜单选中
/*                let myJSON = JSON.parse(data.info.menu_node);
                myJSON.forEach(function (v,k) {
                    that.default_select.push(v.id)
                })*/
            })
        },
        confirmEdit() {
/*            let node = this.$refs.tree.getCheckedNodes();
            let checkMenu = [];
            node.forEach(function (v,k) {
                checkMenu.push(v.id)
            });
            this.form.menu_node = checkMenu;*/
            request.post('./roleUpdate',this.form).then(res => {
                if(res.code==200){
                    this.addDialogVisible = false;
                    this.$message({message: res.msg,type: 'success'});
                    this.getRoleInfo();
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        checked(index){
            this.$refs.multipleTable.toggleRowSelection(this.table_data[index],true);
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleSelectionChange(val) {
            let that = this;
            that.multipleSelection = [];
            val.forEach(function (v,k) {
                that.multipleSelection.push(v.id);
            })
            that.form.checked_node = this.multipleSelection;
        },
        topString(level) {
            let str = '';
            for (let i=0; i<level; i++) {
                str += "&nbsp;&nbsp;&nbsp;&nbsp;";
                //str += "|----";
            }
            return str;
        },

        toTreeNode(data){
            let cloneData = data;
            return cloneData.filter(father=>{
                let branchArr = cloneData.filter(child=>{
                    return father.id == child.pid;
                })
                branchArr.length>0 ? father.children = branchArr : '';
                return father.pid==0;
            });
        },
    }
};
</script>
