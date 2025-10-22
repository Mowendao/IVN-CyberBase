import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/knowledge',
      name: 'Knowledge',
      component: () => import('@/views/KnowledgeView.vue'),
    },
    {
      path: '/competition',
      name: 'Competition',
      component: () => import('@/views/CompetitionView.vue'),
    },
    {
      path: '/practice',
      name: 'Practice',
      component: () => import('@/views/PracticeView.vue'),
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('@/views/CommunityView.vue'),
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: () => import('@/views/CategoryView.vue'),
    },
    {
      path: '/article',
      name: 'Article',
      component: () => import('@/views/ArticleView.vue'),
    },
    {
      path: '/src',
      name: 'Src',
      component: () => import('@/views/SrcView.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/AboutView.vue'),
    },
  ],
})

export default router
