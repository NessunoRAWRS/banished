import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'dashboard',
			component: () => import('@/views/DashboardView.vue'),
		},
		{
			path: '/character',
			name: 'character',
			component: () => import('./views/CharacterView.vue'),
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('./views/LoginView.vue'),
		},
		{
			path: '/logout',
			name: 'logout',
			component: () => import('./views/LoginView.vue'),
		},
		{
			path: '/settings',
			name: 'settings',
			component: () => import('./views/SettingsView.vue'),
		},
		{
			path: '/faq',
			name: 'faq',
			component: () => import('./views/FaqView.vue'),
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}

		if (to.hash) {
			return { selector: to.hash };
		}

		return { x: 0, y: 0 };
	},
});
