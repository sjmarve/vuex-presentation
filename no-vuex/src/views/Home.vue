<template>
  <div class="container">
  	<div>
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
	  			<tr v-for="user in filtered" :key="user.id">
	  				<td v-text="user.first_name"></td>
	  				<td v-text="user.last_name"></td>
	  				<td><img :src="user.avatar" alt="Avatar"></td>
	  				<td><router-link :to="{name: 'user', params: {id: user.id}}"> view</router-link></td>
	  			</tr>
	  		</tbody>
	  	</table>
  	</div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
  	return {
  		users: [],
  		search: '',
  	}
  },
  mounted() {
  	this.getData()
  },
  computed: {
  	filtered() {
  		return this.users.filter(user => {
  			return user.first_name.toLowerCase().includes(this.search.toLowerCase())
  				|| user.last_name.toLowerCase().includes(this.search.toLowerCase());
  		})
  	}
  },
  methods: {
  	getData() {
  		this.$http.get('https://reqres.in/api/users?per_page=10').then(({data}) => {
  			this.users = data.data;
  		});
  	}
  }
}
</script>
