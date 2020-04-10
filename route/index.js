import VueRouter from 'vue-router'
import Vue from 'vue';
var router = new VueRouter({
	routes: [{
			path: '',
			name: 'test',
			component: () => import('../src/views/blessing/index.vue')
		},
		{
			path: '/reflect',
			name: 'reflect',
			component: () => import('../src/views/reflect/index.vue')
		},

		{
			path: '/add',
			name: 'add',
			component: () => import('../src/views/reflect/add.vue')
		}
	],
})
Vue.use(VueRouter)
export default router
