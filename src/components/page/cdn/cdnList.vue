<template>
    <div>
        <el-row>
            <el-col :span="20">
                <div class="grid-content bg-purple">
                    <div class="crumbs">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item>
                                <i class="el-icon-lx-cascades"></i> CDN文件列表
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="container">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="目标主机">
                    <div>{{rootUrl}}</div>
                </el-form-item>
                <el-form-item label="文件">
                    <el-col :span="5">
                        <input type="file" @change="handleFileChange">
                    </el-col>
                </el-form-item>
                <el-form-item label="是否加密">
                    <el-checkbox v-model="encrypt">加密</el-checkbox>
                </el-form-item>
                <el-form-item label="操作">
                    <el-button type="primary" @click="goUpload">确认上传</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="mkDir">创建目录</el-button>
                    <el-button type="warning" @click="dialogVisible=true">创建索引</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="container">
            <el-table
                :data="table_data"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="名称" align="center">
                    <template slot-scope="scope"><div class="filename" @click="goPath(scope.row.path)">{{scope.row.filename}}</div></template>
                </el-table-column>
                <el-table-column label="url" align="center">
                    <template slot-scope="scope">
                        <a :href="scope.row.url" class="url">{{scope.row.url}}</a>
                    </template>
                </el-table-column>
                <el-table-column label="类型" align="center">
                    <template slot-scope="scope" v-if="scope.row.format_size">{{scope.row.type}}</template>
                </el-table-column>
                <el-table-column label="大小" align="center">
                    <template slot-scope="scope">{{scope.row.format_size}}</template>
                </el-table-column>
                <el-table-column label="最后修改时间" align="center">
                    <template slot-scope="scope">{{scope.row.update_time}}</template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                                v-if="scope.row.decryptXML"
                                type="text"
                                icon="el-icon-edit"
                                @click="handleDecryptXML(scope.$index, scope.row)"
                        >解谜</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
                title=""
                top="5vh"
                :visible.sync="dirDialogVisible"
                width="30%">
            <el-row>
                <el-col :span="6"><div class="grid-content bg-purple">目录名称</div></el-col>
                <el-col :span="18"><el-input v-model="newDir" placeholder="请输入目录名称"></el-input></el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dirDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="mkDirConfirm">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <span>确定要创建索引吗？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="mkIndexConfirm">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
                title="解谜"
                :visible.sync="decryptDialogVisible"
                width="60%">
            <el-input type="textarea" v-model="decryptContent"  rows="10" cols="20"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="decryptDialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import request from '../../../utils/request';
let moment = require('moment');
let axios = require('axios');
export default {
    name: 'noticeList',
    data() {
        return {
            table_data: [],
            path: "",
            rootUrl: "",
            newDir: "",
            decryptContent:'',
            encrypt: false,
            dialogVisible: false,
            dirDialogVisible: false,
            decryptDialogVisible: false,
            decryptXML: false,
            form:{

            },
            formData:{}
        };
    },
    created() {
        this.formData = new FormData();
        this.getData();
    },
    methods: {
        getData() {
            let that = this;
            request.post('./cdnList',{path:this.path}).then(res => {
                res.data.items.forEach(function (v,k) {
                    if(v.update_time){
                        res.data.items[k]['update_time'] = moment(v.update_time*1000).format('YYYY-MM-DD HH:mm:ss');
                    }else{
                        res.data.items[k]['update_time'] = '';
                    }
                    res.data.items[k]['decryptXML'] = v.url.indexOf(".xml")>-1?true:false;
                });
                this.rootUrl = res.data.rootUrl;
                this.table_data = res.data.items;
                this.path = res.data.path;
            })
        },
        goPath(e) {
            this.path = e;
            this.getData();
        },
        mkDir(){
            this.dirDialogVisible = true;
        },
        mkDirConfirm(){
            let that = this;
            request.post('./cdnMkdir',{path:this.path,name:this.newDir}).then(res => {
                if(res.code==200){
                    this.$message({message: '创建成功',type: 'success',onClose:function () {
                            that.dirDialogVisible = false;
                            that.getData();
                        }});
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        mkIndexConfirm(){
            let that = this;
            request.post('./cdnMkIndex',{path:this.path}).then(res => {
                if(res.code==200){
                    that.dialogVisible = false;
                    this.$message({message: '创建索引成功',type: 'success'});
                }else{
                    this.$message.error(res.msg);
                }
            })
        },

        handleFileChange(e){
            this.formData.append('userfile',e.target.files[0]);
        },
        goUpload(){
            let encryptChecked =  this.encrypt?'1':'0';
            let that = this;
            axios({
                method: 'post',
                url: request.serverBaseUrl+'/webadmins/cdnUpload'+'?encrypt='+encryptChecked+'&path='+this.path,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'multipart/form-data'
                },
                data: that.formData,
            }).then(function(res) {
                if(res.data.code==200){
                    that.$message({message: '上传成功',type: 'success',onClose:function () {
                            that.getData();
                    }});
                }else{
                    that.$message.error(res.data.msg);
                }
            });
        },
        //cdnShow
        handleDecryptXML(index, row){
            let that = this;
            request.post('./cdnShow',{url:row.url}).then(res => {
                if(res.code==200){
                    that.decryptContent = res.data.content;
                    that.decryptDialogVisible = true;
                }else{
                    this.$message.error('解谜失败');
                }
            })
        }
    }
};
</script>

<style scoped>
.filename,.url{
    cursor: default;
    color: #2d8cf0;
    text-decoration: underline  ;
}
</style>
