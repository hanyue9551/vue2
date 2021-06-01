import NotFound from '@/views/common/NotFound.vue'
import Layout from '@/Layout/Layout.vue'

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/table',
    children: [{
      path: 'table',
      name: 'Table',
      component: () => import('../views/Table/Table.vue'),
    },
    {
      path: 'tableAdd',
      name: 'TableAdd',
      component: () => import('../views/Table/TableAdd.vue'),
    },
    {
      path: 'list',
      name: 'List',
      meta: { permission: ['two'] },
      component: () => import('../views/List/List.vue'),
    }
    ]
  },

  {
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]