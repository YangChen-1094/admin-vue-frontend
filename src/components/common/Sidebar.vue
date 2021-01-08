<template>
    <div class="sidebar">
        <el-menu
                class="sidebar-el-menu"
                :default-active="onRoutes"
                :collapse="collapse"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#20a0ff"
                unique-opened
                router> <!--router 路由-->
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index"  v-if="item.index!='permission' || (item.index=='permission' && showPermission)">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span><!--一级目录标题-->
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                    v-if="subItem.subs"
                                    :index="subItem.index"
                                    :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template><!--二级目录标题-->
                                <el-menu-item
                                        v-for="(threeItem,i) in subItem.subs"
                                        :key="i"
                                        :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item><!--三级目录标题-->
                            </el-submenu>
                            <el-menu-item
                                    v-else
                                    :index="subItem.index"
                                    :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item><!--二级目录标题-->
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                showPermission:false,
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '6',
                        title: '基础配置',
                        subs: [
                            {
                                index: 'channelList',
                                title: '渠道配置'
                            },
                            {
                                index: 'itemList',
                                title: '道具配置'
                            },
                            {
                                index: 'summonList',
                                title: '召唤配置'
                            },
                        ]
                    },
                    // {
                    //     icon: 'el-icon-cloudy',
                    //     index: 'cdnList',
                    //     title: 'CDN配置',
                    //     subs: [
                    //         {
                    //             index: 'cdnList',
                    //             title: 'CDN目录'
                    //         },
                    //     ]
                    // },
                    {
                        icon:   'el-icon-user-solid',
                        index:  'user',
                        title:  '用户查询',
                        subs:[{
                            index:  'userQuery',
                            title:  '用户查询'
                        },{
                            index:  'heroQuery',
                            title:  '英雄查询'
                        },
                        {
                            index:  'propQuery',
                            title:  '道具查询'
                        },{
                            index:  'townQuery',
                            title:  '城建查询'
                        },{
                            index:  'troopQuery',
                            title:  '装备查询'
                        },{
                            index:  'taskQuery',
                            title:  '任务查询'
                        },]
                    },
                    {
                        icon:   'el-icon-message',
                        index:  'mail',
                        title:  '邮件配置',
                        subs:[{
                            index:  'mailList',
                            title:  '邮件列表',
                        },
                        {
                            index:  'userMailList',
                            title:  '已收邮件查询'
                        },]
                    },
                    {
                        icon:   'el-icon-s-promotion',
                        index:  'notice',
                        title:  '公告配置',
                        subs:[{
                            index:  'noticeList',
                            title:  '公告列表'
                        },]
                    },
                    {
                        icon: 'el-icon-s-order',
                        index: 'order',
                        title: '订单系统',
                        subs: [
                            {
                                index: 'productList',
                                title: '商品配置'
                            },
                            {
                                index: 'orderTable',
                                title: '订单查询'
                            },
                        ]

                    },
                    {
                        icon: 'el-icon-s-tools',
                        index: 'tools',
                        title: '常用工具',
                        subs: [
                            {
                                index: 'apiTest',
                                title: 'API接口测试'
                            },
                            {
                                index: 'toolDecode',
                                title: '数据解密',
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'system',
                        title: '系统功能',
                        subs: [
                            {
                                index: 'logList',
                                title: '操作日志'
                            },
                            {
                                index: 'phpRun',
                                title: "PHP执行"
                            },
                            {
                                icon: 'el-icon-user-solid',
                                index: 'permission',
                                title: '权限管理',
                                subs: [
                                    {
                                        index: 'permissionNode',
                                        title: '权限节点管理'
                                    },
                                    {
                                        index: 'role',
                                        title: '角色管理'
                                    },
                                    {
                                        index: 'managerList',
                                        title: '账号管理'
                                    },
                                ],
                            }
                        ]
                    },
                ]
            };
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            let role = localStorage.getItem('ms_username');
            if(role=='test' || role=='admin'){
                this.showPermision = true;
            }
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
        }
    };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }
    .sidebar > ul {
        height: 100%;
    }
</style>
