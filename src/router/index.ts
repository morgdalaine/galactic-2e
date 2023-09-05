import { createRouter, createWebHistory } from 'vue-router';
import NpcView from '../views/NpcView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NpcView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/traits',
      name: 'traits',
      component: () => import('../views/TraitsView.vue')
    },
    {
      path: '/npc',
      name: 'npc',
      component: () => import('../views/NpcView.vue')
    },
    {
      path: '/places',
      name: 'places',
      component: () => import('../views/PlacesView.vue')
    }
  ]
});

export default router;
