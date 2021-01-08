import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/channelList',
                    component: () => import(/* webpackChunkName: "channel" */ '../components/page/channel/channelList.vue'),
                    meta: { title: '渠道配置' }
                },
                {
                    path: '/itemList',
                    component: () => import(/* webpackChunkName: "public" */ '../components/page/public/itemList.vue'),
                    meta: { title: '道具配置' }
                },
                {
                    path: '/summonList',
                    component: () => import(/* webpackChunkName: "summon" */ '../components/page/summon/summonList.vue'),
                    meta: { title: '召唤配置' }
                },
                {
                    path: '/productList',
                    component: () => import(/* webpackChunkName: "product" */ '../components/page/product/productList.vue'),
                    meta: { title: '商品配置' }
                },
                {
                    path: '/channelAdd',
                    component: () => import(/* webpackChunkName: "channel" */ '../components/page/channel/channelAdd.vue'),
                    meta: { title: '渠道批量添加' }
                },
                {
                    path: '/logList',
                    component: () => import(/* webpackChunkName: "system" */ '../components/page/system/logList.vue'),
                    meta: { title: '操作日志查询' }
                },
                {
                    path: '/phpRun',
                    component: () => import(/* webpackChunkName: "system" */ '../components/page/system/phpRun.vue'),
                    meta: { title: 'PHP执行' }
                },
                {
                    path: '/managerList',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/permission/managerList.vue'),
                    meta: { title: '后台账号设置' }
                },
                {
                    path: '/role',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/permission/role.vue'),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/roleEdit',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/permission/roleEdit.vue'),
                    meta: { title: '权限角色设置' }
                },
                {
                    path: '/permissionNode',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/permission/permissionNode.vue'),
                    meta: { title: '权限节点设置' }
                },
                {
                    path: '/menuList',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/permission/menuList.vue'),
                    meta: { title: '权限菜单设置' }
                },
                {
                    path: '/orderTable',
                    component: () => import(/* webpackChunkName: "order" */ '../components/page/order/OrderTable.vue'),
                    meta: { title: '订单查询' }
                },
                {
                    path: '/mailList',
                    component: () => import(/* webpackChunkName: "mail" */ '../components/page/mail/MailList.vue'),
                    meta: { title: '邮件配置' }
                },
                {
                    path: '/mailEdit',
                    component: () => import(/* webpackChunkName: "mail" */ '../components/page/mail/MailEdit.vue'),
                    meta: { title: '邮件编辑' }
                },
                {
                    path: '/userMailList',
                    component: () => import(/* webpackChunkName: "mail" */ '../components/page/mail/UserMailList.vue'),
                    meta: { title: '邮件接收查询' }
                },
                {
                    path: '/noticeList',
                    component: () => import(/* webpackChunkName: "notice" */ '../components/page/notice/NoticeList.vue'),
                    meta: { title: '公告配置' }
                },
                {
                    path: '/noticeEdit',
                    component: () => import(/* webpackChunkName: "notice" */ '../components/page/notice/NoticeEdit.vue'),
                    meta: { title: '公告编辑' }
                },
                {
                    path: '/userQuery',
                    component: () => import(/* webpackChunkName: "user" */ '../components/page/user/userQuery.vue'),
                    meta: { title: '用户查询' }
                },
                {
                    path: '/propQuery',
                    component: () => import(/* webpackChunkName: "user" */ '../components/page/user/propQuery.vue'),
                    meta: { title: '道具查询' }
                },
                {
                    path: '/heroQuery',
                    component: () => import(/* webpackChunkName: "user" */ '../components/page/user/hreoQuery.vue'),
                    meta: { title: '英雄查询' }
                },
                {
                    path: '/townQuery',
                    component: () => import(/* webpackChunkName: "user" */ '../components/page/user/townQuery.vue'),
                    meta: { title: '城建查询' }
                },
                {
                    path: '/troopQuery',
                    component: () => import(/* webpackChunkName: "user" */ '../components/page/user/troopQuery.vue'),
                    meta: { title: '装备查询' }
                },
                {
                    path: '/taskQuery',
                    component: () => import(/* webpackChunkName: "user" */ '../components/page/user/taskQuery.vue'),
                    meta: { title: '任务查询' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/apiTest',
                    component: () => import(/* webpackChunkName: "tools" */ '../components/page/tool/apiTest.vue'),
                    meta: { title: 'API接口测试' }
                },
                {
                    path: '/toolDecode',
                    component: () => import(/* webpackChunkName: "tool" */ '../components/page/tool/toolDecode.vue'),
                    meta: { title: '数据解密' }
                },
                {
                    path: '/cdnList',
                    component: () => import(/* webpackChunkName: "cdn" */ '../components/page/cdn/cdnList.vue'),
                    meta: { title: 'CDN文件列表' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};