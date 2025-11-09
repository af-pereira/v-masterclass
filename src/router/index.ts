import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { h } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/ProjectsView.vue')
    },
    {
      path: '/projects/:id',
      name: 'single-project',
      component: () => import('@/views/SingleProjectView.vue')
    },
    {
      // Project not found
      path: '/projects/:pathMatch(.*)*',
      name: 'project-not-found',
      component: () => h('p', { style: 'color:red;' }, '404 Project not found!')
    },
    {
      // Catch all unmatched routes
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => h('p', { style: 'color:red;' }, '404 Not found!')
    }
  ]
})

export default router
