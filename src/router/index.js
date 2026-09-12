import LoginPage from '@/views/login/LoginPage.vue'
import LayoutContainer from '@/views/layout/LayoutContainer.vue'

import ArticleManage from '@/views/article/ArticleManage.vue'
import ArticleChannel from '@/views/article/ArticleChannel.vue'

import UserProfile from '@/views/user/UserProfile.vue'
import UserAvatar from '@/views/user/UserAvatar.vue'
import UserPassword from '@/views/user/UserPassword.vue'

import { createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/login',
      component: LoginPage,
    },

    {
      path: '/',
      component: LayoutContainer,
      redirect: '/article/manage',

      children: [
        {
          path: 'article/manage',
          component: ArticleManage,
        },

        {
          path: 'article/channel',
          component: ArticleChannel,
        },

        {
          path: 'user/profile',
          component: UserProfile,
        },

        {
          path: 'user/avatar',
          component: UserAvatar,
        },

        {
          path: 'user/password',
          component: UserPassword,
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const userStore = useUserStore()

  if (!userStore.token && to.path !== '/login') {
    return '/login'
  }
})

export default router
