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
                            <el-breadcrumb-item>道具配置</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <el-button type="primary" @click="addProp">添加道具</el-button>
                    <el-button type="success" @click="redisStatus">更新到服务器</el-button>
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
                <el-table-column prop="id" label="物品ID" width="150" align="center">
                    <template slot-scope="scope">{{scope.row.itemid}}</template>
                </el-table-column>
                <el-table-column label="物品名称" width="" align="center">
                    <template slot-scope="scope">{{scope.row.itemname}}</template>
                </el-table-column>
                <el-table-column label="物品类型" width="" align="center">
                    <template slot-scope="scope">{{typeToName(scope.row.type)}}</template>
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
                                @click="handleDel(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    style="float: right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="query.page_index"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="query.page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page_total">
            </el-pagination>
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
                title="编辑道具配置"
                top="5vh"
                :visible.sync="dialogVisible"
                width="30%">
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">物品Id</div></el-col>
                <el-col :span="20">
                    <el-input v-model="edit.itemid" placeholder="请输入物品Id"></el-input>
                    <el-input v-model="edit.id" type="hidden"></el-input>
                </el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">物品名称</div></el-col>
                <el-col :span="20"><el-input v-model="edit.itemname" placeholder="请输入版本说明"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">价格</div></el-col>
                <el-col :span="20"><el-input v-model="edit.price"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">物品类型</div></el-col>
                <el-col :span="20">
                    <el-select v-model="edit.type">
                        <el-option
                                v-for="item in type_data"
                                :key="item.itemtype"
                                :value="item.itemtype"
                                :label="item.typename">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">物品描述</div></el-col>
                <el-col :span="20"><el-input v-model="edit.descr" type="textarea" rows="5"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">图片URL</div></el-col>
                <el-col :span="20"><el-input v-model="edit.imgUrl"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">buttonUrl</div></el-col>
                <el-col :span="20"><el-input v-model="edit.buttonUrl"></el-input></el-col>
            </el-row><div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">bannerUrl</div></el-col>
                <el-col :span="20"><el-input v-model="edit.bannerUrl"></el-input></el-col>
            </el-row><div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">三方支付按钮文字</div></el-col>
                <el-col :span="20"><el-input v-model="edit.buttonDesc"></el-input></el-col>
            </el-row><div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">用途</div></el-col>
                <el-col :span="20">
                    <el-checkbox-group v-model="checkUseType">
                        <el-checkbox
                                v-for="typeName in useType"
                                :key="typeName"
                                :label="typeName"
                        >{{ typeName }}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="添加道具"
                top="5vh"
                :visible.sync="addDialogVisible"
                width="30%">
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">物品Id</div></el-col>
                <el-col :span="20">
                    <el-input v-model="add.itemid" placeholder="请输入物品Id"></el-input>
                </el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">物品名称</div></el-col>
                <el-col :span="20"><el-input v-model="add.itemname" placeholder="请输入版本说明"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">价格</div></el-col>
                <el-col :span="20"><el-input v-model="add.price"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">物品类型</div></el-col>
                <el-col :span="20">
                    <el-select v-model="addDefaultType" placeholder="--请选择--">
                        <el-option
                                v-for="item in type_data"
                                :key="item.itemtype"
                                :value="item.itemtype"
                                :label="item.typename">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">物品描述</div></el-col>
                <el-col :span="20"><el-input v-model="add.descr" type="textarea" rows="5"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">图片URL</div></el-col>
                <el-col :span="20"><el-input v-model="add.imgUrl"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">buttonUrl</div></el-col>
                <el-col :span="20"><el-input v-model="add.buttonUrl"></el-input></el-col>
            </el-row><div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">bannerUrl</div></el-col>
                <el-col :span="20"><el-input v-model="add.bannerUrl"></el-input></el-col>
            </el-row><div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">三方支付按钮文字</div></el-col>
                <el-col :span="20"><el-input v-model="add.buttonDesc"></el-input></el-col>
            </el-row><div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">用途</div></el-col>
                <el-col :span="20">
                    <el-checkbox-group v-model="checkUseType">
                        <el-checkbox
                                v-for="typeName in useType"
                                :key="typeName"
                                :label="typeName"
                        >{{typeName}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd">确 定</el-button>
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
    import {Functions} from '../../../utils/Functions';
    export default {
        name: 'itemList',
        filters: {
            ellipsis (value) {
                if (!value) return '';
                if (value.length > 32) {
                    return value.slice(0,32) + '...';
                }
                return value;
            },
        },
        data() {
            return {
                query: {
                    page_index: 1,
                    page_size: 10,
                },
                page_total: 0,
                table_data: [],
                type_data: [],
                usetype_data:[],
                id: "",
                edit: {
                    itemid : "",
                    itemname : "",
                    checkUseType : [],
                },
                add: {
                    itemid : "",
                    itemname : "",
                    checkUseType : [],
                },
                addDefaultType: "",
                dialogVisible: false,
                addDialogVisible: false,
                delDialogVisible: false,

                rStatus : false,
                rollStatus: false,
                rollId: 0,
                redisLogVisible: false,
                redisLogData: [],
                checkUseType:[],//选择的用途
                useType: [//所有的用途
                    "弹窗",
                    "计费点",
                ]
            };
        },
        created() {
            this.getData();
        },
        methods: {
            typeToName(type){
                for(let i in this.type_data){
                    let oneType = this.type_data[i];
                    let typename = oneType.typename;
                    if(oneType.itemtype == type){
                        return typename;
                    }
                }
                return type;
            },
            nameToType(name){
                for(let i in this.type_data){
                    let oneType = this.type_data[i];
                    let typename = oneType.typename;
                    if(name == typename){
                        return oneType.itemtype;
                    }
                }
                return name;
            },
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
            getData() {
                request.post('./item/list', {'page':this.query.page_index, "size": this.query.page_size}).then(res => {
                    this.table_data = res.data.list;
                    this.type_data = res.data.aType;
                    this.usetype_data = res.data.usetype;
                    this.page_total = res.data.count;
                })
            },
            // 删除
            handleDel(index, row) {
                this.delDialogVisible = true;
                this.id = row.id;
            },
            confirmDel() {
                request.post('./versionDelete',{id:this.id}).then(res => {
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
                this.checkUseType = [];//情况本次选择的用途
                this.dialogVisible = true;
                this.edit = row;
                this.edit.index = index;
                this.edit.id = this.edit.itemid
                this.edit.type = this.typeToName(row.type)
                if(row.usetype){//点击的行 有用途数据
                    let selectType = row.usetype.split("#")
                    for (let id in this.usetype_data) {
                        let isIn = Functions.isInArray(id, selectType)
                        if(isIn){
                            this.checkUseType.push(this.usetype_data[id])
                        }
                    }
                }
            },
            addProp() {
                this.addDialogVisible = true;
                this.checkUseType = [];//清空已选择的用途
                this.addDefaultType = this.typeToName(2)
                console.log(this.type_data);
            },
            confirmEdit() {
                this.edit.checkUseType = this.checkUseType
                this.edit.type = this.nameToType(this.edit.type)
                request.post('./item/modify', this.edit).then(res => {
                    this.dialogVisible = false;
                    if(res.code==200){
                        this.$message({message: '修改成功',type: 'success'});
                        this.getData();
                    }else{
                        this.$message.error('修改失败');
                    }
                })
            },
            confirmAdd() {
                this.add.checkUseType = this.checkUseType
                this.add.type = this.nameToType(this.addDefaultType)
                request.post('./item/modify', this.add).then(res => {
                    this.addDialogVisible = false;
                    this.add = [];
                    if(res.code==200){
                        this.$message({message: '添加成功',type: 'success'});
                        this.getData();
                    }else{
                        this.$message.error('添加失败');
                    }
                })

            },
            redisStatus(){
                this.rStatus = true;
            },
            setRedis(){
                request.post('./item/setRedis',{action:'version'}).then(res => {
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
                request.post('./getRedisLog',{action:'version'}).then(res => {
                    let data = res.data;
                    if(data.length >= 0){
                        this.redisLogVisible = true;
                        this.redisLogData = data;
                    }else{
                        this.$message.error('暂无日志');
                    }
                })
            },
            rollbackStatus(id){
                this.rollStatus = true;
                this.rollId = id;
            },
            rollback(rollId){
                request.post('./rollbackRedis',{id: rollId, action:'version'}).then(res => {
                    if(res.code==200){
                        this.$message({message: res.msg,type: 'success'});
                        this.redisLog();
                    }else{
                        this.$message({message: res.msg,type: 'fail'});
                    }
                    this.rollStatus = false;
                })
            }
        }
    };
</script>
