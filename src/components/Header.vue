<template>
 <header class="panel-heading clearfix">
        <div class="heading">
        <router-link to="/">Forum - Home</router-link>
        </div>
        <div class="pull-right">
                <router-link v-if="this.$store.state.currentUser.status==0" to="/register" class="btn btn-primary spaced">Register</router-link>
                <router-link v-if="this.$store.state.currentUser.status==0" to="/login" class="btn btn-primary  spaced">Sign in</router-link>
                <router-link v-if="this.$store.state.currentUser.status==1" to="/logout" class="btn btn-primary  spaced">Logout</router-link>
                <router-link v-if="this.$store.state.currentUser.status==1" to="/my-forums" class="btn btn-warning  spaced">My Forums</router-link>
                <router-link v-if="this.$store.state.currentUser.status==1" to="/add-forum" class="btn btn-warning  spaced">Add Forum</router-link>           
        </div>
</header>
</template>
 
<script>
 
 export default {
  name: 'Header'
}
</script>