import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [createPersistedState()],
	state: {
  		status: '',
  		token: localStorage.getItem('token') || '',
		user : {},
		isLoggedIn: false
	},
	mutations: {
		auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, payload){
		    state.status = 'success'
		    state.token = payload.token
			state.user = payload.user
			state.isLoggedIn = true;
	  	},
	  	auth_error(state){
	    	state.status = 'error'
	  	},
	  	logout(state){
	    	state.status = ''
			state.token = ''
			state.isLoggedIn = false;
	  	},
	},
	actions: {
	  	login({commit}, user){
	        return new Promise((resolve, reject) => {
	            commit('auth_request')
                axios.get('http://localhost:8080/offreeduwar/api/Useraccount/login/'+ user.email+'/'+user.password)
	            .then(resp => {
	                const token = resp.data.token
					const user = resp.data
					localStorage.setItem('token', token)
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', { token, user })
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error')
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
	    },
	    register({commit}, user){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
                axios.post('http://localhost:8080/offreeduwar/api/Useraccount/login/'+ user.email+'/'+user.password)
	            .then(resp => {
	                const token = resp.data.token
	                const user = resp.data.user
	                localStorage.setItem('token', token)
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', token, user)
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
	    },
	  	logout({commit}){
		    return new Promise((resolve, reject) => {
		      	commit('logout')
		      	localStorage.removeItem('token')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
	  	}
	},
	getters : {
		isLoggedIn: function(state) {
			return state.isLoggedIn
		  },
		authStatus: state => state.status,
	}
})