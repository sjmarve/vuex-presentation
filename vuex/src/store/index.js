import Vue from 'vue'
import Vuex from 'vuex'
import userPageModule from './user'

Vue.use(Vuex)

// start of global store constants
const mutations = {
	SET_USERS (state, payload) {
		state.users = payload
	},
	UPDATE_SEARCH (state, payload) {
		state.search = payload
	}
}

const actions = {
  	getUsers( {commit, dispatch, state} ){
  		if(!(state.users && state.users.length)) {
	  		dispatch('wait/start', 'fetching users', { root: true });
	  		Vue.axios.get('https://reqres.in/api/users?per_page=50').then(({data}) => {
				commit('SET_USERS', data.data);
				dispatch('wait/end', 'fetching users', { root: true });
			});
	  	}
  	},
  	updateSearch({commit}, payload) {
  		commit('UPDATE_SEARCH', payload)
  	}
}				

const getters = {
  	filteredUsers(state){
  		return state.users.filter(user => 
  				user.first_name.toLowerCase().includes(state.search.toLowerCase())
  				|| user.last_name.toLowerCase().includes(state.search.toLowerCase())
  	)},
}

export default new Vuex.Store({
	namespaced:true,
	strict:true,
	state: {
	  	users: [],
	  	search: '',
	},
  	modules: {
  		user: userPageModule
  	},
	mutations,
	actions,
	getters,
})
