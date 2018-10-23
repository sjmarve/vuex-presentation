<template>
  <div class="container">
  	<div>
      <h2>User View</h2>
      <v-wait for='fetching user'>
        <template slot='waiting'>
          Fetching Data...
        </template>
        <img :src="current.avatar" alt="Avatar">
        <br>
        First Name: {{current.first_name}}
  	  	<br>
        Last Name: {{current.last_name}}
      </v-wait>
  	</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'home',
    mounted() {

      	this.$store.dispatch('user/getUser', {
          'id': this.$route.params.id
        })
    },
    computed: {
      ...mapGetters('user', [
        'current'
      ]),
      loadedUsers() {
        return this.$store.state.users
      }
    }
  }
</script>
