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
                            <el-breadcrumb-item>版本配置</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <el-button type="primary" @click="addVersion">添加版本配置</el-button>
                    <el-button type="success" @click="redisStatus">更新到服务器</el-button>
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
                <el-table-column prop="id" label="ID" width="55" align="center">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column label="版本号" width="150">
                    <template slot-scope="scope">{{scope.row.version}}</template>
                </el-table-column>
                <el-table-column label="版本说明" width="250">
                    <template slot-scope="scope">{{scope.row.versionDesc}}</template>
                </el-table-column>
                <el-table-column label="白名单列表" width="250">
                    <template slot-scope="scope">{{scope.row.whiteList | ellipsis}}</template>
                </el-table-column>
                <el-table-column label="黑名单列表" width="250">
                    <template slot-scope="scope">{{scope.row.blackList | ellipsis}}</template>
                </el-table-column>
                <el-table-column label="网关地址">
                    <template slot-scope="scope">{{scope.row.gateAddr}}</template>
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
                title="编辑版本配置"
                top="5vh"
                :visible.sync="dialogVisible"
                width="30%">
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">版本号</div></el-col>
                <el-col :span="20"><el-input v-model="version" placeholder="请输入版本号"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">版本说明</div></el-col>
                <el-col :span="20"><el-input v-model="versionDesc" placeholder="请输入版本说明"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">白名单列表</div></el-col>
                <el-col :span="20"><el-input v-model="whiteList" placeholder="请输入白名单uid列表,按'|'分隔" type="textarea" rows="5"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">黑名单列表</div></el-col>
                <el-col :span="20"><el-input v-model="blackList" placeholder="请输入黑名单uid列表,按'|'分隔" type="textarea" rows="5"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">网关地址</div></el-col>
                <el-col :span="20"><el-input v-model="gateAddr" placeholder="请输入网关地址"></el-input></el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="添加版本配置"
                top="5vh"
                :visible.sync="addDialogVisible"
                width="50%">
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">版本号</div></el-col>
                <el-col :span="20"><el-input v-model="versionAdd" placeholder="请输入版本号"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">版本说明</div></el-col>
                <el-col :span="20"><el-input v-model="versionDescAdd" placeholder="请输入版本说明"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">白名单列表</div></el-col>
                <el-col :span="20"><el-input v-model="whiteListAdd" placeholder="请输入白名单uid列表,按'|'分隔" type="textarea" rows="5"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">黑名单列表</div></el-col>
                <el-col :span="20"><el-input v-model="blackListAdd" placeholder="请输入黑名单uid列表,按'|'分隔" type="textarea" rows="5"></el-input></el-col>
            </el-row>
            <div style="margin: 20px 0px;"></div>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">网关地址</div></el-col>
                <el-col :span="20"><el-input v-model="gateAddrAdd" placeholder="请输入网关地址"></el-input></el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd">确 定</el-button>
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
        name: 'versionList',
        filters: {
            ellipsis (value) {
                if (!value) return '';
                if (value.length > 32) {
                    return value.slice(0,32) + '...';
                }
                return value;
            }
        },
        data() {
            return {
                table_data: [],
                id: "",
                version: "",
                versionAdd: "",
                versionDesc: "",
                versionDescAdd: "",
                whiteList: "",
                whiteListAdd: "",
                blackList: "",
                blackListAdd: "",
                gateAddr: "",
                gateAddrAdd: "",

                dialogVisible: false,
                addDialogVisible: false,
                delDialogVisible: false,

                rStatus : false,
                rollStatus: false,
                rollId: 0,
                redisLogVisible: false,
                redisLogData: [],
            };
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                request.post('./versionList').then(res => {
                    this.table_data = res.data;
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
                this.dialogVisible = true;
                this.version = row.version;
                this.versionDesc = row.versionDesc;
                this.whiteList = row.whiteList;
                this.blackList = row.blackList;
                this.gateAddr = row.gateAddr;
                this.id = row.id;
            },
            confirmEdit() {
                request.post('./versionModify',{id:this.id,version:this.version,versionDesc:this.versionDesc,whiteList:this.whiteList,blackList:this.blackList,gateAddr:this.gateAddr}).then(res => {
                    this.dialogVisible = false;
                    if(res.code==200){
                        this.$message({message: '修改成功',type: 'success'});
                        this.getData();
                    }else{
                        this.$message.error('修改失败');
                    }
                })
            },
            addVersion() {
                this.versionAdd = "";
                this.versionDescAdd = "";
                this.gateAddrAdd = "";
                this.addDialogVisible = true;
            },
            confirmAdd() {
                request.post('./versionModify',{version:this.versionAdd,versionDesc:this.versionDescAdd,whiteList:this.whiteListAdd,blackList:this.blackListAdd,gateAddr:this.gateAddrAdd}).then(res => {
                    this.addDialogVisible = false;
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
                request.post('./setRedis',{action:'version'}).then(res => {
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
