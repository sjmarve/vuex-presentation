<template>
  <div class="container">
    <v-wait for='fetching users'>
      <template slot='waiting'>
        Fetching Data...
      </template>
		  <h2>User List <input type="seach" v-model="search" placeholder="search"></h2>
      <p>
        <label>
          0 upto 12 records available
          <input type="text" :value="$store.state.perpage" @input="updateLocalPerPage" placeholder="Number of records">
        </label>
        <button type="button" @click="updateNumberOfRecords">Load Records</button>
      </p>
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
  data() {
    return {
      localPerPage: this.$store.state.perpage
    }
  },
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
  },
  methods:{
    updateNumberOfRecords(){
      this.$store.dispatch('perPageChange', this.localPerPage).then(() =>{
        this.$store.dispatch('getUsers')
      });
    },
    updateLocalPerPage(e){
      this.localPerPage = e.data ? e.data: this.$store.state.perpage
    }
  }
}
</script>
