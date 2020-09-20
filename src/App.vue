<template>
<div id="app">
 <div class="container">
 <div class="row">
   <section class="panel panel-success">
          <app-header/>
          <router-view/>
      </section>
          
  </div>
</div>
</div>
</template>
 
<script>
import Header from './components/Header.vue';
 
export default {
  components: {
    'app-header': Header
  }
}
</script>
