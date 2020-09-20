import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './route'
import store from './store'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueRouter);
let router = new VueRouter({
  mode: 'hash',
  routes,
  store
});

/*
const app = new Vue({
  el: "#app",
  components: { App },
  router,
  store,
  created: function () {
    document.getElementById("loading").style.display = "block";
  },
  mounted: function () {
    // we will use this lifecyle hook later
  },
  updated: function () {

  }
});

export default app
*/


 new Vue({
  router,
  store,
  created: function () {
    document.getElementById("loading").style.display = "block";
  },
  mounted: function() {
    // check for current user if he is still login
    //console.log("Mounted");
    store.dispatch('getCurrentUser')
  },
  updated: function () {

  },
  render: h => h(App),
}).$mount('#app')


