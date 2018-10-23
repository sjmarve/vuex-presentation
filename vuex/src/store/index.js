import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import userPageModule from './user'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
	strictMode: true,
  	storage: localStorage
})

// start of global store constants
const mutations = {
	SET_USERS (state, payload) {
		state.users = []
		payload.forEach(item => {
	      if (item) {
	        Vue.set(state.users, item.id, item)
	      }
	    })
	},
	UPDATE_SEARCH (state, payload) {
		state.search = payload
	},
	UPDATE_PER_PAGE (state, payload) {
		state.perpage = payload
	},
	RESTORE_MUTATION(){}
}

const actions = {
  	getUsers( {commit, dispatch, state} ){
  		if(state.users && state.users.filter(r=>r).length != state.perpage) {
	  		dispatch('wait/start', 'fetching users', { root: true });
	  		Vue.axios.get('https://reqres.in/api/users?per_page='+state.perpage).then(({data}) => {
				commit('SET_USERS', data.data);
				dispatch('wait/end', 'fetching users', { root: true });
			});
	  	}
  	},
  	updateSearch({commit}, payload) {
  		commit('UPDATE_SEARCH', payload)
  	},
  	perPageChange({commit}, payload) {
  		commit('UPDATE_PER_PAGE', payload)
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
	  	perpage: 3
	},
  	modules: {
  		user: userPageModule
  	},
	mutations,
	actions,
	getters,
	plugins: [vuexLocal.plugin],
})
