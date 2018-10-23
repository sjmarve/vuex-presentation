<template>
  <div class="container">
    <v-wait for='fetching users'>
      <template slot='waiting'>
        Fetching Data...
      </template>
		  <h2>User List <input type="seach" v-model="search" placeholder="search"></h2>
	  	<table border="1" width="100%">
	  		<thead>
	  			<tr>
	  				<th>first name</th>
	  				<th>last name</th>
	  				<th>avatar</th>
	  				<th>action</th>
	  			</tr>
	  		</thead>
	  		<tbody>
	  			<tr v-for="user in filteredUsers" :key="user.id">
	  				<td v-text="user.first_name"></td>
	  				<td v-text="user.last_name"></td>
	  				<td><img :src="user.avatar" alt="Avatar"></td>
	  				<td><router-link :to="{name: 'user', params: {id: user.id}}"> view</router-link></td>
	  			</tr>
        </tbody>
      </table>
    </v-wait>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'home',
  mounted() {
  	this.$store.dispatch('getUsers')
  },
  computed: {
  	...mapGetters([
  		'filteredUsers'
  	]),
  	search: {
  		get() {
  			return this.$store.state.search
  		},
  		set(value) {
  			this.$store.dispatch('updateSearch', value)
  		}
  	}
  }
}
</script>
