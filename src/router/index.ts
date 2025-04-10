import { createRouter, createWebHistory } from 'vue-router';
import Features from '../views/Features.vue';
import Pages from '../views/Pages.vue';
import ResManager from '../views/ResManager.vue';

const routes = [
  {
    path: '/',
    name: 'Pages',
    component: Pages
  },
  {
    path: '/features',
    name: 'Features',
    component: Features
  },
  {
    path: '/form',
    name: 'ResManager',
    component: ResManager
  }
];

const router = createRouter({
  history: createWebHistory('/app'),
  routes
});

export default router
