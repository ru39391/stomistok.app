import { createRouter, createWebHistory } from 'vue-router';
import Resources from '../views/Resources.vue';
import ResManager from '../views/ResManager.vue';

const routes = [
  {
    path: '/',
    name: 'Resources',
    component: Resources
  },
  {
    path: '/form',
    name: 'ResManager',
    component: ResManager
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router
