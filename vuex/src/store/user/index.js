import Vue from 'vue'

export default {
	namespaced: true,
	state: {
		user: {},
	},
	actions: {
		getUser( {commit, dispatch, rootState}, payload ) {
			if(!rootState.users[payload.id] && payload.id >0){
	  			dispatch('wait/start', 'fetching user', { root: true });
		  		Vue.axios.get('https://reqres.in/api/users/'+payload.id).then(({data}) => {
					commit('SET_USER', data.data)
	  				dispatch('wait/end', 'fetching user', { root: true })
	  				
	  				let users = rootState.users.slice(0);
	  				users.splice(data.data.id, 1, data.data)
	  				commit('UPDATE_PER_PAGE', Number(rootState.perpage)+1, { root: true })
		  			commit('SET_USERS', users, { root: true })
				});
		  	}else{
		  		commit('SET_USER', rootState.users[payload.id])
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
