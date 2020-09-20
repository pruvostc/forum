<template>
 <header class="panel-heading">
        <strong class="heading">
        <router-link to="/">Simple Forum</router-link>
        </strong>
 
        <div class="pull-right">
                <router-link v-if="this.$store.state.currentUser.status==0" to="/register" class="btn btn-primary">Register</router-link>
                <router-link v-if="this.$store.state.currentUser.status==0" to="/login" class="btn btn-primary">Sign in</router-link>
                <router-link v-if="this.$store.state.currentUser.status==1" to="/logout" class="btn btn-primary">Logout</router-link>
                <router-link v-if="this.$store.state.currentUser.status==1" to="/my-forums" class="btn btn-warning">My Forums</router-link>
                <router-link v-if="this.$store.state.currentUser.status==1" to="/add-forum" class="btn btn-warning">Add Forum</router-link>           
        </div>
</header>
</template>
 
<script>
 
 export default {
  name: 'Header'
}
</script>