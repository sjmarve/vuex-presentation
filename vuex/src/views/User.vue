<template>
  <div class="container">
    <v-wait for='fetching user'>
      <template slot='waiting'>
        Fetching Data...
      </template>
      <h2>User View</h2>
      <img :src="current.avatar" alt="Avatar">
      <br>
      First Name: {{current.first_name}}
	  	<br>
      Last Name: {{current.last_name}}
      <br><br>
      <button type="button" @click="previous">Previous</button>
      &nbsp;<span>ID: {{id}}</span> &nbsp;
      <button type="button" @click="next">Next</button>
    </v-wait>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'home',
    data(){
      return {
        id: this.$route.params.id
      }
    },
    mounted() {
      	this.$store.dispatch('user/getUser', {
          'id': this.id > 0 ? this.id : 1
        })
    },
    computed: {
      ...mapGetters('user', [
        'current'
      ]),
      loadedUsers() {
        return this.$store.state.users
      }
    },
    methods:{
      previous(){
        if((this.id-1) > 0){
          this.$router.push({name: 'user', params: { id: --this.id }})
        }
      },
      next() {
        if((this.id +1) > 0 && (this.id + 1) <= 12) {
          this.$router.push({name: 'user', params: { id: ++this.id }})
        }
      }
    },
     watch: {
      '$route' (to, from) {
        this.$store.dispatch('user/getUser', {
          'id': this.id
        })
      }
    }
  }
</script>
