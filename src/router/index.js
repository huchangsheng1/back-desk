import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '桃李教育,家庭教育的不二选择', icon: '主菜单' }
    }]
  },
  {
    path: '/usermanager',
    component: Layout,
    redirect: '/usermanager/userlist',
    name: 'Nested',
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    children: [
      {
        path: 'userlist',
        component: () => import('@/views/users/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '用户列表' },
      },
    ]
  },
  {
    path: '/logermanager',
    component: Layout,
    redirect: '/logermanager/list',
    name: 'Nested',
    meta: {
      title: '日志管理',
      icon: 'example'
    },
    children: [
      {
        path: 'logerlist',
        component: () => import('@/views/systemlog'), 
        name: 'Menu1',
        meta: { title: '日志列表' },
      },
    ]
  },
  {
    path: '/teachmanager',
    component: Layout,
    redirect: '/teachmanager/list',
    name: 'Nested',
    meta: {
      title: '教务管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'coursemanage',
        component: () => import('@/views/coursemanage/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '课程管理' },
      },
      {
        path: 'classmanagement',
        component: () => import('@/views/classmanagement/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '班级管理' },
        // children: [
        //   {
        //     path: 'logerlist',
        //     component: () => import('@/views/classmanagement/Classdetails.vue'), 
        //     name: 'Menu1',
        //     meta: { title: '日志管理' },
        //   },
        // ]
      }
    ]
  },
  {
    path: '/workmanager',
    component: Layout,
    redirect: '/workmanager/list',
    name: 'Nested',
    meta: {
      title: '作业管理',
      icon: 'table'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/work/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '作业列表' },
      },
      
    ]
  },
  {
    path: '/Publishjob',
    component: Layout,
    name: 'Publishjob',
    component: () => import('@/views/work/Publishjob'), // Parent router-view
  },
  {
    path: '/Correctingwork',
    component: Layout,
    name: 'Correctingwork',
    component: () => import('@/views/work/Correctingwork'), // Parent router-view
  },
  {
    path: '/testmanager',
    component: Layout,
    redirect: '/testmanager/list',
    name: 'Nested',
    meta: {
      title: '考试管理',
      icon: 'form'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/exam/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '考试列表' },
      },
    ]
  },
  {
    path: '/questiesmanager',
    component: Layout,
    redirect: '/questiesmanager/list',
    name: 'Nested',
    meta: {
      title: '题库管理',
      icon: 'link'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/question/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '题库列表' },
      },
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '系统管理',
      icon: 'tree'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/powermba/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '权限管理' },
      },
      {
        path: 'menu2',
        component: () => import('@/views/rolemba/index'),
        name: 'Menu2',
        meta: { title: '角色管理' }
      }
    ]
  },

  {
    path: '/examtopic',
    component: Layout,
    name: 'examTopic',  // 创建考试
    component: () => import('@/views/exam/CreateExam'),
  },

  {
    path: '/altertopic/:id',
    component: Layout,
    name: 'alterExam',  // 修改考试
    component: () => import('@/views/exam/AlterExam'),
  },

  {
    path: '/stayexam',
    component: Layout,
    name: 'stayexam',  // 待批改考试渲染
    component: () => import('@/views/exam/StayExam'),
  },

  {
    path: '/reviewexam/:uid/:tkey/:tname/:cname',
    component: Layout,
    name: 'reviewexam',  // 批改考试
    component: () => import('@/views/exam/ReviewExam'),
  },
  {
    path: '/createrole',
    component: Layout,
    name: 'Nested',
    component: () => import('@/views/rolemba/CreateRole'), // Parent router-view
      
    
  },
  {
        path: '/logerlist/:gid',
        component: () => import('@/views/classmanagement/Classdetails.vue'), 
        name: 'Menu1',
        meta: { title: '班级详情' },
  },
  
{
    path: '/coursedetails/:course_id',
    component: () => import('@/views/coursemanage/Coursedetails.vue'), 
    name: 'Menu1',
    meta: { title: '课程详情' },
},

{
  path: '/problemlist',
  component: () => import('@/views/coursemanage/problem.vue'), 
  name: 'Menu1',
  meta: { title: '课程课程问答' },
},


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
