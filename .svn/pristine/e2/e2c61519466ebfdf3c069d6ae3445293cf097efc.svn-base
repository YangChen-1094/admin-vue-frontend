<template>
    <div>
        <div class="crumbs">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <div class="crumbs">
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item>
                                    <i class="el-icon-lx-cascades"></i> 邮件配置
                                </el-breadcrumb-item>
                                <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                    </div>
                </el-col>

  
            </el-row>
        </div>

        <div class="container">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-form-item label="邮件类型：" prop="type">
                    <el-col :span="12">
                        <el-select v-model="form.type" placeholder="请选择类型" v-bind:disabled="diasabledInput">
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
                <el-form-item label="邮件子类型" prop="subtype">
                    <el-col :span="12">
                        <el-select v-model="form.subtype" placeholder="请选择子类型" v-bind:disabled="diasabledInput">
                            <el-option
                            v-for="item in subtype_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <span class="grid-content bg-purple text-tips">* </span>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                    <el-col :span="12">
                        <el-select v-model="form.icon" @change="selectIcon(form.icon)" placeholder="请选择类型" v-bind:disabled="diasabledInput">
                            <el-option
                            v-for="item in icon_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                       <img :src="require('../../../assets/img/icons/'+iconUrl+'.png')" name="image-swap" id="image-swap" class="image-icon">
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> </span>
                </el-form-item>
                <el-form-item label="渠道" prop="channel">
                    <el-col :span="12">
                        <el-input placeholder="请输入渠道" v-model="form.channel" v-bind:disabled="diasabledInput"></el-input>
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> 例如：all</span>
                </el-form-item>
                <el-form-item label="区域" prop="area">
                    <el-col :span="12">
                        <el-input placeholder="请输入区域" v-model="form.area" v-bind:disabled="diasabledInput"></el-input>
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> 例如：all</span>
                </el-form-item>
                <el-form-item label="玩家uid列表" prop="uid_list">
                    <el-col :span="12">
                        <el-input placeholder="请输入uid值" v-model="form.uid_list" type="textarea" rows="5" v-bind:disabled="diasabledInput"></el-input>
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> 例如：usog5G0IhG;0y9G88FRiO,中间用英文分号分割</span>
                </el-form-item>
                <el-form-item label="标题"  prop="title">
                    <el-col :span="12">
                        <el-input placeholder="请输入标题" v-model="form.title" v-bind:disabled="diasabledInput"></el-input>
                    </el-col>
                    <span class="grid-content bg-purple text-tips">*必填 长度1-20个汉字</span>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-col :span="12">
                        <div id="wangeditor">
                            <div ref="editorElem" style="text-align:left;"></div>
                        </div>
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> 
                        <br>
                        *长度1-200个汉字<br>
                        * 支持html标签<br>
                    </span>
                </el-form-item>
                <el-form-item label="链接地址" prop="link_url">
                    <el-col :span="12">
                        <el-input placeholder="请输入链接地址" v-model="form.link_url" v-bind:disabled="diasabledInput"></el-input>
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> 只能为https协议，例如：https://wwww.baidu.com</span>
                </el-form-item>
                <el-form-item label="资源列表" prop="resource_list">
                    <el-col :span="12">
                        <el-input placeholder="请输入资源列表" v-model="form.resource_list" type="textarea" rows="5" v-bind:disabled="diasabledInput"></el-input>
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> 例如：[{"resourceId" : 38,"num" : 30},{"resourceId" : 30,"num" : 30}]</span>
                </el-form-item>
                <el-form-item label="道具列表" prop="props_list">
                    <el-col :span="12">
                        <el-input placeholder="请输入道具列表" v-model="form.props_list" type="textarea" rows="5" v-bind:disabled="diasabledInput"></el-input>
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> 例如：[{"props_id" : 3,"num" : 30},{"props_id" : 2,"num" : 30}]</span>
                </el-form-item>
                <el-form-item label="英雄列表" prop="hero_list">
                    <el-col :span="12">
                        <el-input placeholder="请输入英雄列表" v-model="form.hero_list" type="textarea" rows="5" v-bind:disabled="diasabledInput"></el-input>
                    </el-col>
                    <span class="grid-content bg-purple text-tips"> 例如：[{"hero_id" : 2202,"num" : 1},{"hero_id" : 2200,"num" : 1}]</span>
                </el-form-item>
                <el-form-item label="发送者" prop="sender">
                    <el-col :span="12">
                        <el-input placeholder="请输入发送者" v-model="form.sender" v-bind:disabled="diasabledInput"></el-input>
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
                        <el-button  @click="$router.go(-1)">返 回</el-button>
                        <el-button type="primary" @click="confirmEdit('form')">确 定</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import request from '../../../utils/request';
import isInteger from '../../../utils/validator';
import E from "wangeditor";
let moment = require('moment');
export default {
    name: 'mailEdit',
    data() {
        return {
            editor: null,
            editorContent: '',
            diasabledInput:false,
            title:"",
            iconUrl:"icon_common",
            form: {
                area:"all",
                channel:"all",
            },
            type_options:[{
                value:1,
                label:"全推邮件"
            },{
                value:2,
                label:"批量邮件"
            }],
            icon_options:[{value:"icon_5moves",label:"icon_5moves"},{value:"icon_anniversary",label:"icon_anniversary"},{value:"icon_bonsai",label:"icon_bonsai"},{value:"icon_certification",label:"icon_certification"}
            ,{value:"icon_chests",label:"icon_chests"},{value:"icon_ChristmasIcon",label:"icon_ChristmasIcon"},{value:"icon_CollectContestIcon",label:"icon_CollectContestIcon"},{value:"icon_common",label:"icon_common"}
            ,{value:"icon_community",label:"icon_community"},{value:"icon_dogtraining",label:"icon_dogtraining"},{value:"icon_double",label:"icon_double"}],

            subtype_options:[{
                value:1,
                label:"公告邮件"
            },{
                value:2,
                label:"补偿邮件"
            },{
                value:3,
                label:"调查问卷"
            },{
                value:4,
                label:"其它"
            }],
            rules:{
                type:[{required:true, message:"请选择类型", trigger:'change'}],
                subtype:[{required:true, message:"请选择子类型", trigger:'change'}],
                icon:[{required:true, message:"请选择输入icon", trigger:'blur'}],
                title:[{required:true, message:"请填写标题", trigger:'blur'}],
                sender:[{required:true, message:"请填写发送者", trigger:'blur'}],
                start_time:[{required:true, message:"请选择开始时间", trigger:'change'}],
                end_time:[{required:true, message:"请选择截止时间", trigger:'change'}],
            }
        };
    },
    // props:['catchData'],//接收父组件的方法
    mounted() {
        this.editor = new E(this.$refs.editorElem);
        // 编辑器的事件，每次改变会获取其html内容
        this.editor.customConfig.onchange = html => {
            this.editorContent = html;
            // this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
        };
        this.editor.customConfig.menus = [
        // 菜单配置
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
        ];
        this.editor.create(); // 创建富文本实例
    },
    created() {
        this.id = this.$route.query.id;
        this.form.id = this.$route.query.id;
        this.title = this.id?'邮件编辑':'邮件添加';
        if (this.id != null){
            this.diasabledInput = true;
            this.getInfo();
        }
    },
    methods: {  
        mailType(type){
            let type_tag  = '', type_text = '';
            switch (type) {
                case 1:
                    type_tag = 'all';
                    type_text = '全推邮件';
                    break;
                case 2:
                    type_tag = 'batch';
                    type_text = '批量邮件';
                    break;
            }
            return [type_tag,type_text];
        },
        mailSubType(subtype){
            let type_tag  = '',
                type_text = '';
            switch (subtype) {
                case 1:
                    type_tag = 'notice';
                    type_text = '公告邮件';
                    break;
                case 2:
                    type_tag = 'compensation';
                    type_text = '补偿邮件';
                    break;
                case 3:
                    type_tag = 'investigation';
                    type_text = '调查问卷';
                    break;
                case 4:
                    type_tag = 'others';
                    type_text = '其它';
                    break;
            }
            return [type_tag,type_text];
        },

        getInfo(){
            let that = this;
             if (this.id == null){
                 return;
             }
            request.post('./mailInfo',{mailid:this.id}).then(res => {
                let item = res.data.data;
                let [type_tag,type_text] = that.mailType(item.type);
                let [subtype_tag,subtype_text] = that.mailSubType(item.subtype);

                item.type_text = type_text;
                item.type_tag  = type_tag;
                item.subtype_text = subtype_text;
                item.subtype_tag  = subtype_tag;
                that.form = item;
                that.form.channel = JSON.stringify(that.form.channel);
                that.form.area = JSON.stringify(that.form.area);
                that.form.uid_list = JSON.stringify(that.form.uid_list);
                that.form.resource_list = JSON.stringify(that.form.resource_list);
                that.form.props_list = JSON.stringify(that.form.props_list);
                that.form.hero_list = JSON.stringify(that.form.hero_list);
                that.editorContent = item.content;
                this.editor.txt.html(item.content);
                this.editor.$textElem.attr('contenteditable', false);//不可编辑

                if (that.form.icon != ""){
                    that.iconUrl = that.form.icon;
                }
            })
        },

        confirmEdit(formName) {
            const that = this;
            this.$refs[formName].validate((valid)=>{
                if (valid){
                    if (that.id != null){//编辑
                        let start_time = Date.parse(that.form.start_time)/1000;
                        let end_time = Date.parse(that.form.end_time)/1000;
                        let param = {
                            id:     that.id,
                            start_time: start_time,
                            end_time:   end_time,
                        };
                        if (isNaN(start_time) || isNaN(end_time)){
                            that.$message.error("参数错误，请检查!");
                            return;
                        }
                        
                        request.post('./editMail',param).then(res => {
                            if(res.code==200){
                                that.$message({message: '操作成功',type: 'success'});
                                // that.getInfo();
                                that.$router.push({ path: '/mailList'});
                            }else{
                                that.$message({dangerouslyUseHTMLString:true, message:res.msg, type:'error'});
                            }
                        })
                    }else{//添加
                        let start_time = Date.parse(that.form.start_time)/1000;
                        let end_time = Date.parse(that.form.end_time)/1000;
                        that.form.start_time = start_time;
                        that.form.end_time = end_time;
                        that.form.content = that.editorContent;

                        request.post('./editMail',that.form).then(res => {
                            if(res.code==200){
                                that.$message({message: '操作成功',type: 'success'});
                                // that.getInfo();
                                that.$router.push({ path: '/mailList'});
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
        selectIcon(val) {
            this.iconUrl =  val;
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
.image-icon{
    width:30px;
    height:30px;
    padding:0px;
    margin:0px;
    vertical-align:middle;
}
</style>
