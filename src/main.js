import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'
import store from "./store/store";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'


Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Vuelidate);


import Home from './components/Home.vue';
import Comment from "./components/Comment";
import NotFound from "./components/NotFound";
import Vuex from "vuex";

const router = new VueRouter({
	mode: 'history',
	routes: [
		{path: '/', component: Home},
		{path: '/comment/:id', component: Comment},
		{path: '*', component: NotFound}
	]
});

new Vue({
  store,
	router: router,
	el: '#app',
	render: h => h(App)
});
