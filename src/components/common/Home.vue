<template>
    <div class="wrapper">
        <vHead></vHead><!-- 3、使用组件 vHead 或 v-head  -->
        <vSidebar></vSidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <vTags></vTags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <router-view></router-view>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';//1、引用组件 vHead
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    components: {
        vHead,//2、注册组件
        vSidebar,
        vTags
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    }
};
</script>
