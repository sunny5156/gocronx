import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import { routerConfig } from './config'
// import store from '../store'
// import { asyncRouterMap11street } from './11street'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRouterMap
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/manager',
    alwaysShow: true,
    name: 'system.setting',
    meta: {
      title: '系统管理',
      icon: 'setting',
      breadcrumb: false,
      need_permission: true
    },
    children: [
      {
        path: '/system/notice',
        name: 'system.notice',
        component: () => import('@/views/systemManager/notice'),
        meta: { title: '通知配置', icon: 'notification', need_permission: true }
      },
      {
        path: '/system/logs',
        name: 'system.logs',
        component: () => import('@/views/systemManager/logs'),
        meta: { title: '登录日志', icon: 'log', need_permission: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '/user/manager',
        name: 'user.manager',
        component: () => import('@/views/userManager/list'),
        meta: { title: '用户管理', icon: 'user-manage' }
      }],
    meta: { need_permission: true }
  },
  {
    path: '/project',
    component: Layout,
    children: [
      {
        path: '/project/list',
        name: 'project.list',
        component: () => import('@/views/project/list'),
        meta: { title: '项目管理', icon: 'project' }
      },
      {
        path: '/project/list/user/:id',
        component: () => import('@/views/project/userList'),
        name: 'project.userList',
        meta: {
          title: '项目人员管理',
          icon: 'training'
        },
        hidden: true
      }
    ],
    meta: { need_permission: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/task/manager/task-logs',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '任务管理',
      icon: 'task-management',
      breadcrumb: false
    },
    children: [
      {
        path: '/task/manager/timing-tasks',
        name: 'TimingTasks',
        component: () => import('@/views/taskManager/timingTasks'),
        meta: { title: '定时任务', icon: 'task-management', need_permission: true }
      },
      {
        path: '/task/manager/task-logs',
        name: 'TaskLogs',
        component: () => import('@/views/taskManager/taskLogs'),
        meta: { title: '任务日志', icon: 'log' }
      }
    ]
  },
  {
    path: '/host',
    component: Layout,
    children: [
      {
        path: '/host/manager/list',
        name: 'host.manager.list',
        component: () => import('@/views/hostManager/hostList'),
        meta: { title: '任务节点', icon: 'site01' }
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
]
export const asyncRouterMap = [
  // {
  //   path: '/system',
  //   component: Layout,
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: '系统',
  //     icon: 'settings',
  //     permission: 'system.view',
  //     breadcrumb: false
  //   },
  //   children: [
  //     {
  //       path: '/system/permission',
  //       component: () => import('@/views/system/permission'),
  //       name: 'system.permission',
  //       // alwaysShow: true, // will always show the root menu
  //       meta: { title: '权限管理', icon: 'setting', permission: 'manager.manager.permission.list' }
  //     }]
  // },
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user/manage',
  //   alwaysShow: true,
  //   name: 'user',
  //   meta: {
  //     title: '用户',
  //     icon: 'users',
  //     permission: 'user.view',
  //     breadcrumb: false
  //   },
  //   children: [
  //     {
  //       path: '/user/user',
  //       name: 'user.user',
  //       component: () => import('@/views/user/manage'),
  //       meta: { title: '用户管理', icon: 'user-manage', permission: 'manager.manager.user.list' }
  //     },
  //     {
  //       path: '/user/role',
  //       name: 'user.role',
  //       component: () => import('@/views/user/role'),
  //       meta: { title: '角色管理', icon: 'role', permission: 'manager.manager.role.list' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

if (routerConfig) {
  // if (routerConfig['11street']) {
  //   store.dispatch('addPlatform', '11street').then(() => {
  //   })
  //   asyncRouterMap.push(asyncRouterMap11street())
  // }
}

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
