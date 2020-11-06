<template>
    <div>
        <div class="crumbs">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <div class="crumbs">
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item>
                                    <i class="el-icon-lx-cascades"></i> 公告配置
                                </el-breadcrumb-item>
                                <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                    </div>
                </el-col>

            </el-row>
        </div>

        <div class="container">
            <el-form ref="form" :model="form" :rules="vadlidateRules" label-width="120px">
                <el-form-item label="公告类型：" prop="type">
                    <el-col :span="12">
                        <el-select v-model="form.type" placeholder="请选择类型">
                            <el-option
                            v-for="item in type_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <span class="grid-content bg-purple text-tips">* </span>
                </el-form-item>
               
                <el-form-item label="渠道" prop="channel">
                    <el-col :span="12">
                        <el-input placeholder="请输入渠道" v-model="form.channel"></el-input>
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> 例如：all</span>
                </el-form-item>
                <el-form-item label="区域" prop="area">
                    <el-col :span="12">
                        <el-input placeholder="请输入区域" v-model="form.area"></el-input>
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> 例如：all</span>
                </el-form-item>
                
                <el-form-item label="标题" prop="title">
                    <el-col :span="12">
                        <el-input placeholder="请输入标题" v-model="form.title"></el-input>
                    </el-col>
                    <span class="grid-content bg-purple text-tips">*必填 长度1-20个汉字</span>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="form.content" type="textarea" rows="10"></el-input>
                    </el-col>
                    <span class="grid-content bg-purple text-tips">
                        *长度1-200个汉字<br>
                        * 图片类型填URL,文字类型填文字<br>
                        * 文字公告字体大小及颜色设置：{font size="28" color="#3b7897"}内容{}<br>
                        * 文字公告斜体字设置：{font effects="{\"type\":\"skew\",\"angle\":15}"}内容{}
                    </span>
                </el-form-item>
                
                <el-form-item label="发送者" prop="sender">
                    <el-col :span="12">
                        <el-input placeholder="请输入发送者" v-model="form.sender"></el-input>
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> *必填</span>
                </el-form-item>
                <el-form-item label="是否打开" prop="sender">
                    <el-col :span="12">
                        <template>
                            <el-radio v-model="form.isopen" label="1">打开</el-radio>
                            <el-radio v-model="form.isopen" label="0">关闭</el-radio>
                        </template>
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> *必填</span>
                </el-form-item>

                <el-form-item label="开始时间" prop="start_time">
                        <el-col :span="12">
                            <el-date-picker v-model="form.start_time" type="datetime" placeholder="请选择开始时间">
                            </el-date-picker>
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> *必填</span>
                </el-form-item>
                <el-form-item label="截止时间" prop="end_time">
                    <el-col :span="12">
                        <el-date-picker v-model="form.end_time" type="datetime" placeholder="请选择截止时间">
                        </el-date-picker>
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> *必填</span>
                </el-form-item>


                <el-form-item label="操作">
                    <el-col :span="12">
                        <el-button @click="$router.go(-1)">返 回</el-button>
                        <el-button type="primary" @click="confirmEdit('form')">确 定</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import request from '../../../utils/request';
import validateLen from '../../../utils/validator';
import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
import 'quill/dist/quill.snow.css'
import * as Quill from 'quill'; 

let moment = require('moment');
export default {
    name: 'mailEdit',
    data() {
        return {
            diasabledInput:false,
            title:"",
            form: {
                area:"all",
                channel:"all",
                isopen:1,
            },
            type_options:[{
                value:1,
                label:"停服公告"
            },{
                value:2,
                label:"游戏内公告"
            }],
           
            vadlidateRules:{
                type:[{required:true, message:"请选择类型", trigger:'change'}],
                title:[{required:true, message:"请填写标题", trigger:'blur'}],
                content:[{required:true, message:"请填写内容", trigger:'blur'}],
                sender:[{required:true, message:"请填写发送者", trigger:'blur'}],
                start_time:[{required:true, message:"请选择开始时间", trigger:'change'}],
                end_time:[{required:true, message:"请选择截止时间", trigger:'change'}],
            }
        };
    },
    created() {
        this.id = this.$route.query.id;
        this.form.id = this.$route.query.id;
        this.title = this.id?'公告编辑':'公告添加';
        if (this.id != null){
            this.getInfo();
        }
    },
    methods: {  
        noticeType(type){
            let type_tag  = '', type_text = '';
            switch (type) {
                case 1:
                    type_tag = 'all';
                    type_text = '停服公告';
                    break;
                case 2:
                    type_tag = 'batch';
                    type_text = '游戏内公告';
                    break;
            }
            return [type_tag,type_text];
        },

        getInfo(){
            let that = this;
             if (this.id == null){
                 return;
             }
            request.post('./noticeInfo',{noticeId:this.id}).then(res => {
                let item = res.data.data;
                // console.log(item);
                let [type_tag,type_text] = that.noticeType(parseInt(item.type));

                item.type_text = type_text;
                item.type_tag  = type_tag;
                item.type = parseInt(item.type);
                this.form = item;
            })
        },

        confirmEdit(formName) {
            const that = this;
            this.$refs[formName].validate((valid)=>{
                if (valid){
                    if (that.id != null){//编辑
                        if (that.form.type == 0 || that.form.title == "" || that.form.content == ""){
                            that.$message.error("参数错误，请检查必填项!");
                            return;
                        }
                        let start_time = Date.parse(that.form.start_time)/1000;
                        let end_time = Date.parse(that.form.end_time)/1000;
                        console.log(start_time + '----', end_time);
                        
                        let param = {
                            id:     that.id,
                            channel: that.form.channel,
                            area:   that.form.area,
                            title:  that.form.title,
                            type:   that.form.type,
                            content:that.form.content,
                            sender: that.form.sender,
                            isopen: that.form.isopen,
                            start_time: start_time,
                            end_time:   end_time,
                        };
                        
                        request.post('./editNotice',param).then(res => {
                            if(res.code==200){
                                that.$message({dangerouslyUseHTMLString:true,message: '操作成功',type: 'success'});
                                // that.getInfo();
                                that.$router.push({ path: '/noticeList'});
                            }else{
                                that.$message({dangerouslyUseHTMLString:true, message:res.msg, type:'error'});
                            }
                        })
                    }else{//添加
                    // console.log(that.form);
                        let start_time = Date.parse(that.form.start_time)/1000;
                        let end_time = Date.parse(that.form.end_time)/1000;
                        that.form.start_time = start_time;
                        that.form.end_time = end_time;

                        request.post('./editNotice',that.form).then(res => {
                            if(res.code==200){
                                
                                that.$message({message: '操作成功',type: 'success'});
                                // that.getInfo();
                                that.$router.push({ path: '/noticeList'});
                            }else{
                                that.$message({dangerouslyUseHTMLString:true, message:res.msg, type:'error'});
                            }
                        })
                    }

                }else{
                    return false;
                }
            });
            
        },

    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 12px;
}

.mr10 {
    margin-right: 10px;
}
</style>
