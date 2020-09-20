<template>
 <div>
 <section class="row panel-body">
 <div class="col-md-12">
 
 <h6>Waiting to logout...</h6>
 
 <div class="alert alert-danger" v-if="this.error != '' ">{{ this.error }}</div>
 </div>
 </section>
 </div>
</template>
 
<script>
 
 import api from '../../helper/api'
 
 export default {
 data() {
 return {
 error: ""
 }
 },
 created() {
 document.getElementById("loading").style.display = "none"
 },
 mounted() {
 var self = this;
 
 api.logout(function() {
 
 setTimeout(
 () => {
 self.$store.dispatch('clearUserData');
 self.$router.push('/');
 },
 2000
 )
 
 }, function(error) {
 self.error = error
 })
 }
 }
</script>