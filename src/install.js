import Vue from 'vue';
import CommonScroll from './components/common-scroll/index.vue'
import CommonPage from './components/common-page/index.vue'
export default{
	install(Vue){
		 Vue.component(CommonPage.name, CommonPage)
		 Vue.component(CommonScroll.name, CommonScroll)
	}
}