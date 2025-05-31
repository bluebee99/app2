import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../views/AuthView.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  { path: '/', name: 'Auth', component: AuthView },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;