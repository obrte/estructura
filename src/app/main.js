import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(VueRouter)

import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)

import App from './App.vue'
import Usuarios from './components/catalogos/Usuarios.vue'
import Localidades from './components/catalogos/Localidades.vue'
import Test from './components/catalogos/test.vue'

const routes = [{
	name: 'Usuarios',
	path: '/usuarios',
	component: Usuarios
},
{
	name: 'Localidades',
	path: '/localidades',
	component: Localidades
},
{
	name: 'Test',
	path: '/test',
	component: Test
}
]

const router = new VueRouter({
	// mode: 'history',
	routes: routes
})
new Vue(Vue.util.extend({
	router
}, App)).$mount('#app')