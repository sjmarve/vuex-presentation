import Vue from 'vue'

export default {
	namespaced: true,
	state: {
		user: {},
	},
	actions: {
		getUser( {commit, dispatch, rootState}, payload ) {
			if(!rootState.users[payload]){
	  			dispatch('wait/start', 'fetching user', { root: true });
		  		Vue.axios.get('https://reqres.in/api/users/'+payload.id).then(({data}) => {
					commit('SET_USER', data.data)
		  			commit('SET_USERS', Object.assign({}, rootState.users, data.data), { root: true })

	  				dispatch('wait/end', 'fetching user', { root: true });
				});
		  	}else{
		  		commit('SET_USER', rootState.users[payload])
		  	}
	  	}
	},
	mutations: {
		SET_USER (state, payload) {
			state.user = payload
		},
	},
	getters: {
		current(state) {
			return state.user
		}
	}
}
