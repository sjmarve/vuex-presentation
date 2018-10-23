<template>
  <div class="container">
  	<div>
      <h2>User View</h2>
      <img :src="user.avatar" alt="Avatar">
      <br>
      First Name: {{user.first_name}}
	  	<br>
      Last Name: {{user.last_name}}
  	</div>
  </div>
</template>

<script>

export default {
  name: 'home',
    data() {
    	return {
    		user: {},
    	}
    },
    mounted() {
    	this.getUser()
    },
    methods: {
    	getUser() {
    		this.$http.get('https://reqres.in/api/users/'+this.$route.params.id).then(({data}) => {
    			this.user = data.data;
    		});
    	}
    }
  }
</script>
