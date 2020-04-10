import Vue from 'vue';
import App from './app.vue';
import install from '@/install';
import router from '../route/index'
// import store from '../store/index.js'

//mount就是讲我们的App挂载到root这样一个根节点中去
Vue.use(install)
new Vue({
	// store,
	render: (h) => h(App),
	router
}).$mount('#app')
