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
                            <el-breadcrumb-item>召唤配置</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <el-button type="success" @click="updateStatus">更新至服务器</el-button>
                </div>
            </el-col>
        </el-row>

        <div class="container">
            <el-form :model="editData" :rules="rules" label-width="150px">
                <el-form-item label="全英雄钻石单抽价格" prop="oneGem">
                    <el-col :span="4">
                        <el-input v-model="editData.oneGem" placeholder="请输入全英雄钻石单抽价格"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="全英雄钻石十连价格" prop="tenGem">
                    <el-col :span="4">
                        <el-input v-model="editData.tenGem" placeholder="请输入全英雄钻石十连价格"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="全系英雄权重配置" prop="all">
                    <el-col class="lk-toolbar" :span="200" v-for = "(item, key) in editData.all" :key="key" >
                        <el-col :span="10">
                            <el-select  placeholder="请选择英雄"  v-model="item.heroId">
                                <el-option v-for="thisItem in baseData.hero" :label="('【' + thisItem.heroId + '】' + thisItem.heroName)"
                                           :key="thisItem.heroId" :value="thisItem.heroId">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-input v-model="item.rate" placeholder="权重"></el-input>
                        </el-col>
                        <el-col :span="25">
                            <el-button type="primary" round @click="addHero('all')">增加</el-button>
                            <el-button type="danger" round  @click="delHero('all', key)">删除</el-button>
                        </el-col>
                    </el-col>
                </el-form-item>
                <el-form-item label="水系英雄权重配置" prop="water">
                    <el-col class="lk-toolbar" :span="70" v-for = "(item, key) in editData.water" :key="key" >
                        <el-col :span="10">
                            <el-select placeholder="请选择英雄"  v-model="item.heroId">
                                <el-option v-for="thisItem in baseData.water" :label="('【' + thisItem.heroId + '】' + thisItem.heroName)"
                                           :key="thisItem.heroId" :value="thisItem.heroId">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-input v-model="item.rate" placeholder="权重"></el-input>
                        </el-col>
                        <el-col :span="25">
                            <el-button type="primary" round @click="addHero('water')">增加</el-button>
                            <el-button type="danger" round  @click="delHero('water', key)">删除</el-button>
                        </el-col>
                    </el-col>
                </el-form-item>
                <el-form-item label="火系英雄权重配置" prop="fire">
                    <el-col class="lk-toolbar" :span="70" v-for = "(item, key) in editData.fire" :key="key" >
                        <el-col :span="10">
                            <el-select placeholder="请选择英雄"  v-model="item.heroId">
                                <el-option v-for="thisItem in baseData.fire" :label="('【' + thisItem.heroId + '】' + thisItem.heroName)"
                                           :key="thisItem.heroId" :value="thisItem.heroId">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-input v-model="item.rate" placeholder="权重"></el-input>
                        </el-col>
                        <el-col :span="25">
                            <el-button type="primary" round @click="addHero('fire')">增加</el-button>
                            <el-button type="danger" round  @click="delHero('fire', key)">删除</el-button>
                        </el-col>
                    </el-col>
                </el-form-item>
                <el-form-item label="木系英雄权重配置" prop="wood">
                    <el-col class="lk-toolbar" :span="70" v-for = "(item, key) in editData.wood" :key="key" >
                        <el-col :span="10">
                            <el-select placeholder="请选择英雄"  v-model="item.heroId">
                                <el-option v-for="thisItem in baseData.wood" :label="('【' + thisItem.heroId + '】' + thisItem.heroName)"
                                           :key="thisItem.heroId" :value="thisItem.heroId">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-input v-model="item.rate" placeholder="权重"></el-input>
                        </el-col>
                        <el-col :span="25">
                            <el-button type="primary" round @click="addHero('wood')">增加</el-button>
                            <el-button type="danger" round  @click="delHero('wood', key)">删除</el-button>
                        </el-col>
                    </el-col>
                </el-form-item>
                <el-form-item label="光明系英雄权重配置" prop="bright">
                    <el-col class="lk-toolbar" :span="70" v-for = "(item, key) in editData.bright" :key="key" >
                        <el-col :span="10">
                            <el-select placeholder="请选择英雄"  v-model="item.heroId">
                                <el-option v-for="thisItem in baseData.bright" :label="('【' + thisItem.heroId + '】' + thisItem.heroName)"
                                           :key="thisItem.heroId" :value="thisItem.heroId">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-input v-model="item.rate" placeholder="权重"></el-input>
                        </el-col>
                        <el-col :span="25">
                            <el-button type="primary" round @click="addHero('bright')">增加</el-button>
                            <el-button type="danger" round  @click="delHero('bright', key)">删除</el-button>
                        </el-col>
                    </el-col>
                </el-form-item>
                <el-form-item label="黑暗系英雄权重配置" prop="dark">
                    <el-col class="lk-toolbar" :span="70" v-for = "(item, key) in editData.dark" :key="key" >
                        <el-col :span="10">
                            <el-select placeholder="请选择英雄"  v-model="item.heroId">
                                <el-option v-for="thisItem in baseData.dark" :label="('【' + thisItem.heroId + '】' + thisItem.heroName)"
                                           :key="thisItem.heroId" :value="thisItem.heroId">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-input v-model="item.rate" placeholder="权重"></el-input>
                        </el-col>
                        <el-col :span="25">
                            <el-button type="primary" round @click="addHero('dark')">增加</el-button>
                            <el-button type="danger" round  @click="delHero('dark', key)">删除</el-button>
                        </el-col>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="rStatus"
                width="30%">
            将会影响当前环境，确认要把当前配置<span style="color:red;">更新到服务器吗</span>？
            <span slot="footer" class="dialog-footer">
            <el-button @click="rStatus = false">取 消</el-button>
            <el-button type="primary" @click="setServer">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import request from '../../../utils/request';
import {checkMax20000} from '../../../utils/validator'
export default {
    name: 'summonList',
    data() {
        return {
            labelPosition: 'left',
            rStatus : false,//用于更新时的二次确认
            baseData: [],  //基础配置数据
            editData: {  //后台配置的召唤数据
                oneGem:0,
                tenGem:0,
                all : [],
                water : [],
                fire : [],
                wood : [],
                bright : [],
                dark : [],
            },
            rules: {
                oneGem: [
                    { required: true, message: '请输入钻石单抽价格', trigger: 'blur' },
                    { validator: checkMax20000, trigger: 'blur' }
                ],
                tenGem: [
                    { required: true, message: '请输入钻石十连价格', trigger: 'change' },
                    { validator: checkMax20000, trigger: 'blur' }
                ],
                all: [
                    { type: 'array', required: true, message: '请选择全系英雄', trigger: 'change' }
                ],
                water: [
                    { type: 'array', required: true, message: '请选择水系英雄', trigger: 'change' }
                ],
                fire: [
                    { type: 'array', required: true, message: '请选择火系英雄', trigger: 'change' }
                ],
                wood: [
                    { type: 'array', required: true, message: '请选择木系英雄', trigger: 'change' }
                ],
                bright: [
                    { type: 'array', required: true, message: '请选择光明系英雄', trigger: 'change' }
                ],
                dark: [
                    { type: 'array', required: true, message: '请选择黑暗系英雄', trigger: 'change' }
                ]
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            request.post('./getSummonList').then(res => {
                if(res.code==200){
                    if (res.data.oneGem > 0) {
                        this.editData = res.data;
                        //console.log(JSON.stringify(this.editData))
                    }
                }
            });
            request.post('./getHeroList').then(res => {
                if(res.code==200){
                    this.baseData = res.data;
                    //console.log(JSON.stringify(this.baseData))
                }
            });

            if (!this.editData.all.length) {
                this.editData.all = [{heroId:0, rate:0}]
            }
            if (!this.editData.water.length) {
                this.editData.water = [{heroId:0, rate:0}]
            }
            if (!this.editData.fire.length) {
                this.editData.fire = [{heroId:0, rate:0}]
            }
            if (!this.editData.wood.length) {
                this.editData.wood = [{heroId:0, rate:0}]
            }
            if (!this.editData.bright.length) {
                this.editData.bright = [{heroId:0, rate:0}]
            }
            if (!this.editData.dark.length) {
                this.editData.dark = [{heroId:0, rate:0}]
            }
        },
        addHero(type) {
            switch (type) {
                case 'all':
                    this.editData.all.push({heroId: 0, rate: 0});
                    break;
                case 'water':
                    this.editData.water.push({heroId: 0, rate: 0});
                    break;
                case 'fire':
                    this.editData.fire.push({heroId: 0, rate: 0});
                    break;
                case 'wood':
                    this.editData.wood.push({heroId: 0, rate: 0});
                    break;
                case 'bright':
                    this.editData.bright.push({heroId: 0, rate: 0});
                    break;
                case 'dark':
                    this.editData.dark.push({heroId: 0, rate: 0});
                    break;
            }
        },
        delHero(type, key) {
            switch (type) {
                case 'all':
                    if(this.editData.all.length <= 1){
                        this.$message.error('必须保留一个元素');
                        return false;
                    }
                    this.editData.all.splice(key, 1);
                    break;
                case 'water':
                    if(this.editData.water.length <= 1){
                        this.$message.error('必须保留一个元素');
                        return false;
                    }
                    this.editData.water.splice(key, 1);
                    break;
                case 'fire':
                    if(this.editData.fire.length <= 1){
                        this.$message.error('必须保留一个元素');
                        return false;
                    }
                    this.editData.fire.splice(key, 1);
                    break;
                case 'wood':
                    if(this.editData.wood.length <= 1){
                        this.$message.error('必须保留一个元素');
                        return false;
                    }
                    this.editData.wood.splice(key, 1);
                    break;
                case 'bright':
                    if(this.editData.bright.length <= 1){
                        this.$message.error('必须保留一个元素');
                        return false;
                    }
                    this.editData.bright.splice(key, 1);
                    break;
                case 'dark':
                    if(this.editData.dark.length <= 1){
                        this.$message.error('必须保留一个元素');
                        return false;
                    }
                    this.editData.dark.splice(key, 1);
                    break;
            }
        },
        submitForm() {
            //console.log("submit, post data:"+JSON.stringify(this.editData));
            request.post('./saveSummon', this.editData).then(res => {
                if(res.code==200){
                    this.$message({message: '保存成功',type: 'success'});
                    this.getData();
                }else{
                    this.$message.error('保存失败'+JSON.stringify(res.data));
                }
            });
        },
        updateStatus(){
            this.rStatus = true;
        },
        setServer(){
            // console.log("setServer, post data:"+JSON.stringify(this.editData));
            request.post('./sendSummon').then(res => {
                if(res.code==200){
                    this.$message({message: '更新至服务器成功',type: 'success'});
                    this.getData();
                }else{
                    this.$message.error('更新失败');
                }
                this.rStatus = false;
            })
        },
    }
};
</script>
