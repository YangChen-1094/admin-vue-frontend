<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户查询
                </el-breadcrumb-item>
                <el-breadcrumb-item>数据查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container" style="padding:10px 30px;">
            <div class="handle-box">
                <el-row>
                    <el-col :span="2"><div class="grid-content bg-purple" style="line-height:32px;">用户ID：</div></el-col>
                    <el-col :span="4"><el-input v-model="query.uid" placeholder="用户ID,如：usog5G0IhG"></el-input></el-col>
                    <el-col :span="2"><div class="grid-content bg-purple" style="margin-left: 30px;line-height:32px;">用户昵称：</div></el-col>
                    <el-col :span="4"><el-input v-model="query.userName" placeholder="用户昵称，如：55"></el-input></el-col>
                    <el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="handleSearch">查询</el-button>
                </el-row>
                
            </div>
        </div>

        <div class="container">
            <el-table :data="table_data" border class="table"  header-cell-class-name="table-header">
               
                <el-table-column prop="uid" label="用户ID" align="center" >
                </el-table-column>
                <el-table-column prop="name" label="昵称" align="center" width="100px">
                </el-table-column>
                <el-table-column prop="level" label="当前等级" align="center" width="100px">
                </el-table-column>
                <el-table-column prop="exp" label="经验值" align="center" width="100px">
                </el-table-column>
                <el-table-column prop="stageid" label="关卡" align="center">
                </el-table-column>
                <el-table-column prop="channel" label="渠道" align="center">
                </el-table-column>
                <el-table-column prop="createtime" label="创建时间" align="center">
                </el-table-column>
                <el-table-column prop="logintime" label="登录时间" align="center">
                </el-table-column>
                <el-table-column prop="ip" label="IP地址" align="center" width="200px">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-s-order" @click="handleHeroList(scope.$index, scope.row)">英雄列表</el-button><br>
                        <el-button type="text" icon="el-icon-s-order" @click="handlePropList(scope.$index, scope.row)">道具列表</el-button><br>
                        <el-button type="text" icon="el-icon-s-order" @click="handleTownList(scope.$index, scope.row)">城建列表</el-button><br>
                        <el-button type="text" icon="el-icon-s-order" @click="handleTroopList(scope.$index, scope.row)">装备列表</el-button><br>
                        <el-button type="text" icon="el-icon-s-order" @click="handleTask(scope.$index, scope.row)">任务进度</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                    <el-col :span="24"><div class="tips">资源：</div></el-col>
            </el-row>
            <el-table :data="resources" border class="table"  header-cell-class-name="table-header">
                 <el-table-column prop="uid" label="用户ID" align="center" >
                </el-table-column>
                <el-table-column prop="food" label="食物" align="center">
                </el-table-column>
                <el-table-column prop="gem" label="宝石" align="center" >
                </el-table-column>
                <el-table-column prop="ore" label="矿石" align="center" >
                </el-table-column>
                <el-table-column prop="recruit" label="士兵" align="center">
                </el-table-column>
                <el-table-column prop="stamina" label="体力" align="center">
                </el-table-column>
                <el-table-column prop="updatetime" label="最后更新时间" align="center">
                </el-table-column>
                
            </el-table>
            <el-row>
                    <el-col :span="24"><div class="tips">战队英雄：</div></el-col>
            </el-row>
            <el-table :data="heros" border class="table"  header-cell-class-name="table-header">
                 <el-table-column prop="huid" label="英雄唯一ID" align="center" >
                </el-table-column>
                <el-table-column prop="heroid" label="英雄ID" align="center" >
                </el-table-column>
                <el-table-column prop="name" label="英雄名称" align="center">
                </el-table-column>
                <el-table-column prop="exp" label="经验值" align="center" >
                </el-table-column>
                <el-table-column prop="level" label="等级" align="center" >
                </el-table-column>
                <el-table-column prop="skilllevel" label="技能等级" align="center">
                </el-table-column>
                <el-table-column prop="stage" label="阶级" align="center">
                </el-table-column>
                <el-table-column prop="updatetime" label="最后更新时间" align="center">
                </el-table-column>
                
            </el-table>

            <el-row>
                    <el-col :span="24"><div class="tips">战队道具：</div></el-col>
            </el-row>
            <el-table :data="props" border class="table"  header-cell-class-name="table-header">
                 <el-table-column prop="itemid" label="道具ID" align="center" >
                </el-table-column>
                <el-table-column prop="itemName" label="道具名称" align="center" >
                </el-table-column>
                <el-table-column prop="itemnum" label="数量" align="center">
                </el-table-column>
                <el-table-column prop="updatetime" label="最后更新时间" align="center">
                </el-table-column>
                
            </el-table>

            <el-row>
                    <el-col :span="24"><div class="tips">战队装备：</div></el-col>
            </el-row>
            <el-table :data="troops" border class="table"  header-cell-class-name="table-header">
                 <el-table-column prop="troopid" label="装备ID" align="center" >
                </el-table-column>
                <el-table-column prop="tuid" label="装备唯一ID" align="center" >
                </el-table-column>
                <el-table-column prop="itemName" label="装备名称" align="center" >
                </el-table-column>
                <el-table-column prop="exp" label="经验" align="center">
                </el-table-column>
                <el-table-column prop="level" label="等级" align="center">
                </el-table-column>
                <el-table-column prop="propType" label="属性类型" align="center">
                </el-table-column>
                <el-table-column prop="propLevel" label="属性等级" align="center">
                </el-table-column>
                <el-table-column prop="updatetime" label="最后更新时间" align="center">
                </el-table-column>
                
            </el-table>
        </div>
            
    </div>
</template>

<style>
.tips{
    color:#4a4a4b;
    height: 30px;
    margin-top:15px;
    line-height: 30px;
}
</style>

<script>
import request from '../../../utils/request';
var moment = require('moment');
export default {
    name: 'userList',
    data() {
        return {
            query: {
                uid: '',
                userName: ''
            },
            table_data : [],
            resources:[],
            heros:[],
            props:[],
            troops:[],
        };
    },
    methods: {
        handleSearch() {
            let that = this;
            if(this.query.uid=='' && this.query.userName=='') {
                this.$message.error('请填写查询条件');
                return;
            }
            request.post('./userQuery', {uid: this.query.uid,userName:this.query.userName}).then(res => {
                if(res.code==200){
                    that.table_data.length = 0;
                    if(res.data.data != null){
                        that.table_data.push(res.data.data);
                    }
                    if(res.data.resources != null){
                        that.resources.push(res.data.resources);
                    }
                    if(res.data.heros != null){
                         that.heros = res.data.heros;
                    }
                    if(res.data.props != null){
                        that.props = res.data.props;
                    }
                    if(res.data.troops != null){
                        that.troops = res.data.troops;
                    }
                }else{
                    let msg = '查询用户信息失败:' + res.msg;
                    that.$message.error(msg);
                }
            })
        },

        handleHeroList(index, row) {
              this.$router.push({ path: 'heroQuery', query: { uid: row.uid }})
        },
        handlePropList(index, row) {
             this.$router.push({ path: 'propQuery', query: { uid: row.uid }})
        },
        handleTownList(index, row) {
             this.$router.push({ path: 'townQuery', query: { uid: row.uid }})
        },
        handleTroopList(index, row) {
             this.$router.push({ path: 'troopQuery', query: { uid: row.uid }})
        },
        handleTask(index, row) {
             this.$router.push({ path: 'taskQuery', query: { uid: row.uid }})
        }
    }
};
</script>
